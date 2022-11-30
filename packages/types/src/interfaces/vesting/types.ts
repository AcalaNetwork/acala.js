// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

import type { Balance, BlockNumber } from '@acala-network/types/interfaces/runtime';
import type { Compact, Struct, u32 } from '@polkadot/types-codec';

/** @name OrmlVestingSchedule */
export interface OrmlVestingSchedule extends Struct {
  readonly start: BlockNumber;
  readonly period: BlockNumber;
  readonly periodCount: u32;
  readonly perPeriod: Compact<Balance>;
}

/** @name VestingScheduleOf */
export interface VestingScheduleOf extends OrmlVestingSchedule {}

export type PHANTOM_VESTING = 'vesting';
