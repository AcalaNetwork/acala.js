import { Observable } from 'rxjs';
import { OracleConfig, PriceProvider } from './types.js';
import { AnyApi, FixedPointNumber, FixedPointNumber as FN, Token } from '@acala-network/sdk-core';
import { AcalaPrimitivesCurrencyCurrencyId } from '@polkadot/types/lookup';
export declare class OraclePriceProvider implements PriceProvider {
    private api;
    private stakingToken;
    private strategies;
    private tokenProvider;
    constructor(api: AnyApi, config: OracleConfig);
    private queryFormOracle;
    subscribe(token: Token): Observable<FN>;
    query(currency: Token): Promise<FN>;
    queryFeedTokens(): Observable<[AcalaPrimitivesCurrencyCurrencyId]>;
    queryRawData(token: Token): Observable<{
        token: Token;
        timestamp: string;
        price: FixedPointNumber;
    }>;
}
