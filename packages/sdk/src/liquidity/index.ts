import {
  AnyApi,
  createDexShareName,
  FixedPointNumber,
  forceToCurrencyName,
  MaybeCurrency,
  Token
} from '@acala-network/sdk-core';
import { TradingPair, TradingPairStatus } from '@acala-network/types/interfaces';
import { StorageKey } from '@polkadot/types';
import { memoize } from '@polkadot/util';
import { BehaviorSubject, combineLatest, firstValueFrom, Observable, of } from 'rxjs';
import { map, switchMap, filter } from 'rxjs/operators';
import { BaseSDK, ChainType } from '../types';
import { getChainType } from '../utils/get-chain-type';
import { Wallet } from '../wallet';
import { TradingPairNotFound } from './errors';
import { createStorages } from './storage';
import {
  PoolDetail,
  LiquidityPoolStatus,
  PoolInfo,
  UserLiquidity,
  EstimateAddLiquidityResult,
  EstimateRemoveLiquidityResult,
  PoolSizeOfShare,
  PoolPositions
} from './types';
import { calcDexPrice } from './utils/calc-dex-price';
import { getEstimateAddLiquidityResult } from './utils/get-estimate-add-liquidity-result';
import { getEstimateRemoveLiquidityResult } from './utils/get-estimate-remove-liquidity-result';
import { getPoolTVL } from './utils/get-pool-tvl';

export class Liquidity implements BaseSDK {
  private api: AnyApi;
  private storages: ReturnType<typeof createStorages>;
  private wallet: Wallet;

  readonly consts: {
    runtimeChain: string;
  };

  public isReady$: BehaviorSubject<boolean>;

  constructor(api: AnyApi, wallet: Wallet) {
    this.api = api;
    this.storages = createStorages(this.api);
    this.wallet = wallet;
    this.isReady$ = new BehaviorSubject<boolean>(true);
    this.consts = {
      runtimeChain: this.api.runtimeChain.toString()
    };
  }

  public get isReady(): Promise<boolean> {
    return firstValueFrom(this.isReady$.pipe(filter((i) => i)));
  }

