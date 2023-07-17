import { Wallet } from '@acala-network/sdk';
import { AggregateDex } from '@acala-network/sdk-swap';
import { PaymentConfig } from './types';
import { AnyApi, Token } from '@acala-network/sdk-core';
import { isEmpty } from 'lodash';
import { ensureReady } from './utils';
import { Storages, createStorages } from './storage';

export class Payment {
  readonly wallet: Wallet;
  readonly dex: AggregateDex;
  readonly api: AnyApi;
  public isReady: boolean = false;
  private payableTokens: Token[] = [];
  private storages: Storages;

  constructor(config: PaymentConfig) {
    this.wallet = config.wallet;
    this.dex = config.dex;
    this.api = config.api;
    this.storages = createStorages(this.api);
  }

  async ready () {
    await this.wallet.isReady;
    await this.dex.isReady;

    this.isReady = true;

    return true;
  }

  @ensureReady
  async getPayableTokens () {
    if (!isEmpty(this.payableTokens)) return this.payableTokens;

    const { dex, api} = this;
    const tradableTokesn = await dex.getTradableTokens();
    const globalFeePaths = await this.storages.globalFeeSwapPathes().query();

    const payableTokens = [...tradableTokesn];

    // for (const [token, paths] of globalFeePaths) {
    //   const path = paths[0];

    //   if (path.length === 0) {
    //     payableTokens.push(token);
    //   }
    // }
  }
}
