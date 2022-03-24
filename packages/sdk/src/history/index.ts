import { HistoryConfigs } from './types';
import { Transfers } from './fetchers/transfers';

export class History {
  readonly configs: HistoryConfigs;
  readonly transfer: Transfers;

  constructor(configs: HistoryConfigs) {
    this.configs = configs;

    // initizlize hisotry fetcher
    this.transfer = new Transfers({
      endpoint: this.configs.fetchEndpoints.transfer,
      poolInterval: this.configs.poolInterval,
      wallet: this.configs.wallet
    });
  }
}
