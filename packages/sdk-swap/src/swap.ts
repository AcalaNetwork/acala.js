import { ApiRx, ApiPromise } from '@polkadot/api';
import { assert } from '@polkadot/util';

import { TradingPair } from '@acala-network/types/interfaces';
import { Token, getPresetToken, PresetToken } from '@acala-network/sdk-core';
import { FixedPointNumber } from '@acala-network/sdk-core/fixed-point-number';

import { TradeGraph } from './trade-graph';
import { getSupplyAmount, getTargetAmount, Fee } from './help';

import { TokenPair } from './token-pair';

type SwapTradeMode = 'EXACT_INPUT' | 'EXACT_OUTPUT';

interface SwapTradeConfig {
  input: Token; // input token includes token amount
  output: Token; // output token includes token amount
  mode: SwapTradeMode; // trade mode
  availableTokenPairs: TokenPair[]; // available trading token pairs
  maxTradePathLength: number; // the max length of the trade path
  fee: Fee; // the trade fee for liquidity provider
  acceptSlippage: FixedPointNumber; // the slippage can accept
}

interface TradeParameter {
  input: Token;
  output: Token;
  path: Token[];
  priceImpact: FixedPointNumber;
  midPrice: FixedPointNumber;
}

export class SwapTrade {
  private input: Token; // input token and token amount
  private output: Token; // out token and token amount
  private mode: SwapTradeMode; // trade mode
  private availableTokenPairs: TokenPair[]; // available trading token pairs
  private maxTradePathLength!: number; // the max length for the trade path
  private fee: Fee; // the trade fee for liquidity provider
  private acceptSlippage: FixedPointNumber; // the slippage can accept

  constructor (config: SwapTradeConfig) {
    this.input = config.input;
    this.output = config.output;
    this.mode = config.mode;
    this.availableTokenPairs = config.availableTokenPairs;
    this.maxTradePathLength = config.maxTradePathLength;
    this.fee = config.fee;
    this.acceptSlippage = config.acceptSlippage;
  }

  /**
   * @name getAvailableTokenPairs
   * @description help function to convert constants **dex.enabledTradingPairs** to **TokenPair**
   */
  static getAvailableTokenPairs (api: ApiRx | ApiPromise): TokenPair[] {
    return api.consts.dex.enabledTradingPairs.map((pair: TradingPair) => {
      return new TokenPair(
        getPresetToken(pair[0].toString() as PresetToken),
        getPresetToken(pair[1].toString() as PresetToken)
      );
    });
  }

  /**
   * @name getTradePaths
   * @description get all possible trade path, filter by this.maxTradePathLength
   */
  public getTradePaths (): Token[][] {
    const availableTokenPairs = this.availableTokenPairs;
    const tradeGraph = new TradeGraph(availableTokenPairs);

    return tradeGraph.getPathes(this.input, this.output)
      .filter(item => item.length <= this.maxTradePathLength);
  }

  /**
   * @name getUsedTokenPairs
   * @description extract token paris from trade path
   */
  static getUsedTokenPairs (paths: Token[][]): TokenPair[] {
    const result: TokenPair[] = [];

    for (const path of paths) {
      for (let i = 0; i < path.length - 1; i++) {
        const pair = new TokenPair(path[i], path[i + 1]);

        // insert union token pair into result
        const tryIndex = result.findIndex(item => item.isEqual(pair));

        if (tryIndex === -1) {
          result.push(new TokenPair(path[i], path[i + 1]));
        }
      }
    }

    return result;
  }

  private getTradeParameterByPath (path: Token[], pairs: TokenPair[]): TradeParameter {
    // create the default trade result
    const result: TradeParameter = {
      input: this.input,
      output: this.output.clone({ amount: new FixedPointNumber(0) }),
      path: path,
      priceImpact: new FixedPointNumber(0),
      midPrice: new FixedPointNumber(0)
    };

    if (this.mode === 'EXACT_INPUT') {
      for (let i = 0; i < path.length - 1; i++) {
        const temp = new TokenPair(path[i], path[i + 1]);
        const pair = pairs.find(item => item.isEqual(temp));

        if (!pair) throw new Error('no trade pair found in getTradeParameter');

        const [supplyToken, targetToken] = pair.getPair();

        result.output.amount = getTargetAmount(
          supplyToken.amount,
          targetToken.amount,
          i === 0 ? result.input.amount : result.output.amount,
          this.fee
        );
      }
    } else if (this.mode === 'EXACT_OUTPUT') {
      for (let i = path.length - 1; i > 0; i--) {
        const temp = new TokenPair(path[i], path[i - 1]);
        const pair = pairs.find(item => item.isEqual(temp));

        if (!pair) throw new Error('no trade pair found in getTradeParameter');

        const [supplyToken, targetToken] = pair.getPair();

        result.output.amount = getSupplyAmount(
          supplyToken.amount,
          targetToken.amount,
          i === 0 ? result.input.amount : result.output.amount,
          this.fee
        );
      }
    }

    return result;
  }

  /**
   * @name getTradeParameter
   * @description get the parameter about this swap trade
   */
  public getTradeParameter (liquidityPools: TokenPair[]): TradeParameter {
    const tradePaths = this.getTradePaths();

    if (tradePaths.length === 0) throw new Error('no trade path found');

    const tradeResults = tradePaths.map((path) => this.getTradeParameterByPath(path, liquidityPools));

    // find the best trade result
    const result = ((): TradeParameter => {
      switch (this.mode) {
        case 'EXACT_INPUT': {
          return tradeResults.reduce((acc, cur) => {
            if (acc.output.amount.isGreaterThanOrEqualTo(cur.output.amount)) {
              return acc;
            }

            return cur;
          }, tradeResults[0]);
        }
        case 'EXACT_OUTPUT': {
          return tradeResults.reduce((acc, cur) => {
            if (acc.input.amount.isLessOrEqualTo(cur.input.amount)) {
              return acc;
            }

            return cur;
          }, tradeResults[0]);
        }
      }
    })();

    // adjust slippage
    switch (this.mode) {
      case 'EXACT_INPUT': {
        result.output.amount = result.output.amount.times(FixedPointNumber.ONE.minus(this.acceptSlippage));

        break;
      }
      case 'EXACT_OUTPUT': {
        result.output.amount = result.input.amount.times(FixedPointNumber.ONE.plus(this.acceptSlippage));

        break;
      }
    }

    return result;
  }

  /**
   * @name setInput
   * @description set input token and amount
   */
  public setInput (input: Token): void {
    // ensure that mode is EXACT_INTPU
    assert(this.mode === 'EXACT_INPUT', 'when the mode is EXACT_OUTPUT, you should use setOutput');

    this.input = input;
  }

  /**
   * @name setOutput
   * @description set output token and amount
   */
  public setOutput (output: Token): void {
    // ensure that mode is EXACT_INTPU
    assert(this.mode === 'EXACT_OUTPUT', 'when the mode is EXACT_INPUT, you should use setInput');

    this.output = output;
  }

  /**
   * @name setOutput
   * @description set output token and amount
   */
  public setAcceptSlippage (slippage: FixedPointNumber): void {
    this.acceptSlippage = slippage;
  }
}
