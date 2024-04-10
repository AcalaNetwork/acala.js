import { BaseHistoryFetcher } from '../base-history-fetcher.js';
import { BaseFetchParams, HistoryFetcherConfig, HistoryRecord } from '../types.js';
export interface LoanFetchParams extends BaseFetchParams {
    address: string;
}
export declare class Loans extends BaseHistoryFetcher<LoanFetchParams> {
    constructor(configs: HistoryFetcherConfig);
    fetch(params: LoanFetchParams): Promise<HistoryRecord[]>;
    private transform;
    private createUpdateMessage;
    private createCloseByDexMessage;
    private createLiquidityMessage;
}
