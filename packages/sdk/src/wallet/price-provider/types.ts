import { Observable } from 'rxjs';
import { FixedPointNumber as FN } from '@acala-network/sdk-core';

export interface PriceProvider {
  subscribe(currency: string): Observable<FN>;
  query(currency: string): Promise<FN>;
}

export enum PriceProviderType {
  'MARKET', // query price form market
  'ORACLE', // query oracle feed prices
  'LIQUID' // query liquid token price according to staking token price
}
