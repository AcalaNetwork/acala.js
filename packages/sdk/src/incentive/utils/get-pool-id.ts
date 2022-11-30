import { forceToCurrencyName } from '@acala-network/sdk-core';
import { ModuleSupportIncentivesPoolId } from '@polkadot/types/lookup';

export function getPoolId(pool: ModuleSupportIncentivesPoolId): string {
  if (pool.isDex) {
    return `dex-${forceToCurrencyName(pool.asDex)}`;
  }

  if (pool.isLoans) {
    return `loans-${forceToCurrencyName(pool.asLoans)}`;
  }

  return 'unknown';
}
