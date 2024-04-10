import { BaseHistoryFetcher } from '../base-history-fetcher.js';
import { BaseFetchParams, HistoryFetcherConfig, HistoryRecord } from '../types.js';
export interface HomaFetchParams extends BaseFetchParams {
    address: string;
}
export declare class Homas extends BaseHistoryFetcher<HomaFetchParams> {
    constructor(configs: HistoryFetcherConfig);
    fetch(params: HomaFetchParams): Promise<HistoryRecord[]>;
    private transform;
    private createRequestedRedeemsMessage;
    private createMintsMessage;
    private createCamcelledsMessage;
    private createredeemedsMessage;
    private createRedeemedByUnbondsMessage;
    private createFastMatchesMessage;
}
