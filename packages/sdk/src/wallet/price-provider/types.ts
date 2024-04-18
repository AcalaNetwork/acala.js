import { Observable } from 'rxjs';
import { FixedPointNumber as FN, Token } from '@acala-network/sdk-core';
import { TokenProvider } from '../token-provider/type.js';

export interface PriceProvider {
  subscribe(currency: Token): Observable<FN>;
  query(currency: Token): Promise<FN>;
}

export enum PriceProviderType {
  'AGGREGATE',
  'MARKET', // query prices form market
  'ORACLE', // query oracle feed prices
  'DEX' // query price form dex
}

export type OracleStrategy = 'AS' | 'STORAGE' | 'LIQUID_CROWDLOAN';

export interface OracleConfig {
  stakingToken: Token;
  tokenPrivoder: TokenProvider;
  strategies?: Record<string, [OracleStrategy, any]>;
}
