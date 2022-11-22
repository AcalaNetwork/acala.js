// Auto-generated via `yarn polkadot-types-from-chain`, do not edit
/* eslint-disable */

import type { ApiTypes } from '@polkadot/api-base/types';
import type { Bytes, Null, Option, Result, U8aFixed, Vec, bool, i128, i32, u128, u16, u32, u64, u8 } from '@polkadot/types-codec';
import type { ITuple } from '@polkadot/types-codec/types';
import type { AccountId32, H160, H256 } from '@polkadot/types/interfaces/runtime';
import type { AcalaPrimitivesCurrencyAssetIds, AcalaPrimitivesCurrencyAssetMetadata, AcalaPrimitivesCurrencyCurrencyId, AcalaPrimitivesTradingPair, AcalaRuntimeOriginCaller, AcalaRuntimeScheduledTasks, EthereumLog, EvmCoreErrorExitReason, FrameSupportScheduleLookupError, FrameSupportTokensMiscBalanceStatus, FrameSupportWeightsDispatchInfo, ModuleHomaModuleUnlockChunk, ModuleSupportIncentivesPoolId, ModuleXcmInterfaceModuleXcmInterfaceOperation, OrmlVestingVestingSchedule, PalletDemocracyVoteAccountVote, PalletDemocracyVoteThreshold, PalletMultisigTimepoint, RuntimeCommonProxyType, SpRuntimeDispatchError, XcmV1MultiAsset, XcmV1MultiLocation, XcmV1MultiassetMultiAssets, XcmV2Response, XcmV2TraitsError, XcmV2TraitsOutcome, XcmV2Xcm, XcmVersionedMultiAssets, XcmVersionedMultiLocation } from '@polkadot/types/lookup';

