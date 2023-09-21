import { ModuleSupportIncentivesPoolId } from '@polkadot/types/lookup';

export function getPoolId(pool: ModuleSupportIncentivesPoolId): string {
  return pool.toHex();
}
