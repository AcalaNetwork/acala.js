import { BaseHistoryFetcher } from '../base-history-fetcher.js';
import { BaseFetchParams, HistoryFetcherConfig, HistoryRecord } from '../types.js';
export interface SwapFetchParams extends BaseFetchParams {
    address: string;
}
export declare class Swaps extends BaseHistoryFetcher<SwapFetchParams> {
    constructor(configs: HistoryFetcherConfig);
    fetch(params: SwapFetchParams): Promise<HistoryRecord[]>;
    private transform;
    private createMessage;
}
