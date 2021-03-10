import { ApiRx } from '@polkadot/api';
import { Observable, from } from 'rxjs';
import { filter, switchMap, startWith, map } from 'rxjs/operators';
import { Balance, TradingPairStatus } from '@acala-network/types/interfaces';
import { eventMethodsFilter, mockEventRecord, Token, TokenBalance, TokenPair, TokenSet } from '@acala-network/sdk-core';
import { FixedPointNumber } from '@acala-network/sdk-core/fixed-point-number';
import { ITuple } from '@polkadot/types/types';
import { assert } from '@polkadot/util';

import { TradeGraph } from './trade-graph';
import { getSupplyAmount, getTargetAmount, Fee, SwapTradeMode } from './help';
import { SwapParameters } from './swap-parameters';

interface LiquidityPool {
  token1: TokenBalance;
  token2: TokenBalance;
}

interface SwapResult {
  midPrice: FixedPointNumber;
  priceImpact: FixedPointNumber;
  path: Token[];
  input: TokenBalance;
  output: TokenBalance;
}

export class SwapRX {
  private api: ApiRx;
  private enableTradingPairs$: Observable<TokenPair[]>;
  private config: {
    tradingPathLimit: number;
    fee: Fee;
  };

  constructor(api: ApiRx) {
    this.api = api;

    this.config = {
      tradingPathLimit: parseInt(api?.consts?.dex?.tradingPathLimit?.toString() || '3'),
      fee: this.getExchangeFee()
    };

    this.enableTradingPairs$ = this.subscribeTradingPair();
  }

  get tradingPathLimit(): number {
    return this.config.tradingPathLimit;
  }

  get enableTradingPairs(): Observable<TokenPair[]> {
    return this.enableTradingPairs$;
  }

  get availableTokens(): Observable<TokenSet> {
    return this.enableTradingPairs$.pipe(
      map((tokenPairs) => {
        const temp = new TokenSet();

        tokenPairs.forEach((tokenPair) => {
          const [token1, token2] = tokenPair.getPair();

          temp.add(token1);
          temp.add(token2);
        });

        return temp;
      })
    );
  }

  get exchangeFee(): Fee {
    return this.config.fee;
  }

  private getExchangeFee() {
    const exchangeFee = this.api.consts.dex.getExchangeFee;

    return {
      denominator: new FixedPointNumber(exchangeFee[1].toString()),
      numerator: new FixedPointNumber(exchangeFee[0].toString())
    };
  }

  private subscribeTradingPair(filterFn?: (status: TradingPairStatus) => boolean) {
    return this.api.query.system.events().pipe(
      startWith(mockEventRecord('', 'EnableTradingPair')),
      switchMap((events) => from(events)),
      filter(eventMethodsFilter(['EnableTradingPair', 'ProvisioningToEnabled', 'DisableTradingPair'])),
      switchMap(() => {
        return this.api.query.dex.tradingPairStatuses.entries().pipe(
          map((result) => {
            const _filterFn = filterFn || ((status: TradingPairStatus) => status.isEnabled);

            return result
              .filter((item) => _filterFn(item[1]))
              .map((item) => TokenPair.fromCurrencies(item[0].args[0][0], item[0].args[0][1]));
          })
        );
      })
    );
  }

  private getTradePathes(input: Token, output: Token): Observable<Token[][]> {
    return this.enableTradingPairs.pipe(
      map((pairs) => {
        const tradeGraph = new TradeGraph(pairs);

        return tradeGraph
          .getPathes(input, output)
          .filter((path) => {
            let flag = true;
            const tokenPairs = this.getTokenPairsFromPath(path);

            tokenPairs.forEach((pair) => {
              const [token1, token2] = pair.getPair();

              flag = flag && this.checkTradingPairIsEnabled(token1, token2, pairs);
            });

            return flag;
          })
          .filter((path) => path.length <= this.config.tradingPathLimit);
      })
    );
  }

  private getTokenPairsFromPath(path: Token[]) {
    const _path = path.slice();
    // push undefined as tail
    _path.push((undefined as any) as Token);

    return _path.reduce((acc, cur, current) => {
      if (!cur || !_path[current + 1]) return acc;

      acc.push(new TokenPair(cur, _path[current + 1]));

      return acc;
    }, [] as TokenPair[]);
  }

  private liquidityPoolsByPaths$(paths: Token[][]): Observable<LiquidityPool[]> {
    const usedTokenPairs = paths
      .reduce((acc: TokenPair[], path: Token[]) => {
        acc = acc.concat(this.getTokenPairsFromPath(path));

        return acc;
      }, [])
      .reduce((acc, cur) => {
        const isExist = acc.find((item) => item.isEqual(cur));

        if (isExist) return acc;

        acc.push(cur);

        return acc;
      }, [] as TokenPair[]);

    return this.api
      .queryMulti<ITuple<[Balance, Balance]>[]>(
        usedTokenPairs.map((item) => [this.api.query.dex.liquidityPool, item.toTradingPair(this.api)])
      )
      .pipe(
        map((data: ITuple<[Balance, Balance]>[]) => {
          return usedTokenPairs.map((item, index) => {
            const liquidity = data[index];
            const pair = item.getPair();

            return {
              token1: new TokenBalance(pair[0], FixedPointNumber.fromInner(liquidity[0].toString())),
              token2: new TokenBalance(pair[1], FixedPointNumber.fromInner(liquidity[1].toString()))
            };
          });
        })
      );
  }

