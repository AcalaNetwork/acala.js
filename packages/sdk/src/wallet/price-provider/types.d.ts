import { Observable } from 'rxjs';
import { FixedPointNumber as FN, Token } from '@acala-network/sdk-core';
import { TokenProvider } from '../token-provider/type.js';
export interface PriceProvider {
    subscribe(currency: Token): Observable<FN>;
    query(currency: Token): Promise<FN>;
}
export declare enum PriceProviderType {
    'AGGREGATE' = 0,
    'MARKET' = 1,// query prices form market
    'ORACLE' = 2,// query oracle feed prices
    'DEX' = 3
}
export type OracleStrategy = 'AS' | 'STORAGE' | 'LIQUID_CROWDLOAN';
export interface OracleConfig {
    stakingToken: Token;
    tokenPrivoder: TokenProvider;
    strategies?: Record<string, [OracleStrategy, any]>;
}
