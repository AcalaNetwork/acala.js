// Auto-generated via `yarn polkadot-types-from-chain`, do not edit
/* eslint-disable */

// import type lookup before we augment - in some environments
// this is required to allow for ambient/previous definitions
import '@polkadot/api-base/types/submittable';

import type { AccountId32, Call, H160, H256, MultiAddress, Perbill } from '@acala-network/types/interfaces/runtime';
import type { ApiTypes, AugmentedSubmittable, SubmittableExtrinsic, SubmittableExtrinsicFunction } from '@polkadot/api-base/types';
import type { BTreeMap, Bytes, Compact, Option, U8aFixed, Vec, WrapperKeepOpaque, bool, i128, u128, u16, u32, u64, u8 } from '@polkadot/types-codec';
import type { AnyNumber, IMethod, ITuple } from '@polkadot/types-codec/types';
import type { AcalaPrimitivesAuthoritysOriginId, AcalaPrimitivesCurrencyAssetMetadata, AcalaPrimitivesCurrencyCurrencyId, AcalaRuntimeOriginCaller, AcalaRuntimeScheduledTasks, AcalaRuntimeSessionKeys, CumulusPrimitivesParachainInherentParachainInherentData, EthereumTransactionAccessListItem, EthereumTransactionTransactionAction, FrameSupportScheduleDispatchTime, FrameSupportScheduleMaybeHashed, ModuleHomaModuleUnlockChunk, ModuleSupportDexAggregatedSwapPath, ModuleSupportDexSwapLimit, ModuleSupportIncentivesPoolId, ModuleXcmInterfaceModuleXcmInterfaceOperation, OrmlTraitsChangeOption, OrmlTraitsChangeU128, OrmlVestingVestingSchedule, PalletDemocracyConviction, PalletDemocracyVoteAccountVote, PalletMultisigTimepoint, RuntimeCommonProxyType, SpRuntimeHeader, SpRuntimeMultiSignature, XcmV1MultiLocation, XcmV2WeightLimit, XcmVersionedMultiAsset, XcmVersionedMultiAssets, XcmVersionedMultiLocation, XcmVersionedXcm } from '@polkadot/types/lookup';

export type __AugmentedSubmittable = AugmentedSubmittable<() => unknown>;
export type __SubmittableExtrinsic<ApiType extends ApiTypes> = SubmittableExtrinsic<ApiType>;
export type __SubmittableExtrinsicFunction<ApiType extends ApiTypes> = SubmittableExtrinsicFunction<ApiType>;

