/* eslint-disable */
// @ts-nocheck

/**
 * The vault sdk providers some usefull query, and create calls to manipulte user valult
 */

import { AnyApi, Token } from '@acala-network/sdk-core';

export class Vault {
  private api: AnyApi;

  constructor(api: AnyApi) {
    this.api = api;
  }

  public subscribeVault(currency: Token, address: string) {
    // PASS
  }

  public subscribeEnabledType () {
    // PASS
  }

  public subscribeOverview(address: string) {
    // PASS
  }
}
