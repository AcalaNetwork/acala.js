import { AnyApi, FixedPointNumber, Token } from '@acala-network/sdk-core';
import { ModuleIncentivesPoolId } from '@acala-network/types/interfaces/types-lookup';
import { Wallet } from '../wallet';

export enum IncentiveType {
  'LOANS',
  'DEX'
}

export interface IncentiveConfigs {
  api: AnyApi;
  wallet: Wallet;
}

export interface IncentiveReward {
  rewardToken: Token;
  // total reward include withdrawned reward and claimable reward
  totalReward: FixedPointNumber;
  // the reward which withdrawned
  withdrawnReward: FixedPointNumber;
  // the reward which can claimabled
  claimableReward: FixedPointNumber;
}

export interface UserIncentiveReward {
  rewardToken: Token;
  // the reward which withdrawned
  withdrawnReward: FixedPointNumber;
  // the reward which can claimabled
  claimableReward: FixedPointNumber;
  claimableRewardWithDeduction: FixedPointNumber;
}

export type IncentiveRewardTokensConfigs = Record<
  string,
  {
    token: Token;
    amount: FixedPointNumber;
  }[]
>;

export interface RewardAPR {
  apr: number;
  aprWithDeduction: number;
  apy: number;
}
export interface BaseIncentivePool {
  // pool type
  type: IncentiveType;
  // pool id
  id: string;
  // raw pool id
  rawId: ModuleIncentivesPoolId;
  // the colateral token required by the pool
  collateral: Token;
  // total shares belone to the pool
  totalShares: FixedPointNumber;
  // total rewards belone to the pool
  rewards: IncentiveReward[];
}

export interface IncentivePool extends BaseIncentivePool {
  enable: boolean;
  deductionRate: FixedPointNumber;
  // only set when type is DEX
  savingRate?: FixedPointNumber;
  rewardTokensConfig: { token: Token; amount: FixedPointNumber }[];
  endBlockNumber: number;
  apr?: RewardAPR;
}

export interface UserIncentivePool {
  // shares owned by user
  shares: FixedPointNumber;
  // rewards owned by user
  rewards: UserIncentiveReward[];
  // the incentive pool information
  pool: IncentivePool;
}
