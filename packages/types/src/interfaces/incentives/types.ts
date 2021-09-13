// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

import type { Enum } from '@polkadot/types';
import type { CurrencyId } from '@acala-network/types/interfaces/primitives';

/** @name PoolId */
export interface PoolId extends Enum {
  readonly isLoans: boolean;
  readonly asLoans: CurrencyId;
  readonly isDex: boolean;
  readonly asDex: CurrencyId;
}

export type PHANTOM_INCENTIVES = 'incentives';
