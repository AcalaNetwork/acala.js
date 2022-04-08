import { AcalaPrimitivesCurrencyCurrencyId, ModuleIncentivesPoolId } from '@acala-network/types/interfaces/types-lookup';

export function getPoolToken(poolId: ModuleIncentivesPoolId): AcalaPrimitivesCurrencyCurrencyId {
  if (poolId.isDex) return poolId.asDex;

  if (poolId.isLoans) return poolId.asLoans;

  // always success, never run belown
  return undefined as unknown as AcalaPrimitivesCurrencyCurrencyId;
}
