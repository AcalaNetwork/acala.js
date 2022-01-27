import { forceToCurrencyName } from '@acala-network/sdk-core';
import { ModuleIncentivesPoolId } from '@polkadot/types/lookup';

export function getPoolId(pool: ModuleIncentivesPoolId): string {
  if (pool.isDex) {
    return `dex-${forceToCurrencyName(pool.asDex)}`;
  }

  if (pool.isLoans) {
    return `loans-${forceToCurrencyName(pool.asLoans)}`;
  }

  return 'unknown';
}
