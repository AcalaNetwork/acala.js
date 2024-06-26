import { AnyApi, FixedPointNumber, forceToCurrencyName, MaybeCurrency, Token } from '@acala-network/sdk-core';
import { memoize } from '@polkadot/util';
import { BehaviorSubject, firstValueFrom, Observable, combineLatest, of } from 'rxjs';
import { filter, map, shareReplay, switchMap } from 'rxjs/operators';
import { IncentivePoolNotFound } from '../liquidity/errors.js';
import { createStorages } from './storages.js';
import {
  BaseIncentivePool,
  IncentiveConfigs,
  IncentivePool,
  IncentiveReward,
  IncentiveRewardTokensConfigs,
  IncentiveType,
  UserIncentivePool,
  UserIncentiveReward
} from './types.js';
import { getAPR } from './utils/get-apr.js';
import { getDeductionEndtimeConfigs } from './utils/get-deduction-endtime-configs.js';
import { getPoolId } from './utils/get-pool-id.js';
import { getPoolToken } from './utils/get-pool-token.js';
import { BaseSDK } from '../types.js';
import { Wallet } from '../wallet/wallet.js';

export class Incentive implements BaseSDK {
  private api: AnyApi;
  private storages: ReturnType<typeof createStorages>;
  private wallet: Wallet;
  public isReady$: BehaviorSubject<boolean>;
  public readonly consts: {
    accumulatePeriod: number;
  };

  constructor({ api, wallet }: IncentiveConfigs) {
    this.api = api;

    this.storages = createStorages(this.api);
    this.isReady$ = new BehaviorSubject<boolean>(false);
    this.wallet = wallet;

    this.consts = {
      accumulatePeriod: this.api.consts.incentives.accumulatePeriod.toNumber()
    };

    this.init();
  }

  private init() {
    // set sdk ready status until get all incentive pools information
    this.subscribeAllIncentivePools().subscribe({
      next: () => this.isReady$.next(true)
    });
  }

  // get `list` tokens informations from wallet sdk
  private getTokens = (list: string[]): Record<string, Token> => {
    return Object.fromEntries(
      Array.from(new Set(list.map(forceToCurrencyName))).map((item) => [item, this.wallet.getToken(item)] as const)
    );
  };

  // subscribe all deduction rates config
  private deductionRates$ = memoize((): Observable<Record<string, FixedPointNumber>> => {
    return this.storages.claimRewardDeductionRates().observable.pipe(
      map((data) => {
        return Object.fromEntries(
          data.map((item) => {
            const pool = item[0].args[0];
            const id = getPoolId(pool);
            const rate = FixedPointNumber.fromInner(item[1].toString());

            return [id, rate];
          })
        );
      })
    );
  });

  // subscirbe all incentive reward amounts config
  private rewardTokensConfigs$ = memoize((): Observable<IncentiveRewardTokensConfigs> => {
    return this.storages.incentiveRewardAmounts().observable.pipe(
      map((data) => {
        const allRewardTokens = data.map((item) => forceToCurrencyName(item[0].args[1]));

        const tokens = this.getTokens(allRewardTokens);
        const result: IncentiveRewardTokensConfigs = {};

        data.forEach((item) => {
          const pool = item[0].args[0];
          const rewardCurrencyId = item[0].args[1];
          const rewardToken = tokens[forceToCurrencyName(rewardCurrencyId)];
          const rewardAmount = FixedPointNumber.fromInner(item[1].toString(), rewardToken.decimals);
          const id = getPoolId(pool);

          // insert rewards config if poolId is exists
          if (result[id]) {
            result[id].push({
              token: rewardToken,
              amount: rewardAmount
            });

            return;
          }

          result[id] = [{ token: rewardToken, amount: rewardAmount }];
        });

        return result;
      })
    );
  });

