import { AnyApi, FixedPointNumber, Token } from '@acala-network/sdk-core';
import { Wallet } from '../wallet/index.js';

export interface AuctionManagerConfigs {
  api: AnyApi;
  wallet: Wallet;
  // service endpoint
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

export type AuctionStatus = 'DEX_TAKE' | 'IN_PROGRESS' | 'CANCELL' | 'DEALT'   | 'ABORT';

export type AuctionStage = 'NORMAL' | 'REVERSE';

export interface CollateralAuction {
  id: string;
  status: AuctionStatus;
  // auction collateral
  collateral: Token;
  // in current version, the auction has two stages
  // 1. normal: the target is zero so that the user can increase bid value anyway.
  // 2. reverse: the target is not zero and the use will pay a fixed bid value and decrase the receive collateral amount.
  // set stage to normal when target amount is zero, otherwise set stage to reverse
  stage: AuctionStage;
  // initial collateral amount for sale
  initialAmount: FixedPointNumber;
  // current collateral amount for sale
  amount: FixedPointNumber;
  // target sales amount fo this auction
  // if zero, collateral auction will never be reverse stage
  target: {
    amount: FixedPointNumber;
    token: Token;
  };
  /// Refund recipient for may receive refund
  refundRecipient: string;
  // winner account
  winner?: string;
  minimumBidAmount: FixedPointNumber;
  bids: AuctionBid[];
  startBlock: bigint;
  endBlock: bigint;
}
