import { ApiPromise, ApiRx } from "@polkadot/api";
import { ModuleSupportIncentivesPoolId, AcalaPrimitivesCurrencyCurrencyId, OrmlRewardsPoolInfo } from '@polkadot/types/lookup';
import { U128, StorageKey } from "@polkadot/types"
import invariant from "tiny-invariant";
import { IncentivePool, IncentiveType, QueryDeductionBlockFN, Reward, Share } from "./types.js";
import { promisify } from "../utils/promisify.js";
import { getPoolType } from "../utils/get-pool-type.js";
import { Observable, firstValueFrom, map } from "rxjs";
import { ACAStakingUserPoolEntity } from "./acala-staking-user-pool.js";
import { UserIncentivePoolEntity } from "./user-pool.js";

export interface PoolConfig {
  // the hex string of the pool id
  id: string;
  // should be either apiPromise or apiRx
  api?: ApiPromise | ApiRx;
  // the query deduction block function
  queryDeductionBlock: QueryDeductionBlockFN;
}

type RawRewardConfig = [StorageKey<[ModuleSupportIncentivesPoolId, AcalaPrimitivesCurrencyCurrencyId]>, U128];

export class PoolEntity implements IncentivePool {
  public readonly api: ApiPromise | ApiRx;
  public readonly id: string;
  private readonly queryDeductionBlock: QueryDeductionBlockFN;

  constructor(config: PoolConfig) {
    invariant(config.id, "Pool id is required");
    invariant(config.api, "API is required");

    this.id = config.id;
    this.api = config.api!;
    this.queryDeductionBlock = config.queryDeductionBlock;
  }

  /**
   * return the type of the pool
   */
  public get type() {
    return getPoolType(this.api, this.id);
  }

  /**
   * return the token of the pool
   */
  public get token() {
    const type = this.api.createType<ModuleSupportIncentivesPoolId>("ModuleSupportIncentivesPoolId", this.id);

    if (type.isDex) {
      return type.asDex.asDexShare.toHex();
    }

    if (type.isEarning) {
      return type.asEarning.toHex();
    }

    if (type.isLoans) {
      return type.asLoans.toHex()
    }

    throw new Error("Unsupported pool type");
  }

  /**
   * return the enable status of the pool
   * @returns boolean
   */
  public async enable() {
    const configs = await this.rewardConfig();

    return configs.length > 0;
  }

  /**
   * return the reward config of the pool
   * @returns RewardConfig[]
   */
  public async rewardConfig() {
    // as ApiPromise for correct type
    const rewards: RawRewardConfig[] = await promisify((this.api as ApiPromise).query.incentives.incentiveRewardAmounts.entries());
    const period = this.api.consts.incentives.accumulatePeriod.toNumber();

    return rewards.map(([key, value]) => ({
      token: key.args[1].toHex(),
      amount: value.toBigInt(),
      period
    })).filter((item) => item.amount > 0n);
  }

  /**
   * return the total share of the pool
   */
  public get totalShare$ () {
    if (this.api.type === 'promise') {
      return new Observable<Share>((observer) => {
        let unsub: () => void;

        (this.api as ApiPromise).query.rewards.poolInfos(this.id, (data) => {
          observer.next(data.totalShares.toBigInt());
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
      return (this.api as ApiRx).query.rewards.poolInfos(this.id).pipe(
        map((data) => data.totalShares.toBigInt())
      );
    }

    throw new Error('Unsupported API type');
  }

  /**
   * return the total share of the pool
   * @returns bigint
   */
  public async totalShare() {
    return firstValueFrom(this.totalShare$);
  }

  /**
   * return an observable of the total reward of the pool
   */
  public get totalReward$() {
    if (this.api.type === 'rxjs') {
      return (this.api as ApiRx).query.rewards.poolInfos(this.id).pipe(
        map((data) => {
          return this.totalRewardsMapper(data);
        })
      );
    }

    if (this.api.type === 'promise') {
      return new Observable<Reward[]>((observer) => {
        let unsub: () => void;

        (this.api as ApiPromise).query.rewards.poolInfos(this.id, (data) => {
          observer.next(this.totalRewardsMapper(data));
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

    throw new Error('Unsupported API type');
  }

  /**
   * return the total reward of the pool
   * @returns Promise<Reward[]>
   */
  public async totalRewards() {
    return firstValueFrom(this.totalReward$);
  }


  /**
   * return the deduction info of the pool
   * @returns Promise<DeductionConfig[] | null>
   */
  public async deductionConfig() {
    const currencies = await this.getDeductionToken();
    const rate = await this.getDeductionRate();
    const rewardConfig = await this.rewardConfig();

    // return null if the pool has no deduction rate set
    if (rate.isEmpty || rate.isZero()) return null;

    // when the pool deduction token is not set, deduct all the reward tokens
    const deductionTokens = currencies.isEmpty ? rewardConfig.map((item) => item.token) : [currencies.toHex()];
    const endBlock = await this.queryDeductionBlock(this.id);

    return deductionTokens.map((token) => ({
      token,
      rate: rate.toNumber() / 10 ** 18,
      endBlock
    }));
  }

  public user(account: string) {
    if (this.type === IncentiveType.Earning) {
      return new ACAStakingUserPoolEntity({
        pool: this,
        account,
        api: this.api,
      });
    }

    return new UserIncentivePoolEntity({
      pool: this,
      account,
      api: this.api,
    });
  }

  // map raw data to Reward[]
  private totalRewardsMapper(data: OrmlRewardsPoolInfo) {
    return Array.from(data.rewards.entries()).map(([key, value]) => {
      const accumulated = value[0].toBigInt();
      const withdrawn = value[1].toBigInt();

      return {
        token: key.toHex(),
        accumulated,
        withdrawn,
        claimable: accumulated - withdrawn
      }
    });
  }

  // query the deduction block
  private async getDeductionToken() {
    return promisify(this.api.query.incentives.claimRewardDeductionCurrencies(this.id));
  }

  // query the deduction rate
  private async getDeductionRate() {
    return promisify(this.api.query.incentives.claimRewardDeductionRates(this.id));
  }
}
