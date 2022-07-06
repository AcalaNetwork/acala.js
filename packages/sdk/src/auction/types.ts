import { AnyApi, FixedPointNumber, Token } from '@acala-network/sdk-core';
import { Wallet } from '../wallet';

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

export interface AuctionListQueryParams {
  page?: number;
  pageSize?: number;
  status?: string;
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

export interface CollateralAuction {
  id: string;
  status: AuctionStatus;
  // auction collateral
  collateral: Token;
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
