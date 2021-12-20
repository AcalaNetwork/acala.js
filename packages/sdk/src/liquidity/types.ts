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

export interface LiquidityDetail {
  share: FixedPointNumber;
  info: PoolInfo;
  amounts: [FixedPointNumber, FixedPointNumber];
}

export interface UserLiquidity {
  share: FixedPointNumber;
  ratio: FixedPointNumber;
  poolDetail: LiquidityDetail;
  owned: [FixedPointNumber, FixedPointNumber];
}
