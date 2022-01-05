// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

import type { H160, H256, Index } from '@acala-network/types/interfaces/runtime';
import type { Bytes, Option, Struct, U128, bool, i32, u256, u32, u8 } from '@polkadot/types-codec';

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

/** @name Erc20Info */
export interface Erc20Info extends Struct {
  readonly address: EvmAddress;
  readonly name: Bytes;
  readonly symbol: Bytes;
  readonly decimals: u8;
}

/** @name EstimateResourcesResponse */
export interface EstimateResourcesResponse extends Struct {
  readonly gas: u256;
  readonly storage: i32;
  readonly weightFee: u256;
}

/** @name EvmAccountInfo */
export interface EvmAccountInfo extends Struct {
  readonly nonce: Index;
  readonly contractInfo: Option<EvmContractInfo>;
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
