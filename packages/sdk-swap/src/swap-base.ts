import { ApiPromise, ApiRx } from '@polkadot/api';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Token, TokenBalance, TokenPair, FixedPointNumber } from '@acala-network/sdk-core';

import { getSupplyAmount, getTargetAmount } from './utils';
import { LiquidityPool, SwapResult, Fee, SwapTradeMode, MiddleResult } from './types';
import { TradeGraph } from './trade-graph';
import { SwapParameters } from './swap-parameters';
import { NoLiquidityPoolError, InsufficientLiquidityError, AmountTooSmall, NoTradingPathError } from './errors';

const MINIMUM_AMOUNT = 1;

const ONE = FixedPointNumber.ONE;

function calculateExchangeFeeRate(path: Token[], fee: FixedPointNumber) {
  return ONE.minus(
    path.slice(1).reduce((acc) => {
      return acc.times(ONE.minus(fee));
    }, ONE)
  );
}

export abstract class SwapBase<T extends ApiPromise | ApiRx> {
  protected api: T;

  // subscribe the enable trading pairs
  protected enableTradingPairs$: BehaviorSubject<TokenPair[]>;

  // the constants of dex module
  readonly constants: {
    tradingPathLimit: number;
    fee: Fee;
  };

  constructor(api: T) {
    this.api = api;

    this.constants = this.queryConstants();

    this.enableTradingPairs$ = new BehaviorSubject<TokenPair[]>([]);
  }

  protected abstract getTradingPairs(): Observable<TokenPair[]>;

  public get config(): { tradingPathLimit: number; fee: Fee } {
    return this.constants;
  }

  private queryConstants() {
    const exchangeFee = this.api.consts.dex.getExchangeFee;

    return {
      tradingPathLimit: parseInt(this.api?.consts?.dex?.tradingPathLimit?.toString() || '3'),
      fee: {
        denominator: new FixedPointNumber(exchangeFee[1].toString()),
        numerator: new FixedPointNumber(exchangeFee[0].toString())
      }
    };
  }

  protected getTokenPairsFromPath(path: Token[]): TokenPair[] {
    const temp = path.slice();

    // push undefined as tail sentinel
    temp.push(undefined as any as Token);

    return temp.reduce((acc, cur, current) => {
      if (!cur || !temp[current + 1]) return acc;

      acc.push(new TokenPair(cur, temp[current + 1]));

      return acc;
    }, [] as TokenPair[]);
  }

  protected isTradingPairEnable(currency1: Token, currency2: Token, enablePairs: TokenPair[]): boolean {
    const temp = new TokenPair(currency1, currency2);

    return !!enablePairs.find((item) => item.isEqual(temp));
  }

  // check all token pairs is enable which used by the path
  private isPathUseable(path: Token[], enablePairs: TokenPair[]) {
    const tokenPairs = this.getTokenPairsFromPath(path);

    const invalidated = tokenPairs.filter((item) => {
      const [token1, token2] = item.getPair();

      return !this.isTradingPairEnable(token1, token2, enablePairs);
    });

    return invalidated.length === 0;
  }

  protected getTradingPathes(input: Token, output: Token): Observable<Token[][]> {
    return this.enableTradingPairs$.pipe(
      map((pairs) => {
        const tradeGraph = new TradeGraph(pairs);
        let paths = tradeGraph.getPathes(input, output, this.constants.tradingPathLimit);

        paths = paths.filter((path) => this.isPathUseable(path, pairs));

        if (paths.length === 0) throw new NoTradingPathError();

        return paths;
      })
    );
  }

  protected sortLiquidityPoolWithTokenOrder(pool: LiquidityPool, token1: Token): [FixedPointNumber, FixedPointNumber] {
    return pool.token1.isEqual(token1) ? [pool.balance1, pool.balance2] : [pool.balance2, pool.balance1];
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

      if (supply.isZero() || target.isZero()) throw new InsufficientLiquidityError();

      const outputAmount = getTargetAmount(
        supply,
        target,
        i === 0 ? result.inputAmount : result.outputAmount,
        this.constants.fee
      );

      if (inputAmount._getInner().toNumber() < MINIMUM_AMOUNT) throw new AmountTooSmall();

      if (outputAmount._getInner().toNumber() < MINIMUM_AMOUNT) throw new AmountTooSmall();

      if (outputAmount.isZero()) throw new InsufficientLiquidityError();

      result.outputAmount = outputAmount;
    }

