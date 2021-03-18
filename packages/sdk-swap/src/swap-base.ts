import { ApiPromise, ApiRx } from '@polkadot/api';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Token, TokenBalance, TokenPair } from '@acala-network/sdk-core';
import { FixedPointNumber } from '@acala-network/sdk-core/fixed-point-number';

import { getSupplyAmount, getTargetAmount, Fee } from './help';
import { LiquidityPool, SwapResult } from './types';
import { TradeGraph } from './trade-graph';

interface SwapResultSplitedToken {
  inputToken: Token;
  outputToken: Token;
  inputAmount: FixedPointNumber;
  outputAmount: FixedPointNumber;
  midPrice: FixedPointNumber;
  priceImpact: FixedPointNumber;
  path: Token[];
}

export abstract class SwapBase<T extends ApiPromise | ApiRx> {
  protected api: T;
  protected enableTradingPairs$: Observable<TokenPair[]>;
  protected config: {
    tradingPathLimit: number;
    fee: Fee;
  };

  constructor(api: T, enableTradingPairs$?: Observable<TokenPair[]>) {
    this.api = api;

    this.config = {
      tradingPathLimit: this.getTradingPathLimit(),
      fee: this.getExchangeFee()
    };

    this.enableTradingPairs$ = enableTradingPairs$ || this.subscribeTradingPair();
  }

  public get tradingPathLimit(): number {
    return this.config.tradingPathLimit;
  }

  public get exchangeFee(): Fee {
    return this.config.fee;
  }

  private getTradingPathLimit() {
    return parseInt(this.api?.consts?.dex?.tradingPathLimit?.toString() || '3');
  }

  private getExchangeFee() {
    const exchangeFee = this.api.consts.dex.getExchangeFee;

    return {
      denominator: new FixedPointNumber(exchangeFee[1].toString()),
      numerator: new FixedPointNumber(exchangeFee[0].toString())
    };
  }

  protected abstract subscribeTradingPair(): Observable<TokenPair[]>;

  protected getTokenPairsFromPath(path: Token[]): TokenPair[] {
    const _path = path.slice();
    // push undefined as tail
    _path.push((undefined as any) as Token);

    return _path.reduce((acc, cur, current) => {
      if (!cur || !_path[current + 1]) return acc;

      acc.push(new TokenPair(cur, _path[current + 1]));

      return acc;
    }, [] as TokenPair[]);
  }

  protected getTradePathes(input: Token, output: Token): Observable<Token[][]> {
    return this.enableTradingPairs$.pipe(
      map((pairs) => {
        const tradeGraph = new TradeGraph(pairs);

        return tradeGraph
          .getPathes(input, output)
          .filter((path) => {
            const tokenPairs = this.getTokenPairsFromPath(path);

            for (const item of tokenPairs) {
              const [token1, token2] = item.getPair();
              const result = this.checkTradingPairIsEnabled(token1, token2, pairs);

              if (!result) return false;
            }

            return true;
          })
          .filter((path) => path.length <= this.config.tradingPathLimit);
      })
    );
  }

  protected checkTradingPairIsEnabled(currency1: Token, currency2: Token, tradingPairs: TokenPair[]): boolean {
    const temp = new TokenPair(currency1, currency2);

    return !!tradingPairs.find((item) => item.isEqual(temp));
  }

  protected formatLiquidityWithOrder(liquidity: LiquidityPool, token1: Token): [FixedPointNumber, FixedPointNumber] {
    if (liquidity.token1.isEqual(token1)) {
      return [liquidity.balance1, liquidity.balance2];
    }

    return [liquidity.balance2, liquidity.balance1];
  }

