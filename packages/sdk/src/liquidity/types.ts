import { FixedPointNumber, Token } from '@acala-network/sdk-core';

export type LiquidityPoolStatus = 'all' | 'enabled' | 'provision' | 'disabled';

export interface PoolInfo {
  token: Token;
  pair: [Token, Token];
  status: LiquidityPoolStatus;
}

export interface PoolPositions {
  share: FixedPointNumber;
  info: PoolInfo;
  amounts: [FixedPointNumber, FixedPointNumber];
}

export interface PoolDetail extends PoolPositions {
  tvl: FixedPointNumber;
  sharePrice: FixedPointNumber;
}

export interface UserLiquidity {
  share: FixedPointNumber;
  ratio: FixedPointNumber;
  poolDetail: PoolDetail;
  owned: [FixedPointNumber, FixedPointNumber];
}

export interface EstimateAddLiquidityResult {
  incrementA: FixedPointNumber;
  incrementB: FixedPointNumber;
  incrementShare: FixedPointNumber;
  incrementShareWithSlippage: FixedPointNumber;
  slippage: number;
  poolDetail: PoolDetail;
}

export interface EstimateRemoveLiquidityResult {
  removeShare: FixedPointNumber;
  minReceived: [FixedPointNumber, FixedPointNumber];
  slippage: number;
  poolDetail: PoolDetail;
}

export interface PoolSizeOfShare {
  share: FixedPointNumber;
  ratio: FixedPointNumber;
  amounts: [FixedPointNumber, FixedPointNumber];
  poolDetail: PoolDetail;
}
