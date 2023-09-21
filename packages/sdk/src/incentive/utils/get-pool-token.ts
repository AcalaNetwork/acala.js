import { AcalaPrimitivesCurrencyCurrencyId, ModuleSupportIncentivesPoolId } from '@polkadot/types/lookup';

export function getPoolToken(poolId: ModuleSupportIncentivesPoolId): AcalaPrimitivesCurrencyCurrencyId {
  if (poolId.isDex) return poolId.asDex;

  if (poolId.isLoans) return poolId.asLoans;

  if ((poolId as any).isEarning) return (poolId as any).asEarning;

  // always success, never run belown
  return undefined as unknown as AcalaPrimitivesCurrencyCurrencyId;
}
