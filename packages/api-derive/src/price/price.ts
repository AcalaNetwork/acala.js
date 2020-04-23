import { Observable, combineLatest, of, interval } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';
import { ApiInterfaceRx } from '@polkadot/api/types';
import { Price } from '@open-web3/orml-types/interfaces/prices';
import { CurrencyId } from '@acala-network/types/interfaces';
import { TimestampedValue } from '@open-web3/orml-types/interfaces';
import { DerivedPrice } from '../types/price';
import { memo } from '../utils/memo';
import { getCurrencyIds, getStableCoinId } from '../helps/token';

/**
 * @name price
 * @description get token price
 * @param {(CurrencyId | string)} token
 */
export function price (api: ApiInterfaceRx): (token: CurrencyId | string) => Observable<TimestampedValue> {
  return memo((token: string) => {
    /* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */
    const CurrencyId = api.registry.get('CurrencyId')!;
    const currencyId = new CurrencyId(api.registry, token);
    const stableCurrencyId = getStableCoinId(api);
    const stableFixedPrice = api.consts.prices.stableCurrencyFixedPrice as Price;

    // if currency is stable currency, return stableFixedPrice
    if (currencyId.eq(stableCurrencyId)) {
      /* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */
      const TimestampedValue = api.registry.get('TimestampedValue')!;
      return of(new TimestampedValue(api.registry, { value: stableFixedPrice }) as TimestampedValue);
    }

    // fetch price every minute
    return interval(60 * 1000).pipe(
      startWith(0),
      switchMap((): Observable<TimestampedValue> => {
        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
        return (api.rpc as any).oracle.getValue(token);
      })
    );
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
