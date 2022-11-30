// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

import type { BlockNumber, Call, PalletsOrigin } from '@acala-network/types/interfaces/runtime';
import type { Enum, Struct, u32 } from '@polkadot/types-codec';

/** @name AuthorityOrigin */
export interface AuthorityOrigin extends DelayedOrigin {}

/** @name CallOf */
export interface CallOf extends Call {}

/** @name DelayedOrigin */
export interface DelayedOrigin extends Struct {
  readonly delay: BlockNumber;
  readonly origin: PalletsOrigin;
}

/** @name DispatchTime */
export interface DispatchTime extends Enum {
  readonly isAt: boolean;
  readonly asAt: BlockNumber;
  readonly isAfter: boolean;
  readonly asAfter: BlockNumber;
  readonly type: 'At' | 'After';
}

/** @name ScheduleTaskIndex */
export interface ScheduleTaskIndex extends u32 {}

export type PHANTOM_AUTHORITY = 'authority';
