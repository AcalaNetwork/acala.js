// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

import type { Enum } from '@polkadot/types';
import type { CurrencyId } from '@acala-network/types/interfaces/primitives';
import type { AccountId } from '@acala-network/types/interfaces/runtime';

/** @name PoolId */
export interface PoolId extends Enum {
  readonly isLoansIncentive: boolean;
  readonly asLoansIncentive: CurrencyId;
  readonly isDexIncentive: boolean;
  readonly asDexIncentive: CurrencyId;
  readonly isDexSaving: boolean;
  readonly asDexSaving: CurrencyId;
  readonly isHomaIncentive: boolean;
  readonly isHomaValidatorAllowance: boolean;
  readonly asHomaValidatorAllowance: AccountId;
}

export type PHANTOM_INCENTIVES = 'incentives';
