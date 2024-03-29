import { FixedPointNumber, Token } from '@acala-network/sdk-core';
import { Observable } from 'rxjs';

export interface BaseSDK {
  get isReady(): Promise<boolean>;
  get isReady$(): Observable<boolean>;
}

export const enum ChainType {
  'ACALA' = 'ACALA',
  'MANDALA' = 'MANDALA',
  'KARURA' = 'KARURA'
}

export interface TokenBalance {
  token: Token | string;
  balance: FixedPointNumber;
}
