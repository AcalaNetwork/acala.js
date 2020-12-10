// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

import type { Enum } from '@polkadot/types';
import type { CurrencyId } from '@acala-network/types/interfaces/primitives';

/** @name PoolId */
export interface PoolId extends Enum {
  readonly isLoans: boolean;
  readonly asLoans: CurrencyId;
  readonly isDexIncentive: boolean;
  readonly asDexIncentive: CurrencyId;
  readonly isDexSaving: boolean;
  readonly asDexSaving: CurrencyId;
  readonly isHoma: boolean;
}

export type PHANTOM_INCENTIVES = 'incentives';
