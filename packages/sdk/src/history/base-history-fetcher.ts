import { BehaviorSubject, combineLatest, filter, firstValueFrom, from, Observable, switchMap, timer } from 'rxjs';
import { BaseFetchParams, HistoryFetcherConfig, HistoryRecord } from './types';

export abstract class BaseHistoryFetcher<FetchParams extends BaseFetchParams> {
  protected configs: HistoryFetcherConfig;
  protected fetchParams: FetchParams | null;
  private forceUpdate: BehaviorSubject<number>;

  constructor(configs: HistoryFetcherConfig) {
    this.configs = configs;
    this.forceUpdate = new BehaviorSubject<number>(0);
    this.fetchParams = null;
  }

  private process() {
    return combineLatest({
      timer: timer(0, this.configs.poolInterval),
      forceUpdate: this.forceUpdate
    }).pipe(
      switchMap(() => {
        return from(
          (async () => {
            if (!this.fetchParams) return;

            return this.fetch(this.fetchParams);
          })()
        );
      })
    );
  }

  protected abstract fetch(params: FetchParams): Promise<HistoryRecord[]>;

  public reflesh(): void {
    this.forceUpdate.next(this.forceUpdate.value + 1);
  }

  public subscribeHistories(params: FetchParams): Observable<HistoryRecord[]> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    this.fetchParams = params;

    this.forceUpdate.next(this.forceUpdate.value + 1);

    return this.process().pipe(filter((i) => Array.isArray(i))) as Observable<HistoryRecord[]>;
  }

  public getHistories(params: FetchParams): Promise<HistoryRecord[]> {
    return firstValueFrom(this.subscribeHistories(params));
  }
}
