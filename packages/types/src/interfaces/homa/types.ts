// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

import type { Balance } from '@acala-network/types/interfaces/runtime';
import type { Compact, Struct, Vec } from '@polkadot/types-codec';
import type { EraIndex, UnlockChunk } from '@polkadot/types/interfaces/staking';

/** @name AcalaStakingLedge */
export interface AcalaStakingLedge extends Struct {
  readonly bonded: Compact<Balance>;
  readonly unlocking: Vec<UnlockChunk>;
}

/** @name AcalaUnlockChunk */
export interface AcalaUnlockChunk extends Struct {
  readonly value: Compact<Balance>;
  readonly era: Compact<EraIndex>;
}

export type PHANTOM_HOMA = 'homa';
