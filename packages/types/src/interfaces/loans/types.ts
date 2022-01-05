// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

import type { Balance } from '@acala-network/types/interfaces/runtime';
import type { Struct } from '@polkadot/types-codec';

/** @name Position */
export interface Position extends Struct {
  readonly collateral: Balance;
  readonly debit: Balance;
}

export type PHANTOM_LOANS = 'loans';
