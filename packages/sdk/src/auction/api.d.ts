import { Wallet } from '../wallet/wallet.js';
import { AuctionListQueryParams, CollateralAuction } from './types.js';
export declare const convertApiResult: (data: any, wallet: Wallet, configs: AuctionListQueryParams) => {
    current: number | undefined;
    totalPage: number;
    list: CollateralAuction[];
};
export declare const fetchAuctionList: (endpoint: string, params?: AuctionListQueryParams) => Promise<any>;
