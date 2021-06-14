import { Token, TokenBalance, MaybeAccount, MaybeCurrency, ObOrPromiseResult } from '@acala-network/sdk-core';

import { ApiRx, ApiPromise } from '@polkadot/api';
import { PriceData, PriceDataWithTimestamp } from './types';

export abstract class WalletBase<T extends ApiRx | ApiPromise> {
  protected api: T;

  protected constructor(api: T) {
    this.api = api;
  }

  /**
   * @name getAllTokens
   * @description get all available currencies
   */
  abstract getAllTokens(): Token[];

  /**
   * @name getToken
   * @description get the currency
   */
  abstract getToken(currency: MaybeCurrency): Token;

  // get balance

  /**
   * @name getBalance
   * @description get the balance of the currency
   */
  abstract queryBalance(account: MaybeAccount, currency: MaybeCurrency): ObOrPromiseResult<T, TokenBalance>;

  /**
   * @name queryPrices
   * @description get prices of tokens
   */
  abstract queryPrices(tokens: MaybeCurrency[]): ObOrPromiseResult<T, PriceData[]>;

  /**
   * @name queryPrice
   * @description get the price
   */
  abstract queryPrice(currency: MaybeCurrency): ObOrPromiseResult<T, PriceData>;

  /**
   * @name queryOraclePrice
   * @description get the oracle feed price
   */
  abstract queryOraclePrice(): ObOrPromiseResult<T, PriceDataWithTimestamp[]>;

  /**
   * @name subscribeOracleFeeds
   */
  abstract subscribeOracleFeed(provider: string): ObOrPromiseResult<T, PriceDataWithTimestamp[]>;
}
