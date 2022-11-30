// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

// import type lookup before we augment - in some environments
// this is required to allow for ambient/previous definitions
import '@polkadot/types/lookup';

import type { BTreeMap, BTreeSet, Bytes, Compact, Enum, Null, Option, Result, Struct, Text, U8aFixed, Vec, WrapperKeepOpaque, bool, i128, i32, u128, u16, u32, u64, u8 } from '@polkadot/types-codec';
import type { ITuple } from '@polkadot/types-codec/types';
import type { Vote } from '@polkadot/types/interfaces/elections';
import type { AccountId32, Call, H160, H256, MultiAddress, Perbill } from '@polkadot/types/interfaces/runtime';
import type { Event } from '@polkadot/types/interfaces/system';

declare module '@polkadot/types/lookup' {
  /** @name FrameSystemAccountInfo (3) */
  interface FrameSystemAccountInfo extends Struct {
    readonly nonce: u32;
    readonly consumers: u32;
    readonly providers: u32;
    readonly sufficients: u32;
    readonly data: PalletBalancesAccountData;
  }

  /** @name PalletBalancesAccountData (5) */
  interface PalletBalancesAccountData extends Struct {
    readonly free: u128;
    readonly reserved: u128;
    readonly miscFrozen: u128;
    readonly feeFrozen: u128;
  }

  /** @name FrameSupportWeightsPerDispatchClassU64 (7) */
  interface FrameSupportWeightsPerDispatchClassU64 extends Struct {
    readonly normal: u64;
    readonly operational: u64;
    readonly mandatory: u64;
  }

  /** @name SpRuntimeDigest (11) */
  interface SpRuntimeDigest extends Struct {
    readonly logs: Vec<SpRuntimeDigestDigestItem>;
  }

  /** @name SpRuntimeDigestDigestItem (13) */
  interface SpRuntimeDigestDigestItem extends Enum {
    readonly isOther: boolean;
    readonly asOther: Bytes;
    readonly isConsensus: boolean;
    readonly asConsensus: ITuple<[U8aFixed, Bytes]>;
    readonly isSeal: boolean;
    readonly asSeal: ITuple<[U8aFixed, Bytes]>;
    readonly isPreRuntime: boolean;
    readonly asPreRuntime: ITuple<[U8aFixed, Bytes]>;
    readonly isRuntimeEnvironmentUpdated: boolean;
    readonly type: 'Other' | 'Consensus' | 'Seal' | 'PreRuntime' | 'RuntimeEnvironmentUpdated';
  }

  /** @name FrameSystemEventRecord (16) */
  interface FrameSystemEventRecord extends Struct {
    readonly phase: FrameSystemPhase;
    readonly event: Event;
    readonly topics: Vec<H256>;
  }

  /** @name FrameSystemEvent (18) */
  interface FrameSystemEvent extends Enum {
    readonly isExtrinsicSuccess: boolean;
    readonly asExtrinsicSuccess: {
      readonly dispatchInfo: FrameSupportWeightsDispatchInfo;
    } & Struct;
    readonly isExtrinsicFailed: boolean;
    readonly asExtrinsicFailed: {
      readonly dispatchError: SpRuntimeDispatchError;
      readonly dispatchInfo: FrameSupportWeightsDispatchInfo;
    } & Struct;
    readonly isCodeUpdated: boolean;
    readonly isNewAccount: boolean;
    readonly asNewAccount: {
      readonly account: AccountId32;
    } & Struct;
    readonly isKilledAccount: boolean;
    readonly asKilledAccount: {
      readonly account: AccountId32;
    } & Struct;
    readonly isRemarked: boolean;
    readonly asRemarked: {
      readonly sender: AccountId32;
      readonly hash_: H256;
    } & Struct;
    readonly type: 'ExtrinsicSuccess' | 'ExtrinsicFailed' | 'CodeUpdated' | 'NewAccount' | 'KilledAccount' | 'Remarked';
  }

  /** @name FrameSupportWeightsDispatchInfo (19) */
  interface FrameSupportWeightsDispatchInfo extends Struct {
    readonly weight: u64;
    readonly class: FrameSupportWeightsDispatchClass;
    readonly paysFee: FrameSupportWeightsPays;
  }

  /** @name FrameSupportWeightsDispatchClass (20) */
  interface FrameSupportWeightsDispatchClass extends Enum {
    readonly isNormal: boolean;
    readonly isOperational: boolean;
    readonly isMandatory: boolean;
    readonly type: 'Normal' | 'Operational' | 'Mandatory';
  }

  /** @name FrameSupportWeightsPays (21) */
  interface FrameSupportWeightsPays extends Enum {
    readonly isYes: boolean;
    readonly isNo: boolean;
    readonly type: 'Yes' | 'No';
  }

  /** @name SpRuntimeDispatchError (22) */
  interface SpRuntimeDispatchError extends Enum {
    readonly isOther: boolean;
    readonly isCannotLookup: boolean;
    readonly isBadOrigin: boolean;
    readonly isModule: boolean;
    readonly asModule: SpRuntimeModuleError;
    readonly isConsumerRemaining: boolean;
    readonly isNoProviders: boolean;
    readonly isTooManyConsumers: boolean;
    readonly isToken: boolean;
    readonly asToken: SpRuntimeTokenError;
    readonly isArithmetic: boolean;
    readonly asArithmetic: SpRuntimeArithmeticError;
    readonly isTransactional: boolean;
    readonly asTransactional: SpRuntimeTransactionalError;
    readonly type: 'Other' | 'CannotLookup' | 'BadOrigin' | 'Module' | 'ConsumerRemaining' | 'NoProviders' | 'TooManyConsumers' | 'Token' | 'Arithmetic' | 'Transactional';
  }

  /** @name SpRuntimeModuleError (23) */
  interface SpRuntimeModuleError extends Struct {
    readonly index: u8;
    readonly error: U8aFixed;
  }

  /** @name SpRuntimeTokenError (24) */
  interface SpRuntimeTokenError extends Enum {
    readonly isNoFunds: boolean;
    readonly isWouldDie: boolean;
    readonly isBelowMinimum: boolean;
    readonly isCannotCreate: boolean;
    readonly isUnknownAsset: boolean;
    readonly isFrozen: boolean;
    readonly isUnsupported: boolean;
    readonly type: 'NoFunds' | 'WouldDie' | 'BelowMinimum' | 'CannotCreate' | 'UnknownAsset' | 'Frozen' | 'Unsupported';
  }

  /** @name SpRuntimeArithmeticError (25) */
  interface SpRuntimeArithmeticError extends Enum {
    readonly isUnderflow: boolean;
    readonly isOverflow: boolean;
    readonly isDivisionByZero: boolean;
    readonly type: 'Underflow' | 'Overflow' | 'DivisionByZero';
  }

  /** @name SpRuntimeTransactionalError (26) */
  interface SpRuntimeTransactionalError extends Enum {
    readonly isLimitReached: boolean;
    readonly isNoLayer: boolean;
    readonly type: 'LimitReached' | 'NoLayer';
  }

  /** @name PalletSchedulerEvent (27) */
  interface PalletSchedulerEvent extends Enum {
    readonly isScheduled: boolean;
    readonly asScheduled: {
      readonly when: u32;
      readonly index: u32;
    } & Struct;
    readonly isCanceled: boolean;
    readonly asCanceled: {
      readonly when: u32;
      readonly index: u32;
    } & Struct;
    readonly isDispatched: boolean;
    readonly asDispatched: {
      readonly task: ITuple<[u32, u32]>;
      readonly id: Option<Bytes>;
      readonly result: Result<Null, SpRuntimeDispatchError>;
    } & Struct;
    readonly isCallLookupFailed: boolean;
    readonly asCallLookupFailed: {
      readonly task: ITuple<[u32, u32]>;
      readonly id: Option<Bytes>;
      readonly error: FrameSupportScheduleLookupError;
    } & Struct;
    readonly type: 'Scheduled' | 'Canceled' | 'Dispatched' | 'CallLookupFailed';
  }

  /** @name FrameSupportScheduleLookupError (32) */
  interface FrameSupportScheduleLookupError extends Enum {
    readonly isUnknown: boolean;
    readonly isBadFormat: boolean;
    readonly type: 'Unknown' | 'BadFormat';
  }

  /** @name PalletUtilityEvent (33) */
  interface PalletUtilityEvent extends Enum {
    readonly isBatchInterrupted: boolean;
    readonly asBatchInterrupted: {
      readonly index: u32;
      readonly error: SpRuntimeDispatchError;
    } & Struct;
    readonly isBatchCompleted: boolean;
    readonly isBatchCompletedWithErrors: boolean;
    readonly isItemCompleted: boolean;
    readonly isItemFailed: boolean;
    readonly asItemFailed: {
      readonly error: SpRuntimeDispatchError;
    } & Struct;
    readonly isDispatchedAs: boolean;
    readonly asDispatchedAs: {
      readonly result: Result<Null, SpRuntimeDispatchError>;
    } & Struct;
    readonly type: 'BatchInterrupted' | 'BatchCompleted' | 'BatchCompletedWithErrors' | 'ItemCompleted' | 'ItemFailed' | 'DispatchedAs';
  }

  /** @name PalletMultisigEvent (34) */
  interface PalletMultisigEvent extends Enum {
    readonly isNewMultisig: boolean;
    readonly asNewMultisig: {
      readonly approving: AccountId32;
      readonly multisig: AccountId32;
      readonly callHash: U8aFixed;
    } & Struct;
    readonly isMultisigApproval: boolean;
    readonly asMultisigApproval: {
      readonly approving: AccountId32;
      readonly timepoint: PalletMultisigTimepoint;
      readonly multisig: AccountId32;
      readonly callHash: U8aFixed;
    } & Struct;
    readonly isMultisigExecuted: boolean;
    readonly asMultisigExecuted: {
      readonly approving: AccountId32;
      readonly timepoint: PalletMultisigTimepoint;
      readonly multisig: AccountId32;
      readonly callHash: U8aFixed;
      readonly result: Result<Null, SpRuntimeDispatchError>;
    } & Struct;
    readonly isMultisigCancelled: boolean;
    readonly asMultisigCancelled: {
      readonly cancelling: AccountId32;
      readonly timepoint: PalletMultisigTimepoint;
      readonly multisig: AccountId32;
      readonly callHash: U8aFixed;
    } & Struct;
    readonly type: 'NewMultisig' | 'MultisigApproval' | 'MultisigExecuted' | 'MultisigCancelled';
  }

  /** @name PalletMultisigTimepoint (35) */
  interface PalletMultisigTimepoint extends Struct {
    readonly height: u32;
    readonly index: u32;
  }

  /** @name PalletProxyEvent (36) */
  interface PalletProxyEvent extends Enum {
    readonly isProxyExecuted: boolean;
    readonly asProxyExecuted: {
      readonly result: Result<Null, SpRuntimeDispatchError>;
    } & Struct;
    readonly isAnonymousCreated: boolean;
    readonly asAnonymousCreated: {
      readonly anonymous: AccountId32;
      readonly who: AccountId32;
      readonly proxyType: RuntimeCommonProxyType;
      readonly disambiguationIndex: u16;
    } & Struct;
    readonly isAnnounced: boolean;
    readonly asAnnounced: {
      readonly real: AccountId32;
      readonly proxy: AccountId32;
      readonly callHash: H256;
    } & Struct;
    readonly isProxyAdded: boolean;
    readonly asProxyAdded: {
      readonly delegator: AccountId32;
      readonly delegatee: AccountId32;
      readonly proxyType: RuntimeCommonProxyType;
      readonly delay: u32;
    } & Struct;
    readonly isProxyRemoved: boolean;
    readonly asProxyRemoved: {
      readonly delegator: AccountId32;
      readonly delegatee: AccountId32;
      readonly proxyType: RuntimeCommonProxyType;
      readonly delay: u32;
    } & Struct;
    readonly type: 'ProxyExecuted' | 'AnonymousCreated' | 'Announced' | 'ProxyAdded' | 'ProxyRemoved';
  }

  /** @name RuntimeCommonProxyType (37) */
  interface RuntimeCommonProxyType extends Enum {
    readonly isAny: boolean;
    readonly isCancelProxy: boolean;
    readonly isGovernance: boolean;
    readonly isAuction: boolean;
    readonly isSwap: boolean;
    readonly isLoan: boolean;
    readonly isDexLiquidity: boolean;
    readonly isStableAssetSwap: boolean;
    readonly isStableAssetLiquidity: boolean;
    readonly isHoma: boolean;
    readonly type: 'Any' | 'CancelProxy' | 'Governance' | 'Auction' | 'Swap' | 'Loan' | 'DexLiquidity' | 'StableAssetSwap' | 'StableAssetLiquidity' | 'Homa';
  }

  /** @name ModuleTransactionPauseModuleEvent (39) */
  interface ModuleTransactionPauseModuleEvent extends Enum {
    readonly isTransactionPaused: boolean;
    readonly asTransactionPaused: {
      readonly palletNameBytes: Bytes;
      readonly functionNameBytes: Bytes;
    } & Struct;
    readonly isTransactionUnpaused: boolean;
    readonly asTransactionUnpaused: {
      readonly palletNameBytes: Bytes;
      readonly functionNameBytes: Bytes;
    } & Struct;
    readonly isEvmPrecompilePaused: boolean;
    readonly asEvmPrecompilePaused: {
      readonly address: H160;
    } & Struct;
    readonly isEvmPrecompileUnpaused: boolean;
    readonly asEvmPrecompileUnpaused: {
      readonly address: H160;
    } & Struct;
    readonly type: 'TransactionPaused' | 'TransactionUnpaused' | 'EvmPrecompilePaused' | 'EvmPrecompileUnpaused';
  }

  /** @name ModuleIdleSchedulerModuleEvent (42) */
  interface ModuleIdleSchedulerModuleEvent extends Enum {
    readonly isTaskDispatched: boolean;
    readonly asTaskDispatched: {
      readonly taskId: u32;
      readonly result: Result<Null, SpRuntimeDispatchError>;
    } & Struct;
    readonly isTaskAdded: boolean;
    readonly asTaskAdded: {
      readonly taskId: u32;
      readonly task: AcalaRuntimeScheduledTasks;
    } & Struct;
    readonly type: 'TaskDispatched' | 'TaskAdded';
  }

  /** @name AcalaRuntimeScheduledTasks (43) */
  interface AcalaRuntimeScheduledTasks extends Enum {
    readonly isEvmTask: boolean;
    readonly asEvmTask: ModuleEvmEvmTask;
    readonly type: 'EvmTask';
  }

  /** @name ModuleEvmEvmTask (44) */
  interface ModuleEvmEvmTask extends Enum {
    readonly isSchedule: boolean;
    readonly asSchedule: {
      readonly from: H160;
      readonly target: H160;
      readonly input: Bytes;
      readonly value: u128;
      readonly gasLimit: u64;
      readonly storageLimit: u32;
    } & Struct;
    readonly isRemove: boolean;
    readonly asRemove: {
      readonly caller: H160;
      readonly contract: H160;
      readonly maintainer: H160;
    } & Struct;
    readonly type: 'Schedule' | 'Remove';
  }

  /** @name AcalaRuntimeRuntime (45) */
  type AcalaRuntimeRuntime = Null;

  /** @name PalletPreimageEvent (46) */
  interface PalletPreimageEvent extends Enum {
    readonly isNoted: boolean;
    readonly asNoted: {
      readonly hash_: H256;
    } & Struct;
    readonly isRequested: boolean;
    readonly asRequested: {
      readonly hash_: H256;
    } & Struct;
    readonly isCleared: boolean;
    readonly asCleared: {
      readonly hash_: H256;
    } & Struct;
    readonly type: 'Noted' | 'Requested' | 'Cleared';
  }

  /** @name PalletBalancesEvent (47) */
  interface PalletBalancesEvent extends Enum {
    readonly isEndowed: boolean;
    readonly asEndowed: {
      readonly account: AccountId32;
      readonly freeBalance: u128;
    } & Struct;
    readonly isDustLost: boolean;
    readonly asDustLost: {
      readonly account: AccountId32;
      readonly amount: u128;
    } & Struct;
    readonly isTransfer: boolean;
    readonly asTransfer: {
      readonly from: AccountId32;
      readonly to: AccountId32;
      readonly amount: u128;
    } & Struct;
    readonly isBalanceSet: boolean;
    readonly asBalanceSet: {
      readonly who: AccountId32;
      readonly free: u128;
      readonly reserved: u128;
    } & Struct;
    readonly isReserved: boolean;
    readonly asReserved: {
      readonly who: AccountId32;
      readonly amount: u128;
    } & Struct;
    readonly isUnreserved: boolean;
    readonly asUnreserved: {
      readonly who: AccountId32;
      readonly amount: u128;
    } & Struct;
    readonly isReserveRepatriated: boolean;
    readonly asReserveRepatriated: {
      readonly from: AccountId32;
      readonly to: AccountId32;
      readonly amount: u128;
      readonly destinationStatus: FrameSupportTokensMiscBalanceStatus;
    } & Struct;
    readonly isDeposit: boolean;
    readonly asDeposit: {
      readonly who: AccountId32;
      readonly amount: u128;
    } & Struct;
    readonly isWithdraw: boolean;
    readonly asWithdraw: {
      readonly who: AccountId32;
      readonly amount: u128;
    } & Struct;
    readonly isSlashed: boolean;
    readonly asSlashed: {
      readonly who: AccountId32;
      readonly amount: u128;
    } & Struct;
    readonly type: 'Endowed' | 'DustLost' | 'Transfer' | 'BalanceSet' | 'Reserved' | 'Unreserved' | 'ReserveRepatriated' | 'Deposit' | 'Withdraw' | 'Slashed';
  }

  /** @name FrameSupportTokensMiscBalanceStatus (48) */
  interface FrameSupportTokensMiscBalanceStatus extends Enum {
    readonly isFree: boolean;
    readonly isReserved: boolean;
    readonly type: 'Free' | 'Reserved';
  }

  /** @name OrmlTokensModuleEvent (49) */
  interface OrmlTokensModuleEvent extends Enum {
    readonly isEndowed: boolean;
    readonly asEndowed: {
      readonly currencyId: AcalaPrimitivesCurrencyCurrencyId;
      readonly who: AccountId32;
      readonly amount: u128;
    } & Struct;
    readonly isDustLost: boolean;
    readonly asDustLost: {
      readonly currencyId: AcalaPrimitivesCurrencyCurrencyId;
      readonly who: AccountId32;
      readonly amount: u128;
    } & Struct;
    readonly isTransfer: boolean;
    readonly asTransfer: {
      readonly currencyId: AcalaPrimitivesCurrencyCurrencyId;
      readonly from: AccountId32;
      readonly to: AccountId32;
      readonly amount: u128;
    } & Struct;
    readonly isReserved: boolean;
    readonly asReserved: {
      readonly currencyId: AcalaPrimitivesCurrencyCurrencyId;
      readonly who: AccountId32;
      readonly amount: u128;
    } & Struct;
    readonly isUnreserved: boolean;
    readonly asUnreserved: {
      readonly currencyId: AcalaPrimitivesCurrencyCurrencyId;
      readonly who: AccountId32;
      readonly amount: u128;
    } & Struct;
    readonly isReserveRepatriated: boolean;
    readonly asReserveRepatriated: {
      readonly currencyId: AcalaPrimitivesCurrencyCurrencyId;
      readonly from: AccountId32;
      readonly to: AccountId32;
      readonly amount: u128;
      readonly status: FrameSupportTokensMiscBalanceStatus;
    } & Struct;
    readonly isBalanceSet: boolean;
    readonly asBalanceSet: {
      readonly currencyId: AcalaPrimitivesCurrencyCurrencyId;
      readonly who: AccountId32;
      readonly free: u128;
      readonly reserved: u128;
    } & Struct;
    readonly isTotalIssuanceSet: boolean;
    readonly asTotalIssuanceSet: {
      readonly currencyId: AcalaPrimitivesCurrencyCurrencyId;
      readonly amount: u128;
    } & Struct;
    readonly isWithdrawn: boolean;
    readonly asWithdrawn: {
      readonly currencyId: AcalaPrimitivesCurrencyCurrencyId;
      readonly who: AccountId32;
      readonly amount: u128;
    } & Struct;
    readonly isSlashed: boolean;
    readonly asSlashed: {
      readonly currencyId: AcalaPrimitivesCurrencyCurrencyId;
      readonly who: AccountId32;
      readonly freeAmount: u128;
      readonly reservedAmount: u128;
    } & Struct;
    readonly isDeposited: boolean;
    readonly asDeposited: {
      readonly currencyId: AcalaPrimitivesCurrencyCurrencyId;
      readonly who: AccountId32;
      readonly amount: u128;
    } & Struct;
    readonly isLockSet: boolean;
    readonly asLockSet: {
      readonly lockId: U8aFixed;
      readonly currencyId: AcalaPrimitivesCurrencyCurrencyId;
      readonly who: AccountId32;
      readonly amount: u128;
    } & Struct;
    readonly isLockRemoved: boolean;
    readonly asLockRemoved: {
      readonly lockId: U8aFixed;
      readonly currencyId: AcalaPrimitivesCurrencyCurrencyId;
      readonly who: AccountId32;
    } & Struct;
    readonly type: 'Endowed' | 'DustLost' | 'Transfer' | 'Reserved' | 'Unreserved' | 'ReserveRepatriated' | 'BalanceSet' | 'TotalIssuanceSet' | 'Withdrawn' | 'Slashed' | 'Deposited' | 'LockSet' | 'LockRemoved';
  }

  /** @name AcalaPrimitivesCurrencyCurrencyId (50) */
  interface AcalaPrimitivesCurrencyCurrencyId extends Enum {
    readonly isToken: boolean;
    readonly asToken: AcalaPrimitivesCurrencyTokenSymbol;
    readonly isDexShare: boolean;
    readonly asDexShare: ITuple<[AcalaPrimitivesCurrencyDexShare, AcalaPrimitivesCurrencyDexShare]>;
    readonly isErc20: boolean;
    readonly asErc20: H160;
    readonly isStableAssetPoolToken: boolean;
    readonly asStableAssetPoolToken: u32;
    readonly isLiquidCrowdloan: boolean;
    readonly asLiquidCrowdloan: u32;
    readonly isForeignAsset: boolean;
    readonly asForeignAsset: u16;
    readonly type: 'Token' | 'DexShare' | 'Erc20' | 'StableAssetPoolToken' | 'LiquidCrowdloan' | 'ForeignAsset';
  }

  /** @name AcalaPrimitivesCurrencyTokenSymbol (51) */
  interface AcalaPrimitivesCurrencyTokenSymbol extends Enum {
    readonly isAca: boolean;
    readonly isAusd: boolean;
    readonly isDot: boolean;
    readonly isLdot: boolean;
    readonly isTap: boolean;
    readonly isRenbtc: boolean;
    readonly isCash: boolean;
    readonly isKar: boolean;
    readonly isKusd: boolean;
    readonly isKsm: boolean;
    readonly isLksm: boolean;
    readonly isTai: boolean;
    readonly isBnc: boolean;
    readonly isVsksm: boolean;
    readonly isPha: boolean;
    readonly isKint: boolean;
    readonly isKbtc: boolean;
    readonly type: 'Aca' | 'Ausd' | 'Dot' | 'Ldot' | 'Tap' | 'Renbtc' | 'Cash' | 'Kar' | 'Kusd' | 'Ksm' | 'Lksm' | 'Tai' | 'Bnc' | 'Vsksm' | 'Pha' | 'Kint' | 'Kbtc';
  }

  /** @name AcalaPrimitivesCurrencyDexShare (52) */
  interface AcalaPrimitivesCurrencyDexShare extends Enum {
    readonly isToken: boolean;
    readonly asToken: AcalaPrimitivesCurrencyTokenSymbol;
    readonly isErc20: boolean;
    readonly asErc20: H160;
    readonly isLiquidCrowdloan: boolean;
    readonly asLiquidCrowdloan: u32;
    readonly isForeignAsset: boolean;
    readonly asForeignAsset: u16;
    readonly isStableAssetPoolToken: boolean;
    readonly asStableAssetPoolToken: u32;
    readonly type: 'Token' | 'Erc20' | 'LiquidCrowdloan' | 'ForeignAsset' | 'StableAssetPoolToken';
  }

  /** @name ModuleCurrenciesModuleEvent (54) */
  interface ModuleCurrenciesModuleEvent extends Enum {
    readonly isTransferred: boolean;
    readonly asTransferred: {
      readonly currencyId: AcalaPrimitivesCurrencyCurrencyId;
      readonly from: AccountId32;
      readonly to: AccountId32;
      readonly amount: u128;
    } & Struct;
    readonly isWithdrawn: boolean;
    readonly asWithdrawn: {
      readonly currencyId: AcalaPrimitivesCurrencyCurrencyId;
      readonly who: AccountId32;
      readonly amount: u128;
    } & Struct;
    readonly isDeposited: boolean;
    readonly asDeposited: {
      readonly currencyId: AcalaPrimitivesCurrencyCurrencyId;
      readonly who: AccountId32;
      readonly amount: u128;
    } & Struct;
    readonly isDustSwept: boolean;
    readonly asDustSwept: {
      readonly currencyId: AcalaPrimitivesCurrencyCurrencyId;
      readonly who: AccountId32;
      readonly amount: u128;
    } & Struct;
    readonly type: 'Transferred' | 'Withdrawn' | 'Deposited' | 'DustSwept';
  }

  /** @name OrmlVestingModuleEvent (55) */
  interface OrmlVestingModuleEvent extends Enum {
    readonly isVestingScheduleAdded: boolean;
    readonly asVestingScheduleAdded: {
      readonly from: AccountId32;
      readonly to: AccountId32;
      readonly vestingSchedule: OrmlVestingVestingSchedule;
    } & Struct;
    readonly isClaimed: boolean;
    readonly asClaimed: {
      readonly who: AccountId32;
      readonly amount: u128;
    } & Struct;
    readonly isVestingSchedulesUpdated: boolean;
    readonly asVestingSchedulesUpdated: {
      readonly who: AccountId32;
    } & Struct;
    readonly type: 'VestingScheduleAdded' | 'Claimed' | 'VestingSchedulesUpdated';
  }

  /** @name OrmlVestingVestingSchedule (56) */
  interface OrmlVestingVestingSchedule extends Struct {
    readonly start: u32;
    readonly period: u32;
    readonly periodCount: u32;
    readonly perPeriod: Compact<u128>;
  }

  /** @name ModuleTransactionPaymentModuleEvent (58) */
  interface ModuleTransactionPaymentModuleEvent extends Enum {
    readonly isChargeFeePoolEnabled: boolean;
    readonly asChargeFeePoolEnabled: {
      readonly subAccount: AccountId32;
      readonly currencyId: AcalaPrimitivesCurrencyCurrencyId;
      readonly exchangeRate: u128;
      readonly poolSize: u128;
      readonly swapThreshold: u128;
    } & Struct;
    readonly isChargeFeePoolSwapped: boolean;
    readonly asChargeFeePoolSwapped: {
      readonly subAccount: AccountId32;
      readonly supplyCurrencyId: AcalaPrimitivesCurrencyCurrencyId;
      readonly oldExchangeRate: u128;
      readonly swapExchangeRate: u128;
      readonly newExchangeRate: u128;
      readonly newPoolSize: u128;
    } & Struct;
    readonly isChargeFeePoolDisabled: boolean;
    readonly asChargeFeePoolDisabled: {
      readonly currencyId: AcalaPrimitivesCurrencyCurrencyId;
      readonly foreignAmount: u128;
      readonly nativeAmount: u128;
    } & Struct;
    readonly isTransactionFeePaid: boolean;
    readonly asTransactionFeePaid: {
      readonly who: AccountId32;
      readonly actualFee: u128;
      readonly actualTip: u128;
      readonly actualSurplus: u128;
    } & Struct;
    readonly type: 'ChargeFeePoolEnabled' | 'ChargeFeePoolSwapped' | 'ChargeFeePoolDisabled' | 'TransactionFeePaid';
  }

  /** @name PalletTreasuryEvent (60) */
  interface PalletTreasuryEvent extends Enum {
    readonly isProposed: boolean;
    readonly asProposed: {
      readonly proposalIndex: u32;
    } & Struct;
    readonly isSpending: boolean;
    readonly asSpending: {
      readonly budgetRemaining: u128;
    } & Struct;
    readonly isAwarded: boolean;
    readonly asAwarded: {
      readonly proposalIndex: u32;
      readonly award: u128;
      readonly account: AccountId32;
    } & Struct;
    readonly isRejected: boolean;
    readonly asRejected: {
      readonly proposalIndex: u32;
      readonly slashed: u128;
    } & Struct;
    readonly isBurnt: boolean;
    readonly asBurnt: {
      readonly burntFunds: u128;
    } & Struct;
    readonly isRollover: boolean;
    readonly asRollover: {
      readonly rolloverBalance: u128;
    } & Struct;
    readonly isDeposit: boolean;
    readonly asDeposit: {
      readonly value: u128;
    } & Struct;
    readonly isSpendApproved: boolean;
    readonly asSpendApproved: {
      readonly proposalIndex: u32;
      readonly amount: u128;
      readonly beneficiary: AccountId32;
    } & Struct;
    readonly type: 'Proposed' | 'Spending' | 'Awarded' | 'Rejected' | 'Burnt' | 'Rollover' | 'Deposit' | 'SpendApproved';
  }

  /** @name PalletBountiesEvent (61) */
  interface PalletBountiesEvent extends Enum {
    readonly isBountyProposed: boolean;
    readonly asBountyProposed: {
      readonly index: u32;
    } & Struct;
    readonly isBountyRejected: boolean;
    readonly asBountyRejected: {
      readonly index: u32;
      readonly bond: u128;
    } & Struct;
    readonly isBountyBecameActive: boolean;
    readonly asBountyBecameActive: {
      readonly index: u32;
    } & Struct;
    readonly isBountyAwarded: boolean;
    readonly asBountyAwarded: {
      readonly index: u32;
      readonly beneficiary: AccountId32;
    } & Struct;
    readonly isBountyClaimed: boolean;
    readonly asBountyClaimed: {
      readonly index: u32;
      readonly payout: u128;
      readonly beneficiary: AccountId32;
    } & Struct;
    readonly isBountyCanceled: boolean;
    readonly asBountyCanceled: {
      readonly index: u32;
    } & Struct;
    readonly isBountyExtended: boolean;
    readonly asBountyExtended: {
      readonly index: u32;
    } & Struct;
    readonly type: 'BountyProposed' | 'BountyRejected' | 'BountyBecameActive' | 'BountyAwarded' | 'BountyClaimed' | 'BountyCanceled' | 'BountyExtended';
  }

  /** @name PalletTipsEvent (62) */
  interface PalletTipsEvent extends Enum {
    readonly isNewTip: boolean;
    readonly asNewTip: {
      readonly tipHash: H256;
    } & Struct;
    readonly isTipClosing: boolean;
    readonly asTipClosing: {
      readonly tipHash: H256;
    } & Struct;
    readonly isTipClosed: boolean;
    readonly asTipClosed: {
      readonly tipHash: H256;
      readonly who: AccountId32;
      readonly payout: u128;
    } & Struct;
    readonly isTipRetracted: boolean;
    readonly asTipRetracted: {
      readonly tipHash: H256;
    } & Struct;
    readonly isTipSlashed: boolean;
    readonly asTipSlashed: {
      readonly tipHash: H256;
      readonly finder: AccountId32;
      readonly deposit: u128;
    } & Struct;
    readonly type: 'NewTip' | 'TipClosing' | 'TipClosed' | 'TipRetracted' | 'TipSlashed';
  }

  /** @name ModuleCollatorSelectionEvent (63) */
  interface ModuleCollatorSelectionEvent extends Enum {
    readonly isNewInvulnerables: boolean;
    readonly asNewInvulnerables: {
      readonly newInvulnerables: Vec<AccountId32>;
    } & Struct;
    readonly isNewDesiredCandidates: boolean;
    readonly asNewDesiredCandidates: {
      readonly newDesiredCandidates: u32;
    } & Struct;
    readonly isNewCandidacyBond: boolean;
    readonly asNewCandidacyBond: {
      readonly newCandidacyBond: u128;
    } & Struct;
    readonly isCandidateAdded: boolean;
    readonly asCandidateAdded: {
      readonly who: AccountId32;
      readonly bond: u128;
    } & Struct;
    readonly isCandidateRemoved: boolean;
    readonly asCandidateRemoved: {
      readonly who: AccountId32;
    } & Struct;
    readonly type: 'NewInvulnerables' | 'NewDesiredCandidates' | 'NewCandidacyBond' | 'CandidateAdded' | 'CandidateRemoved';
  }

  /** @name PalletSessionEvent (65) */
  interface PalletSessionEvent extends Enum {
    readonly isNewSession: boolean;
    readonly asNewSession: {
      readonly sessionIndex: u32;
    } & Struct;
    readonly type: 'NewSession';
  }

