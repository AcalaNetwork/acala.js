import { ApiPromise, ApiRx } from "@polkadot/api";
import { ModuleSupportIncentivesPoolId, AcalaPrimitivesCurrencyCurrencyId } from '@polkadot/types/lookup';
import { U128, StorageKey } from "@polkadot/types"
import { IncentivePool, IncentiveType, QueryDeductionBlockFN } from "./types.js";
import invariant from "tiny-invariant";
import { promisify } from "../utils/promisify.js";

interface PoolConfig {
  // the hex string of the pool id
  id: string;
  // should be either apiPromise or apiRx
  apiPromise?: ApiPromise;
  apiRx?: ApiRx;
  // the query deduction block function
  queryDeductionBlock: QueryDeductionBlockFN;
}

type RawRewardConfig = [StorageKey<[ModuleSupportIncentivesPoolId, AcalaPrimitivesCurrencyCurrencyId]>, U128];

export class Pool implements IncentivePool {
  private readonly api: ApiPromise | ApiRx;
  private readonly id: string;
  private readonly queryDeductionBlock: QueryDeductionBlockFN;

  constructor(config: PoolConfig) {
    invariant(config.id, "Pool id is required");
    invariant(config.apiPromise || config.apiRx, "API is required");

    this.id = config.id;
    this.api = (config.apiPromise || config.apiRx)!;
    this.queryDeductionBlock = config.queryDeductionBlock;
  }

  public get type() {
    const type = this.api.createType<ModuleSupportIncentivesPoolId>("ModuleSupportIncentivesPoolId", this.id);

    if (type.isDex) return IncentiveType.Dex;

    if (type.isEarning) return IncentiveType.Earning;

    if (type.isLoans) return IncentiveType.Loans;

    // when the pool type is not supported, throw an error
    throw new Error("Unsupported pool type");
  }

  // the token will be deposit to the pool, return the token hex string
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

    // when the pool type is not supported, throw an error
    throw new Error("Unsupported pool type");
  }

  // when the reward config is empty, the pool is disabled
  public async enable() {
    const configs = await this.rewardConfig();

    return configs.length > 0;
  }

  // the reward config of the pool
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

  // the pool info
  private async getPoolInfo() {
    return promisify(this.api.query.rewards.poolInfos(this.id));
  }

  // the total share of the pool
  public async share() {
    const poolInfo = await this.getPoolInfo();

    return poolInfo.totalShares.toBigInt();
  }

  // the total reward of the pool
  public async rewards() {
    const poolInfo = await this.getPoolInfo();

    return Array.from(poolInfo.rewards.entries()).map(([key, value]) => {
      const accumulated = value[0].toBigInt();
      const withdrawn = value[1].toBigInt();

      return {
        token: key.toHex(),
        accumulated,
        withdrawn,
        available: accumulated - withdrawn
      }
    });
  }

  private async getDeductionToken() {
    return promisify(this.api.query.incentives.claimRewardDeductionCurrencies(this.id));
  }

  private async getDeductionRate() {
    return promisify(this.api.query.incentives.claimRewardDeductionRates(this.id));
  }

  // the deduction info of the pool
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
}