  /**
   * @name subscribePoolListByStatus
   * @description get pool list which filtered by status
   */
  public subscribePoolListByStatus = memoize((status: LiquidityPoolStatus = 'enabled'): Observable<PoolInfo[]> => {
    const filterByPoolInfos = (
      list: [StorageKey<[TradingPair]>, TradingPairStatus, LiquidityPoolStatus][]
    ): [StorageKey<[TradingPair]>, TradingPairStatus, LiquidityPoolStatus][] => {
      return list.filter((item) => (status === 'all' ? true : item[2] === status));
    };

    const transformStatus = (list: [StorageKey<[TradingPair]>, TradingPairStatus][]) => {
      return list.map((item) => {
        const rawStatus = item[1];
        const status = rawStatus.isEnabled
          ? 'enabled'
          : rawStatus.isDisabled
          ? 'disabled'
          : rawStatus.isProvisioning
          ? 'provision'
          : 'disabled';

        return [...item, status] as [StorageKey<[TradingPair]>, TradingPairStatus, LiquidityPoolStatus];
      });
    };

    const tokenCollections = new Set<string>();

    return this.storages.tradingPairs().observable.pipe(
      map(transformStatus),
      map(filterByPoolInfos),
      map((data) => {
        if (!data.length) {
          return [];
        }

        // collection all useable token to currencyId
        data.forEach((item) => {
          const token1 = item[0].args[0][0];
          const token2 = item[0].args[0][1];

          tokenCollections.add(forceToCurrencyName(token1));
          tokenCollections.add(forceToCurrencyName(token2));
        });

        const tokens = Object.fromEntries(
          Array.from(tokenCollections).map((item) => {
            return [item, this.wallet.getToken(item)];
          })
        );
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
  });

  public getPoolListByStatus(status: LiquidityPoolStatus = 'enabled'): Promise<PoolInfo[]> {
    return firstValueFrom(this.subscribePoolListByStatus(status));
  }

  /**
   * @name subscribePoolInfo
   * @description get pool infomation of `token`
   */
  public subscribePoolInfo = memoize((token: MaybeCurrency): Observable<PoolInfo> => {
    const targetName = forceToCurrencyName(token);

    return this.subscribePoolListByStatus('all').pipe(
      map((list) => {
        const target = list.find((item) => forceToCurrencyName(item.token) === targetName);

        if (target) return target;

        throw new TradingPairNotFound(targetName);
      })
    );
  });

  public getPoolInfo(token: MaybeCurrency): Promise<PoolInfo> {
    return firstValueFrom(this.subscribePoolInfo(token));
  }

  public subscribePoolPositions = memoize((token: MaybeCurrency): Observable<PoolPositions> => {
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

  public getPoolPositions(token: MaybeCurrency): Promise<PoolPositions> {
    return firstValueFrom(this.subscribePoolPositions(token));
  }

  /**
   * @name subscribePoolDetails
   * @description get pool detail of `token`
   */
  public subscribePoolDetails = memoize((token: MaybeCurrency): Observable<PoolDetail> => {
    return this.subscribePoolPositions(token).pipe(
      switchMap((positions) =>
        getPoolTVL(positions, this.wallet).pipe(
          map((tvl) => {
            return {
              ...positions,
              tvl,
              sharePrice: tvl.div(positions.share)
            };
          })
        )
      )
    );
  });

  public getPoolDetail(token: MaybeCurrency): Promise<PoolDetail> {
    return firstValueFrom(this.subscribePoolDetails(token));
  }

  /**
   * @name subscribeAllEnabledPoolDetails
   * @description get all enable pool information
   */
  public subscribeAllEnabledPoolDetails(): Observable<Record<string, PoolDetail>> {
    return this.subscribePoolListByStatus().pipe(
      switchMap((data) => {
        return combineLatest(
          Object.fromEntries(
            data.map((item) => [forceToCurrencyName(item.token), this.subscribePoolDetails(item.token)])
          )
        );
      })
    );
  }

  /**
   * @name getAllEnabledPoolDetails
   * @description get all enable pool information
   */
  public getAllEnabledPoolDetails(): Promise<Record<string, PoolDetail>> {
    return firstValueFrom(this.subscribeAllEnabledPoolDetails());
  }

  /**
   * @name subscribeUserLiquidityDetails
   * @description get `user` `token` pool information
   */
  public subscribeUserLiquidityDetails = memoize((address: string, token: MaybeCurrency): Observable<UserLiquidity> => {
    const getUserLiquidity$ = (poolDetail: PoolDetail) => {
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

    return this.subscribePoolDetails(token).pipe(switchMap(getUserLiquidity$));
  });

  public getUserLiquidityDetails(address: string, token: MaybeCurrency): Promise<UserLiquidity> {
    return firstValueFrom(this.subscribeUserLiquidityDetails(address, token));
  }

  /**
   * @name subscribeAllUserLiquidityDetails
   * @description subscribe all `user` pools information
   */
  public subscribeAllUserLiquidityDetails = memoize((address: string): Observable<Record<string, UserLiquidity>> => {
    return this.subscribePoolListByStatus().pipe(
      switchMap((data) => {
        return combineLatest(
          Object.fromEntries(
            data.map((item) => [
              forceToCurrencyName(item.token),
              this.subscribeUserLiquidityDetails(address, item.token)
            ])
          )
        );
      })
    );
  });

  public getAllUserLiquidityDetails(address: string): Promise<Record<string, UserLiquidity>> {
    return firstValueFrom(this.subscribeAllUserLiquidityDetails(address));
  }

  /**
   * @name subscribeEstimateAddLiquidityResult
   * @description estimate add liquidity result
   */
  public subscribeEstimateAddLiquidityResult = memoize(
    (tokenA: Token, tokenB: Token, inputA: FixedPointNumber, inputB: FixedPointNumber, slippage?: number) => {
      const dexShareToken = Token.fromTokens(tokenA, tokenB);

      return this.subscribePoolDetails(dexShareToken).pipe(
        map((detail) => getEstimateAddLiquidityResult(detail, tokenA, tokenB, inputA, inputB, slippage || 0))
      );
    }
  );

  public getEstimateAddLiquidityResult(
    tokenA: Token,
    tokenB: Token,
    inputA: FixedPointNumber,
    inputB: FixedPointNumber,
    slippage?: number
  ): Promise<EstimateAddLiquidityResult> {
    return firstValueFrom(this.subscribeEstimateAddLiquidityResult(tokenA, tokenB, inputA, inputB, slippage));
  }

  /**
   * @name subscribeEstimateRemoveLiquidity
   * @description subscribe estimate remove liquidity result
   */
  public subscribeEstimateRemoveLiquidityResult = memoize(
    (dexShareToken: Token, removeShare: FixedPointNumber, slippage?: number) => {
      return this.subscribePoolDetails(dexShareToken).pipe(
        map((detail) => {
          return getEstimateRemoveLiquidityResult(detail, removeShare, slippage || 0);
        })
      );
    }
  );

  public getEstimateRemoveLiquidityResult(
    dexShareToken: Token,
    removeShare: FixedPointNumber,
    slippage?: number
  ): Promise<EstimateRemoveLiquidityResult> {
    return firstValueFrom(this.subscribeEstimateRemoveLiquidityResult(dexShareToken, removeShare, slippage));
  }

  /**
   * @name subscribePoolSizeOfShares
   * @description subscribe `dexShareToken` pool size of `shares`
   */
  public susbscribePoolPositionOfShares = memoize((dexShareToken: Token, share: FixedPointNumber) => {
    return this.subscribePoolDetails(dexShareToken).pipe(
      map((detail) => {
        const { share: totalShare, amounts } = detail;

        const ratio = share.div(totalShare);

        return {
          share: share,
          ratio: ratio,
          amounts: [amounts[0].mul(ratio), amounts[1].mul(ratio)] as [FixedPointNumber, FixedPointNumber],
          poolDetail: detail
        };
      })
    );
  });

  public getPoolPositionOfShares(dexShareToken: Token, share: FixedPointNumber): Promise<PoolSizeOfShare> {
    return firstValueFrom(this.susbscribePoolPositionOfShares(dexShareToken, share));
  }

  public subscribeIsPoolEnabled(token0: string | Token, token1?: Token): Observable<boolean> {
    const enabled$ = this.subscribePoolListByStatus();

    return enabled$.pipe(
      map((list) => {
        let name = typeof token0 === 'string' ? token0 : forceToCurrencyName(token0);

        if (token1) {
          name = createDexShareName(forceToCurrencyName(token0), forceToCurrencyName(token1));
        }

        return !!list.find((i) => forceToCurrencyName(i.token) === name);
      })
    );
  }

  public getIsPoolEnabled(token0: string | Token, token1?: Token): Promise<boolean> {
    return firstValueFrom(this.subscribeIsPoolEnabled(token0, token1));
  }

  private subscribeBaseTokenPrice = memoize((token: MaybeCurrency): Observable<FixedPointNumber> => {
    const name = forceToCurrencyName(token);

    if (name === 'KSM') {
      return this.subscribePoolPositions(createDexShareName('KUSD', 'KSM')).pipe(
        map((positions) => {
          return positions.amounts[0].div(positions.amounts[1]);
        })
      );
    }

    if (name === 'DOT') {
      return this.subscribePoolPositions(createDexShareName('AUSD', 'DOT')).pipe(
        map((positions) => {
          return positions.amounts[0].div(positions.amounts[1]);
        })
      );
    }

    if (name === 'KAR') {
      return this.subscribePoolPositions(createDexShareName('KAR', 'KUSD')).pipe(
        map((positions) => {
          return positions.amounts[0].div(positions.amounts[1]);
        })
      );
    }

    if (name === 'ACA') {
      return this.subscribePoolPositions(createDexShareName('ACA', 'AUSD')).pipe(
        map((positions) => {
          return positions.amounts[0].div(positions.amounts[1]);
        })
      );
    }

    if (name === 'sa://0') {
      return this.subscribeBaseTokenPrice('KSM');
    }

    return of(FixedPointNumber.ZERO);
  });

  public subscribeDexPrice = memoize((token: Token) => {
    const karuraBaseTokens = ['KSM', 'KAR', 'KUSD', 'sa://0'];
    // TODO: show add DOT as base token when lp://AUSD/DOT is open
    const acalaBaseTokens = ['ACA', 'AUSD'];
    const chainType = getChainType(this.consts.runtimeChain);
    const name = forceToCurrencyName(token);

    const baseTokens =
      chainType === ChainType.ACALA || chainType === ChainType.MANDALA ? acalaBaseTokens : karuraBaseTokens;

    if (name === 'KUSD' || name === 'AUSD') {
      return of(FixedPointNumber.ONE);
    }

    if (baseTokens.find((i) => i === name)) {
      return this.subscribeBaseTokenPrice(name);
    }

    // create base pools should be sorted
    const basePools = baseTokens.map((i) => {
      const [token0, token1] = Token.sortTokenNames(name, i);

      return createDexShareName(token0, token1);
    });

    // filter opened pools
    const availableBasePools$ = combineLatest(basePools.map((pool) => this.subscribeIsPoolEnabled(pool))).pipe(
      map((result) => basePools.map((pool, i) => ({ pool, isOpen: result[i] })).filter((item) => item.isOpen))
    );

    return availableBasePools$.pipe(
      switchMap((status) => {
        if (status.length === 0) return of(FixedPointNumber.ZERO);

        return combineLatest(status.map((i) => this.subscribePoolPositions(i.pool))).pipe(
          switchMap((list) => calcDexPrice(token, list, this.wallet))
        );
      })
    );
  });

  public getDexPrice = (token: Token): Promise<FixedPointNumber> => {
    return firstValueFrom(this.subscribeDexPrice(token));
  };
}