  /** @name ModuleSessionManagerModuleEvent (66) */
  interface ModuleSessionManagerModuleEvent extends Enum {
    readonly isScheduledSessionDuration: boolean;
    readonly asScheduledSessionDuration: {
      readonly blockNumber: u32;
      readonly sessionIndex: u32;
      readonly sessionDuration: u32;
    } & Struct;
    readonly type: 'ScheduledSessionDuration';
  }

  /** @name CumulusPalletXcmpQueueEvent (67) */
  interface CumulusPalletXcmpQueueEvent extends Enum {
    readonly isSuccess: boolean;
    readonly asSuccess: {
      readonly messageHash: Option<H256>;
      readonly weight: u64;
    } & Struct;
    readonly isFail: boolean;
    readonly asFail: {
      readonly messageHash: Option<H256>;
      readonly error: XcmV2TraitsError;
      readonly weight: u64;
    } & Struct;
    readonly isBadVersion: boolean;
    readonly asBadVersion: {
      readonly messageHash: Option<H256>;
    } & Struct;
    readonly isBadFormat: boolean;
    readonly asBadFormat: {
      readonly messageHash: Option<H256>;
    } & Struct;
    readonly isUpwardMessageSent: boolean;
    readonly asUpwardMessageSent: {
      readonly messageHash: Option<H256>;
    } & Struct;
    readonly isXcmpMessageSent: boolean;
    readonly asXcmpMessageSent: {
      readonly messageHash: Option<H256>;
    } & Struct;
    readonly isOverweightEnqueued: boolean;
    readonly asOverweightEnqueued: {
      readonly sender: u32;
      readonly sentAt: u32;
      readonly index: u64;
      readonly required: u64;
    } & Struct;
    readonly isOverweightServiced: boolean;
    readonly asOverweightServiced: {
      readonly index: u64;
      readonly used: u64;
    } & Struct;
    readonly type: 'Success' | 'Fail' | 'BadVersion' | 'BadFormat' | 'UpwardMessageSent' | 'XcmpMessageSent' | 'OverweightEnqueued' | 'OverweightServiced';
  }

  /** @name XcmV2TraitsError (69) */
  interface XcmV2TraitsError extends Enum {
    readonly isOverflow: boolean;
    readonly isUnimplemented: boolean;
    readonly isUntrustedReserveLocation: boolean;
    readonly isUntrustedTeleportLocation: boolean;
    readonly isMultiLocationFull: boolean;
    readonly isMultiLocationNotInvertible: boolean;
    readonly isBadOrigin: boolean;
    readonly isInvalidLocation: boolean;
    readonly isAssetNotFound: boolean;
    readonly isFailedToTransactAsset: boolean;
    readonly isNotWithdrawable: boolean;
    readonly isLocationCannotHold: boolean;
    readonly isExceedsMaxMessageSize: boolean;
    readonly isDestinationUnsupported: boolean;
    readonly isTransport: boolean;
    readonly isUnroutable: boolean;
    readonly isUnknownClaim: boolean;
    readonly isFailedToDecode: boolean;
    readonly isMaxWeightInvalid: boolean;
    readonly isNotHoldingFees: boolean;
    readonly isTooExpensive: boolean;
    readonly isTrap: boolean;
    readonly asTrap: u64;
    readonly isUnhandledXcmVersion: boolean;
    readonly isWeightLimitReached: boolean;
    readonly asWeightLimitReached: u64;
    readonly isBarrier: boolean;
    readonly isWeightNotComputable: boolean;
    readonly type: 'Overflow' | 'Unimplemented' | 'UntrustedReserveLocation' | 'UntrustedTeleportLocation' | 'MultiLocationFull' | 'MultiLocationNotInvertible' | 'BadOrigin' | 'InvalidLocation' | 'AssetNotFound' | 'FailedToTransactAsset' | 'NotWithdrawable' | 'LocationCannotHold' | 'ExceedsMaxMessageSize' | 'DestinationUnsupported' | 'Transport' | 'Unroutable' | 'UnknownClaim' | 'FailedToDecode' | 'MaxWeightInvalid' | 'NotHoldingFees' | 'TooExpensive' | 'Trap' | 'UnhandledXcmVersion' | 'WeightLimitReached' | 'Barrier' | 'WeightNotComputable';
  }

  /** @name PalletXcmEvent (71) */
  interface PalletXcmEvent extends Enum {
    readonly isAttempted: boolean;
    readonly asAttempted: XcmV2TraitsOutcome;
    readonly isSent: boolean;
    readonly asSent: ITuple<[XcmV1MultiLocation, XcmV1MultiLocation, XcmV2Xcm]>;
    readonly isUnexpectedResponse: boolean;
    readonly asUnexpectedResponse: ITuple<[XcmV1MultiLocation, u64]>;
    readonly isResponseReady: boolean;
    readonly asResponseReady: ITuple<[u64, XcmV2Response]>;
    readonly isNotified: boolean;
    readonly asNotified: ITuple<[u64, u8, u8]>;
    readonly isNotifyOverweight: boolean;
    readonly asNotifyOverweight: ITuple<[u64, u8, u8, u64, u64]>;
    readonly isNotifyDispatchError: boolean;
    readonly asNotifyDispatchError: ITuple<[u64, u8, u8]>;
    readonly isNotifyDecodeFailed: boolean;
    readonly asNotifyDecodeFailed: ITuple<[u64, u8, u8]>;
    readonly isInvalidResponder: boolean;
    readonly asInvalidResponder: ITuple<[XcmV1MultiLocation, u64, Option<XcmV1MultiLocation>]>;
    readonly isInvalidResponderVersion: boolean;
    readonly asInvalidResponderVersion: ITuple<[XcmV1MultiLocation, u64]>;
    readonly isResponseTaken: boolean;
    readonly asResponseTaken: u64;
    readonly isAssetsTrapped: boolean;
    readonly asAssetsTrapped: ITuple<[H256, XcmV1MultiLocation, XcmVersionedMultiAssets]>;
    readonly isVersionChangeNotified: boolean;
    readonly asVersionChangeNotified: ITuple<[XcmV1MultiLocation, u32]>;
    readonly isSupportedVersionChanged: boolean;
    readonly asSupportedVersionChanged: ITuple<[XcmV1MultiLocation, u32]>;
    readonly isNotifyTargetSendFail: boolean;
    readonly asNotifyTargetSendFail: ITuple<[XcmV1MultiLocation, u64, XcmV2TraitsError]>;
    readonly isNotifyTargetMigrationFail: boolean;
    readonly asNotifyTargetMigrationFail: ITuple<[XcmVersionedMultiLocation, u64]>;
    readonly type: 'Attempted' | 'Sent' | 'UnexpectedResponse' | 'ResponseReady' | 'Notified' | 'NotifyOverweight' | 'NotifyDispatchError' | 'NotifyDecodeFailed' | 'InvalidResponder' | 'InvalidResponderVersion' | 'ResponseTaken' | 'AssetsTrapped' | 'VersionChangeNotified' | 'SupportedVersionChanged' | 'NotifyTargetSendFail' | 'NotifyTargetMigrationFail';
  }

  /** @name XcmV2TraitsOutcome (72) */
  interface XcmV2TraitsOutcome extends Enum {
    readonly isComplete: boolean;
    readonly asComplete: u64;
    readonly isIncomplete: boolean;
    readonly asIncomplete: ITuple<[u64, XcmV2TraitsError]>;
    readonly isError: boolean;
    readonly asError: XcmV2TraitsError;
    readonly type: 'Complete' | 'Incomplete' | 'Error';
  }

  /** @name XcmV1MultiLocation (73) */
  interface XcmV1MultiLocation extends Struct {
    readonly parents: u8;
    readonly interior: XcmV1MultilocationJunctions;
  }

  /** @name XcmV1MultilocationJunctions (74) */
  interface XcmV1MultilocationJunctions extends Enum {
    readonly isHere: boolean;
    readonly isX1: boolean;
    readonly asX1: XcmV1Junction;
    readonly isX2: boolean;
    readonly asX2: ITuple<[XcmV1Junction, XcmV1Junction]>;
    readonly isX3: boolean;
    readonly asX3: ITuple<[XcmV1Junction, XcmV1Junction, XcmV1Junction]>;
    readonly isX4: boolean;
    readonly asX4: ITuple<[XcmV1Junction, XcmV1Junction, XcmV1Junction, XcmV1Junction]>;
    readonly isX5: boolean;
    readonly asX5: ITuple<[XcmV1Junction, XcmV1Junction, XcmV1Junction, XcmV1Junction, XcmV1Junction]>;
    readonly isX6: boolean;
    readonly asX6: ITuple<[XcmV1Junction, XcmV1Junction, XcmV1Junction, XcmV1Junction, XcmV1Junction, XcmV1Junction]>;
    readonly isX7: boolean;
    readonly asX7: ITuple<[XcmV1Junction, XcmV1Junction, XcmV1Junction, XcmV1Junction, XcmV1Junction, XcmV1Junction, XcmV1Junction]>;
    readonly isX8: boolean;
    readonly asX8: ITuple<[XcmV1Junction, XcmV1Junction, XcmV1Junction, XcmV1Junction, XcmV1Junction, XcmV1Junction, XcmV1Junction, XcmV1Junction]>;
    readonly type: 'Here' | 'X1' | 'X2' | 'X3' | 'X4' | 'X5' | 'X6' | 'X7' | 'X8';
  }

  /** @name XcmV1Junction (75) */
  interface XcmV1Junction extends Enum {
    readonly isParachain: boolean;
    readonly asParachain: Compact<u32>;
    readonly isAccountId32: boolean;
    readonly asAccountId32: {
      readonly network: XcmV0JunctionNetworkId;
      readonly id: U8aFixed;
    } & Struct;
    readonly isAccountIndex64: boolean;
    readonly asAccountIndex64: {
      readonly network: XcmV0JunctionNetworkId;
      readonly index: Compact<u64>;
    } & Struct;
    readonly isAccountKey20: boolean;
    readonly asAccountKey20: {
      readonly network: XcmV0JunctionNetworkId;
      readonly key: U8aFixed;
    } & Struct;
    readonly isPalletInstance: boolean;
    readonly asPalletInstance: u8;
    readonly isGeneralIndex: boolean;
    readonly asGeneralIndex: Compact<u128>;
    readonly isGeneralKey: boolean;
    readonly asGeneralKey: Bytes;
    readonly isOnlyChild: boolean;
    readonly isPlurality: boolean;
    readonly asPlurality: {
      readonly id: XcmV0JunctionBodyId;
      readonly part: XcmV0JunctionBodyPart;
    } & Struct;
    readonly type: 'Parachain' | 'AccountId32' | 'AccountIndex64' | 'AccountKey20' | 'PalletInstance' | 'GeneralIndex' | 'GeneralKey' | 'OnlyChild' | 'Plurality';
  }

  /** @name XcmV0JunctionNetworkId (77) */
  interface XcmV0JunctionNetworkId extends Enum {
    readonly isAny: boolean;
    readonly isNamed: boolean;
    readonly asNamed: Bytes;
    readonly isPolkadot: boolean;
    readonly isKusama: boolean;
    readonly type: 'Any' | 'Named' | 'Polkadot' | 'Kusama';
  }

  /** @name XcmV0JunctionBodyId (80) */
  interface XcmV0JunctionBodyId extends Enum {
    readonly isUnit: boolean;
    readonly isNamed: boolean;
    readonly asNamed: Bytes;
    readonly isIndex: boolean;
    readonly asIndex: Compact<u32>;
    readonly isExecutive: boolean;
    readonly isTechnical: boolean;
    readonly isLegislative: boolean;
    readonly isJudicial: boolean;
    readonly type: 'Unit' | 'Named' | 'Index' | 'Executive' | 'Technical' | 'Legislative' | 'Judicial';
  }

  /** @name XcmV0JunctionBodyPart (81) */
  interface XcmV0JunctionBodyPart extends Enum {
    readonly isVoice: boolean;
    readonly isMembers: boolean;
    readonly asMembers: {
      readonly count: Compact<u32>;
    } & Struct;
    readonly isFraction: boolean;
    readonly asFraction: {
      readonly nom: Compact<u32>;
      readonly denom: Compact<u32>;
    } & Struct;
    readonly isAtLeastProportion: boolean;
    readonly asAtLeastProportion: {
      readonly nom: Compact<u32>;
      readonly denom: Compact<u32>;
    } & Struct;
    readonly isMoreThanProportion: boolean;
    readonly asMoreThanProportion: {
      readonly nom: Compact<u32>;
      readonly denom: Compact<u32>;
    } & Struct;
    readonly type: 'Voice' | 'Members' | 'Fraction' | 'AtLeastProportion' | 'MoreThanProportion';
  }

  /** @name XcmV2Xcm (82) */
  interface XcmV2Xcm extends Vec<XcmV2Instruction> {}

  /** @name XcmV2Instruction (84) */
  interface XcmV2Instruction extends Enum {
    readonly isWithdrawAsset: boolean;
    readonly asWithdrawAsset: XcmV1MultiassetMultiAssets;
    readonly isReserveAssetDeposited: boolean;
    readonly asReserveAssetDeposited: XcmV1MultiassetMultiAssets;
    readonly isReceiveTeleportedAsset: boolean;
    readonly asReceiveTeleportedAsset: XcmV1MultiassetMultiAssets;
    readonly isQueryResponse: boolean;
    readonly asQueryResponse: {
      readonly queryId: Compact<u64>;
      readonly response: XcmV2Response;
      readonly maxWeight: Compact<u64>;
    } & Struct;
    readonly isTransferAsset: boolean;
    readonly asTransferAsset: {
      readonly assets: XcmV1MultiassetMultiAssets;
      readonly beneficiary: XcmV1MultiLocation;
    } & Struct;
    readonly isTransferReserveAsset: boolean;
    readonly asTransferReserveAsset: {
      readonly assets: XcmV1MultiassetMultiAssets;
      readonly dest: XcmV1MultiLocation;
      readonly xcm: XcmV2Xcm;
    } & Struct;
    readonly isTransact: boolean;
    readonly asTransact: {
      readonly originType: XcmV0OriginKind;
      readonly requireWeightAtMost: Compact<u64>;
      readonly call: XcmDoubleEncoded;
    } & Struct;
    readonly isHrmpNewChannelOpenRequest: boolean;
    readonly asHrmpNewChannelOpenRequest: {
      readonly sender: Compact<u32>;
      readonly maxMessageSize: Compact<u32>;
      readonly maxCapacity: Compact<u32>;
    } & Struct;
    readonly isHrmpChannelAccepted: boolean;
    readonly asHrmpChannelAccepted: {
      readonly recipient: Compact<u32>;
    } & Struct;
    readonly isHrmpChannelClosing: boolean;
    readonly asHrmpChannelClosing: {
      readonly initiator: Compact<u32>;
      readonly sender: Compact<u32>;
      readonly recipient: Compact<u32>;
    } & Struct;
    readonly isClearOrigin: boolean;
    readonly isDescendOrigin: boolean;
    readonly asDescendOrigin: XcmV1MultilocationJunctions;
    readonly isReportError: boolean;
    readonly asReportError: {
      readonly queryId: Compact<u64>;
      readonly dest: XcmV1MultiLocation;
      readonly maxResponseWeight: Compact<u64>;
    } & Struct;
    readonly isDepositAsset: boolean;
    readonly asDepositAsset: {
      readonly assets: XcmV1MultiassetMultiAssetFilter;
      readonly maxAssets: Compact<u32>;
      readonly beneficiary: XcmV1MultiLocation;
    } & Struct;
    readonly isDepositReserveAsset: boolean;
    readonly asDepositReserveAsset: {
      readonly assets: XcmV1MultiassetMultiAssetFilter;
      readonly maxAssets: Compact<u32>;
      readonly dest: XcmV1MultiLocation;
      readonly xcm: XcmV2Xcm;
    } & Struct;
    readonly isExchangeAsset: boolean;
    readonly asExchangeAsset: {
      readonly give: XcmV1MultiassetMultiAssetFilter;
      readonly receive: XcmV1MultiassetMultiAssets;
    } & Struct;
    readonly isInitiateReserveWithdraw: boolean;
    readonly asInitiateReserveWithdraw: {
      readonly assets: XcmV1MultiassetMultiAssetFilter;
      readonly reserve: XcmV1MultiLocation;
      readonly xcm: XcmV2Xcm;
    } & Struct;
    readonly isInitiateTeleport: boolean;
    readonly asInitiateTeleport: {
      readonly assets: XcmV1MultiassetMultiAssetFilter;
      readonly dest: XcmV1MultiLocation;
      readonly xcm: XcmV2Xcm;
    } & Struct;
    readonly isQueryHolding: boolean;
    readonly asQueryHolding: {
      readonly queryId: Compact<u64>;
      readonly dest: XcmV1MultiLocation;
      readonly assets: XcmV1MultiassetMultiAssetFilter;
      readonly maxResponseWeight: Compact<u64>;
    } & Struct;
    readonly isBuyExecution: boolean;
    readonly asBuyExecution: {
      readonly fees: XcmV1MultiAsset;
      readonly weightLimit: XcmV2WeightLimit;
    } & Struct;
    readonly isRefundSurplus: boolean;
    readonly isSetErrorHandler: boolean;
    readonly asSetErrorHandler: XcmV2Xcm;
    readonly isSetAppendix: boolean;
    readonly asSetAppendix: XcmV2Xcm;
    readonly isClearError: boolean;
    readonly isClaimAsset: boolean;
    readonly asClaimAsset: {
      readonly assets: XcmV1MultiassetMultiAssets;
      readonly ticket: XcmV1MultiLocation;
    } & Struct;
    readonly isTrap: boolean;
    readonly asTrap: Compact<u64>;
    readonly isSubscribeVersion: boolean;
    readonly asSubscribeVersion: {
      readonly queryId: Compact<u64>;
      readonly maxResponseWeight: Compact<u64>;
    } & Struct;
    readonly isUnsubscribeVersion: boolean;
    readonly type: 'WithdrawAsset' | 'ReserveAssetDeposited' | 'ReceiveTeleportedAsset' | 'QueryResponse' | 'TransferAsset' | 'TransferReserveAsset' | 'Transact' | 'HrmpNewChannelOpenRequest' | 'HrmpChannelAccepted' | 'HrmpChannelClosing' | 'ClearOrigin' | 'DescendOrigin' | 'ReportError' | 'DepositAsset' | 'DepositReserveAsset' | 'ExchangeAsset' | 'InitiateReserveWithdraw' | 'InitiateTeleport' | 'QueryHolding' | 'BuyExecution' | 'RefundSurplus' | 'SetErrorHandler' | 'SetAppendix' | 'ClearError' | 'ClaimAsset' | 'Trap' | 'SubscribeVersion' | 'UnsubscribeVersion';
  }

  /** @name XcmV1MultiassetMultiAssets (85) */
  interface XcmV1MultiassetMultiAssets extends Vec<XcmV1MultiAsset> {}

  /** @name XcmV1MultiAsset (87) */
  interface XcmV1MultiAsset extends Struct {
    readonly id: XcmV1MultiassetAssetId;
    readonly fun: XcmV1MultiassetFungibility;
  }

  /** @name XcmV1MultiassetAssetId (88) */
  interface XcmV1MultiassetAssetId extends Enum {
    readonly isConcrete: boolean;
    readonly asConcrete: XcmV1MultiLocation;
    readonly isAbstract: boolean;
    readonly asAbstract: Bytes;
    readonly type: 'Concrete' | 'Abstract';
  }

  /** @name XcmV1MultiassetFungibility (89) */
  interface XcmV1MultiassetFungibility extends Enum {
    readonly isFungible: boolean;
    readonly asFungible: Compact<u128>;
    readonly isNonFungible: boolean;
    readonly asNonFungible: XcmV1MultiassetAssetInstance;
    readonly type: 'Fungible' | 'NonFungible';
  }

  /** @name XcmV1MultiassetAssetInstance (90) */
  interface XcmV1MultiassetAssetInstance extends Enum {
    readonly isUndefined: boolean;
    readonly isIndex: boolean;
    readonly asIndex: Compact<u128>;
    readonly isArray4: boolean;
    readonly asArray4: U8aFixed;
    readonly isArray8: boolean;
    readonly asArray8: U8aFixed;
    readonly isArray16: boolean;
    readonly asArray16: U8aFixed;
    readonly isArray32: boolean;
    readonly asArray32: U8aFixed;
    readonly isBlob: boolean;
    readonly asBlob: Bytes;
    readonly type: 'Undefined' | 'Index' | 'Array4' | 'Array8' | 'Array16' | 'Array32' | 'Blob';
  }

  /** @name XcmV2Response (92) */
  interface XcmV2Response extends Enum {
    readonly isNull: boolean;
    readonly isAssets: boolean;
    readonly asAssets: XcmV1MultiassetMultiAssets;
    readonly isExecutionResult: boolean;
    readonly asExecutionResult: Option<ITuple<[u32, XcmV2TraitsError]>>;
    readonly isVersion: boolean;
    readonly asVersion: u32;
    readonly type: 'Null' | 'Assets' | 'ExecutionResult' | 'Version';
  }

  /** @name XcmV0OriginKind (95) */
  interface XcmV0OriginKind extends Enum {
    readonly isNative: boolean;
    readonly isSovereignAccount: boolean;
    readonly isSuperuser: boolean;
    readonly isXcm: boolean;
    readonly type: 'Native' | 'SovereignAccount' | 'Superuser' | 'Xcm';
  }

  /** @name XcmDoubleEncoded (96) */
  interface XcmDoubleEncoded extends Struct {
    readonly encoded: Bytes;
  }

  /** @name XcmV1MultiassetMultiAssetFilter (97) */
  interface XcmV1MultiassetMultiAssetFilter extends Enum {
    readonly isDefinite: boolean;
    readonly asDefinite: XcmV1MultiassetMultiAssets;
    readonly isWild: boolean;
    readonly asWild: XcmV1MultiassetWildMultiAsset;
    readonly type: 'Definite' | 'Wild';
  }

  /** @name XcmV1MultiassetWildMultiAsset (98) */
  interface XcmV1MultiassetWildMultiAsset extends Enum {
    readonly isAll: boolean;
    readonly isAllOf: boolean;
    readonly asAllOf: {
      readonly id: XcmV1MultiassetAssetId;
      readonly fun: XcmV1MultiassetWildFungibility;
    } & Struct;
    readonly type: 'All' | 'AllOf';
  }

  /** @name XcmV1MultiassetWildFungibility (99) */
  interface XcmV1MultiassetWildFungibility extends Enum {
    readonly isFungible: boolean;
    readonly isNonFungible: boolean;
    readonly type: 'Fungible' | 'NonFungible';
  }

  /** @name XcmV2WeightLimit (100) */
  interface XcmV2WeightLimit extends Enum {
    readonly isUnlimited: boolean;
    readonly isLimited: boolean;
    readonly asLimited: Compact<u64>;
    readonly type: 'Unlimited' | 'Limited';
  }

  /** @name XcmVersionedMultiAssets (102) */
  interface XcmVersionedMultiAssets extends Enum {
    readonly isV0: boolean;
    readonly asV0: Vec<XcmV0MultiAsset>;
    readonly isV1: boolean;
    readonly asV1: XcmV1MultiassetMultiAssets;
    readonly type: 'V0' | 'V1';
  }

  /** @name XcmV0MultiAsset (104) */
  interface XcmV0MultiAsset extends Enum {
    readonly isNone: boolean;
    readonly isAll: boolean;
    readonly isAllFungible: boolean;
    readonly isAllNonFungible: boolean;
    readonly isAllAbstractFungible: boolean;
    readonly asAllAbstractFungible: {
      readonly id: Bytes;
    } & Struct;
    readonly isAllAbstractNonFungible: boolean;
    readonly asAllAbstractNonFungible: {
      readonly class: Bytes;
    } & Struct;
    readonly isAllConcreteFungible: boolean;
    readonly asAllConcreteFungible: {
      readonly id: XcmV0MultiLocation;
    } & Struct;
    readonly isAllConcreteNonFungible: boolean;
    readonly asAllConcreteNonFungible: {
      readonly class: XcmV0MultiLocation;
    } & Struct;
    readonly isAbstractFungible: boolean;
    readonly asAbstractFungible: {
      readonly id: Bytes;
      readonly amount: Compact<u128>;
    } & Struct;
    readonly isAbstractNonFungible: boolean;
    readonly asAbstractNonFungible: {
      readonly class: Bytes;
      readonly instance: XcmV1MultiassetAssetInstance;
    } & Struct;
    readonly isConcreteFungible: boolean;
    readonly asConcreteFungible: {
      readonly id: XcmV0MultiLocation;
      readonly amount: Compact<u128>;
    } & Struct;
    readonly isConcreteNonFungible: boolean;
    readonly asConcreteNonFungible: {
      readonly class: XcmV0MultiLocation;
      readonly instance: XcmV1MultiassetAssetInstance;
    } & Struct;
    readonly type: 'None' | 'All' | 'AllFungible' | 'AllNonFungible' | 'AllAbstractFungible' | 'AllAbstractNonFungible' | 'AllConcreteFungible' | 'AllConcreteNonFungible' | 'AbstractFungible' | 'AbstractNonFungible' | 'ConcreteFungible' | 'ConcreteNonFungible';
  }

  /** @name XcmV0MultiLocation (105) */
  interface XcmV0MultiLocation extends Enum {
    readonly isNull: boolean;
    readonly isX1: boolean;
    readonly asX1: XcmV0Junction;
    readonly isX2: boolean;
    readonly asX2: ITuple<[XcmV0Junction, XcmV0Junction]>;
    readonly isX3: boolean;
    readonly asX3: ITuple<[XcmV0Junction, XcmV0Junction, XcmV0Junction]>;
    readonly isX4: boolean;
    readonly asX4: ITuple<[XcmV0Junction, XcmV0Junction, XcmV0Junction, XcmV0Junction]>;
    readonly isX5: boolean;
    readonly asX5: ITuple<[XcmV0Junction, XcmV0Junction, XcmV0Junction, XcmV0Junction, XcmV0Junction]>;
    readonly isX6: boolean;
    readonly asX6: ITuple<[XcmV0Junction, XcmV0Junction, XcmV0Junction, XcmV0Junction, XcmV0Junction, XcmV0Junction]>;
    readonly isX7: boolean;
    readonly asX7: ITuple<[XcmV0Junction, XcmV0Junction, XcmV0Junction, XcmV0Junction, XcmV0Junction, XcmV0Junction, XcmV0Junction]>;
    readonly isX8: boolean;
    readonly asX8: ITuple<[XcmV0Junction, XcmV0Junction, XcmV0Junction, XcmV0Junction, XcmV0Junction, XcmV0Junction, XcmV0Junction, XcmV0Junction]>;
    readonly type: 'Null' | 'X1' | 'X2' | 'X3' | 'X4' | 'X5' | 'X6' | 'X7' | 'X8';
  }

  /** @name XcmV0Junction (106) */
  interface XcmV0Junction extends Enum {
    readonly isParent: boolean;
    readonly isParachain: boolean;
    readonly asParachain: Compact<u32>;
    readonly isAccountId32: boolean;
    readonly asAccountId32: {
      readonly network: XcmV0JunctionNetworkId;
      readonly id: U8aFixed;
    } & Struct;
    readonly isAccountIndex64: boolean;
    readonly asAccountIndex64: {
      readonly network: XcmV0JunctionNetworkId;
      readonly index: Compact<u64>;
    } & Struct;
    readonly isAccountKey20: boolean;
    readonly asAccountKey20: {
      readonly network: XcmV0JunctionNetworkId;
      readonly key: U8aFixed;
    } & Struct;
    readonly isPalletInstance: boolean;
    readonly asPalletInstance: u8;
    readonly isGeneralIndex: boolean;
    readonly asGeneralIndex: Compact<u128>;
    readonly isGeneralKey: boolean;
    readonly asGeneralKey: Bytes;
    readonly isOnlyChild: boolean;
    readonly isPlurality: boolean;
    readonly asPlurality: {
      readonly id: XcmV0JunctionBodyId;
      readonly part: XcmV0JunctionBodyPart;
    } & Struct;
    readonly type: 'Parent' | 'Parachain' | 'AccountId32' | 'AccountIndex64' | 'AccountKey20' | 'PalletInstance' | 'GeneralIndex' | 'GeneralKey' | 'OnlyChild' | 'Plurality';
  }

  /** @name XcmVersionedMultiLocation (107) */
  interface XcmVersionedMultiLocation extends Enum {
    readonly isV0: boolean;
    readonly asV0: XcmV0MultiLocation;
    readonly isV1: boolean;
    readonly asV1: XcmV1MultiLocation;
    readonly type: 'V0' | 'V1';
  }

  /** @name CumulusPalletXcmEvent (108) */
  interface CumulusPalletXcmEvent extends Enum {
    readonly isInvalidFormat: boolean;
    readonly asInvalidFormat: U8aFixed;
    readonly isUnsupportedVersion: boolean;
    readonly asUnsupportedVersion: U8aFixed;
    readonly isExecutedDownward: boolean;
    readonly asExecutedDownward: ITuple<[U8aFixed, XcmV2TraitsOutcome]>;
    readonly type: 'InvalidFormat' | 'UnsupportedVersion' | 'ExecutedDownward';
  }

  /** @name CumulusPalletDmpQueueEvent (109) */
  interface CumulusPalletDmpQueueEvent extends Enum {
    readonly isInvalidFormat: boolean;
    readonly asInvalidFormat: {
      readonly messageId: U8aFixed;
    } & Struct;
    readonly isUnsupportedVersion: boolean;
    readonly asUnsupportedVersion: {
      readonly messageId: U8aFixed;
    } & Struct;
    readonly isExecutedDownward: boolean;
    readonly asExecutedDownward: {
      readonly messageId: U8aFixed;
      readonly outcome: XcmV2TraitsOutcome;
    } & Struct;
    readonly isWeightExhausted: boolean;
    readonly asWeightExhausted: {
      readonly messageId: U8aFixed;
      readonly remainingWeight: u64;
      readonly requiredWeight: u64;
    } & Struct;
    readonly isOverweightEnqueued: boolean;
    readonly asOverweightEnqueued: {
      readonly messageId: U8aFixed;
      readonly overweightIndex: u64;
      readonly requiredWeight: u64;
    } & Struct;
    readonly isOverweightServiced: boolean;
    readonly asOverweightServiced: {
      readonly overweightIndex: u64;
      readonly weightUsed: u64;
    } & Struct;
    readonly type: 'InvalidFormat' | 'UnsupportedVersion' | 'ExecutedDownward' | 'WeightExhausted' | 'OverweightEnqueued' | 'OverweightServiced';
  }

  /** @name OrmlXtokensModuleEvent (110) */
  interface OrmlXtokensModuleEvent extends Enum {
    readonly isTransferredMultiAssets: boolean;
    readonly asTransferredMultiAssets: {
      readonly sender: AccountId32;
      readonly assets: XcmV1MultiassetMultiAssets;
      readonly fee: XcmV1MultiAsset;
      readonly dest: XcmV1MultiLocation;
    } & Struct;
    readonly type: 'TransferredMultiAssets';
  }

  /** @name OrmlUnknownTokensModuleEvent (111) */
  interface OrmlUnknownTokensModuleEvent extends Enum {
    readonly isDeposited: boolean;
    readonly asDeposited: {
      readonly asset: XcmV1MultiAsset;
      readonly who: XcmV1MultiLocation;
    } & Struct;
    readonly isWithdrawn: boolean;
    readonly asWithdrawn: {
      readonly asset: XcmV1MultiAsset;
      readonly who: XcmV1MultiLocation;
    } & Struct;
    readonly type: 'Deposited' | 'Withdrawn';
  }

  /** @name OrmlXcmModuleEvent (112) */
  interface OrmlXcmModuleEvent extends Enum {
    readonly isSent: boolean;
    readonly asSent: {
      readonly to: XcmV1MultiLocation;
      readonly message: XcmV2Xcm;
    } & Struct;
    readonly type: 'Sent';
  }

