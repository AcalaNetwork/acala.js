import { FixedPointNumber, Token, TokenBalance } from '@acala-network/sdk-core';
import { BlockNumber } from '@acala-network/types/interfaces';

export interface TokenProvider {
  getAllTokens: () => Token[];
}

export interface PriceData {
  token: Token;
  price: FixedPointNumber;
}

export type PriceDataWithTimestamp = PriceData & { timestamp: Date };


export interface NativeAllBalance {
  freeBalance: TokenBalance;
  availableBalance: TokenBalance;
  lockedBalance: TokenBalance;
  isVesting: boolean;
  vestingBalance: TokenBalance;
  vestingEndBlock: BlockNumber;
  vestingPeriod: BlockNumber;
  vestingPerPeriod: TokenBalance;
}