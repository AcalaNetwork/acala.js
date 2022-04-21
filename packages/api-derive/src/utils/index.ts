import { AcalaPrimitivesCurrencyCurrencyId } from '@acala-network/types/interfaces/types-lookup';
import { ApiInterfaceRx } from '@polkadot/api/types';
import { Vec } from '@polkadot/types';

export function getAllCollateralCurrencyIds(api: ApiInterfaceRx): Vec<AcalaPrimitivesCurrencyCurrencyId> {
  return api.consts.cdpEngine.collateralCurrencyIds as any as Vec<AcalaPrimitivesCurrencyCurrencyId>;
}
