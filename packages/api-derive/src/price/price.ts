import { Observable, combineLatest, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiInterfaceRx } from '@polkadot/api/types';
import { Price } from '@open-web3/orml-types/interfaces/traits';
import { TimestampedValue } from '@open-web3/orml-types/interfaces';
import { Option } from '@polkadot/types/codec';

import { CurrencyId } from '@acala-network/types/interfaces';

import { DerivedPrice } from '../types/price';
import { memo } from '../utils/memo';
import { getCurrencyIds, getStableCurrencyId } from '../helps/currency';

/**
 * @name price
 * @description get currency price
 * @param {(CurrencyId | string)} currency
 */
export function price (api: ApiInterfaceRx): (currency: CurrencyId | string) => Observable<Option<TimestampedValue>> {
  return memo((currency: string) => {
    /* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */
    const CurrencyId = api.registry.get('CurrencyId')!;
    const currencyId = new CurrencyId(api.registry, currency);
    const stableCurrencyId = getStableCurrencyId(api);
    const stableFixedPrice = api.consts.prices.stableCurrencyFixedPrice as Price;

    // if currency is stable currency, return stableFixedPrice
    if (currencyId.eq(stableCurrencyId)) {
      /* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */
      const TimestampedValue = api.registry.get('Option<TimestampedValue>')!;
      return of(new TimestampedValue(api.registry, { value: stableFixedPrice }) as Option<TimestampedValue>);
    }

    return api.query.oracle.values<Option<TimestampedValue>>(currency);
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

    return combineLatest(currencyIds.map((currency) => priceQuery(currency))).pipe(
      map((result) => {
        return currencyIds.map((currency, index) => ({ currency, price: result[index] }));
      })
    );
  });
}
