// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

import { Enum } from '@polkadot/types/codec';
import { EraIndex } from '@polkadot/types/interfaces/staking';

/** @name RedeemStrategy */
export interface RedeemStrategy extends Enum {
  readonly isImmediately: boolean;
  readonly isTarget: boolean;
  readonly asTarget: EraIndex;
  readonly isWaitForUnbonding: boolean;
}

export type PHANTOM_HOMA = 'homa';
