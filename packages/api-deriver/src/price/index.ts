import { ApiRx } from "@polkadot/api";
import { Observable, combineLatest, of } from "rxjs";
import { map } from 'rxjs/operators';
import { DerivedPrice, DerivedRawPrice } from "../types/price";
import { queryWrapper } from "../utils/queryWrapper";
import { QueryOption } from "../types/query";
import { TimestampedValue } from "@orml/types/interfaces/oracle";

// query price feed raw data
export function rawPrice (api: ApiRx, asset: string, option?: QueryOption): Observable<DerivedRawPrice> {
    if (asset === api.consts.prices.getStableCurrencyId.toString()) {
        return of({
            asset, 
            value: api.createType('TimestampedValue', [api.consts.prices.stableCurrencyFixedPrice])
        });
    }

    return queryWrapper<Observable<TimestampedValue>>(api.query.oracle.values, [asset], option).pipe(
        map((result: TimestampedValue) => {
            return {
                asset,
                value: result
            }
        })
    );
}

// query price by rpc
export function price (api: ApiRx, asset: string): Observable<DerivedPrice> {
    if (asset === api.consts.prices.getStableCurrencyId.toString()) {
        return of({
            asset, 
            value: api.consts.prices.stableCurrencyFixedPrice
        });
    }
    return (api.rpc as any).oracle.getValue(asset).pipe(
        map((result) => { return {
                asset,
                value: result
            }
        })
    )
}


// query all asset feed price
export function rawPrices(api: ApiRx, option?: QueryOption): Observable<DerivedRawPrice[]> {
    const currencyId = api.createType('CurrencyId');
    const currencyIds = currencyId.defKeys.map(id => id);
    return combineLatest(currencyIds.map(asset => rawPrice(api, asset, option)));
}

export function currentPrices(api: ApiRx): Observable<DerivedPrice[]> {
    const currencyId = api.createType('CurrencyId');
    const currencyIds = currencyId.defKeys.map(id => id);
    return combineLatest(currencyIds.map(asset => price(api, asset)));
}