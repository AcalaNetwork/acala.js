import { FixedPointNumber, Token, TokenBalance } from '@acala-network/sdk-core';
import { ObOrPromiseResult } from '@acala-network/sdk-core/type';
import { CurrencyId } from '@acala-network/types/interfaces';
import { ApiRx, ApiPromise } from '@polkadot/api';
import { Sender, SendOptions } from './types';

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
  abstract getToken(currency: string | CurrencyId | Token): Token;

  // get balance

  /**
   * @name getBalance
   * @description get the balance of the currency
   */
  abstract getBalance(currency: string | CurrencyId | Token): ObOrPromiseResult<T, TokenBalance>;

  /**
   * @name getMaxSafeTransferAmount
   * @description get the max transfer amount, for the native currency, This method will reserve a portion of the amount to ensure the success of the transaction.
   */
  abstract getMaxSafeTransferAmount(currency: string | CurrencyId | Token): ObOrPromiseResult<T, FixedPointNumber>;

  /**
   * @name createSender
   * @description create a sender instance
   */
  abstract createSender(opts: SendOptions): ObOrPromiseResult<T, Sender<T>>;
}
