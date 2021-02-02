// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

import type { Bytes, Option, Struct, U128, bool, u32 } from '@polkadot/types';
import type { Balance, H160, H256, Index } from '@acala-network/types/interfaces/runtime';

/** @name CallRequest */
export interface CallRequest extends Struct {
  readonly from: Option<H160>;
  readonly to: Option<H160>;
  readonly gasLimit: Option<u32>;
  readonly storageLimit: Option<u32>;
  readonly value: Option<U128>;
  readonly data: Option<Bytes>;
}

/** @name CodeInfo */
export interface CodeInfo extends Struct {
  readonly codeSize: u32;
  readonly refCount: u32;
}

/** @name EvmAccountInfo */
export interface EvmAccountInfo extends Struct {
  readonly nonce: Index;
  readonly contractInfo: Option<EvmContractInfo>;
  readonly developerDeposit: Option<Balance>;
}

/** @name EvmAddress */
export interface EvmAddress extends H160 {}

/** @name EvmContractInfo */
export interface EvmContractInfo extends Struct {
  readonly codeHash: H256;
  readonly maintainer: H160;
  readonly deployed: bool;
}

export type PHANTOM_EVM = 'evm';
