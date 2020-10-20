import { ApiRx } from '@polkadot/api';
import { u32 } from '@polkadot/types';
import { TradingPair, Balance } from '@acala-network/types/interfaces';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { assert } from '@polkadot/util';
import { Token, getPresetToken } from '@acala-network/sdk-core/token';
import { FixedPointNumber } from '@acala-network/sdk-core/fixed-point-number';
import { TradeGraph } from './trade-graph';
import { getSupplyAmount, getTargetAmount, Fee } from './help';

import { TokenPair } from './token-pair';

type SwapTradeMode = 'EXACT_INPUT' | 'EXACT_OUTPUT';

interface SwapTradeConfig {
  input: Token;
  output: Token;
  mode: SwapTradeMode;
  maxTradePathLength: number;
}

interface TradeResult {
  inputAmount: FixedPointNumber;
  outputAmount: FixedPointNumber;
}

export class SwapTrade {
  private api!: ApiRx;
  private input!: Token; // input token and token amount
  private output!: Token; // out token and token amount
  private mode!: SwapTradeMode; // trade mode
  private inputAmount!: FixedPointNumber;
  private outputAmount!: FixedPointNumber;
  private paths!: Token[]; // trade path
  private liquidityProviderFee!: Token; // trade fee for liquidity provider
  private priceImpact!: FixedPointNumber; // trade price impact
  private maxTradePathLength!: number; // the max length for the trade path
  private fee!: Fee;

  constructor (api: ApiRx, config: SwapTradeConfig) {
    this.api = api;

    this.input = config.input;
    this.output = config.output;
    this.mode = config.mode;
    this.maxTradePathLength = config.maxTradePathLength;

    this.getExchangeFee();
  }

  private getExchangeFee (): void {
    const exchangeFee = this.api.consts.dex.getExchangeFee as any as [u32, u32];

    this.fee = {
      numerator: FixedPointNumber.fromInner(exchangeFee[0].toString()),
      denominator: FixedPointNumber.fromInner(exchangeFee[1].toString())
    };
  }

  private getAvailableTokenPairs (): TokenPair[] {
    return (this.api.consts.dex.enabledTradingPairs as any as TradingPair[]).map((pair: TradingPair) => {
      return new TokenPair(
        // TODO: need remove any
        getPresetToken(pair[0].toString() as any),
        getPresetToken(pair[1].toString() as any)
      );
    });
  }

  private getTradePath (): Token[][] {
    const availableTokenPairs = this.getAvailableTokenPairs();
    const tradeGraph = new TradeGraph(availableTokenPairs);

    return tradeGraph.getPathes(this.input, this.output)
      .filter(item => item.length <= this.maxTradePathLength);
  }

  private getUsedTokenPairs (paths: Token[][]): TokenPair[] {
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

  private getTradeResult (inputAmount: FixedPointNumber, path: Token[], pairs: TokenPair[]): TradeResult {
    const result: TradeResult = {
      inputAmount,
      outputAmount: new FixedPointNumber(0)
    };

    if (this.mode === 'EXACT_INPUT') {
      for (let i = 0; i < path.length - 1; i++) {
        const temp = new TokenPair(path[i], path[i + 1]);
        const pair = pairs.find(item => item.isEqual(temp));

        if (!pair) throw new Error('no trade pair found in getTradeResult');

        const [supplyToken, targetToken] = pair.getPair();

        result.outputAmount = getTargetAmount(
          supplyToken.amount,
          targetToken.amount,
          i === 0 ? result.inputAmount : result.outputAmount,
          this.fee
        );
      }
    } else if (this.mode === 'EXACT_OUTPUT') {
      for (let i = path.length - 1; i > 0; i--) {
        const temp = new TokenPair(path[i], path[i - 1]);
        const pair = pairs.find(item => item.isEqual(temp));

        if (!pair) throw new Error('no trade pair found in getTradeResult');

        const [supplyToken, targetToken] = pair.getPair();

        result.outputAmount = getSupplyAmount(
          supplyToken.amount,
          targetToken.amount,
          i === 0 ? result.inputAmount : result.outputAmount,
          this.fee
        );
      }
    }

    return result;
  }

  private getBestTradePath (inputAmount: FixedPointNumber): Observable<TradeResult> {
    const tradePath = this.getTradePath();

    if (tradePath.length === 0) throw new Error('no trade path found');

    const usedTokenPairs: TokenPair[] = this.getUsedTokenPairs(tradePath);

    return combineLatest(usedTokenPairs.map(item => {
      const pair = item.getPair();

      // TODO: need remove any
      return (this.api.query.dex.liquidityPool as any)([pair[0], pair[1]]) as Observable<[Balance, Balance]>;
    })).pipe(
      map((result) => {
        return result.map((item, pairIndex) => {
          const pair = usedTokenPairs[pairIndex].getPair();
          return new TokenPair(
            pair[0].clone({
              amount: FixedPointNumber.fromInner(item[0].toString())
            }),
            pair[1].clone({
              amount: FixedPointNumber.fromInner(item[1].toString())
            })
          );
        });
      }),
      map((pairs) => {
        const tradeResults = tradePath.map((path) => this.getTradeResult(inputAmount, path, pairs));

        switch (this.mode) {
          case 'EXACT_INPUT': {
            return tradeResults.reduce((acc, cur) => {
              if (acc.outputAmount.isGreaterThanOrEqualTo(cur.outputAmount)) {
                return acc;
              }

              return cur;
            }, tradeResults[0]);
          }
          case 'EXACT_OUTPUT': {
            return tradeResults.reduce((acc, cur) => {
              if (acc.outputAmount.isLessOrEqualTo(cur.outputAmount)) {
                return acc;
              }

              return cur;
            }, tradeResults[0]);
          }
        }
      })
    );
  }

  setInputAmount (amount: FixedPointNumber): Observable<TradeResult> {
    // ensure that mode is EXACT_INTPU
    assert(this.mode === 'EXACT_INPUT', 'when the mode is EXACT_OUTPUT, you should use setOutputAmount');

    return this.getBestTradePath(amount);
  }

  setOutputAmount (amount: FixedPointNumber): Observable<TradeResult> {
    // ensure that mode is EXACT_INTPU
    assert(this.mode === 'EXACT_OUTPUT', 'when the mode is EXACT_INPUT, you should use setInputAmount');

    return this.getBestTradePath(amount);
  }
}
