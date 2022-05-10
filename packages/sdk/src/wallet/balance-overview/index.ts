import { AnyApi, Token } from '@acala-network/sdk-core';
import { TokenProvider } from '@acala-network/sdk/base-provider';
import { BalanceOverviewConfigs } from './types';

export class BalanceOverview {
  private api: AnyApi;
  private tokenProvider: TokenProvider;

  constructor(api: AnyApi, { tokenProvider }: BalanceOverviewConfigs) {
    this.api = api;
    this.tokenProvider = tokenProvider;
  }

  public subscribeTokenProperties (token: Token): boolean {
    const collaterals = this.api.consts.cdpEngine.collateralCurrencyIds.map(t)

  }
}
