import { Token, FixedPointNumber, TokenBalance } from '@acala-network/sdk-core';

export interface LiquidityPool {
  token1: Token;
  token2: Token;
  balance1: FixedPointNumber;
  balance2: FixedPointNumber;
}

export interface SwapResult {
  midPrice: FixedPointNumber;
  priceImpact: FixedPointNumber;
  path: Token[];
  input: TokenBalance;
  output: TokenBalance;
}
