import { ApiRx, ApiPromise } from '@polkadot/api';

import { TradingPair, Balance } from '@acala-network/types/interfaces';
import { Token, getPresetToken, PresetToken, TokenPair } from '@acala-network/sdk-core';
import { FixedPointNumber } from '@acala-network/sdk-core/fixed-point-number';

import { TradeGraph } from './trade-graph';
import { getSupplyAmount, getTargetAmount, Fee, SwapTradeMode } from './help';
import { TradeParameters } from './trade-parameters';

interface SwapTradeConfig {
  input: Token; // input token includes token amount
  output: Token; // output token includes token amount
  mode: SwapTradeMode; // trade mode
  availableTokenPairs: TokenPair[]; // available trading token pairs
  maxTradePathLength: number; // the max length of the trade path
  fee: Fee; // the trade fee for liquidity provider
  acceptSlippage: FixedPointNumber; // the slippage can accept
}

export class SwapTrade {
  public input: Token; // input token and token amount
  public output: Token; // out token and token amount
  public mode: SwapTradeMode; // trade mode
  public availableTokenPairs: TokenPair[]; // available trading token pairs
  public maxTradePathLength!: number; // the max length for the trade path
  public fee: Fee; // the trade fee for liquidity provider
  public acceptSlippage: FixedPointNumber; // the slippage can accept
  private tradePaths: Token[][];

  constructor (config: SwapTradeConfig) {
    this.input = config.input;
    this.output = config.output;
    this.mode = config.mode;
    this.availableTokenPairs = config.availableTokenPairs;
    this.maxTradePathLength = config.maxTradePathLength;
    this.fee = config.fee;
    this.acceptSlippage = config.acceptSlippage;
    this.tradePaths = this.getTradePaths();
  }

  /**
   * @name getAvailableTokenPairs
   * @description help function to convert constants **dex.enabledTradingPairs** to **TokenPair**
   */
  static getAvailableTokenPairs (api: ApiRx | ApiPromise): TokenPair[] {
    return api.consts.dex.enabledTradingPairs.map((pair: TradingPair) => {
      return new TokenPair(
        getPresetToken(pair[0].asToken.toString() as PresetToken),
        getPresetToken(pair[1].asToken.toString() as PresetToken)
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
   * @description extract token pairs from trade path
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

  /**
   * @name getTradeTokenPairsByPaths
   * @description get all token pairs from path
   */
  public getTradeTokenPairsByPaths (): TokenPair[] {
    return SwapTrade.getUsedTokenPairs(this.tradePaths);
  }

  private getPairWithOrder (pair: TokenPair, order: [Token, Token]): [Token, Token] {
    const _pair = pair.getPair();

    if (_pair[0].isEqual(order[0]) && _pair[1].isEqual(order[1])) {
      return _pair;
    }

    return _pair.reverse() as [Token, Token];
  }

  private getTradeParametersByPath (path: Token[], pairs: TokenPair[]): TradeParameters {
    // create the default trade result
    const result: TradeParameters = new TradeParameters({
      input: this.input,
      output: this.output,
      path: path,
      priceImpact: new FixedPointNumber(0),
      midPrice: new FixedPointNumber(0)
    });

    const routeTemp: { input: FixedPointNumber; output: FixedPointNumber }[] = [];

    if (this.mode === 'EXACT_INPUT') {
      for (let i = 0; i < path.length - 1; i++) {
        const temp = new TokenPair(path[i], path[i + 1]);
        const pair = pairs.find(item => item.isEqual(temp));

        if (!pair) throw new Error('no trade pair found in getTradeParameter');

        const [supplyToken, targetToken] = this.getPairWithOrder(pair, [path[i], path[i + 1]]);

        const outputAmount = getTargetAmount(
          supplyToken.amount,
          targetToken.amount,
          i === 0 ? result.input.amount : result.output.amount,
          this.fee
        );

        routeTemp[i] = {
          input: i === 0 ? result.input.amount : routeTemp[i - 1].output,
          output: outputAmount
        };

        result.output.amount = outputAmount;
      }
    } else if (this.mode === 'EXACT_OUTPUT') {
      for (let i = path.length - 1; i > 0; i--) {
        const temp = new TokenPair(path[i], path[i - 1]);
        const pair = pairs.find(item => item.isEqual(temp));

        if (!pair) throw new Error('no trade pair found in getTradeParameter');

        const [supplyToken, targetToken] = this.getPairWithOrder(pair, [path[i - 1], path[i]]);

        const inputAmount = getSupplyAmount(
          supplyToken.amount,
          targetToken.amount,
          i === path.length - 1 ? result.output.amount : result.input.amount,
          this.fee
        );

        routeTemp[i - 1] = {
          input: inputAmount,
          output: i === path.length - 1 ? result.output.amount : routeTemp[i].input
        };

        result.input.amount = inputAmount;
      }
    }

    result.midPrice = this.getPrices(routeTemp);
    result.priceImpact = this.getPriceImpact(result.midPrice, result.input.amount, result.output.amount);

    return result;
  }

  private getPrices (route: { input: FixedPointNumber; output: FixedPointNumber }[]): FixedPointNumber {
    const prices: FixedPointNumber[] = [];

    for (const item of route) {
      prices.push(item.input.div(item.output));
    }

    return prices.slice(1).reduce((acc, cur) => {
      return acc.times(cur);
    }, prices[0]);
  }

  private getPriceImpact (price: FixedPointNumber, inputAmount: FixedPointNumber, outputAmount: FixedPointNumber): FixedPointNumber {
    const temp = price.times(inputAmount);

    return temp.minus(outputAmount).div(temp);
  }

  /**
   * @name convertLiquidityPoolsToTokenPairs
   * @description help function to convert liquidity pool data which from chain to token pairs
   */
  static convertLiquidityPoolsToTokenPairs (tokenPairs: TokenPair[], pools: [Balance, Balance][]): TokenPair[] {
    return tokenPairs.map((item, index) => {
      const tokens = item.getPair();
      return new TokenPair(
        tokens[0].clone({ amount: FixedPointNumber.fromInner(pools[index][0].toString()) }),
        tokens[1].clone({ amount: FixedPointNumber.fromInner(pools[index][1].toString()) })
      );
    });
  }

  /**
   * @name getTradeParameters
   * @description get the parameter about this swap trade
   */
  public getTradeParameters (liquidityPools: TokenPair[]): TradeParameters {
    const tradePaths = this.getTradePaths();

    if (tradePaths.length === 0) throw new Error('no trade path found');

    const tradeResults = tradePaths.map((path) => this.getTradeParametersByPath(path, liquidityPools));

    // find the best trade result
    const result = ((): TradeParameters => {
      switch (this.mode) {
        case 'EXACT_INPUT': {
          return tradeResults.reduce((acc, cur) => {
            if (acc.output.amount.isGreaterThanOrEqualTo(cur.output.amount)) return acc;

            return cur;
          }, tradeResults[0]);
        }
        case 'EXACT_OUTPUT': {
          return tradeResults.reduce((acc, cur) => {
            if (acc.input.amount.isLessOrEqualTo(cur.input.amount)) return acc;

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
        result.input.amount = result.input.amount.times(FixedPointNumber.ONE.plus(this.acceptSlippage));

        break;
      }
    }

    return result;
  }
}
