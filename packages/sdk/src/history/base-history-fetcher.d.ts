import { Observable } from 'rxjs';
import { BaseFetchParams, HistoryFetcherConfig, HistoryRecord } from './types.js';
export declare abstract class BaseHistoryFetcher<FetchParams extends BaseFetchParams> {
    protected configs: HistoryFetcherConfig;
    protected fetchParams: FetchParams | null;
    private forceUpdate;
    constructor(configs: HistoryFetcherConfig);
    private process;
    protected abstract fetch(params: FetchParams): Promise<HistoryRecord[]>;
    reflesh(): void;
    subscribeHistories(params: FetchParams): Observable<HistoryRecord[]>;
    getHistories(params: FetchParams): Promise<HistoryRecord[]>;
}