  /** @name OrmlAuthorityModuleEvent (113) */
  interface OrmlAuthorityModuleEvent extends Enum {
    readonly isDispatched: boolean;
    readonly asDispatched: {
      readonly result: Result<Null, SpRuntimeDispatchError>;
    } & Struct;
    readonly isScheduled: boolean;
    readonly asScheduled: {
      readonly origin: AcalaRuntimeOriginCaller;
      readonly index: u32;
    } & Struct;
    readonly isFastTracked: boolean;
    readonly asFastTracked: {
      readonly origin: AcalaRuntimeOriginCaller;
      readonly index: u32;
      readonly when: u32;
    } & Struct;
    readonly isDelayed: boolean;
    readonly asDelayed: {
      readonly origin: AcalaRuntimeOriginCaller;
      readonly index: u32;
      readonly when: u32;
    } & Struct;
    readonly isCancelled: boolean;
    readonly asCancelled: {
      readonly origin: AcalaRuntimeOriginCaller;
      readonly index: u32;
    } & Struct;
    readonly isAuthorizedCall: boolean;
    readonly asAuthorizedCall: {
      readonly hash_: H256;
      readonly caller: Option<AccountId32>;
    } & Struct;
    readonly isRemovedAuthorizedCall: boolean;
    readonly asRemovedAuthorizedCall: {
      readonly hash_: H256;
    } & Struct;
    readonly isTriggeredCallBy: boolean;
    readonly asTriggeredCallBy: {
      readonly hash_: H256;
      readonly caller: AccountId32;
    } & Struct;
    readonly type: 'Dispatched' | 'Scheduled' | 'FastTracked' | 'Delayed' | 'Cancelled' | 'AuthorizedCall' | 'RemovedAuthorizedCall' | 'TriggeredCallBy';
  }

  /** @name AcalaRuntimeOriginCaller (114) */
  interface AcalaRuntimeOriginCaller extends Enum {
    readonly isSystem: boolean;
    readonly asSystem: FrameSupportDispatchRawOrigin;
    readonly isVoid: boolean;
    readonly isPolkadotXcm: boolean;
    readonly asPolkadotXcm: PalletXcmOrigin;
    readonly isCumulusXcm: boolean;
    readonly asCumulusXcm: CumulusPalletXcmOrigin;
    readonly isAuthority: boolean;
    readonly asAuthority: OrmlAuthorityDelayedOrigin;
    readonly isGeneralCouncil: boolean;
    readonly asGeneralCouncil: PalletCollectiveRawOrigin;
    readonly isFinancialCouncil: boolean;
    readonly asFinancialCouncil: PalletCollectiveRawOrigin;
    readonly isHomaCouncil: boolean;
    readonly asHomaCouncil: PalletCollectiveRawOrigin;
    readonly isTechnicalCommittee: boolean;
    readonly asTechnicalCommittee: PalletCollectiveRawOrigin;
    readonly type: 'System' | 'Void' | 'PolkadotXcm' | 'CumulusXcm' | 'Authority' | 'GeneralCouncil' | 'FinancialCouncil' | 'HomaCouncil' | 'TechnicalCommittee';
  }

  /** @name FrameSupportDispatchRawOrigin (115) */
  interface FrameSupportDispatchRawOrigin extends Enum {
    readonly isRoot: boolean;
    readonly isSigned: boolean;
    readonly asSigned: AccountId32;
    readonly isNone: boolean;
    readonly type: 'Root' | 'Signed' | 'None';
  }

  /** @name PalletXcmOrigin (116) */
  interface PalletXcmOrigin extends Enum {
    readonly isXcm: boolean;
    readonly asXcm: XcmV1MultiLocation;
    readonly isResponse: boolean;
    readonly asResponse: XcmV1MultiLocation;
    readonly type: 'Xcm' | 'Response';
  }

  /** @name CumulusPalletXcmOrigin (117) */
  interface CumulusPalletXcmOrigin extends Enum {
    readonly isRelay: boolean;
    readonly isSiblingParachain: boolean;
    readonly asSiblingParachain: u32;
    readonly type: 'Relay' | 'SiblingParachain';
  }

  /** @name OrmlAuthorityDelayedOrigin (118) */
  interface OrmlAuthorityDelayedOrigin extends Struct {
    readonly delay: u32;
    readonly origin: AcalaRuntimeOriginCaller;
  }

  /** @name PalletCollectiveRawOrigin (119) */
  interface PalletCollectiveRawOrigin extends Enum {
    readonly isMembers: boolean;
    readonly asMembers: ITuple<[u32, u32]>;
    readonly isMember: boolean;
    readonly asMember: AccountId32;
    readonly isPhantom: boolean;
    readonly type: 'Members' | 'Member' | 'Phantom';
  }

  /** @name SpCoreVoid (123) */
  type SpCoreVoid = Null;

  /** @name PalletCollectiveEvent (125) */
  interface PalletCollectiveEvent extends Enum {
    readonly isProposed: boolean;
    readonly asProposed: {
      readonly account: AccountId32;
      readonly proposalIndex: u32;
      readonly proposalHash: H256;
      readonly threshold: u32;
    } & Struct;
    readonly isVoted: boolean;
    readonly asVoted: {
      readonly account: AccountId32;
      readonly proposalHash: H256;
      readonly voted: bool;
      readonly yes: u32;
      readonly no: u32;
    } & Struct;
    readonly isApproved: boolean;
    readonly asApproved: {
      readonly proposalHash: H256;
    } & Struct;
    readonly isDisapproved: boolean;
    readonly asDisapproved: {
      readonly proposalHash: H256;
    } & Struct;
    readonly isExecuted: boolean;
    readonly asExecuted: {
      readonly proposalHash: H256;
      readonly result: Result<Null, SpRuntimeDispatchError>;
    } & Struct;
    readonly isMemberExecuted: boolean;
    readonly asMemberExecuted: {
      readonly proposalHash: H256;
      readonly result: Result<Null, SpRuntimeDispatchError>;
    } & Struct;
    readonly isClosed: boolean;
    readonly asClosed: {
      readonly proposalHash: H256;
      readonly yes: u32;
      readonly no: u32;
    } & Struct;
    readonly type: 'Proposed' | 'Voted' | 'Approved' | 'Disapproved' | 'Executed' | 'MemberExecuted' | 'Closed';
  }

  /** @name PalletMembershipEvent (127) */
  interface PalletMembershipEvent extends Enum {
    readonly isMemberAdded: boolean;
    readonly isMemberRemoved: boolean;
    readonly isMembersSwapped: boolean;
    readonly isMembersReset: boolean;
    readonly isKeyChanged: boolean;
    readonly isDummy: boolean;
    readonly type: 'MemberAdded' | 'MemberRemoved' | 'MembersSwapped' | 'MembersReset' | 'KeyChanged' | 'Dummy';
  }

  /** @name PalletDemocracyEvent (134) */
  interface PalletDemocracyEvent extends Enum {
    readonly isProposed: boolean;
    readonly asProposed: {
      readonly proposalIndex: u32;
      readonly deposit: u128;
    } & Struct;
    readonly isTabled: boolean;
    readonly asTabled: {
      readonly proposalIndex: u32;
      readonly deposit: u128;
      readonly depositors: Vec<AccountId32>;
    } & Struct;
    readonly isExternalTabled: boolean;
    readonly isStarted: boolean;
    readonly asStarted: {
      readonly refIndex: u32;
      readonly threshold: PalletDemocracyVoteThreshold;
    } & Struct;
    readonly isPassed: boolean;
    readonly asPassed: {
      readonly refIndex: u32;
    } & Struct;
    readonly isNotPassed: boolean;
    readonly asNotPassed: {
      readonly refIndex: u32;
    } & Struct;
    readonly isCancelled: boolean;
    readonly asCancelled: {
      readonly refIndex: u32;
    } & Struct;
    readonly isExecuted: boolean;
    readonly asExecuted: {
      readonly refIndex: u32;
      readonly result: Result<Null, SpRuntimeDispatchError>;
    } & Struct;
    readonly isDelegated: boolean;
    readonly asDelegated: {
      readonly who: AccountId32;
      readonly target: AccountId32;
    } & Struct;
    readonly isUndelegated: boolean;
    readonly asUndelegated: {
      readonly account: AccountId32;
    } & Struct;
    readonly isVetoed: boolean;
    readonly asVetoed: {
      readonly who: AccountId32;
      readonly proposalHash: H256;
      readonly until: u32;
    } & Struct;
    readonly isPreimageNoted: boolean;
    readonly asPreimageNoted: {
      readonly proposalHash: H256;
      readonly who: AccountId32;
      readonly deposit: u128;
    } & Struct;
    readonly isPreimageUsed: boolean;
    readonly asPreimageUsed: {
      readonly proposalHash: H256;
      readonly provider: AccountId32;
      readonly deposit: u128;
    } & Struct;
    readonly isPreimageInvalid: boolean;
    readonly asPreimageInvalid: {
      readonly proposalHash: H256;
      readonly refIndex: u32;
    } & Struct;
    readonly isPreimageMissing: boolean;
    readonly asPreimageMissing: {
      readonly proposalHash: H256;
      readonly refIndex: u32;
    } & Struct;
    readonly isPreimageReaped: boolean;
    readonly asPreimageReaped: {
      readonly proposalHash: H256;
      readonly provider: AccountId32;
      readonly deposit: u128;
      readonly reaper: AccountId32;
    } & Struct;
    readonly isBlacklisted: boolean;
    readonly asBlacklisted: {
      readonly proposalHash: H256;
    } & Struct;
    readonly isVoted: boolean;
    readonly asVoted: {
      readonly voter: AccountId32;
      readonly refIndex: u32;
      readonly vote: PalletDemocracyVoteAccountVote;
    } & Struct;
    readonly isSeconded: boolean;
    readonly asSeconded: {
      readonly seconder: AccountId32;
      readonly propIndex: u32;
    } & Struct;
    readonly isProposalCanceled: boolean;
    readonly asProposalCanceled: {
      readonly propIndex: u32;
    } & Struct;
    readonly type: 'Proposed' | 'Tabled' | 'ExternalTabled' | 'Started' | 'Passed' | 'NotPassed' | 'Cancelled' | 'Executed' | 'Delegated' | 'Undelegated' | 'Vetoed' | 'PreimageNoted' | 'PreimageUsed' | 'PreimageInvalid' | 'PreimageMissing' | 'PreimageReaped' | 'Blacklisted' | 'Voted' | 'Seconded' | 'ProposalCanceled';
  }

  /** @name PalletDemocracyVoteThreshold (135) */
  interface PalletDemocracyVoteThreshold extends Enum {
    readonly isSuperMajorityApprove: boolean;
    readonly isSuperMajorityAgainst: boolean;
    readonly isSimpleMajority: boolean;
    readonly type: 'SuperMajorityApprove' | 'SuperMajorityAgainst' | 'SimpleMajority';
  }

  /** @name PalletDemocracyVoteAccountVote (136) */
  interface PalletDemocracyVoteAccountVote extends Enum {
    readonly isStandard: boolean;
    readonly asStandard: {
      readonly vote: Vote;
      readonly balance: u128;
    } & Struct;
    readonly isSplit: boolean;
    readonly asSplit: {
      readonly aye: u128;
      readonly nay: u128;
    } & Struct;
    readonly type: 'Standard' | 'Split';
  }

  /** @name OrmlOracleModuleEvent (138) */
  interface OrmlOracleModuleEvent extends Enum {
    readonly isNewFeedData: boolean;
    readonly asNewFeedData: {
      readonly sender: AccountId32;
      readonly values: Vec<ITuple<[AcalaPrimitivesCurrencyCurrencyId, u128]>>;
    } & Struct;
    readonly type: 'NewFeedData';
  }

  /** @name OrmlAuctionModuleEvent (142) */
  interface OrmlAuctionModuleEvent extends Enum {
    readonly isBid: boolean;
    readonly asBid: {
      readonly auctionId: u32;
      readonly bidder: AccountId32;
      readonly amount: u128;
    } & Struct;
    readonly type: 'Bid';
  }

  /** @name ModulePricesModuleEvent (143) */
  interface ModulePricesModuleEvent extends Enum {
    readonly isLockPrice: boolean;
    readonly asLockPrice: {
      readonly currencyId: AcalaPrimitivesCurrencyCurrencyId;
      readonly lockedPrice: u128;
    } & Struct;
    readonly isUnlockPrice: boolean;
    readonly asUnlockPrice: {
      readonly currencyId: AcalaPrimitivesCurrencyCurrencyId;
    } & Struct;
    readonly type: 'LockPrice' | 'UnlockPrice';
  }

  /** @name ModuleDexModuleEvent (144) */
  interface ModuleDexModuleEvent extends Enum {
    readonly isAddProvision: boolean;
    readonly asAddProvision: {
      readonly who: AccountId32;
      readonly currency0: AcalaPrimitivesCurrencyCurrencyId;
      readonly contribution0: u128;
      readonly currency1: AcalaPrimitivesCurrencyCurrencyId;
      readonly contribution1: u128;
    } & Struct;
    readonly isAddLiquidity: boolean;
    readonly asAddLiquidity: {
      readonly who: AccountId32;
      readonly currency0: AcalaPrimitivesCurrencyCurrencyId;
      readonly pool0: u128;
      readonly currency1: AcalaPrimitivesCurrencyCurrencyId;
      readonly pool1: u128;
      readonly shareIncrement: u128;
    } & Struct;
    readonly isRemoveLiquidity: boolean;
    readonly asRemoveLiquidity: {
      readonly who: AccountId32;
      readonly currency0: AcalaPrimitivesCurrencyCurrencyId;
      readonly pool0: u128;
      readonly currency1: AcalaPrimitivesCurrencyCurrencyId;
      readonly pool1: u128;
      readonly shareDecrement: u128;
    } & Struct;
    readonly isSwap: boolean;
    readonly asSwap: {
      readonly trader: AccountId32;
      readonly path: Vec<AcalaPrimitivesCurrencyCurrencyId>;
      readonly liquidityChanges: Vec<u128>;
    } & Struct;
    readonly isEnableTradingPair: boolean;
    readonly asEnableTradingPair: {
      readonly tradingPair: AcalaPrimitivesTradingPair;
    } & Struct;
    readonly isListProvisioning: boolean;
    readonly asListProvisioning: {
      readonly tradingPair: AcalaPrimitivesTradingPair;
    } & Struct;
    readonly isDisableTradingPair: boolean;
    readonly asDisableTradingPair: {
      readonly tradingPair: AcalaPrimitivesTradingPair;
    } & Struct;
    readonly isProvisioningToEnabled: boolean;
    readonly asProvisioningToEnabled: {
      readonly tradingPair: AcalaPrimitivesTradingPair;
      readonly pool0: u128;
      readonly pool1: u128;
      readonly shareAmount: u128;
    } & Struct;
    readonly isRefundProvision: boolean;
    readonly asRefundProvision: {
      readonly who: AccountId32;
      readonly currency0: AcalaPrimitivesCurrencyCurrencyId;
      readonly contribution0: u128;
      readonly currency1: AcalaPrimitivesCurrencyCurrencyId;
      readonly contribution1: u128;
    } & Struct;
    readonly isProvisioningAborted: boolean;
    readonly asProvisioningAborted: {
      readonly tradingPair: AcalaPrimitivesTradingPair;
      readonly accumulatedProvision0: u128;
      readonly accumulatedProvision1: u128;
    } & Struct;
    readonly type: 'AddProvision' | 'AddLiquidity' | 'RemoveLiquidity' | 'Swap' | 'EnableTradingPair' | 'ListProvisioning' | 'DisableTradingPair' | 'ProvisioningToEnabled' | 'RefundProvision' | 'ProvisioningAborted';
  }

  /** @name AcalaPrimitivesTradingPair (147) */
  interface AcalaPrimitivesTradingPair extends ITuple<[AcalaPrimitivesCurrencyCurrencyId, AcalaPrimitivesCurrencyCurrencyId]> {}

  /** @name ModuleAuctionManagerModuleEvent (148) */
  interface ModuleAuctionManagerModuleEvent extends Enum {
    readonly isNewCollateralAuction: boolean;
    readonly asNewCollateralAuction: {
      readonly auctionId: u32;
      readonly collateralType: AcalaPrimitivesCurrencyCurrencyId;
      readonly collateralAmount: u128;
      readonly targetBidPrice: u128;
    } & Struct;
    readonly isCancelAuction: boolean;
    readonly asCancelAuction: {
      readonly auctionId: u32;
    } & Struct;
    readonly isCollateralAuctionDealt: boolean;
    readonly asCollateralAuctionDealt: {
      readonly auctionId: u32;
      readonly collateralType: AcalaPrimitivesCurrencyCurrencyId;
      readonly collateralAmount: u128;
      readonly winner: AccountId32;
      readonly paymentAmount: u128;
    } & Struct;
    readonly isDexTakeCollateralAuction: boolean;
    readonly asDexTakeCollateralAuction: {
      readonly auctionId: u32;
      readonly collateralType: AcalaPrimitivesCurrencyCurrencyId;
      readonly collateralAmount: u128;
      readonly supplyCollateralAmount: u128;
      readonly targetStableAmount: u128;
    } & Struct;
    readonly isCollateralAuctionAborted: boolean;
    readonly asCollateralAuctionAborted: {
      readonly auctionId: u32;
      readonly collateralType: AcalaPrimitivesCurrencyCurrencyId;
      readonly collateralAmount: u128;
      readonly targetStableAmount: u128;
      readonly refundRecipient: AccountId32;
    } & Struct;
    readonly type: 'NewCollateralAuction' | 'CancelAuction' | 'CollateralAuctionDealt' | 'DexTakeCollateralAuction' | 'CollateralAuctionAborted';
  }

  /** @name ModuleLoansModuleEvent (149) */
  interface ModuleLoansModuleEvent extends Enum {
    readonly isPositionUpdated: boolean;
    readonly asPositionUpdated: {
      readonly owner: AccountId32;
      readonly collateralType: AcalaPrimitivesCurrencyCurrencyId;
      readonly collateralAdjustment: i128;
      readonly debitAdjustment: i128;
    } & Struct;
    readonly isConfiscateCollateralAndDebit: boolean;
    readonly asConfiscateCollateralAndDebit: {
      readonly owner: AccountId32;
      readonly collateralType: AcalaPrimitivesCurrencyCurrencyId;
      readonly confiscatedCollateralAmount: u128;
      readonly deductDebitAmount: u128;
    } & Struct;
    readonly isTransferLoan: boolean;
    readonly asTransferLoan: {
      readonly from: AccountId32;
      readonly to: AccountId32;
      readonly currencyId: AcalaPrimitivesCurrencyCurrencyId;
    } & Struct;
    readonly type: 'PositionUpdated' | 'ConfiscateCollateralAndDebit' | 'TransferLoan';
  }

  /** @name ModuleHonzonModuleEvent (151) */
  interface ModuleHonzonModuleEvent extends Enum {
    readonly isAuthorization: boolean;
    readonly asAuthorization: {
      readonly authorizer: AccountId32;
      readonly authorizee: AccountId32;
      readonly collateralType: AcalaPrimitivesCurrencyCurrencyId;
    } & Struct;
    readonly isUnAuthorization: boolean;
    readonly asUnAuthorization: {
      readonly authorizer: AccountId32;
      readonly authorizee: AccountId32;
      readonly collateralType: AcalaPrimitivesCurrencyCurrencyId;
    } & Struct;
    readonly isUnAuthorizationAll: boolean;
    readonly asUnAuthorizationAll: {
      readonly authorizer: AccountId32;
    } & Struct;
    readonly isTransferDebit: boolean;
    readonly asTransferDebit: {
      readonly fromCurrency: AcalaPrimitivesCurrencyCurrencyId;
      readonly toCurrency: AcalaPrimitivesCurrencyCurrencyId;
      readonly amount: u128;
    } & Struct;
    readonly type: 'Authorization' | 'UnAuthorization' | 'UnAuthorizationAll' | 'TransferDebit';
  }

  /** @name ModuleCdpTreasuryModuleEvent (152) */
  interface ModuleCdpTreasuryModuleEvent extends Enum {
    readonly isExpectedCollateralAuctionSizeUpdated: boolean;
    readonly asExpectedCollateralAuctionSizeUpdated: {
      readonly collateralType: AcalaPrimitivesCurrencyCurrencyId;
      readonly newSize: u128;
    } & Struct;
    readonly type: 'ExpectedCollateralAuctionSizeUpdated';
  }

  /** @name ModuleCdpEngineModuleEvent (153) */
  interface ModuleCdpEngineModuleEvent extends Enum {
    readonly isLiquidateUnsafeCDP: boolean;
    readonly asLiquidateUnsafeCDP: {
      readonly collateralType: AcalaPrimitivesCurrencyCurrencyId;
      readonly owner: AccountId32;
      readonly collateralAmount: u128;
      readonly badDebtValue: u128;
      readonly targetAmount: u128;
    } & Struct;
    readonly isSettleCDPInDebit: boolean;
    readonly asSettleCDPInDebit: {
      readonly collateralType: AcalaPrimitivesCurrencyCurrencyId;
      readonly owner: AccountId32;
    } & Struct;
    readonly isCloseCDPInDebitByDEX: boolean;
    readonly asCloseCDPInDebitByDEX: {
      readonly collateralType: AcalaPrimitivesCurrencyCurrencyId;
      readonly owner: AccountId32;
      readonly soldCollateralAmount: u128;
      readonly refundCollateralAmount: u128;
      readonly debitValue: u128;
    } & Struct;
    readonly isInterestRatePerSecUpdated: boolean;
    readonly asInterestRatePerSecUpdated: {
      readonly collateralType: AcalaPrimitivesCurrencyCurrencyId;
      readonly newInterestRatePerSec: Option<u128>;
    } & Struct;
    readonly isLiquidationRatioUpdated: boolean;
    readonly asLiquidationRatioUpdated: {
      readonly collateralType: AcalaPrimitivesCurrencyCurrencyId;
      readonly newLiquidationRatio: Option<u128>;
    } & Struct;
    readonly isLiquidationPenaltyUpdated: boolean;
    readonly asLiquidationPenaltyUpdated: {
      readonly collateralType: AcalaPrimitivesCurrencyCurrencyId;
      readonly newLiquidationPenalty: Option<u128>;
    } & Struct;
    readonly isRequiredCollateralRatioUpdated: boolean;
    readonly asRequiredCollateralRatioUpdated: {
      readonly collateralType: AcalaPrimitivesCurrencyCurrencyId;
      readonly newRequiredCollateralRatio: Option<u128>;
    } & Struct;
    readonly isMaximumTotalDebitValueUpdated: boolean;
    readonly asMaximumTotalDebitValueUpdated: {
      readonly collateralType: AcalaPrimitivesCurrencyCurrencyId;
      readonly newTotalDebitValue: u128;
    } & Struct;
    readonly isLiquidationContractRegistered: boolean;
    readonly asLiquidationContractRegistered: {
      readonly address: H160;
    } & Struct;
    readonly isLiquidationContractDeregistered: boolean;
    readonly asLiquidationContractDeregistered: {
      readonly address: H160;
    } & Struct;
    readonly type: 'LiquidateUnsafeCDP' | 'SettleCDPInDebit' | 'CloseCDPInDebitByDEX' | 'InterestRatePerSecUpdated' | 'LiquidationRatioUpdated' | 'LiquidationPenaltyUpdated' | 'RequiredCollateralRatioUpdated' | 'MaximumTotalDebitValueUpdated' | 'LiquidationContractRegistered' | 'LiquidationContractDeregistered';
  }

  /** @name ModuleEmergencyShutdownModuleEvent (155) */
  interface ModuleEmergencyShutdownModuleEvent extends Enum {
    readonly isShutdown: boolean;
    readonly asShutdown: {
      readonly blockNumber: u32;
    } & Struct;
    readonly isOpenRefund: boolean;
    readonly asOpenRefund: {
      readonly blockNumber: u32;
    } & Struct;
    readonly isRefund: boolean;
    readonly asRefund: {
      readonly who: AccountId32;
      readonly stableCoinAmount: u128;
      readonly refundList: Vec<ITuple<[AcalaPrimitivesCurrencyCurrencyId, u128]>>;
    } & Struct;
    readonly type: 'Shutdown' | 'OpenRefund' | 'Refund';
  }

  /** @name ModuleHomaModuleEvent (158) */
  interface ModuleHomaModuleEvent extends Enum {
    readonly isMinted: boolean;
    readonly asMinted: {
      readonly minter: AccountId32;
      readonly stakingCurrencyAmount: u128;
      readonly liquidAmountReceived: u128;
      readonly liquidAmountAddedToVoid: u128;
    } & Struct;
    readonly isRequestedRedeem: boolean;
    readonly asRequestedRedeem: {
      readonly redeemer: AccountId32;
      readonly liquidAmount: u128;
      readonly allowFastMatch: bool;
    } & Struct;
    readonly isRedeemRequestCancelled: boolean;
    readonly asRedeemRequestCancelled: {
      readonly redeemer: AccountId32;
      readonly cancelledLiquidAmount: u128;
    } & Struct;
    readonly isRedeemedByFastMatch: boolean;
    readonly asRedeemedByFastMatch: {
      readonly redeemer: AccountId32;
      readonly matchedLiquidAmount: u128;
      readonly feeInLiquid: u128;
      readonly redeemedStakingAmount: u128;
    } & Struct;
    readonly isRedeemedByUnbond: boolean;
    readonly asRedeemedByUnbond: {
      readonly redeemer: AccountId32;
      readonly eraIndexWhenUnbond: u32;
      readonly liquidAmount: u128;
      readonly unbondingStakingAmount: u128;
    } & Struct;
    readonly isWithdrawRedemption: boolean;
    readonly asWithdrawRedemption: {
      readonly redeemer: AccountId32;
      readonly redemptionAmount: u128;
    } & Struct;
    readonly isCurrentEraBumped: boolean;
    readonly asCurrentEraBumped: {
      readonly newEraIndex: u32;
    } & Struct;
    readonly isCurrentEraReset: boolean;
    readonly asCurrentEraReset: {
      readonly newEraIndex: u32;
    } & Struct;
    readonly isLedgerBondedReset: boolean;
    readonly asLedgerBondedReset: {
      readonly subAccountIndex: u16;
      readonly newBondedAmount: u128;
    } & Struct;
    readonly isLedgerUnlockingReset: boolean;
    readonly asLedgerUnlockingReset: {
      readonly subAccountIndex: u16;
      readonly newUnlocking: Vec<ModuleHomaModuleUnlockChunk>;
    } & Struct;
    readonly isSoftBondedCapPerSubAccountUpdated: boolean;
    readonly asSoftBondedCapPerSubAccountUpdated: {
      readonly capAmount: u128;
    } & Struct;
    readonly isEstimatedRewardRatePerEraUpdated: boolean;
    readonly asEstimatedRewardRatePerEraUpdated: {
      readonly rewardRate: u128;
    } & Struct;
    readonly isCommissionRateUpdated: boolean;
    readonly asCommissionRateUpdated: {
      readonly commissionRate: u128;
    } & Struct;
    readonly isFastMatchFeeRateUpdated: boolean;
    readonly asFastMatchFeeRateUpdated: {
      readonly fastMatchFeeRate: u128;
    } & Struct;
    readonly isLastEraBumpedBlockUpdated: boolean;
    readonly asLastEraBumpedBlockUpdated: {
      readonly lastEraBumpedBlock: u32;
    } & Struct;
    readonly isBumpEraFrequencyUpdated: boolean;
    readonly asBumpEraFrequencyUpdated: {
      readonly frequency: u32;
    } & Struct;
    readonly type: 'Minted' | 'RequestedRedeem' | 'RedeemRequestCancelled' | 'RedeemedByFastMatch' | 'RedeemedByUnbond' | 'WithdrawRedemption' | 'CurrentEraBumped' | 'CurrentEraReset' | 'LedgerBondedReset' | 'LedgerUnlockingReset' | 'SoftBondedCapPerSubAccountUpdated' | 'EstimatedRewardRatePerEraUpdated' | 'CommissionRateUpdated' | 'FastMatchFeeRateUpdated' | 'LastEraBumpedBlockUpdated' | 'BumpEraFrequencyUpdated';
  }

  /** @name ModuleHomaModuleUnlockChunk (160) */
  interface ModuleHomaModuleUnlockChunk extends Struct {
    readonly value: Compact<u128>;
    readonly era: Compact<u32>;
  }

  /** @name ModuleXcmInterfaceModuleEvent (161) */
  interface ModuleXcmInterfaceModuleEvent extends Enum {
    readonly isXcmDestWeightUpdated: boolean;
    readonly asXcmDestWeightUpdated: {
      readonly xcmOperation: ModuleXcmInterfaceModuleXcmInterfaceOperation;
      readonly newXcmDestWeight: u64;
    } & Struct;
    readonly isXcmFeeUpdated: boolean;
    readonly asXcmFeeUpdated: {
      readonly xcmOperation: ModuleXcmInterfaceModuleXcmInterfaceOperation;
      readonly newXcmDestWeight: u128;
    } & Struct;
    readonly type: 'XcmDestWeightUpdated' | 'XcmFeeUpdated';
  }

  /** @name ModuleXcmInterfaceModuleXcmInterfaceOperation (162) */
  interface ModuleXcmInterfaceModuleXcmInterfaceOperation extends Enum {
    readonly isXtokensTransfer: boolean;
    readonly isHomaWithdrawUnbonded: boolean;
    readonly isHomaBondExtra: boolean;
    readonly isHomaUnbond: boolean;
    readonly isParachainFee: boolean;
    readonly asParachainFee: XcmV1MultiLocation;
    readonly type: 'XtokensTransfer' | 'HomaWithdrawUnbonded' | 'HomaBondExtra' | 'HomaUnbond' | 'ParachainFee';
  }

  /** @name ModuleIncentivesModuleEvent (163) */
  interface ModuleIncentivesModuleEvent extends Enum {
    readonly isDepositDexShare: boolean;
    readonly asDepositDexShare: {
      readonly who: AccountId32;
      readonly dexShareType: AcalaPrimitivesCurrencyCurrencyId;
      readonly deposit: u128;
    } & Struct;
    readonly isWithdrawDexShare: boolean;
    readonly asWithdrawDexShare: {
      readonly who: AccountId32;
      readonly dexShareType: AcalaPrimitivesCurrencyCurrencyId;
      readonly withdraw: u128;
    } & Struct;
    readonly isClaimRewards: boolean;
    readonly asClaimRewards: {
      readonly who: AccountId32;
      readonly pool: ModuleSupportIncentivesPoolId;
      readonly rewardCurrencyId: AcalaPrimitivesCurrencyCurrencyId;
      readonly actualAmount: u128;
      readonly deductionAmount: u128;
    } & Struct;
    readonly isIncentiveRewardAmountUpdated: boolean;
    readonly asIncentiveRewardAmountUpdated: {
      readonly pool: ModuleSupportIncentivesPoolId;
      readonly rewardCurrencyId: AcalaPrimitivesCurrencyCurrencyId;
      readonly rewardAmountPerPeriod: u128;
    } & Struct;
    readonly isClaimRewardDeductionRateUpdated: boolean;
    readonly asClaimRewardDeductionRateUpdated: {
      readonly pool: ModuleSupportIncentivesPoolId;
      readonly deductionRate: u128;
    } & Struct;
    readonly type: 'DepositDexShare' | 'WithdrawDexShare' | 'ClaimRewards' | 'IncentiveRewardAmountUpdated' | 'ClaimRewardDeductionRateUpdated';
  }

  /** @name ModuleSupportIncentivesPoolId (164) */
  interface ModuleSupportIncentivesPoolId extends Enum {
    readonly isLoans: boolean;
    readonly asLoans: AcalaPrimitivesCurrencyCurrencyId;
    readonly isDex: boolean;
    readonly asDex: AcalaPrimitivesCurrencyCurrencyId;
    readonly type: 'Loans' | 'Dex';
  }

  /** @name ModuleNftModuleEvent (165) */
  interface ModuleNftModuleEvent extends Enum {
    readonly isCreatedClass: boolean;
    readonly asCreatedClass: {
      readonly owner: AccountId32;
      readonly classId: u32;
    } & Struct;
    readonly isMintedToken: boolean;
    readonly asMintedToken: {
      readonly from: AccountId32;
      readonly to: AccountId32;
      readonly classId: u32;
      readonly quantity: u32;
    } & Struct;
    readonly isTransferredToken: boolean;
    readonly asTransferredToken: {
      readonly from: AccountId32;
      readonly to: AccountId32;
      readonly classId: u32;
      readonly tokenId: u64;
    } & Struct;
    readonly isBurnedToken: boolean;
    readonly asBurnedToken: {
      readonly owner: AccountId32;
      readonly classId: u32;
      readonly tokenId: u64;
    } & Struct;
    readonly isBurnedTokenWithRemark: boolean;
    readonly asBurnedTokenWithRemark: {
      readonly owner: AccountId32;
      readonly classId: u32;
      readonly tokenId: u64;
      readonly remarkHash: H256;
    } & Struct;
    readonly isDestroyedClass: boolean;
    readonly asDestroyedClass: {
      readonly owner: AccountId32;
      readonly classId: u32;
    } & Struct;
    readonly type: 'CreatedClass' | 'MintedToken' | 'TransferredToken' | 'BurnedToken' | 'BurnedTokenWithRemark' | 'DestroyedClass';
  }

