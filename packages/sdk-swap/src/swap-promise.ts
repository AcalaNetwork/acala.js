import { ApiPromise } from '@polkadot/api';
import { memoize } from '@polkadot/util';
import { Memoized } from '@polkadot/util/types';
import { BehaviorSubject, Observable, from, of } from 'rxjs';
import { switchMap, map, shareReplay, withLatestFrom } from 'rxjs/operators';
import { Balance } from '@acala-network/types/interfaces';
import { eventMethodsFilter, Token, TokenPair, TokenSet } from '@acala-network/sdk-core';
import { FixedPointNumber } from '@acala-network/sdk-core/fixed-point-number';
import { ITuple } from '@polkadot/types/types';

import { SwapParameters } from './swap-parameters';
import { LiquidityPool, SwapTradeMode } from './types';
import { SwapBase } from './swap-base';

export class SwapPromise extends SwapBase<ApiPromise> {
  private tradingPairSubject: BehaviorSubject<TokenPair[]>;
  private swapper: Memoized<(inputToken: Token, outputToken: Token) => Observable<[LiquidityPool[], Token[][]]>>;

  constructor(api: ApiPromise) {
    const tradingPairSubject = new BehaviorSubject<TokenPair[]>([]);

    super(api, tradingPairSubject);

    this.tradingPairSubject = tradingPairSubject;
    this.swapper = this.getSwapper();
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
    return this.enableTradingPairs$.toPromise();
  }

  private getLiquidityPoolsByPath(paths: Token[][]): Observable<LiquidityPool[]> {
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

  private _getTradingPairs() {
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

  protected getTradingPairs(): Observable<TokenPair[]> {
    return this.tradingPairSubject;
  }

  private getSwapper() {
    return memoize((inputToken: Token, outputToken: Token) => {
      return this.getTradePathes(inputToken, outputToken).pipe(
        switchMap((paths) => this.getLiquidityPoolsByPath(paths).pipe(withLatestFrom(of(paths)))),
        shareReplay(1)
      );
    });
  }

  public swap(
    path: [Token, Token],
    input: FixedPointNumber,
    mode: SwapTradeMode,
    callback: (parameters: SwapParameters) => void
  ): void {
    const inputToken = path[0];
    const outputToken = path[1];

    // clear input amount's precision information
    const _input = FixedPointNumber._fromBN(input._getInner());

    const inputAmount = mode === 'EXACT_INPUT' ? _input : FixedPointNumber.ZERO;
    const outputAmount = mode === 'EXACT_OUTPUT' ? _input : FixedPointNumber.ZERO;

    const swapper = this.swapper(inputToken, outputToken);

    swapper
      .pipe(
        map(([liquidityPool, paths]) => {
          const result = this.getBestSwapResult(mode, paths, liquidityPool, [
            inputToken,
            outputToken,
            inputAmount,
            outputAmount
          ]);

          if (result) {
            callback(result);
          }
        })
      )
      .subscribe();
  }
}
