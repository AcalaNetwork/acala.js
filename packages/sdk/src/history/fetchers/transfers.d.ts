import { MaybeCurrency } from '@acala-network/sdk-core';
import { BaseHistoryFetcher } from '../base-history-fetcher.js';
import { BaseFetchParams, HistoryFetcherConfig, HistoryRecord } from '../types.js';
export interface TransfersFetchParams extends BaseFetchParams {
    address: string;
    token?: MaybeCurrency;
}
export declare class Transfers extends BaseHistoryFetcher<TransfersFetchParams> {
    constructor(configs: HistoryFetcherConfig);
    fetch(params: TransfersFetchParams): Promise<HistoryRecord[]>;
    private transform;
    private createMessage;
}
