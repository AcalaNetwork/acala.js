import { FixedPointNumber } from '@acala-network/sdk-core';
import { Observable } from 'rxjs';
import { AuctionConfigs, CollateralAuction } from './types.js';
export declare class Auction {
    private api;
    private wallet;
    private storages;
    private inner;
    private chainListener;
    readonly id: string;
    readonly configs: {
        minimumIncrementSize: FixedPointNumber;
        auctionDurationSoftCap: bigint;
    };
    private detail$;
    private subscriptions;
    constructor({ id, api, wallet, data }: AuctionConfigs);
    get data$(): Observable<CollateralAuction>;
    unscribe(): void;
    private getMinimumBidAmount;
    getActualReceiveByBidAmount(amount: FixedPointNumber): FixedPointNumber;
    getActualBidAmountByReceive(amount: FixedPointNumber): FixedPointNumber;
    private getCurrentStatusFormBlock;
    private createDexTakeBidRecord;
    private createBidRecord;
    private subscribeData;
}
