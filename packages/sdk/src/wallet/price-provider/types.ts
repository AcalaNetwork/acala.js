import { Observable } from 'rxjs';
import { FixedPointNumber as FN, Token } from '@acala-network/sdk-core';

export interface PriceProvider {
  subscribe(currency: Token): Observable<FN>;
  query(currency: Token): Promise<FN>;
}

export enum PriceProviderType {
  'AGGREGATE',
  'MARKET', // query price form market
  'ORACLE', // query oracle feed prices
  'DEX' // query price form dex
}
