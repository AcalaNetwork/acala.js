// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

import type { AccountId, Balance } from '@acala-network/types/interfaces/runtime';
import type { Rate, Ratio } from '@acala-network/types/interfaces/support';
import type { Enum, Struct, Vec } from '@polkadot/types-codec';
import type { ITuple } from '@polkadot/types-codec/types';
import type { EraIndex } from '@polkadot/types/interfaces/staking';

/** @name BalanceInfo */
export interface BalanceInfo extends Struct {
  readonly amount: Balance;
}

/** @name ChangeRate */
export interface ChangeRate extends Enum {
  readonly isNoChange: boolean;
  readonly isNewValue: boolean;
  readonly asNewValue: Rate;
  readonly type: 'NoChange' | 'NewValue';
}

/** @name ChangeRatio */
export interface ChangeRatio extends Enum {
  readonly isNoChange: boolean;
  readonly isNewValue: boolean;
  readonly asNewValue: Ratio;
  readonly type: 'NoChange' | 'NewValue';
}

/** @name Ledger */
export interface Ledger extends Struct {
  readonly bonded: Balance;
  readonly unbondingToFree: Balance;
  readonly freePool: Balance;
  readonly toUnbondNextEra: ITuple<[Balance, Balance]>;
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

/** @name StakingPoolPhase */
export interface StakingPoolPhase extends Enum {
  readonly isStarted: boolean;
  readonly isRelaychainUpdated: boolean;
  readonly isLedgerUpdated: boolean;
  readonly isFinished: boolean;
  readonly type: 'Started' | 'RelaychainUpdated' | 'LedgerUpdated' | 'Finished';
}

/** @name SubAccountStatus */
export interface SubAccountStatus extends Struct {
  readonly bonded: Balance;
  readonly available: Balance;
  readonly unbonding: Vec<ITuple<[EraIndex, Balance]>>;
  readonly mockRewardRate: Rate;
}

export type PHANTOM_STAKINGPOOL = 'stakingPool';