    const midPrice = this.calculateMidPrice(path, liquidityPools);

    return this.transformToSwapResult({
      ...result,
      midPrice,
      priceImpact: this.calculatePriceImpact(midPrice, result.inputAmount, result.outputAmount)
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

      if (supply.isZero() || target.isZero()) throw new InsufficientLiquidityError();

      const inputAmount = getSupplyAmount(
        supply,
        target,
        i === path.length - 1 ? result.outputAmount : result.inputAmount,
        this.constants.fee
      );

      if (outputAmount._getInner().toNumber() < MINIMUM_AMOUNT) throw new AmountTooSmall();

      if (inputAmount._getInner().toNumber() < MINIMUM_AMOUNT) throw new AmountTooSmall();

      if (inputAmount.isZero()) throw new InsufficientLiquidityError();

      result.inputAmount = inputAmount;
    }

    const midPrice = this.calculateMidPrice(path, liquidityPools);

    return this.transformToSwapResult({
      ...result,
      midPrice,
      priceImpact: this.calculatePriceImpact(midPrice, result.inputAmount, result.outputAmount)
    });
  }

  protected calculateExchangeFee(
    path: Token[],
    input: FixedPointNumber,
    fee: Fee,
    decimal: number
  ): {
    fee: FixedPointNumber;
    rate: FixedPointNumber;
  } {
    const rate = calculateExchangeFeeRate(path, fee.numerator.div(fee.denominator));
    const data = input.times(rate);

    data.forceSetPrecision(decimal);

    return { fee: data, rate };
  }

  protected calculateMidPrice(path: Token[], pools: LiquidityPool[]): FixedPointNumber {
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

  protected calculatePriceImpact(
    midPrice: FixedPointNumber,
    inputAmount: FixedPointNumber,
    outputAmount: FixedPointNumber
  ): FixedPointNumber {
    const temp = midPrice.times(inputAmount);

    return temp.minus(outputAmount).div(temp);
  }

  protected transformToSwapResult(result: MiddleResult): SwapResult {
    const { inputAmount, inputToken, outputAmount, outputToken, path, ...others } = result;

    const _inputAmount = inputAmount.clone();
    const _outputAmount = outputAmount.clone();

    _inputAmount.forceSetPrecision(inputToken.decimals);
    _outputAmount.forceSetPrecision(outputToken.decimals);

    const { fee: exchangeFee, rate: exchangeRate } = this.calculateExchangeFee(
      path,
      inputAmount,
      this.config.fee,
      inputToken.decimals
    );

    return {
      exchangeFee,
      exchangeRate,
      input: new TokenBalance(inputToken, _inputAmount),
      output: new TokenBalance(outputToken, _outputAmount),
      path,
      naturalPriceImpact: others.priceImpact.sub(exchangeRate).max(FixedPointNumber.ZERO),
      ...others
    };
  }

  protected getBestSwapResult(
    mode: SwapTradeMode,
    paths: Token[][],
    liquidityPools: LiquidityPool[],
    baseParams: [Token, Token, FixedPointNumber, FixedPointNumber]
  ): SwapParameters {
    const swapResult = paths.map((path): [Error | null, SwapResult | null] => {
      const params = [...baseParams, path, liquidityPools] as [
        Token,
        Token,
        FixedPointNumber,
        FixedPointNumber,
        Token[],
        LiquidityPool[]
      ];

      try {
        return [
          null,
          mode === 'EXACT_INPUT'
            ? this.getOutputAmountWithExactInput(...params)
            : this.getInputAmountWithExactOutput(...params)
        ];
      } catch (e) {
        return [e, null] as [Error, null];
      }
    });

    const swapResultsLen = swapResult.length;

    const result = swapResult.reduce((preResult, [error, result], i) => {
      if (!preResult && error && i === swapResultsLen - 1) {
        throw error;
      }

      if (!result) return preResult;

      if (result && preResult) {
        if (mode === 'EXACT_INPUT' && preResult.output.balance.gt(result.output.balance)) return preResult;

        if (mode === 'EXACT_OUTPUT' && preResult.input.balance.lt(result.input.balance)) return preResult;
      }

      return result;
    }, swapResult?.[0]?.[1]);

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return new SwapParameters(mode, result!);
  }
}
