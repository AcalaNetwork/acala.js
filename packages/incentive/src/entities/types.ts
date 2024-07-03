import { Observable } from "rxjs";

// the incentive type supported by acala network
export enum IncentiveType {
  Loans = 'LOANS',
  Dex = 'DEX',
  Earning = 'EARNING'
}

// interface for share
export type Share = bigint;

// interface for reward
export interface Reward {
  // the reward token
  token: string;
  // the accumulated reward amount
  accumulated: bigint;
  // the withdrawn reward amount
  withdrawn: bigint;
  // the available reward amount
  claimable: bigint;
}

export interface RewardWithDeduction extends Reward {
  // the deduction amount if claim the reward before the deduction end block
  deductioned: bigint;
  // claimable amount after deduction
  claimableAfterDeduction: bigint;
}

// interface for reward config
export interface RewardConfig {
  // the reward token
  token: string;
  // the reward amount
  amount: bigint;
  // period interval
  period: number;
}

// interface for the deduction config
export interface DeductionConfig {
  // the deduction token
  token: string;
  // the deduction rate
  rate: number;
  // the deduction end block
  endBlock: bigint | null;
}

// the helper function to query the deduction block
export type QueryDeductionBlockFN = (id: string) => Promise<bigint | null>;

// the incentive pools interface
export interface IncentivePools {
  // the pools
  poolIds(): Promise<string[]>
  // get the pool ids by type
  poolIdsByType(type: IncentiveType): Promise<string[]>;
  // get the pool entity by id
  pool(id: string): IncentivePool;
}

// the incentive pool interface
export interface IncentivePool {
  // the hex string of the pool id
  id: string;
  // the type of the pool
  type: IncentiveType;
  // the token of the pool
  token: string;
  // the enable status of the pool
  enable(): Promise<boolean>;
  // the total share of the pool
  totalShare(): Promise<Share>;
  // subscribe the share of the pool
  get totalShare$(): Observable<Share>;
  // the total reward of the pool
  totalRewards(): Promise<Reward[]>;
  // subscribe the total reward of the pool
  get totalReward$(): Observable<Reward[]>;
  // the reward config of the pool
  rewardConfig(): Promise<RewardConfig[]>;
  // the deduction info of the pool
  deductionConfig(): Promise<DeductionConfig[] | null>;
  // user pool
  user(account: string): IncentiveType extends IncentiveType.Earning ? ACAStakingUserPool : UserIncentivePool;
}

// the user incentive pool interface
export interface UserIncentivePool {
  // the hex string of the pool id
  pool: IncentivePool;
  // the user account
  account: string;
  // the share of the user
  share(): Promise<Share>;
  // subscribe the share of the user
  get share$(): Observable<Share>;
  // the reward of the user
  rewards(): Promise<RewardWithDeduction[]>;
  // subscribe the reward of the user
  get rewards$(): Observable<RewardWithDeduction[]>;
}

// the acala staking ledger
export interface ACAStakingLedger {
  total: bigint;
  active: bigint;
  unlocking: { amount: bigint, at: bigint }[];
}

// the acala staking pool
export interface ACAStakingUserPool extends UserIncentivePool {
  ledger(): Promise<ACAStakingLedger | null>;
  get ledger$(): Observable<ACAStakingLedger | null>;
}