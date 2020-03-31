// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

import { Enum } from '@polkadot/types/codec';

/** @name RedeemStrategy */
export interface RedeemStrategy extends Enum {
  readonly isImmedately: boolean;
  readonly isTarget: boolean;
  readonly isWaitForUnbonding: boolean;
}

export type PHANTOM_HUMA = 'huma';
