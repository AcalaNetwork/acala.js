// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

import { ITuple } from '@polkadot/types/types';
import { Enum, Struct, Vec } from '@polkadot/types/codec';
import { AccountId, Balance } from '@acala-network/types/interfaces/runtime';
import { Rate, Ratio } from '@acala-network/types/interfaces/support';
import { EraIndex } from '@polkadot/types/interfaces/staking';

/** @name BalanceInfo */
export interface BalanceInfo extends Struct {
  readonly amount: Balance;
}

/** @name ChangeRate */
export interface ChangeRate extends Enum {
  readonly isNoChange: boolean;
  readonly isNewValue: boolean;
  readonly asNewValue: Rate;
}

/** @name ChangeRatio */
export interface ChangeRatio extends Enum {
  readonly isNoChange: boolean;
  readonly isNewValue: boolean;
  readonly asNewValue: Ratio;
}

/** @name Params */
export interface Params extends Struct {
  readonly targetMaxFreeUnbondedRatio: Ratio;
  readonly targetMinFreeUnbondedRatio: Ratio;
  readonly targetUnbondingToFreeRatio: Ratio;
  readonly unbondingToFreeAdjustment: Ratio;
  readonly baseFeeRate: Rate;
}

/** @name PolkadotAccountId */
export interface PolkadotAccountId extends AccountId {}

/** @name PolkadotAccountIdOf */
export interface PolkadotAccountIdOf extends PolkadotAccountId {}

/** @name SubAccountStatus */
export interface SubAccountStatus extends Struct {
  readonly bonded: Balance;
  readonly available: Balance;
  readonly unbonding: Vec<ITuple<[EraIndex, Balance]>>;
  readonly mockRewardRate: Rate;
}

export type PHANTOM_STAKINGPOOL = 'stakingPool';
