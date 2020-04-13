// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

import { Struct } from '@polkadot/types/codec';
import { Balance } from '@acala-network/types/interfaces/runtime';

/** @name BalanceRequest */
export interface BalanceRequest extends Struct {
  readonly amount: Balance;
}

/** @name BalanceWrapper */
export interface BalanceWrapper extends Struct {
  readonly amount: Balance;
}

export type PHANTOM_DEX = 'dex';
