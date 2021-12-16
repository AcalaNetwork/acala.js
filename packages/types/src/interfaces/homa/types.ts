// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

import type { Enum } from '@polkadot/types';
import type { EraIndex } from '@polkadot/types/interfaces/staking';

/** @name RedeemStrategy */
export interface RedeemStrategy extends Enum {
  readonly isImmediately: boolean;
  readonly isTarget: boolean;
  readonly asTarget: EraIndex;
  readonly isWaitForUnbonding: boolean;
  readonly type: 'Immediately' | 'Target' | 'WaitForUnbonding';
}

export type PHANTOM_HOMA = 'homa';
