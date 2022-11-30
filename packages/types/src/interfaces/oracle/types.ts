// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

import type { AccountId, Moment, OracleValue } from '@acala-network/types/interfaces/runtime';
import type { Struct, Text, Vec, u8 } from '@polkadot/types-codec';

/** @name DataProviderId */
export interface DataProviderId extends u8 {}

/** @name OrderedSet */
export interface OrderedSet extends Vec<AccountId> {}

/** @name RpcDataProviderId */
export interface RpcDataProviderId extends Text {}

/** @name TimestampedValue */
export interface TimestampedValue extends Struct {
  readonly value: OracleValue;
  readonly timestamp: Moment;
}

/** @name TimestampedValueOf */
export interface TimestampedValueOf extends TimestampedValue {}

export type PHANTOM_ORACLE = 'oracle';
