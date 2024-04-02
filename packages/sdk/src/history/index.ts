import { HistoryConfigs } from './types.js';
import { Transfers } from './fetchers/transfers.js';
import { Swaps } from './fetchers/swap.js';
import { Earns } from './fetchers/earn.js';
import { Loans } from './fetchers/loan.js';
import { Homas } from './fetchers/homa.js';

export class History {
  readonly configs: HistoryConfigs;
  readonly transfer: Transfers;
  readonly swap: Swaps;
  readonly earn: Earns;
  readonly loan: Loans;
  readonly homa: Homas;

  constructor(configs: HistoryConfigs) {
    this.configs = configs;

    // initizlize hisotry fetcher
    this.transfer = new Transfers({
      endpoint: this.configs.fetchEndpoints.transfer,
      poolInterval: this.configs.poolInterval,
      wallet: this.configs.wallet
    });

    this.swap = new Swaps({
      endpoint: this.configs.fetchEndpoints.swap,
      poolInterval: this.configs.poolInterval,
      wallet: this.configs.wallet
    });

    this.earn = new Earns({
      endpoint: this.configs.fetchEndpoints.earn,
      stakingEndpoint: this.configs.fetchEndpoints.staking || '',
      poolInterval: this.configs.poolInterval,
      wallet: this.configs.wallet
    });

    this.loan = new Loans({
      endpoint: this.configs.fetchEndpoints.loan,
      poolInterval: this.configs.poolInterval,
      wallet: this.configs.wallet
    });

    this.homa = new Homas({
      endpoint: this.configs.fetchEndpoints.homa,
      poolInterval: this.configs.poolInterval,
      wallet: this.configs.wallet
    });
  }
}