  /** @name ModuleAssetRegistryModuleEvent (166) */
  interface ModuleAssetRegistryModuleEvent extends Enum {
    readonly isForeignAssetRegistered: boolean;
    readonly asForeignAssetRegistered: {
      readonly assetId: u16;
      readonly assetAddress: XcmV1MultiLocation;
      readonly metadata: AcalaPrimitivesCurrencyAssetMetadata;
    } & Struct;
    readonly isForeignAssetUpdated: boolean;
    readonly asForeignAssetUpdated: {
      readonly assetId: u16;
      readonly assetAddress: XcmV1MultiLocation;
      readonly metadata: AcalaPrimitivesCurrencyAssetMetadata;
    } & Struct;
    readonly isAssetRegistered: boolean;
    readonly asAssetRegistered: {
      readonly assetId: AcalaPrimitivesCurrencyAssetIds;
      readonly metadata: AcalaPrimitivesCurrencyAssetMetadata;
    } & Struct;
    readonly isAssetUpdated: boolean;
    readonly asAssetUpdated: {
      readonly assetId: AcalaPrimitivesCurrencyAssetIds;
      readonly metadata: AcalaPrimitivesCurrencyAssetMetadata;
    } & Struct;
    readonly type: 'ForeignAssetRegistered' | 'ForeignAssetUpdated' | 'AssetRegistered' | 'AssetUpdated';
  }

  /** @name AcalaPrimitivesCurrencyAssetMetadata (167) */
  interface AcalaPrimitivesCurrencyAssetMetadata extends Struct {
    readonly name: Bytes;
    readonly symbol: Bytes;
    readonly decimals: u8;
    readonly minimalBalance: u128;
  }

  /** @name AcalaPrimitivesCurrencyAssetIds (168) */
  interface AcalaPrimitivesCurrencyAssetIds extends Enum {
    readonly isErc20: boolean;
    readonly asErc20: H160;
    readonly isStableAssetId: boolean;
    readonly asStableAssetId: u32;
    readonly isForeignAssetId: boolean;
    readonly asForeignAssetId: u16;
    readonly isNativeAssetId: boolean;
    readonly asNativeAssetId: AcalaPrimitivesCurrencyCurrencyId;
    readonly type: 'Erc20' | 'StableAssetId' | 'ForeignAssetId' | 'NativeAssetId';
  }

  /** @name ModuleEvmModuleEvent (169) */
  interface ModuleEvmModuleEvent extends Enum {
    readonly isCreated: boolean;
    readonly asCreated: {
      readonly from: H160;
      readonly contract: H160;
      readonly logs: Vec<EthereumLog>;
      readonly usedGas: u64;
      readonly usedStorage: i32;
    } & Struct;
    readonly isCreatedFailed: boolean;
    readonly asCreatedFailed: {
      readonly from: H160;
      readonly contract: H160;
      readonly exitReason: EvmCoreErrorExitReason;
      readonly logs: Vec<EthereumLog>;
      readonly usedGas: u64;
      readonly usedStorage: i32;
    } & Struct;
    readonly isExecuted: boolean;
    readonly asExecuted: {
      readonly from: H160;
      readonly contract: H160;
      readonly logs: Vec<EthereumLog>;
      readonly usedGas: u64;
      readonly usedStorage: i32;
    } & Struct;
    readonly isExecutedFailed: boolean;
    readonly asExecutedFailed: {
      readonly from: H160;
      readonly contract: H160;
      readonly exitReason: EvmCoreErrorExitReason;
      readonly output: Bytes;
      readonly logs: Vec<EthereumLog>;
      readonly usedGas: u64;
      readonly usedStorage: i32;
    } & Struct;
    readonly isTransferredMaintainer: boolean;
    readonly asTransferredMaintainer: {
      readonly contract: H160;
      readonly newMaintainer: H160;
    } & Struct;
    readonly isContractDevelopmentEnabled: boolean;
    readonly asContractDevelopmentEnabled: {
      readonly who: AccountId32;
    } & Struct;
    readonly isContractDevelopmentDisabled: boolean;
    readonly asContractDevelopmentDisabled: {
      readonly who: AccountId32;
    } & Struct;
    readonly isContractPublished: boolean;
    readonly asContractPublished: {
      readonly contract: H160;
    } & Struct;
    readonly isContractSetCode: boolean;
    readonly asContractSetCode: {
      readonly contract: H160;
    } & Struct;
    readonly isContractSelfdestructed: boolean;
    readonly asContractSelfdestructed: {
      readonly contract: H160;
    } & Struct;
    readonly type: 'Created' | 'CreatedFailed' | 'Executed' | 'ExecutedFailed' | 'TransferredMaintainer' | 'ContractDevelopmentEnabled' | 'ContractDevelopmentDisabled' | 'ContractPublished' | 'ContractSetCode' | 'ContractSelfdestructed';
  }

  /** @name EthereumLog (171) */
  interface EthereumLog extends Struct {
    readonly address: H160;
    readonly topics: Vec<H256>;
    readonly data: Bytes;
  }

  /** @name EvmCoreErrorExitReason (174) */
  interface EvmCoreErrorExitReason extends Enum {
    readonly isSucceed: boolean;
    readonly asSucceed: EvmCoreErrorExitSucceed;
    readonly isError: boolean;
    readonly asError: EvmCoreErrorExitError;
    readonly isRevert: boolean;
    readonly asRevert: EvmCoreErrorExitRevert;
    readonly isFatal: boolean;
    readonly asFatal: EvmCoreErrorExitFatal;
    readonly type: 'Succeed' | 'Error' | 'Revert' | 'Fatal';
  }

  /** @name EvmCoreErrorExitSucceed (175) */
  interface EvmCoreErrorExitSucceed extends Enum {
    readonly isStopped: boolean;
    readonly isReturned: boolean;
    readonly isSuicided: boolean;
    readonly type: 'Stopped' | 'Returned' | 'Suicided';
  }

  /** @name EvmCoreErrorExitError (176) */
  interface EvmCoreErrorExitError extends Enum {
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
    readonly isInvalidCode: boolean;
    readonly type: 'StackUnderflow' | 'StackOverflow' | 'InvalidJump' | 'InvalidRange' | 'DesignatedInvalid' | 'CallTooDeep' | 'CreateCollision' | 'CreateContractLimit' | 'OutOfOffset' | 'OutOfGas' | 'OutOfFund' | 'PcUnderflow' | 'CreateEmpty' | 'Other' | 'InvalidCode';
  }

  /** @name EvmCoreErrorExitRevert (179) */
  interface EvmCoreErrorExitRevert extends Enum {
    readonly isReverted: boolean;
    readonly type: 'Reverted';
  }

  /** @name EvmCoreErrorExitFatal (180) */
  interface EvmCoreErrorExitFatal extends Enum {
    readonly isNotSupported: boolean;
    readonly isUnhandledInterrupt: boolean;
    readonly isCallErrorAsFatal: boolean;
    readonly asCallErrorAsFatal: EvmCoreErrorExitError;
    readonly isOther: boolean;
    readonly asOther: Text;
    readonly type: 'NotSupported' | 'UnhandledInterrupt' | 'CallErrorAsFatal' | 'Other';
  }

  /** @name ModuleEvmAccountsModuleEvent (181) */
  interface ModuleEvmAccountsModuleEvent extends Enum {
    readonly isClaimAccount: boolean;
    readonly asClaimAccount: {
      readonly accountId: AccountId32;
      readonly evmAddress: H160;
    } & Struct;
    readonly type: 'ClaimAccount';
  }

  /** @name NutsfinanceStableAssetEvent (182) */
  interface NutsfinanceStableAssetEvent extends Enum {
    readonly isCreatePool: boolean;
    readonly asCreatePool: {
      readonly poolId: u32;
      readonly a: u128;
      readonly swapId: AccountId32;
      readonly palletId: AccountId32;
    } & Struct;
    readonly isMinted: boolean;
    readonly asMinted: {
      readonly minter: AccountId32;
      readonly poolId: u32;
      readonly a: u128;
      readonly inputAmounts: Vec<u128>;
      readonly minOutputAmount: u128;
      readonly balances: Vec<u128>;
      readonly totalSupply: u128;
      readonly feeAmount: u128;
      readonly outputAmount: u128;
    } & Struct;
    readonly isTokenSwapped: boolean;
    readonly asTokenSwapped: {
      readonly swapper: AccountId32;
      readonly poolId: u32;
      readonly a: u128;
      readonly inputAsset: AcalaPrimitivesCurrencyCurrencyId;
      readonly outputAsset: AcalaPrimitivesCurrencyCurrencyId;
      readonly inputAmount: u128;
      readonly minOutputAmount: u128;
      readonly balances: Vec<u128>;
      readonly totalSupply: u128;
      readonly outputAmount: u128;
    } & Struct;
    readonly isRedeemedProportion: boolean;
    readonly asRedeemedProportion: {
      readonly redeemer: AccountId32;
      readonly poolId: u32;
      readonly a: u128;
      readonly inputAmount: u128;
      readonly minOutputAmounts: Vec<u128>;
      readonly balances: Vec<u128>;
      readonly totalSupply: u128;
      readonly feeAmount: u128;
      readonly outputAmounts: Vec<u128>;
    } & Struct;
    readonly isRedeemedSingle: boolean;
    readonly asRedeemedSingle: {
      readonly redeemer: AccountId32;
      readonly poolId: u32;
      readonly a: u128;
      readonly inputAmount: u128;
      readonly outputAsset: AcalaPrimitivesCurrencyCurrencyId;
      readonly minOutputAmount: u128;
      readonly balances: Vec<u128>;
      readonly totalSupply: u128;
      readonly feeAmount: u128;
      readonly outputAmount: u128;
    } & Struct;
    readonly isRedeemedMulti: boolean;
    readonly asRedeemedMulti: {
      readonly redeemer: AccountId32;
      readonly poolId: u32;
      readonly a: u128;
      readonly outputAmounts: Vec<u128>;
      readonly maxInputAmount: u128;
      readonly balances: Vec<u128>;
      readonly totalSupply: u128;
      readonly feeAmount: u128;
      readonly inputAmount: u128;
    } & Struct;
    readonly isBalanceUpdated: boolean;
    readonly asBalanceUpdated: {
      readonly poolId: u32;
      readonly oldBalances: Vec<u128>;
      readonly newBalances: Vec<u128>;
    } & Struct;
    readonly isYieldCollected: boolean;
    readonly asYieldCollected: {
      readonly poolId: u32;
      readonly a: u128;
      readonly oldTotalSupply: u128;
      readonly newTotalSupply: u128;
      readonly who: AccountId32;
      readonly amount: u128;
    } & Struct;
    readonly isFeeCollected: boolean;
    readonly asFeeCollected: {
      readonly poolId: u32;
      readonly a: u128;
      readonly oldBalances: Vec<u128>;
      readonly newBalances: Vec<u128>;
      readonly oldTotalSupply: u128;
      readonly newTotalSupply: u128;
      readonly who: AccountId32;
      readonly amount: u128;
    } & Struct;
    readonly isAModified: boolean;
    readonly asAModified: {
      readonly poolId: u32;
      readonly value: u128;
      readonly time: u32;
    } & Struct;
    readonly isFeeModified: boolean;
    readonly asFeeModified: {
      readonly poolId: u32;
      readonly mintFee: u128;
      readonly swapFee: u128;
      readonly redeemFee: u128;
    } & Struct;
    readonly isRecipientModified: boolean;
    readonly asRecipientModified: {
      readonly poolId: u32;
      readonly feeRecipient: AccountId32;
      readonly yieldRecipient: AccountId32;
    } & Struct;
    readonly type: 'CreatePool' | 'Minted' | 'TokenSwapped' | 'RedeemedProportion' | 'RedeemedSingle' | 'RedeemedMulti' | 'BalanceUpdated' | 'YieldCollected' | 'FeeCollected' | 'AModified' | 'FeeModified' | 'RecipientModified';
  }

  /** @name CumulusPalletParachainSystemEvent (183) */
  interface CumulusPalletParachainSystemEvent extends Enum {
    readonly isValidationFunctionStored: boolean;
    readonly isValidationFunctionApplied: boolean;
    readonly asValidationFunctionApplied: {
      readonly relayChainBlockNum: u32;
    } & Struct;
    readonly isValidationFunctionDiscarded: boolean;
    readonly isUpgradeAuthorized: boolean;
    readonly asUpgradeAuthorized: {
      readonly codeHash: H256;
    } & Struct;
    readonly isDownwardMessagesReceived: boolean;
    readonly asDownwardMessagesReceived: {
      readonly count: u32;
    } & Struct;
    readonly isDownwardMessagesProcessed: boolean;
    readonly asDownwardMessagesProcessed: {
      readonly weightUsed: u64;
      readonly dmqHead: H256;
    } & Struct;
    readonly type: 'ValidationFunctionStored' | 'ValidationFunctionApplied' | 'ValidationFunctionDiscarded' | 'UpgradeAuthorized' | 'DownwardMessagesReceived' | 'DownwardMessagesProcessed';
  }

  /** @name PalletSudoEvent (184) */
  interface PalletSudoEvent extends Enum {
    readonly isSudid: boolean;
    readonly asSudid: {
      readonly sudoResult: Result<Null, SpRuntimeDispatchError>;
    } & Struct;
    readonly isKeyChanged: boolean;
    readonly asKeyChanged: {
      readonly oldSudoer: Option<AccountId32>;
    } & Struct;
    readonly isSudoAsDone: boolean;
    readonly asSudoAsDone: {
      readonly sudoResult: Result<Null, SpRuntimeDispatchError>;
    } & Struct;
    readonly type: 'Sudid' | 'KeyChanged' | 'SudoAsDone';
  }

  /** @name FrameSystemPhase (185) */
  interface FrameSystemPhase extends Enum {
    readonly isApplyExtrinsic: boolean;
    readonly asApplyExtrinsic: u32;
    readonly isFinalization: boolean;
    readonly isInitialization: boolean;
    readonly type: 'ApplyExtrinsic' | 'Finalization' | 'Initialization';
  }

  /** @name FrameSystemLastRuntimeUpgradeInfo (187) */
  interface FrameSystemLastRuntimeUpgradeInfo extends Struct {
    readonly specVersion: Compact<u32>;
    readonly specName: Text;
  }

  /** @name FrameSystemCall (188) */
  interface FrameSystemCall extends Enum {
    readonly isFillBlock: boolean;
    readonly asFillBlock: {
      readonly ratio: Perbill;
    } & Struct;
    readonly isRemark: boolean;
    readonly asRemark: {
      readonly remark: Bytes;
    } & Struct;
    readonly isSetHeapPages: boolean;
    readonly asSetHeapPages: {
      readonly pages: u64;
    } & Struct;
    readonly isSetCode: boolean;
    readonly asSetCode: {
      readonly code: Bytes;
    } & Struct;
    readonly isSetCodeWithoutChecks: boolean;
    readonly asSetCodeWithoutChecks: {
      readonly code: Bytes;
    } & Struct;
    readonly isSetStorage: boolean;
    readonly asSetStorage: {
      readonly items: Vec<ITuple<[Bytes, Bytes]>>;
    } & Struct;
    readonly isKillStorage: boolean;
    readonly asKillStorage: {
      readonly keys_: Vec<Bytes>;
    } & Struct;
    readonly isKillPrefix: boolean;
    readonly asKillPrefix: {
      readonly prefix: Bytes;
      readonly subkeys: u32;
    } & Struct;
    readonly isRemarkWithEvent: boolean;
    readonly asRemarkWithEvent: {
      readonly remark: Bytes;
    } & Struct;
    readonly type: 'FillBlock' | 'Remark' | 'SetHeapPages' | 'SetCode' | 'SetCodeWithoutChecks' | 'SetStorage' | 'KillStorage' | 'KillPrefix' | 'RemarkWithEvent';
  }

  /** @name FrameSystemLimitsBlockWeights (193) */
  interface FrameSystemLimitsBlockWeights extends Struct {
    readonly baseBlock: u64;
    readonly maxBlock: u64;
    readonly perClass: FrameSupportWeightsPerDispatchClassWeightsPerClass;
  }

  /** @name FrameSupportWeightsPerDispatchClassWeightsPerClass (194) */
  interface FrameSupportWeightsPerDispatchClassWeightsPerClass extends Struct {
    readonly normal: FrameSystemLimitsWeightsPerClass;
    readonly operational: FrameSystemLimitsWeightsPerClass;
    readonly mandatory: FrameSystemLimitsWeightsPerClass;
  }

  /** @name FrameSystemLimitsWeightsPerClass (195) */
  interface FrameSystemLimitsWeightsPerClass extends Struct {
    readonly baseExtrinsic: u64;
    readonly maxExtrinsic: Option<u64>;
    readonly maxTotal: Option<u64>;
    readonly reserved: Option<u64>;
  }

  /** @name FrameSystemLimitsBlockLength (197) */
  interface FrameSystemLimitsBlockLength extends Struct {
    readonly max: FrameSupportWeightsPerDispatchClassU32;
  }

  /** @name FrameSupportWeightsPerDispatchClassU32 (198) */
  interface FrameSupportWeightsPerDispatchClassU32 extends Struct {
    readonly normal: u32;
    readonly operational: u32;
    readonly mandatory: u32;
  }

  /** @name FrameSupportWeightsRuntimeDbWeight (199) */
  interface FrameSupportWeightsRuntimeDbWeight extends Struct {
    readonly read: u64;
    readonly write: u64;
  }

  /** @name SpVersionRuntimeVersion (200) */
  interface SpVersionRuntimeVersion extends Struct {
    readonly specName: Text;
    readonly implName: Text;
    readonly authoringVersion: u32;
    readonly specVersion: u32;
    readonly implVersion: u32;
    readonly apis: Vec<ITuple<[U8aFixed, u32]>>;
    readonly transactionVersion: u32;
    readonly stateVersion: u8;
  }

  /** @name FrameSystemError (204) */
  interface FrameSystemError extends Enum {
    readonly isInvalidSpecName: boolean;
    readonly isSpecVersionNeedsToIncrease: boolean;
    readonly isFailedToExtractRuntimeVersion: boolean;
    readonly isNonDefaultComposite: boolean;
    readonly isNonZeroRefCount: boolean;
    readonly isCallFiltered: boolean;
    readonly type: 'InvalidSpecName' | 'SpecVersionNeedsToIncrease' | 'FailedToExtractRuntimeVersion' | 'NonDefaultComposite' | 'NonZeroRefCount' | 'CallFiltered';
  }

  /** @name PalletTimestampCall (205) */
  interface PalletTimestampCall extends Enum {
    readonly isSet: boolean;
    readonly asSet: {
      readonly now: Compact<u64>;
    } & Struct;
    readonly type: 'Set';
  }

  /** @name PalletSchedulerScheduledV3 (208) */
  interface PalletSchedulerScheduledV3 extends Struct {
    readonly maybeId: Option<Bytes>;
    readonly priority: u8;
    readonly call: FrameSupportScheduleMaybeHashed;
    readonly maybePeriodic: Option<ITuple<[u32, u32]>>;
    readonly origin: AcalaRuntimeOriginCaller;
  }

  /** @name FrameSupportScheduleMaybeHashed (209) */
  interface FrameSupportScheduleMaybeHashed extends Enum {
    readonly isValue: boolean;
    readonly asValue: Call;
    readonly isHash: boolean;
    readonly asHash: H256;
    readonly type: 'Value' | 'Hash';
  }

  /** @name PalletSchedulerCall (211) */
  interface PalletSchedulerCall extends Enum {
    readonly isSchedule: boolean;
    readonly asSchedule: {
      readonly when: u32;
      readonly maybePeriodic: Option<ITuple<[u32, u32]>>;
      readonly priority: u8;
      readonly call: FrameSupportScheduleMaybeHashed;
    } & Struct;
    readonly isCancel: boolean;
    readonly asCancel: {
      readonly when: u32;
      readonly index: u32;
    } & Struct;
    readonly isScheduleNamed: boolean;
    readonly asScheduleNamed: {
      readonly id: Bytes;
      readonly when: u32;
      readonly maybePeriodic: Option<ITuple<[u32, u32]>>;
      readonly priority: u8;
      readonly call: FrameSupportScheduleMaybeHashed;
    } & Struct;
    readonly isCancelNamed: boolean;
    readonly asCancelNamed: {
      readonly id: Bytes;
    } & Struct;
    readonly isScheduleAfter: boolean;
    readonly asScheduleAfter: {
      readonly after: u32;
      readonly maybePeriodic: Option<ITuple<[u32, u32]>>;
      readonly priority: u8;
      readonly call: FrameSupportScheduleMaybeHashed;
    } & Struct;
    readonly isScheduleNamedAfter: boolean;
    readonly asScheduleNamedAfter: {
      readonly id: Bytes;
      readonly after: u32;
      readonly maybePeriodic: Option<ITuple<[u32, u32]>>;
      readonly priority: u8;
      readonly call: FrameSupportScheduleMaybeHashed;
    } & Struct;
    readonly type: 'Schedule' | 'Cancel' | 'ScheduleNamed' | 'CancelNamed' | 'ScheduleAfter' | 'ScheduleNamedAfter';
  }

  /** @name PalletUtilityCall (213) */
  interface PalletUtilityCall extends Enum {
    readonly isBatch: boolean;
    readonly asBatch: {
      readonly calls: Vec<Call>;
    } & Struct;
    readonly isAsDerivative: boolean;
    readonly asAsDerivative: {
      readonly index: u16;
      readonly call: Call;
    } & Struct;
    readonly isBatchAll: boolean;
    readonly asBatchAll: {
      readonly calls: Vec<Call>;
    } & Struct;
    readonly isDispatchAs: boolean;
    readonly asDispatchAs: {
      readonly asOrigin: AcalaRuntimeOriginCaller;
      readonly call: Call;
    } & Struct;
    readonly isForceBatch: boolean;
    readonly asForceBatch: {
      readonly calls: Vec<Call>;
    } & Struct;
    readonly type: 'Batch' | 'AsDerivative' | 'BatchAll' | 'DispatchAs' | 'ForceBatch';
  }

  /** @name PalletMultisigCall (215) */
  interface PalletMultisigCall extends Enum {
    readonly isAsMultiThreshold1: boolean;
    readonly asAsMultiThreshold1: {
      readonly otherSignatories: Vec<AccountId32>;
      readonly call: Call;
    } & Struct;
    readonly isAsMulti: boolean;
    readonly asAsMulti: {
      readonly threshold: u16;
      readonly otherSignatories: Vec<AccountId32>;
      readonly maybeTimepoint: Option<PalletMultisigTimepoint>;
      readonly call: WrapperKeepOpaque<Call>;
      readonly storeCall: bool;
      readonly maxWeight: u64;
    } & Struct;
    readonly isApproveAsMulti: boolean;
    readonly asApproveAsMulti: {
      readonly threshold: u16;
      readonly otherSignatories: Vec<AccountId32>;
      readonly maybeTimepoint: Option<PalletMultisigTimepoint>;
      readonly callHash: U8aFixed;
      readonly maxWeight: u64;
    } & Struct;
    readonly isCancelAsMulti: boolean;
    readonly asCancelAsMulti: {
      readonly threshold: u16;
      readonly otherSignatories: Vec<AccountId32>;
      readonly timepoint: PalletMultisigTimepoint;
      readonly callHash: U8aFixed;
    } & Struct;
    readonly type: 'AsMultiThreshold1' | 'AsMulti' | 'ApproveAsMulti' | 'CancelAsMulti';
  }

  /** @name PalletProxyCall (218) */
  interface PalletProxyCall extends Enum {
    readonly isProxy: boolean;
    readonly asProxy: {
      readonly real: AccountId32;
      readonly forceProxyType: Option<RuntimeCommonProxyType>;
      readonly call: Call;
    } & Struct;
    readonly isAddProxy: boolean;
    readonly asAddProxy: {
      readonly delegate: AccountId32;
      readonly proxyType: RuntimeCommonProxyType;
      readonly delay: u32;
    } & Struct;
    readonly isRemoveProxy: boolean;
    readonly asRemoveProxy: {
      readonly delegate: AccountId32;
      readonly proxyType: RuntimeCommonProxyType;
      readonly delay: u32;
    } & Struct;
    readonly isRemoveProxies: boolean;
    readonly isAnonymous: boolean;
    readonly asAnonymous: {
      readonly proxyType: RuntimeCommonProxyType;
      readonly delay: u32;
      readonly index: u16;
    } & Struct;
    readonly isKillAnonymous: boolean;
    readonly asKillAnonymous: {
      readonly spawner: AccountId32;
      readonly proxyType: RuntimeCommonProxyType;
      readonly index: u16;
      readonly height: Compact<u32>;
      readonly extIndex: Compact<u32>;
    } & Struct;
    readonly isAnnounce: boolean;
    readonly asAnnounce: {
      readonly real: AccountId32;
      readonly callHash: H256;
    } & Struct;
    readonly isRemoveAnnouncement: boolean;
    readonly asRemoveAnnouncement: {
      readonly real: AccountId32;
      readonly callHash: H256;
    } & Struct;
    readonly isRejectAnnouncement: boolean;
    readonly asRejectAnnouncement: {
      readonly delegate: AccountId32;
      readonly callHash: H256;
    } & Struct;
    readonly isProxyAnnounced: boolean;
    readonly asProxyAnnounced: {
      readonly delegate: AccountId32;
      readonly real: AccountId32;
      readonly forceProxyType: Option<RuntimeCommonProxyType>;
      readonly call: Call;
    } & Struct;
    readonly type: 'Proxy' | 'AddProxy' | 'RemoveProxy' | 'RemoveProxies' | 'Anonymous' | 'KillAnonymous' | 'Announce' | 'RemoveAnnouncement' | 'RejectAnnouncement' | 'ProxyAnnounced';
  }

  /** @name ModuleTransactionPauseModuleCall (220) */
  interface ModuleTransactionPauseModuleCall extends Enum {
    readonly isPauseTransaction: boolean;
    readonly asPauseTransaction: {
      readonly palletName: Bytes;
      readonly functionName: Bytes;
    } & Struct;
    readonly isUnpauseTransaction: boolean;
    readonly asUnpauseTransaction: {
      readonly palletName: Bytes;
      readonly functionName: Bytes;
    } & Struct;
    readonly isPauseEvmPrecompile: boolean;
    readonly asPauseEvmPrecompile: {
      readonly address: H160;
    } & Struct;
    readonly isUnpauseEvmPrecompile: boolean;
    readonly asUnpauseEvmPrecompile: {
      readonly address: H160;
    } & Struct;
    readonly type: 'PauseTransaction' | 'UnpauseTransaction' | 'PauseEvmPrecompile' | 'UnpauseEvmPrecompile';
  }

  /** @name ModuleIdleSchedulerModuleCall (221) */
  interface ModuleIdleSchedulerModuleCall extends Enum {
    readonly isScheduleTask: boolean;
    readonly asScheduleTask: {
      readonly task: AcalaRuntimeScheduledTasks;
    } & Struct;
    readonly type: 'ScheduleTask';
  }

  /** @name PalletPreimageCall (222) */
  interface PalletPreimageCall extends Enum {
    readonly isNotePreimage: boolean;
    readonly asNotePreimage: {
      readonly bytes: Bytes;
    } & Struct;
    readonly isUnnotePreimage: boolean;
    readonly asUnnotePreimage: {
      readonly hash_: H256;
    } & Struct;
    readonly isRequestPreimage: boolean;
    readonly asRequestPreimage: {
      readonly hash_: H256;
    } & Struct;
    readonly isUnrequestPreimage: boolean;
    readonly asUnrequestPreimage: {
      readonly hash_: H256;
    } & Struct;
    readonly type: 'NotePreimage' | 'UnnotePreimage' | 'RequestPreimage' | 'UnrequestPreimage';
  }

  /** @name PalletBalancesCall (223) */
  interface PalletBalancesCall extends Enum {
    readonly isTransfer: boolean;
    readonly asTransfer: {
      readonly dest: MultiAddress;
      readonly value: Compact<u128>;
    } & Struct;
    readonly isSetBalance: boolean;
    readonly asSetBalance: {
      readonly who: MultiAddress;
      readonly newFree: Compact<u128>;
      readonly newReserved: Compact<u128>;
    } & Struct;
    readonly isForceTransfer: boolean;
    readonly asForceTransfer: {
      readonly source: MultiAddress;
      readonly dest: MultiAddress;
      readonly value: Compact<u128>;
    } & Struct;
    readonly isTransferKeepAlive: boolean;
    readonly asTransferKeepAlive: {
      readonly dest: MultiAddress;
      readonly value: Compact<u128>;
    } & Struct;
    readonly isTransferAll: boolean;
    readonly asTransferAll: {
      readonly dest: MultiAddress;
      readonly keepAlive: bool;
    } & Struct;
    readonly isForceUnreserve: boolean;
    readonly asForceUnreserve: {
      readonly who: MultiAddress;
      readonly amount: u128;
    } & Struct;
    readonly type: 'Transfer' | 'SetBalance' | 'ForceTransfer' | 'TransferKeepAlive' | 'TransferAll' | 'ForceUnreserve';
  }

  /** @name ModuleCurrenciesModuleCall (225) */
  interface ModuleCurrenciesModuleCall extends Enum {
    readonly isTransfer: boolean;
    readonly asTransfer: {
      readonly dest: MultiAddress;
      readonly currencyId: AcalaPrimitivesCurrencyCurrencyId;
      readonly amount: Compact<u128>;
    } & Struct;
    readonly isTransferNativeCurrency: boolean;
    readonly asTransferNativeCurrency: {
      readonly dest: MultiAddress;
      readonly amount: Compact<u128>;
    } & Struct;
    readonly isUpdateBalance: boolean;
    readonly asUpdateBalance: {
      readonly who: MultiAddress;
      readonly currencyId: AcalaPrimitivesCurrencyCurrencyId;
      readonly amount: i128;
    } & Struct;
    readonly isSweepDust: boolean;
    readonly asSweepDust: {
      readonly currencyId: AcalaPrimitivesCurrencyCurrencyId;
      readonly accounts: Vec<AccountId32>;
    } & Struct;
    readonly isForceSetLock: boolean;
    readonly asForceSetLock: {
      readonly who: MultiAddress;
      readonly currencyId: AcalaPrimitivesCurrencyCurrencyId;
      readonly amount: Compact<u128>;
      readonly lockId: U8aFixed;
    } & Struct;
    readonly isForceRemoveLock: boolean;
    readonly asForceRemoveLock: {
      readonly who: MultiAddress;
      readonly currencyId: AcalaPrimitivesCurrencyCurrencyId;
      readonly lockId: U8aFixed;
    } & Struct;
    readonly type: 'Transfer' | 'TransferNativeCurrency' | 'UpdateBalance' | 'SweepDust' | 'ForceSetLock' | 'ForceRemoveLock';
  }

  /** @name OrmlVestingModuleCall (226) */
  interface OrmlVestingModuleCall extends Enum {
    readonly isClaim: boolean;
    readonly isVestedTransfer: boolean;
    readonly asVestedTransfer: {
      readonly dest: MultiAddress;
      readonly schedule: OrmlVestingVestingSchedule;
    } & Struct;
    readonly isUpdateVestingSchedules: boolean;
    readonly asUpdateVestingSchedules: {
      readonly who: MultiAddress;
      readonly vestingSchedules: Vec<OrmlVestingVestingSchedule>;
    } & Struct;
    readonly isClaimFor: boolean;
    readonly asClaimFor: {
      readonly dest: MultiAddress;
    } & Struct;
    readonly type: 'Claim' | 'VestedTransfer' | 'UpdateVestingSchedules' | 'ClaimFor';
  }

  /** @name ModuleTransactionPaymentModuleCall (228) */
  interface ModuleTransactionPaymentModuleCall extends Enum {
    readonly isSetAlternativeFeeSwapPath: boolean;
    readonly asSetAlternativeFeeSwapPath: {
      readonly feeSwapPath: Option<Vec<AcalaPrimitivesCurrencyCurrencyId>>;
    } & Struct;
    readonly isEnableChargeFeePool: boolean;
    readonly asEnableChargeFeePool: {
      readonly currencyId: AcalaPrimitivesCurrencyCurrencyId;
      readonly poolSize: u128;
      readonly swapThreshold: u128;
    } & Struct;
    readonly isDisableChargeFeePool: boolean;
    readonly asDisableChargeFeePool: {
      readonly currencyId: AcalaPrimitivesCurrencyCurrencyId;
    } & Struct;
    readonly isWithFeePath: boolean;
    readonly asWithFeePath: {
      readonly feeSwapPath: Vec<AcalaPrimitivesCurrencyCurrencyId>;
      readonly call: Call;
    } & Struct;
    readonly isWithFeeCurrency: boolean;
    readonly asWithFeeCurrency: {
      readonly currencyId: AcalaPrimitivesCurrencyCurrencyId;
      readonly call: Call;
    } & Struct;
    readonly isWithFeePaidBy: boolean;
    readonly asWithFeePaidBy: {
      readonly call: Call;
      readonly payerAddr: AccountId32;
      readonly payerSig: SpRuntimeMultiSignature;
    } & Struct;
    readonly isWithFeeAggregatedPath: boolean;
    readonly asWithFeeAggregatedPath: {
      readonly feeAggregatedPath: Vec<ModuleSupportDexAggregatedSwapPath>;
      readonly call: Call;
    } & Struct;
    readonly type: 'SetAlternativeFeeSwapPath' | 'EnableChargeFeePool' | 'DisableChargeFeePool' | 'WithFeePath' | 'WithFeeCurrency' | 'WithFeePaidBy' | 'WithFeeAggregatedPath';
  }

