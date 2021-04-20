import { ApiPromise, ApiRx } from '@polkadot/api';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Token, TokenBalance, TokenPair } from '@acala-network/sdk-core';
import { FixedPointNumber } from '@acala-network/sdk-core/fixed-point-number';

import { getSupplyAmount, getTargetAmount } from './help';
import { LiquidityPool, SwapResult, Fee, SwapTradeMode, MiddleResult } from './types';
import { TradeGraph } from './trade-graph';
import { SwapParameters } from './swap-parameters';
import { NoLiquidityPoolError } from './errors';

export abstract class SwapBase<T extends ApiPromise | ApiRx> {
  protected api: T;

  // subscribe the enable trading pairs
  protected enableTradingPairs$: Observable<TokenPair[]>;

  // the _config of dex module
  protected _config: {
    tradingPathLimit: number;
    fee: Fee;
  };

  constructor(api: T, enableTradingPairs$?: Observable<TokenPair[]>) {
    this.api = api;

    this._config = {
      tradingPathLimit: this.getTradingPathLimit(),
      fee: this.getExchangeFee()
    };

    this.enableTradingPairs$ = enableTradingPairs$ || this.getTradingPairs();
  }

  protected abstract getTradingPairs(): Observable<TokenPair[]>;

  public get config(): { tradingPathLimit: number; fee: Fee } {
    return this._config;
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

        return tradeGraph.getPathes(input, output, this._config.tradingPathLimit).filter((path) => {
          const tokenPairs = this.getTokenPairsFromPath(path);

          for (const item of tokenPairs) {
            const [token1, token2] = item.getPair();
            const result = this.checkTradingPairIsEnabled(token1, token2, pairs);

            if (!result) return false;
          }

          return true;
        });
      })
    );
  }

  protected checkTradingPairIsEnabled(currency1: Token, currency2: Token, tradingPairs: TokenPair[]): boolean {
    const temp = new TokenPair(currency1, currency2);

    return !!tradingPairs.find((item) => item.isEqual(temp));
  }

  protected sortLiquidityPoolWithTokenOrder(pool: LiquidityPool, token1: Token): [FixedPointNumber, FixedPointNumber] {
    if (pool.token1.isEqual(token1)) {
      return [pool.balance1, pool.balance2];
    }

    return [pool.balance2, pool.balance1];
  }

  protected getOutputAmountWithExactInput(
    inputToken: Token,
    outputToken: Token,
    inputAmount: FixedPointNumber,
    outputAmount: FixedPointNumber,
    path: Token[],
    liquidityPools: LiquidityPool[]
  ): SwapResult {
    const result = {
      inputToken,
      outputToken,
      path,
      inputAmount,
      outputAmount
    };

    for (let i = 0; i < path.length - 1; i++) {
      const pair = new TokenPair(path[i], path[i + 1]);
      const [token1, token2] = pair.getPair();
      const pool = liquidityPools.find((item) => item.token1.isEqual(token1) && item.token2.isEqual(token2));

      if (!pool) throw new NoLiquidityPoolError();

      const [supply, target] = this.sortLiquidityPoolWithTokenOrder(pool, path[i]);

      const outputAmount = getTargetAmount(
        supply,
        target,
        i === 0 ? result.inputAmount : result.outputAmount,
        this._config.fee
      );

      result.outputAmount = outputAmount;
    }

    const midPrice = this.getMidPrice(path, liquidityPools);

    return this.transformToSwapResult({
      ...result,
      midPrice,
      priceImpact: this.getPriceImpact(midPrice, result.inputAmount, result.outputAmount)
    });
  }

  protected getInputAmountWithExactOutput(
    inputToken: Token,
    outputToken: Token,
    inputAmount: FixedPointNumber,
    outputAmount: FixedPointNumber,
    path: Token[],
    liquidityPools: LiquidityPool[]
  ): SwapResult {
    const result = {
      inputToken,
      outputToken,
      path,
      inputAmount,
      outputAmount
    };

    for (let i = path.length - 1; i > 0; i--) {
      const pair = new TokenPair(path[i], path[i - 1]);
      const [token1, token2] = pair.getPair();
      const pool = liquidityPools.find((item) => item.token1.isEqual(token1) && item.token2.isEqual(token2));

      if (!pool) throw new NoLiquidityPoolError();

      const [supply, target] = this.sortLiquidityPoolWithTokenOrder(pool, path[i - 1]);

      const inputAmount = getSupplyAmount(
        supply,
        target,
        i === path.length - 1 ? result.outputAmount : result.inputAmount,
        this._config.fee
      );

      result.inputAmount = inputAmount;
    }

    const midPrice = this.getMidPrice(path, liquidityPools);

    return this.transformToSwapResult({
      ...result,
      midPrice,
      priceImpact: this.getPriceImpact(midPrice, result.inputAmount, result.outputAmount)
    });
  }

  protected getMidPrice(path: Token[], pools: LiquidityPool[]): FixedPointNumber {
    const prices: FixedPointNumber[] = [];

    for (let i = 0; i < path.length - 1; i++) {
      const pair = new TokenPair(path[i], path[i + 1]);
      const [token1, token2] = pair.getPair();
      const pool = pools.find((item) => item.token1.isEqual(token1) && item.token2.isEqual(token2));

      if (!pool) throw new NoLiquidityPoolError();

      const [balance1, balance2] = this.sortLiquidityPoolWithTokenOrder(pool, path[i]);

      prices.push(balance2.div(balance1));
    }

    return prices.slice(1).reduce((acc, cur) => {
      return acc.times(cur);
    }, prices[0]);
  }

  protected getPriceImpact(
    midPrice: FixedPointNumber,
    inputAmount: FixedPointNumber,
    outputAmount: FixedPointNumber
  ): FixedPointNumber {
    const temp = midPrice.times(inputAmount);

    return temp.minus(outputAmount).div(temp);
  }

  protected transformToSwapResult(result: MiddleResult): SwapResult {
    const { inputAmount, inputToken, outputAmount, outputToken, ...others } = result;

    const _inputAmount = inputAmount.clone();
    const _outputAmount = outputAmount.clone();

    _inputAmount.forceSetPrecision(inputToken.decimal);
    _outputAmount.forceSetPrecision(outputToken.decimal);

    return {
      input: new TokenBalance(inputToken, _inputAmount),
      output: new TokenBalance(outputToken, _outputAmount),
      ...others
    };
  }

  protected getBestSwapResult(
    mode: SwapTradeMode,
    paths: Token[][],
    liquidityPools: LiquidityPool[],
    baseParams: [Token, Token, FixedPointNumber, FixedPointNumber]
  ): SwapParameters {
    const swapResult = paths.map(
      (path): SwapResult => {
        const params = [...baseParams, path, liquidityPools] as [
          Token,
          Token,
          FixedPointNumber,
          FixedPointNumber,
          Token[],
          LiquidityPool[]
        ];

        return mode === 'EXACT_INPUT'
          ? this.getOutputAmountWithExactInput(...params)
          : this.getInputAmountWithExactOutput(...params);
      }
    );

    const temp = swapResult.reduce((acc, cur) => {
      if (mode === 'EXACT_INPUT' && acc.output.balance.isGreaterThanOrEqualTo(cur.output.balance)) return acc;

      if (mode === 'EXACT_OUTPUT' && acc.input.balance.isLessOrEqualTo(cur.input.balance)) return acc;

      return cur;
    }, swapResult[0]);

    return new SwapParameters({ mode, ...temp });
  }
}
