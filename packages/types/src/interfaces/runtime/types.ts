// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

import { ITuple } from '@polkadot/types/types';
import { Compact, Enum, Int, Option, Struct, U8aFixed, Vec } from '@polkadot/types/codec';
import { GenericAccountId, GenericAccountIndex, GenericAddress, GenericBlock, GenericCall, GenericConsensusEngineId, GenericDigest, GenericOrigin } from '@polkadot/types/generic';
import { Bytes, Null, StorageKey, bool, i128, u128, u32, u64, u8 } from '@polkadot/types/primitive';
import { CurrencyId } from '@acala-network/types/interfaces/primitives';
import { Price } from '@orml/types/interfaces/prices';
import { AuthorityId } from '@polkadot/types/interfaces/consensus';
import { Signature } from '@polkadot/types/interfaces/extrinsics';

/** @name AccountId */
export interface AccountId extends GenericAccountId {}

/** @name AccountIdOf */
export interface AccountIdOf extends AccountId {}

/** @name AccountIndex */
export interface AccountIndex extends GenericAccountIndex {}

/** @name Address */
export interface Address extends GenericAddress {}

/** @name Amount */
export interface Amount extends i128 {}

/** @name AmountOf */
export interface AmountOf extends Amount {}

/** @name AssetId */
export interface AssetId extends u32 {}

/** @name AuctionId */
export interface AuctionId extends u32 {}

/** @name AuctionIdLinkedItem */
export interface AuctionIdLinkedItem extends Struct {
  readonly prev: Option<AuctionId>;
  readonly next: Option<AuctionId>;
}

/** @name AuctionIdOf */
export interface AuctionIdOf extends AuctionId {}

/** @name AuctionItem */
export interface AuctionItem extends Struct {
  readonly owner: AccountId;
  readonly currencyId: CurrencyId;
  readonly amount: Balance;
  readonly target: Balance;
  readonly startTime: BlockNumber;
}

/** @name Balance */
export interface Balance extends u128 {}

/** @name BalanceOf */
export interface BalanceOf extends Balance {}

/** @name Block */
export interface Block extends GenericBlock {}

/** @name BlockNumber */
export interface BlockNumber extends u32 {}

/** @name Call */
export interface Call extends GenericCall {}

/** @name ChangesTrieConfiguration */
export interface ChangesTrieConfiguration extends Struct {
  readonly digestInterval: u32;
  readonly digestLevels: u32;
}

/** @name Consensus */
export interface Consensus extends ITuple<[ConsensusEngineId, Bytes]> {}

/** @name ConsensusEngineId */
export interface ConsensusEngineId extends GenericConsensusEngineId {}

/** @name CurrencyIdOf */
export interface CurrencyIdOf extends CurrencyId {}

/** @name DebitAmount */
export interface DebitAmount extends Amount {}

/** @name DebitAmountOf */
export interface DebitAmountOf extends DebitAmount {}

/** @name DebitBalance */
export interface DebitBalance extends Balance {}

/** @name DebitBalanceOf */
export interface DebitBalanceOf extends Balance {}

/** @name Digest */
export interface Digest extends GenericDigest {}

/** @name DigestItem */
export interface DigestItem extends Enum {
  readonly isOther: boolean;
  readonly asOther: Bytes;
  readonly isAuthoritiesChange: boolean;
  readonly asAuthoritiesChange: Vec<AuthorityId>;
  readonly isChangesTrieRoot: boolean;
  readonly asChangesTrieRoot: Hash;
  readonly isSealV0: boolean;
  readonly asSealV0: SealV0;
  readonly isConsensus: boolean;
  readonly asConsensus: Consensus;
  readonly isSeal: boolean;
  readonly asSeal: Seal;
  readonly isPreRuntime: boolean;
  readonly asPreRuntime: PreRuntime;
}

/** @name DispatchClass */
export interface DispatchClass extends Enum {
  readonly isNormal: boolean;
  readonly isOperational: boolean;
}

/** @name DispatchInfo */
export interface DispatchInfo extends Struct {
  readonly weight: Weight;
  readonly class: DispatchClass;
  readonly paysFee: bool;
}

/** @name DispatchInfoTo190 */
export interface DispatchInfoTo190 extends Struct {
  readonly weight: Weight;
  readonly class: DispatchClass;
}

/** @name Fixed64 */
export interface Fixed64 extends Int {}

/** @name H160 */
export interface H160 extends U8aFixed {}

/** @name H256 */
export interface H256 extends U8aFixed {}

/** @name H512 */
export interface H512 extends U8aFixed {}

/** @name Hash */
export interface Hash extends H256 {}

/** @name Header */
export interface Header extends Struct {
  readonly parentHash: Hash;
  readonly number: Compact<BlockNumber>;
  readonly stateRoot: Hash;
  readonly extrinsicsRoot: Hash;
  readonly digest: Digest;
}

/** @name Index */
export interface Index extends u32 {}

/** @name Justification */
export interface Justification extends Bytes {}

/** @name KeyTypeId */
export interface KeyTypeId extends u32 {}

/** @name KeyValue */
export interface KeyValue extends ITuple<[StorageKey, StorageData]> {}

/** @name LockIdentifier */
export interface LockIdentifier extends U8aFixed {}

/** @name LookupSource */
export interface LookupSource extends Address {}

/** @name LookupTarget */
export interface LookupTarget extends AccountId {}

/** @name Moment */
export interface Moment extends u64 {}

/** @name OracleKey */
export interface OracleKey extends CurrencyId {}

/** @name OracleValue */
export interface OracleValue extends Price {}

/** @name Origin */
export interface Origin extends GenericOrigin {}

/** @name Perbill */
export interface Perbill extends u32 {}

/** @name Percent */
export interface Percent extends u8 {}

/** @name Permill */
export interface Permill extends u32 {}

/** @name Perquintill */
export interface Perquintill extends u64 {}

/** @name Phantom */
export interface Phantom extends Null {}

/** @name PhantomData */
export interface PhantomData extends Null {}

/** @name PreRuntime */
export interface PreRuntime extends ITuple<[ConsensusEngineId, Bytes]> {}

/** @name Seal */
export interface Seal extends ITuple<[ConsensusEngineId, Bytes]> {}

/** @name SealV0 */
export interface SealV0 extends ITuple<[u64, Signature]> {}

/** @name Share */
export interface Share extends u128 {}

/** @name SignedBlock */
export interface SignedBlock extends Struct {
  readonly block: Block;
  readonly justification: Justification;
}

/** @name StorageData */
export interface StorageData extends Bytes {}

/** @name ValidatorId */
export interface ValidatorId extends AccountId {}

/** @name Weight */
export interface Weight extends u32 {}

/** @name WeightMultiplier */
export interface WeightMultiplier extends Fixed64 {}

export type PHANTOM_RUNTIME = 'runtime';
