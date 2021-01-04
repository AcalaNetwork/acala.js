import { ApiInterfaceRx } from '@polkadot/api/types';

import { CurrencyId } from '@acala-network/types/interfaces';

export function getAllCollateralCurrencyIds(api: ApiInterfaceRx): CurrencyId[] {
  /* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access */
  const keys = api.registry.createType('TokenSymbol' as any).defKeys as string[];

  return keys.map((item) => api.registry.createType('CurrencyId', { token: item }));
}
