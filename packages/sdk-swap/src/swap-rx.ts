import { ApiRx } from '@polkadot/api';
import { memoize } from '@polkadot/util';
import { Observable, from, of } from 'rxjs';
import { filter, switchMap, startWith, map, shareReplay, withLatestFrom } from 'rxjs/operators';
import { Balance, TradingPairStatus } from '@acala-network/types/interfaces';
import { eventMethodsFilter, mockEventRecord, Token, TokenPair, TokenSet } from '@acala-network/sdk-core';
import { FixedPointNumber } from '@acala-network/sdk-core/fixed-point-number';
import { ITuple } from '@polkadot/types/types';

import { SwapParameters } from './swap-parameters';
import { LiquidityPool, SwapTradeMode } from './types';
import { SwapBase } from './swap-base';

export class SwapRx extends SwapBase<ApiRx> {
  constructor(api: ApiRx) {
    super(api);

    this.getTradingPairs().subscribe((data) => this.enableTradingPairs$.next(data));
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

  protected getTradingPairs(): Observable<TokenPair[]> {
    return this.api.query.system.events().pipe(
      startWith(mockEventRecord('', 'EnableTradingPair')),
      switchMap((events) => from(events)),
      filter(eventMethodsFilter(['EnableTradingPair', 'ProvisioningToEnabled', 'DisableTradingPair'])),
      switchMap(() => this.api.query.dex.tradingPairStatuses.entries()),
      map((result) => {
        const _filterFn = (status: TradingPairStatus) => status.isEnabled;

        return result
          .filter((item) => _filterFn(item[1]))
          .map((item) => TokenPair.fromCurrencies(item[0].args[0][0], item[0].args[0][1]));
      }),
      shareReplay(1)
    );
  }

  private getLiquidityPoolsByPath(paths: Token[][]): Observable<LiquidityPool[]> {
    const usedTokenPairs = paths
      .reduce((acc: TokenPair[], path: Token[]) => acc.concat(this.getTokenPairsFromPath(path)), [])
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
        }),
        shareReplay(1)
      );
  }

  private _swapper = memoize((inputToken: Token, outputToken: Token) => {
    return this.getTradingPathes(inputToken, outputToken).pipe(
      switchMap((paths) => this.getLiquidityPoolsByPath(paths).pipe(withLatestFrom(of(paths))))
    );
  });

  public swap(path: [Token, Token], input: FixedPointNumber, mode: SwapTradeMode): Observable<SwapParameters> {
    const inputToken = path[0];
    const outputToken = path[1];

    // clear input amount's precision information
    const _input = FixedPointNumber._fromBN(input._getInner());
    const _inputToken = new Token(inputToken.name, {
      isDexShare: inputToken.isDexShare,
      isERC20: inputToken.isERC20,
      isTokenSymbol: inputToken.isTokenSymbol,
      decimal: 18
    });
    const _outputToken = new Token(outputToken.name, {
      isDexShare: outputToken.isDexShare,
      isERC20: outputToken.isERC20,
      isTokenSymbol: outputToken.isTokenSymbol,
      decimal: 18
    });

    const inputAmount = mode === 'EXACT_INPUT' ? _input : FixedPointNumber.ZERO;
    const outputAmount = mode === 'EXACT_OUTPUT' ? _input : FixedPointNumber.ZERO;

    const swapper = this._swapper(_inputToken, _outputToken);

    return swapper.pipe(
      map(([liquidityPool, paths]) => {
        return this.getBestSwapResult(mode, paths, liquidityPool, [inputToken, outputToken, inputAmount, outputAmount]);
      })
    );
  }
}