  protected getOutputAmountWithExactInput(
    inputToken: Token,
    outputToken: Token,
    inputAmount: FixedPointNumber,
    outputAmount: FixedPointNumber,
    path: Token[],
    liquidityPools: LiquidityPool[]
  ): SwapResultSplitedToken {
    const result = {
      inputToken,
      outputToken,
      path,
      inputAmount,
      outputAmount
    };
    const routeTemp: { input: FixedPointNumber; output: FixedPointNumber }[] = [];

    for (let i = 0; i < path.length - 1; i++) {
      const pair = new TokenPair(path[i], path[i + 1]);
      const [token1, token2] = pair.getPair();
      const pool = liquidityPools.find((item) => item.token1.isEqual(token1) && item.token2.isEqual(token2));

      if (!pool) {
        return {
          ...result,
          midPrice: FixedPointNumber.ZERO,
          priceImpact: FixedPointNumber.ZERO
        };
      }

      const [supply, target] = this.formatLiquidityWithOrder(pool, path[i]);

      const outputAmount = getTargetAmount(
        supply,
        target,
        i === 0 ? result.inputAmount : result.outputAmount,
        this.config.fee
      );

      routeTemp[i] = {
        input: i === 0 ? result.inputAmount : routeTemp[i - 1].output,
        output: outputAmount
      };

      result.outputAmount = outputAmount;
    }

    const midPrice = this.getPrices(routeTemp);

    return {
      ...result,
      midPrice,
      priceImpact: this.getPriceImpact(midPrice, result.inputAmount, result.outputAmount)
    };
  }

  protected getInputAmountWithExactOutput(
    inputToken: Token,
    outputToken: Token,
    inputAmount: FixedPointNumber,
    outputAmount: FixedPointNumber,
    path: Token[],
    liquidityPools: LiquidityPool[]
  ): SwapResultSplitedToken {
    const result = {
      inputToken,
      outputToken,
      path,
      inputAmount,
      outputAmount
    };
    const routeTemp: { input: FixedPointNumber; output: FixedPointNumber }[] = [];

    for (let i = path.length - 1; i > 0; i--) {
      const pair = new TokenPair(path[i], path[i - 1]);
      const [token1, token2] = pair.getPair();
      const pool = liquidityPools.find((item) => item.token1.isEqual(token1) && item.token2.isEqual(token2));

      if (!pool) {
        return {
          ...result,
          midPrice: FixedPointNumber.ZERO,
          priceImpact: FixedPointNumber.ZERO
        };
      }

      const [supply, target] = this.formatLiquidityWithOrder(pool, path[i - 1]);

      const inputAmount = getSupplyAmount(
        supply,
        target,
        i === path.length - 1 ? result.outputAmount : result.inputAmount,
        this.config.fee
      );

      routeTemp[i - 1] = {
        input: inputAmount,
        output: i === path.length - 1 ? result.outputAmount : routeTemp[i].input
      };

      result.inputAmount = inputAmount;
    }

    const midPrice = this.getPrices(routeTemp);

    return {
      ...result,
      midPrice,
      priceImpact: this.getPriceImpact(midPrice, result.inputAmount, result.outputAmount)
    };
  }

  protected getPrices(route: { input: FixedPointNumber; output: FixedPointNumber }[]): FixedPointNumber {
    const prices: FixedPointNumber[] = [];

    for (const item of route) {
      prices.push(item.input.div(item.output));
    }

    return prices.slice(1).reduce((acc, cur) => {
      return acc.times(cur);
    }, prices[0]);
  }

  protected getPriceImpact(
    price: FixedPointNumber,
    inputAmount: FixedPointNumber,
    outputAmount: FixedPointNumber
  ): FixedPointNumber {
    const temp = price.times(inputAmount);

    return temp.minus(outputAmount).div(temp);
  }

  protected transformToSwapResult(result: SwapResultSplitedToken): SwapResult {
    const { inputAmount, inputToken, outputAmount, outputToken, ...others } = result;

    inputAmount.forceSetPrecision(inputToken.decimal);
    outputAmount.forceSetPrecision(outputToken.decimal);

    return {
      input: new TokenBalance(inputToken, inputAmount),
      output: new TokenBalance(outputToken, outputAmount),
      ...others
    };
  }
}
