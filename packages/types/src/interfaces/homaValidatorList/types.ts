// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

import type { Struct } from '@polkadot/types';
import type { AccountId, Balance } from '@acala-network/types/interfaces/runtime';

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
  readonly isFrozen: Boolean;
}

export type PHANTOM_HOMAVALIDATORLIST = 'homaValidatorList';
