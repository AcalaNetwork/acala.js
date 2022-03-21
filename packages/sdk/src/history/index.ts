import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { HistoryConfigs, HistoryRecord, HistoryType } from './types';

export class History {
  readonly configs: HistoryConfigs;
  private histories: BehaviorSubject<HistoryRecord[]>;

  constructor(configs: HistoryConfigs) {
    this.configs = configs;
    this.histories = new BehaviorSubject<HistoryRecord[]>([]);
  }

  public subscribeHistories(type: HistoryType) {
    return this.histories;
  }

  public async getHistories(type: HistoryType): Promise<HistoryRecord[]> {
    return firstValueFrom(this.subscribeHistories(type));
  }
}
