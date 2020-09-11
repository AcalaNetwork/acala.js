import { ApiInterfaceRx } from '@polkadot/api/types';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { CurrencyId, Balance } from '@acala-network/types/interfaces';
import { memo } from '@polkadot/api-derive/util';

import { DerivedDexPool } from '../types/dex';

/**
 * @name pool
 * @description get liquidity pool of the target currency id
 * @param {(CurrencyId | string)} currency target currency id
 */
export function pool (instanceId: string, api: ApiInterfaceRx): (currency: CurrencyId | string) => Observable<DerivedDexPool> {
  return memo(instanceId, (currency: CurrencyId | string) => {
    return api.query.dex.liquidityPool<[Balance, Balance]>(currency).pipe(
      map((result) => {
        const [other, base] = result;

        return { other: other, base: base };
      })
    );
  });
}
