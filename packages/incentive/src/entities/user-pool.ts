import { ApiPromise, ApiRx } from "@polkadot/api";
import { IncentivePool, UserIncentivePool } from "./types.js"
import invariant from "tiny-invariant";
import { Observable, combineLatest, firstValueFrom, from, map } from "rxjs";
import { AcalaPrimitivesCurrencyCurrencyId } from "@polkadot/types/lookup"
import { U128, BTreeMap } from "@polkadot/types"
import { ITuple } from "@polkadot/types/types";

export interface UserIncentivePoolConfig {
  api: ApiPromise | ApiRx;
  pool: IncentivePool;
  account: string;
}

type UserSharesAndWithdrawnRewards = ITuple<[U128, BTreeMap<AcalaPrimitivesCurrencyCurrencyId, U128>]>;
type UserPendingRewards = BTreeMap<AcalaPrimitivesCurrencyCurrencyId, U128>;

export class UserIncentivePoolEntity implements UserIncentivePool {
  protected readonly api: ApiPromise | ApiRx;
  public readonly pool: IncentivePool;
  public readonly account: string;

  constructor(config: UserIncentivePoolConfig) {
    invariant(config.api, "API is required");
    invariant(config.pool, "Pool is required");
    invariant(config.account, "Account is required");

    this.api = config.api;
    this.pool = config.pool;
    this.account = config.account;
  }

  private get userSharesAndWithdrawnRewards$() {
    if (this.api.type === 'promise') {
      return new Observable<UserSharesAndWithdrawnRewards>((observer) => {
        let unsub: () => void;

        (this.api as ApiPromise).query.rewards.sharesAndWithdrawnRewards(this.pool.id, this.account, (result) => {
          observer.next(result);
        }).then((unsubFn) => {
          unsub = unsubFn;
        }).catch((error) => {
          observer.error(error);
        });

        return () => {
          unsub && unsub();
        }
      });
    }

    if (this.api.type === 'rxjs') {
      return (this.api as ApiRx).query.rewards.sharesAndWithdrawnRewards(this.pool.id, this.account);
    }

    throw new Error('Unsupported API type');
  }

  // get pending rewards
  private get pendingRewards$() {
    if (this.api.type === 'promise') {
      return new Observable<UserPendingRewards>((observer) => {
        let unsub: () => void;

        (this.api as ApiPromise).query.incentives.pendingMultiRewards(this.pool.id, this.account, (result) => {
          observer.next(result);
        }).then((unsubFn) => {
          unsub = unsubFn;
        }).catch((error) => {
          observer.error(error);
        });

        return () => {
          unsub && unsub();
        }
      });
    }

    if (this.api.type === 'rxjs') {
      return (this.api as ApiRx).query.incentives.pendingMultiRewards(this.pool.id, this.account);
    }

    throw new Error('Unsupported API type');
  }

  // the share of the user
  public async share()  {
    return firstValueFrom(this.share$);
  }

  // subscribe the share of the user
  public get share$() {
    return this.userSharesAndWithdrawnRewards$.pipe(
      map((data) => data[0].toBigInt())
    );
  }

  public async rewards() {
    return firstValueFrom(this.rewards$);
  }



  // subscribe the rewards of the user
  public get rewards$() {
    return combineLatest({
      totalShares: this.pool.totalShare$,
      userSharesAndWithdrawnRewards: this.userSharesAndWithdrawnRewards$,
      pendingRewards: this.pendingRewards$,
      rewards: this.pool.totalReward$,
      deductionConfig: from(this.pool.deductionConfig())
    }).pipe(
      map(({
        totalShares,
        userSharesAndWithdrawnRewards,
        pendingRewards,
        rewards,
        deductionConfig
      }) => {
        // calculate the rewards
        const userShares = userSharesAndWithdrawnRewards[0].toBigInt();
        const ratio = userShares * BigInt(10 ** 18) / totalShares;

        return rewards.map((reward) => {
          const token = reward.token;
          // calculate the accumulated rewards for the user
          const accumulated = reward.accumulated * ratio / BigInt(10 ** 18);
          const withdrawn = Array.from(userSharesAndWithdrawnRewards[1].entries())
            .find(([key]) => key.toHex() === token)?.[1].toBigInt() || BigInt(0);
          const pending = Array.from(pendingRewards.entries())
            .find(([key]) => key.toHex() === token)?.[1].toBigInt() || BigInt(0);
          // calculate the claimable rewards for the user
          const claimable = accumulated - withdrawn + pending;

          // calculate the deduction
          const deduction = deductionConfig?.find((config) => config.token === token);

          let claimableAfterDeduction = claimable;
          let deductioned = BigInt(0);

          if (deduction) {
            deductioned = claimable * BigInt(deduction.rate * 10 ** 18) / BigInt(10 ** 18);
            claimableAfterDeduction = claimable - deductioned;
          }

          return {
            token,
            accumulated,
            withdrawn,
            claimable,
            deductioned,
            claimableAfterDeduction
          };
        });
      })
    );
  }
}