declare module '@polkadot/api-base/types/submittable' {
  interface AugmentedSubmittables<ApiType extends ApiTypes> {
    acalaOracle: {
      feedValues: AugmentedSubmittable<(values: Vec<ITuple<[AcalaPrimitivesCurrencyCurrencyId, u128]>> | ([AcalaPrimitivesCurrencyCurrencyId | { Token: any } | { DexShare: any } | { Erc20: any } | { StableAssetPoolToken: any } | { LiquidCrowdloan: any } | { ForeignAsset: any } | string | Uint8Array, u128 | AnyNumber | Uint8Array])[]) => SubmittableExtrinsic<ApiType>, [Vec<ITuple<[AcalaPrimitivesCurrencyCurrencyId, u128]>>]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    aggregatedDex: {
      swapWithExactSupply: AugmentedSubmittable<(paths: Vec<ModuleSupportDexAggregatedSwapPath> | (ModuleSupportDexAggregatedSwapPath | { Dex: any } | { Taiga: any } | string | Uint8Array)[], supplyAmount: Compact<u128> | AnyNumber | Uint8Array, minTargetAmount: Compact<u128> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Vec<ModuleSupportDexAggregatedSwapPath>, Compact<u128>, Compact<u128>]>;
      swapWithExactTarget: AugmentedSubmittable<(paths: Vec<ModuleSupportDexAggregatedSwapPath> | (ModuleSupportDexAggregatedSwapPath | { Dex: any } | { Taiga: any } | string | Uint8Array)[], targetAmount: Compact<u128> | AnyNumber | Uint8Array, maxSupplyAmount: Compact<u128> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Vec<ModuleSupportDexAggregatedSwapPath>, Compact<u128>, Compact<u128>]>;
      updateAggregatedSwapPaths: AugmentedSubmittable<(updates: Vec<ITuple<[ITuple<[AcalaPrimitivesCurrencyCurrencyId, AcalaPrimitivesCurrencyCurrencyId]>, Option<Vec<ModuleSupportDexAggregatedSwapPath>>]>> | ([ITuple<[AcalaPrimitivesCurrencyCurrencyId, AcalaPrimitivesCurrencyCurrencyId]> | [AcalaPrimitivesCurrencyCurrencyId | { Token: any } | { DexShare: any } | { Erc20: any } | { StableAssetPoolToken: any } | { LiquidCrowdloan: any } | { ForeignAsset: any } | string | Uint8Array, AcalaPrimitivesCurrencyCurrencyId | { Token: any } | { DexShare: any } | { Erc20: any } | { StableAssetPoolToken: any } | { LiquidCrowdloan: any } | { ForeignAsset: any } | string | Uint8Array], Option<Vec<ModuleSupportDexAggregatedSwapPath>> | null | Uint8Array | Vec<ModuleSupportDexAggregatedSwapPath> | (ModuleSupportDexAggregatedSwapPath | { Dex: any } | { Taiga: any } | string | Uint8Array)[]])[]) => SubmittableExtrinsic<ApiType>, [Vec<ITuple<[ITuple<[AcalaPrimitivesCurrencyCurrencyId, AcalaPrimitivesCurrencyCurrencyId]>, Option<Vec<ModuleSupportDexAggregatedSwapPath>>]>>]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    assetRegistry: {
      registerErc20Asset: AugmentedSubmittable<(contract: H160 | string | Uint8Array, minimalBalance: u128 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [H160, u128]>;
      registerForeignAsset: AugmentedSubmittable<(location: XcmVersionedMultiLocation | { V0: any } | { V1: any } | string | Uint8Array, metadata: AcalaPrimitivesCurrencyAssetMetadata | { name?: any; symbol?: any; decimals?: any; minimalBalance?: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [XcmVersionedMultiLocation, AcalaPrimitivesCurrencyAssetMetadata]>;
      registerNativeAsset: AugmentedSubmittable<(currencyId: AcalaPrimitivesCurrencyCurrencyId | { Token: any } | { DexShare: any } | { Erc20: any } | { StableAssetPoolToken: any } | { LiquidCrowdloan: any } | { ForeignAsset: any } | string | Uint8Array, metadata: AcalaPrimitivesCurrencyAssetMetadata | { name?: any; symbol?: any; decimals?: any; minimalBalance?: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [AcalaPrimitivesCurrencyCurrencyId, AcalaPrimitivesCurrencyAssetMetadata]>;
      registerStableAsset: AugmentedSubmittable<(metadata: AcalaPrimitivesCurrencyAssetMetadata | { name?: any; symbol?: any; decimals?: any; minimalBalance?: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [AcalaPrimitivesCurrencyAssetMetadata]>;
      updateErc20Asset: AugmentedSubmittable<(contract: H160 | string | Uint8Array, metadata: AcalaPrimitivesCurrencyAssetMetadata | { name?: any; symbol?: any; decimals?: any; minimalBalance?: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [H160, AcalaPrimitivesCurrencyAssetMetadata]>;
      updateForeignAsset: AugmentedSubmittable<(foreignAssetId: u16 | AnyNumber | Uint8Array, location: XcmVersionedMultiLocation | { V0: any } | { V1: any } | string | Uint8Array, metadata: AcalaPrimitivesCurrencyAssetMetadata | { name?: any; symbol?: any; decimals?: any; minimalBalance?: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [u16, XcmVersionedMultiLocation, AcalaPrimitivesCurrencyAssetMetadata]>;
      updateNativeAsset: AugmentedSubmittable<(currencyId: AcalaPrimitivesCurrencyCurrencyId | { Token: any } | { DexShare: any } | { Erc20: any } | { StableAssetPoolToken: any } | { LiquidCrowdloan: any } | { ForeignAsset: any } | string | Uint8Array, metadata: AcalaPrimitivesCurrencyAssetMetadata | { name?: any; symbol?: any; decimals?: any; minimalBalance?: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [AcalaPrimitivesCurrencyCurrencyId, AcalaPrimitivesCurrencyAssetMetadata]>;
      updateStableAsset: AugmentedSubmittable<(stableAssetId: u32 | AnyNumber | Uint8Array, metadata: AcalaPrimitivesCurrencyAssetMetadata | { name?: any; symbol?: any; decimals?: any; minimalBalance?: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [u32, AcalaPrimitivesCurrencyAssetMetadata]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    auction: {
      bid: AugmentedSubmittable<(id: u32 | AnyNumber | Uint8Array, value: Compact<u128> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [u32, Compact<u128>]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    auctionManager: {
      cancel: AugmentedSubmittable<(id: u32 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [u32]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    authority: {
      authorizeCall: AugmentedSubmittable<(call: Call | IMethod | string | Uint8Array, caller: Option<AccountId32> | null | Uint8Array | AccountId32 | string) => SubmittableExtrinsic<ApiType>, [Call, Option<AccountId32>]>;
      cancelScheduledDispatch: AugmentedSubmittable<(initialOrigin: AcalaRuntimeOriginCaller | { system: any } | { Void: any } | { PolkadotXcm: any } | { CumulusXcm: any } | { Authority: any } | { GeneralCouncil: any } | { FinancialCouncil: any } | { HomaCouncil: any } | { TechnicalCommittee: any } | string | Uint8Array, taskId: u32 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [AcalaRuntimeOriginCaller, u32]>;
      delayScheduledDispatch: AugmentedSubmittable<(initialOrigin: AcalaRuntimeOriginCaller | { system: any } | { Void: any } | { PolkadotXcm: any } | { CumulusXcm: any } | { Authority: any } | { GeneralCouncil: any } | { FinancialCouncil: any } | { HomaCouncil: any } | { TechnicalCommittee: any } | string | Uint8Array, taskId: u32 | AnyNumber | Uint8Array, additionalDelay: u32 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [AcalaRuntimeOriginCaller, u32, u32]>;
      dispatchAs: AugmentedSubmittable<(asOrigin: AcalaPrimitivesAuthoritysOriginId | 'Root' | 'Treasury' | 'HonzonTreasury' | 'HomaTreasury' | 'TreasuryReserve' | number | Uint8Array, call: Call | IMethod | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [AcalaPrimitivesAuthoritysOriginId, Call]>;
      fastTrackScheduledDispatch: AugmentedSubmittable<(initialOrigin: AcalaRuntimeOriginCaller | { system: any } | { Void: any } | { PolkadotXcm: any } | { CumulusXcm: any } | { Authority: any } | { GeneralCouncil: any } | { FinancialCouncil: any } | { HomaCouncil: any } | { TechnicalCommittee: any } | string | Uint8Array, taskId: u32 | AnyNumber | Uint8Array, when: FrameSupportScheduleDispatchTime | { At: any } | { After: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [AcalaRuntimeOriginCaller, u32, FrameSupportScheduleDispatchTime]>;
      removeAuthorizedCall: AugmentedSubmittable<(hash: H256 | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [H256]>;
      scheduleDispatch: AugmentedSubmittable<(when: FrameSupportScheduleDispatchTime | { At: any } | { After: any } | string | Uint8Array, priority: u8 | AnyNumber | Uint8Array, withDelayedOrigin: bool | boolean | Uint8Array, call: Call | IMethod | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [FrameSupportScheduleDispatchTime, u8, bool, Call]>;
      triggerCall: AugmentedSubmittable<(hash: H256 | string | Uint8Array, callWeightBound: Compact<u64> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [H256, Compact<u64>]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    authorship: {
      setUncles: AugmentedSubmittable<(newUncles: Vec<SpRuntimeHeader> | (SpRuntimeHeader | { parentHash?: any; number?: any; stateRoot?: any; extrinsicsRoot?: any; digest?: any } | string | Uint8Array)[]) => SubmittableExtrinsic<ApiType>, [Vec<SpRuntimeHeader>]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    balances: {
      forceTransfer: AugmentedSubmittable<(source: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array, dest: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array, value: Compact<u128> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [MultiAddress, MultiAddress, Compact<u128>]>;
      forceUnreserve: AugmentedSubmittable<(who: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array, amount: u128 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [MultiAddress, u128]>;
      setBalance: AugmentedSubmittable<(who: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array, newFree: Compact<u128> | AnyNumber | Uint8Array, newReserved: Compact<u128> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [MultiAddress, Compact<u128>, Compact<u128>]>;
      transfer: AugmentedSubmittable<(dest: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array, value: Compact<u128> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [MultiAddress, Compact<u128>]>;
      transferAll: AugmentedSubmittable<(dest: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array, keepAlive: bool | boolean | Uint8Array) => SubmittableExtrinsic<ApiType>, [MultiAddress, bool]>;
      transferKeepAlive: AugmentedSubmittable<(dest: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array, value: Compact<u128> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [MultiAddress, Compact<u128>]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    bounties: {
      acceptCurator: AugmentedSubmittable<(bountyId: Compact<u32> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<u32>]>;
      approveBounty: AugmentedSubmittable<(bountyId: Compact<u32> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<u32>]>;
      awardBounty: AugmentedSubmittable<(bountyId: Compact<u32> | AnyNumber | Uint8Array, beneficiary: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<u32>, MultiAddress]>;
      claimBounty: AugmentedSubmittable<(bountyId: Compact<u32> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<u32>]>;
      closeBounty: AugmentedSubmittable<(bountyId: Compact<u32> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<u32>]>;
      extendBountyExpiry: AugmentedSubmittable<(bountyId: Compact<u32> | AnyNumber | Uint8Array, remark: Bytes | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<u32>, Bytes]>;
      proposeBounty: AugmentedSubmittable<(value: Compact<u128> | AnyNumber | Uint8Array, description: Bytes | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<u128>, Bytes]>;
      proposeCurator: AugmentedSubmittable<(bountyId: Compact<u32> | AnyNumber | Uint8Array, curator: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array, fee: Compact<u128> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<u32>, MultiAddress, Compact<u128>]>;
      unassignCurator: AugmentedSubmittable<(bountyId: Compact<u32> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<u32>]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    cdpEngine: {
      deregisterLiquidationContract: AugmentedSubmittable<(address: H160 | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [H160]>;
      liquidate: AugmentedSubmittable<(currencyId: AcalaPrimitivesCurrencyCurrencyId | { Token: any } | { DexShare: any } | { Erc20: any } | { StableAssetPoolToken: any } | { LiquidCrowdloan: any } | { ForeignAsset: any } | string | Uint8Array, who: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [AcalaPrimitivesCurrencyCurrencyId, MultiAddress]>;
      registerLiquidationContract: AugmentedSubmittable<(address: H160 | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [H160]>;
      setCollateralParams: AugmentedSubmittable<(currencyId: AcalaPrimitivesCurrencyCurrencyId | { Token: any } | { DexShare: any } | { Erc20: any } | { StableAssetPoolToken: any } | { LiquidCrowdloan: any } | { ForeignAsset: any } | string | Uint8Array, interestRatePerSec: OrmlTraitsChangeOption | { NoChange: any } | { NewValue: any } | string | Uint8Array, liquidationRatio: OrmlTraitsChangeOption | { NoChange: any } | { NewValue: any } | string | Uint8Array, liquidationPenalty: OrmlTraitsChangeOption | { NoChange: any } | { NewValue: any } | string | Uint8Array, requiredCollateralRatio: OrmlTraitsChangeOption | { NoChange: any } | { NewValue: any } | string | Uint8Array, maximumTotalDebitValue: OrmlTraitsChangeU128 | { NoChange: any } | { NewValue: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [AcalaPrimitivesCurrencyCurrencyId, OrmlTraitsChangeOption, OrmlTraitsChangeOption, OrmlTraitsChangeOption, OrmlTraitsChangeOption, OrmlTraitsChangeU128]>;
      settle: AugmentedSubmittable<(currencyId: AcalaPrimitivesCurrencyCurrencyId | { Token: any } | { DexShare: any } | { Erc20: any } | { StableAssetPoolToken: any } | { LiquidCrowdloan: any } | { ForeignAsset: any } | string | Uint8Array, who: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [AcalaPrimitivesCurrencyCurrencyId, MultiAddress]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    cdpTreasury: {
      auctionCollateral: AugmentedSubmittable<(currencyId: AcalaPrimitivesCurrencyCurrencyId | { Token: any } | { DexShare: any } | { Erc20: any } | { StableAssetPoolToken: any } | { LiquidCrowdloan: any } | { ForeignAsset: any } | string | Uint8Array, amount: Compact<u128> | AnyNumber | Uint8Array, target: Compact<u128> | AnyNumber | Uint8Array, splited: bool | boolean | Uint8Array) => SubmittableExtrinsic<ApiType>, [AcalaPrimitivesCurrencyCurrencyId, Compact<u128>, Compact<u128>, bool]>;
      exchangeCollateralToStable: AugmentedSubmittable<(currencyId: AcalaPrimitivesCurrencyCurrencyId | { Token: any } | { DexShare: any } | { Erc20: any } | { StableAssetPoolToken: any } | { LiquidCrowdloan: any } | { ForeignAsset: any } | string | Uint8Array, swapLimit: ModuleSupportDexSwapLimit | { ExactSupply: any } | { ExactTarget: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [AcalaPrimitivesCurrencyCurrencyId, ModuleSupportDexSwapLimit]>;
      extractSurplusToTreasury: AugmentedSubmittable<(amount: Compact<u128> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<u128>]>;
      setExpectedCollateralAuctionSize: AugmentedSubmittable<(currencyId: AcalaPrimitivesCurrencyCurrencyId | { Token: any } | { DexShare: any } | { Erc20: any } | { StableAssetPoolToken: any } | { LiquidCrowdloan: any } | { ForeignAsset: any } | string | Uint8Array, size: Compact<u128> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [AcalaPrimitivesCurrencyCurrencyId, Compact<u128>]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    collatorSelection: {
      leaveIntent: AugmentedSubmittable<() => SubmittableExtrinsic<ApiType>, []>;
      registerAsCandidate: AugmentedSubmittable<() => SubmittableExtrinsic<ApiType>, []>;
      registerCandidate: AugmentedSubmittable<(newCandidate: AccountId32 | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [AccountId32]>;
      setCandidacyBond: AugmentedSubmittable<(bond: Compact<u128> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<u128>]>;
      setDesiredCandidates: AugmentedSubmittable<(max: Compact<u32> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<u32>]>;
      setInvulnerables: AugmentedSubmittable<(updated: Vec<AccountId32> | (AccountId32 | string | Uint8Array)[]) => SubmittableExtrinsic<ApiType>, [Vec<AccountId32>]>;
      withdrawBond: AugmentedSubmittable<() => SubmittableExtrinsic<ApiType>, []>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    currencies: {
      forceRemoveLock: AugmentedSubmittable<(who: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array, currencyId: AcalaPrimitivesCurrencyCurrencyId | { Token: any } | { DexShare: any } | { Erc20: any } | { StableAssetPoolToken: any } | { LiquidCrowdloan: any } | { ForeignAsset: any } | string | Uint8Array, lockId: U8aFixed | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [MultiAddress, AcalaPrimitivesCurrencyCurrencyId, U8aFixed]>;
      forceSetLock: AugmentedSubmittable<(who: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array, currencyId: AcalaPrimitivesCurrencyCurrencyId | { Token: any } | { DexShare: any } | { Erc20: any } | { StableAssetPoolToken: any } | { LiquidCrowdloan: any } | { ForeignAsset: any } | string | Uint8Array, amount: Compact<u128> | AnyNumber | Uint8Array, lockId: U8aFixed | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [MultiAddress, AcalaPrimitivesCurrencyCurrencyId, Compact<u128>, U8aFixed]>;
      sweepDust: AugmentedSubmittable<(currencyId: AcalaPrimitivesCurrencyCurrencyId | { Token: any } | { DexShare: any } | { Erc20: any } | { StableAssetPoolToken: any } | { LiquidCrowdloan: any } | { ForeignAsset: any } | string | Uint8Array, accounts: Vec<AccountId32> | (AccountId32 | string | Uint8Array)[]) => SubmittableExtrinsic<ApiType>, [AcalaPrimitivesCurrencyCurrencyId, Vec<AccountId32>]>;
      transfer: AugmentedSubmittable<(dest: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array, currencyId: AcalaPrimitivesCurrencyCurrencyId | { Token: any } | { DexShare: any } | { Erc20: any } | { StableAssetPoolToken: any } | { LiquidCrowdloan: any } | { ForeignAsset: any } | string | Uint8Array, amount: Compact<u128> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [MultiAddress, AcalaPrimitivesCurrencyCurrencyId, Compact<u128>]>;
      transferNativeCurrency: AugmentedSubmittable<(dest: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array, amount: Compact<u128> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [MultiAddress, Compact<u128>]>;
      updateBalance: AugmentedSubmittable<(who: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array, currencyId: AcalaPrimitivesCurrencyCurrencyId | { Token: any } | { DexShare: any } | { Erc20: any } | { StableAssetPoolToken: any } | { LiquidCrowdloan: any } | { ForeignAsset: any } | string | Uint8Array, amount: i128 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [MultiAddress, AcalaPrimitivesCurrencyCurrencyId, i128]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    democracy: {
      blacklist: AugmentedSubmittable<(proposalHash: H256 | string | Uint8Array, maybeRefIndex: Option<u32> | null | Uint8Array | u32 | AnyNumber) => SubmittableExtrinsic<ApiType>, [H256, Option<u32>]>;
      cancelProposal: AugmentedSubmittable<(propIndex: Compact<u32> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<u32>]>;
      cancelQueued: AugmentedSubmittable<(which: u32 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [u32]>;
      cancelReferendum: AugmentedSubmittable<(refIndex: Compact<u32> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<u32>]>;
      clearPublicProposals: AugmentedSubmittable<() => SubmittableExtrinsic<ApiType>, []>;
      delegate: AugmentedSubmittable<(to: AccountId32 | string | Uint8Array, conviction: PalletDemocracyConviction | 'None' | 'Locked1x' | 'Locked2x' | 'Locked3x' | 'Locked4x' | 'Locked5x' | 'Locked6x' | number | Uint8Array, balance: u128 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [AccountId32, PalletDemocracyConviction, u128]>;
      emergencyCancel: AugmentedSubmittable<(refIndex: u32 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [u32]>;
      enactProposal: AugmentedSubmittable<(proposalHash: H256 | string | Uint8Array, index: u32 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [H256, u32]>;
      externalPropose: AugmentedSubmittable<(proposalHash: H256 | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [H256]>;
      externalProposeDefault: AugmentedSubmittable<(proposalHash: H256 | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [H256]>;
      externalProposeMajority: AugmentedSubmittable<(proposalHash: H256 | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [H256]>;
      fastTrack: AugmentedSubmittable<(proposalHash: H256 | string | Uint8Array, votingPeriod: u32 | AnyNumber | Uint8Array, delay: u32 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [H256, u32, u32]>;
      noteImminentPreimage: AugmentedSubmittable<(encodedProposal: Bytes | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Bytes]>;
      noteImminentPreimageOperational: AugmentedSubmittable<(encodedProposal: Bytes | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Bytes]>;
      notePreimage: AugmentedSubmittable<(encodedProposal: Bytes | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Bytes]>;
      notePreimageOperational: AugmentedSubmittable<(encodedProposal: Bytes | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Bytes]>;
      propose: AugmentedSubmittable<(proposalHash: H256 | string | Uint8Array, value: Compact<u128> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [H256, Compact<u128>]>;
      reapPreimage: AugmentedSubmittable<(proposalHash: H256 | string | Uint8Array, proposalLenUpperBound: Compact<u32> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [H256, Compact<u32>]>;
      removeOtherVote: AugmentedSubmittable<(target: AccountId32 | string | Uint8Array, index: u32 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [AccountId32, u32]>;
      removeVote: AugmentedSubmittable<(index: u32 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [u32]>;
      second: AugmentedSubmittable<(proposal: Compact<u32> | AnyNumber | Uint8Array, secondsUpperBound: Compact<u32> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<u32>, Compact<u32>]>;
      undelegate: AugmentedSubmittable<() => SubmittableExtrinsic<ApiType>, []>;
      unlock: AugmentedSubmittable<(target: AccountId32 | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [AccountId32]>;
      vetoExternal: AugmentedSubmittable<(proposalHash: H256 | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [H256]>;
      vote: AugmentedSubmittable<(refIndex: Compact<u32> | AnyNumber | Uint8Array, vote: PalletDemocracyVoteAccountVote | { Standard: any } | { Split: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<u32>, PalletDemocracyVoteAccountVote]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    dex: {
      abortProvisioning: AugmentedSubmittable<(currencyIdA: AcalaPrimitivesCurrencyCurrencyId | { Token: any } | { DexShare: any } | { Erc20: any } | { StableAssetPoolToken: any } | { LiquidCrowdloan: any } | { ForeignAsset: any } | string | Uint8Array, currencyIdB: AcalaPrimitivesCurrencyCurrencyId | { Token: any } | { DexShare: any } | { Erc20: any } | { StableAssetPoolToken: any } | { LiquidCrowdloan: any } | { ForeignAsset: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [AcalaPrimitivesCurrencyCurrencyId, AcalaPrimitivesCurrencyCurrencyId]>;
      addLiquidity: AugmentedSubmittable<(currencyIdA: AcalaPrimitivesCurrencyCurrencyId | { Token: any } | { DexShare: any } | { Erc20: any } | { StableAssetPoolToken: any } | { LiquidCrowdloan: any } | { ForeignAsset: any } | string | Uint8Array, currencyIdB: AcalaPrimitivesCurrencyCurrencyId | { Token: any } | { DexShare: any } | { Erc20: any } | { StableAssetPoolToken: any } | { LiquidCrowdloan: any } | { ForeignAsset: any } | string | Uint8Array, maxAmountA: Compact<u128> | AnyNumber | Uint8Array, maxAmountB: Compact<u128> | AnyNumber | Uint8Array, minShareIncrement: Compact<u128> | AnyNumber | Uint8Array, stakeIncrementShare: bool | boolean | Uint8Array) => SubmittableExtrinsic<ApiType>, [AcalaPrimitivesCurrencyCurrencyId, AcalaPrimitivesCurrencyCurrencyId, Compact<u128>, Compact<u128>, Compact<u128>, bool]>;
      addProvision: AugmentedSubmittable<(currencyIdA: AcalaPrimitivesCurrencyCurrencyId | { Token: any } | { DexShare: any } | { Erc20: any } | { StableAssetPoolToken: any } | { LiquidCrowdloan: any } | { ForeignAsset: any } | string | Uint8Array, currencyIdB: AcalaPrimitivesCurrencyCurrencyId | { Token: any } | { DexShare: any } | { Erc20: any } | { StableAssetPoolToken: any } | { LiquidCrowdloan: any } | { ForeignAsset: any } | string | Uint8Array, amountA: Compact<u128> | AnyNumber | Uint8Array, amountB: Compact<u128> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [AcalaPrimitivesCurrencyCurrencyId, AcalaPrimitivesCurrencyCurrencyId, Compact<u128>, Compact<u128>]>;
      claimDexShare: AugmentedSubmittable<(owner: AccountId32 | string | Uint8Array, currencyIdA: AcalaPrimitivesCurrencyCurrencyId | { Token: any } | { DexShare: any } | { Erc20: any } | { StableAssetPoolToken: any } | { LiquidCrowdloan: any } | { ForeignAsset: any } | string | Uint8Array, currencyIdB: AcalaPrimitivesCurrencyCurrencyId | { Token: any } | { DexShare: any } | { Erc20: any } | { StableAssetPoolToken: any } | { LiquidCrowdloan: any } | { ForeignAsset: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [AccountId32, AcalaPrimitivesCurrencyCurrencyId, AcalaPrimitivesCurrencyCurrencyId]>;
      disableTradingPair: AugmentedSubmittable<(currencyIdA: AcalaPrimitivesCurrencyCurrencyId | { Token: any } | { DexShare: any } | { Erc20: any } | { StableAssetPoolToken: any } | { LiquidCrowdloan: any } | { ForeignAsset: any } | string | Uint8Array, currencyIdB: AcalaPrimitivesCurrencyCurrencyId | { Token: any } | { DexShare: any } | { Erc20: any } | { StableAssetPoolToken: any } | { LiquidCrowdloan: any } | { ForeignAsset: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [AcalaPrimitivesCurrencyCurrencyId, AcalaPrimitivesCurrencyCurrencyId]>;
      enableTradingPair: AugmentedSubmittable<(currencyIdA: AcalaPrimitivesCurrencyCurrencyId | { Token: any } | { DexShare: any } | { Erc20: any } | { StableAssetPoolToken: any } | { LiquidCrowdloan: any } | { ForeignAsset: any } | string | Uint8Array, currencyIdB: AcalaPrimitivesCurrencyCurrencyId | { Token: any } | { DexShare: any } | { Erc20: any } | { StableAssetPoolToken: any } | { LiquidCrowdloan: any } | { ForeignAsset: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [AcalaPrimitivesCurrencyCurrencyId, AcalaPrimitivesCurrencyCurrencyId]>;
      endProvisioning: AugmentedSubmittable<(currencyIdA: AcalaPrimitivesCurrencyCurrencyId | { Token: any } | { DexShare: any } | { Erc20: any } | { StableAssetPoolToken: any } | { LiquidCrowdloan: any } | { ForeignAsset: any } | string | Uint8Array, currencyIdB: AcalaPrimitivesCurrencyCurrencyId | { Token: any } | { DexShare: any } | { Erc20: any } | { StableAssetPoolToken: any } | { LiquidCrowdloan: any } | { ForeignAsset: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [AcalaPrimitivesCurrencyCurrencyId, AcalaPrimitivesCurrencyCurrencyId]>;
      listProvisioning: AugmentedSubmittable<(currencyIdA: AcalaPrimitivesCurrencyCurrencyId | { Token: any } | { DexShare: any } | { Erc20: any } | { StableAssetPoolToken: any } | { LiquidCrowdloan: any } | { ForeignAsset: any } | string | Uint8Array, currencyIdB: AcalaPrimitivesCurrencyCurrencyId | { Token: any } | { DexShare: any } | { Erc20: any } | { StableAssetPoolToken: any } | { LiquidCrowdloan: any } | { ForeignAsset: any } | string | Uint8Array, minContributionA: Compact<u128> | AnyNumber | Uint8Array, minContributionB: Compact<u128> | AnyNumber | Uint8Array, targetProvisionA: Compact<u128> | AnyNumber | Uint8Array, targetProvisionB: Compact<u128> | AnyNumber | Uint8Array, notBefore: Compact<u32> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [AcalaPrimitivesCurrencyCurrencyId, AcalaPrimitivesCurrencyCurrencyId, Compact<u128>, Compact<u128>, Compact<u128>, Compact<u128>, Compact<u32>]>;
      refundProvision: AugmentedSubmittable<(owner: AccountId32 | string | Uint8Array, currencyIdA: AcalaPrimitivesCurrencyCurrencyId | { Token: any } | { DexShare: any } | { Erc20: any } | { StableAssetPoolToken: any } | { LiquidCrowdloan: any } | { ForeignAsset: any } | string | Uint8Array, currencyIdB: AcalaPrimitivesCurrencyCurrencyId | { Token: any } | { DexShare: any } | { Erc20: any } | { StableAssetPoolToken: any } | { LiquidCrowdloan: any } | { ForeignAsset: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [AccountId32, AcalaPrimitivesCurrencyCurrencyId, AcalaPrimitivesCurrencyCurrencyId]>;
      removeLiquidity: AugmentedSubmittable<(currencyIdA: AcalaPrimitivesCurrencyCurrencyId | { Token: any } | { DexShare: any } | { Erc20: any } | { StableAssetPoolToken: any } | { LiquidCrowdloan: any } | { ForeignAsset: any } | string | Uint8Array, currencyIdB: AcalaPrimitivesCurrencyCurrencyId | { Token: any } | { DexShare: any } | { Erc20: any } | { StableAssetPoolToken: any } | { LiquidCrowdloan: any } | { ForeignAsset: any } | string | Uint8Array, removeShare: Compact<u128> | AnyNumber | Uint8Array, minWithdrawnA: Compact<u128> | AnyNumber | Uint8Array, minWithdrawnB: Compact<u128> | AnyNumber | Uint8Array, byUnstake: bool | boolean | Uint8Array) => SubmittableExtrinsic<ApiType>, [AcalaPrimitivesCurrencyCurrencyId, AcalaPrimitivesCurrencyCurrencyId, Compact<u128>, Compact<u128>, Compact<u128>, bool]>;
      swapWithExactSupply: AugmentedSubmittable<(path: Vec<AcalaPrimitivesCurrencyCurrencyId> | (AcalaPrimitivesCurrencyCurrencyId | { Token: any } | { DexShare: any } | { Erc20: any } | { StableAssetPoolToken: any } | { LiquidCrowdloan: any } | { ForeignAsset: any } | string | Uint8Array)[], supplyAmount: Compact<u128> | AnyNumber | Uint8Array, minTargetAmount: Compact<u128> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Vec<AcalaPrimitivesCurrencyCurrencyId>, Compact<u128>, Compact<u128>]>;
      swapWithExactTarget: AugmentedSubmittable<(path: Vec<AcalaPrimitivesCurrencyCurrencyId> | (AcalaPrimitivesCurrencyCurrencyId | { Token: any } | { DexShare: any } | { Erc20: any } | { StableAssetPoolToken: any } | { LiquidCrowdloan: any } | { ForeignAsset: any } | string | Uint8Array)[], targetAmount: Compact<u128> | AnyNumber | Uint8Array, maxSupplyAmount: Compact<u128> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Vec<AcalaPrimitivesCurrencyCurrencyId>, Compact<u128>, Compact<u128>]>;
      updateProvisioningParameters: AugmentedSubmittable<(currencyIdA: AcalaPrimitivesCurrencyCurrencyId | { Token: any } | { DexShare: any } | { Erc20: any } | { StableAssetPoolToken: any } | { LiquidCrowdloan: any } | { ForeignAsset: any } | string | Uint8Array, currencyIdB: AcalaPrimitivesCurrencyCurrencyId | { Token: any } | { DexShare: any } | { Erc20: any } | { StableAssetPoolToken: any } | { LiquidCrowdloan: any } | { ForeignAsset: any } | string | Uint8Array, minContributionA: Compact<u128> | AnyNumber | Uint8Array, minContributionB: Compact<u128> | AnyNumber | Uint8Array, targetProvisionA: Compact<u128> | AnyNumber | Uint8Array, targetProvisionB: Compact<u128> | AnyNumber | Uint8Array, notBefore: Compact<u32> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [AcalaPrimitivesCurrencyCurrencyId, AcalaPrimitivesCurrencyCurrencyId, Compact<u128>, Compact<u128>, Compact<u128>, Compact<u128>, Compact<u32>]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    dexOracle: {
      disableAveragePrice: AugmentedSubmittable<(currencyIdA: AcalaPrimitivesCurrencyCurrencyId | { Token: any } | { DexShare: any } | { Erc20: any } | { StableAssetPoolToken: any } | { LiquidCrowdloan: any } | { ForeignAsset: any } | string | Uint8Array, currencyIdB: AcalaPrimitivesCurrencyCurrencyId | { Token: any } | { DexShare: any } | { Erc20: any } | { StableAssetPoolToken: any } | { LiquidCrowdloan: any } | { ForeignAsset: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [AcalaPrimitivesCurrencyCurrencyId, AcalaPrimitivesCurrencyCurrencyId]>;
      enableAveragePrice: AugmentedSubmittable<(currencyIdA: AcalaPrimitivesCurrencyCurrencyId | { Token: any } | { DexShare: any } | { Erc20: any } | { StableAssetPoolToken: any } | { LiquidCrowdloan: any } | { ForeignAsset: any } | string | Uint8Array, currencyIdB: AcalaPrimitivesCurrencyCurrencyId | { Token: any } | { DexShare: any } | { Erc20: any } | { StableAssetPoolToken: any } | { LiquidCrowdloan: any } | { ForeignAsset: any } | string | Uint8Array, interval: u64 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [AcalaPrimitivesCurrencyCurrencyId, AcalaPrimitivesCurrencyCurrencyId, u64]>;
      updateAveragePriceInterval: AugmentedSubmittable<(currencyIdA: AcalaPrimitivesCurrencyCurrencyId | { Token: any } | { DexShare: any } | { Erc20: any } | { StableAssetPoolToken: any } | { LiquidCrowdloan: any } | { ForeignAsset: any } | string | Uint8Array, currencyIdB: AcalaPrimitivesCurrencyCurrencyId | { Token: any } | { DexShare: any } | { Erc20: any } | { StableAssetPoolToken: any } | { LiquidCrowdloan: any } | { ForeignAsset: any } | string | Uint8Array, newInterval: u64 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [AcalaPrimitivesCurrencyCurrencyId, AcalaPrimitivesCurrencyCurrencyId, u64]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    dmpQueue: {
      serviceOverweight: AugmentedSubmittable<(index: u64 | AnyNumber | Uint8Array, weightLimit: u64 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [u64, u64]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    emergencyShutdown: {
      emergencyShutdown: AugmentedSubmittable<() => SubmittableExtrinsic<ApiType>, []>;
      openCollateralRefund: AugmentedSubmittable<() => SubmittableExtrinsic<ApiType>, []>;
      refundCollaterals: AugmentedSubmittable<(amount: Compact<u128> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<u128>]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    evm: {
      call: AugmentedSubmittable<(target: H160 | string | Uint8Array, input: Bytes | string | Uint8Array, value: Compact<u128> | AnyNumber | Uint8Array, gasLimit: Compact<u64> | AnyNumber | Uint8Array, storageLimit: Compact<u32> | AnyNumber | Uint8Array, accessList: Vec<EthereumTransactionAccessListItem> | (EthereumTransactionAccessListItem | { address?: any; storageKeys?: any } | string | Uint8Array)[]) => SubmittableExtrinsic<ApiType>, [H160, Bytes, Compact<u128>, Compact<u64>, Compact<u32>, Vec<EthereumTransactionAccessListItem>]>;
      create: AugmentedSubmittable<(input: Bytes | string | Uint8Array, value: Compact<u128> | AnyNumber | Uint8Array, gasLimit: Compact<u64> | AnyNumber | Uint8Array, storageLimit: Compact<u32> | AnyNumber | Uint8Array, accessList: Vec<EthereumTransactionAccessListItem> | (EthereumTransactionAccessListItem | { address?: any; storageKeys?: any } | string | Uint8Array)[]) => SubmittableExtrinsic<ApiType>, [Bytes, Compact<u128>, Compact<u64>, Compact<u32>, Vec<EthereumTransactionAccessListItem>]>;
      create2: AugmentedSubmittable<(input: Bytes | string | Uint8Array, salt: H256 | string | Uint8Array, value: Compact<u128> | AnyNumber | Uint8Array, gasLimit: Compact<u64> | AnyNumber | Uint8Array, storageLimit: Compact<u32> | AnyNumber | Uint8Array, accessList: Vec<EthereumTransactionAccessListItem> | (EthereumTransactionAccessListItem | { address?: any; storageKeys?: any } | string | Uint8Array)[]) => SubmittableExtrinsic<ApiType>, [Bytes, H256, Compact<u128>, Compact<u64>, Compact<u32>, Vec<EthereumTransactionAccessListItem>]>;
      createNftContract: AugmentedSubmittable<(input: Bytes | string | Uint8Array, value: Compact<u128> | AnyNumber | Uint8Array, gasLimit: Compact<u64> | AnyNumber | Uint8Array, storageLimit: Compact<u32> | AnyNumber | Uint8Array, accessList: Vec<EthereumTransactionAccessListItem> | (EthereumTransactionAccessListItem | { address?: any; storageKeys?: any } | string | Uint8Array)[]) => SubmittableExtrinsic<ApiType>, [Bytes, Compact<u128>, Compact<u64>, Compact<u32>, Vec<EthereumTransactionAccessListItem>]>;
      createPredeployContract: AugmentedSubmittable<(target: H160 | string | Uint8Array, input: Bytes | string | Uint8Array, value: Compact<u128> | AnyNumber | Uint8Array, gasLimit: Compact<u64> | AnyNumber | Uint8Array, storageLimit: Compact<u32> | AnyNumber | Uint8Array, accessList: Vec<EthereumTransactionAccessListItem> | (EthereumTransactionAccessListItem | { address?: any; storageKeys?: any } | string | Uint8Array)[]) => SubmittableExtrinsic<ApiType>, [H160, Bytes, Compact<u128>, Compact<u64>, Compact<u32>, Vec<EthereumTransactionAccessListItem>]>;
      disableContractDevelopment: AugmentedSubmittable<() => SubmittableExtrinsic<ApiType>, []>;
      enableContractDevelopment: AugmentedSubmittable<() => SubmittableExtrinsic<ApiType>, []>;
      ethCall: AugmentedSubmittable<(action: EthereumTransactionTransactionAction | { Call: any } | { Create: any } | string | Uint8Array, input: Bytes | string | Uint8Array, value: Compact<u128> | AnyNumber | Uint8Array, gasLimit: Compact<u64> | AnyNumber | Uint8Array, storageLimit: Compact<u32> | AnyNumber | Uint8Array, accessList: Vec<EthereumTransactionAccessListItem> | (EthereumTransactionAccessListItem | { address?: any; storageKeys?: any } | string | Uint8Array)[], validUntil: Compact<u32> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [EthereumTransactionTransactionAction, Bytes, Compact<u128>, Compact<u64>, Compact<u32>, Vec<EthereumTransactionAccessListItem>, Compact<u32>]>;
      publishContract: AugmentedSubmittable<(contract: H160 | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [H160]>;
      publishFree: AugmentedSubmittable<(contract: H160 | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [H160]>;
      scheduledCall: AugmentedSubmittable<(from: H160 | string | Uint8Array, target: H160 | string | Uint8Array, input: Bytes | string | Uint8Array, value: Compact<u128> | AnyNumber | Uint8Array, gasLimit: Compact<u64> | AnyNumber | Uint8Array, storageLimit: Compact<u32> | AnyNumber | Uint8Array, accessList: Vec<EthereumTransactionAccessListItem> | (EthereumTransactionAccessListItem | { address?: any; storageKeys?: any } | string | Uint8Array)[]) => SubmittableExtrinsic<ApiType>, [H160, H160, Bytes, Compact<u128>, Compact<u64>, Compact<u32>, Vec<EthereumTransactionAccessListItem>]>;
      selfdestruct: AugmentedSubmittable<(contract: H160 | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [H160]>;
      setCode: AugmentedSubmittable<(contract: H160 | string | Uint8Array, code: Bytes | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [H160, Bytes]>;
      strictCall: AugmentedSubmittable<(target: H160 | string | Uint8Array, input: Bytes | string | Uint8Array, value: Compact<u128> | AnyNumber | Uint8Array, gasLimit: Compact<u64> | AnyNumber | Uint8Array, storageLimit: Compact<u32> | AnyNumber | Uint8Array, accessList: Vec<EthereumTransactionAccessListItem> | (EthereumTransactionAccessListItem | { address?: any; storageKeys?: any } | string | Uint8Array)[]) => SubmittableExtrinsic<ApiType>, [H160, Bytes, Compact<u128>, Compact<u64>, Compact<u32>, Vec<EthereumTransactionAccessListItem>]>;
      transferMaintainer: AugmentedSubmittable<(contract: H160 | string | Uint8Array, newMaintainer: H160 | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [H160, H160]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    evmAccounts: {
      claimAccount: AugmentedSubmittable<(ethAddress: H160 | string | Uint8Array, ethSignature: U8aFixed | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [H160, U8aFixed]>;
      claimDefaultAccount: AugmentedSubmittable<() => SubmittableExtrinsic<ApiType>, []>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    financialCouncil: {
      close: AugmentedSubmittable<(proposalHash: H256 | string | Uint8Array, index: Compact<u32> | AnyNumber | Uint8Array, proposalWeightBound: Compact<u64> | AnyNumber | Uint8Array, lengthBound: Compact<u32> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [H256, Compact<u32>, Compact<u64>, Compact<u32>]>;
      disapproveProposal: AugmentedSubmittable<(proposalHash: H256 | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [H256]>;
      execute: AugmentedSubmittable<(proposal: Call | IMethod | string | Uint8Array, lengthBound: Compact<u32> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Call, Compact<u32>]>;
      propose: AugmentedSubmittable<(threshold: Compact<u32> | AnyNumber | Uint8Array, proposal: Call | IMethod | string | Uint8Array, lengthBound: Compact<u32> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<u32>, Call, Compact<u32>]>;
      setMembers: AugmentedSubmittable<(newMembers: Vec<AccountId32> | (AccountId32 | string | Uint8Array)[], prime: Option<AccountId32> | null | Uint8Array | AccountId32 | string, oldCount: u32 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Vec<AccountId32>, Option<AccountId32>, u32]>;
      vote: AugmentedSubmittable<(proposal: H256 | string | Uint8Array, index: Compact<u32> | AnyNumber | Uint8Array, approve: bool | boolean | Uint8Array) => SubmittableExtrinsic<ApiType>, [H256, Compact<u32>, bool]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    financialCouncilMembership: {
      addMember: AugmentedSubmittable<(who: AccountId32 | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [AccountId32]>;
      changeKey: AugmentedSubmittable<(updated: AccountId32 | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [AccountId32]>;
      clearPrime: AugmentedSubmittable<() => SubmittableExtrinsic<ApiType>, []>;
      removeMember: AugmentedSubmittable<(who: AccountId32 | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [AccountId32]>;
      resetMembers: AugmentedSubmittable<(members: Vec<AccountId32> | (AccountId32 | string | Uint8Array)[]) => SubmittableExtrinsic<ApiType>, [Vec<AccountId32>]>;
      setPrime: AugmentedSubmittable<(who: AccountId32 | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [AccountId32]>;
      swapMember: AugmentedSubmittable<(remove: AccountId32 | string | Uint8Array, add: AccountId32 | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [AccountId32, AccountId32]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    generalCouncil: {
      close: AugmentedSubmittable<(proposalHash: H256 | string | Uint8Array, index: Compact<u32> | AnyNumber | Uint8Array, proposalWeightBound: Compact<u64> | AnyNumber | Uint8Array, lengthBound: Compact<u32> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [H256, Compact<u32>, Compact<u64>, Compact<u32>]>;
      disapproveProposal: AugmentedSubmittable<(proposalHash: H256 | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [H256]>;
      execute: AugmentedSubmittable<(proposal: Call | IMethod | string | Uint8Array, lengthBound: Compact<u32> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Call, Compact<u32>]>;
      propose: AugmentedSubmittable<(threshold: Compact<u32> | AnyNumber | Uint8Array, proposal: Call | IMethod | string | Uint8Array, lengthBound: Compact<u32> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<u32>, Call, Compact<u32>]>;
      setMembers: AugmentedSubmittable<(newMembers: Vec<AccountId32> | (AccountId32 | string | Uint8Array)[], prime: Option<AccountId32> | null | Uint8Array | AccountId32 | string, oldCount: u32 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Vec<AccountId32>, Option<AccountId32>, u32]>;
      vote: AugmentedSubmittable<(proposal: H256 | string | Uint8Array, index: Compact<u32> | AnyNumber | Uint8Array, approve: bool | boolean | Uint8Array) => SubmittableExtrinsic<ApiType>, [H256, Compact<u32>, bool]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    generalCouncilMembership: {
      addMember: AugmentedSubmittable<(who: AccountId32 | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [AccountId32]>;
      changeKey: AugmentedSubmittable<(updated: AccountId32 | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [AccountId32]>;
      clearPrime: AugmentedSubmittable<() => SubmittableExtrinsic<ApiType>, []>;
      removeMember: AugmentedSubmittable<(who: AccountId32 | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [AccountId32]>;
      resetMembers: AugmentedSubmittable<(members: Vec<AccountId32> | (AccountId32 | string | Uint8Array)[]) => SubmittableExtrinsic<ApiType>, [Vec<AccountId32>]>;
      setPrime: AugmentedSubmittable<(who: AccountId32 | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [AccountId32]>;
      swapMember: AugmentedSubmittable<(remove: AccountId32 | string | Uint8Array, add: AccountId32 | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [AccountId32, AccountId32]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    homa: {
      claimRedemption: AugmentedSubmittable<(redeemer: AccountId32 | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [AccountId32]>;
      fastMatchRedeems: AugmentedSubmittable<(redeemerList: Vec<AccountId32> | (AccountId32 | string | Uint8Array)[]) => SubmittableExtrinsic<ApiType>, [Vec<AccountId32>]>;
      fastMatchRedeemsCompletely: AugmentedSubmittable<(redeemerList: Vec<AccountId32> | (AccountId32 | string | Uint8Array)[]) => SubmittableExtrinsic<ApiType>, [Vec<AccountId32>]>;
      forceBumpCurrentEra: AugmentedSubmittable<(bumpAmount: u32 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [u32]>;
      mint: AugmentedSubmittable<(amount: Compact<u128> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<u128>]>;
      requestRedeem: AugmentedSubmittable<(amount: Compact<u128> | AnyNumber | Uint8Array, allowFastMatch: bool | boolean | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<u128>, bool]>;
      resetCurrentEra: AugmentedSubmittable<(eraIndex: u32 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [u32]>;
      resetLedgers: AugmentedSubmittable<(updates: Vec<ITuple<[u16, Option<u128>, Option<Vec<ModuleHomaModuleUnlockChunk>>]>> | ([u16 | AnyNumber | Uint8Array, Option<u128> | null | Uint8Array | u128 | AnyNumber, Option<Vec<ModuleHomaModuleUnlockChunk>> | null | Uint8Array | Vec<ModuleHomaModuleUnlockChunk> | (ModuleHomaModuleUnlockChunk | { value?: any; era?: any } | string | Uint8Array)[]])[]) => SubmittableExtrinsic<ApiType>, [Vec<ITuple<[u16, Option<u128>, Option<Vec<ModuleHomaModuleUnlockChunk>>]>>]>;
      updateBumpEraParams: AugmentedSubmittable<(lastEraBumpedBlock: Option<u32> | null | Uint8Array | u32 | AnyNumber, frequency: Option<u32> | null | Uint8Array | u32 | AnyNumber) => SubmittableExtrinsic<ApiType>, [Option<u32>, Option<u32>]>;
      updateHomaParams: AugmentedSubmittable<(softBondedCapPerSubAccount: Option<u128> | null | Uint8Array | u128 | AnyNumber, estimatedRewardRatePerEra: Option<u128> | null | Uint8Array | u128 | AnyNumber, commissionRate: Option<u128> | null | Uint8Array | u128 | AnyNumber, fastMatchFeeRate: Option<u128> | null | Uint8Array | u128 | AnyNumber) => SubmittableExtrinsic<ApiType>, [Option<u128>, Option<u128>, Option<u128>, Option<u128>]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    homaCouncil: {
      close: AugmentedSubmittable<(proposalHash: H256 | string | Uint8Array, index: Compact<u32> | AnyNumber | Uint8Array, proposalWeightBound: Compact<u64> | AnyNumber | Uint8Array, lengthBound: Compact<u32> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [H256, Compact<u32>, Compact<u64>, Compact<u32>]>;
      disapproveProposal: AugmentedSubmittable<(proposalHash: H256 | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [H256]>;
      execute: AugmentedSubmittable<(proposal: Call | IMethod | string | Uint8Array, lengthBound: Compact<u32> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Call, Compact<u32>]>;
      propose: AugmentedSubmittable<(threshold: Compact<u32> | AnyNumber | Uint8Array, proposal: Call | IMethod | string | Uint8Array, lengthBound: Compact<u32> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<u32>, Call, Compact<u32>]>;
      setMembers: AugmentedSubmittable<(newMembers: Vec<AccountId32> | (AccountId32 | string | Uint8Array)[], prime: Option<AccountId32> | null | Uint8Array | AccountId32 | string, oldCount: u32 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Vec<AccountId32>, Option<AccountId32>, u32]>;
      vote: AugmentedSubmittable<(proposal: H256 | string | Uint8Array, index: Compact<u32> | AnyNumber | Uint8Array, approve: bool | boolean | Uint8Array) => SubmittableExtrinsic<ApiType>, [H256, Compact<u32>, bool]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    homaCouncilMembership: {
      addMember: AugmentedSubmittable<(who: AccountId32 | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [AccountId32]>;
      changeKey: AugmentedSubmittable<(updated: AccountId32 | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [AccountId32]>;
      clearPrime: AugmentedSubmittable<() => SubmittableExtrinsic<ApiType>, []>;
      removeMember: AugmentedSubmittable<(who: AccountId32 | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [AccountId32]>;
      resetMembers: AugmentedSubmittable<(members: Vec<AccountId32> | (AccountId32 | string | Uint8Array)[]) => SubmittableExtrinsic<ApiType>, [Vec<AccountId32>]>;
      setPrime: AugmentedSubmittable<(who: AccountId32 | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [AccountId32]>;
      swapMember: AugmentedSubmittable<(remove: AccountId32 | string | Uint8Array, add: AccountId32 | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [AccountId32, AccountId32]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    honzon: {
      adjustLoan: AugmentedSubmittable<(currencyId: AcalaPrimitivesCurrencyCurrencyId | { Token: any } | { DexShare: any } | { Erc20: any } | { StableAssetPoolToken: any } | { LiquidCrowdloan: any } | { ForeignAsset: any } | string | Uint8Array, collateralAdjustment: i128 | AnyNumber | Uint8Array, debitAdjustment: i128 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [AcalaPrimitivesCurrencyCurrencyId, i128, i128]>;
      adjustLoanByDebitValue: AugmentedSubmittable<(currencyId: AcalaPrimitivesCurrencyCurrencyId | { Token: any } | { DexShare: any } | { Erc20: any } | { StableAssetPoolToken: any } | { LiquidCrowdloan: any } | { ForeignAsset: any } | string | Uint8Array, collateralAdjustment: i128 | AnyNumber | Uint8Array, debitValueAdjustment: i128 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [AcalaPrimitivesCurrencyCurrencyId, i128, i128]>;
      authorize: AugmentedSubmittable<(currencyId: AcalaPrimitivesCurrencyCurrencyId | { Token: any } | { DexShare: any } | { Erc20: any } | { StableAssetPoolToken: any } | { LiquidCrowdloan: any } | { ForeignAsset: any } | string | Uint8Array, to: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [AcalaPrimitivesCurrencyCurrencyId, MultiAddress]>;
      closeLoanHasDebitByDex: AugmentedSubmittable<(currencyId: AcalaPrimitivesCurrencyCurrencyId | { Token: any } | { DexShare: any } | { Erc20: any } | { StableAssetPoolToken: any } | { LiquidCrowdloan: any } | { ForeignAsset: any } | string | Uint8Array, maxCollateralAmount: Compact<u128> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [AcalaPrimitivesCurrencyCurrencyId, Compact<u128>]>;
      expandPositionCollateral: AugmentedSubmittable<(currencyId: AcalaPrimitivesCurrencyCurrencyId | { Token: any } | { DexShare: any } | { Erc20: any } | { StableAssetPoolToken: any } | { LiquidCrowdloan: any } | { ForeignAsset: any } | string | Uint8Array, increaseDebitValue: u128 | AnyNumber | Uint8Array, minIncreaseCollateral: u128 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [AcalaPrimitivesCurrencyCurrencyId, u128, u128]>;
      shrinkPositionDebit: AugmentedSubmittable<(currencyId: AcalaPrimitivesCurrencyCurrencyId | { Token: any } | { DexShare: any } | { Erc20: any } | { StableAssetPoolToken: any } | { LiquidCrowdloan: any } | { ForeignAsset: any } | string | Uint8Array, decreaseCollateral: u128 | AnyNumber | Uint8Array, minDecreaseDebitValue: u128 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [AcalaPrimitivesCurrencyCurrencyId, u128, u128]>;
      transferDebit: AugmentedSubmittable<(fromCurrency: AcalaPrimitivesCurrencyCurrencyId | { Token: any } | { DexShare: any } | { Erc20: any } | { StableAssetPoolToken: any } | { LiquidCrowdloan: any } | { ForeignAsset: any } | string | Uint8Array, toCurrency: AcalaPrimitivesCurrencyCurrencyId | { Token: any } | { DexShare: any } | { Erc20: any } | { StableAssetPoolToken: any } | { LiquidCrowdloan: any } | { ForeignAsset: any } | string | Uint8Array, debitTransfer: u128 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [AcalaPrimitivesCurrencyCurrencyId, AcalaPrimitivesCurrencyCurrencyId, u128]>;
      transferLoanFrom: AugmentedSubmittable<(currencyId: AcalaPrimitivesCurrencyCurrencyId | { Token: any } | { DexShare: any } | { Erc20: any } | { StableAssetPoolToken: any } | { LiquidCrowdloan: any } | { ForeignAsset: any } | string | Uint8Array, from: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [AcalaPrimitivesCurrencyCurrencyId, MultiAddress]>;
      unauthorize: AugmentedSubmittable<(currencyId: AcalaPrimitivesCurrencyCurrencyId | { Token: any } | { DexShare: any } | { Erc20: any } | { StableAssetPoolToken: any } | { LiquidCrowdloan: any } | { ForeignAsset: any } | string | Uint8Array, to: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [AcalaPrimitivesCurrencyCurrencyId, MultiAddress]>;
      unauthorizeAll: AugmentedSubmittable<() => SubmittableExtrinsic<ApiType>, []>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    idleScheduler: {
      scheduleTask: AugmentedSubmittable<(task: AcalaRuntimeScheduledTasks | { EvmTask: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [AcalaRuntimeScheduledTasks]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    incentives: {
      claimRewards: AugmentedSubmittable<(poolId: ModuleSupportIncentivesPoolId | { Loans: any } | { Dex: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [ModuleSupportIncentivesPoolId]>;
      depositDexShare: AugmentedSubmittable<(lpCurrencyId: AcalaPrimitivesCurrencyCurrencyId | { Token: any } | { DexShare: any } | { Erc20: any } | { StableAssetPoolToken: any } | { LiquidCrowdloan: any } | { ForeignAsset: any } | string | Uint8Array, amount: Compact<u128> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [AcalaPrimitivesCurrencyCurrencyId, Compact<u128>]>;
      updateClaimRewardDeductionRates: AugmentedSubmittable<(updates: Vec<ITuple<[ModuleSupportIncentivesPoolId, u128]>> | ([ModuleSupportIncentivesPoolId | { Loans: any } | { Dex: any } | string | Uint8Array, u128 | AnyNumber | Uint8Array])[]) => SubmittableExtrinsic<ApiType>, [Vec<ITuple<[ModuleSupportIncentivesPoolId, u128]>>]>;
      updateIncentiveRewards: AugmentedSubmittable<(updates: Vec<ITuple<[ModuleSupportIncentivesPoolId, Vec<ITuple<[AcalaPrimitivesCurrencyCurrencyId, u128]>>]>> | ([ModuleSupportIncentivesPoolId | { Loans: any } | { Dex: any } | string | Uint8Array, Vec<ITuple<[AcalaPrimitivesCurrencyCurrencyId, u128]>> | ([AcalaPrimitivesCurrencyCurrencyId | { Token: any } | { DexShare: any } | { Erc20: any } | { StableAssetPoolToken: any } | { LiquidCrowdloan: any } | { ForeignAsset: any } | string | Uint8Array, u128 | AnyNumber | Uint8Array])[]])[]) => SubmittableExtrinsic<ApiType>, [Vec<ITuple<[ModuleSupportIncentivesPoolId, Vec<ITuple<[AcalaPrimitivesCurrencyCurrencyId, u128]>>]>>]>;
      withdrawDexShare: AugmentedSubmittable<(lpCurrencyId: AcalaPrimitivesCurrencyCurrencyId | { Token: any } | { DexShare: any } | { Erc20: any } | { StableAssetPoolToken: any } | { LiquidCrowdloan: any } | { ForeignAsset: any } | string | Uint8Array, amount: Compact<u128> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [AcalaPrimitivesCurrencyCurrencyId, Compact<u128>]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    loans: {
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    multisig: {
      approveAsMulti: AugmentedSubmittable<(threshold: u16 | AnyNumber | Uint8Array, otherSignatories: Vec<AccountId32> | (AccountId32 | string | Uint8Array)[], maybeTimepoint: Option<PalletMultisigTimepoint> | null | Uint8Array | PalletMultisigTimepoint | { height?: any; index?: any } | string, callHash: U8aFixed | string | Uint8Array, maxWeight: u64 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [u16, Vec<AccountId32>, Option<PalletMultisigTimepoint>, U8aFixed, u64]>;
      asMulti: AugmentedSubmittable<(threshold: u16 | AnyNumber | Uint8Array, otherSignatories: Vec<AccountId32> | (AccountId32 | string | Uint8Array)[], maybeTimepoint: Option<PalletMultisigTimepoint> | null | Uint8Array | PalletMultisigTimepoint | { height?: any; index?: any } | string, call: WrapperKeepOpaque<Call> | object | string | Uint8Array, storeCall: bool | boolean | Uint8Array, maxWeight: u64 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [u16, Vec<AccountId32>, Option<PalletMultisigTimepoint>, WrapperKeepOpaque<Call>, bool, u64]>;
      asMultiThreshold1: AugmentedSubmittable<(otherSignatories: Vec<AccountId32> | (AccountId32 | string | Uint8Array)[], call: Call | IMethod | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Vec<AccountId32>, Call]>;
      cancelAsMulti: AugmentedSubmittable<(threshold: u16 | AnyNumber | Uint8Array, otherSignatories: Vec<AccountId32> | (AccountId32 | string | Uint8Array)[], timepoint: PalletMultisigTimepoint | { height?: any; index?: any } | string | Uint8Array, callHash: U8aFixed | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [u16, Vec<AccountId32>, PalletMultisigTimepoint, U8aFixed]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    nft: {
      burn: AugmentedSubmittable<(token: ITuple<[u32, u64]> | [u32 | AnyNumber | Uint8Array, u64 | AnyNumber | Uint8Array]) => SubmittableExtrinsic<ApiType>, [ITuple<[u32, u64]>]>;
      burnWithRemark: AugmentedSubmittable<(token: ITuple<[u32, u64]> | [u32 | AnyNumber | Uint8Array, u64 | AnyNumber | Uint8Array], remark: Bytes | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [ITuple<[u32, u64]>, Bytes]>;
      createClass: AugmentedSubmittable<(metadata: Bytes | string | Uint8Array, properties: u8 | AnyNumber | Uint8Array, attributes: BTreeMap<Bytes, Bytes>) => SubmittableExtrinsic<ApiType>, [Bytes, u8, BTreeMap<Bytes, Bytes>]>;
      destroyClass: AugmentedSubmittable<(classId: u32 | AnyNumber | Uint8Array, dest: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [u32, MultiAddress]>;
      mint: AugmentedSubmittable<(to: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array, classId: u32 | AnyNumber | Uint8Array, metadata: Bytes | string | Uint8Array, attributes: BTreeMap<Bytes, Bytes>, quantity: Compact<u32> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [MultiAddress, u32, Bytes, BTreeMap<Bytes, Bytes>, Compact<u32>]>;
      transfer: AugmentedSubmittable<(to: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array, token: ITuple<[u32, u64]> | [u32 | AnyNumber | Uint8Array, u64 | AnyNumber | Uint8Array]) => SubmittableExtrinsic<ApiType>, [MultiAddress, ITuple<[u32, u64]>]>;
      updateClassProperties: AugmentedSubmittable<(classId: u32 | AnyNumber | Uint8Array, properties: u8 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [u32, u8]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    operatorMembershipAcala: {
      addMember: AugmentedSubmittable<(who: AccountId32 | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [AccountId32]>;
      changeKey: AugmentedSubmittable<(updated: AccountId32 | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [AccountId32]>;
      clearPrime: AugmentedSubmittable<() => SubmittableExtrinsic<ApiType>, []>;
      removeMember: AugmentedSubmittable<(who: AccountId32 | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [AccountId32]>;
      resetMembers: AugmentedSubmittable<(members: Vec<AccountId32> | (AccountId32 | string | Uint8Array)[]) => SubmittableExtrinsic<ApiType>, [Vec<AccountId32>]>;
      setPrime: AugmentedSubmittable<(who: AccountId32 | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [AccountId32]>;
      swapMember: AugmentedSubmittable<(remove: AccountId32 | string | Uint8Array, add: AccountId32 | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [AccountId32, AccountId32]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    ormlXcm: {
      sendAsSovereign: AugmentedSubmittable<(dest: XcmVersionedMultiLocation | { V0: any } | { V1: any } | string | Uint8Array, message: XcmVersionedXcm | { V0: any } | { V1: any } | { V2: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [XcmVersionedMultiLocation, XcmVersionedXcm]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    parachainSystem: {
      authorizeUpgrade: AugmentedSubmittable<(codeHash: H256 | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [H256]>;
      enactAuthorizedUpgrade: AugmentedSubmittable<(code: Bytes | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Bytes]>;
      setValidationData: AugmentedSubmittable<(data: CumulusPrimitivesParachainInherentParachainInherentData | { validationData?: any; relayChainState?: any; downwardMessages?: any; horizontalMessages?: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [CumulusPrimitivesParachainInherentParachainInherentData]>;
      sudoSendUpwardMessage: AugmentedSubmittable<(message: Bytes | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Bytes]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    polkadotXcm: {
      execute: AugmentedSubmittable<(message: XcmVersionedXcm | { V0: any } | { V1: any } | { V2: any } | string | Uint8Array, maxWeight: u64 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [XcmVersionedXcm, u64]>;
      forceDefaultXcmVersion: AugmentedSubmittable<(maybeXcmVersion: Option<u32> | null | Uint8Array | u32 | AnyNumber) => SubmittableExtrinsic<ApiType>, [Option<u32>]>;
      forceSubscribeVersionNotify: AugmentedSubmittable<(location: XcmVersionedMultiLocation | { V0: any } | { V1: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [XcmVersionedMultiLocation]>;
      forceUnsubscribeVersionNotify: AugmentedSubmittable<(location: XcmVersionedMultiLocation | { V0: any } | { V1: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [XcmVersionedMultiLocation]>;
      forceXcmVersion: AugmentedSubmittable<(location: XcmV1MultiLocation | { parents?: any; interior?: any } | string | Uint8Array, xcmVersion: u32 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [XcmV1MultiLocation, u32]>;
      limitedReserveTransferAssets: AugmentedSubmittable<(dest: XcmVersionedMultiLocation | { V0: any } | { V1: any } | string | Uint8Array, beneficiary: XcmVersionedMultiLocation | { V0: any } | { V1: any } | string | Uint8Array, assets: XcmVersionedMultiAssets | { V0: any } | { V1: any } | string | Uint8Array, feeAssetItem: u32 | AnyNumber | Uint8Array, weightLimit: XcmV2WeightLimit | { Unlimited: any } | { Limited: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [XcmVersionedMultiLocation, XcmVersionedMultiLocation, XcmVersionedMultiAssets, u32, XcmV2WeightLimit]>;
      limitedTeleportAssets: AugmentedSubmittable<(dest: XcmVersionedMultiLocation | { V0: any } | { V1: any } | string | Uint8Array, beneficiary: XcmVersionedMultiLocation | { V0: any } | { V1: any } | string | Uint8Array, assets: XcmVersionedMultiAssets | { V0: any } | { V1: any } | string | Uint8Array, feeAssetItem: u32 | AnyNumber | Uint8Array, weightLimit: XcmV2WeightLimit | { Unlimited: any } | { Limited: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [XcmVersionedMultiLocation, XcmVersionedMultiLocation, XcmVersionedMultiAssets, u32, XcmV2WeightLimit]>;
      reserveTransferAssets: AugmentedSubmittable<(dest: XcmVersionedMultiLocation | { V0: any } | { V1: any } | string | Uint8Array, beneficiary: XcmVersionedMultiLocation | { V0: any } | { V1: any } | string | Uint8Array, assets: XcmVersionedMultiAssets | { V0: any } | { V1: any } | string | Uint8Array, feeAssetItem: u32 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [XcmVersionedMultiLocation, XcmVersionedMultiLocation, XcmVersionedMultiAssets, u32]>;
      send: AugmentedSubmittable<(dest: XcmVersionedMultiLocation | { V0: any } | { V1: any } | string | Uint8Array, message: XcmVersionedXcm | { V0: any } | { V1: any } | { V2: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [XcmVersionedMultiLocation, XcmVersionedXcm]>;
      teleportAssets: AugmentedSubmittable<(dest: XcmVersionedMultiLocation | { V0: any } | { V1: any } | string | Uint8Array, beneficiary: XcmVersionedMultiLocation | { V0: any } | { V1: any } | string | Uint8Array, assets: XcmVersionedMultiAssets | { V0: any } | { V1: any } | string | Uint8Array, feeAssetItem: u32 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [XcmVersionedMultiLocation, XcmVersionedMultiLocation, XcmVersionedMultiAssets, u32]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    preimage: {
      notePreimage: AugmentedSubmittable<(bytes: Bytes | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Bytes]>;
      requestPreimage: AugmentedSubmittable<(hash: H256 | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [H256]>;
      unnotePreimage: AugmentedSubmittable<(hash: H256 | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [H256]>;
      unrequestPreimage: AugmentedSubmittable<(hash: H256 | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [H256]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    prices: {
      lockPrice: AugmentedSubmittable<(currencyId: AcalaPrimitivesCurrencyCurrencyId | { Token: any } | { DexShare: any } | { Erc20: any } | { StableAssetPoolToken: any } | { LiquidCrowdloan: any } | { ForeignAsset: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [AcalaPrimitivesCurrencyCurrencyId]>;
      unlockPrice: AugmentedSubmittable<(currencyId: AcalaPrimitivesCurrencyCurrencyId | { Token: any } | { DexShare: any } | { Erc20: any } | { StableAssetPoolToken: any } | { LiquidCrowdloan: any } | { ForeignAsset: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [AcalaPrimitivesCurrencyCurrencyId]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    proxy: {
      addProxy: AugmentedSubmittable<(delegate: AccountId32 | string | Uint8Array, proxyType: RuntimeCommonProxyType | 'Any' | 'CancelProxy' | 'Governance' | 'Auction' | 'Swap' | 'Loan' | 'DexLiquidity' | 'StableAssetSwap' | 'StableAssetLiquidity' | 'Homa' | number | Uint8Array, delay: u32 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [AccountId32, RuntimeCommonProxyType, u32]>;
      announce: AugmentedSubmittable<(real: AccountId32 | string | Uint8Array, callHash: H256 | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [AccountId32, H256]>;
      anonymous: AugmentedSubmittable<(proxyType: RuntimeCommonProxyType | 'Any' | 'CancelProxy' | 'Governance' | 'Auction' | 'Swap' | 'Loan' | 'DexLiquidity' | 'StableAssetSwap' | 'StableAssetLiquidity' | 'Homa' | number | Uint8Array, delay: u32 | AnyNumber | Uint8Array, index: u16 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [RuntimeCommonProxyType, u32, u16]>;
      killAnonymous: AugmentedSubmittable<(spawner: AccountId32 | string | Uint8Array, proxyType: RuntimeCommonProxyType | 'Any' | 'CancelProxy' | 'Governance' | 'Auction' | 'Swap' | 'Loan' | 'DexLiquidity' | 'StableAssetSwap' | 'StableAssetLiquidity' | 'Homa' | number | Uint8Array, index: u16 | AnyNumber | Uint8Array, height: Compact<u32> | AnyNumber | Uint8Array, extIndex: Compact<u32> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [AccountId32, RuntimeCommonProxyType, u16, Compact<u32>, Compact<u32>]>;
      proxy: AugmentedSubmittable<(real: AccountId32 | string | Uint8Array, forceProxyType: Option<RuntimeCommonProxyType> | null | Uint8Array | RuntimeCommonProxyType | 'Any' | 'CancelProxy' | 'Governance' | 'Auction' | 'Swap' | 'Loan' | 'DexLiquidity' | 'StableAssetSwap' | 'StableAssetLiquidity' | 'Homa' | number, call: Call | IMethod | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [AccountId32, Option<RuntimeCommonProxyType>, Call]>;
      proxyAnnounced: AugmentedSubmittable<(delegate: AccountId32 | string | Uint8Array, real: AccountId32 | string | Uint8Array, forceProxyType: Option<RuntimeCommonProxyType> | null | Uint8Array | RuntimeCommonProxyType | 'Any' | 'CancelProxy' | 'Governance' | 'Auction' | 'Swap' | 'Loan' | 'DexLiquidity' | 'StableAssetSwap' | 'StableAssetLiquidity' | 'Homa' | number, call: Call | IMethod | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [AccountId32, AccountId32, Option<RuntimeCommonProxyType>, Call]>;
      rejectAnnouncement: AugmentedSubmittable<(delegate: AccountId32 | string | Uint8Array, callHash: H256 | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [AccountId32, H256]>;
      removeAnnouncement: AugmentedSubmittable<(real: AccountId32 | string | Uint8Array, callHash: H256 | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [AccountId32, H256]>;
      removeProxies: AugmentedSubmittable<() => SubmittableExtrinsic<ApiType>, []>;
      removeProxy: AugmentedSubmittable<(delegate: AccountId32 | string | Uint8Array, proxyType: RuntimeCommonProxyType | 'Any' | 'CancelProxy' | 'Governance' | 'Auction' | 'Swap' | 'Loan' | 'DexLiquidity' | 'StableAssetSwap' | 'StableAssetLiquidity' | 'Homa' | number | Uint8Array, delay: u32 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [AccountId32, RuntimeCommonProxyType, u32]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    rewards: {
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    scheduler: {
      cancel: AugmentedSubmittable<(when: u32 | AnyNumber | Uint8Array, index: u32 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [u32, u32]>;
      cancelNamed: AugmentedSubmittable<(id: Bytes | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Bytes]>;
      schedule: AugmentedSubmittable<(when: u32 | AnyNumber | Uint8Array, maybePeriodic: Option<ITuple<[u32, u32]>> | null | Uint8Array | ITuple<[u32, u32]> | [u32 | AnyNumber | Uint8Array, u32 | AnyNumber | Uint8Array], priority: u8 | AnyNumber | Uint8Array, call: FrameSupportScheduleMaybeHashed | { Value: any } | { Hash: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [u32, Option<ITuple<[u32, u32]>>, u8, FrameSupportScheduleMaybeHashed]>;
      scheduleAfter: AugmentedSubmittable<(after: u32 | AnyNumber | Uint8Array, maybePeriodic: Option<ITuple<[u32, u32]>> | null | Uint8Array | ITuple<[u32, u32]> | [u32 | AnyNumber | Uint8Array, u32 | AnyNumber | Uint8Array], priority: u8 | AnyNumber | Uint8Array, call: FrameSupportScheduleMaybeHashed | { Value: any } | { Hash: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [u32, Option<ITuple<[u32, u32]>>, u8, FrameSupportScheduleMaybeHashed]>;
      scheduleNamed: AugmentedSubmittable<(id: Bytes | string | Uint8Array, when: u32 | AnyNumber | Uint8Array, maybePeriodic: Option<ITuple<[u32, u32]>> | null | Uint8Array | ITuple<[u32, u32]> | [u32 | AnyNumber | Uint8Array, u32 | AnyNumber | Uint8Array], priority: u8 | AnyNumber | Uint8Array, call: FrameSupportScheduleMaybeHashed | { Value: any } | { Hash: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Bytes, u32, Option<ITuple<[u32, u32]>>, u8, FrameSupportScheduleMaybeHashed]>;
      scheduleNamedAfter: AugmentedSubmittable<(id: Bytes | string | Uint8Array, after: u32 | AnyNumber | Uint8Array, maybePeriodic: Option<ITuple<[u32, u32]>> | null | Uint8Array | ITuple<[u32, u32]> | [u32 | AnyNumber | Uint8Array, u32 | AnyNumber | Uint8Array], priority: u8 | AnyNumber | Uint8Array, call: FrameSupportScheduleMaybeHashed | { Value: any } | { Hash: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Bytes, u32, Option<ITuple<[u32, u32]>>, u8, FrameSupportScheduleMaybeHashed]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    session: {
      purgeKeys: AugmentedSubmittable<() => SubmittableExtrinsic<ApiType>, []>;
      setKeys: AugmentedSubmittable<(keys: AcalaRuntimeSessionKeys | { aura?: any } | string | Uint8Array, proof: Bytes | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [AcalaRuntimeSessionKeys, Bytes]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    sessionManager: {
      scheduleSessionDuration: AugmentedSubmittable<(startSession: Compact<u32> | AnyNumber | Uint8Array, duration: Compact<u32> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<u32>, Compact<u32>]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    stableAsset: {
      createPool: AugmentedSubmittable<(poolAsset: AcalaPrimitivesCurrencyCurrencyId | { Token: any } | { DexShare: any } | { Erc20: any } | { StableAssetPoolToken: any } | { LiquidCrowdloan: any } | { ForeignAsset: any } | string | Uint8Array, assets: Vec<AcalaPrimitivesCurrencyCurrencyId> | (AcalaPrimitivesCurrencyCurrencyId | { Token: any } | { DexShare: any } | { Erc20: any } | { StableAssetPoolToken: any } | { LiquidCrowdloan: any } | { ForeignAsset: any } | string | Uint8Array)[], precisions: Vec<u128> | (u128 | AnyNumber | Uint8Array)[], mintFee: u128 | AnyNumber | Uint8Array, swapFee: u128 | AnyNumber | Uint8Array, redeemFee: u128 | AnyNumber | Uint8Array, initialA: u128 | AnyNumber | Uint8Array, feeRecipient: AccountId32 | string | Uint8Array, yieldRecipient: AccountId32 | string | Uint8Array, precision: u128 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [AcalaPrimitivesCurrencyCurrencyId, Vec<AcalaPrimitivesCurrencyCurrencyId>, Vec<u128>, u128, u128, u128, u128, AccountId32, AccountId32, u128]>;
      mint: AugmentedSubmittable<(poolId: u32 | AnyNumber | Uint8Array, amounts: Vec<u128> | (u128 | AnyNumber | Uint8Array)[], minMintAmount: u128 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [u32, Vec<u128>, u128]>;
      modifyA: AugmentedSubmittable<(poolId: u32 | AnyNumber | Uint8Array, a: u128 | AnyNumber | Uint8Array, futureABlock: u32 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [u32, u128, u32]>;
      modifyFees: AugmentedSubmittable<(poolId: u32 | AnyNumber | Uint8Array, mintFee: Option<u128> | null | Uint8Array | u128 | AnyNumber, swapFee: Option<u128> | null | Uint8Array | u128 | AnyNumber, redeemFee: Option<u128> | null | Uint8Array | u128 | AnyNumber) => SubmittableExtrinsic<ApiType>, [u32, Option<u128>, Option<u128>, Option<u128>]>;
      modifyRecipients: AugmentedSubmittable<(poolId: u32 | AnyNumber | Uint8Array, feeRecipient: Option<AccountId32> | null | Uint8Array | AccountId32 | string, yieldRecipient: Option<AccountId32> | null | Uint8Array | AccountId32 | string) => SubmittableExtrinsic<ApiType>, [u32, Option<AccountId32>, Option<AccountId32>]>;
      redeemMulti: AugmentedSubmittable<(poolId: u32 | AnyNumber | Uint8Array, amounts: Vec<u128> | (u128 | AnyNumber | Uint8Array)[], maxRedeemAmount: u128 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [u32, Vec<u128>, u128]>;
      redeemProportion: AugmentedSubmittable<(poolId: u32 | AnyNumber | Uint8Array, amount: u128 | AnyNumber | Uint8Array, minRedeemAmounts: Vec<u128> | (u128 | AnyNumber | Uint8Array)[]) => SubmittableExtrinsic<ApiType>, [u32, u128, Vec<u128>]>;
      redeemSingle: AugmentedSubmittable<(poolId: u32 | AnyNumber | Uint8Array, amount: u128 | AnyNumber | Uint8Array, i: u32 | AnyNumber | Uint8Array, minRedeemAmount: u128 | AnyNumber | Uint8Array, assetLength: u32 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [u32, u128, u32, u128, u32]>;
      swap: AugmentedSubmittable<(poolId: u32 | AnyNumber | Uint8Array, i: u32 | AnyNumber | Uint8Array, j: u32 | AnyNumber | Uint8Array, dx: u128 | AnyNumber | Uint8Array, minDy: u128 | AnyNumber | Uint8Array, assetLength: u32 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [u32, u32, u32, u128, u128, u32]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    sudo: {
      setKey: AugmentedSubmittable<(updated: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [MultiAddress]>;
      sudo: AugmentedSubmittable<(call: Call | IMethod | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Call]>;
      sudoAs: AugmentedSubmittable<(who: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array, call: Call | IMethod | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [MultiAddress, Call]>;
      sudoUncheckedWeight: AugmentedSubmittable<(call: Call | IMethod | string | Uint8Array, weight: u64 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Call, u64]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    system: {
      fillBlock: AugmentedSubmittable<(ratio: Perbill | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Perbill]>;
      killPrefix: AugmentedSubmittable<(prefix: Bytes | string | Uint8Array, subkeys: u32 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Bytes, u32]>;
      killStorage: AugmentedSubmittable<(keys: Vec<Bytes> | (Bytes | string | Uint8Array)[]) => SubmittableExtrinsic<ApiType>, [Vec<Bytes>]>;
      remark: AugmentedSubmittable<(remark: Bytes | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Bytes]>;
      remarkWithEvent: AugmentedSubmittable<(remark: Bytes | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Bytes]>;
      setCode: AugmentedSubmittable<(code: Bytes | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Bytes]>;
      setCodeWithoutChecks: AugmentedSubmittable<(code: Bytes | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Bytes]>;
      setHeapPages: AugmentedSubmittable<(pages: u64 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [u64]>;
      setStorage: AugmentedSubmittable<(items: Vec<ITuple<[Bytes, Bytes]>> | ([Bytes | string | Uint8Array, Bytes | string | Uint8Array])[]) => SubmittableExtrinsic<ApiType>, [Vec<ITuple<[Bytes, Bytes]>>]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    technicalCommittee: {
      close: AugmentedSubmittable<(proposalHash: H256 | string | Uint8Array, index: Compact<u32> | AnyNumber | Uint8Array, proposalWeightBound: Compact<u64> | AnyNumber | Uint8Array, lengthBound: Compact<u32> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [H256, Compact<u32>, Compact<u64>, Compact<u32>]>;
      disapproveProposal: AugmentedSubmittable<(proposalHash: H256 | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [H256]>;
      execute: AugmentedSubmittable<(proposal: Call | IMethod | string | Uint8Array, lengthBound: Compact<u32> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Call, Compact<u32>]>;
      propose: AugmentedSubmittable<(threshold: Compact<u32> | AnyNumber | Uint8Array, proposal: Call | IMethod | string | Uint8Array, lengthBound: Compact<u32> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<u32>, Call, Compact<u32>]>;
      setMembers: AugmentedSubmittable<(newMembers: Vec<AccountId32> | (AccountId32 | string | Uint8Array)[], prime: Option<AccountId32> | null | Uint8Array | AccountId32 | string, oldCount: u32 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Vec<AccountId32>, Option<AccountId32>, u32]>;
      vote: AugmentedSubmittable<(proposal: H256 | string | Uint8Array, index: Compact<u32> | AnyNumber | Uint8Array, approve: bool | boolean | Uint8Array) => SubmittableExtrinsic<ApiType>, [H256, Compact<u32>, bool]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    technicalCommitteeMembership: {
      addMember: AugmentedSubmittable<(who: AccountId32 | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [AccountId32]>;
      changeKey: AugmentedSubmittable<(updated: AccountId32 | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [AccountId32]>;
      clearPrime: AugmentedSubmittable<() => SubmittableExtrinsic<ApiType>, []>;
      removeMember: AugmentedSubmittable<(who: AccountId32 | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [AccountId32]>;
      resetMembers: AugmentedSubmittable<(members: Vec<AccountId32> | (AccountId32 | string | Uint8Array)[]) => SubmittableExtrinsic<ApiType>, [Vec<AccountId32>]>;
      setPrime: AugmentedSubmittable<(who: AccountId32 | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [AccountId32]>;
      swapMember: AugmentedSubmittable<(remove: AccountId32 | string | Uint8Array, add: AccountId32 | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [AccountId32, AccountId32]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    timestamp: {
      set: AugmentedSubmittable<(now: Compact<u64> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<u64>]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    tips: {
      closeTip: AugmentedSubmittable<(hash: H256 | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [H256]>;
      reportAwesome: AugmentedSubmittable<(reason: Bytes | string | Uint8Array, who: AccountId32 | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Bytes, AccountId32]>;
      retractTip: AugmentedSubmittable<(hash: H256 | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [H256]>;
      slashTip: AugmentedSubmittable<(hash: H256 | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [H256]>;
      tip: AugmentedSubmittable<(hash: H256 | string | Uint8Array, tipValue: Compact<u128> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [H256, Compact<u128>]>;
      tipNew: AugmentedSubmittable<(reason: Bytes | string | Uint8Array, who: AccountId32 | string | Uint8Array, tipValue: Compact<u128> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Bytes, AccountId32, Compact<u128>]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    transactionPause: {
      pauseEvmPrecompile: AugmentedSubmittable<(address: H160 | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [H160]>;
      pauseTransaction: AugmentedSubmittable<(palletName: Bytes | string | Uint8Array, functionName: Bytes | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Bytes, Bytes]>;
      unpauseEvmPrecompile: AugmentedSubmittable<(address: H160 | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [H160]>;
      unpauseTransaction: AugmentedSubmittable<(palletName: Bytes | string | Uint8Array, functionName: Bytes | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Bytes, Bytes]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    transactionPayment: {
      disableChargeFeePool: AugmentedSubmittable<(currencyId: AcalaPrimitivesCurrencyCurrencyId | { Token: any } | { DexShare: any } | { Erc20: any } | { StableAssetPoolToken: any } | { LiquidCrowdloan: any } | { ForeignAsset: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [AcalaPrimitivesCurrencyCurrencyId]>;
      enableChargeFeePool: AugmentedSubmittable<(currencyId: AcalaPrimitivesCurrencyCurrencyId | { Token: any } | { DexShare: any } | { Erc20: any } | { StableAssetPoolToken: any } | { LiquidCrowdloan: any } | { ForeignAsset: any } | string | Uint8Array, poolSize: u128 | AnyNumber | Uint8Array, swapThreshold: u128 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [AcalaPrimitivesCurrencyCurrencyId, u128, u128]>;
      setAlternativeFeeSwapPath: AugmentedSubmittable<(feeSwapPath: Option<Vec<AcalaPrimitivesCurrencyCurrencyId>> | null | Uint8Array | Vec<AcalaPrimitivesCurrencyCurrencyId> | (AcalaPrimitivesCurrencyCurrencyId | { Token: any } | { DexShare: any } | { Erc20: any } | { StableAssetPoolToken: any } | { LiquidCrowdloan: any } | { ForeignAsset: any } | string | Uint8Array)[]) => SubmittableExtrinsic<ApiType>, [Option<Vec<AcalaPrimitivesCurrencyCurrencyId>>]>;
      withFeeAggregatedPath: AugmentedSubmittable<(feeAggregatedPath: Vec<ModuleSupportDexAggregatedSwapPath> | (ModuleSupportDexAggregatedSwapPath | { Dex: any } | { Taiga: any } | string | Uint8Array)[], call: Call | IMethod | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Vec<ModuleSupportDexAggregatedSwapPath>, Call]>;
      withFeeCurrency: AugmentedSubmittable<(currencyId: AcalaPrimitivesCurrencyCurrencyId | { Token: any } | { DexShare: any } | { Erc20: any } | { StableAssetPoolToken: any } | { LiquidCrowdloan: any } | { ForeignAsset: any } | string | Uint8Array, call: Call | IMethod | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [AcalaPrimitivesCurrencyCurrencyId, Call]>;
      withFeePaidBy: AugmentedSubmittable<(call: Call | IMethod | string | Uint8Array, payerAddr: AccountId32 | string | Uint8Array, payerSig: SpRuntimeMultiSignature | { Ed25519: any } | { Sr25519: any } | { Ecdsa: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Call, AccountId32, SpRuntimeMultiSignature]>;
      withFeePath: AugmentedSubmittable<(feeSwapPath: Vec<AcalaPrimitivesCurrencyCurrencyId> | (AcalaPrimitivesCurrencyCurrencyId | { Token: any } | { DexShare: any } | { Erc20: any } | { StableAssetPoolToken: any } | { LiquidCrowdloan: any } | { ForeignAsset: any } | string | Uint8Array)[], call: Call | IMethod | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Vec<AcalaPrimitivesCurrencyCurrencyId>, Call]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    treasury: {
      approveProposal: AugmentedSubmittable<(proposalId: Compact<u32> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<u32>]>;
      proposeSpend: AugmentedSubmittable<(value: Compact<u128> | AnyNumber | Uint8Array, beneficiary: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<u128>, MultiAddress]>;
      rejectProposal: AugmentedSubmittable<(proposalId: Compact<u32> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<u32>]>;
      removeApproval: AugmentedSubmittable<(proposalId: Compact<u32> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<u32>]>;
      spend: AugmentedSubmittable<(amount: Compact<u128> | AnyNumber | Uint8Array, beneficiary: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<u128>, MultiAddress]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    utility: {
      asDerivative: AugmentedSubmittable<(index: u16 | AnyNumber | Uint8Array, call: Call | IMethod | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [u16, Call]>;
      batch: AugmentedSubmittable<(calls: Vec<Call> | (Call | IMethod | string | Uint8Array)[]) => SubmittableExtrinsic<ApiType>, [Vec<Call>]>;
      batchAll: AugmentedSubmittable<(calls: Vec<Call> | (Call | IMethod | string | Uint8Array)[]) => SubmittableExtrinsic<ApiType>, [Vec<Call>]>;
      dispatchAs: AugmentedSubmittable<(asOrigin: AcalaRuntimeOriginCaller | { system: any } | { Void: any } | { PolkadotXcm: any } | { CumulusXcm: any } | { Authority: any } | { GeneralCouncil: any } | { FinancialCouncil: any } | { HomaCouncil: any } | { TechnicalCommittee: any } | string | Uint8Array, call: Call | IMethod | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [AcalaRuntimeOriginCaller, Call]>;
      forceBatch: AugmentedSubmittable<(calls: Vec<Call> | (Call | IMethod | string | Uint8Array)[]) => SubmittableExtrinsic<ApiType>, [Vec<Call>]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    vesting: {
      claim: AugmentedSubmittable<() => SubmittableExtrinsic<ApiType>, []>;
      claimFor: AugmentedSubmittable<(dest: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [MultiAddress]>;
      updateVestingSchedules: AugmentedSubmittable<(who: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array, vestingSchedules: Vec<OrmlVestingVestingSchedule> | (OrmlVestingVestingSchedule | { start?: any; period?: any; periodCount?: any; perPeriod?: any } | string | Uint8Array)[]) => SubmittableExtrinsic<ApiType>, [MultiAddress, Vec<OrmlVestingVestingSchedule>]>;
      vestedTransfer: AugmentedSubmittable<(dest: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array, schedule: OrmlVestingVestingSchedule | { start?: any; period?: any; periodCount?: any; perPeriod?: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [MultiAddress, OrmlVestingVestingSchedule]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    xcmInterface: {
      updateXcmDestWeightAndFee: AugmentedSubmittable<(updates: Vec<ITuple<[ModuleXcmInterfaceModuleXcmInterfaceOperation, Option<u64>, Option<u128>]>> | ([ModuleXcmInterfaceModuleXcmInterfaceOperation | { XtokensTransfer: any } | { HomaWithdrawUnbonded: any } | { HomaBondExtra: any } | { HomaUnbond: any } | { ParachainFee: any } | string | Uint8Array, Option<u64> | null | Uint8Array | u64 | AnyNumber, Option<u128> | null | Uint8Array | u128 | AnyNumber])[]) => SubmittableExtrinsic<ApiType>, [Vec<ITuple<[ModuleXcmInterfaceModuleXcmInterfaceOperation, Option<u64>, Option<u128>]>>]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    xcmpQueue: {
      resumeXcmExecution: AugmentedSubmittable<() => SubmittableExtrinsic<ApiType>, []>;
      serviceOverweight: AugmentedSubmittable<(index: u64 | AnyNumber | Uint8Array, weightLimit: u64 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [u64, u64]>;
      suspendXcmExecution: AugmentedSubmittable<() => SubmittableExtrinsic<ApiType>, []>;
      updateDropThreshold: AugmentedSubmittable<(updated: u32 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [u32]>;
      updateResumeThreshold: AugmentedSubmittable<(updated: u32 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [u32]>;
      updateSuspendThreshold: AugmentedSubmittable<(updated: u32 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [u32]>;
      updateThresholdWeight: AugmentedSubmittable<(updated: u64 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [u64]>;
      updateWeightRestrictDecay: AugmentedSubmittable<(updated: u64 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [u64]>;
      updateXcmpMaxIndividualWeight: AugmentedSubmittable<(updated: u64 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [u64]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    xTokens: {
      transfer: AugmentedSubmittable<(currencyId: AcalaPrimitivesCurrencyCurrencyId | { Token: any } | { DexShare: any } | { Erc20: any } | { StableAssetPoolToken: any } | { LiquidCrowdloan: any } | { ForeignAsset: any } | string | Uint8Array, amount: u128 | AnyNumber | Uint8Array, dest: XcmVersionedMultiLocation | { V0: any } | { V1: any } | string | Uint8Array, destWeight: u64 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [AcalaPrimitivesCurrencyCurrencyId, u128, XcmVersionedMultiLocation, u64]>;
      transferMultiasset: AugmentedSubmittable<(asset: XcmVersionedMultiAsset | { V0: any } | { V1: any } | string | Uint8Array, dest: XcmVersionedMultiLocation | { V0: any } | { V1: any } | string | Uint8Array, destWeight: u64 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [XcmVersionedMultiAsset, XcmVersionedMultiLocation, u64]>;
      transferMultiassets: AugmentedSubmittable<(assets: XcmVersionedMultiAssets | { V0: any } | { V1: any } | string | Uint8Array, feeItem: u32 | AnyNumber | Uint8Array, dest: XcmVersionedMultiLocation | { V0: any } | { V1: any } | string | Uint8Array, destWeight: u64 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [XcmVersionedMultiAssets, u32, XcmVersionedMultiLocation, u64]>;
      transferMultiassetWithFee: AugmentedSubmittable<(asset: XcmVersionedMultiAsset | { V0: any } | { V1: any } | string | Uint8Array, fee: XcmVersionedMultiAsset | { V0: any } | { V1: any } | string | Uint8Array, dest: XcmVersionedMultiLocation | { V0: any } | { V1: any } | string | Uint8Array, destWeight: u64 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [XcmVersionedMultiAsset, XcmVersionedMultiAsset, XcmVersionedMultiLocation, u64]>;
      transferMulticurrencies: AugmentedSubmittable<(currencies: Vec<ITuple<[AcalaPrimitivesCurrencyCurrencyId, u128]>> | ([AcalaPrimitivesCurrencyCurrencyId | { Token: any } | { DexShare: any } | { Erc20: any } | { StableAssetPoolToken: any } | { LiquidCrowdloan: any } | { ForeignAsset: any } | string | Uint8Array, u128 | AnyNumber | Uint8Array])[], feeItem: u32 | AnyNumber | Uint8Array, dest: XcmVersionedMultiLocation | { V0: any } | { V1: any } | string | Uint8Array, destWeight: u64 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Vec<ITuple<[AcalaPrimitivesCurrencyCurrencyId, u128]>>, u32, XcmVersionedMultiLocation, u64]>;
      transferWithFee: AugmentedSubmittable<(currencyId: AcalaPrimitivesCurrencyCurrencyId | { Token: any } | { DexShare: any } | { Erc20: any } | { StableAssetPoolToken: any } | { LiquidCrowdloan: any } | { ForeignAsset: any } | string | Uint8Array, amount: u128 | AnyNumber | Uint8Array, fee: u128 | AnyNumber | Uint8Array, dest: XcmVersionedMultiLocation | { V0: any } | { V1: any } | string | Uint8Array, destWeight: u64 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [AcalaPrimitivesCurrencyCurrencyId, u128, u128, XcmVersionedMultiLocation, u64]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
  } // AugmentedSubmittables
} // declare module
