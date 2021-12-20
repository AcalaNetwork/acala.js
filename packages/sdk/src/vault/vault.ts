/* eslint-disable */
// @ts-nocheck

import { AnyApi, FixedPointNumber, Token } from '@acala-network/sdk-core';
import { Observable } from 'rxjs';
import { Storage } from '../storage';
import { GlobalVault } from './type';

type GlobalObservable = Observable<GlobalVault>;
type PriceObservable = Observable<FixedPointNumber>;

export class Vault {
  constructor(private api: AnyApi, private price$: PriceObservable, private global$: GlobalObservable) {}

  static create(api: AnyApi, price$: Observable<FixedPointNumber>): Vault {
    return new Vault(api, price$);
  }

  private get storages() {
    return {
      'collateral-params': (token: Token) => {
        return Storage.create;
      }
    };
  }
}
