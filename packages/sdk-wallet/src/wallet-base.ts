import { Token, TokenBalance } from '@acala-network/sdk-core';
import { MaybeAccount, MaybeCurrency, ObOrPromiseResult } from '@acala-network/sdk-core';
import { ApiRx, ApiPromise } from '@polkadot/api';

export abstract class WalletBase<T extends ApiRx | ApiPromise> {
  protected api: T;

  constructor(api: T) {
    this.api = api;
  }

  abstract init(): ObOrPromiseResult<T, boolean>;

  /**
   * @name getAllTokens
   * @description get all available currencies
   */
  abstract getAllTokens(): Token[];

  /**
   * @name getToken
   * @description get the currency
   */
  abstract getToken(currency: MaybeCurrency): Token | undefined;

  // get balance

  /**
   * @name getBalance
   * @description get the balance of the currency
   */
  abstract queryBalance(account: MaybeAccount, currency: MaybeCurrency): ObOrPromiseResult<T, TokenBalance>;
}