  private checkTradingPairIsEnabled(currency1: Token, currency2: Token, tradingPairs: TokenPair[]) {
    const temp = new TokenPair(currency1, currency2);

    return !!tradingPairs.find((item) => item.isEqual(temp));
  }

  private formatLiquidityWithOrder(liquidity: LiquidityPool, token1: Token) {
    if (liquidity.token1.token.isEqual(token1)) {
      return [liquidity.token1, liquidity.token2];
    }

    return [liquidity.token2, liquidity.token1];
  }

  private getOutputAmountWithExactInput(
    input: TokenBalance,
    output: TokenBalance,
    path: Token[],
    liquidityPools: LiquidityPool[]
  ) {
    const result = { input, output, path };
    const routeTemp: { input: FixedPointNumber; output: FixedPointNumber }[] = [];

    for (let i = 0; i < path.length - 1; i++) {
      const pair = new TokenPair(path[i], path[i + 1]);
      const [token1, token2] = pair.getPair();
      const pool = liquidityPools.find(
        (item) => item.token1.token.isEqual(token1) && item.token2.token.isEqual(token2)
      );

      assert(pool, `the liquidity pool isn't exist`);

      const [supply, target] = this.formatLiquidityWithOrder(pool, path[i]);

      const outputAmount = getTargetAmount(
        supply.balance,
        target.balance,
        i === 0 ? result.input.balance : result.output.balance,
        this.config.fee
      );

      routeTemp[i] = {
        input: i === 0 ? result.input.balance : routeTemp[i - 1].output,
        output: outputAmount
      };

      result.output = new TokenBalance(output.token, outputAmount);
    }

    const midPrice = this.getPrices(routeTemp);

    return {
      ...result,
      midPrice,
      priceImpact: this.getPriceImpact(midPrice, result.input.balance, result.output.balance)
    };
  }

  private getInputAmountWithExactOutput(
    input: TokenBalance,
    output: TokenBalance,
    path: Token[],
    liquidityPools: LiquidityPool[]
  ) {
    const result = { input, output, path };
    const routeTemp: { input: FixedPointNumber; output: FixedPointNumber }[] = [];

    for (let i = path.length - 1; i > 0; i--) {
      const pair = new TokenPair(path[i], path[i - 1]);
      const [token1, token2] = pair.getPair();
      const pool = liquidityPools.find(
        (item) => item.token1.token.isEqual(token1) && item.token2.token.isEqual(token2)
      );

      assert(pool, `the liquidity pool isn't exist`);

      const [supply, target] = this.formatLiquidityWithOrder(pool, path[i - 1]);

      const inputAmount = getSupplyAmount(
        supply.balance,
        target.balance,
        i === path.length - 1 ? result.output.balance : result.input.balance,
        this.config.fee
      );

      routeTemp[i - 1] = {
        input: inputAmount,
        output: i === path.length - 1 ? result.output.balance : routeTemp[i].input
      };

      result.input = new TokenBalance(input.token, inputAmount);
    }

    const midPrice = this.getPrices(routeTemp);

    return {
      ...result,
      midPrice,
      priceImpact: this.getPriceImpact(midPrice, result.input.balance, result.output.balance)
    };
  }

  private getPrices(route: { input: FixedPointNumber; output: FixedPointNumber }[]): FixedPointNumber {
    const prices: FixedPointNumber[] = [];

    for (const item of route) {
      prices.push(item.input.div(item.output));
    }

    return prices.slice(1).reduce((acc, cur) => {
      return acc.times(cur);
    }, prices[0]);
  }

  private getPriceImpact(
    price: FixedPointNumber,
    inputAmount: FixedPointNumber,
    outputAmount: FixedPointNumber
  ): FixedPointNumber {
    const temp = price.times(inputAmount);

    return temp.minus(outputAmount).div(temp);
  }

  public swap(input: TokenBalance, output: TokenBalance, mode: SwapTradeMode): Observable<SwapParameters> {
    const _input = input.clone();
    const _output = output.clone();

    return this.getTradePathes(_input.token, _output.token).pipe(
      switchMap((paths: Token[][]) => {
        return this.liquidityPoolsByPaths$(paths).pipe(
          map((liquidityPool) => {
            const swapResult = paths.map(
              (path): SwapResult => {
                if (mode === 'EXACT_INPUT') {
                  return this.getOutputAmountWithExactInput(input, output, path, liquidityPool);
                } else {
                  return this.getInputAmountWithExactOutput(input, output, path, liquidityPool);
                }
              }
            );

            if (mode === 'EXACT_INPUT') {
              const temp = swapResult.reduce((acc, cur) => {
                if (acc.output.balance.isGreaterThanOrEqualTo(cur.output.balance)) return acc;

                return cur;
              }, swapResult[0]);

              return new SwapParameters(temp);
            } else {
              const temp = swapResult.reduce((acc, cur) => {
                if (acc.input.balance.isLessOrEqualTo(cur.input.balance)) return acc;

                return cur;
              }, swapResult[0]);

              return new SwapParameters(temp);
            }
          })
        );
      })
    );
  }
}
