import { AnyApi, FixedPointNumber, Token } from '@acala-network/sdk-core';
import { Observable } from 'rxjs';
import { Storage } from '../storage';

export class Vault {
  constructor(private api: AnyApi, private price$: Observable<FixedPointNumber>) {}

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
