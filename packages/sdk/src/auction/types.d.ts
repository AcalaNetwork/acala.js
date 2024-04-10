import { AnyApi, FixedPointNumber, Token } from '@acala-network/sdk-core';
import { Wallet } from '../wallet/index.js';
export interface AuctionManagerConfigs {
    api: AnyApi;
    wallet: Wallet;
    graphql: {
        endpoint: string;
    };
}
export interface AuctionConfigs {
    api: AnyApi;
    id: string;
    wallet: Wallet;
    data: CollateralAuction;
}
export interface AuctionQueryFilter {
    status?: AuctionStatus;
    account?: string;
}
export interface AuctionListQueryParams {
    page?: number;
    pageSize?: number;
    filter?: AuctionQueryFilter;
}
export interface AuctionBid {
    /**
     * KICK: virtual record when auction created
     * DENT: dent the auction
     * DEX_TAKE: virtual record when dex take
     */
    type: 'KICK' | 'DENT' | 'DEX_TAKE';
    bid: {
        token: Token;
        amount: FixedPointNumber;
    };
    lotSize: {
        token: Token;
        amount: FixedPointNumber;
    };
    bidPrice: FixedPointNumber;
    timestamp: Date;
    bidder: string;
    tx: string;
}
export type AuctionStatus = 'DEX_TAKE' | 'IN_PROGRESS' | 'CANCELL' | 'DEALT' | 'DEX_TAKE' | 'ABORT';
export type AuctionStage = 'NORMAL' | 'REVERSE';
export interface CollateralAuction {
    id: string;
    status: AuctionStatus;
    collateral: Token;
    stage: AuctionStage;
    initialAmount: FixedPointNumber;
    amount: FixedPointNumber;
    target: {
        amount: FixedPointNumber;
        token: Token;
    };
    refundRecipient: string;
    winner?: string;
    minimumBidAmount: FixedPointNumber;
    bids: AuctionBid[];
    startBlock: bigint;
    endBlock: bigint;
}
