import { ApiInterfaceRx } from '@polkadot/api/types';
import { CurrencyId, Balance } from '@acala-network/types/interfaces/runtime';
import { map } from 'rxjs/operators';
import { DerivedDexPool } from '../types/dex';
import { memo } from '../utils/memo';
import { Observable } from 'rxjs';

/**
 * @name pool
 * @description get liquidity pool of the target currency
 * @param {(CurrencyId | string)} token target currency
 */
export function pool (api: ApiInterfaceRx): (token: CurrencyId | string) => Observable<DerivedDexPool> {
  return memo((token: CurrencyId | string) => {
    return api.query.dex.liquidityPool<[Balance, Balance]>(token).pipe(
      map((result) => {
        const [other, base] = result;
        return { target: other, base: base };
      })
    );
  });
}
