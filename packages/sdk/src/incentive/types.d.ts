import { AnyApi, FixedPointNumber, Token } from '@acala-network/sdk-core';
import { ModuleSupportIncentivesPoolId } from '@polkadot/types/lookup';
import { Wallet } from '../wallet/index.js';
export declare enum IncentiveType {
    'LOANS' = 0,
    'DEX' = 1,
    'Earning' = 2
}
export interface IncentiveConfigs {
    api: AnyApi;
    wallet: Wallet;
}
export interface IncentiveReward {
    rewardToken: Token;
    totalReward: FixedPointNumber;
    withdrawnReward: FixedPointNumber;
    claimableReward: FixedPointNumber;
}
export interface UserIncentiveReward {
    rewardToken: Token;
    withdrawnReward: FixedPointNumber;
    claimableReward: FixedPointNumber;
    claimableRewardWithDeduction: FixedPointNumber;
}
export type IncentiveRewardTokensConfigs = Record<string, {
    token: Token;
    amount: FixedPointNumber;
}[]>;
export interface RewardAPR {
    apr: number;
    aprWithDeduction: number;
    apy: number;
}
export interface BaseIncentivePool {
    type: IncentiveType;
    id: string;
    raw: ModuleSupportIncentivesPoolId;
    collateral: Token;
    totalShares: FixedPointNumber;
    rewards: IncentiveReward[];
}
export interface IncentivePool extends BaseIncentivePool {
    enable: boolean;
    deductionRate: FixedPointNumber;
    savingRate?: FixedPointNumber;
    rewardTokensConfig: {
        token: Token;
        amount: FixedPointNumber;
    }[];
    endBlockNumber: number;
    apr?: RewardAPR;
}
export interface UserIncentivePool {
    shares: FixedPointNumber;
    rewards: UserIncentiveReward[];
    pool: IncentivePool;
}
