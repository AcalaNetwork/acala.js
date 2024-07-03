import { ApiPromise, ApiRx } from "@polkadot/api";
import { ModuleSupportIncentivesPoolId } from "@polkadot/types/lookup";
import { IncentiveType } from "../entities/types.js";

export function getPoolType(api: ApiPromise | ApiRx, id: string) {
  try {
    const type = api.createType<ModuleSupportIncentivesPoolId>('ModuleSupportIncentivesPoolId', id);

    if (type.isDex) return IncentiveType.Dex;
    if (type.isEarning) return IncentiveType.Earning;
    // never reached by the current implementation
    if (type.isLoans) return IncentiveType.Loans;

    throw new Error('Unsupported pool type');
  } catch (e) {
    // when the pool type is not supported, throw an error
    throw new Error('Unsupported pool type');
  }
}