  /** @name SpRuntimeMultiSignature (230) */
  interface SpRuntimeMultiSignature extends Enum {
    readonly isEd25519: boolean;
    readonly asEd25519: SpCoreEd25519Signature;
    readonly isSr25519: boolean;
    readonly asSr25519: SpCoreSr25519Signature;
    readonly isEcdsa: boolean;
    readonly asEcdsa: SpCoreEcdsaSignature;
    readonly type: 'Ed25519' | 'Sr25519' | 'Ecdsa';
  }

  /** @name SpCoreEd25519Signature (231) */
  interface SpCoreEd25519Signature extends U8aFixed {}

  /** @name SpCoreSr25519Signature (233) */
  interface SpCoreSr25519Signature extends U8aFixed {}

  /** @name SpCoreEcdsaSignature (234) */
  interface SpCoreEcdsaSignature extends U8aFixed {}

  /** @name ModuleSupportDexAggregatedSwapPath (237) */
  interface ModuleSupportDexAggregatedSwapPath extends Enum {
    readonly isDex: boolean;
    readonly asDex: Vec<AcalaPrimitivesCurrencyCurrencyId>;
    readonly isTaiga: boolean;
    readonly asTaiga: ITuple<[u32, u32, u32]>;
    readonly type: 'Dex' | 'Taiga';
  }

  /** @name PalletTreasuryCall (238) */
  interface PalletTreasuryCall extends Enum {
    readonly isProposeSpend: boolean;
    readonly asProposeSpend: {
      readonly value: Compact<u128>;
      readonly beneficiary: MultiAddress;
    } & Struct;
    readonly isRejectProposal: boolean;
    readonly asRejectProposal: {
      readonly proposalId: Compact<u32>;
    } & Struct;
    readonly isApproveProposal: boolean;
    readonly asApproveProposal: {
      readonly proposalId: Compact<u32>;
    } & Struct;
    readonly isSpend: boolean;
    readonly asSpend: {
      readonly amount: Compact<u128>;
      readonly beneficiary: MultiAddress;
    } & Struct;
    readonly isRemoveApproval: boolean;
    readonly asRemoveApproval: {
      readonly proposalId: Compact<u32>;
    } & Struct;
    readonly type: 'ProposeSpend' | 'RejectProposal' | 'ApproveProposal' | 'Spend' | 'RemoveApproval';
  }

  /** @name PalletBountiesCall (239) */
  interface PalletBountiesCall extends Enum {
    readonly isProposeBounty: boolean;
    readonly asProposeBounty: {
      readonly value: Compact<u128>;
      readonly description: Bytes;
    } & Struct;
    readonly isApproveBounty: boolean;
    readonly asApproveBounty: {
      readonly bountyId: Compact<u32>;
    } & Struct;
    readonly isProposeCurator: boolean;
    readonly asProposeCurator: {
      readonly bountyId: Compact<u32>;
      readonly curator: MultiAddress;
      readonly fee: Compact<u128>;
    } & Struct;
    readonly isUnassignCurator: boolean;
    readonly asUnassignCurator: {
      readonly bountyId: Compact<u32>;
    } & Struct;
    readonly isAcceptCurator: boolean;
    readonly asAcceptCurator: {
      readonly bountyId: Compact<u32>;
    } & Struct;
    readonly isAwardBounty: boolean;
    readonly asAwardBounty: {
      readonly bountyId: Compact<u32>;
      readonly beneficiary: MultiAddress;
    } & Struct;
    readonly isClaimBounty: boolean;
    readonly asClaimBounty: {
      readonly bountyId: Compact<u32>;
    } & Struct;
    readonly isCloseBounty: boolean;
    readonly asCloseBounty: {
      readonly bountyId: Compact<u32>;
    } & Struct;
    readonly isExtendBountyExpiry: boolean;
    readonly asExtendBountyExpiry: {
      readonly bountyId: Compact<u32>;
      readonly remark: Bytes;
    } & Struct;
    readonly type: 'ProposeBounty' | 'ApproveBounty' | 'ProposeCurator' | 'UnassignCurator' | 'AcceptCurator' | 'AwardBounty' | 'ClaimBounty' | 'CloseBounty' | 'ExtendBountyExpiry';
  }

  /** @name PalletTipsCall (240) */
  interface PalletTipsCall extends Enum {
    readonly isReportAwesome: boolean;
    readonly asReportAwesome: {
      readonly reason: Bytes;
      readonly who: AccountId32;
    } & Struct;
    readonly isRetractTip: boolean;
    readonly asRetractTip: {
      readonly hash_: H256;
    } & Struct;
    readonly isTipNew: boolean;
    readonly asTipNew: {
      readonly reason: Bytes;
      readonly who: AccountId32;
      readonly tipValue: Compact<u128>;
    } & Struct;
    readonly isTip: boolean;
    readonly asTip: {
      readonly hash_: H256;
      readonly tipValue: Compact<u128>;
    } & Struct;
    readonly isCloseTip: boolean;
    readonly asCloseTip: {
      readonly hash_: H256;
    } & Struct;
    readonly isSlashTip: boolean;
    readonly asSlashTip: {
      readonly hash_: H256;
    } & Struct;
    readonly type: 'ReportAwesome' | 'RetractTip' | 'TipNew' | 'Tip' | 'CloseTip' | 'SlashTip';
  }

  /** @name PalletAuthorshipCall (241) */
  interface PalletAuthorshipCall extends Enum {
    readonly isSetUncles: boolean;
    readonly asSetUncles: {
      readonly newUncles: Vec<SpRuntimeHeader>;
    } & Struct;
    readonly type: 'SetUncles';
  }

  /** @name SpRuntimeHeader (243) */
  interface SpRuntimeHeader extends Struct {
    readonly parentHash: H256;
    readonly number: Compact<u32>;
    readonly stateRoot: H256;
    readonly extrinsicsRoot: H256;
    readonly digest: SpRuntimeDigest;
  }

  /** @name SpRuntimeBlakeTwo256 (244) */
  type SpRuntimeBlakeTwo256 = Null;

  /** @name ModuleCollatorSelectionCall (245) */
  interface ModuleCollatorSelectionCall extends Enum {
    readonly isSetInvulnerables: boolean;
    readonly asSetInvulnerables: {
      readonly new_: Vec<AccountId32>;
    } & Struct;
    readonly isSetDesiredCandidates: boolean;
    readonly asSetDesiredCandidates: {
      readonly max: Compact<u32>;
    } & Struct;
    readonly isSetCandidacyBond: boolean;
    readonly asSetCandidacyBond: {
      readonly bond: Compact<u128>;
    } & Struct;
    readonly isRegisterAsCandidate: boolean;
    readonly isRegisterCandidate: boolean;
    readonly asRegisterCandidate: {
      readonly newCandidate: AccountId32;
    } & Struct;
    readonly isLeaveIntent: boolean;
    readonly isWithdrawBond: boolean;
    readonly type: 'SetInvulnerables' | 'SetDesiredCandidates' | 'SetCandidacyBond' | 'RegisterAsCandidate' | 'RegisterCandidate' | 'LeaveIntent' | 'WithdrawBond';
  }

  /** @name PalletSessionCall (246) */
  interface PalletSessionCall extends Enum {
    readonly isSetKeys: boolean;
    readonly asSetKeys: {
      readonly keys_: AcalaRuntimeSessionKeys;
      readonly proof: Bytes;
    } & Struct;
    readonly isPurgeKeys: boolean;
    readonly type: 'SetKeys' | 'PurgeKeys';
  }

  /** @name AcalaRuntimeSessionKeys (247) */
  interface AcalaRuntimeSessionKeys extends Struct {
    readonly aura: SpConsensusAuraSr25519AppSr25519Public;
  }

  /** @name SpConsensusAuraSr25519AppSr25519Public (248) */
  interface SpConsensusAuraSr25519AppSr25519Public extends SpCoreSr25519Public {}

  /** @name SpCoreSr25519Public (249) */
  interface SpCoreSr25519Public extends U8aFixed {}

  /** @name ModuleSessionManagerModuleCall (250) */
  interface ModuleSessionManagerModuleCall extends Enum {
    readonly isScheduleSessionDuration: boolean;
    readonly asScheduleSessionDuration: {
      readonly startSession: Compact<u32>;
      readonly duration: Compact<u32>;
    } & Struct;
    readonly type: 'ScheduleSessionDuration';
  }

  /** @name CumulusPalletXcmpQueueCall (251) */
  interface CumulusPalletXcmpQueueCall extends Enum {
    readonly isServiceOverweight: boolean;
    readonly asServiceOverweight: {
      readonly index: u64;
      readonly weightLimit: u64;
    } & Struct;
    readonly isSuspendXcmExecution: boolean;
    readonly isResumeXcmExecution: boolean;
    readonly isUpdateSuspendThreshold: boolean;
    readonly asUpdateSuspendThreshold: {
      readonly new_: u32;
    } & Struct;
    readonly isUpdateDropThreshold: boolean;
    readonly asUpdateDropThreshold: {
      readonly new_: u32;
    } & Struct;
    readonly isUpdateResumeThreshold: boolean;
    readonly asUpdateResumeThreshold: {
      readonly new_: u32;
    } & Struct;
    readonly isUpdateThresholdWeight: boolean;
    readonly asUpdateThresholdWeight: {
      readonly new_: u64;
    } & Struct;
    readonly isUpdateWeightRestrictDecay: boolean;
    readonly asUpdateWeightRestrictDecay: {
      readonly new_: u64;
    } & Struct;
    readonly isUpdateXcmpMaxIndividualWeight: boolean;
    readonly asUpdateXcmpMaxIndividualWeight: {
      readonly new_: u64;
    } & Struct;
    readonly type: 'ServiceOverweight' | 'SuspendXcmExecution' | 'ResumeXcmExecution' | 'UpdateSuspendThreshold' | 'UpdateDropThreshold' | 'UpdateResumeThreshold' | 'UpdateThresholdWeight' | 'UpdateWeightRestrictDecay' | 'UpdateXcmpMaxIndividualWeight';
  }

  /** @name PalletXcmCall (252) */
  interface PalletXcmCall extends Enum {
    readonly isSend: boolean;
    readonly asSend: {
      readonly dest: XcmVersionedMultiLocation;
      readonly message: XcmVersionedXcm;
    } & Struct;
    readonly isTeleportAssets: boolean;
    readonly asTeleportAssets: {
      readonly dest: XcmVersionedMultiLocation;
      readonly beneficiary: XcmVersionedMultiLocation;
      readonly assets: XcmVersionedMultiAssets;
      readonly feeAssetItem: u32;
    } & Struct;
    readonly isReserveTransferAssets: boolean;
    readonly asReserveTransferAssets: {
      readonly dest: XcmVersionedMultiLocation;
      readonly beneficiary: XcmVersionedMultiLocation;
      readonly assets: XcmVersionedMultiAssets;
      readonly feeAssetItem: u32;
    } & Struct;
    readonly isExecute: boolean;
    readonly asExecute: {
      readonly message: XcmVersionedXcm;
      readonly maxWeight: u64;
    } & Struct;
    readonly isForceXcmVersion: boolean;
    readonly asForceXcmVersion: {
      readonly location: XcmV1MultiLocation;
      readonly xcmVersion: u32;
    } & Struct;
    readonly isForceDefaultXcmVersion: boolean;
    readonly asForceDefaultXcmVersion: {
      readonly maybeXcmVersion: Option<u32>;
    } & Struct;
    readonly isForceSubscribeVersionNotify: boolean;
    readonly asForceSubscribeVersionNotify: {
      readonly location: XcmVersionedMultiLocation;
    } & Struct;
    readonly isForceUnsubscribeVersionNotify: boolean;
    readonly asForceUnsubscribeVersionNotify: {
      readonly location: XcmVersionedMultiLocation;
    } & Struct;
    readonly isLimitedReserveTransferAssets: boolean;
    readonly asLimitedReserveTransferAssets: {
      readonly dest: XcmVersionedMultiLocation;
      readonly beneficiary: XcmVersionedMultiLocation;
      readonly assets: XcmVersionedMultiAssets;
      readonly feeAssetItem: u32;
      readonly weightLimit: XcmV2WeightLimit;
    } & Struct;
    readonly isLimitedTeleportAssets: boolean;
    readonly asLimitedTeleportAssets: {
      readonly dest: XcmVersionedMultiLocation;
      readonly beneficiary: XcmVersionedMultiLocation;
      readonly assets: XcmVersionedMultiAssets;
      readonly feeAssetItem: u32;
      readonly weightLimit: XcmV2WeightLimit;
    } & Struct;
    readonly type: 'Send' | 'TeleportAssets' | 'ReserveTransferAssets' | 'Execute' | 'ForceXcmVersion' | 'ForceDefaultXcmVersion' | 'ForceSubscribeVersionNotify' | 'ForceUnsubscribeVersionNotify' | 'LimitedReserveTransferAssets' | 'LimitedTeleportAssets';
  }

  /** @name XcmVersionedXcm (253) */
  interface XcmVersionedXcm extends Enum {
    readonly isV0: boolean;
    readonly asV0: XcmV0Xcm;
    readonly isV1: boolean;
    readonly asV1: XcmV1Xcm;
    readonly isV2: boolean;
    readonly asV2: XcmV2Xcm;
    readonly type: 'V0' | 'V1' | 'V2';
  }

  /** @name XcmV0Xcm (254) */
  interface XcmV0Xcm extends Enum {
    readonly isWithdrawAsset: boolean;
    readonly asWithdrawAsset: {
      readonly assets: Vec<XcmV0MultiAsset>;
      readonly effects: Vec<XcmV0Order>;
    } & Struct;
    readonly isReserveAssetDeposit: boolean;
    readonly asReserveAssetDeposit: {
      readonly assets: Vec<XcmV0MultiAsset>;
      readonly effects: Vec<XcmV0Order>;
    } & Struct;
    readonly isTeleportAsset: boolean;
    readonly asTeleportAsset: {
      readonly assets: Vec<XcmV0MultiAsset>;
      readonly effects: Vec<XcmV0Order>;
    } & Struct;
    readonly isQueryResponse: boolean;
    readonly asQueryResponse: {
      readonly queryId: Compact<u64>;
      readonly response: XcmV0Response;
    } & Struct;
    readonly isTransferAsset: boolean;
    readonly asTransferAsset: {
      readonly assets: Vec<XcmV0MultiAsset>;
      readonly dest: XcmV0MultiLocation;
    } & Struct;
    readonly isTransferReserveAsset: boolean;
    readonly asTransferReserveAsset: {
      readonly assets: Vec<XcmV0MultiAsset>;
      readonly dest: XcmV0MultiLocation;
      readonly effects: Vec<XcmV0Order>;
    } & Struct;
    readonly isTransact: boolean;
    readonly asTransact: {
      readonly originType: XcmV0OriginKind;
      readonly requireWeightAtMost: u64;
      readonly call: XcmDoubleEncoded;
    } & Struct;
    readonly isHrmpNewChannelOpenRequest: boolean;
    readonly asHrmpNewChannelOpenRequest: {
      readonly sender: Compact<u32>;
      readonly maxMessageSize: Compact<u32>;
      readonly maxCapacity: Compact<u32>;
    } & Struct;
    readonly isHrmpChannelAccepted: boolean;
    readonly asHrmpChannelAccepted: {
      readonly recipient: Compact<u32>;
    } & Struct;
    readonly isHrmpChannelClosing: boolean;
    readonly asHrmpChannelClosing: {
      readonly initiator: Compact<u32>;
      readonly sender: Compact<u32>;
      readonly recipient: Compact<u32>;
    } & Struct;
    readonly isRelayedFrom: boolean;
    readonly asRelayedFrom: {
      readonly who: XcmV0MultiLocation;
      readonly message: XcmV0Xcm;
    } & Struct;
    readonly type: 'WithdrawAsset' | 'ReserveAssetDeposit' | 'TeleportAsset' | 'QueryResponse' | 'TransferAsset' | 'TransferReserveAsset' | 'Transact' | 'HrmpNewChannelOpenRequest' | 'HrmpChannelAccepted' | 'HrmpChannelClosing' | 'RelayedFrom';
  }

  /** @name XcmV0Order (256) */
  interface XcmV0Order extends Enum {
    readonly isNull: boolean;
    readonly isDepositAsset: boolean;
    readonly asDepositAsset: {
      readonly assets: Vec<XcmV0MultiAsset>;
      readonly dest: XcmV0MultiLocation;
    } & Struct;
    readonly isDepositReserveAsset: boolean;
    readonly asDepositReserveAsset: {
      readonly assets: Vec<XcmV0MultiAsset>;
      readonly dest: XcmV0MultiLocation;
      readonly effects: Vec<XcmV0Order>;
    } & Struct;
    readonly isExchangeAsset: boolean;
    readonly asExchangeAsset: {
      readonly give: Vec<XcmV0MultiAsset>;
      readonly receive: Vec<XcmV0MultiAsset>;
    } & Struct;
    readonly isInitiateReserveWithdraw: boolean;
    readonly asInitiateReserveWithdraw: {
      readonly assets: Vec<XcmV0MultiAsset>;
      readonly reserve: XcmV0MultiLocation;
      readonly effects: Vec<XcmV0Order>;
    } & Struct;
    readonly isInitiateTeleport: boolean;
    readonly asInitiateTeleport: {
      readonly assets: Vec<XcmV0MultiAsset>;
      readonly dest: XcmV0MultiLocation;
      readonly effects: Vec<XcmV0Order>;
    } & Struct;
    readonly isQueryHolding: boolean;
    readonly asQueryHolding: {
      readonly queryId: Compact<u64>;
      readonly dest: XcmV0MultiLocation;
      readonly assets: Vec<XcmV0MultiAsset>;
    } & Struct;
    readonly isBuyExecution: boolean;
    readonly asBuyExecution: {
      readonly fees: XcmV0MultiAsset;
      readonly weight: u64;
      readonly debt: u64;
      readonly haltOnError: bool;
      readonly xcm: Vec<XcmV0Xcm>;
    } & Struct;
    readonly type: 'Null' | 'DepositAsset' | 'DepositReserveAsset' | 'ExchangeAsset' | 'InitiateReserveWithdraw' | 'InitiateTeleport' | 'QueryHolding' | 'BuyExecution';
  }

  /** @name XcmV0Response (258) */
  interface XcmV0Response extends Enum {
    readonly isAssets: boolean;
    readonly asAssets: Vec<XcmV0MultiAsset>;
    readonly type: 'Assets';
  }

  /** @name XcmV1Xcm (259) */
  interface XcmV1Xcm extends Enum {
    readonly isWithdrawAsset: boolean;
    readonly asWithdrawAsset: {
      readonly assets: XcmV1MultiassetMultiAssets;
      readonly effects: Vec<XcmV1Order>;
    } & Struct;
    readonly isReserveAssetDeposited: boolean;
    readonly asReserveAssetDeposited: {
      readonly assets: XcmV1MultiassetMultiAssets;
      readonly effects: Vec<XcmV1Order>;
    } & Struct;
    readonly isReceiveTeleportedAsset: boolean;
    readonly asReceiveTeleportedAsset: {
      readonly assets: XcmV1MultiassetMultiAssets;
      readonly effects: Vec<XcmV1Order>;
    } & Struct;
    readonly isQueryResponse: boolean;
    readonly asQueryResponse: {
      readonly queryId: Compact<u64>;
      readonly response: XcmV1Response;
    } & Struct;
    readonly isTransferAsset: boolean;
    readonly asTransferAsset: {
      readonly assets: XcmV1MultiassetMultiAssets;
      readonly beneficiary: XcmV1MultiLocation;
    } & Struct;
    readonly isTransferReserveAsset: boolean;
    readonly asTransferReserveAsset: {
      readonly assets: XcmV1MultiassetMultiAssets;
      readonly dest: XcmV1MultiLocation;
      readonly effects: Vec<XcmV1Order>;
    } & Struct;
    readonly isTransact: boolean;
    readonly asTransact: {
      readonly originType: XcmV0OriginKind;
      readonly requireWeightAtMost: u64;
      readonly call: XcmDoubleEncoded;
    } & Struct;
    readonly isHrmpNewChannelOpenRequest: boolean;
    readonly asHrmpNewChannelOpenRequest: {
      readonly sender: Compact<u32>;
      readonly maxMessageSize: Compact<u32>;
      readonly maxCapacity: Compact<u32>;
    } & Struct;
    readonly isHrmpChannelAccepted: boolean;
    readonly asHrmpChannelAccepted: {
      readonly recipient: Compact<u32>;
    } & Struct;
    readonly isHrmpChannelClosing: boolean;
    readonly asHrmpChannelClosing: {
      readonly initiator: Compact<u32>;
      readonly sender: Compact<u32>;
      readonly recipient: Compact<u32>;
    } & Struct;
    readonly isRelayedFrom: boolean;
    readonly asRelayedFrom: {
      readonly who: XcmV1MultilocationJunctions;
      readonly message: XcmV1Xcm;
    } & Struct;
    readonly isSubscribeVersion: boolean;
    readonly asSubscribeVersion: {
      readonly queryId: Compact<u64>;
      readonly maxResponseWeight: Compact<u64>;
    } & Struct;
    readonly isUnsubscribeVersion: boolean;
    readonly type: 'WithdrawAsset' | 'ReserveAssetDeposited' | 'ReceiveTeleportedAsset' | 'QueryResponse' | 'TransferAsset' | 'TransferReserveAsset' | 'Transact' | 'HrmpNewChannelOpenRequest' | 'HrmpChannelAccepted' | 'HrmpChannelClosing' | 'RelayedFrom' | 'SubscribeVersion' | 'UnsubscribeVersion';
  }

  /** @name XcmV1Order (261) */
  interface XcmV1Order extends Enum {
    readonly isNoop: boolean;
    readonly isDepositAsset: boolean;
    readonly asDepositAsset: {
      readonly assets: XcmV1MultiassetMultiAssetFilter;
      readonly maxAssets: u32;
      readonly beneficiary: XcmV1MultiLocation;
    } & Struct;
    readonly isDepositReserveAsset: boolean;
    readonly asDepositReserveAsset: {
      readonly assets: XcmV1MultiassetMultiAssetFilter;
      readonly maxAssets: u32;
      readonly dest: XcmV1MultiLocation;
      readonly effects: Vec<XcmV1Order>;
    } & Struct;
    readonly isExchangeAsset: boolean;
    readonly asExchangeAsset: {
      readonly give: XcmV1MultiassetMultiAssetFilter;
      readonly receive: XcmV1MultiassetMultiAssets;
    } & Struct;
    readonly isInitiateReserveWithdraw: boolean;
    readonly asInitiateReserveWithdraw: {
      readonly assets: XcmV1MultiassetMultiAssetFilter;
      readonly reserve: XcmV1MultiLocation;
      readonly effects: Vec<XcmV1Order>;
    } & Struct;
    readonly isInitiateTeleport: boolean;
    readonly asInitiateTeleport: {
      readonly assets: XcmV1MultiassetMultiAssetFilter;
      readonly dest: XcmV1MultiLocation;
      readonly effects: Vec<XcmV1Order>;
    } & Struct;
    readonly isQueryHolding: boolean;
    readonly asQueryHolding: {
      readonly queryId: Compact<u64>;
      readonly dest: XcmV1MultiLocation;
      readonly assets: XcmV1MultiassetMultiAssetFilter;
    } & Struct;
    readonly isBuyExecution: boolean;
    readonly asBuyExecution: {
      readonly fees: XcmV1MultiAsset;
      readonly weight: u64;
      readonly debt: u64;
      readonly haltOnError: bool;
      readonly instructions: Vec<XcmV1Xcm>;
    } & Struct;
    readonly type: 'Noop' | 'DepositAsset' | 'DepositReserveAsset' | 'ExchangeAsset' | 'InitiateReserveWithdraw' | 'InitiateTeleport' | 'QueryHolding' | 'BuyExecution';
  }

  /** @name XcmV1Response (263) */
  interface XcmV1Response extends Enum {
    readonly isAssets: boolean;
    readonly asAssets: XcmV1MultiassetMultiAssets;
    readonly isVersion: boolean;
    readonly asVersion: u32;
    readonly type: 'Assets' | 'Version';
  }

  /** @name CumulusPalletDmpQueueCall (278) */
  interface CumulusPalletDmpQueueCall extends Enum {
    readonly isServiceOverweight: boolean;
    readonly asServiceOverweight: {
      readonly index: u64;
      readonly weightLimit: u64;
    } & Struct;
    readonly type: 'ServiceOverweight';
  }

  /** @name OrmlXtokensModuleCall (279) */
  interface OrmlXtokensModuleCall extends Enum {
    readonly isTransfer: boolean;
    readonly asTransfer: {
      readonly currencyId: AcalaPrimitivesCurrencyCurrencyId;
      readonly amount: u128;
      readonly dest: XcmVersionedMultiLocation;
      readonly destWeight: u64;
    } & Struct;
    readonly isTransferMultiasset: boolean;
    readonly asTransferMultiasset: {
      readonly asset: XcmVersionedMultiAsset;
      readonly dest: XcmVersionedMultiLocation;
      readonly destWeight: u64;
    } & Struct;
    readonly isTransferWithFee: boolean;
    readonly asTransferWithFee: {
      readonly currencyId: AcalaPrimitivesCurrencyCurrencyId;
      readonly amount: u128;
      readonly fee: u128;
      readonly dest: XcmVersionedMultiLocation;
      readonly destWeight: u64;
    } & Struct;
    readonly isTransferMultiassetWithFee: boolean;
    readonly asTransferMultiassetWithFee: {
      readonly asset: XcmVersionedMultiAsset;
      readonly fee: XcmVersionedMultiAsset;
      readonly dest: XcmVersionedMultiLocation;
      readonly destWeight: u64;
    } & Struct;
    readonly isTransferMulticurrencies: boolean;
    readonly asTransferMulticurrencies: {
      readonly currencies: Vec<ITuple<[AcalaPrimitivesCurrencyCurrencyId, u128]>>;
      readonly feeItem: u32;
      readonly dest: XcmVersionedMultiLocation;
      readonly destWeight: u64;
    } & Struct;
    readonly isTransferMultiassets: boolean;
    readonly asTransferMultiassets: {
      readonly assets: XcmVersionedMultiAssets;
      readonly feeItem: u32;
      readonly dest: XcmVersionedMultiLocation;
      readonly destWeight: u64;
    } & Struct;
    readonly type: 'Transfer' | 'TransferMultiasset' | 'TransferWithFee' | 'TransferMultiassetWithFee' | 'TransferMulticurrencies' | 'TransferMultiassets';
  }

  /** @name XcmVersionedMultiAsset (280) */
  interface XcmVersionedMultiAsset extends Enum {
    readonly isV0: boolean;
    readonly asV0: XcmV0MultiAsset;
    readonly isV1: boolean;
    readonly asV1: XcmV1MultiAsset;
    readonly type: 'V0' | 'V1';
  }

  /** @name OrmlXcmModuleCall (281) */
  interface OrmlXcmModuleCall extends Enum {
    readonly isSendAsSovereign: boolean;
    readonly asSendAsSovereign: {
      readonly dest: XcmVersionedMultiLocation;
      readonly message: XcmVersionedXcm;
    } & Struct;
    readonly type: 'SendAsSovereign';
  }

  /** @name OrmlAuthorityModuleCall (282) */
  interface OrmlAuthorityModuleCall extends Enum {
    readonly isDispatchAs: boolean;
    readonly asDispatchAs: {
      readonly asOrigin: AcalaPrimitivesAuthoritysOriginId;
      readonly call: Call;
    } & Struct;
    readonly isScheduleDispatch: boolean;
    readonly asScheduleDispatch: {
      readonly when: FrameSupportScheduleDispatchTime;
      readonly priority: u8;
      readonly withDelayedOrigin: bool;
      readonly call: Call;
    } & Struct;
    readonly isFastTrackScheduledDispatch: boolean;
    readonly asFastTrackScheduledDispatch: {
      readonly initialOrigin: AcalaRuntimeOriginCaller;
      readonly taskId: u32;
      readonly when: FrameSupportScheduleDispatchTime;
    } & Struct;
    readonly isDelayScheduledDispatch: boolean;
    readonly asDelayScheduledDispatch: {
      readonly initialOrigin: AcalaRuntimeOriginCaller;
      readonly taskId: u32;
      readonly additionalDelay: u32;
    } & Struct;
    readonly isCancelScheduledDispatch: boolean;
    readonly asCancelScheduledDispatch: {
      readonly initialOrigin: AcalaRuntimeOriginCaller;
      readonly taskId: u32;
    } & Struct;
    readonly isAuthorizeCall: boolean;
    readonly asAuthorizeCall: {
      readonly call: Call;
      readonly caller: Option<AccountId32>;
    } & Struct;
    readonly isRemoveAuthorizedCall: boolean;
    readonly asRemoveAuthorizedCall: {
      readonly hash_: H256;
    } & Struct;
    readonly isTriggerCall: boolean;
    readonly asTriggerCall: {
      readonly hash_: H256;
      readonly callWeightBound: Compact<u64>;
    } & Struct;
    readonly type: 'DispatchAs' | 'ScheduleDispatch' | 'FastTrackScheduledDispatch' | 'DelayScheduledDispatch' | 'CancelScheduledDispatch' | 'AuthorizeCall' | 'RemoveAuthorizedCall' | 'TriggerCall';
  }

  /** @name AcalaPrimitivesAuthoritysOriginId (283) */
  interface AcalaPrimitivesAuthoritysOriginId extends Enum {
    readonly isRoot: boolean;
    readonly isTreasury: boolean;
    readonly isHonzonTreasury: boolean;
    readonly isHomaTreasury: boolean;
    readonly isTreasuryReserve: boolean;
    readonly type: 'Root' | 'Treasury' | 'HonzonTreasury' | 'HomaTreasury' | 'TreasuryReserve';
  }

  /** @name FrameSupportScheduleDispatchTime (284) */
  interface FrameSupportScheduleDispatchTime extends Enum {
    readonly isAt: boolean;
    readonly asAt: u32;
    readonly isAfter: boolean;
    readonly asAfter: u32;
    readonly type: 'At' | 'After';
  }

  /** @name PalletCollectiveCall (285) */
  interface PalletCollectiveCall extends Enum {
    readonly isSetMembers: boolean;
    readonly asSetMembers: {
      readonly newMembers: Vec<AccountId32>;
      readonly prime: Option<AccountId32>;
      readonly oldCount: u32;
    } & Struct;
    readonly isExecute: boolean;
    readonly asExecute: {
      readonly proposal: Call;
      readonly lengthBound: Compact<u32>;
    } & Struct;
    readonly isPropose: boolean;
    readonly asPropose: {
      readonly threshold: Compact<u32>;
      readonly proposal: Call;
      readonly lengthBound: Compact<u32>;
    } & Struct;
    readonly isVote: boolean;
    readonly asVote: {
      readonly proposal: H256;
      readonly index: Compact<u32>;
      readonly approve: bool;
    } & Struct;
    readonly isClose: boolean;
    readonly asClose: {
      readonly proposalHash: H256;
      readonly index: Compact<u32>;
      readonly proposalWeightBound: Compact<u64>;
      readonly lengthBound: Compact<u32>;
    } & Struct;
    readonly isDisapproveProposal: boolean;
    readonly asDisapproveProposal: {
      readonly proposalHash: H256;
    } & Struct;
    readonly type: 'SetMembers' | 'Execute' | 'Propose' | 'Vote' | 'Close' | 'DisapproveProposal';
  }

  /** @name PalletMembershipCall (286) */
  interface PalletMembershipCall extends Enum {
    readonly isAddMember: boolean;
    readonly asAddMember: {
      readonly who: AccountId32;
    } & Struct;
    readonly isRemoveMember: boolean;
    readonly asRemoveMember: {
      readonly who: AccountId32;
    } & Struct;
    readonly isSwapMember: boolean;
    readonly asSwapMember: {
      readonly remove: AccountId32;
      readonly add: AccountId32;
    } & Struct;
    readonly isResetMembers: boolean;
    readonly asResetMembers: {
      readonly members: Vec<AccountId32>;
    } & Struct;
    readonly isChangeKey: boolean;
    readonly asChangeKey: {
      readonly new_: AccountId32;
    } & Struct;
    readonly isSetPrime: boolean;
    readonly asSetPrime: {
      readonly who: AccountId32;
    } & Struct;
    readonly isClearPrime: boolean;
    readonly type: 'AddMember' | 'RemoveMember' | 'SwapMember' | 'ResetMembers' | 'ChangeKey' | 'SetPrime' | 'ClearPrime';
  }

