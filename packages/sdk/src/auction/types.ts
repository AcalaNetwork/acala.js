import { AnyApi, FixedPointNumber, Token } from '@acala-network/sdk-core';
import { Wallet } from '../wallet';

export interface AuctionData {
  /// Refund recipient for may receive refund
  refundRecipient: string;
  /// Collateral type for sale
  collateral: Token;
  /// Initial collateral amount for sale
  initialAmount: FixedPointNumber;
  /// Current collateral amount for sale
  amount: FixedPointNumber;
  /// Target sales amount of this auction
  /// if zero, collateral auction will never be reverse stage,
  /// otherwise, target amount is the actual payment amount of active
  /// bidder
  target: FixedPointNumber;
  /// Auction start time
  startBlock: bigint;
  /// Auction start time
  endBlock?: bigint;
  /// Current Bid Amount
  currentBidAmount?: FixedPointNumber;
  /// Current Bid Account
  currentBidAccount?: string;
  /// Minimum bind amount
  minimumBidAmount: FixedPointNumber;
}

export interface AuctionManagerConfigs {
  api: AnyApi;
  wallet: Wallet;
}

export interface AuctionConfigs {
  api: AnyApi;
  id: string;
  wallet: Wallet;
}
