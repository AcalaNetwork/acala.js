// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

import type { AccountId, Balance, BlockNumber } from '@acala-network/types/interfaces/runtime';
import type { Option, Struct, bool } from '@polkadot/types-codec';
import type { ITuple } from '@polkadot/types-codec/types';

/** @name Guarantee */
export interface Guarantee extends Struct {
  readonly total: Balance;
  readonly bonded: Balance;
  readonly unbonding: Option<ITuple<[Balance, BlockNumber]>>;
}

/** @name RelaychainAccountId */
export interface RelaychainAccountId extends AccountId {}

/** @name SlashInfo */
export interface SlashInfo extends Struct {
  readonly validator: RelaychainAccountId;
  readonly relaychainTokenAmount: Balance;
}

/** @name ValidatorBacking */
export interface ValidatorBacking extends Struct {
  readonly totalInsurance: Balance;
  readonly isFrozen: bool;
}

export type PHANTOM_HOMAVALIDATORLIST = 'homaValidatorList';
