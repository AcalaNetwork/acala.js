import { ApiPromise, ApiRx } from '@polkadot/api';
import { Observable } from '@polkadot/types/types';
import { FixedPointNumber } from './fixed-point-number';

export type CHAIN = 'acala' | 'kurara' | 'polkadot' | 'kusama' | unknown;

export interface Token {
  symbol: string;
  precision: number;
}

export interface TokenBalance extends Token {
  balance: FixedPointNumber;
}

export type AnyApi = ApiPromise | ApiRx;

export type ObOrPromiseResult<T extends AnyApi, R extends unknown> = T extends ApiRx ? Observable<R> : Promise<R>;
