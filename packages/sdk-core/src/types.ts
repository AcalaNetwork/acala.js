import { CurrencyId } from '@acala-network/types/interfaces';
import { ApiPromise, ApiRx } from '@polkadot/api';
import { AccountId } from '@polkadot/types/interfaces';
import { Observable } from '@polkadot/types/types';
import { Token } from './token';

export type CHAIN = 'acala' | 'kurara' | 'polkadot' | 'kusama' | unknown;

export type AnyApi = ApiPromise | ApiRx;

export type ObOrPromiseResult<T extends AnyApi, R extends unknown> = T extends ApiRx ? Observable<R> : Promise<R>;

export type MaybeCurrency = string | CurrencyId | Token | [string, string];

export type MaybeAccount = string | AccountId;
