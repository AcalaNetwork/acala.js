// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

import { Enum, Option, Struct } from '@polkadot/types/codec';
import { Balance } from '@acala-network/types/interfaces/runtime';
import { Rate, Ratio } from '@acala-network/types/interfaces/support';

/** @name ChangeBalance */
export interface ChangeBalance extends Enum {
  readonly isNoChange: boolean;
  readonly isNewValue: boolean;
  readonly asNewValue: Balance;
}

/** @name ChangeOptionRate */
export interface ChangeOptionRate extends Enum {
  readonly isNoChange: boolean;
  readonly isNewValue: boolean;
  readonly asNewValue: OptionRate;
}

/** @name ChangeOptionRatio */
export interface ChangeOptionRatio extends Enum {
  readonly isNoChange: boolean;
  readonly isNewValue: boolean;
  readonly asNewValue: OptionRatio;
}

/** @name LiquidationStrategy */
export interface LiquidationStrategy extends Enum {
  readonly isAuction: boolean;
  readonly isExchange: boolean;
}

/** @name OptionRate */
export interface OptionRate extends Option<Rate> {}

/** @name OptionRatio */
export interface OptionRatio extends Option<Ratio> {}

/** @name RiskManagementParams */
export interface RiskManagementParams extends Struct {
  readonly maximumTotalDebitValue: Balance;
  readonly stabilityFee: Option<Rate>;
  readonly liquidationRatio: Option<Rate>;
  readonly liquidationPenalty: Option<Rate>;
  readonly requiredCollateralRatio: Option<Rate>;
}

export type PHANTOM_CDPENGINE = 'cdpEngine';
