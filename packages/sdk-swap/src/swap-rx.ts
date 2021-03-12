import { ApiRx } from '@polkadot/api';
import { Observable, from } from 'rxjs';
import { filter, switchMap, startWith, map, shareReplay } from 'rxjs/operators';
import { Balance, TradingPairStatus } from '@acala-network/types/interfaces';
import { eventMethodsFilter, mockEventRecord, Token, TokenBalance, TokenPair, TokenSet } from '@acala-network/sdk-core';
import { FixedPointNumber } from '@acala-network/sdk-core/fixed-point-number';
import { ITuple } from '@polkadot/types/types';

import { TradeGraph } from './trade-graph';
import { getSupplyAmount, getTargetAmount, Fee, SwapTradeMode } from './help';
import { SwapParameters } from './swap-parameters';

interface LiquidityPool {
  token1: Token;
  token2: Token;
  balance1: FixedPointNumber;
  balance2: FixedPointNumber;
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
          }),
          shareReplay(1)
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
              token1: pair[0],
              token2: pair[1],
              balance1: FixedPointNumber.fromInner(liquidity[0].toString()),
              balance2: FixedPointNumber.fromInner(liquidity[1].toString())
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
    if (liquidity.token1.isEqual(token1)) {
      return [liquidity.balance1, liquidity.balance2];
    }

    return [liquidity.balance2, liquidity.balance1];
  }

  private getOutputAmountWithExactInput(
    inputToken: Token,
    outputToken: Token,
    inputAmount: FixedPointNumber,
    outputAmount: FixedPointNumber,
    path: Token[],
    liquidityPools: LiquidityPool[]
  ) {
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

  private getInputAmountWithExactOutput(
    inputToken: Token,
    outputToken: Token,
    inputAmount: FixedPointNumber,
    outputAmount: FixedPointNumber,
    path: Token[],
    liquidityPools: LiquidityPool[]
  ) {
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
    const inputToken = input.token;
    const outputToken = output.token;

    const inputAmount = FixedPointNumber._fromBN(input.balance._getInner());
    const outputAmount = FixedPointNumber._fromBN(output.balance._getInner());

    return this.getTradePathes(inputToken, outputToken).pipe(
      switchMap((paths: Token[][]) => {
        return this.liquidityPoolsByPaths$(paths).pipe(
          map((liquidityPool) => {
            const swapResult = paths.map(
              (path): SwapResult => {
                if (mode === 'EXACT_INPUT') {
                  const {
                    inputAmount: _inputAmount,
                    inputToken: _inputToken,
                    outputAmount: _outputAmount,
                    outputToken: _outputToken,
                    ...other
                  } = this.getOutputAmountWithExactInput(
                    inputToken,
                    outputToken,
                    inputAmount,
                    outputAmount,
                    path,
                    liquidityPool
                  );

                  _inputAmount.forceSetPrecision(_inputToken.decimal);
                  _outputAmount.forceSetPrecision(_outputToken.decimal);

                  return {
                    input: new TokenBalance(_inputToken, _inputAmount),
                    output: new TokenBalance(_outputToken, _outputAmount),
                    ...other
                  };
                } else {
                  const {
                    inputAmount: _inputAmount,
                    inputToken: _inputToken,
                    outputAmount: _outputAmount,
                    outputToken: _outputToken,
                    ...other
                  } = this.getInputAmountWithExactOutput(
                    inputToken,
                    outputToken,
                    inputAmount,
                    outputAmount,
                    path,
                    liquidityPool
                  );

                  _inputAmount.forceSetPrecision(_inputToken.decimal);
                  _outputAmount.forceSetPrecision(_outputToken.decimal);

                  return {
                    input: new TokenBalance(_inputToken, _inputAmount),
                    output: new TokenBalance(_outputToken, _outputAmount),
                    ...other
                  };
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