declare module '@polkadot/api-base/types/events' {
  export interface AugmentedEvents<ApiType extends ApiTypes> {
    acalaOracle: {
      NewFeedData: AugmentedEvent<ApiType, [AccountId32, Vec<ITuple<[AcalaPrimitivesCurrencyCurrencyId, u128]>>]>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    assetRegistry: {
      AssetRegistered: AugmentedEvent<ApiType, [AcalaPrimitivesCurrencyAssetIds, AcalaPrimitivesCurrencyAssetMetadata]>;
      AssetUpdated: AugmentedEvent<ApiType, [AcalaPrimitivesCurrencyAssetIds, AcalaPrimitivesCurrencyAssetMetadata]>;
      ForeignAssetRegistered: AugmentedEvent<ApiType, [u16, XcmV1MultiLocation, AcalaPrimitivesCurrencyAssetMetadata]>;
      ForeignAssetUpdated: AugmentedEvent<ApiType, [u16, XcmV1MultiLocation, AcalaPrimitivesCurrencyAssetMetadata]>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    auction: {
      Bid: AugmentedEvent<ApiType, [u32, AccountId32, u128]>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    auctionManager: {
      CancelAuction: AugmentedEvent<ApiType, [u32]>;
      CollateralAuctionAborted: AugmentedEvent<ApiType, [u32, AcalaPrimitivesCurrencyCurrencyId, u128, u128, AccountId32]>;
      CollateralAuctionDealt: AugmentedEvent<ApiType, [u32, AcalaPrimitivesCurrencyCurrencyId, u128, AccountId32, u128]>;
      DEXTakeCollateralAuction: AugmentedEvent<ApiType, [u32, AcalaPrimitivesCurrencyCurrencyId, u128, u128, u128]>;
      NewCollateralAuction: AugmentedEvent<ApiType, [u32, AcalaPrimitivesCurrencyCurrencyId, u128, u128]>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    authority: {
      AuthorizedCall: AugmentedEvent<ApiType, [H256, Option<AccountId32>]>;
      Cancelled: AugmentedEvent<ApiType, [AcalaRuntimeOriginCaller, u32]>;
      Delayed: AugmentedEvent<ApiType, [AcalaRuntimeOriginCaller, u32, u32]>;
      Dispatched: AugmentedEvent<ApiType, [Result<Null, SpRuntimeDispatchError>]>;
      FastTracked: AugmentedEvent<ApiType, [AcalaRuntimeOriginCaller, u32, u32]>;
      RemovedAuthorizedCall: AugmentedEvent<ApiType, [H256]>;
      Scheduled: AugmentedEvent<ApiType, [AcalaRuntimeOriginCaller, u32]>;
      TriggeredCallBy: AugmentedEvent<ApiType, [H256, AccountId32]>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    balances: {
      BalanceSet: AugmentedEvent<ApiType, [AccountId32, u128, u128]>;
      Deposit: AugmentedEvent<ApiType, [AccountId32, u128]>;
      DustLost: AugmentedEvent<ApiType, [AccountId32, u128]>;
      Endowed: AugmentedEvent<ApiType, [AccountId32, u128]>;
      Reserved: AugmentedEvent<ApiType, [AccountId32, u128]>;
      ReserveRepatriated: AugmentedEvent<ApiType, [AccountId32, AccountId32, u128, FrameSupportTokensMiscBalanceStatus]>;
      Slashed: AugmentedEvent<ApiType, [AccountId32, u128]>;
      Transfer: AugmentedEvent<ApiType, [AccountId32, AccountId32, u128]>;
      Unreserved: AugmentedEvent<ApiType, [AccountId32, u128]>;
      Withdraw: AugmentedEvent<ApiType, [AccountId32, u128]>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    bounties: {
      BountyAwarded: AugmentedEvent<ApiType, [u32, AccountId32]>;
      BountyBecameActive: AugmentedEvent<ApiType, [u32]>;
      BountyCanceled: AugmentedEvent<ApiType, [u32]>;
      BountyClaimed: AugmentedEvent<ApiType, [u32, u128, AccountId32]>;
      BountyExtended: AugmentedEvent<ApiType, [u32]>;
      BountyProposed: AugmentedEvent<ApiType, [u32]>;
      BountyRejected: AugmentedEvent<ApiType, [u32, u128]>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    cdpEngine: {
      CloseCDPInDebitByDEX: AugmentedEvent<ApiType, [AcalaPrimitivesCurrencyCurrencyId, AccountId32, u128, u128, u128]>;
      InterestRatePerSecUpdated: AugmentedEvent<ApiType, [AcalaPrimitivesCurrencyCurrencyId, Option<u128>]>;
      LiquidateUnsafeCDP: AugmentedEvent<ApiType, [AcalaPrimitivesCurrencyCurrencyId, AccountId32, u128, u128, u128]>;
      LiquidationContractDeregistered: AugmentedEvent<ApiType, [H160]>;
      LiquidationContractRegistered: AugmentedEvent<ApiType, [H160]>;
      LiquidationPenaltyUpdated: AugmentedEvent<ApiType, [AcalaPrimitivesCurrencyCurrencyId, Option<u128>]>;
      LiquidationRatioUpdated: AugmentedEvent<ApiType, [AcalaPrimitivesCurrencyCurrencyId, Option<u128>]>;
      MaximumTotalDebitValueUpdated: AugmentedEvent<ApiType, [AcalaPrimitivesCurrencyCurrencyId, u128]>;
      RequiredCollateralRatioUpdated: AugmentedEvent<ApiType, [AcalaPrimitivesCurrencyCurrencyId, Option<u128>]>;
      SettleCDPInDebit: AugmentedEvent<ApiType, [AcalaPrimitivesCurrencyCurrencyId, AccountId32]>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    cdpTreasury: {
      ExpectedCollateralAuctionSizeUpdated: AugmentedEvent<ApiType, [AcalaPrimitivesCurrencyCurrencyId, u128]>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    collatorSelection: {
      CandidateAdded: AugmentedEvent<ApiType, [AccountId32, u128]>;
      CandidateRemoved: AugmentedEvent<ApiType, [AccountId32]>;
      NewCandidacyBond: AugmentedEvent<ApiType, [u128]>;
      NewDesiredCandidates: AugmentedEvent<ApiType, [u32]>;
      NewInvulnerables: AugmentedEvent<ApiType, [Vec<AccountId32>]>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    cumulusXcm: {
      ExecutedDownward: AugmentedEvent<ApiType, [U8aFixed, XcmV2TraitsOutcome]>;
      InvalidFormat: AugmentedEvent<ApiType, [U8aFixed]>;
      UnsupportedVersion: AugmentedEvent<ApiType, [U8aFixed]>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    currencies: {
      Deposited: AugmentedEvent<ApiType, [AcalaPrimitivesCurrencyCurrencyId, AccountId32, u128]>;
      DustSwept: AugmentedEvent<ApiType, [AcalaPrimitivesCurrencyCurrencyId, AccountId32, u128]>;
      Transferred: AugmentedEvent<ApiType, [AcalaPrimitivesCurrencyCurrencyId, AccountId32, AccountId32, u128]>;
      Withdrawn: AugmentedEvent<ApiType, [AcalaPrimitivesCurrencyCurrencyId, AccountId32, u128]>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    democracy: {
      Blacklisted: AugmentedEvent<ApiType, [H256]>;
      Cancelled: AugmentedEvent<ApiType, [u32]>;
      Delegated: AugmentedEvent<ApiType, [AccountId32, AccountId32]>;
      Executed: AugmentedEvent<ApiType, [u32, Result<Null, SpRuntimeDispatchError>]>;
      ExternalTabled: AugmentedEvent<ApiType, []>;
      NotPassed: AugmentedEvent<ApiType, [u32]>;
      Passed: AugmentedEvent<ApiType, [u32]>;
      PreimageInvalid: AugmentedEvent<ApiType, [H256, u32]>;
      PreimageMissing: AugmentedEvent<ApiType, [H256, u32]>;
      PreimageNoted: AugmentedEvent<ApiType, [H256, AccountId32, u128]>;
      PreimageReaped: AugmentedEvent<ApiType, [H256, AccountId32, u128, AccountId32]>;
      PreimageUsed: AugmentedEvent<ApiType, [H256, AccountId32, u128]>;
      ProposalCanceled: AugmentedEvent<ApiType, [u32]>;
      Proposed: AugmentedEvent<ApiType, [u32, u128]>;
      Seconded: AugmentedEvent<ApiType, [AccountId32, u32]>;
      Started: AugmentedEvent<ApiType, [u32, PalletDemocracyVoteThreshold]>;
      Tabled: AugmentedEvent<ApiType, [u32, u128, Vec<AccountId32>]>;
      Undelegated: AugmentedEvent<ApiType, [AccountId32]>;
      Vetoed: AugmentedEvent<ApiType, [AccountId32, H256, u32]>;
      Voted: AugmentedEvent<ApiType, [AccountId32, u32, PalletDemocracyVoteAccountVote]>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    dex: {
      AddLiquidity: AugmentedEvent<ApiType, [AccountId32, AcalaPrimitivesCurrencyCurrencyId, u128, AcalaPrimitivesCurrencyCurrencyId, u128, u128]>;
      AddProvision: AugmentedEvent<ApiType, [AccountId32, AcalaPrimitivesCurrencyCurrencyId, u128, AcalaPrimitivesCurrencyCurrencyId, u128]>;
      DisableTradingPair: AugmentedEvent<ApiType, [AcalaPrimitivesTradingPair]>;
      EnableTradingPair: AugmentedEvent<ApiType, [AcalaPrimitivesTradingPair]>;
      ListProvisioning: AugmentedEvent<ApiType, [AcalaPrimitivesTradingPair]>;
      ProvisioningAborted: AugmentedEvent<ApiType, [AcalaPrimitivesTradingPair, u128, u128]>;
      ProvisioningToEnabled: AugmentedEvent<ApiType, [AcalaPrimitivesTradingPair, u128, u128, u128]>;
      RefundProvision: AugmentedEvent<ApiType, [AccountId32, AcalaPrimitivesCurrencyCurrencyId, u128, AcalaPrimitivesCurrencyCurrencyId, u128]>;
      RemoveLiquidity: AugmentedEvent<ApiType, [AccountId32, AcalaPrimitivesCurrencyCurrencyId, u128, AcalaPrimitivesCurrencyCurrencyId, u128, u128]>;
      Swap: AugmentedEvent<ApiType, [AccountId32, Vec<AcalaPrimitivesCurrencyCurrencyId>, Vec<u128>]>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    dmpQueue: {
      ExecutedDownward: AugmentedEvent<ApiType, [U8aFixed, XcmV2TraitsOutcome]>;
      InvalidFormat: AugmentedEvent<ApiType, [U8aFixed]>;
      OverweightEnqueued: AugmentedEvent<ApiType, [U8aFixed, u64, u64]>;
      OverweightServiced: AugmentedEvent<ApiType, [u64, u64]>;
      UnsupportedVersion: AugmentedEvent<ApiType, [U8aFixed]>;
      WeightExhausted: AugmentedEvent<ApiType, [U8aFixed, u64, u64]>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    emergencyShutdown: {
      OpenRefund: AugmentedEvent<ApiType, [u32]>;
      Refund: AugmentedEvent<ApiType, [AccountId32, u128, Vec<ITuple<[AcalaPrimitivesCurrencyCurrencyId, u128]>>]>;
      Shutdown: AugmentedEvent<ApiType, [u32]>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    evm: {
      ContractDevelopmentDisabled: AugmentedEvent<ApiType, [AccountId32]>;
      ContractDevelopmentEnabled: AugmentedEvent<ApiType, [AccountId32]>;
      ContractPublished: AugmentedEvent<ApiType, [H160]>;
      ContractSelfdestructed: AugmentedEvent<ApiType, [H160]>;
      ContractSetCode: AugmentedEvent<ApiType, [H160]>;
      Created: AugmentedEvent<ApiType, [H160, H160, Vec<EthereumLog>, u64, i32]>;
      CreatedFailed: AugmentedEvent<ApiType, [H160, H160, EvmCoreErrorExitReason, Vec<EthereumLog>, u64, i32]>;
      Executed: AugmentedEvent<ApiType, [H160, H160, Vec<EthereumLog>, u64, i32]>;
      ExecutedFailed: AugmentedEvent<ApiType, [H160, H160, EvmCoreErrorExitReason, Bytes, Vec<EthereumLog>, u64, i32]>;
      TransferredMaintainer: AugmentedEvent<ApiType, [H160, H160]>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    evmAccounts: {
      ClaimAccount: AugmentedEvent<ApiType, [AccountId32, H160]>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    financialCouncil: {
      Approved: AugmentedEvent<ApiType, [H256]>;
      Closed: AugmentedEvent<ApiType, [H256, u32, u32]>;
      Disapproved: AugmentedEvent<ApiType, [H256]>;
      Executed: AugmentedEvent<ApiType, [H256, Result<Null, SpRuntimeDispatchError>]>;
      MemberExecuted: AugmentedEvent<ApiType, [H256, Result<Null, SpRuntimeDispatchError>]>;
      Proposed: AugmentedEvent<ApiType, [AccountId32, u32, H256, u32]>;
      Voted: AugmentedEvent<ApiType, [AccountId32, H256, bool, u32, u32]>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    financialCouncilMembership: {
      Dummy: AugmentedEvent<ApiType, []>;
      KeyChanged: AugmentedEvent<ApiType, []>;
      MemberAdded: AugmentedEvent<ApiType, []>;
      MemberRemoved: AugmentedEvent<ApiType, []>;
      MembersReset: AugmentedEvent<ApiType, []>;
      MembersSwapped: AugmentedEvent<ApiType, []>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    generalCouncil: {
      Approved: AugmentedEvent<ApiType, [H256]>;
      Closed: AugmentedEvent<ApiType, [H256, u32, u32]>;
      Disapproved: AugmentedEvent<ApiType, [H256]>;
      Executed: AugmentedEvent<ApiType, [H256, Result<Null, SpRuntimeDispatchError>]>;
      MemberExecuted: AugmentedEvent<ApiType, [H256, Result<Null, SpRuntimeDispatchError>]>;
      Proposed: AugmentedEvent<ApiType, [AccountId32, u32, H256, u32]>;
      Voted: AugmentedEvent<ApiType, [AccountId32, H256, bool, u32, u32]>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    generalCouncilMembership: {
      Dummy: AugmentedEvent<ApiType, []>;
      KeyChanged: AugmentedEvent<ApiType, []>;
      MemberAdded: AugmentedEvent<ApiType, []>;
      MemberRemoved: AugmentedEvent<ApiType, []>;
      MembersReset: AugmentedEvent<ApiType, []>;
      MembersSwapped: AugmentedEvent<ApiType, []>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    homa: {
      BumpEraFrequencyUpdated: AugmentedEvent<ApiType, [u32]>;
      CommissionRateUpdated: AugmentedEvent<ApiType, [u128]>;
      CurrentEraBumped: AugmentedEvent<ApiType, [u32]>;
      CurrentEraReset: AugmentedEvent<ApiType, [u32]>;
      EstimatedRewardRatePerEraUpdated: AugmentedEvent<ApiType, [u128]>;
      FastMatchFeeRateUpdated: AugmentedEvent<ApiType, [u128]>;
      LastEraBumpedBlockUpdated: AugmentedEvent<ApiType, [u32]>;
      LedgerBondedReset: AugmentedEvent<ApiType, [u16, u128]>;
      LedgerUnlockingReset: AugmentedEvent<ApiType, [u16, Vec<ModuleHomaModuleUnlockChunk>]>;
      Minted: AugmentedEvent<ApiType, [AccountId32, u128, u128, u128]>;
      RedeemedByFastMatch: AugmentedEvent<ApiType, [AccountId32, u128, u128, u128]>;
      RedeemedByUnbond: AugmentedEvent<ApiType, [AccountId32, u32, u128, u128]>;
      RedeemRequestCancelled: AugmentedEvent<ApiType, [AccountId32, u128]>;
      RequestedRedeem: AugmentedEvent<ApiType, [AccountId32, u128, bool]>;
      SoftBondedCapPerSubAccountUpdated: AugmentedEvent<ApiType, [u128]>;
      WithdrawRedemption: AugmentedEvent<ApiType, [AccountId32, u128]>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    homaCouncil: {
      Approved: AugmentedEvent<ApiType, [H256]>;
      Closed: AugmentedEvent<ApiType, [H256, u32, u32]>;
      Disapproved: AugmentedEvent<ApiType, [H256]>;
      Executed: AugmentedEvent<ApiType, [H256, Result<Null, SpRuntimeDispatchError>]>;
      MemberExecuted: AugmentedEvent<ApiType, [H256, Result<Null, SpRuntimeDispatchError>]>;
      Proposed: AugmentedEvent<ApiType, [AccountId32, u32, H256, u32]>;
      Voted: AugmentedEvent<ApiType, [AccountId32, H256, bool, u32, u32]>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    homaCouncilMembership: {
      Dummy: AugmentedEvent<ApiType, []>;
      KeyChanged: AugmentedEvent<ApiType, []>;
      MemberAdded: AugmentedEvent<ApiType, []>;
      MemberRemoved: AugmentedEvent<ApiType, []>;
      MembersReset: AugmentedEvent<ApiType, []>;
      MembersSwapped: AugmentedEvent<ApiType, []>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    honzon: {
      Authorization: AugmentedEvent<ApiType, [AccountId32, AccountId32, AcalaPrimitivesCurrencyCurrencyId]>;
      TransferDebit: AugmentedEvent<ApiType, [AcalaPrimitivesCurrencyCurrencyId, AcalaPrimitivesCurrencyCurrencyId, u128]>;
      UnAuthorization: AugmentedEvent<ApiType, [AccountId32, AccountId32, AcalaPrimitivesCurrencyCurrencyId]>;
      UnAuthorizationAll: AugmentedEvent<ApiType, [AccountId32]>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    idleScheduler: {
      TaskAdded: AugmentedEvent<ApiType, [u32, AcalaRuntimeScheduledTasks]>;
      TaskDispatched: AugmentedEvent<ApiType, [u32, Result<Null, SpRuntimeDispatchError>]>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    incentives: {
      ClaimRewardDeductionRateUpdated: AugmentedEvent<ApiType, [ModuleSupportIncentivesPoolId, u128]>;
      ClaimRewards: AugmentedEvent<ApiType, [AccountId32, ModuleSupportIncentivesPoolId, AcalaPrimitivesCurrencyCurrencyId, u128, u128]>;
      DepositDexShare: AugmentedEvent<ApiType, [AccountId32, AcalaPrimitivesCurrencyCurrencyId, u128]>;
      IncentiveRewardAmountUpdated: AugmentedEvent<ApiType, [ModuleSupportIncentivesPoolId, AcalaPrimitivesCurrencyCurrencyId, u128]>;
      WithdrawDexShare: AugmentedEvent<ApiType, [AccountId32, AcalaPrimitivesCurrencyCurrencyId, u128]>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    loans: {
      ConfiscateCollateralAndDebit: AugmentedEvent<ApiType, [AccountId32, AcalaPrimitivesCurrencyCurrencyId, u128, u128]>;
      PositionUpdated: AugmentedEvent<ApiType, [AccountId32, AcalaPrimitivesCurrencyCurrencyId, i128, i128]>;
      TransferLoan: AugmentedEvent<ApiType, [AccountId32, AccountId32, AcalaPrimitivesCurrencyCurrencyId]>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    multisig: {
      MultisigApproval: AugmentedEvent<ApiType, [AccountId32, PalletMultisigTimepoint, AccountId32, U8aFixed]>;
      MultisigCancelled: AugmentedEvent<ApiType, [AccountId32, PalletMultisigTimepoint, AccountId32, U8aFixed]>;
      MultisigExecuted: AugmentedEvent<ApiType, [AccountId32, PalletMultisigTimepoint, AccountId32, U8aFixed, Result<Null, SpRuntimeDispatchError>]>;
      NewMultisig: AugmentedEvent<ApiType, [AccountId32, AccountId32, U8aFixed]>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    nft: {
      BurnedToken: AugmentedEvent<ApiType, [AccountId32, u32, u64]>;
      BurnedTokenWithRemark: AugmentedEvent<ApiType, [AccountId32, u32, u64, H256]>;
      CreatedClass: AugmentedEvent<ApiType, [AccountId32, u32]>;
      DestroyedClass: AugmentedEvent<ApiType, [AccountId32, u32]>;
      MintedToken: AugmentedEvent<ApiType, [AccountId32, AccountId32, u32, u32]>;
      TransferredToken: AugmentedEvent<ApiType, [AccountId32, AccountId32, u32, u64]>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    operatorMembershipAcala: {
      Dummy: AugmentedEvent<ApiType, []>;
      KeyChanged: AugmentedEvent<ApiType, []>;
      MemberAdded: AugmentedEvent<ApiType, []>;
      MemberRemoved: AugmentedEvent<ApiType, []>;
      MembersReset: AugmentedEvent<ApiType, []>;
      MembersSwapped: AugmentedEvent<ApiType, []>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    ormlXcm: {
      Sent: AugmentedEvent<ApiType, [XcmV1MultiLocation, XcmV2Xcm]>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    parachainSystem: {
      DownwardMessagesProcessed: AugmentedEvent<ApiType, [u64, H256]>;
      DownwardMessagesReceived: AugmentedEvent<ApiType, [u32]>;
      UpgradeAuthorized: AugmentedEvent<ApiType, [H256]>;
      ValidationFunctionApplied: AugmentedEvent<ApiType, [u32]>;
      ValidationFunctionDiscarded: AugmentedEvent<ApiType, []>;
      ValidationFunctionStored: AugmentedEvent<ApiType, []>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    polkadotXcm: {
      AssetsTrapped: AugmentedEvent<ApiType, [H256, XcmV1MultiLocation, XcmVersionedMultiAssets]>;
      Attempted: AugmentedEvent<ApiType, [XcmV2TraitsOutcome]>;
      InvalidResponder: AugmentedEvent<ApiType, [XcmV1MultiLocation, u64, Option<XcmV1MultiLocation>]>;
      InvalidResponderVersion: AugmentedEvent<ApiType, [XcmV1MultiLocation, u64]>;
      Notified: AugmentedEvent<ApiType, [u64, u8, u8]>;
      NotifyDecodeFailed: AugmentedEvent<ApiType, [u64, u8, u8]>;
      NotifyDispatchError: AugmentedEvent<ApiType, [u64, u8, u8]>;
      NotifyOverweight: AugmentedEvent<ApiType, [u64, u8, u8, u64, u64]>;
      NotifyTargetMigrationFail: AugmentedEvent<ApiType, [XcmVersionedMultiLocation, u64]>;
      NotifyTargetSendFail: AugmentedEvent<ApiType, [XcmV1MultiLocation, u64, XcmV2TraitsError]>;
      ResponseReady: AugmentedEvent<ApiType, [u64, XcmV2Response]>;
      ResponseTaken: AugmentedEvent<ApiType, [u64]>;
      Sent: AugmentedEvent<ApiType, [XcmV1MultiLocation, XcmV1MultiLocation, XcmV2Xcm]>;
      SupportedVersionChanged: AugmentedEvent<ApiType, [XcmV1MultiLocation, u32]>;
      UnexpectedResponse: AugmentedEvent<ApiType, [XcmV1MultiLocation, u64]>;
      VersionChangeNotified: AugmentedEvent<ApiType, [XcmV1MultiLocation, u32]>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    preimage: {
      Cleared: AugmentedEvent<ApiType, [H256]>;
      Noted: AugmentedEvent<ApiType, [H256]>;
      Requested: AugmentedEvent<ApiType, [H256]>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    prices: {
      LockPrice: AugmentedEvent<ApiType, [AcalaPrimitivesCurrencyCurrencyId, u128]>;
      UnlockPrice: AugmentedEvent<ApiType, [AcalaPrimitivesCurrencyCurrencyId]>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    proxy: {
      Announced: AugmentedEvent<ApiType, [AccountId32, AccountId32, H256]>;
      AnonymousCreated: AugmentedEvent<ApiType, [AccountId32, AccountId32, RuntimeCommonProxyType, u16]>;
      ProxyAdded: AugmentedEvent<ApiType, [AccountId32, AccountId32, RuntimeCommonProxyType, u32]>;
      ProxyExecuted: AugmentedEvent<ApiType, [Result<Null, SpRuntimeDispatchError>]>;
      ProxyRemoved: AugmentedEvent<ApiType, [AccountId32, AccountId32, RuntimeCommonProxyType, u32]>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    scheduler: {
      CallLookupFailed: AugmentedEvent<ApiType, [ITuple<[u32, u32]>, Option<Bytes>, FrameSupportScheduleLookupError]>;
      Canceled: AugmentedEvent<ApiType, [u32, u32]>;
      Dispatched: AugmentedEvent<ApiType, [ITuple<[u32, u32]>, Option<Bytes>, Result<Null, SpRuntimeDispatchError>]>;
      Scheduled: AugmentedEvent<ApiType, [u32, u32]>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    session: {
      NewSession: AugmentedEvent<ApiType, [u32]>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    sessionManager: {
      ScheduledSessionDuration: AugmentedEvent<ApiType, [u32, u32, u32]>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    stableAsset: {
      AModified: AugmentedEvent<ApiType, [u32, u128, u32]>;
      BalanceUpdated: AugmentedEvent<ApiType, [u32, Vec<u128>, Vec<u128>]>;
      CreatePool: AugmentedEvent<ApiType, [u32, u128, AccountId32, AccountId32]>;
      FeeCollected: AugmentedEvent<ApiType, [u32, u128, Vec<u128>, Vec<u128>, u128, u128, AccountId32, u128]>;
      FeeModified: AugmentedEvent<ApiType, [u32, u128, u128, u128]>;
      Minted: AugmentedEvent<ApiType, [AccountId32, u32, u128, Vec<u128>, u128, Vec<u128>, u128, u128, u128]>;
      RecipientModified: AugmentedEvent<ApiType, [u32, AccountId32, AccountId32]>;
      RedeemedMulti: AugmentedEvent<ApiType, [AccountId32, u32, u128, Vec<u128>, u128, Vec<u128>, u128, u128, u128]>;
      RedeemedProportion: AugmentedEvent<ApiType, [AccountId32, u32, u128, u128, Vec<u128>, Vec<u128>, u128, u128, Vec<u128>]>;
      RedeemedSingle: AugmentedEvent<ApiType, [AccountId32, u32, u128, u128, AcalaPrimitivesCurrencyCurrencyId, u128, Vec<u128>, u128, u128, u128]>;
      TokenSwapped: AugmentedEvent<ApiType, [AccountId32, u32, u128, AcalaPrimitivesCurrencyCurrencyId, AcalaPrimitivesCurrencyCurrencyId, u128, u128, Vec<u128>, u128, u128]>;
      YieldCollected: AugmentedEvent<ApiType, [u32, u128, u128, u128, AccountId32, u128]>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    sudo: {
      KeyChanged: AugmentedEvent<ApiType, [Option<AccountId32>]>;
      Sudid: AugmentedEvent<ApiType, [Result<Null, SpRuntimeDispatchError>]>;
      SudoAsDone: AugmentedEvent<ApiType, [Result<Null, SpRuntimeDispatchError>]>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    system: {
      CodeUpdated: AugmentedEvent<ApiType, []>;
      ExtrinsicFailed: AugmentedEvent<ApiType, [SpRuntimeDispatchError, FrameSupportWeightsDispatchInfo]>;
      ExtrinsicSuccess: AugmentedEvent<ApiType, [FrameSupportWeightsDispatchInfo]>;
      KilledAccount: AugmentedEvent<ApiType, [AccountId32]>;
      NewAccount: AugmentedEvent<ApiType, [AccountId32]>;
      Remarked: AugmentedEvent<ApiType, [AccountId32, H256]>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    technicalCommittee: {
      Approved: AugmentedEvent<ApiType, [H256]>;
      Closed: AugmentedEvent<ApiType, [H256, u32, u32]>;
      Disapproved: AugmentedEvent<ApiType, [H256]>;
      Executed: AugmentedEvent<ApiType, [H256, Result<Null, SpRuntimeDispatchError>]>;
      MemberExecuted: AugmentedEvent<ApiType, [H256, Result<Null, SpRuntimeDispatchError>]>;
      Proposed: AugmentedEvent<ApiType, [AccountId32, u32, H256, u32]>;
      Voted: AugmentedEvent<ApiType, [AccountId32, H256, bool, u32, u32]>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    technicalCommitteeMembership: {
      Dummy: AugmentedEvent<ApiType, []>;
      KeyChanged: AugmentedEvent<ApiType, []>;
      MemberAdded: AugmentedEvent<ApiType, []>;
      MemberRemoved: AugmentedEvent<ApiType, []>;
      MembersReset: AugmentedEvent<ApiType, []>;
      MembersSwapped: AugmentedEvent<ApiType, []>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    tips: {
      NewTip: AugmentedEvent<ApiType, [H256]>;
      TipClosed: AugmentedEvent<ApiType, [H256, AccountId32, u128]>;
      TipClosing: AugmentedEvent<ApiType, [H256]>;
      TipRetracted: AugmentedEvent<ApiType, [H256]>;
      TipSlashed: AugmentedEvent<ApiType, [H256, AccountId32, u128]>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    tokens: {
      BalanceSet: AugmentedEvent<ApiType, [AcalaPrimitivesCurrencyCurrencyId, AccountId32, u128, u128]>;
      Deposited: AugmentedEvent<ApiType, [AcalaPrimitivesCurrencyCurrencyId, AccountId32, u128]>;
      DustLost: AugmentedEvent<ApiType, [AcalaPrimitivesCurrencyCurrencyId, AccountId32, u128]>;
      Endowed: AugmentedEvent<ApiType, [AcalaPrimitivesCurrencyCurrencyId, AccountId32, u128]>;
      LockRemoved: AugmentedEvent<ApiType, [U8aFixed, AcalaPrimitivesCurrencyCurrencyId, AccountId32]>;
      LockSet: AugmentedEvent<ApiType, [U8aFixed, AcalaPrimitivesCurrencyCurrencyId, AccountId32, u128]>;
      Reserved: AugmentedEvent<ApiType, [AcalaPrimitivesCurrencyCurrencyId, AccountId32, u128]>;
      ReserveRepatriated: AugmentedEvent<ApiType, [AcalaPrimitivesCurrencyCurrencyId, AccountId32, AccountId32, u128, FrameSupportTokensMiscBalanceStatus]>;
      Slashed: AugmentedEvent<ApiType, [AcalaPrimitivesCurrencyCurrencyId, AccountId32, u128, u128]>;
      TotalIssuanceSet: AugmentedEvent<ApiType, [AcalaPrimitivesCurrencyCurrencyId, u128]>;
      Transfer: AugmentedEvent<ApiType, [AcalaPrimitivesCurrencyCurrencyId, AccountId32, AccountId32, u128]>;
      Unreserved: AugmentedEvent<ApiType, [AcalaPrimitivesCurrencyCurrencyId, AccountId32, u128]>;
      Withdrawn: AugmentedEvent<ApiType, [AcalaPrimitivesCurrencyCurrencyId, AccountId32, u128]>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    transactionPause: {
      EvmPrecompilePaused: AugmentedEvent<ApiType, [H160]>;
      EvmPrecompileUnpaused: AugmentedEvent<ApiType, [H160]>;
      TransactionPaused: AugmentedEvent<ApiType, [Bytes, Bytes]>;
      TransactionUnpaused: AugmentedEvent<ApiType, [Bytes, Bytes]>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    transactionPayment: {
      ChargeFeePoolDisabled: AugmentedEvent<ApiType, [AcalaPrimitivesCurrencyCurrencyId, u128, u128]>;
      ChargeFeePoolEnabled: AugmentedEvent<ApiType, [AccountId32, AcalaPrimitivesCurrencyCurrencyId, u128, u128, u128]>;
      ChargeFeePoolSwapped: AugmentedEvent<ApiType, [AccountId32, AcalaPrimitivesCurrencyCurrencyId, u128, u128, u128, u128]>;
      TransactionFeePaid: AugmentedEvent<ApiType, [AccountId32, u128, u128, u128]>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    treasury: {
      Awarded: AugmentedEvent<ApiType, [u32, u128, AccountId32]>;
      Burnt: AugmentedEvent<ApiType, [u128]>;
      Deposit: AugmentedEvent<ApiType, [u128]>;
      Proposed: AugmentedEvent<ApiType, [u32]>;
      Rejected: AugmentedEvent<ApiType, [u32, u128]>;
      Rollover: AugmentedEvent<ApiType, [u128]>;
      SpendApproved: AugmentedEvent<ApiType, [u32, u128, AccountId32]>;
      Spending: AugmentedEvent<ApiType, [u128]>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    unknownTokens: {
      Deposited: AugmentedEvent<ApiType, [XcmV1MultiAsset, XcmV1MultiLocation]>;
      Withdrawn: AugmentedEvent<ApiType, [XcmV1MultiAsset, XcmV1MultiLocation]>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    utility: {
      BatchCompleted: AugmentedEvent<ApiType, []>;
      BatchCompletedWithErrors: AugmentedEvent<ApiType, []>;
      BatchInterrupted: AugmentedEvent<ApiType, [u32, SpRuntimeDispatchError]>;
      DispatchedAs: AugmentedEvent<ApiType, [Result<Null, SpRuntimeDispatchError>]>;
      ItemCompleted: AugmentedEvent<ApiType, []>;
      ItemFailed: AugmentedEvent<ApiType, [SpRuntimeDispatchError]>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    vesting: {
      Claimed: AugmentedEvent<ApiType, [AccountId32, u128]>;
      VestingScheduleAdded: AugmentedEvent<ApiType, [AccountId32, AccountId32, OrmlVestingVestingSchedule]>;
      VestingSchedulesUpdated: AugmentedEvent<ApiType, [AccountId32]>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    xcmInterface: {
      XcmDestWeightUpdated: AugmentedEvent<ApiType, [ModuleXcmInterfaceModuleXcmInterfaceOperation, u64]>;
      XcmFeeUpdated: AugmentedEvent<ApiType, [ModuleXcmInterfaceModuleXcmInterfaceOperation, u128]>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    xcmpQueue: {
      BadFormat: AugmentedEvent<ApiType, [Option<H256>]>;
      BadVersion: AugmentedEvent<ApiType, [Option<H256>]>;
      Fail: AugmentedEvent<ApiType, [Option<H256>, XcmV2TraitsError, u64]>;
      OverweightEnqueued: AugmentedEvent<ApiType, [u32, u32, u64, u64]>;
      OverweightServiced: AugmentedEvent<ApiType, [u64, u64]>;
      Success: AugmentedEvent<ApiType, [Option<H256>, u64]>;
      UpwardMessageSent: AugmentedEvent<ApiType, [Option<H256>]>;
      XcmpMessageSent: AugmentedEvent<ApiType, [Option<H256>]>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    xTokens: {
      TransferredMultiAssets: AugmentedEvent<ApiType, [AccountId32, XcmV1MultiassetMultiAssets, XcmV1MultiAsset, XcmV1MultiLocation]>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
  } // AugmentedEvents
} // declare module
