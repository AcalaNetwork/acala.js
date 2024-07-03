import { ApiPromise, ApiRx } from "@polkadot/api";
import { IncentivePools, IncentiveType } from "./types.js";
import invariant, {} from 'tiny-invariant';
import { promisify } from "../utils/promisify.js";
import { GenericCall, Option, Bytes, Vec, U128 } from "@polkadot/types";
import { ITuple } from "@polkadot/types/types";
import { ModuleSupportIncentivesPoolId } from "@polkadot/types/lookup";
import { PoolEntity } from "./pool.js";
import { getPoolType } from "../utils/get-pool-type.js";

export interface PoolsConfig {
  // should be either apiPromise or apiRx
  api?: ApiPromise | ApiRx;
}

interface DeductionBlocks {
  [key: string]: bigint;
}

export class PoolsEntity implements IncentivePools {
  private readonly api: ApiRx | ApiPromise;
  private deductionBlocks: DeductionBlocks = {};

  constructor(config: PoolsConfig) {
    invariant(config.api, "API is required");

    this.api = config.api;
  }

  /**
   * return all the enabled pool ids
   * @returns string[]
   */
  public async poolIds () {
    const pools = await promisify((this.api as ApiPromise).query.incentives.incentiveRewardAmounts.entries());

    // return the pool ids, remove the duplicated ids
    return Array.from(new Set(pools.map(([key]) => {
      return key.args[0].toHex();
    })));
  }

  /**
   * return the `id` pool entity
   * @param id string
   * @returns PoolEntity
   */
  public pool (id: string) {
    return new PoolEntity({
      id,
      api: this.api,
      queryDeductionBlock: this.getDeductionBlock.bind(this)
    });
  }

  /**
   * return the pool ids by type
   * @param type IncentiveType
   * @returns string[]
   */
  public async poolIdsByType(type: IncentiveType) {
    return this.poolIds()
      .then((ids) => ids.filter((id) => getPoolType(this.api, id) === type));
  }

 /**
 * Query all proposals from `scheduler.agenda` and filter out the proposals that set
 * `incentives.deductionRates` to zero. We assume that the proposals do not
 * frequently update `incentives.deductionRates` to zero, allowing us to cache the deduction block.
 */
  private async getDeductionBlock(id: string): Promise<bigint | null> {
    if (!Object.keys(this.deductionBlocks).length) return this.deductionBlocks[id] || null;

    const result: DeductionBlocks = {};


    const agendas = await promisify((this.api as ApiPromise).query.scheduler.agenda.entries());

    for (const [key, proposals] of agendas) {
      const block = key.args[0].toBigInt();

      // walk through all the proposals
      for (const proposal of proposals) {
        if (proposal.isEmpty || proposal.isNone) continue;

        let call: GenericCall<any> | null = null;
        const data = proposal.unwrap();

        if (data.call.isInline) {
          call = this.api.createType("Call", data.call.asInline);
        }

        if (data.call.isLookup) {
          const params = [data.call.asLookup.hash_, data.call.asLookup.len];

          const preimage = await promisify(this.api.query.preimage.preimageFor(...params)) as Option<Bytes>;

          call = this.api.createType("Call", preimage.unwrap().toHex());
        }

        if (!call) continue;

        const processCallsAndAnalyze = (call: GenericCall<any>) => {
          if (call.method === 'batch' && call.section === 'utility') {
            return ((call.args as [GenericCall<any>[]])[0]).forEach((item) => {
              processCallsAndAnalyze(item);
            });
          }

          if (call.method === 'updateClaimRewardDeductionRates' && call.section === 'incentives') {
            const args = call.args as Vec<Vec<ITuple<[ModuleSupportIncentivesPoolId, U128]>>>

            args.forEach((item) => {
              item.forEach(([poolId, rate]) => {
                if (rate.isZero()) {
                  result[poolId.toHex()] = block;
                }
              });
            });
          }
        };

        processCallsAndAnalyze(call);
      }
    }
    this.deductionBlocks = result;

    return result[id] || null;
  }
}