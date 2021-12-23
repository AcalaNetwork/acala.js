// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

import type { Balance, BlockNumber } from '@acala-network/types/interfaces/runtime';
import type { Enum, Struct } from '@polkadot/types-codec';
import type { ITuple } from '@polkadot/types-codec/types';

/** @name BalanceRequest */
export interface BalanceRequest extends Struct {
  readonly amount: Balance;
}

/** @name BalanceWrapper */
export interface BalanceWrapper extends Struct {
  readonly amount: Balance;
}

/** @name TradingPairProvisionParameters */
export interface TradingPairProvisionParameters extends Struct {
  readonly minContribution: ITuple<[Balance, Balance]>;
  readonly targetProvision: ITuple<[Balance, Balance]>;
  readonly accumulatedProvision: ITuple<[Balance, Balance]>;
  readonly notBefore: BlockNumber;
}

/** @name TradingPairStatus */
export interface TradingPairStatus extends Enum {
  readonly isDisabled: boolean;
  readonly isProvisioning: boolean;
  readonly asProvisioning: TradingPairProvisionParameters;
  readonly isEnabled: boolean;
  readonly type: 'Disabled' | 'Provisioning' | 'Enabled';
}

export type PHANTOM_DEX = 'dex';
