import { Observable } from 'rxjs';
import { PriceProvider } from './types.js';
import { FixedPointNumber as FN, Token } from '@acala-network/sdk-core';
interface AggregatedProviderConfigs {
    market?: PriceProvider;
    dex: PriceProvider;
}
export declare class AggregateProvider implements PriceProvider {
    private marketPriceProvider;
    private dexPriceProvider;
    constructor({ market, dex }: AggregatedProviderConfigs);
    subscribe(token: Token): Observable<FN>;
    query(currency: Token): Promise<FN>;
}
export {};
