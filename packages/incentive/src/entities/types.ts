import { Observable } from "rxjs";

// the incentive type supported by acala network
export enum IncentiveType {
  Loans = 'LOANS',
  Dex= 'DEX',
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
  available: bigint;
}

export interface RewardWithDeduction extends Reward {
  // the deduction amount if claim the reward before the deduction end block
  deductioned: bigint;
  // claimable amount
  claimable: bigint;
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
  share(): Promise<Share>;
  // the total reward of the pool
  rewards(): Promise<Reward[]>;
  // the reward config of the pool
  rewardConfig(): Promise<RewardConfig[]>;
  // the deduction info of the pool
  deductionConfig(): Promise<DeductionConfig[] | null>;
  // subscribe the share of the pool
  share$(): Observable<Share>;
  reward$(): Observable<Reward>;
}

// the incentive pools interface
export interface IncentivePools {
  // the pools
  pools(): Promise<string[]>
  // the pool by id
  pool(id: string): IncentivePool;
}

// the user share pool interface
export interface UserSharePool {
  // the pool id
  poolId: string;
  // user account
  account: string;
  // the share of the pool
  share: Promise<Share>;
  // the reward of the pool
  rewards: Promise<RewardWithDeduction[]>;
}