  /** @name PalletDemocracyCall (293) */
  interface PalletDemocracyCall extends Enum {
    readonly isPropose: boolean;
    readonly asPropose: {
      readonly proposalHash: H256;
      readonly value: Compact<u128>;
    } & Struct;
    readonly isSecond: boolean;
    readonly asSecond: {
      readonly proposal: Compact<u32>;
      readonly secondsUpperBound: Compact<u32>;
    } & Struct;
    readonly isVote: boolean;
    readonly asVote: {
      readonly refIndex: Compact<u32>;
      readonly vote: PalletDemocracyVoteAccountVote;
    } & Struct;
    readonly isEmergencyCancel: boolean;
    readonly asEmergencyCancel: {
      readonly refIndex: u32;
    } & Struct;
    readonly isExternalPropose: boolean;
    readonly asExternalPropose: {
      readonly proposalHash: H256;
    } & Struct;
    readonly isExternalProposeMajority: boolean;
    readonly asExternalProposeMajority: {
      readonly proposalHash: H256;
    } & Struct;
    readonly isExternalProposeDefault: boolean;
    readonly asExternalProposeDefault: {
      readonly proposalHash: H256;
    } & Struct;
    readonly isFastTrack: boolean;
    readonly asFastTrack: {
      readonly proposalHash: H256;
      readonly votingPeriod: u32;
      readonly delay: u32;
    } & Struct;
    readonly isVetoExternal: boolean;
    readonly asVetoExternal: {
      readonly proposalHash: H256;
    } & Struct;
    readonly isCancelReferendum: boolean;
    readonly asCancelReferendum: {
      readonly refIndex: Compact<u32>;
    } & Struct;
    readonly isCancelQueued: boolean;
    readonly asCancelQueued: {
      readonly which: u32;
    } & Struct;
    readonly isDelegate: boolean;
    readonly asDelegate: {
      readonly to: AccountId32;
      readonly conviction: PalletDemocracyConviction;
      readonly balance: u128;
    } & Struct;
    readonly isUndelegate: boolean;
    readonly isClearPublicProposals: boolean;
    readonly isNotePreimage: boolean;
    readonly asNotePreimage: {
      readonly encodedProposal: Bytes;
    } & Struct;
    readonly isNotePreimageOperational: boolean;
    readonly asNotePreimageOperational: {
      readonly encodedProposal: Bytes;
    } & Struct;
    readonly isNoteImminentPreimage: boolean;
    readonly asNoteImminentPreimage: {
      readonly encodedProposal: Bytes;
    } & Struct;
    readonly isNoteImminentPreimageOperational: boolean;
    readonly asNoteImminentPreimageOperational: {
      readonly encodedProposal: Bytes;
    } & Struct;
    readonly isReapPreimage: boolean;
    readonly asReapPreimage: {
      readonly proposalHash: H256;
      readonly proposalLenUpperBound: Compact<u32>;
    } & Struct;
    readonly isUnlock: boolean;
    readonly asUnlock: {
      readonly target: AccountId32;
    } & Struct;
    readonly isRemoveVote: boolean;
    readonly asRemoveVote: {
      readonly index: u32;
    } & Struct;
    readonly isRemoveOtherVote: boolean;
    readonly asRemoveOtherVote: {
      readonly target: AccountId32;
      readonly index: u32;
    } & Struct;
    readonly isEnactProposal: boolean;
    readonly asEnactProposal: {
      readonly proposalHash: H256;
      readonly index: u32;
    } & Struct;
    readonly isBlacklist: boolean;
    readonly asBlacklist: {
      readonly proposalHash: H256;
      readonly maybeRefIndex: Option<u32>;
    } & Struct;
    readonly isCancelProposal: boolean;
    readonly asCancelProposal: {
      readonly propIndex: Compact<u32>;
    } & Struct;
    readonly type: 'Propose' | 'Second' | 'Vote' | 'EmergencyCancel' | 'ExternalPropose' | 'ExternalProposeMajority' | 'ExternalProposeDefault' | 'FastTrack' | 'VetoExternal' | 'CancelReferendum' | 'CancelQueued' | 'Delegate' | 'Undelegate' | 'ClearPublicProposals' | 'NotePreimage' | 'NotePreimageOperational' | 'NoteImminentPreimage' | 'NoteImminentPreimageOperational' | 'ReapPreimage' | 'Unlock' | 'RemoveVote' | 'RemoveOtherVote' | 'EnactProposal' | 'Blacklist' | 'CancelProposal';
  }

  /** @name PalletDemocracyConviction (294) */
  interface PalletDemocracyConviction extends Enum {
    readonly isNone: boolean;
    readonly isLocked1x: boolean;
    readonly isLocked2x: boolean;
    readonly isLocked3x: boolean;
    readonly isLocked4x: boolean;
    readonly isLocked5x: boolean;
    readonly isLocked6x: boolean;
    readonly type: 'None' | 'Locked1x' | 'Locked2x' | 'Locked3x' | 'Locked4x' | 'Locked5x' | 'Locked6x';
  }

  /** @name OrmlOracleModuleCall (295) */
  interface OrmlOracleModuleCall extends Enum {
    readonly isFeedValues: boolean;
    readonly asFeedValues: {
      readonly values: Vec<ITuple<[AcalaPrimitivesCurrencyCurrencyId, u128]>>;
    } & Struct;
    readonly type: 'FeedValues';
  }

  /** @name OrmlAuctionModuleCall (297) */
  interface OrmlAuctionModuleCall extends Enum {
    readonly isBid: boolean;
    readonly asBid: {
      readonly id: u32;
      readonly value: Compact<u128>;
    } & Struct;
    readonly type: 'Bid';
  }

  /** @name OrmlRewardsModuleCall (298) */
  type OrmlRewardsModuleCall = Null;

  /** @name ModulePricesModuleCall (299) */
  interface ModulePricesModuleCall extends Enum {
    readonly isLockPrice: boolean;
    readonly asLockPrice: {
      readonly currencyId: AcalaPrimitivesCurrencyCurrencyId;
    } & Struct;
    readonly isUnlockPrice: boolean;
    readonly asUnlockPrice: {
      readonly currencyId: AcalaPrimitivesCurrencyCurrencyId;
    } & Struct;
    readonly type: 'LockPrice' | 'UnlockPrice';
  }

  /** @name ModuleDexModuleCall (300) */
  interface ModuleDexModuleCall extends Enum {
    readonly isSwapWithExactSupply: boolean;
    readonly asSwapWithExactSupply: {
      readonly path: Vec<AcalaPrimitivesCurrencyCurrencyId>;
      readonly supplyAmount: Compact<u128>;
      readonly minTargetAmount: Compact<u128>;
    } & Struct;
    readonly isSwapWithExactTarget: boolean;
    readonly asSwapWithExactTarget: {
      readonly path: Vec<AcalaPrimitivesCurrencyCurrencyId>;
      readonly targetAmount: Compact<u128>;
      readonly maxSupplyAmount: Compact<u128>;
    } & Struct;
    readonly isAddLiquidity: boolean;
    readonly asAddLiquidity: {
      readonly currencyIdA: AcalaPrimitivesCurrencyCurrencyId;
      readonly currencyIdB: AcalaPrimitivesCurrencyCurrencyId;
      readonly maxAmountA: Compact<u128>;
      readonly maxAmountB: Compact<u128>;
      readonly minShareIncrement: Compact<u128>;
      readonly stakeIncrementShare: bool;
    } & Struct;
    readonly isAddProvision: boolean;
    readonly asAddProvision: {
      readonly currencyIdA: AcalaPrimitivesCurrencyCurrencyId;
      readonly currencyIdB: AcalaPrimitivesCurrencyCurrencyId;
      readonly amountA: Compact<u128>;
      readonly amountB: Compact<u128>;
    } & Struct;
    readonly isClaimDexShare: boolean;
    readonly asClaimDexShare: {
      readonly owner: AccountId32;
      readonly currencyIdA: AcalaPrimitivesCurrencyCurrencyId;
      readonly currencyIdB: AcalaPrimitivesCurrencyCurrencyId;
    } & Struct;
    readonly isRemoveLiquidity: boolean;
    readonly asRemoveLiquidity: {
      readonly currencyIdA: AcalaPrimitivesCurrencyCurrencyId;
      readonly currencyIdB: AcalaPrimitivesCurrencyCurrencyId;
      readonly removeShare: Compact<u128>;
      readonly minWithdrawnA: Compact<u128>;
      readonly minWithdrawnB: Compact<u128>;
      readonly byUnstake: bool;
    } & Struct;
    readonly isListProvisioning: boolean;
    readonly asListProvisioning: {
      readonly currencyIdA: AcalaPrimitivesCurrencyCurrencyId;
      readonly currencyIdB: AcalaPrimitivesCurrencyCurrencyId;
      readonly minContributionA: Compact<u128>;
      readonly minContributionB: Compact<u128>;
      readonly targetProvisionA: Compact<u128>;
      readonly targetProvisionB: Compact<u128>;
      readonly notBefore: Compact<u32>;
    } & Struct;
    readonly isUpdateProvisioningParameters: boolean;
    readonly asUpdateProvisioningParameters: {
      readonly currencyIdA: AcalaPrimitivesCurrencyCurrencyId;
      readonly currencyIdB: AcalaPrimitivesCurrencyCurrencyId;
      readonly minContributionA: Compact<u128>;
      readonly minContributionB: Compact<u128>;
      readonly targetProvisionA: Compact<u128>;
      readonly targetProvisionB: Compact<u128>;
      readonly notBefore: Compact<u32>;
    } & Struct;
    readonly isEndProvisioning: boolean;
    readonly asEndProvisioning: {
      readonly currencyIdA: AcalaPrimitivesCurrencyCurrencyId;
      readonly currencyIdB: AcalaPrimitivesCurrencyCurrencyId;
    } & Struct;
    readonly isEnableTradingPair: boolean;
    readonly asEnableTradingPair: {
      readonly currencyIdA: AcalaPrimitivesCurrencyCurrencyId;
      readonly currencyIdB: AcalaPrimitivesCurrencyCurrencyId;
    } & Struct;
    readonly isDisableTradingPair: boolean;
    readonly asDisableTradingPair: {
      readonly currencyIdA: AcalaPrimitivesCurrencyCurrencyId;
      readonly currencyIdB: AcalaPrimitivesCurrencyCurrencyId;
    } & Struct;
    readonly isRefundProvision: boolean;
    readonly asRefundProvision: {
      readonly owner: AccountId32;
      readonly currencyIdA: AcalaPrimitivesCurrencyCurrencyId;
      readonly currencyIdB: AcalaPrimitivesCurrencyCurrencyId;
    } & Struct;
    readonly isAbortProvisioning: boolean;
    readonly asAbortProvisioning: {
      readonly currencyIdA: AcalaPrimitivesCurrencyCurrencyId;
      readonly currencyIdB: AcalaPrimitivesCurrencyCurrencyId;
    } & Struct;
    readonly type: 'SwapWithExactSupply' | 'SwapWithExactTarget' | 'AddLiquidity' | 'AddProvision' | 'ClaimDexShare' | 'RemoveLiquidity' | 'ListProvisioning' | 'UpdateProvisioningParameters' | 'EndProvisioning' | 'EnableTradingPair' | 'DisableTradingPair' | 'RefundProvision' | 'AbortProvisioning';
  }

  /** @name ModuleDexOracleModuleCall (301) */
  interface ModuleDexOracleModuleCall extends Enum {
    readonly isEnableAveragePrice: boolean;
    readonly asEnableAveragePrice: {
      readonly currencyIdA: AcalaPrimitivesCurrencyCurrencyId;
      readonly currencyIdB: AcalaPrimitivesCurrencyCurrencyId;
      readonly interval: u64;
    } & Struct;
    readonly isDisableAveragePrice: boolean;
    readonly asDisableAveragePrice: {
      readonly currencyIdA: AcalaPrimitivesCurrencyCurrencyId;
      readonly currencyIdB: AcalaPrimitivesCurrencyCurrencyId;
    } & Struct;
    readonly isUpdateAveragePriceInterval: boolean;
    readonly asUpdateAveragePriceInterval: {
      readonly currencyIdA: AcalaPrimitivesCurrencyCurrencyId;
      readonly currencyIdB: AcalaPrimitivesCurrencyCurrencyId;
      readonly newInterval: u64;
    } & Struct;
    readonly type: 'EnableAveragePrice' | 'DisableAveragePrice' | 'UpdateAveragePriceInterval';
  }

  /** @name ModuleAggregatedDexModuleCall (302) */
  interface ModuleAggregatedDexModuleCall extends Enum {
    readonly isSwapWithExactSupply: boolean;
    readonly asSwapWithExactSupply: {
      readonly paths: Vec<ModuleSupportDexAggregatedSwapPath>;
      readonly supplyAmount: Compact<u128>;
      readonly minTargetAmount: Compact<u128>;
    } & Struct;
    readonly isSwapWithExactTarget: boolean;
    readonly asSwapWithExactTarget: {
      readonly paths: Vec<ModuleSupportDexAggregatedSwapPath>;
      readonly targetAmount: Compact<u128>;
      readonly maxSupplyAmount: Compact<u128>;
    } & Struct;
    readonly isUpdateAggregatedSwapPaths: boolean;
    readonly asUpdateAggregatedSwapPaths: {
      readonly updates: Vec<ITuple<[ITuple<[AcalaPrimitivesCurrencyCurrencyId, AcalaPrimitivesCurrencyCurrencyId]>, Option<Vec<ModuleSupportDexAggregatedSwapPath>>]>>;
    } & Struct;
    readonly type: 'SwapWithExactSupply' | 'SwapWithExactTarget' | 'UpdateAggregatedSwapPaths';
  }

  /** @name ModuleAuctionManagerModuleCall (307) */
  interface ModuleAuctionManagerModuleCall extends Enum {
    readonly isCancel: boolean;
    readonly asCancel: {
      readonly id: u32;
    } & Struct;
    readonly type: 'Cancel';
  }

  /** @name ModuleLoansModuleCall (308) */
  type ModuleLoansModuleCall = Null;

  /** @name ModuleHonzonModuleCall (309) */
  interface ModuleHonzonModuleCall extends Enum {
    readonly isAdjustLoan: boolean;
    readonly asAdjustLoan: {
      readonly currencyId: AcalaPrimitivesCurrencyCurrencyId;
      readonly collateralAdjustment: i128;
      readonly debitAdjustment: i128;
    } & Struct;
    readonly isCloseLoanHasDebitByDex: boolean;
    readonly asCloseLoanHasDebitByDex: {
      readonly currencyId: AcalaPrimitivesCurrencyCurrencyId;
      readonly maxCollateralAmount: Compact<u128>;
    } & Struct;
    readonly isTransferLoanFrom: boolean;
    readonly asTransferLoanFrom: {
      readonly currencyId: AcalaPrimitivesCurrencyCurrencyId;
      readonly from: MultiAddress;
    } & Struct;
    readonly isAuthorize: boolean;
    readonly asAuthorize: {
      readonly currencyId: AcalaPrimitivesCurrencyCurrencyId;
      readonly to: MultiAddress;
    } & Struct;
    readonly isUnauthorize: boolean;
    readonly asUnauthorize: {
      readonly currencyId: AcalaPrimitivesCurrencyCurrencyId;
      readonly to: MultiAddress;
    } & Struct;
    readonly isUnauthorizeAll: boolean;
    readonly isExpandPositionCollateral: boolean;
    readonly asExpandPositionCollateral: {
      readonly currencyId: AcalaPrimitivesCurrencyCurrencyId;
      readonly increaseDebitValue: u128;
      readonly minIncreaseCollateral: u128;
    } & Struct;
    readonly isShrinkPositionDebit: boolean;
    readonly asShrinkPositionDebit: {
      readonly currencyId: AcalaPrimitivesCurrencyCurrencyId;
      readonly decreaseCollateral: u128;
      readonly minDecreaseDebitValue: u128;
    } & Struct;
    readonly isAdjustLoanByDebitValue: boolean;
    readonly asAdjustLoanByDebitValue: {
      readonly currencyId: AcalaPrimitivesCurrencyCurrencyId;
      readonly collateralAdjustment: i128;
      readonly debitValueAdjustment: i128;
    } & Struct;
    readonly isTransferDebit: boolean;
    readonly asTransferDebit: {
      readonly fromCurrency: AcalaPrimitivesCurrencyCurrencyId;
      readonly toCurrency: AcalaPrimitivesCurrencyCurrencyId;
      readonly debitTransfer: u128;
    } & Struct;
    readonly type: 'AdjustLoan' | 'CloseLoanHasDebitByDex' | 'TransferLoanFrom' | 'Authorize' | 'Unauthorize' | 'UnauthorizeAll' | 'ExpandPositionCollateral' | 'ShrinkPositionDebit' | 'AdjustLoanByDebitValue' | 'TransferDebit';
  }

  /** @name ModuleCdpTreasuryModuleCall (310) */
  interface ModuleCdpTreasuryModuleCall extends Enum {
    readonly isExtractSurplusToTreasury: boolean;
    readonly asExtractSurplusToTreasury: {
      readonly amount: Compact<u128>;
    } & Struct;
    readonly isAuctionCollateral: boolean;
    readonly asAuctionCollateral: {
      readonly currencyId: AcalaPrimitivesCurrencyCurrencyId;
      readonly amount: Compact<u128>;
      readonly target: Compact<u128>;
      readonly splited: bool;
    } & Struct;
    readonly isExchangeCollateralToStable: boolean;
    readonly asExchangeCollateralToStable: {
      readonly currencyId: AcalaPrimitivesCurrencyCurrencyId;
      readonly swapLimit: ModuleSupportDexSwapLimit;
    } & Struct;
    readonly isSetExpectedCollateralAuctionSize: boolean;
    readonly asSetExpectedCollateralAuctionSize: {
      readonly currencyId: AcalaPrimitivesCurrencyCurrencyId;
      readonly size_: Compact<u128>;
    } & Struct;
    readonly type: 'ExtractSurplusToTreasury' | 'AuctionCollateral' | 'ExchangeCollateralToStable' | 'SetExpectedCollateralAuctionSize';
  }

  /** @name ModuleSupportDexSwapLimit (311) */
  interface ModuleSupportDexSwapLimit extends Enum {
    readonly isExactSupply: boolean;
    readonly asExactSupply: ITuple<[u128, u128]>;
    readonly isExactTarget: boolean;
    readonly asExactTarget: ITuple<[u128, u128]>;
    readonly type: 'ExactSupply' | 'ExactTarget';
  }

  /** @name ModuleCdpEngineModuleCall (312) */
  interface ModuleCdpEngineModuleCall extends Enum {
    readonly isLiquidate: boolean;
    readonly asLiquidate: {
      readonly currencyId: AcalaPrimitivesCurrencyCurrencyId;
      readonly who: MultiAddress;
    } & Struct;
    readonly isSettle: boolean;
    readonly asSettle: {
      readonly currencyId: AcalaPrimitivesCurrencyCurrencyId;
      readonly who: MultiAddress;
    } & Struct;
    readonly isSetCollateralParams: boolean;
    readonly asSetCollateralParams: {
      readonly currencyId: AcalaPrimitivesCurrencyCurrencyId;
      readonly interestRatePerSec: OrmlTraitsChangeOption;
      readonly liquidationRatio: OrmlTraitsChangeOption;
      readonly liquidationPenalty: OrmlTraitsChangeOption;
      readonly requiredCollateralRatio: OrmlTraitsChangeOption;
      readonly maximumTotalDebitValue: OrmlTraitsChangeU128;
    } & Struct;
    readonly isRegisterLiquidationContract: boolean;
    readonly asRegisterLiquidationContract: {
      readonly address: H160;
    } & Struct;
    readonly isDeregisterLiquidationContract: boolean;
    readonly asDeregisterLiquidationContract: {
      readonly address: H160;
    } & Struct;
    readonly type: 'Liquidate' | 'Settle' | 'SetCollateralParams' | 'RegisterLiquidationContract' | 'DeregisterLiquidationContract';
  }

  /** @name OrmlTraitsChangeOption (313) */
  interface OrmlTraitsChangeOption extends Enum {
    readonly isNoChange: boolean;
    readonly isNewValue: boolean;
    readonly asNewValue: Option<u128>;
    readonly type: 'NoChange' | 'NewValue';
  }

  /** @name OrmlTraitsChangeU128 (314) */
  interface OrmlTraitsChangeU128 extends Enum {
    readonly isNoChange: boolean;
    readonly isNewValue: boolean;
    readonly asNewValue: u128;
    readonly type: 'NoChange' | 'NewValue';
  }

  /** @name ModuleEmergencyShutdownModuleCall (315) */
  interface ModuleEmergencyShutdownModuleCall extends Enum {
    readonly isEmergencyShutdown: boolean;
    readonly isOpenCollateralRefund: boolean;
    readonly isRefundCollaterals: boolean;
    readonly asRefundCollaterals: {
      readonly amount: Compact<u128>;
    } & Struct;
    readonly type: 'EmergencyShutdown' | 'OpenCollateralRefund' | 'RefundCollaterals';
  }

  /** @name ModuleHomaModuleCall (316) */
  interface ModuleHomaModuleCall extends Enum {
    readonly isMint: boolean;
    readonly asMint: {
      readonly amount: Compact<u128>;
    } & Struct;
    readonly isRequestRedeem: boolean;
    readonly asRequestRedeem: {
      readonly amount: Compact<u128>;
      readonly allowFastMatch: bool;
    } & Struct;
    readonly isFastMatchRedeems: boolean;
    readonly asFastMatchRedeems: {
      readonly redeemerList: Vec<AccountId32>;
    } & Struct;
    readonly isClaimRedemption: boolean;
    readonly asClaimRedemption: {
      readonly redeemer: AccountId32;
    } & Struct;
    readonly isUpdateHomaParams: boolean;
    readonly asUpdateHomaParams: {
      readonly softBondedCapPerSubAccount: Option<u128>;
      readonly estimatedRewardRatePerEra: Option<u128>;
      readonly commissionRate: Option<u128>;
      readonly fastMatchFeeRate: Option<u128>;
    } & Struct;
    readonly isUpdateBumpEraParams: boolean;
    readonly asUpdateBumpEraParams: {
      readonly lastEraBumpedBlock: Option<u32>;
      readonly frequency: Option<u32>;
    } & Struct;
    readonly isResetLedgers: boolean;
    readonly asResetLedgers: {
      readonly updates: Vec<ITuple<[u16, Option<u128>, Option<Vec<ModuleHomaModuleUnlockChunk>>]>>;
    } & Struct;
    readonly isResetCurrentEra: boolean;
    readonly asResetCurrentEra: {
      readonly eraIndex: u32;
    } & Struct;
    readonly isForceBumpCurrentEra: boolean;
    readonly asForceBumpCurrentEra: {
      readonly bumpAmount: u32;
    } & Struct;
    readonly isFastMatchRedeemsCompletely: boolean;
    readonly asFastMatchRedeemsCompletely: {
      readonly redeemerList: Vec<AccountId32>;
    } & Struct;
    readonly type: 'Mint' | 'RequestRedeem' | 'FastMatchRedeems' | 'ClaimRedemption' | 'UpdateHomaParams' | 'UpdateBumpEraParams' | 'ResetLedgers' | 'ResetCurrentEra' | 'ForceBumpCurrentEra' | 'FastMatchRedeemsCompletely';
  }

  /** @name ModuleXcmInterfaceModuleCall (321) */
  interface ModuleXcmInterfaceModuleCall extends Enum {
    readonly isUpdateXcmDestWeightAndFee: boolean;
    readonly asUpdateXcmDestWeightAndFee: {
      readonly updates: Vec<ITuple<[ModuleXcmInterfaceModuleXcmInterfaceOperation, Option<u64>, Option<u128>]>>;
    } & Struct;
    readonly type: 'UpdateXcmDestWeightAndFee';
  }

  /** @name ModuleIncentivesModuleCall (324) */
  interface ModuleIncentivesModuleCall extends Enum {
    readonly isDepositDexShare: boolean;
    readonly asDepositDexShare: {
      readonly lpCurrencyId: AcalaPrimitivesCurrencyCurrencyId;
      readonly amount: Compact<u128>;
    } & Struct;
    readonly isWithdrawDexShare: boolean;
    readonly asWithdrawDexShare: {
      readonly lpCurrencyId: AcalaPrimitivesCurrencyCurrencyId;
      readonly amount: Compact<u128>;
    } & Struct;
    readonly isClaimRewards: boolean;
    readonly asClaimRewards: {
      readonly poolId: ModuleSupportIncentivesPoolId;
    } & Struct;
    readonly isUpdateIncentiveRewards: boolean;
    readonly asUpdateIncentiveRewards: {
      readonly updates: Vec<ITuple<[ModuleSupportIncentivesPoolId, Vec<ITuple<[AcalaPrimitivesCurrencyCurrencyId, u128]>>]>>;
    } & Struct;
    readonly isUpdateClaimRewardDeductionRates: boolean;
    readonly asUpdateClaimRewardDeductionRates: {
      readonly updates: Vec<ITuple<[ModuleSupportIncentivesPoolId, u128]>>;
    } & Struct;
    readonly type: 'DepositDexShare' | 'WithdrawDexShare' | 'ClaimRewards' | 'UpdateIncentiveRewards' | 'UpdateClaimRewardDeductionRates';
  }

  /** @name ModuleNftModuleCall (329) */
  interface ModuleNftModuleCall extends Enum {
    readonly isCreateClass: boolean;
    readonly asCreateClass: {
      readonly metadata: Bytes;
      readonly properties: u8;
      readonly attributes: BTreeMap<Bytes, Bytes>;
    } & Struct;
    readonly isMint: boolean;
    readonly asMint: {
      readonly to: MultiAddress;
      readonly classId: u32;
      readonly metadata: Bytes;
      readonly attributes: BTreeMap<Bytes, Bytes>;
      readonly quantity: Compact<u32>;
    } & Struct;
    readonly isTransfer: boolean;
    readonly asTransfer: {
      readonly to: MultiAddress;
      readonly token: ITuple<[u32, u64]>;
    } & Struct;
    readonly isBurn: boolean;
    readonly asBurn: {
      readonly token: ITuple<[u32, u64]>;
    } & Struct;
    readonly isBurnWithRemark: boolean;
    readonly asBurnWithRemark: {
      readonly token: ITuple<[u32, u64]>;
      readonly remark: Bytes;
    } & Struct;
    readonly isDestroyClass: boolean;
    readonly asDestroyClass: {
      readonly classId: u32;
      readonly dest: MultiAddress;
    } & Struct;
    readonly isUpdateClassProperties: boolean;
    readonly asUpdateClassProperties: {
      readonly classId: u32;
      readonly properties: u8;
    } & Struct;
    readonly type: 'CreateClass' | 'Mint' | 'Transfer' | 'Burn' | 'BurnWithRemark' | 'DestroyClass' | 'UpdateClassProperties';
  }

  /** @name AcalaPrimitivesNftClassProperty (331) */
  interface AcalaPrimitivesNftClassProperty extends Enum {
    readonly isTransferable: boolean;
    readonly isBurnable: boolean;
    readonly isMintable: boolean;
    readonly isClassPropertiesMutable: boolean;
    readonly type: 'Transferable' | 'Burnable' | 'Mintable' | 'ClassPropertiesMutable';
  }

  /** @name ModuleAssetRegistryModuleCall (334) */
  interface ModuleAssetRegistryModuleCall extends Enum {
    readonly isRegisterForeignAsset: boolean;
    readonly asRegisterForeignAsset: {
      readonly location: XcmVersionedMultiLocation;
      readonly metadata: AcalaPrimitivesCurrencyAssetMetadata;
    } & Struct;
    readonly isUpdateForeignAsset: boolean;
    readonly asUpdateForeignAsset: {
      readonly foreignAssetId: u16;
      readonly location: XcmVersionedMultiLocation;
      readonly metadata: AcalaPrimitivesCurrencyAssetMetadata;
    } & Struct;
    readonly isRegisterStableAsset: boolean;
    readonly asRegisterStableAsset: {
      readonly metadata: AcalaPrimitivesCurrencyAssetMetadata;
    } & Struct;
    readonly isUpdateStableAsset: boolean;
    readonly asUpdateStableAsset: {
      readonly stableAssetId: u32;
      readonly metadata: AcalaPrimitivesCurrencyAssetMetadata;
    } & Struct;
    readonly isRegisterErc20Asset: boolean;
    readonly asRegisterErc20Asset: {
      readonly contract: H160;
      readonly minimalBalance: u128;
    } & Struct;
    readonly isUpdateErc20Asset: boolean;
    readonly asUpdateErc20Asset: {
      readonly contract: H160;
      readonly metadata: AcalaPrimitivesCurrencyAssetMetadata;
    } & Struct;
    readonly isRegisterNativeAsset: boolean;
    readonly asRegisterNativeAsset: {
      readonly currencyId: AcalaPrimitivesCurrencyCurrencyId;
      readonly metadata: AcalaPrimitivesCurrencyAssetMetadata;
    } & Struct;
    readonly isUpdateNativeAsset: boolean;
    readonly asUpdateNativeAsset: {
      readonly currencyId: AcalaPrimitivesCurrencyCurrencyId;
      readonly metadata: AcalaPrimitivesCurrencyAssetMetadata;
    } & Struct;
    readonly type: 'RegisterForeignAsset' | 'UpdateForeignAsset' | 'RegisterStableAsset' | 'UpdateStableAsset' | 'RegisterErc20Asset' | 'UpdateErc20Asset' | 'RegisterNativeAsset' | 'UpdateNativeAsset';
  }

  /** @name ModuleEvmModuleCall (335) */
  interface ModuleEvmModuleCall extends Enum {
    readonly isEthCall: boolean;
    readonly asEthCall: {
      readonly action: EthereumTransactionTransactionAction;
      readonly input: Bytes;
      readonly value: Compact<u128>;
      readonly gasLimit: Compact<u64>;
      readonly storageLimit: Compact<u32>;
      readonly accessList: Vec<EthereumTransactionAccessListItem>;
      readonly validUntil: Compact<u32>;
    } & Struct;
    readonly isCall: boolean;
    readonly asCall: {
      readonly target: H160;
      readonly input: Bytes;
      readonly value: Compact<u128>;
      readonly gasLimit: Compact<u64>;
      readonly storageLimit: Compact<u32>;
      readonly accessList: Vec<EthereumTransactionAccessListItem>;
    } & Struct;
    readonly isScheduledCall: boolean;
    readonly asScheduledCall: {
      readonly from: H160;
      readonly target: H160;
      readonly input: Bytes;
      readonly value: Compact<u128>;
      readonly gasLimit: Compact<u64>;
      readonly storageLimit: Compact<u32>;
      readonly accessList: Vec<EthereumTransactionAccessListItem>;
    } & Struct;
    readonly isCreate: boolean;
    readonly asCreate: {
      readonly input: Bytes;
      readonly value: Compact<u128>;
      readonly gasLimit: Compact<u64>;
      readonly storageLimit: Compact<u32>;
      readonly accessList: Vec<EthereumTransactionAccessListItem>;
    } & Struct;
    readonly isCreate2: boolean;
    readonly asCreate2: {
      readonly input: Bytes;
      readonly salt: H256;
      readonly value: Compact<u128>;
      readonly gasLimit: Compact<u64>;
      readonly storageLimit: Compact<u32>;
      readonly accessList: Vec<EthereumTransactionAccessListItem>;
    } & Struct;
    readonly isCreateNftContract: boolean;
    readonly asCreateNftContract: {
      readonly input: Bytes;
      readonly value: Compact<u128>;
      readonly gasLimit: Compact<u64>;
      readonly storageLimit: Compact<u32>;
      readonly accessList: Vec<EthereumTransactionAccessListItem>;
    } & Struct;
    readonly isCreatePredeployContract: boolean;
    readonly asCreatePredeployContract: {
      readonly target: H160;
      readonly input: Bytes;
      readonly value: Compact<u128>;
      readonly gasLimit: Compact<u64>;
      readonly storageLimit: Compact<u32>;
      readonly accessList: Vec<EthereumTransactionAccessListItem>;
    } & Struct;
    readonly isTransferMaintainer: boolean;
    readonly asTransferMaintainer: {
      readonly contract: H160;
      readonly newMaintainer: H160;
    } & Struct;
    readonly isPublishContract: boolean;
    readonly asPublishContract: {
      readonly contract: H160;
    } & Struct;
    readonly isPublishFree: boolean;
    readonly asPublishFree: {
      readonly contract: H160;
    } & Struct;
    readonly isEnableContractDevelopment: boolean;
    readonly isDisableContractDevelopment: boolean;
    readonly isSetCode: boolean;
    readonly asSetCode: {
      readonly contract: H160;
      readonly code: Bytes;
    } & Struct;
    readonly isSelfdestruct: boolean;
    readonly asSelfdestruct: {
      readonly contract: H160;
    } & Struct;
    readonly isStrictCall: boolean;
    readonly asStrictCall: {
      readonly target: H160;
      readonly input: Bytes;
      readonly value: Compact<u128>;
      readonly gasLimit: Compact<u64>;
      readonly storageLimit: Compact<u32>;
      readonly accessList: Vec<EthereumTransactionAccessListItem>;
    } & Struct;
    readonly type: 'EthCall' | 'Call' | 'ScheduledCall' | 'Create' | 'Create2' | 'CreateNftContract' | 'CreatePredeployContract' | 'TransferMaintainer' | 'PublishContract' | 'PublishFree' | 'EnableContractDevelopment' | 'DisableContractDevelopment' | 'SetCode' | 'Selfdestruct' | 'StrictCall';
  }

