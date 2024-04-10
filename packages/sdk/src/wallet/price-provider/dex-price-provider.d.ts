import { Observable } from 'rxjs';
import { PriceProvider } from './types.js';
import { FixedPointNumber as FN, Token } from '@acala-network/sdk-core';
import { Liquidity } from '../../liquidity/index.js';
export declare class DexPriceProvider implements PriceProvider {
    private liquidity;
    constructor(liquidity: Liquidity);
    subscribe(currency: Token): Observable<FN>;
    query(currency: Token): Promise<FN>;
}
