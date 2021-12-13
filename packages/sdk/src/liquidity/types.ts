import { FixedPointNumber, Token } from '@acala-network/sdk-core';

export enum LiquidityPoolStatus {
  'enable',
  'bootstrap',
  'close'
}

export interface PoolType {
  token: Token;
  pare: [Token, Token];
}

export interface LiquidityDetail {
  share: FixedPointNumber;
  type: PoolType;
  amounts: [FixedPointNumber, FixedPointNumber];
}

export interface UserLiquidity {
  ratio: FixedPointNumber;
  detail: LiquidityDetail;
}
