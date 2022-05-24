import { FixedPointNumber, Token } from '@acala-network/sdk-core';

export interface Auction {
  /// Refund recipient for may receive refund
  refundRecipient: string;
  /// Collateral type for sale
  token: Token;
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
  startTime: number;
}