  /** @name EthereumTransactionTransactionAction (336) */
  interface EthereumTransactionTransactionAction extends Enum {
    readonly isCall: boolean;
    readonly asCall: H160;
    readonly isCreate: boolean;
    readonly type: 'Call' | 'Create';
  }

  /** @name EthereumTransactionAccessListItem (338) */
  interface EthereumTransactionAccessListItem extends Struct {
    readonly address: H160;
    readonly storageKeys: Vec<H256>;
  }

  /** @name ModuleEvmAccountsModuleCall (339) */
  interface ModuleEvmAccountsModuleCall extends Enum {
    readonly isClaimAccount: boolean;
    readonly asClaimAccount: {
      readonly ethAddress: H160;
      readonly ethSignature: U8aFixed;
    } & Struct;
    readonly isClaimDefaultAccount: boolean;
    readonly type: 'ClaimAccount' | 'ClaimDefaultAccount';
  }

  /** @name NutsfinanceStableAssetCall (340) */
  interface NutsfinanceStableAssetCall extends Enum {
    readonly isCreatePool: boolean;
    readonly asCreatePool: {
      readonly poolAsset: AcalaPrimitivesCurrencyCurrencyId;
      readonly assets: Vec<AcalaPrimitivesCurrencyCurrencyId>;
      readonly precisions: Vec<u128>;
      readonly mintFee: u128;
      readonly swapFee: u128;
      readonly redeemFee: u128;
      readonly initialA: u128;
      readonly feeRecipient: AccountId32;
      readonly yieldRecipient: AccountId32;
      readonly precision: u128;
    } & Struct;
    readonly isMint: boolean;
    readonly asMint: {
      readonly poolId: u32;
      readonly amounts: Vec<u128>;
      readonly minMintAmount: u128;
    } & Struct;
    readonly isSwap: boolean;
    readonly asSwap: {
      readonly poolId: u32;
      readonly i: u32;
      readonly j: u32;
      readonly dx: u128;
      readonly minDy: u128;
      readonly assetLength: u32;
    } & Struct;
    readonly isRedeemProportion: boolean;
    readonly asRedeemProportion: {
      readonly poolId: u32;
      readonly amount: u128;
      readonly minRedeemAmounts: Vec<u128>;
    } & Struct;
    readonly isRedeemSingle: boolean;
    readonly asRedeemSingle: {
      readonly poolId: u32;
      readonly amount: u128;
      readonly i: u32;
      readonly minRedeemAmount: u128;
      readonly assetLength: u32;
    } & Struct;
    readonly isRedeemMulti: boolean;
    readonly asRedeemMulti: {
      readonly poolId: u32;
      readonly amounts: Vec<u128>;
      readonly maxRedeemAmount: u128;
    } & Struct;
    readonly isModifyA: boolean;
    readonly asModifyA: {
      readonly poolId: u32;
      readonly a: u128;
      readonly futureABlock: u32;
    } & Struct;
    readonly isModifyFees: boolean;
    readonly asModifyFees: {
      readonly poolId: u32;
      readonly mintFee: Option<u128>;
      readonly swapFee: Option<u128>;
      readonly redeemFee: Option<u128>;
    } & Struct;
    readonly isModifyRecipients: boolean;
    readonly asModifyRecipients: {
      readonly poolId: u32;
      readonly feeRecipient: Option<AccountId32>;
      readonly yieldRecipient: Option<AccountId32>;
    } & Struct;
    readonly type: 'CreatePool' | 'Mint' | 'Swap' | 'RedeemProportion' | 'RedeemSingle' | 'RedeemMulti' | 'ModifyA' | 'ModifyFees' | 'ModifyRecipients';
  }

  /** @name CumulusPalletParachainSystemCall (341) */
  interface CumulusPalletParachainSystemCall extends Enum {
    readonly isSetValidationData: boolean;
    readonly asSetValidationData: {
      readonly data: CumulusPrimitivesParachainInherentParachainInherentData;
    } & Struct;
    readonly isSudoSendUpwardMessage: boolean;
    readonly asSudoSendUpwardMessage: {
      readonly message: Bytes;
    } & Struct;
    readonly isAuthorizeUpgrade: boolean;
    readonly asAuthorizeUpgrade: {
      readonly codeHash: H256;
    } & Struct;
    readonly isEnactAuthorizedUpgrade: boolean;
    readonly asEnactAuthorizedUpgrade: {
      readonly code: Bytes;
    } & Struct;
    readonly type: 'SetValidationData' | 'SudoSendUpwardMessage' | 'AuthorizeUpgrade' | 'EnactAuthorizedUpgrade';
  }

  /** @name CumulusPrimitivesParachainInherentParachainInherentData (342) */
  interface CumulusPrimitivesParachainInherentParachainInherentData extends Struct {
    readonly validationData: PolkadotPrimitivesV2PersistedValidationData;
    readonly relayChainState: SpTrieStorageProof;
    readonly downwardMessages: Vec<PolkadotCorePrimitivesInboundDownwardMessage>;
    readonly horizontalMessages: BTreeMap<u32, Vec<PolkadotCorePrimitivesInboundHrmpMessage>>;
  }

  /** @name PolkadotPrimitivesV2PersistedValidationData (343) */
  interface PolkadotPrimitivesV2PersistedValidationData extends Struct {
    readonly parentHead: Bytes;
    readonly relayParentNumber: u32;
    readonly relayParentStorageRoot: H256;
    readonly maxPovSize: u32;
  }

  /** @name SpTrieStorageProof (345) */
  interface SpTrieStorageProof extends Struct {
    readonly trieNodes: BTreeSet<Bytes>;
  }

  /** @name PolkadotCorePrimitivesInboundDownwardMessage (348) */
  interface PolkadotCorePrimitivesInboundDownwardMessage extends Struct {
    readonly sentAt: u32;
    readonly msg: Bytes;
  }

  /** @name PolkadotCorePrimitivesInboundHrmpMessage (351) */
  interface PolkadotCorePrimitivesInboundHrmpMessage extends Struct {
    readonly sentAt: u32;
    readonly data: Bytes;
  }

  /** @name PalletSudoCall (354) */
  interface PalletSudoCall extends Enum {
    readonly isSudo: boolean;
    readonly asSudo: {
      readonly call: Call;
    } & Struct;
    readonly isSudoUncheckedWeight: boolean;
    readonly asSudoUncheckedWeight: {
      readonly call: Call;
      readonly weight: u64;
    } & Struct;
    readonly isSetKey: boolean;
    readonly asSetKey: {
      readonly new_: MultiAddress;
    } & Struct;
    readonly isSudoAs: boolean;
    readonly asSudoAs: {
      readonly who: MultiAddress;
      readonly call: Call;
    } & Struct;
    readonly type: 'Sudo' | 'SudoUncheckedWeight' | 'SetKey' | 'SudoAs';
  }

  /** @name PalletSchedulerError (355) */
  interface PalletSchedulerError extends Enum {
    readonly isFailedToSchedule: boolean;
    readonly isNotFound: boolean;
    readonly isTargetBlockNumberInPast: boolean;
    readonly isRescheduleNoChange: boolean;
    readonly type: 'FailedToSchedule' | 'NotFound' | 'TargetBlockNumberInPast' | 'RescheduleNoChange';
  }

  /** @name PalletUtilityError (356) */
  interface PalletUtilityError extends Enum {
    readonly isTooManyCalls: boolean;
    readonly type: 'TooManyCalls';
  }

  /** @name PalletMultisigMultisig (358) */
  interface PalletMultisigMultisig extends Struct {
    readonly when: PalletMultisigTimepoint;
    readonly deposit: u128;
    readonly depositor: AccountId32;
    readonly approvals: Vec<AccountId32>;
  }

  /** @name PalletMultisigError (360) */
  interface PalletMultisigError extends Enum {
    readonly isMinimumThreshold: boolean;
    readonly isAlreadyApproved: boolean;
    readonly isNoApprovalsNeeded: boolean;
    readonly isTooFewSignatories: boolean;
    readonly isTooManySignatories: boolean;
    readonly isSignatoriesOutOfOrder: boolean;
    readonly isSenderInSignatories: boolean;
    readonly isNotFound: boolean;
    readonly isNotOwner: boolean;
    readonly isNoTimepoint: boolean;
    readonly isWrongTimepoint: boolean;
    readonly isUnexpectedTimepoint: boolean;
    readonly isMaxWeightTooLow: boolean;
    readonly isAlreadyStored: boolean;
    readonly type: 'MinimumThreshold' | 'AlreadyApproved' | 'NoApprovalsNeeded' | 'TooFewSignatories' | 'TooManySignatories' | 'SignatoriesOutOfOrder' | 'SenderInSignatories' | 'NotFound' | 'NotOwner' | 'NoTimepoint' | 'WrongTimepoint' | 'UnexpectedTimepoint' | 'MaxWeightTooLow' | 'AlreadyStored';
  }

  /** @name PalletProxyProxyDefinition (363) */
  interface PalletProxyProxyDefinition extends Struct {
    readonly delegate: AccountId32;
    readonly proxyType: RuntimeCommonProxyType;
    readonly delay: u32;
  }

  /** @name PalletProxyAnnouncement (367) */
  interface PalletProxyAnnouncement extends Struct {
    readonly real: AccountId32;
    readonly callHash: H256;
    readonly height: u32;
  }

  /** @name PalletProxyError (369) */
  interface PalletProxyError extends Enum {
    readonly isTooMany: boolean;
    readonly isNotFound: boolean;
    readonly isNotProxy: boolean;
    readonly isUnproxyable: boolean;
    readonly isDuplicate: boolean;
    readonly isNoPermission: boolean;
    readonly isUnannounced: boolean;
    readonly isNoSelfProxy: boolean;
    readonly type: 'TooMany' | 'NotFound' | 'NotProxy' | 'Unproxyable' | 'Duplicate' | 'NoPermission' | 'Unannounced' | 'NoSelfProxy';
  }

  /** @name ModuleTransactionPauseModuleError (370) */
  interface ModuleTransactionPauseModuleError extends Enum {
    readonly isCannotPause: boolean;
    readonly isInvalidCharacter: boolean;
    readonly type: 'CannotPause' | 'InvalidCharacter';
  }

  /** @name PalletPreimageRequestStatus (371) */
  interface PalletPreimageRequestStatus extends Enum {
    readonly isUnrequested: boolean;
    readonly asUnrequested: Option<ITuple<[AccountId32, u128]>>;
    readonly isRequested: boolean;
    readonly asRequested: u32;
    readonly type: 'Unrequested' | 'Requested';
  }

  /** @name PalletPreimageError (375) */
  interface PalletPreimageError extends Enum {
    readonly isTooLarge: boolean;
    readonly isAlreadyNoted: boolean;
    readonly isNotAuthorized: boolean;
    readonly isNotNoted: boolean;
    readonly isRequested: boolean;
    readonly isNotRequested: boolean;
    readonly type: 'TooLarge' | 'AlreadyNoted' | 'NotAuthorized' | 'NotNoted' | 'Requested' | 'NotRequested';
  }

  /** @name PalletBalancesBalanceLock (377) */
  interface PalletBalancesBalanceLock extends Struct {
    readonly id: U8aFixed;
    readonly amount: u128;
    readonly reasons: PalletBalancesReasons;
  }

  /** @name PalletBalancesReasons (378) */
  interface PalletBalancesReasons extends Enum {
    readonly isFee: boolean;
    readonly isMisc: boolean;
    readonly isAll: boolean;
    readonly type: 'Fee' | 'Misc' | 'All';
  }

  /** @name PalletBalancesReserveData (381) */
  interface PalletBalancesReserveData extends Struct {
    readonly id: AcalaPrimitivesReserveIdentifier;
    readonly amount: u128;
  }

  /** @name AcalaPrimitivesReserveIdentifier (382) */
  interface AcalaPrimitivesReserveIdentifier extends Enum {
    readonly isCollatorSelection: boolean;
    readonly isEvmStorageDeposit: boolean;
    readonly isEvmDeveloperDeposit: boolean;
    readonly isHonzon: boolean;
    readonly isNft: boolean;
    readonly isTransactionPayment: boolean;
    readonly isTransactionPaymentDeposit: boolean;
    readonly isCount: boolean;
    readonly type: 'CollatorSelection' | 'EvmStorageDeposit' | 'EvmDeveloperDeposit' | 'Honzon' | 'Nft' | 'TransactionPayment' | 'TransactionPaymentDeposit' | 'Count';
  }

  /** @name PalletBalancesReleases (384) */
  interface PalletBalancesReleases extends Enum {
    readonly isV100: boolean;
    readonly isV200: boolean;
    readonly type: 'V100' | 'V200';
  }

  /** @name PalletBalancesError (385) */
  interface PalletBalancesError extends Enum {
    readonly isVestingBalance: boolean;
    readonly isLiquidityRestrictions: boolean;
    readonly isInsufficientBalance: boolean;
    readonly isExistentialDeposit: boolean;
    readonly isKeepAlive: boolean;
    readonly isExistingVestingSchedule: boolean;
    readonly isDeadAccount: boolean;
    readonly isTooManyReserves: boolean;
    readonly type: 'VestingBalance' | 'LiquidityRestrictions' | 'InsufficientBalance' | 'ExistentialDeposit' | 'KeepAlive' | 'ExistingVestingSchedule' | 'DeadAccount' | 'TooManyReserves';
  }

  /** @name OrmlTokensBalanceLock (388) */
  interface OrmlTokensBalanceLock extends Struct {
    readonly id: U8aFixed;
    readonly amount: u128;
  }

  /** @name OrmlTokensAccountData (390) */
  interface OrmlTokensAccountData extends Struct {
    readonly free: u128;
    readonly reserved: u128;
    readonly frozen: u128;
  }

  /** @name OrmlTokensReserveData (392) */
  interface OrmlTokensReserveData extends Struct {
    readonly id: AcalaPrimitivesReserveIdentifier;
    readonly amount: u128;
  }

  /** @name OrmlTokensModuleError (394) */
  interface OrmlTokensModuleError extends Enum {
    readonly isBalanceTooLow: boolean;
    readonly isAmountIntoBalanceFailed: boolean;
    readonly isLiquidityRestrictions: boolean;
    readonly isMaxLocksExceeded: boolean;
    readonly isKeepAlive: boolean;
    readonly isExistentialDeposit: boolean;
    readonly isDeadAccount: boolean;
    readonly isTooManyReserves: boolean;
    readonly type: 'BalanceTooLow' | 'AmountIntoBalanceFailed' | 'LiquidityRestrictions' | 'MaxLocksExceeded' | 'KeepAlive' | 'ExistentialDeposit' | 'DeadAccount' | 'TooManyReserves';
  }

  /** @name ModuleCurrenciesModuleError (395) */
  interface ModuleCurrenciesModuleError extends Enum {
    readonly isAmountIntoBalanceFailed: boolean;
    readonly isBalanceTooLow: boolean;
    readonly isErc20InvalidOperation: boolean;
    readonly isEvmAccountNotFound: boolean;
    readonly isRealOriginNotFound: boolean;
    readonly isDepositFailed: boolean;
    readonly type: 'AmountIntoBalanceFailed' | 'BalanceTooLow' | 'Erc20InvalidOperation' | 'EvmAccountNotFound' | 'RealOriginNotFound' | 'DepositFailed';
  }

  /** @name OrmlVestingModuleError (397) */
  interface OrmlVestingModuleError extends Enum {
    readonly isZeroVestingPeriod: boolean;
    readonly isZeroVestingPeriodCount: boolean;
    readonly isInsufficientBalanceToLock: boolean;
    readonly isTooManyVestingSchedules: boolean;
    readonly isAmountLow: boolean;
    readonly isMaxVestingSchedulesExceeded: boolean;
    readonly type: 'ZeroVestingPeriod' | 'ZeroVestingPeriodCount' | 'InsufficientBalanceToLock' | 'TooManyVestingSchedules' | 'AmountLow' | 'MaxVestingSchedulesExceeded';
  }

  /** @name FrameSupportPalletId (399) */
  interface FrameSupportPalletId extends U8aFixed {}

  /** @name ModuleTransactionPaymentModuleError (401) */
  interface ModuleTransactionPaymentModuleError extends Enum {
    readonly isInvalidSwapPath: boolean;
    readonly isInvalidBalance: boolean;
    readonly isInvalidRate: boolean;
    readonly isInvalidToken: boolean;
    readonly isDexNotAvailable: boolean;
    readonly isChargeFeePoolAlreadyExisted: boolean;
    readonly type: 'InvalidSwapPath' | 'InvalidBalance' | 'InvalidRate' | 'InvalidToken' | 'DexNotAvailable' | 'ChargeFeePoolAlreadyExisted';
  }

  /** @name PalletTreasuryProposal (402) */
  interface PalletTreasuryProposal extends Struct {
    readonly proposer: AccountId32;
    readonly value: u128;
    readonly beneficiary: AccountId32;
    readonly bond: u128;
  }

  /** @name PalletTreasuryError (406) */
  interface PalletTreasuryError extends Enum {
    readonly isInsufficientProposersBalance: boolean;
    readonly isInvalidIndex: boolean;
    readonly isTooManyApprovals: boolean;
    readonly isInsufficientPermission: boolean;
    readonly isProposalNotApproved: boolean;
    readonly type: 'InsufficientProposersBalance' | 'InvalidIndex' | 'TooManyApprovals' | 'InsufficientPermission' | 'ProposalNotApproved';
  }

  /** @name PalletBountiesBounty (407) */
  interface PalletBountiesBounty extends Struct {
    readonly proposer: AccountId32;
    readonly value: u128;
    readonly fee: u128;
    readonly curatorDeposit: u128;
    readonly bond: u128;
    readonly status: PalletBountiesBountyStatus;
  }

  /** @name PalletBountiesBountyStatus (408) */
  interface PalletBountiesBountyStatus extends Enum {
    readonly isProposed: boolean;
    readonly isApproved: boolean;
    readonly isFunded: boolean;
    readonly isCuratorProposed: boolean;
    readonly asCuratorProposed: {
      readonly curator: AccountId32;
    } & Struct;
    readonly isActive: boolean;
    readonly asActive: {
      readonly curator: AccountId32;
      readonly updateDue: u32;
    } & Struct;
    readonly isPendingPayout: boolean;
    readonly asPendingPayout: {
      readonly curator: AccountId32;
      readonly beneficiary: AccountId32;
      readonly unlockAt: u32;
    } & Struct;
    readonly type: 'Proposed' | 'Approved' | 'Funded' | 'CuratorProposed' | 'Active' | 'PendingPayout';
  }

  /** @name PalletBountiesError (410) */
  interface PalletBountiesError extends Enum {
    readonly isInsufficientProposersBalance: boolean;
    readonly isInvalidIndex: boolean;
    readonly isReasonTooBig: boolean;
    readonly isUnexpectedStatus: boolean;
    readonly isRequireCurator: boolean;
    readonly isInvalidValue: boolean;
    readonly isInvalidFee: boolean;
    readonly isPendingPayout: boolean;
    readonly isPremature: boolean;
    readonly isHasActiveChildBounty: boolean;
    readonly isTooManyQueued: boolean;
    readonly type: 'InsufficientProposersBalance' | 'InvalidIndex' | 'ReasonTooBig' | 'UnexpectedStatus' | 'RequireCurator' | 'InvalidValue' | 'InvalidFee' | 'PendingPayout' | 'Premature' | 'HasActiveChildBounty' | 'TooManyQueued';
  }

  /** @name PalletTipsOpenTip (411) */
  interface PalletTipsOpenTip extends Struct {
    readonly reason: H256;
    readonly who: AccountId32;
    readonly finder: AccountId32;
    readonly deposit: u128;
    readonly closes: Option<u32>;
    readonly tips: Vec<ITuple<[AccountId32, u128]>>;
    readonly findersFee: bool;
  }

  /** @name PalletTipsError (413) */
  interface PalletTipsError extends Enum {
    readonly isReasonTooBig: boolean;
    readonly isAlreadyKnown: boolean;
    readonly isUnknownTip: boolean;
    readonly isNotFinder: boolean;
    readonly isStillOpen: boolean;
    readonly isPremature: boolean;
    readonly type: 'ReasonTooBig' | 'AlreadyKnown' | 'UnknownTip' | 'NotFinder' | 'StillOpen' | 'Premature';
  }

  /** @name PalletAuthorshipUncleEntryItem (415) */
  interface PalletAuthorshipUncleEntryItem extends Enum {
    readonly isInclusionHeight: boolean;
    readonly asInclusionHeight: u32;
    readonly isUncle: boolean;
    readonly asUncle: ITuple<[H256, Option<AccountId32>]>;
    readonly type: 'InclusionHeight' | 'Uncle';
  }

  /** @name PalletAuthorshipError (417) */
  interface PalletAuthorshipError extends Enum {
    readonly isInvalidUncleParent: boolean;
    readonly isUnclesAlreadySet: boolean;
    readonly isTooManyUncles: boolean;
    readonly isGenesisUncle: boolean;
    readonly isTooHighUncle: boolean;
    readonly isUncleAlreadyIncluded: boolean;
    readonly isOldUncle: boolean;
    readonly type: 'InvalidUncleParent' | 'UnclesAlreadySet' | 'TooManyUncles' | 'GenesisUncle' | 'TooHighUncle' | 'UncleAlreadyIncluded' | 'OldUncle';
  }

  /** @name ModuleCollatorSelectionError (421) */
  interface ModuleCollatorSelectionError extends Enum {
    readonly isMaxCandidatesExceeded: boolean;
    readonly isBelowCandidatesMin: boolean;
    readonly isStillLocked: boolean;
    readonly isUnknown: boolean;
    readonly isPermission: boolean;
    readonly isAlreadyCandidate: boolean;
    readonly isNotCandidate: boolean;
    readonly isNotNonCandidate: boolean;
    readonly isNothingToWithdraw: boolean;
    readonly isRequireSessionKey: boolean;
    readonly isAlreadyInvulnerable: boolean;
    readonly isInvalidProof: boolean;
    readonly isMaxInvulnerablesExceeded: boolean;
    readonly type: 'MaxCandidatesExceeded' | 'BelowCandidatesMin' | 'StillLocked' | 'Unknown' | 'Permission' | 'AlreadyCandidate' | 'NotCandidate' | 'NotNonCandidate' | 'NothingToWithdraw' | 'RequireSessionKey' | 'AlreadyInvulnerable' | 'InvalidProof' | 'MaxInvulnerablesExceeded';
  }

  /** @name SpCoreCryptoKeyTypeId (425) */
  interface SpCoreCryptoKeyTypeId extends U8aFixed {}

  /** @name PalletSessionError (426) */
  interface PalletSessionError extends Enum {
    readonly isInvalidProof: boolean;
    readonly isNoAssociatedValidatorId: boolean;
    readonly isDuplicatedKey: boolean;
    readonly isNoKeys: boolean;
    readonly isNoAccount: boolean;
    readonly type: 'InvalidProof' | 'NoAssociatedValidatorId' | 'DuplicatedKey' | 'NoKeys' | 'NoAccount';
  }

  /** @name ModuleSessionManagerModuleError (430) */
  interface ModuleSessionManagerModuleError extends Enum {
    readonly isInvalidSession: boolean;
    readonly isInvalidDuration: boolean;
    readonly isEstimateNextSessionFailed: boolean;
    readonly type: 'InvalidSession' | 'InvalidDuration' | 'EstimateNextSessionFailed';
  }

  /** @name CumulusPalletXcmpQueueInboundChannelDetails (432) */
  interface CumulusPalletXcmpQueueInboundChannelDetails extends Struct {
    readonly sender: u32;
    readonly state: CumulusPalletXcmpQueueInboundState;
    readonly messageMetadata: Vec<ITuple<[u32, PolkadotParachainPrimitivesXcmpMessageFormat]>>;
  }

  /** @name CumulusPalletXcmpQueueInboundState (433) */
  interface CumulusPalletXcmpQueueInboundState extends Enum {
    readonly isOk: boolean;
    readonly isSuspended: boolean;
    readonly type: 'Ok' | 'Suspended';
  }

  /** @name PolkadotParachainPrimitivesXcmpMessageFormat (436) */
  interface PolkadotParachainPrimitivesXcmpMessageFormat extends Enum {
    readonly isConcatenatedVersionedXcm: boolean;
    readonly isConcatenatedEncodedBlob: boolean;
    readonly isSignals: boolean;
    readonly type: 'ConcatenatedVersionedXcm' | 'ConcatenatedEncodedBlob' | 'Signals';
  }

  /** @name CumulusPalletXcmpQueueOutboundChannelDetails (439) */
  interface CumulusPalletXcmpQueueOutboundChannelDetails extends Struct {
    readonly recipient: u32;
    readonly state: CumulusPalletXcmpQueueOutboundState;
    readonly signalsExist: bool;
    readonly firstIndex: u16;
    readonly lastIndex: u16;
  }

  /** @name CumulusPalletXcmpQueueOutboundState (440) */
  interface CumulusPalletXcmpQueueOutboundState extends Enum {
    readonly isOk: boolean;
    readonly isSuspended: boolean;
    readonly type: 'Ok' | 'Suspended';
  }

  /** @name CumulusPalletXcmpQueueQueueConfigData (442) */
  interface CumulusPalletXcmpQueueQueueConfigData extends Struct {
    readonly suspendThreshold: u32;
    readonly dropThreshold: u32;
    readonly resumeThreshold: u32;
    readonly thresholdWeight: u64;
    readonly weightRestrictDecay: u64;
    readonly xcmpMaxIndividualWeight: u64;
  }

  /** @name CumulusPalletXcmpQueueError (444) */
  interface CumulusPalletXcmpQueueError extends Enum {
    readonly isFailedToSend: boolean;
    readonly isBadXcmOrigin: boolean;
    readonly isBadXcm: boolean;
    readonly isBadOverweightIndex: boolean;
    readonly isWeightOverLimit: boolean;
    readonly type: 'FailedToSend' | 'BadXcmOrigin' | 'BadXcm' | 'BadOverweightIndex' | 'WeightOverLimit';
  }

  /** @name PalletXcmQueryStatus (445) */
  interface PalletXcmQueryStatus extends Enum {
    readonly isPending: boolean;
    readonly asPending: {
      readonly responder: XcmVersionedMultiLocation;
      readonly maybeNotify: Option<ITuple<[u8, u8]>>;
      readonly timeout: u32;
    } & Struct;
    readonly isVersionNotifier: boolean;
    readonly asVersionNotifier: {
      readonly origin: XcmVersionedMultiLocation;
      readonly isActive: bool;
    } & Struct;
    readonly isReady: boolean;
    readonly asReady: {
      readonly response: XcmVersionedResponse;
      readonly at: u32;
    } & Struct;
    readonly type: 'Pending' | 'VersionNotifier' | 'Ready';
  }

  /** @name XcmVersionedResponse (448) */
  interface XcmVersionedResponse extends Enum {
    readonly isV0: boolean;
    readonly asV0: XcmV0Response;
    readonly isV1: boolean;
    readonly asV1: XcmV1Response;
    readonly isV2: boolean;
    readonly asV2: XcmV2Response;
    readonly type: 'V0' | 'V1' | 'V2';
  }

  /** @name PalletXcmVersionMigrationStage (454) */
  interface PalletXcmVersionMigrationStage extends Enum {
    readonly isMigrateSupportedVersion: boolean;
    readonly isMigrateVersionNotifiers: boolean;
    readonly isNotifyCurrentTargets: boolean;
    readonly asNotifyCurrentTargets: Option<Bytes>;
    readonly isMigrateAndNotifyOldTargets: boolean;
    readonly type: 'MigrateSupportedVersion' | 'MigrateVersionNotifiers' | 'NotifyCurrentTargets' | 'MigrateAndNotifyOldTargets';
  }

  /** @name PalletXcmError (455) */
  interface PalletXcmError extends Enum {
    readonly isUnreachable: boolean;
    readonly isSendFailure: boolean;
    readonly isFiltered: boolean;
    readonly isUnweighableMessage: boolean;
    readonly isDestinationNotInvertible: boolean;
    readonly isEmpty: boolean;
    readonly isCannotReanchor: boolean;
    readonly isTooManyAssets: boolean;
    readonly isInvalidOrigin: boolean;
    readonly isBadVersion: boolean;
    readonly isBadLocation: boolean;
    readonly isNoSubscription: boolean;
    readonly isAlreadySubscribed: boolean;
    readonly type: 'Unreachable' | 'SendFailure' | 'Filtered' | 'UnweighableMessage' | 'DestinationNotInvertible' | 'Empty' | 'CannotReanchor' | 'TooManyAssets' | 'InvalidOrigin' | 'BadVersion' | 'BadLocation' | 'NoSubscription' | 'AlreadySubscribed';
  }

  /** @name CumulusPalletXcmError (456) */
  type CumulusPalletXcmError = Null;

  /** @name CumulusPalletDmpQueueConfigData (457) */
  interface CumulusPalletDmpQueueConfigData extends Struct {
    readonly maxIndividual: u64;
  }

  /** @name CumulusPalletDmpQueuePageIndexData (458) */
  interface CumulusPalletDmpQueuePageIndexData extends Struct {
    readonly beginUsed: u32;
    readonly endUsed: u32;
    readonly overweightCount: u64;
  }

  /** @name CumulusPalletDmpQueueError (461) */
  interface CumulusPalletDmpQueueError extends Enum {
    readonly isUnknown: boolean;
    readonly isOverLimit: boolean;
    readonly type: 'Unknown' | 'OverLimit';
  }

  /** @name OrmlXtokensModuleError (462) */
  interface OrmlXtokensModuleError extends Enum {
    readonly isAssetHasNoReserve: boolean;
    readonly isNotCrossChainTransfer: boolean;
    readonly isInvalidDest: boolean;
    readonly isNotCrossChainTransferableCurrency: boolean;
    readonly isUnweighableMessage: boolean;
    readonly isXcmExecutionFailed: boolean;
    readonly isCannotReanchor: boolean;
    readonly isInvalidAncestry: boolean;
    readonly isInvalidAsset: boolean;
    readonly isDestinationNotInvertible: boolean;
    readonly isBadVersion: boolean;
    readonly isDistinctReserveForAssetAndFee: boolean;
    readonly isZeroFee: boolean;
    readonly isZeroAmount: boolean;
    readonly isTooManyAssetsBeingSent: boolean;
    readonly isAssetIndexNonExistent: boolean;
    readonly isFeeNotEnough: boolean;
    readonly isNotSupportedMultiLocation: boolean;
    readonly isMinXcmFeeNotDefined: boolean;
    readonly type: 'AssetHasNoReserve' | 'NotCrossChainTransfer' | 'InvalidDest' | 'NotCrossChainTransferableCurrency' | 'UnweighableMessage' | 'XcmExecutionFailed' | 'CannotReanchor' | 'InvalidAncestry' | 'InvalidAsset' | 'DestinationNotInvertible' | 'BadVersion' | 'DistinctReserveForAssetAndFee' | 'ZeroFee' | 'ZeroAmount' | 'TooManyAssetsBeingSent' | 'AssetIndexNonExistent' | 'FeeNotEnough' | 'NotSupportedMultiLocation' | 'MinXcmFeeNotDefined';
  }

  /** @name OrmlUnknownTokensModuleError (465) */
  interface OrmlUnknownTokensModuleError extends Enum {
    readonly isBalanceTooLow: boolean;
    readonly isBalanceOverflow: boolean;
    readonly isUnhandledAsset: boolean;
    readonly type: 'BalanceTooLow' | 'BalanceOverflow' | 'UnhandledAsset';
  }

  /** @name OrmlXcmModuleError (466) */
  interface OrmlXcmModuleError extends Enum {
    readonly isUnreachable: boolean;
    readonly isSendFailure: boolean;
    readonly isBadVersion: boolean;
    readonly type: 'Unreachable' | 'SendFailure' | 'BadVersion';
  }

