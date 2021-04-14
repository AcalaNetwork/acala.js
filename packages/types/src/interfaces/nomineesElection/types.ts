// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

import type { Struct, Vec } from '@polkadot/types';
import type { Balance } from '@acala-network/types/interfaces/runtime';
import type { EraIndex, UnlockChunk } from '@polkadot/types/interfaces/staking';

/** @name BondingLedger */
export interface BondingLedger extends Struct {
  readonly total: Balance;
  readonly active: Balance;
  readonly unlocking: Vec<UnlockChunk>;
}

/** @name HomaUnlockChunk */
export interface HomaUnlockChunk extends Struct {
  readonly value: Balance;
  readonly era: EraIndex;
}

export type PHANTOM_NOMINEESELECTION = 'nomineesElection';
