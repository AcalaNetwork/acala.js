import { MaybeCurrency } from '@acala-network/sdk-core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IncentiveConfigs, IncentivePool, IncentiveType, UserIncentivePool } from './types.js';
import { BaseSDK } from '../types.js';
export declare class Incentive implements BaseSDK {
    private api;
    private storages;
    private wallet;
    isReady$: BehaviorSubject<boolean>;
    readonly consts: {
        accumulatePeriod: number;
    };
    constructor({ api, wallet }: IncentiveConfigs);
    private init;
    private getTokens;
    private deductionRates$;
    private rewardTokensConfigs$;
    private poolInfos$;
    private endTimes$;
    private apr$;
    private userIncentive$;
    get isReady(): Promise<boolean>;
    subscribeAllIncentivePools: import("@polkadot/util/types").Memoized<() => Observable<IncentivePool[]>>;
    getAllIncentivePools(): Promise<IncentivePool[]>;
    subscribeIncentivePoolById(id: string): Observable<IncentivePool | undefined>;
    getIncentivePoolById(id: string): Promise<IncentivePool | undefined>;
    subscribeIncentivePool(type: IncentiveType, currency: MaybeCurrency): Observable<IncentivePool | undefined>;
    getIncnetivePool(type: IncentiveType, currency: MaybeCurrency): Promise<IncentivePool | undefined>;
    subscribeUserIncentive(id: string, address: string): Observable<UserIncentivePool>;
    getUserIncentive(id: string, address: string): Promise<UserIncentivePool>;
}
