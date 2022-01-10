import { CurrencyId } from '@acala-network/types/interfaces';
import { ApiInterfaceRx } from '@polkadot/api/types';
import { Vec } from '@polkadot/types';

export function getAllCollateralCurrencyIds(api: ApiInterfaceRx): Vec<CurrencyId> {
  return api.consts.cdpEngine.collateralCurrencyIds as any as Vec<CurrencyId>;
}
