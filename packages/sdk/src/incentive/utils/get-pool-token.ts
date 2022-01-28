import { AcalaPrimitivesCurrencyCurrencyId, ModuleIncentivesPoolId } from '@polkadot/types/lookup';

export function getPoolToken(poolId: ModuleIncentivesPoolId): AcalaPrimitivesCurrencyCurrencyId {
  if (poolId.isDex) return poolId.asDex;

  if (poolId.isLoans) return poolId.asLoans;

  // always success, never run belown
  return undefined as unknown as AcalaPrimitivesCurrencyCurrencyId;
}
