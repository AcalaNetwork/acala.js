import { BehaviorSubject, combineLatest, filter, firstValueFrom, Observable, timer } from 'rxjs';
import { BaseFetchParams, HistoryFetcherConfig, HistoryRecord } from './types';

export abstract class BaseHistoryFetcher<FetchParams extends BaseFetchParams> {
  protected configs: HistoryFetcherConfig;
  protected fetchParams: FetchParams | null;
  private forceUpdate: BehaviorSubject<number>;
  private records$: BehaviorSubject<HistoryRecord[] | undefined>;

  constructor(configs: HistoryFetcherConfig) {
    this.configs = configs;
    this.forceUpdate = new BehaviorSubject<number>(0);
    this.records$ = new BehaviorSubject<HistoryRecord[] | undefined>(undefined);
    this.fetchParams = null;

    this.process();
  }

  private process() {
    combineLatest({
      timer: timer(0, this.configs.poolInterval),
      forceUpdate: this.forceUpdate
    }).subscribe({
      next: async () => {
        if (!this.fetchParams) return;

        const records = await this.fetch(this.fetchParams);

        this.records$.next(records || []);
      }
    });
  }

  protected abstract fetch(params: FetchParams): Promise<HistoryRecord[]>;

  public reflesh(): void {
    this.forceUpdate.next(this.forceUpdate.value + 1);
  }

  public subscribeHistories(params: FetchParams): Observable<HistoryRecord[]> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    this.fetchParams = params;

    this.forceUpdate.next(this.forceUpdate.value + 1);

    return this.records$.pipe(filter((i) => Array.isArray(i))) as Observable<HistoryRecord[]>;
  }

  public getHistories(params: FetchParams): Promise<HistoryRecord[]> {
    return firstValueFrom(this.subscribeHistories(params));
  }
}