  // subscribe all pool infomations
  private poolInfos$ = memoize((): Observable<BaseIncentivePool[]> => {
    return this.storages.poolInfos().observable.pipe(
      map((data) => {
        const allRewardTokens = data.flatMap((item) =>
          Array.from(item[1].rewards.entries()).map(([key]) => forceToCurrencyName(key))
        );

        const tokens = this.getTokens([
          ...(data.map((item) => getPoolToken(item[0].args[0])) as unknown as string[]),
          ...allRewardTokens
        ]);

        return data.map((item) => {
          const raw = item[0].args[0];
          const id = getPoolId(raw);
          const type = raw.isDex ? IncentiveType.DEX : raw.isLoans ? IncentiveType.LOANS : IncentiveType.Earning;
          const collateral = tokens[forceToCurrencyName(getPoolToken(raw))];
          const totalShares = FixedPointNumber.fromInner(item[1].totalShares.toString(), collateral.decimals);

          // format rewards infomations
          const rewards: IncentiveReward[] = Array.from(item[1].rewards.entries()).map(([key, values]) => {
            const token = tokens[forceToCurrencyName(key)];
            const total = FixedPointNumber.fromInner(values[0].toString(), token.decimals);
            const withdrawn = FixedPointNumber.fromInner(values[1].toString(), token.decimals);

            return {
              rewardToken: token,
              totalReward: total,
              withdrawnReward: withdrawn,
              claimableReward: total.minus(withdrawn).max(new FixedPointNumber(0, collateral.decimals))
            };
          });

          return { collateral, type, id, raw, totalShares, rewards };
        });
      })
    );
  });

  private endTimes$ = memoize((): Observable<Record<string, number>> => {
    return this.storages.scheduler().observable.pipe(map((data) => getDeductionEndtimeConfigs(this.api, data)));
  });

  private apr$ = memoize((pool: IncentivePool) => {
    const tokens = Array.from(
      new Set([forceToCurrencyName(pool.collateral), ...pool.rewardTokensConfig.map((item) => item.token.name)])
    );

    return combineLatest({
      prices: combineLatest(Object.fromEntries(tokens.map((item) => [item, this.wallet.subscribePrice(item)])))
    }).pipe(
      map(({ prices }) => {
        return getAPR(
          pool.collateral,
          this.consts.accumulatePeriod,
          prices,
          pool.totalShares,
          pool.deductionRate,
          pool.rewardTokensConfig
        );
      })
    );
  });

  private userIncentive$ = memoize((poolId: string, address: string) => {
    return this.subscribeIncentivePoolById(poolId).pipe(
      switchMap((info) => {
        if (!info) throw new IncentivePoolNotFound(poolId);

        return combineLatest({
          info: of(info),
          sharesAndWithdrawn: this.storages.userSharesAndWithdrawnRewards(info.raw, address).observable,
          pendingRewards: this.storages.pendingRewards(info.raw, address).observable
        });
      }),
      map(({ info, sharesAndWithdrawn, pendingRewards }) => {
        const tokens = this.getTokens([
          ...Array.from(sharesAndWithdrawn[1].entries()).map((item) => {
            return forceToCurrencyName(item[0]);
          }),
          ...Array.from(pendingRewards.entries()).map((item) => {
            return forceToCurrencyName(item[0]);
          })
        ]);

        const userShares = FixedPointNumber.fromInner(sharesAndWithdrawn[0].toString(), info.collateral.decimals);
        const withdrawns = Array.from(sharesAndWithdrawn[1].entries()).map((entry) => {
          const tokenName = forceToCurrencyName(entry[0]);
          const token = tokens[tokenName];
          const withdrawnReward = FixedPointNumber.fromInner(entry[1].toString(), token.decimals);

          return { token, withdrawnReward };
        });

        const pendings = Array.from(pendingRewards.entries()).map((entry) => {
          const tokenName = forceToCurrencyName(entry[0]);
          const token = tokens[tokenName];
          const reward = FixedPointNumber.fromInner(entry[1].toString(), token.decimals);

          return { reward, token };
        });

        const ratio = userShares.div(info.totalShares);

        const rewards: UserIncentiveReward[] = info.rewards.map((item) => {
          const token = item.rewardToken;

          const pendingReward = pendings.find((pending) => pending.token.isEqual(token));
          const withdrawnReward = withdrawns.find((withdrawn) => withdrawn.token.isEqual(token));

          const claimableReward = ratio
            .mul(item.totalReward)
            .minus(withdrawnReward?.withdrawnReward || FixedPointNumber.ZERO)
            .add(pendingReward?.reward || FixedPointNumber.ZERO)
            .max(FixedPointNumber.ZERO);

          const claimableRewardWithDeduction = claimableReward
            .minus(claimableReward.mul(info.deductionRate || FixedPointNumber.ZERO))
            .max(FixedPointNumber.ZERO);

          return {
            rewardToken: token,
            withdrawnReward: withdrawnReward ? withdrawnReward.withdrawnReward : FixedPointNumber.ZERO,
            claimableReward,
            claimableRewardWithDeduction
          };
        });

        return {
          shares: userShares,
          rewards,
          pool: info
        };
      })
    );
  });

