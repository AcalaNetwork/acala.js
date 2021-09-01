// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

import type { Enum, Struct, Vec, u128, u64 } from '@polkadot/types';
import type { ITuple } from '@polkadot/types/types';
import type { CurrencyId } from '@acala-network/types/interfaces/primitives';
import type { AccountId, Balance, Moment } from '@acala-network/types/interfaces/runtime';

/** @name CashYieldIndex */
export interface CashYieldIndex extends u128 {}

/** @name CompoundAuthoritySignature */
export interface CompoundAuthoritySignature extends AccountId {}

/** @name GatewayNotice */
export interface GatewayNotice extends Struct {
  readonly id: u64;
  readonly payload: GatewayNoticePayload;
}

/** @name GatewayNoticePayload */
export interface GatewayNoticePayload extends Enum {
  readonly isSetSupplyCap: boolean;
  readonly asSetSupplyCap: ITuple<[CurrencyId, Balance]>;
  readonly isChangeAuthorities: boolean;
  readonly asChangeAuthorities: Vec<CompoundAuthoritySignature>;
  readonly isUnlock: boolean;
  readonly asUnlock: ITuple<[CurrencyId, Balance, AccountId]>;
  readonly isSetFutureYield: boolean;
  readonly asSetFutureYield: ITuple<[Balance, CashYieldIndex, Moment]>;
}

export type PHANTOM_COMPOUNDCASH = 'compoundCash';
