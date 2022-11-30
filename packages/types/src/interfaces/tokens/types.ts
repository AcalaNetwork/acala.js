// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

import type { Balance, LockIdentifier } from '@acala-network/types/interfaces/runtime';
import type { Struct } from '@polkadot/types-codec';

/** @name OrmlAccountData */
export interface OrmlAccountData extends Struct {
  readonly free: Balance;
  readonly reserved: Balance;
  readonly frozen: Balance;
}

/** @name OrmlBalanceLock */
export interface OrmlBalanceLock extends Struct {
  readonly amount: Balance;
  readonly id: LockIdentifier;
}

export type PHANTOM_TOKENS = 'tokens';
