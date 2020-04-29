// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

import { Enum } from '@polkadot/types/codec';

/** @name LiquidationStrategy */
export interface LiquidationStrategy extends Enum {
  readonly isAuction: boolean;
  readonly isExchange: boolean;
}

export type PHANTOM_CDPENGINE = 'cdpEngine';
