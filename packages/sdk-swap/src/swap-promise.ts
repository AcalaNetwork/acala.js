import { ApiPromise } from '@polkadot/api';
import { memoize } from '@polkadot/util';
import { Observable, from, of } from 'rxjs';
import { switchMap, map, shareReplay, withLatestFrom, filter, take } from 'rxjs/operators';
import { Balance } from '@acala-network/types/interfaces';
import { eventMethodsFilter, Token, TokenPair, TokenSet } from '@acala-network/sdk-core';
import { FixedPointNumber } from '@acala-network/sdk-core/fixed-point-number';
import { ITuple } from '@polkadot/types/types';

import { SwapParameters } from './swap-parameters';
import { LiquidityPool, SwapTradeMode } from './types';
import { SwapBase } from './swap-base';

export class SwapPromise extends SwapBase<ApiPromise> {
  constructor(api: ApiPromise) {
    super(api);

    this._getTradingPairs();
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
    const result = await this.enableTradingPairs$.toPromise();

    return result || [];
  }

  private getLiquidityPoolsByPath = memoize((paths: Token[][]): Observable<LiquidityPool[]> => {
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
      }),
      shareReplay(1)
    );
  });

  private _getTradingPairs() {
    const inner = async () => {
      const result = await this.api.query.dex.tradingPairStatuses.entries();

      this.enableTradingPairs$.next(
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

  protected getTradingPairs(): Observable<TokenPair[]> {
    return this.enableTradingPairs$;
  }

  private swapper = memoize((inputToken: Token, outputToken: Token) => {
    return this.enableTradingPairs$.pipe(
      filter((i) => i.length !== 0),
      switchMap(() => {
        return this.getTradingPathes(inputToken, outputToken).pipe(
          switchMap((paths) => this.getLiquidityPoolsByPath(paths).pipe(withLatestFrom(of(paths)))),
          shareReplay(1)
        );
      })
    );
  });

  public async swap(
    path: [Token, Token],
    input: FixedPointNumber,
    mode: SwapTradeMode
  ): Promise<SwapParameters | undefined> {
    const inputToken = path[0];
    const outputToken = path[1];

    // clear input amount's precision information
    const _input = FixedPointNumber._fromBN(input._getInner());

    const inputAmount = mode === 'EXACT_INPUT' ? _input : FixedPointNumber.ZERO;
    const outputAmount = mode === 'EXACT_OUTPUT' ? _input : FixedPointNumber.ZERO;

    const swapper = this.swapper(inputToken, outputToken);

    const result = await swapper
      .pipe(
        filter(([liquidityPool]) => liquidityPool.length !== 0),
        map(([liquidityPool, paths]) => {
          return this.getBestSwapResult(mode, paths, liquidityPool, [
            inputToken,
            outputToken,
            inputAmount,
            outputAmount
          ]);
        }),
        take(1)
      )
      .toPromise();

    return result;
  }
}
