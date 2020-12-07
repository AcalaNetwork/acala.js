// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

import { ITuple } from '@polkadot/types/types';
import { Enum, Struct } from '@polkadot/types/codec';
import { Balance, BlockNumber } from '@acala-network/types/interfaces/runtime';

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
  readonly isNotEnabled: boolean;
  readonly isEnabled: boolean;
  readonly isProvisioning: boolean;
  readonly asProvisioning: TradingPairProvisionParameters;
}

export type PHANTOM_DEX = 'dex';
