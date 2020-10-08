// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

import { Set, Struct } from '@polkadot/types/codec';
import { Bytes, u64 } from '@polkadot/types/primitive';
import { AccountId, Balance } from '@acala-network/types/interfaces/runtime';

/** @name CID */
export interface CID extends Bytes {}

/** @name ClassData */
export interface ClassData extends Struct {
  readonly deposit: Balance;
  readonly properties: Properties;
}

/** @name ClassId */
export interface ClassId extends u64 {}

/** @name ClassInfoOf */
export interface ClassInfoOf extends Struct {
  readonly metadata: CID;
  readonly totalIssuance: TokenId;
  readonly owner: AccountId;
  readonly data: ClassData;
}

/** @name Properties */
export interface Properties extends Set {
  readonly isTransferable: boolean;
  readonly isBurnable: boolean;
}

/** @name TokenData */
export interface TokenData extends Struct {
  readonly deposit: Balance;
}

/** @name TokenId */
export interface TokenId extends u64 {}

/** @name TokenInfoOf */
export interface TokenInfoOf extends Struct {
  readonly metadata: CID;
  readonly owner: AccountId;
  readonly data: TokenData;
}

export type PHANTOM_NFT = 'nft';
