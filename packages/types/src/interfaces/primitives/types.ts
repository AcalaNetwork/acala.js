// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

import { Enum } from '@polkadot/types/codec';

/** @name AirDropCurrencyId */
export interface AirDropCurrencyId extends Enum {
  readonly isKar: boolean;
  readonly isAca: boolean;
}

/** @name CurrencyId */
export interface CurrencyId extends Enum {
  readonly isAca: boolean;
  readonly isAusd: boolean;
  readonly isDot: boolean;
  readonly isXbtc: boolean;
  readonly isLdot: boolean;
  readonly isRenbtc: boolean;
}

export type PHANTOM_PRIMITIVES = 'primitives';
