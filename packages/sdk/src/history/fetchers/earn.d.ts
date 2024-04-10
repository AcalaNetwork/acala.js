import { BaseHistoryFetcher } from '../base-history-fetcher.js';
import { BaseFetchParams, HistoryFetcherConfig, HistoryRecord } from '../types.js';
export interface EarnFetchParams extends BaseFetchParams {
    address: string;
}
interface EarnFetcherConfigs extends HistoryFetcherConfig {
    stakingEndpoint: string;
}
export declare class Earns extends BaseHistoryFetcher<EarnFetchParams> {
    private stakingEndpoint;
    constructor(configs: EarnFetcherConfigs);
    fetchStaking(params: EarnFetchParams): Promise<HistoryRecord[]>;
    fetch(params: EarnFetchParams): Promise<HistoryRecord[]>;
    private transformStaking;
    private transform;
    private getPoolId;
    private createMessage;
}
export {};
