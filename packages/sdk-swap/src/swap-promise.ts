import { ApiPromise } from '@polkadot/api';
import { BehaviorSubject, Observable, from } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { Balance } from '@acala-network/types/interfaces';
import { eventMethodsFilter, Token, TokenBalance, TokenPair, TokenSet } from '@acala-network/sdk-core';
import { FixedPointNumber } from '@acala-network/sdk-core/fixed-point-number';
import { ITuple } from '@polkadot/types/types';

import { SwapTradeMode } from './help';
import { SwapParameters } from './swap-parameters';
import { LiquidityPool, SwapResult } from './types';
import { SwapBase } from './swap-base';

export class SwapPromise extends SwapBase<ApiPromise> {
  private tradingPairSubject: BehaviorSubject<TokenPair[]>;
  constructor(api: ApiPromise) {
    const tradingPairSubject = new BehaviorSubject<TokenPair[]>([]);

    super(api, tradingPairSubject);

    this.tradingPairSubject = tradingPairSubject;
    this._subscribeTradingPair();
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

  public async getEnableTradingPairs(): Promise<TokenPair[]> {
    return this.enableTradingPairs$.toPromise();
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

    return from(
      this.api.queryMulti<ITuple<[Balance, Balance]>[]>(
        usedTokenPairs.map((item) => [this.api.query.dex.liquidityPool, item.toTradingPair(this.api)])
      )
    ).pipe(
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

  private _subscribeTradingPair() {
    const inner = async () => {
      const result = await this.api.query.dex.tradingPairStatuses.entries();

      this.tradingPairSubject.next(
        result
          .filter(([, status]) => status.isEnabled)
          .map((item) => TokenPair.fromCurrencies(item[0].args[0][0], item[0].args[0][1]))
      );
    };

    inner();

    this.api.query.system.events((result) => {
      for (const event of result) {
        if (eventMethodsFilter(['EnableTradingPair', 'ProvisioningToEnabled', 'DisableTradingPair'])(event)) {
          inner();
        }
      }
    });
  }

  protected subscribeTradingPair(): Observable<TokenPair[]> {
    return this.tradingPairSubject;
  }

  public swap(
    input: TokenBalance,
    output: TokenBalance,
    mode: SwapTradeMode,
    callback: (parameters: SwapParameters) => void
  ): void {
    const inputToken = input.token;
    const outputToken = output.token;

    const inputAmount = FixedPointNumber._fromBN(input.balance._getInner());
    const outputAmount = FixedPointNumber._fromBN(output.balance._getInner());

    this.getTradePathes(inputToken, outputToken)
      .pipe(
        switchMap((paths: Token[][]) => {
          return this.liquidityPoolsByPaths$(paths).pipe(
            map((liquidityPool) => {
              const swapResult = paths.map(
                (path): SwapResult => {
                  if (mode === 'EXACT_INPUT') {
                    return this.transformToSwapResult(
                      this.getOutputAmountWithExactInput(
                        inputToken,
                        outputToken,
                        inputAmount,
                        outputAmount,
                        path,
                        liquidityPool
                      )
                    );
                  } else {
                    return this.transformToSwapResult(
                      this.getInputAmountWithExactOutput(
                        inputToken,
                        outputToken,
                        inputAmount,
                        outputAmount,
                        path,
                        liquidityPool
                      )
                    );
                  }
                }
              );

              if (mode === 'EXACT_INPUT') {
                const temp = swapResult.reduce((acc, cur) => {
                  if (acc.output.balance.isGreaterThanOrEqualTo(cur.output.balance)) return acc;

                  return cur;
                }, swapResult[0]);

                if (temp) {
                  callback(new SwapParameters(temp));
                }
              } else {
                const temp = swapResult.reduce((acc, cur) => {
                  if (acc.input.balance.isLessOrEqualTo(cur.input.balance)) return acc;

                  return cur;
                }, swapResult[0]);

                if (temp) {
                  callback(new SwapParameters(temp));
                }
              }
            })
          );
        })
      )
      .subscribe();
  }
}
