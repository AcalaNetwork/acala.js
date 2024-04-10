import { Observable } from 'rxjs';
import { BaseSDK } from '../types.js';
import { AuctionListQueryParams, AuctionManagerConfigs } from './types.js';
import { Auction } from './auction.js';
export declare class Auctions implements BaseSDK {
    private wallet;
    private api;
    private status;
    private graphql;
    constructor({ api, wallet, graphql }: AuctionManagerConfigs);
    private init;
    get isReady$(): Observable<boolean>;
    get isReady(): Promise<boolean>;
    subscribeList(params: AuctionListQueryParams): Observable<{
        list: Auction[];
        current: number | undefined;
        totalPage: number;
    }>;
}
