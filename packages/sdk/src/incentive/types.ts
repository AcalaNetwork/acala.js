import { AnyApi, FixedPointNumber, Token } from '@acala-network/sdk-core';
import { ModuleSupportIncentivesPoolId } from '@polkadot/types/lookup';
import { Wallet } from '../wallet/index.js';

export enum IncentiveType {
  'LOANS',
  'DEX',
  'Earning'
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
  raw: ModuleSupportIncentivesPoolId;
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
  // savingRate has been removed
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
