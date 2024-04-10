import { Observable } from 'rxjs';
import { PriceProvider } from './types.js';
import { FixedPointNumber as FN, Token } from '@acala-network/sdk-core';
export declare class MarketPriceProvider implements PriceProvider {
    private interval;
    private trackedCurrencies;
    private subject;
    private forceUpdate;
    constructor(init?: string[], interval?: number);
    private run;
    private batchQueryPrice;
    subscribe(currency: Token): Observable<FN>;
    query(currency: Token): Promise<FN>;
}
