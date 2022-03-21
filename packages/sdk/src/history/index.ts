import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { HistoryConfigs, HistoryRecord, HistoryType } from './types';

export class History {
  readonly configs: HistoryConfigs;
  private histories: BehaviorSubject<HistoryRecord[]>;
  private type: HistoryType;

  constructor(configs: HistoryConfigs) {
    this.configs = configs;
    this.histories = new BehaviorSubject<HistoryRecord[]>([]);
    this.type = 'transfer';
  }

  private fetchHistory () {

  }

  public subscribeHistories(type: HistoryType) {
    return this.histories;
  }

  public async getHistories(type: HistoryType): Promise<HistoryRecord[]> {
    return firstValueFrom(this.subscribeHistories(type));
  }
}
