import { AcalaPrimitivesCurrencyCurrencyId, ModuleSupportIncentivesPoolId } from '@acala-network/types/lookup';

export function getPoolToken(poolId: ModuleSupportIncentivesPoolId): AcalaPrimitivesCurrencyCurrencyId {
  if (poolId.isDex) return poolId.asDex;

  if (poolId.isLoans) return poolId.asLoans;

  // always success, never run belown
  return undefined as unknown as AcalaPrimitivesCurrencyCurrencyId;
}
