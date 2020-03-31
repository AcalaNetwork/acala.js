// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

import { Enum } from '@polkadot/types/codec';
import { u8 } from '@polkadot/types/primitive';
import { EraIndex } from '@polkadot/types/interfaces/staking';

/** @name RedeemStrategy */
export interface RedeemStrategy extends Enum {
  readonly isImmedately: boolean;
  readonly asImmedately: u8;
  readonly isTarget: boolean;
  readonly asTarget: EraIndex;
  readonly isWaitForUnbonding: boolean;
  readonly asWaitForUnbonding: u8;
}

export type PHANTOM_HOMA = 'homa';
