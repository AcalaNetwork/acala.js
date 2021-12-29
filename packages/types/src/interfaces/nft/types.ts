// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

import type { AccountId, Balance } from '@acala-network/types/interfaces/runtime';
import type { BTreeMap, Bytes, Set, Struct, u128, u32, u64 } from '@polkadot/types-codec';
import type { ClassId } from '@polkadot/types/interfaces/uniques';

/** @name Attributes */
export interface Attributes extends BTreeMap<Bytes, Bytes> {}

/** @name CID */
export interface CID extends Bytes {}

/** @name ClassData */
export interface ClassData extends Struct {
  readonly deposit: Balance;
  readonly properties: Properties;
  readonly attributes: Attributes;
}

/** @name ClassIdOf */
export interface ClassIdOf extends ClassId {}

/** @name ClassInfoOf */
export interface ClassInfoOf extends Struct {
  readonly metadata: CID;
  readonly totalIssuance: TokenId;
  readonly owner: AccountId;
  readonly data: ClassData;
}

/** @name NFTBalance */
export interface NFTBalance extends u128 {}

/** @name NFTBalanceOf */
export interface NFTBalanceOf extends NFTBalance {}

/** @name NFTClassId */
export interface NFTClassId extends u32 {}

/** @name Properties */
export interface Properties extends Set {
  readonly isTransferable: boolean;
  readonly isBurnable: boolean;
  readonly isMintable: boolean;
  readonly isClassPropertiesMutable: boolean;
}

/** @name TokenData */
export interface TokenData extends Struct {
  readonly deposit: Balance;
  readonly attributes: Attributes;
}

/** @name TokenId */
export interface TokenId extends u64 {}

/** @name TokenIdOf */
export interface TokenIdOf extends TokenId {}

/** @name TokenInfoOf */
export interface TokenInfoOf extends Struct {
  readonly metadata: CID;
  readonly owner: AccountId;
  readonly data: TokenData;
}

export type PHANTOM_NFT = 'nft';
