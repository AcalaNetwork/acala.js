import { FixedPointNumber, Token } from '@acala-network/sdk-core';

export interface VestingData {
  token: Token;
  // total vesting reward amount
  total: FixedPointNumber;
  // claimed reward amount
  claimed: FixedPointNumber;
  // remaining reward amount
  remaining: FixedPointNumber;
  // available claim reward amount
  available: FixedPointNumber;
  // the reward amount of each period
  prePeriod: FixedPointNumber;
  // current parachain block number
  parachainBlock: bigint;
  // the reward start block number
  startBlock: bigint;
  // the reward end block number
  endBlock: bigint;
  // period interval
  period: bigint;
  // period count
  periodCount: bigint;
}
