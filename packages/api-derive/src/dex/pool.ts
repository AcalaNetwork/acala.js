import { ApiInterfaceRx } from '@polkadot/api/types';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { CurrencyId, Balance } from '@acala-network/types/interfaces';

import { DerivedDexPool } from '../types/dex';
import { memo } from '../utils/memo';

/**
 * @name pool
 * @description get liquidity pool of the target currency id
 * @param {(CurrencyId | string)} currency target currency id
 */
export function pool (api: ApiInterfaceRx): (currency: CurrencyId | string) => Observable<DerivedDexPool> {
  return memo((currency: CurrencyId | string) => {
    return api.query.dex.liquidityPool<[Balance, Balance]>(currency).pipe(
      map((result) => {
        const [other, base] = result;

        return { other: other, base: base };
      })
    );
  });
}
