import { AnyApi } from '@acala-network/sdk-core';
import { Observable } from 'rxjs';
import { TokenProvider } from '../token-provider/type.js';
import { VestingData } from './types.js';
export interface VestingConfig {
    api: AnyApi;
    tokenProvider: TokenProvider;
}
export declare class Vesting {
    private api;
    private tokenProvider;
    constructor({ api, tokenProvider }: VestingConfig);
    subscribeVestingDetail(address: string): Observable<VestingData>;
    getVestingDetail(address: string): Promise<VestingData>;
}
