import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiInterfaceRx } from '@polkadot/api/types';
import { Price } from '@orml/types/interfaces/prices';
import { CurrencyId } from '@acala-network/types/interfaces/runtime/types';
import { DerivedPrice } from '../types/price';
import { memo } from '../utils/memo';
import { getCurrencyIds, getStableCoinId } from '../common/token';

/**
 * @name price
 * @description get token price
 * @param {(CurrencyId | string)} token
 */
export function price (api: ApiInterfaceRx): (token: CurrencyId | string) => Observable<Price> {
  return memo((token: string) => {
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    const currencyId = api.registry.createType('CurrencyId' as any, token);
    const stableCurrencyId = getStableCoinId(api);
    const stableFixedPrice = api.consts.prices.stableCurrencyFixedPrice;
    // if stable currency, return stableFixedPrice
    if (currencyId.eq(stableCurrencyId)) {
      return stableFixedPrice;
    }
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    return (api.rpc as any).oracle.getValue(token).pipe(map((result) => result));
  });
}

/**
 * @name allPrices
 * @description get prices of all kinks of currency
 */
export function allPrices (api: ApiInterfaceRx): () => Observable<DerivedPrice[]> {
  return memo(() => {
    const currencyIds = getCurrencyIds(api);
    const priceQuery = price(api);
    return combineLatest(currencyIds.map((token) => priceQuery(token))).pipe(
      map((result) => {
        return currencyIds.map((token, index) => ({ token, price: result[index] }));
      })
    );
  });
}
