import { FixedPointNumber, Token } from '@acala-network/sdk-core';

export enum LiquidityPoolStatus {
  'ALL',
  'ENABLED',
  'PROVISION',
  'DISABLED'
}

export interface PoolInfo {
  token: Token;
  pair: [Token, Token];
  status: LiquidityPoolStatus;
}

export interface PoolDetail {
  share: FixedPointNumber;
  info: PoolInfo;
  amounts: [FixedPointNumber, FixedPointNumber];
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