  public get isReady(): Promise<boolean> {
    return firstValueFrom(this.isReady$.asObservable().pipe(filter((i) => i)));
  }

  public subscribeAllIncentivePools = memoize((): Observable<IncentivePool[]> => {
    return combineLatest({
      endTimes: this.endTimes$(),
      deductionRates: this.deductionRates$(),
      poolInfos: this.poolInfos$(),
      rewardTokensConfigs: this.rewardTokensConfigs$()
    }).pipe(
      map(({ endTimes, deductionRates, poolInfos, rewardTokensConfigs }) => {
        return poolInfos.map((item) => {
          const deductionRate = deductionRates[item.id] || FixedPointNumber.ZERO;
          const rewardTokensConfig = rewardTokensConfigs[item.id] || [];
          const endBlockNumber = endTimes[item.id] || -1;

          const result: IncentivePool = {
            ...item,
            enable: rewardTokensConfig.length !== 0,
            rewardTokensConfig,
            deductionRate,
            endBlockNumber
          };

          return result;
        });
      }),
      switchMap((poolInfos) => {
        return combineLatest(Object.fromEntries(poolInfos.map((item) => [item.id, this.apr$(item)]))).pipe(
          map((aprs) => {
            return poolInfos.map((item) => {
              return {
                ...item,
                apr: aprs[item.id]
              };
            });
          })
        );
      }),
      shareReplay(1)
    );
  });

  public getAllIncentivePools(): Promise<IncentivePool[]> {
    return firstValueFrom(this.subscribeAllIncentivePools());
  }

  public subscribeIncentivePoolById(id: string): Observable<IncentivePool | undefined> {
    return this.subscribeAllIncentivePools().pipe(
      map((data) => {
        return data.find((item) => {
          return item.id === id;
        });
      })
    );
  }

  public getIncentivePoolById(id: string): Promise<IncentivePool | undefined> {
    return firstValueFrom(this.subscribeIncentivePoolById(id));
  }

  public subscribeIncentivePool(type: IncentiveType, currency: MaybeCurrency): Observable<IncentivePool | undefined> {
    return this.subscribeAllIncentivePools().pipe(
      map((data) => {
        return data.find((item) => {
          return item.type === type && forceToCurrencyName(getPoolToken(item.raw)) === forceToCurrencyName(currency);
        });
      })
    );
  }

  public getIncnetivePool(type: IncentiveType, currency: MaybeCurrency): Promise<IncentivePool | undefined> {
    return firstValueFrom(this.subscribeIncentivePool(type, currency));
  }

  public subscribeUserIncentive(id: string, address: string): Observable<UserIncentivePool> {
    return this.userIncentive$(id, address);
  }

  public getUserIncentive(id: string, address: string): Promise<UserIncentivePool> {
    return firstValueFrom(this.subscribeUserIncentive(id, address));
  }
}
