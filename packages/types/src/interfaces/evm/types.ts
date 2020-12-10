// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

import type { Bytes, Enum, Option, Struct, Text, U128, u32 } from '@polkadot/types';
import type { Balance, H160, H256, Index } from '@acala-network/types/interfaces/runtime';

/** @name CallRequest */
export interface CallRequest extends Struct {
  readonly from: Option<H160>;
  readonly to: Option<H160>;
  readonly gasLimit: Option<u32>;
  readonly value: Option<U128>;
  readonly data: Option<Bytes>;
}

/** @name CodeInfo */
export interface CodeInfo extends Struct {
  readonly codeSize: u32;
  readonly refCount: u32;
}

/** @name ContractInfo */
export interface ContractInfo extends Struct {
  readonly storageCount: u32;
  readonly codeHash: H256;
  readonly existentialDeposit: Balance;
  readonly maintainer: H160;
}

/** @name EvmAccountInfo */
export interface EvmAccountInfo extends Struct {
  readonly nonce: Index;
  readonly contractInfo: Option<ContractInfo>;
  readonly storageRentDeposit: Balance;
  readonly storageQuota: u32;
  readonly storageUsage: u32;
}

/** @name EvmAddress */
export interface EvmAddress extends H160 {}

/** @name ExitError */
export interface ExitError extends Enum {
  readonly isStackUnderflow: boolean;
  readonly isStackOverflow: boolean;
  readonly isInvalidJump: boolean;
  readonly isInvalidRange: boolean;
  readonly isDesignatedInvalid: boolean;
  readonly isCallTooDeep: boolean;
  readonly isCreateCollision: boolean;
  readonly isCreateContractLimit: boolean;
  readonly isOutOfOffset: boolean;
  readonly isOutOfGas: boolean;
  readonly isOutOfFund: boolean;
  readonly isPcUnderflow: boolean;
  readonly isCreateEmpty: boolean;
  readonly isOther: boolean;
  readonly asOther: Text;
}

/** @name ExitFatal */
export interface ExitFatal extends Enum {
  readonly isNotSupported: boolean;
  readonly isUnhandledInterrupt: boolean;
  readonly isCallErrorAsFatal: boolean;
  readonly asCallErrorAsFatal: ExitError;
  readonly isOther: boolean;
  readonly asOther: Text;
}

/** @name ExitReason */
export interface ExitReason extends Enum {
  readonly isSucceed: boolean;
  readonly asSucceed: ExitSucceed;
  readonly isError: boolean;
  readonly asError: ExitError;
  readonly isRevert: boolean;
  readonly asRevert: ExitRevert;
  readonly isFatal: boolean;
  readonly asFatal: ExitFatal;
}

/** @name ExitRevert */
export interface ExitRevert extends Enum {
  readonly isReverted: boolean;
}

/** @name ExitSucceed */
export interface ExitSucceed extends Enum {
  readonly isStopped: boolean;
  readonly isReturned: boolean;
  readonly isSuicided: boolean;
}

export type PHANTOM_EVM = 'evm';