  /** @name OrmlAuthorityModuleError (468) */
  interface OrmlAuthorityModuleError extends Enum {
    readonly isFailedToSchedule: boolean;
    readonly isFailedToCancel: boolean;
    readonly isFailedToFastTrack: boolean;
    readonly isFailedToDelay: boolean;
    readonly isCallNotAuthorized: boolean;
    readonly isTriggerCallNotPermitted: boolean;
    readonly isWrongCallWeightBound: boolean;
    readonly type: 'FailedToSchedule' | 'FailedToCancel' | 'FailedToFastTrack' | 'FailedToDelay' | 'CallNotAuthorized' | 'TriggerCallNotPermitted' | 'WrongCallWeightBound';
  }

  /** @name PalletCollectiveVotes (470) */
  interface PalletCollectiveVotes extends Struct {
    readonly index: u32;
    readonly threshold: u32;
    readonly ayes: Vec<AccountId32>;
    readonly nays: Vec<AccountId32>;
    readonly end: u32;
  }

  /** @name PalletCollectiveError (471) */
  interface PalletCollectiveError extends Enum {
    readonly isNotMember: boolean;
    readonly isDuplicateProposal: boolean;
    readonly isProposalMissing: boolean;
    readonly isWrongIndex: boolean;
    readonly isDuplicateVote: boolean;
    readonly isAlreadyInitialized: boolean;
    readonly isTooEarly: boolean;
    readonly isTooManyProposals: boolean;
    readonly isWrongProposalWeight: boolean;
    readonly isWrongProposalLength: boolean;
    readonly type: 'NotMember' | 'DuplicateProposal' | 'ProposalMissing' | 'WrongIndex' | 'DuplicateVote' | 'AlreadyInitialized' | 'TooEarly' | 'TooManyProposals' | 'WrongProposalWeight' | 'WrongProposalLength';
  }

  /** @name PalletMembershipError (473) */
  interface PalletMembershipError extends Enum {
    readonly isAlreadyMember: boolean;
    readonly isNotMember: boolean;
    readonly isTooManyMembers: boolean;
    readonly type: 'AlreadyMember' | 'NotMember' | 'TooManyMembers';
  }

  /** @name PalletDemocracyPreimageStatus (483) */
  interface PalletDemocracyPreimageStatus extends Enum {
    readonly isMissing: boolean;
    readonly asMissing: u32;
    readonly isAvailable: boolean;
    readonly asAvailable: {
      readonly data: Bytes;
      readonly provider: AccountId32;
      readonly deposit: u128;
      readonly since: u32;
      readonly expiry: Option<u32>;
    } & Struct;
    readonly type: 'Missing' | 'Available';
  }

  /** @name PalletDemocracyReferendumInfo (484) */
  interface PalletDemocracyReferendumInfo extends Enum {
    readonly isOngoing: boolean;
    readonly asOngoing: PalletDemocracyReferendumStatus;
    readonly isFinished: boolean;
    readonly asFinished: {
      readonly approved: bool;
      readonly end: u32;
    } & Struct;
    readonly type: 'Ongoing' | 'Finished';
  }

  /** @name PalletDemocracyReferendumStatus (485) */
  interface PalletDemocracyReferendumStatus extends Struct {
    readonly end: u32;
    readonly proposalHash: H256;
    readonly threshold: PalletDemocracyVoteThreshold;
    readonly delay: u32;
    readonly tally: PalletDemocracyTally;
  }

  /** @name PalletDemocracyTally (486) */
  interface PalletDemocracyTally extends Struct {
    readonly ayes: u128;
    readonly nays: u128;
    readonly turnout: u128;
  }

  /** @name PalletDemocracyVoteVoting (487) */
  interface PalletDemocracyVoteVoting extends Enum {
    readonly isDirect: boolean;
    readonly asDirect: {
      readonly votes: Vec<ITuple<[u32, PalletDemocracyVoteAccountVote]>>;
      readonly delegations: PalletDemocracyDelegations;
      readonly prior: PalletDemocracyVotePriorLock;
    } & Struct;
    readonly isDelegating: boolean;
    readonly asDelegating: {
      readonly balance: u128;
      readonly target: AccountId32;
      readonly conviction: PalletDemocracyConviction;
      readonly delegations: PalletDemocracyDelegations;
      readonly prior: PalletDemocracyVotePriorLock;
    } & Struct;
    readonly type: 'Direct' | 'Delegating';
  }

  /** @name PalletDemocracyDelegations (490) */
  interface PalletDemocracyDelegations extends Struct {
    readonly votes: u128;
    readonly capital: u128;
  }

  /** @name PalletDemocracyVotePriorLock (491) */
  interface PalletDemocracyVotePriorLock extends ITuple<[u32, u128]> {}

  /** @name PalletDemocracyReleases (494) */
  interface PalletDemocracyReleases extends Enum {
    readonly isV1: boolean;
    readonly type: 'V1';
  }

  /** @name PalletDemocracyError (495) */
  interface PalletDemocracyError extends Enum {
    readonly isValueLow: boolean;
    readonly isProposalMissing: boolean;
    readonly isAlreadyCanceled: boolean;
    readonly isDuplicateProposal: boolean;
    readonly isProposalBlacklisted: boolean;
    readonly isNotSimpleMajority: boolean;
    readonly isInvalidHash: boolean;
    readonly isNoProposal: boolean;
    readonly isAlreadyVetoed: boolean;
    readonly isDuplicatePreimage: boolean;
    readonly isNotImminent: boolean;
    readonly isTooEarly: boolean;
    readonly isImminent: boolean;
    readonly isPreimageMissing: boolean;
    readonly isReferendumInvalid: boolean;
    readonly isPreimageInvalid: boolean;
    readonly isNoneWaiting: boolean;
    readonly isNotVoter: boolean;
    readonly isNoPermission: boolean;
    readonly isAlreadyDelegating: boolean;
    readonly isInsufficientFunds: boolean;
    readonly isNotDelegating: boolean;
    readonly isVotesExist: boolean;
    readonly isInstantNotAllowed: boolean;
    readonly isNonsense: boolean;
    readonly isWrongUpperBound: boolean;
    readonly isMaxVotesReached: boolean;
    readonly isTooManyProposals: boolean;
    readonly isVotingPeriodLow: boolean;
    readonly type: 'ValueLow' | 'ProposalMissing' | 'AlreadyCanceled' | 'DuplicateProposal' | 'ProposalBlacklisted' | 'NotSimpleMajority' | 'InvalidHash' | 'NoProposal' | 'AlreadyVetoed' | 'DuplicatePreimage' | 'NotImminent' | 'TooEarly' | 'Imminent' | 'PreimageMissing' | 'ReferendumInvalid' | 'PreimageInvalid' | 'NoneWaiting' | 'NotVoter' | 'NoPermission' | 'AlreadyDelegating' | 'InsufficientFunds' | 'NotDelegating' | 'VotesExist' | 'InstantNotAllowed' | 'Nonsense' | 'WrongUpperBound' | 'MaxVotesReached' | 'TooManyProposals' | 'VotingPeriodLow';
  }

  /** @name OrmlOracleModuleTimestampedValue (496) */
  interface OrmlOracleModuleTimestampedValue extends Struct {
    readonly value: u128;
    readonly timestamp: u64;
  }

  /** @name OrmlUtilitiesOrderedSet (497) */
  interface OrmlUtilitiesOrderedSet extends Vec<AccountId32> {}

  /** @name OrmlOracleModuleError (499) */
  interface OrmlOracleModuleError extends Enum {
    readonly isNoPermission: boolean;
    readonly isAlreadyFeeded: boolean;
    readonly type: 'NoPermission' | 'AlreadyFeeded';
  }

  /** @name OrmlTraitsAuctionAuctionInfo (502) */
  interface OrmlTraitsAuctionAuctionInfo extends Struct {
    readonly bid: Option<ITuple<[AccountId32, u128]>>;
    readonly start: u32;
    readonly end: Option<u32>;
  }

  /** @name OrmlAuctionModuleError (503) */
  interface OrmlAuctionModuleError extends Enum {
    readonly isAuctionNotExist: boolean;
    readonly isAuctionNotStarted: boolean;
    readonly isBidNotAccepted: boolean;
    readonly isInvalidBidPrice: boolean;
    readonly isNoAvailableAuctionId: boolean;
    readonly type: 'AuctionNotExist' | 'AuctionNotStarted' | 'BidNotAccepted' | 'InvalidBidPrice' | 'NoAvailableAuctionId';
  }

  /** @name OrmlRewardsPoolInfo (504) */
  interface OrmlRewardsPoolInfo extends Struct {
    readonly totalShares: u128;
    readonly rewards: BTreeMap<AcalaPrimitivesCurrencyCurrencyId, ITuple<[u128, u128]>>;
  }

  /** @name OrmlRewardsModuleError (512) */
  interface OrmlRewardsModuleError extends Enum {
    readonly isPoolDoesNotExist: boolean;
    readonly isShareDoesNotExist: boolean;
    readonly isCanSplitOnlyLessThanShare: boolean;
    readonly type: 'PoolDoesNotExist' | 'ShareDoesNotExist' | 'CanSplitOnlyLessThanShare';
  }

  /** @name OrmlNftClassInfo (513) */
  interface OrmlNftClassInfo extends Struct {
    readonly metadata: Bytes;
    readonly totalIssuance: u64;
    readonly owner: AccountId32;
    readonly data: ModuleNftClassData;
  }

  /** @name ModuleNftClassData (514) */
  interface ModuleNftClassData extends Struct {
    readonly deposit: u128;
    readonly properties: u8;
    readonly attributes: BTreeMap<Bytes, Bytes>;
  }

  /** @name OrmlNftTokenInfo (516) */
  interface OrmlNftTokenInfo extends Struct {
    readonly metadata: Bytes;
    readonly owner: AccountId32;
    readonly data: ModuleNftTokenData;
  }

  /** @name ModuleNftTokenData (517) */
  interface ModuleNftTokenData extends Struct {
    readonly deposit: u128;
    readonly attributes: BTreeMap<Bytes, Bytes>;
  }

  /** @name OrmlNftModuleError (519) */
  interface OrmlNftModuleError extends Enum {
    readonly isNoAvailableClassId: boolean;
    readonly isNoAvailableTokenId: boolean;
    readonly isTokenNotFound: boolean;
    readonly isClassNotFound: boolean;
    readonly isNoPermission: boolean;
    readonly isCannotDestroyClass: boolean;
    readonly isMaxMetadataExceeded: boolean;
    readonly type: 'NoAvailableClassId' | 'NoAvailableTokenId' | 'TokenNotFound' | 'ClassNotFound' | 'NoPermission' | 'CannotDestroyClass' | 'MaxMetadataExceeded';
  }

  /** @name ModulePricesModuleError (520) */
  interface ModulePricesModuleError extends Enum {
    readonly isAccessPriceFailed: boolean;
    readonly isNoLockedPrice: boolean;
    readonly type: 'AccessPriceFailed' | 'NoLockedPrice';
  }

  /** @name ModuleDexTradingPairStatus (521) */
  interface ModuleDexTradingPairStatus extends Enum {
    readonly isDisabled: boolean;
    readonly isProvisioning: boolean;
    readonly asProvisioning: ModuleDexProvisioningParameters;
    readonly isEnabled: boolean;
    readonly type: 'Disabled' | 'Provisioning' | 'Enabled';
  }

  /** @name ModuleDexProvisioningParameters (522) */
  interface ModuleDexProvisioningParameters extends Struct {
    readonly minContribution: ITuple<[u128, u128]>;
    readonly targetProvision: ITuple<[u128, u128]>;
    readonly accumulatedProvision: ITuple<[u128, u128]>;
    readonly notBefore: u32;
  }

  /** @name ModuleDexModuleError (525) */
  interface ModuleDexModuleError extends Enum {
    readonly isAlreadyEnabled: boolean;
    readonly isMustBeEnabled: boolean;
    readonly isMustBeProvisioning: boolean;
    readonly isMustBeDisabled: boolean;
    readonly isNotAllowedList: boolean;
    readonly isInvalidContributionIncrement: boolean;
    readonly isInvalidLiquidityIncrement: boolean;
    readonly isInvalidCurrencyId: boolean;
    readonly isInvalidTradingPathLength: boolean;
    readonly isInsufficientTargetAmount: boolean;
    readonly isExcessiveSupplyAmount: boolean;
    readonly isInsufficientLiquidity: boolean;
    readonly isZeroSupplyAmount: boolean;
    readonly isZeroTargetAmount: boolean;
    readonly isUnacceptableShareIncrement: boolean;
    readonly isUnacceptableLiquidityWithdrawn: boolean;
    readonly isInvariantCheckFailed: boolean;
    readonly isUnqualifiedProvision: boolean;
    readonly isStillProvisioning: boolean;
    readonly isAssetUnregistered: boolean;
    readonly isInvalidTradingPath: boolean;
    readonly isNotAllowedRefund: boolean;
    readonly isCannotSwap: boolean;
    readonly type: 'AlreadyEnabled' | 'MustBeEnabled' | 'MustBeProvisioning' | 'MustBeDisabled' | 'NotAllowedList' | 'InvalidContributionIncrement' | 'InvalidLiquidityIncrement' | 'InvalidCurrencyId' | 'InvalidTradingPathLength' | 'InsufficientTargetAmount' | 'ExcessiveSupplyAmount' | 'InsufficientLiquidity' | 'ZeroSupplyAmount' | 'ZeroTargetAmount' | 'UnacceptableShareIncrement' | 'UnacceptableLiquidityWithdrawn' | 'InvariantCheckFailed' | 'UnqualifiedProvision' | 'StillProvisioning' | 'AssetUnregistered' | 'InvalidTradingPath' | 'NotAllowedRefund' | 'CannotSwap';
  }

  /** @name ModuleDexOracleModuleError (530) */
  interface ModuleDexOracleModuleError extends Enum {
    readonly isAveragePriceAlreadyEnabled: boolean;
    readonly isAveragePriceMustBeEnabled: boolean;
    readonly isInvalidPool: boolean;
    readonly isInvalidCurrencyId: boolean;
    readonly isIntervalIsZero: boolean;
    readonly type: 'AveragePriceAlreadyEnabled' | 'AveragePriceMustBeEnabled' | 'InvalidPool' | 'InvalidCurrencyId' | 'IntervalIsZero';
  }

  /** @name ModuleAggregatedDexModuleError (533) */
  interface ModuleAggregatedDexModuleError extends Enum {
    readonly isCannotSwap: boolean;
    readonly isInvalidPoolId: boolean;
    readonly isInvalidTokenIndex: boolean;
    readonly isInvalidSwapPath: boolean;
    readonly type: 'CannotSwap' | 'InvalidPoolId' | 'InvalidTokenIndex' | 'InvalidSwapPath';
  }

  /** @name ModuleAuctionManagerCollateralAuctionItem (534) */
  interface ModuleAuctionManagerCollateralAuctionItem extends Struct {
    readonly refundRecipient: AccountId32;
    readonly currencyId: AcalaPrimitivesCurrencyCurrencyId;
    readonly initialAmount: Compact<u128>;
    readonly amount: Compact<u128>;
    readonly target: Compact<u128>;
    readonly startTime: u32;
  }

  /** @name ModuleAuctionManagerModuleError (535) */
  interface ModuleAuctionManagerModuleError extends Enum {
    readonly isAuctionNotExists: boolean;
    readonly isInReverseStage: boolean;
    readonly isInvalidFeedPrice: boolean;
    readonly isMustAfterShutdown: boolean;
    readonly isInvalidBidPrice: boolean;
    readonly isInvalidAmount: boolean;
    readonly type: 'AuctionNotExists' | 'InReverseStage' | 'InvalidFeedPrice' | 'MustAfterShutdown' | 'InvalidBidPrice' | 'InvalidAmount';
  }

  /** @name AcalaPrimitivesPosition (537) */
  interface AcalaPrimitivesPosition extends Struct {
    readonly collateral: u128;
    readonly debit: u128;
  }

  /** @name ModuleLoansModuleError (538) */
  interface ModuleLoansModuleError extends Enum {
    readonly isAmountConvertFailed: boolean;
    readonly type: 'AmountConvertFailed';
  }

  /** @name ModuleHonzonModuleError (540) */
  interface ModuleHonzonModuleError extends Enum {
    readonly isNoPermission: boolean;
    readonly isAlreadyShutdown: boolean;
    readonly isAuthorizationNotExists: boolean;
    readonly isAlreadyAuthorized: boolean;
    readonly type: 'NoPermission' | 'AlreadyShutdown' | 'AuthorizationNotExists' | 'AlreadyAuthorized';
  }

  /** @name ModuleCdpTreasuryModuleError (541) */
  interface ModuleCdpTreasuryModuleError extends Enum {
    readonly isCollateralNotEnough: boolean;
    readonly isSurplusPoolNotEnough: boolean;
    readonly isDebitPoolNotEnough: boolean;
    readonly isCannotSwap: boolean;
    readonly isNotDexShare: boolean;
    readonly type: 'CollateralNotEnough' | 'SurplusPoolNotEnough' | 'DebitPoolNotEnough' | 'CannotSwap' | 'NotDexShare';
  }

  /** @name ModuleCdpEngineRiskManagementParams (542) */
  interface ModuleCdpEngineRiskManagementParams extends Struct {
    readonly maximumTotalDebitValue: u128;
    readonly interestRatePerSec: Option<u128>;
    readonly liquidationRatio: Option<u128>;
    readonly liquidationPenalty: Option<u128>;
    readonly requiredCollateralRatio: Option<u128>;
  }

  /** @name ModuleCdpEngineModuleError (545) */
  interface ModuleCdpEngineModuleError extends Enum {
    readonly isExceedDebitValueHardCap: boolean;
    readonly isBelowRequiredCollateralRatio: boolean;
    readonly isBelowLiquidationRatio: boolean;
    readonly isMustBeUnsafe: boolean;
    readonly isMustBeSafe: boolean;
    readonly isInvalidCollateralType: boolean;
    readonly isRemainDebitValueTooSmall: boolean;
    readonly isCollateralAmountBelowMinimum: boolean;
    readonly isInvalidFeedPrice: boolean;
    readonly isNoDebitValue: boolean;
    readonly isAlreadyShutdown: boolean;
    readonly isMustAfterShutdown: boolean;
    readonly isCollateralNotEnough: boolean;
    readonly isNotEnoughDebitDecrement: boolean;
    readonly isConvertDebitBalanceFailed: boolean;
    readonly isLiquidationFailed: boolean;
    readonly isTooManyLiquidationContracts: boolean;
    readonly isCollateralContractNotFound: boolean;
    readonly type: 'ExceedDebitValueHardCap' | 'BelowRequiredCollateralRatio' | 'BelowLiquidationRatio' | 'MustBeUnsafe' | 'MustBeSafe' | 'InvalidCollateralType' | 'RemainDebitValueTooSmall' | 'CollateralAmountBelowMinimum' | 'InvalidFeedPrice' | 'NoDebitValue' | 'AlreadyShutdown' | 'MustAfterShutdown' | 'CollateralNotEnough' | 'NotEnoughDebitDecrement' | 'ConvertDebitBalanceFailed' | 'LiquidationFailed' | 'TooManyLiquidationContracts' | 'CollateralContractNotFound';
  }

  /** @name ModuleEmergencyShutdownModuleError (546) */
  interface ModuleEmergencyShutdownModuleError extends Enum {
    readonly isAlreadyShutdown: boolean;
    readonly isMustAfterShutdown: boolean;
    readonly isCanNotRefund: boolean;
    readonly isExistPotentialSurplus: boolean;
    readonly isExistUnhandledDebit: boolean;
    readonly type: 'AlreadyShutdown' | 'MustAfterShutdown' | 'CanNotRefund' | 'ExistPotentialSurplus' | 'ExistUnhandledDebit';
  }

  /** @name ModuleHomaModuleStakingLedger (547) */
  interface ModuleHomaModuleStakingLedger extends Struct {
    readonly bonded: Compact<u128>;
    readonly unlocking: Vec<ModuleHomaModuleUnlockChunk>;
  }

  /** @name ModuleHomaModuleError (551) */
  interface ModuleHomaModuleError extends Enum {
    readonly isBelowMintThreshold: boolean;
    readonly isBelowRedeemThreshold: boolean;
    readonly isExceededStakingCurrencySoftCap: boolean;
    readonly isInsufficientUnclaimedRedemption: boolean;
    readonly isOutdatedEraIndex: boolean;
    readonly isFastMatchIsNotAllowed: boolean;
    readonly isCannotCompletelyFastMatch: boolean;
    readonly isInvalidLastEraBumpedBlock: boolean;
    readonly type: 'BelowMintThreshold' | 'BelowRedeemThreshold' | 'ExceededStakingCurrencySoftCap' | 'InsufficientUnclaimedRedemption' | 'OutdatedEraIndex' | 'FastMatchIsNotAllowed' | 'CannotCompletelyFastMatch' | 'InvalidLastEraBumpedBlock';
  }

  /** @name ModuleXcmInterfaceModuleError (553) */
  interface ModuleXcmInterfaceModuleError extends Enum {
    readonly isXcmFailed: boolean;
    readonly type: 'XcmFailed';
  }

  /** @name ModuleIncentivesModuleError (555) */
  interface ModuleIncentivesModuleError extends Enum {
    readonly isNotEnough: boolean;
    readonly isInvalidCurrencyId: boolean;
    readonly isInvalidPoolId: boolean;
    readonly isInvalidRate: boolean;
    readonly type: 'NotEnough' | 'InvalidCurrencyId' | 'InvalidPoolId' | 'InvalidRate';
  }

  /** @name ModuleNftModuleError (556) */
  interface ModuleNftModuleError extends Enum {
    readonly isClassIdNotFound: boolean;
    readonly isTokenIdNotFound: boolean;
    readonly isNoPermission: boolean;
    readonly isInvalidQuantity: boolean;
    readonly isNonTransferable: boolean;
    readonly isNonBurnable: boolean;
    readonly isNonMintable: boolean;
    readonly isCannotDestroyClass: boolean;
    readonly isImmutable: boolean;
    readonly isAttributesTooLarge: boolean;
    readonly isIncorrectTokenId: boolean;
    readonly type: 'ClassIdNotFound' | 'TokenIdNotFound' | 'NoPermission' | 'InvalidQuantity' | 'NonTransferable' | 'NonBurnable' | 'NonMintable' | 'CannotDestroyClass' | 'Immutable' | 'AttributesTooLarge' | 'IncorrectTokenId';
  }

  /** @name ModuleAssetRegistryModuleError (557) */
  interface ModuleAssetRegistryModuleError extends Enum {
    readonly isBadLocation: boolean;
    readonly isMultiLocationExisted: boolean;
    readonly isAssetIdNotExists: boolean;
    readonly isAssetIdExisted: boolean;
    readonly type: 'BadLocation' | 'MultiLocationExisted' | 'AssetIdNotExists' | 'AssetIdExisted';
  }

  /** @name ModuleEvmModuleAccountInfo (558) */
  interface ModuleEvmModuleAccountInfo extends Struct {
    readonly nonce: u32;
    readonly contractInfo: Option<ModuleEvmModuleContractInfo>;
  }

  /** @name ModuleEvmModuleContractInfo (560) */
  interface ModuleEvmModuleContractInfo extends Struct {
    readonly codeHash: H256;
    readonly maintainer: H160;
    readonly published: bool;
  }

  /** @name ModuleEvmModuleCodeInfo (563) */
  interface ModuleEvmModuleCodeInfo extends Struct {
    readonly codeSize: u32;
    readonly refCount: u32;
  }

  /** @name ModuleEvmModuleError (564) */
  interface ModuleEvmModuleError extends Enum {
    readonly isAddressNotMapped: boolean;
    readonly isContractNotFound: boolean;
    readonly isNoPermission: boolean;
    readonly isContractDevelopmentNotEnabled: boolean;
    readonly isContractDevelopmentAlreadyEnabled: boolean;
    readonly isContractAlreadyPublished: boolean;
    readonly isContractExceedsMaxCodeSize: boolean;
    readonly isContractAlreadyExisted: boolean;
    readonly isOutOfStorage: boolean;
    readonly isChargeFeeFailed: boolean;
    readonly isCannotKillContract: boolean;
    readonly isReserveStorageFailed: boolean;
    readonly isUnreserveStorageFailed: boolean;
    readonly isChargeStorageFailed: boolean;
    readonly isInvalidDecimals: boolean;
    readonly isStrictCallFailed: boolean;
    readonly type: 'AddressNotMapped' | 'ContractNotFound' | 'NoPermission' | 'ContractDevelopmentNotEnabled' | 'ContractDevelopmentAlreadyEnabled' | 'ContractAlreadyPublished' | 'ContractExceedsMaxCodeSize' | 'ContractAlreadyExisted' | 'OutOfStorage' | 'ChargeFeeFailed' | 'CannotKillContract' | 'ReserveStorageFailed' | 'UnreserveStorageFailed' | 'ChargeStorageFailed' | 'InvalidDecimals' | 'StrictCallFailed';
  }

  /** @name ModuleEvmBridgeModuleError (565) */
  interface ModuleEvmBridgeModuleError extends Enum {
    readonly isExecutionFail: boolean;
    readonly isExecutionRevert: boolean;
    readonly isExecutionFatal: boolean;
    readonly isExecutionError: boolean;
    readonly isInvalidReturnValue: boolean;
    readonly type: 'ExecutionFail' | 'ExecutionRevert' | 'ExecutionFatal' | 'ExecutionError' | 'InvalidReturnValue';
  }

  /** @name ModuleEvmAccountsModuleError (566) */
  interface ModuleEvmAccountsModuleError extends Enum {
    readonly isAccountIdHasMapped: boolean;
    readonly isEthAddressHasMapped: boolean;
    readonly isBadSignature: boolean;
    readonly isInvalidSignature: boolean;
    readonly isNonZeroRefCount: boolean;
    readonly type: 'AccountIdHasMapped' | 'EthAddressHasMapped' | 'BadSignature' | 'InvalidSignature' | 'NonZeroRefCount';
  }

  /** @name NutsfinanceStableAssetStableAssetPoolInfo (567) */
  interface NutsfinanceStableAssetStableAssetPoolInfo extends Struct {
    readonly poolAsset: AcalaPrimitivesCurrencyCurrencyId;
    readonly assets: Vec<AcalaPrimitivesCurrencyCurrencyId>;
    readonly precisions: Vec<u128>;
    readonly mintFee: u128;
    readonly swapFee: u128;
    readonly redeemFee: u128;
    readonly totalSupply: u128;
    readonly a: u128;
    readonly aBlock: u32;
    readonly futureA: u128;
    readonly futureABlock: u32;
    readonly balances: Vec<u128>;
    readonly feeRecipient: AccountId32;
    readonly accountId: AccountId32;
    readonly yieldRecipient: AccountId32;
    readonly precision: u128;
  }

  /** @name NutsfinanceStableAssetError (568) */
  interface NutsfinanceStableAssetError extends Enum {
    readonly isInconsistentStorage: boolean;
    readonly isInvalidPoolAsset: boolean;
    readonly isArgumentsMismatch: boolean;
    readonly isArgumentsError: boolean;
    readonly isPoolNotFound: boolean;
    readonly isMath: boolean;
    readonly isInvalidPoolValue: boolean;
    readonly isMintUnderMin: boolean;
    readonly isSwapUnderMin: boolean;
    readonly isRedeemUnderMin: boolean;
    readonly isRedeemOverMax: boolean;
    readonly type: 'InconsistentStorage' | 'InvalidPoolAsset' | 'ArgumentsMismatch' | 'ArgumentsError' | 'PoolNotFound' | 'Math' | 'InvalidPoolValue' | 'MintUnderMin' | 'SwapUnderMin' | 'RedeemUnderMin' | 'RedeemOverMax';
  }

  /** @name PolkadotPrimitivesV2UpgradeRestriction (570) */
  interface PolkadotPrimitivesV2UpgradeRestriction extends Enum {
    readonly isPresent: boolean;
    readonly type: 'Present';
  }

  /** @name CumulusPalletParachainSystemRelayStateSnapshotMessagingStateSnapshot (571) */
  interface CumulusPalletParachainSystemRelayStateSnapshotMessagingStateSnapshot extends Struct {
    readonly dmqMqcHead: H256;
    readonly relayDispatchQueueSize: ITuple<[u32, u32]>;
    readonly ingressChannels: Vec<ITuple<[u32, PolkadotPrimitivesV2AbridgedHrmpChannel]>>;
    readonly egressChannels: Vec<ITuple<[u32, PolkadotPrimitivesV2AbridgedHrmpChannel]>>;
  }

  /** @name PolkadotPrimitivesV2AbridgedHrmpChannel (574) */
  interface PolkadotPrimitivesV2AbridgedHrmpChannel extends Struct {
    readonly maxCapacity: u32;
    readonly maxTotalSize: u32;
    readonly maxMessageSize: u32;
    readonly msgCount: u32;
    readonly totalSize: u32;
    readonly mqcHead: Option<H256>;
  }

  /** @name PolkadotPrimitivesV2AbridgedHostConfiguration (575) */
  interface PolkadotPrimitivesV2AbridgedHostConfiguration extends Struct {
    readonly maxCodeSize: u32;
    readonly maxHeadDataSize: u32;
    readonly maxUpwardQueueCount: u32;
    readonly maxUpwardQueueSize: u32;
    readonly maxUpwardMessageSize: u32;
    readonly maxUpwardMessageNumPerCandidate: u32;
    readonly hrmpMaxMessageNumPerCandidate: u32;
    readonly validationUpgradeCooldown: u32;
    readonly validationUpgradeDelay: u32;
  }

  /** @name PolkadotCorePrimitivesOutboundHrmpMessage (581) */
  interface PolkadotCorePrimitivesOutboundHrmpMessage extends Struct {
    readonly recipient: u32;
    readonly data: Bytes;
  }

  /** @name CumulusPalletParachainSystemError (582) */
  interface CumulusPalletParachainSystemError extends Enum {
    readonly isOverlappingUpgrades: boolean;
    readonly isProhibitedByPolkadot: boolean;
    readonly isTooBig: boolean;
    readonly isValidationDataNotAvailable: boolean;
    readonly isHostConfigurationNotAvailable: boolean;
    readonly isNotScheduled: boolean;
    readonly isNothingAuthorized: boolean;
    readonly isUnauthorized: boolean;
    readonly type: 'OverlappingUpgrades' | 'ProhibitedByPolkadot' | 'TooBig' | 'ValidationDataNotAvailable' | 'HostConfigurationNotAvailable' | 'NotScheduled' | 'NothingAuthorized' | 'Unauthorized';
  }

  /** @name PalletSudoError (583) */
  interface PalletSudoError extends Enum {
    readonly isRequireSudo: boolean;
    readonly type: 'RequireSudo';
  }

  /** @name FrameSystemExtensionsCheckNonZeroSender (586) */
  type FrameSystemExtensionsCheckNonZeroSender = Null;

  /** @name FrameSystemExtensionsCheckSpecVersion (587) */
  type FrameSystemExtensionsCheckSpecVersion = Null;

  /** @name FrameSystemExtensionsCheckTxVersion (588) */
  type FrameSystemExtensionsCheckTxVersion = Null;

  /** @name FrameSystemExtensionsCheckGenesis (589) */
  type FrameSystemExtensionsCheckGenesis = Null;

  /** @name RuntimeCommonCheckNonce (592) */
  interface RuntimeCommonCheckNonce extends Struct {
    readonly nonce: Compact<u32>;
  }

  /** @name FrameSystemExtensionsCheckWeight (593) */
  type FrameSystemExtensionsCheckWeight = Null;

  /** @name ModuleEvmSetEvmOrigin (594) */
  type ModuleEvmSetEvmOrigin = Null;

  /** @name ModuleTransactionPaymentChargeTransactionPayment (595) */
  interface ModuleTransactionPaymentChargeTransactionPayment extends Compact<u128> {}

  /** @name AcalaRuntimeStorageDepositPerByte (596) */
  type AcalaRuntimeStorageDepositPerByte = Null;

  /** @name AcalaRuntimeTxFeePerGas (597) */
  type AcalaRuntimeTxFeePerGas = Null;

  /** @name AcalaPrimitivesSignatureAcalaMultiSignature (599) */
  interface AcalaPrimitivesSignatureAcalaMultiSignature extends Enum {
    readonly isEd25519: boolean;
    readonly asEd25519: SpCoreEd25519Signature;
    readonly isSr25519: boolean;
    readonly asSr25519: SpCoreSr25519Signature;
    readonly isEcdsa: boolean;
    readonly asEcdsa: SpCoreEcdsaSignature;
    readonly isEthereum: boolean;
    readonly asEthereum: U8aFixed;
    readonly isEip1559: boolean;
    readonly asEip1559: U8aFixed;
    readonly isAcalaEip712: boolean;
    readonly asAcalaEip712: U8aFixed;
    readonly type: 'Ed25519' | 'Sr25519' | 'Ecdsa' | 'Ethereum' | 'Eip1559' | 'AcalaEip712';
  }

} // declare module
