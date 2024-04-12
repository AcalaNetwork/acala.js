import { AcalaPrimitivesCurrencyCurrencyId, ModuleSupportIncentivesPoolId } from '@polkadot/types/lookup';

export function getPoolToken(poolId: ModuleSupportIncentivesPoolId): AcalaPrimitivesCurrencyCurrencyId {
  if (poolId.isDex) return poolId.asDex;

  if (poolId.isLoans) return poolId.asLoans;

  if (poolId.isEarning) return poolId.asEarning;

  // always success, never run belown
  return undefined as unknown as AcalaPrimitivesCurrencyCurrencyId;
}
