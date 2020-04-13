// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

import { Struct } from '@polkadot/types/codec';
import { AccountId, Balance } from '@acala-network/types/interfaces/runtime';

/** @name BalanceInfo */
export interface BalanceInfo extends Struct {
  readonly amount: Balance;
}

/** @name LiquidBalance */
export interface LiquidBalance extends Balance {}

/** @name LiquidBalanceOf */
export interface LiquidBalanceOf extends LiquidBalance {}

/** @name PolkadotAccountId */
export interface PolkadotAccountId extends AccountId {}

/** @name PolkadotAccountIdOf */
export interface PolkadotAccountIdOf extends PolkadotAccountId {}

/** @name StakingBalance */
export interface StakingBalance extends Balance {}

/** @name StakingBalanceOf */
export interface StakingBalanceOf extends StakingBalance {}

export type PHANTOM_STAKINGPOOL = 'stakingPool';
