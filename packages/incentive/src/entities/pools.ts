import { ApiPromise, ApiRx } from "@polkadot/api";
import { IncentivePools } from "./types.js";
import invariant, {} from 'tiny-invariant';
import { promisify } from "../utils/promisify.js";

export interface PoolsConfig {
  // should be either apiPromise or apiRx
  apiPromise?: ApiPromise;
  apiRx?: ApiRx;
}

interface DeductionBlocks {
  [key: string]: bigint;
}

class Pools implements IncentivePools {
  private readonly apiPromise?: ApiPromise;
  private readonly apiRx?: ApiRx;
  private deductionBlocks: DeductionBlocks = {};

  constructor(config: PoolsConfig) {
    invariant(config.apiPromise || config.apiRx, "API is required");

    this.apiPromise = config.apiPromise;
    this.apiRx = config.apiRx;
  }

 /**
 * Query all proposals from `scheduler.agenda` and filter out the proposals that set
 * `incentives.deductionRates` to zero. We assume that the proposals do not
 * frequently update `incentives.deductionRates` to zero, allowing us to cache the deduction block.
 */
  private async getDeductionBlock() {
    if (!Object.keys(this.deductionBlocks).length) return this.deductionBlocks;

    const api = this.apiPromise || this.apiRx;
    const result: DeductionBlocks = {};
    invariant(api, "API not found");

    type TEST = ReturnType<typeof api.query.scheduler.agenda.entries>

    const agendas = await promisify(api.query.scheduler.agenda.entries)();
  }
}

  // private async getDuductionEndBlock() {
  //   const api = this.apiPromise || this.apiRx;
  //   invariant(api, "API not found");

  //   const agendas = await (api.type === "promise"
  //     ? (api as ApiPromise).query.scheduler.agenda.entries()
  //     : firstValueFrom((api as ApiRx).query.scheduler.agenda.entries()));

  //   for (const [key, proposals] of agendas) {
  //     const block = key.args[0].toBigInt();

  //     // walk through all the proposals
  //     for (const proposal of proposals) {
  //       if (proposal.isEmpty || proposal.isNone) continue;

  //       let call: GenericCall<any>;

  //       const data = proposal.unwrap();

  //       // if the data.call is inline, directly create the call object
  //       if (data.call.isInline) {
  //         call = api.createType("Call", data.call.asInline);
  //       }

  //       // if the data.call is lookup, query the preimage and create the call object
  //       if (data.call.isLookup) {
  //         const params = [data.call.asLookup.hash_, data.call.asLookup.len]

  //         const preimage = await (api.type === "promise"
  //           ? (api as ApiPromise).query.preimage.preimageFor(...params)
  //           : firstValueFrom((api as ApiRx).query.preimage.preimageFor(...params))
  //         ) as Option<Bytes>;

  //         call = api.createType("Call", preimage.unwrap().toHex());
  //       }

  //       const fn = (call: GenericCall, ) => {
  //         // check if the call is batch
  //         if (call.method === 'batch' && call.section === 'unitity') {
  //           return call.args.forEach((item) => fn(item));
  //         }

  //         // check if the call is update deduction rate
  //         if (call.method === 'updateClaimRewardDeductionRates' && call.section === 'incentives') {
  //           const args = call.args as Vec<Vec<ITuple<[ModuleSupportIncentivesPoolId, U128]>>>

  //           args.forEach((item) => {
  //             item.forEach(([poolId, rate]) => {
  //               if (poolId.toHex() === this.id && rate.isZero()) {
  //                 // return the block number when the deduction rate is set to zero
  //               }
  //             })
  //           });
  //         }
  //       }


  //     }
  //   }
    
  // }