import { AnyApi, FixedPointNumber, forceToCurrencyName, MaybeCurrency, Token } from '@acala-network/sdk-core';
import { LiquidityPoolHelper } from './utils/liquidity-pool-helper';
import { TradingPair, TradingPairStatus } from '@acala-network/types/interfaces';
import { StorageKey } from '@polkadot/types';
import { memoize } from '@polkadot/util';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { TradingPairNotFound } from '..';
import { TokenProvider } from '../base-provider';
import { BaseSDK } from '../types';
import { createStorages } from './storage';
import { LiquidityDetail, LiquidityPoolStatus, PoolInfo, UserLiquidity } from './types';

export class Liquidity implements BaseSDK {
  private api: AnyApi;
  private storages: ReturnType<typeof createStorages>;
  private tokenProvider: TokenProvider;
  private isReady$: BehaviorSubject<boolean>;

  constructor(api: AnyApi, tokenProvider: TokenProvider) {
    this.api = api;
    this.storages = createStorages(this.api);
    this.tokenProvider = tokenProvider;
    this.isReady$ = new BehaviorSubject<boolean>(false);
  }

  public get isReady(): Observable<boolean> {
    return this.isReady$.asObservable();
  }

  /**
   * @name subscribePoolListByStatus
   * @description get pool list which filtered by status
   */
  public subscribePoolListByStatus = memoize(
    (status: LiquidityPoolStatus = LiquidityPoolStatus.ENABLED): Observable<PoolInfo[]> => {
      const filterByPoolInfos = (
        list: [StorageKey<[TradingPair]>, TradingPairStatus, LiquidityPoolStatus][]
      ): [StorageKey<[TradingPair]>, TradingPairStatus, LiquidityPoolStatus][] => {
        return list.filter((item) => {
          if (status === LiquidityPoolStatus.ALL) {
            return true;
          }

          return item[2] === status;
        });
      };

      const mapStatusToData = (list: [StorageKey<[TradingPair]>, TradingPairStatus][]) => {
        return list.map((item) => {
          const rawStatus = item[1];
          const status = rawStatus.isEnabled
            ? LiquidityPoolStatus.ENABLED
            : rawStatus.isDisabled
            ? LiquidityPoolStatus.DISABLED
            : rawStatus.isProvisioning
            ? LiquidityPoolStatus.PROVISION
            : LiquidityPoolStatus.PROVISION;

          return [...item, status] as [StorageKey<[TradingPair]>, TradingPairStatus, LiquidityPoolStatus];
        });
      };

      const tokenCollections = new Set<string>();

      return this.storages.tradingPairs().observable.pipe(
        map(mapStatusToData),
        map(filterByPoolInfos),
        switchMap((data) => {
          // collection all useable token to currencyId

          data.forEach((item) => {
            const token1 = item[0].args[0][0];
            const token2 = item[0].args[0][1];

            tokenCollections.add(forceToCurrencyName(token1));
            tokenCollections.add(forceToCurrencyName(token2));
          });

          return combineLatest(
            Object.fromEntries(
              Array.from(tokenCollections).map((item) => {
                return [item, this.tokenProvider.subscribeToken(item)];
              })
            )
          ).pipe(
            map((tokens) => {
              return data.map((item) => {
                const token1 = tokens[forceToCurrencyName(item[0].args[0][0])];
                const token2 = tokens[forceToCurrencyName(item[0].args[0][1])];

                return {
                  token: Token.fromTokens(token1, token2),
                  pair: [token1, token2] as [Token, Token],
                  status: item[2]
                };
              });
            })
          );
        })
      );
    }
  );

  /**
   * @name subscribePoolInfo
   * @description get
   */
  public subscribePoolInfo = memoize((token: MaybeCurrency): Observable<PoolInfo> => {
    const targetName = forceToCurrencyName(token);

    return this.subscribePoolListByStatus(LiquidityPoolStatus.ALL).pipe(
      map((list) => {
        const target = list.find((item) => forceToCurrencyName(item.token) === targetName);

        if (target) return target;

        throw new TradingPairNotFound(targetName);
      })
    );
  });

  /**
   * @name subscribePoolDetail
   * @description get pool information of `token`
   */
  public subscribePoolDetail = memoize((token: MaybeCurrency): Observable<LiquidityDetail> => {
    const detail$ = (info: PoolInfo) => {
      const issuance$ = this.storages
        .issuance(info.token)
        .observable.pipe(map((data) => FixedPointNumber.fromInner(data.toString(), info.token.decimals)));
      const poolSize$ = this.storages.liquidityPool(info.token).observable.pipe(
        map((data) => {
          return [
            FixedPointNumber.fromInner(data[0].toString(), info.pair[0].decimals),
            FixedPointNumber.fromInner(data[1].toString(), info.pair[1].decimals)
          ] as [FixedPointNumber, FixedPointNumber];
        })
      );

      return combineLatest({
        issuance: issuance$,
        poolSize: poolSize$
      }).pipe(
        map(({ issuance, poolSize }) => {
          return { share: issuance, info, amounts: poolSize };
        })
      );
    };

    return this.subscribePoolInfo(token).pipe(switchMap(detail$));
  });

  public subscribeAllEnabledPools(): Observable<Record<string, LiquidityDetail>> {
    return this.subscribePoolListByStatus(LiquidityPoolStatus.ENABLED).pipe(
      switchMap((data) => {
        return combineLatest(
          Object.fromEntries(
            data.map((item) => [forceToCurrencyName(item.token), this.subscribePoolDetail(item.token)])
          )
        );
      })
    );
  }

  public subscribeUserPool = memoize((address: string, token: MaybeCurrency): Observable<UserLiquidity> => {
    const getUserLiquidity$ = (poolDetail: LiquidityDetail) => {
      return this.storages.balance(address, poolDetail.info.token).observable.pipe(
        map((balance) => {
          // only handle free part
          const userShare = FixedPointNumber.fromInner(balance.free.toString(), poolDetail.info.token.decimals);

          const ratio = userShare.div(poolDetail.share);

          const owned = [poolDetail.amounts[0].mul(ratio), poolDetail.amounts[1].mul(ratio)] as [
            FixedPointNumber,
            FixedPointNumber
          ];

          return {
            share: userShare,
            ratio,
            poolDetail,
            owned
          };
        })
      );
    };

    return this.subscribePoolDetail(token).pipe(switchMap(getUserLiquidity$));
  });

  public subscribeAllUserPools = memoize((address: string): Observable<Record<string, UserLiquidity>> => {
    return this.subscribePoolListByStatus(LiquidityPoolStatus.ENABLED).pipe(
      switchMap((data) => {
        return combineLatest(
          Object.fromEntries(
            data.map((item) => [forceToCurrencyName(item.token), this.subscribeUserPool(address, item.token)])
          )
        );
      })
    );
  });

  public estimateAddLiquidityResult = memoize(
    (tokenA: Token, tokenB: Token, inputA: FixedPointNumber, inputB: FixedPointNumber, slippage = 0) => {
      const dexShareToken = Token.fromTokens(tokenA, tokenB);

      return this.subscribePoolDetail(dexShareToken).pipe(
        map((data) => {
          const helper = new LiquidityPoolHelper({
            token0: data.info.pair[0],
            token1: data.info.pair[1],
            pool0: data.amounts[0],
            pool1: data.amounts[1]
          });

          return helper.estimateAddLiquidity({
            tokenA,
            tokenB,
            maxAmountA: inputA,
            maxAmountB: inputB,
            totalShare: data.share,
            slippage
          });
        })
      );
    }
  );
}
