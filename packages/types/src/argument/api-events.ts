// Auto-generated via `yarn polkadot-types-from-chain`, do not edit
/* eslint-disable */

// import type lookup before we augment - in some environments
// this is required to allow for ambient/previous definitions
import '@polkadot/api-base/types/events';

import type { AccountId32, H160, H256 } from '@acala-network/types/interfaces/runtime';
import type { ApiTypes, AugmentedEvent } from '@polkadot/api-base/types';
import type { Bytes, Null, Option, Result, U8aFixed, Vec, bool, i128, i32, u128, u16, u32, u64, u8 } from '@polkadot/types-codec';
import type { ITuple } from '@polkadot/types-codec/types';
import type { AcalaPrimitivesCurrencyAssetIds, AcalaPrimitivesCurrencyAssetMetadata, AcalaPrimitivesCurrencyCurrencyId, AcalaPrimitivesTradingPair, AcalaRuntimeOriginCaller, AcalaRuntimeScheduledTasks, EthereumLog, EvmCoreErrorExitReason, FrameSupportScheduleLookupError, FrameSupportTokensMiscBalanceStatus, FrameSupportWeightsDispatchInfo, ModuleHomaModuleUnlockChunk, ModuleSupportIncentivesPoolId, ModuleXcmInterfaceModuleXcmInterfaceOperation, OrmlVestingVestingSchedule, PalletDemocracyVoteAccountVote, PalletDemocracyVoteThreshold, PalletMultisigTimepoint, RuntimeCommonProxyType, SpRuntimeDispatchError, XcmV1MultiAsset, XcmV1MultiLocation, XcmV1MultiassetMultiAssets, XcmV2Response, XcmV2TraitsError, XcmV2TraitsOutcome, XcmV2Xcm, XcmVersionedMultiAssets, XcmVersionedMultiLocation } from '@polkadot/types/lookup';

export type __AugmentedEvent<ApiType extends ApiTypes> = AugmentedEvent<ApiType>;

declare module '@polkadot/api-base/types/events' {
  interface AugmentedEvents<ApiType extends ApiTypes> {
    acalaOracle: {
      NewFeedData: AugmentedEvent<ApiType, [sender: AccountId32, values: Vec<ITuple<[AcalaPrimitivesCurrencyCurrencyId, u128]>>], { sender: AccountId32, values: Vec<ITuple<[AcalaPrimitivesCurrencyCurrencyId, u128]>> }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    assetRegistry: {
      AssetRegistered: AugmentedEvent<ApiType, [assetId: AcalaPrimitivesCurrencyAssetIds, metadata: AcalaPrimitivesCurrencyAssetMetadata], { assetId: AcalaPrimitivesCurrencyAssetIds, metadata: AcalaPrimitivesCurrencyAssetMetadata }>;
      AssetUpdated: AugmentedEvent<ApiType, [assetId: AcalaPrimitivesCurrencyAssetIds, metadata: AcalaPrimitivesCurrencyAssetMetadata], { assetId: AcalaPrimitivesCurrencyAssetIds, metadata: AcalaPrimitivesCurrencyAssetMetadata }>;
      ForeignAssetRegistered: AugmentedEvent<ApiType, [assetId: u16, assetAddress: XcmV1MultiLocation, metadata: AcalaPrimitivesCurrencyAssetMetadata], { assetId: u16, assetAddress: XcmV1MultiLocation, metadata: AcalaPrimitivesCurrencyAssetMetadata }>;
      ForeignAssetUpdated: AugmentedEvent<ApiType, [assetId: u16, assetAddress: XcmV1MultiLocation, metadata: AcalaPrimitivesCurrencyAssetMetadata], { assetId: u16, assetAddress: XcmV1MultiLocation, metadata: AcalaPrimitivesCurrencyAssetMetadata }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    auction: {
      Bid: AugmentedEvent<ApiType, [auctionId: u32, bidder: AccountId32, amount: u128], { auctionId: u32, bidder: AccountId32, amount: u128 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    auctionManager: {
      CancelAuction: AugmentedEvent<ApiType, [auctionId: u32], { auctionId: u32 }>;
      CollateralAuctionAborted: AugmentedEvent<ApiType, [auctionId: u32, collateralType: AcalaPrimitivesCurrencyCurrencyId, collateralAmount: u128, targetStableAmount: u128, refundRecipient: AccountId32], { auctionId: u32, collateralType: AcalaPrimitivesCurrencyCurrencyId, collateralAmount: u128, targetStableAmount: u128, refundRecipient: AccountId32 }>;
      CollateralAuctionDealt: AugmentedEvent<ApiType, [auctionId: u32, collateralType: AcalaPrimitivesCurrencyCurrencyId, collateralAmount: u128, winner: AccountId32, paymentAmount: u128], { auctionId: u32, collateralType: AcalaPrimitivesCurrencyCurrencyId, collateralAmount: u128, winner: AccountId32, paymentAmount: u128 }>;
      DEXTakeCollateralAuction: AugmentedEvent<ApiType, [auctionId: u32, collateralType: AcalaPrimitivesCurrencyCurrencyId, collateralAmount: u128, supplyCollateralAmount: u128, targetStableAmount: u128], { auctionId: u32, collateralType: AcalaPrimitivesCurrencyCurrencyId, collateralAmount: u128, supplyCollateralAmount: u128, targetStableAmount: u128 }>;
      NewCollateralAuction: AugmentedEvent<ApiType, [auctionId: u32, collateralType: AcalaPrimitivesCurrencyCurrencyId, collateralAmount: u128, targetBidPrice: u128], { auctionId: u32, collateralType: AcalaPrimitivesCurrencyCurrencyId, collateralAmount: u128, targetBidPrice: u128 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    authority: {
      AuthorizedCall: AugmentedEvent<ApiType, [hash_: H256, caller: Option<AccountId32>], { hash_: H256, caller: Option<AccountId32> }>;
      Cancelled: AugmentedEvent<ApiType, [origin: AcalaRuntimeOriginCaller, index: u32], { origin: AcalaRuntimeOriginCaller, index: u32 }>;
      Delayed: AugmentedEvent<ApiType, [origin: AcalaRuntimeOriginCaller, index: u32, when: u32], { origin: AcalaRuntimeOriginCaller, index: u32, when: u32 }>;
      Dispatched: AugmentedEvent<ApiType, [result: Result<Null, SpRuntimeDispatchError>], { result: Result<Null, SpRuntimeDispatchError> }>;
      FastTracked: AugmentedEvent<ApiType, [origin: AcalaRuntimeOriginCaller, index: u32, when: u32], { origin: AcalaRuntimeOriginCaller, index: u32, when: u32 }>;
      RemovedAuthorizedCall: AugmentedEvent<ApiType, [hash_: H256], { hash_: H256 }>;
      Scheduled: AugmentedEvent<ApiType, [origin: AcalaRuntimeOriginCaller, index: u32], { origin: AcalaRuntimeOriginCaller, index: u32 }>;
      TriggeredCallBy: AugmentedEvent<ApiType, [hash_: H256, caller: AccountId32], { hash_: H256, caller: AccountId32 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    balances: {
      BalanceSet: AugmentedEvent<ApiType, [who: AccountId32, free: u128, reserved: u128], { who: AccountId32, free: u128, reserved: u128 }>;
      Deposit: AugmentedEvent<ApiType, [who: AccountId32, amount: u128], { who: AccountId32, amount: u128 }>;
      DustLost: AugmentedEvent<ApiType, [account: AccountId32, amount: u128], { account: AccountId32, amount: u128 }>;
      Endowed: AugmentedEvent<ApiType, [account: AccountId32, freeBalance: u128], { account: AccountId32, freeBalance: u128 }>;
      Reserved: AugmentedEvent<ApiType, [who: AccountId32, amount: u128], { who: AccountId32, amount: u128 }>;
      ReserveRepatriated: AugmentedEvent<ApiType, [from: AccountId32, to: AccountId32, amount: u128, destinationStatus: FrameSupportTokensMiscBalanceStatus], { from: AccountId32, to: AccountId32, amount: u128, destinationStatus: FrameSupportTokensMiscBalanceStatus }>;
      Slashed: AugmentedEvent<ApiType, [who: AccountId32, amount: u128], { who: AccountId32, amount: u128 }>;
      Transfer: AugmentedEvent<ApiType, [from: AccountId32, to: AccountId32, amount: u128], { from: AccountId32, to: AccountId32, amount: u128 }>;
      Unreserved: AugmentedEvent<ApiType, [who: AccountId32, amount: u128], { who: AccountId32, amount: u128 }>;
      Withdraw: AugmentedEvent<ApiType, [who: AccountId32, amount: u128], { who: AccountId32, amount: u128 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    bounties: {
      BountyAwarded: AugmentedEvent<ApiType, [index: u32, beneficiary: AccountId32], { index: u32, beneficiary: AccountId32 }>;
      BountyBecameActive: AugmentedEvent<ApiType, [index: u32], { index: u32 }>;
      BountyCanceled: AugmentedEvent<ApiType, [index: u32], { index: u32 }>;
      BountyClaimed: AugmentedEvent<ApiType, [index: u32, payout: u128, beneficiary: AccountId32], { index: u32, payout: u128, beneficiary: AccountId32 }>;
      BountyExtended: AugmentedEvent<ApiType, [index: u32], { index: u32 }>;
      BountyProposed: AugmentedEvent<ApiType, [index: u32], { index: u32 }>;
      BountyRejected: AugmentedEvent<ApiType, [index: u32, bond: u128], { index: u32, bond: u128 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    cdpEngine: {
      CloseCDPInDebitByDEX: AugmentedEvent<ApiType, [collateralType: AcalaPrimitivesCurrencyCurrencyId, owner: AccountId32, soldCollateralAmount: u128, refundCollateralAmount: u128, debitValue: u128], { collateralType: AcalaPrimitivesCurrencyCurrencyId, owner: AccountId32, soldCollateralAmount: u128, refundCollateralAmount: u128, debitValue: u128 }>;
      InterestRatePerSecUpdated: AugmentedEvent<ApiType, [collateralType: AcalaPrimitivesCurrencyCurrencyId, newInterestRatePerSec: Option<u128>], { collateralType: AcalaPrimitivesCurrencyCurrencyId, newInterestRatePerSec: Option<u128> }>;
      LiquidateUnsafeCDP: AugmentedEvent<ApiType, [collateralType: AcalaPrimitivesCurrencyCurrencyId, owner: AccountId32, collateralAmount: u128, badDebtValue: u128, targetAmount: u128], { collateralType: AcalaPrimitivesCurrencyCurrencyId, owner: AccountId32, collateralAmount: u128, badDebtValue: u128, targetAmount: u128 }>;
      LiquidationContractDeregistered: AugmentedEvent<ApiType, [address: H160], { address: H160 }>;
      LiquidationContractRegistered: AugmentedEvent<ApiType, [address: H160], { address: H160 }>;
      LiquidationPenaltyUpdated: AugmentedEvent<ApiType, [collateralType: AcalaPrimitivesCurrencyCurrencyId, newLiquidationPenalty: Option<u128>], { collateralType: AcalaPrimitivesCurrencyCurrencyId, newLiquidationPenalty: Option<u128> }>;
      LiquidationRatioUpdated: AugmentedEvent<ApiType, [collateralType: AcalaPrimitivesCurrencyCurrencyId, newLiquidationRatio: Option<u128>], { collateralType: AcalaPrimitivesCurrencyCurrencyId, newLiquidationRatio: Option<u128> }>;
      MaximumTotalDebitValueUpdated: AugmentedEvent<ApiType, [collateralType: AcalaPrimitivesCurrencyCurrencyId, newTotalDebitValue: u128], { collateralType: AcalaPrimitivesCurrencyCurrencyId, newTotalDebitValue: u128 }>;
      RequiredCollateralRatioUpdated: AugmentedEvent<ApiType, [collateralType: AcalaPrimitivesCurrencyCurrencyId, newRequiredCollateralRatio: Option<u128>], { collateralType: AcalaPrimitivesCurrencyCurrencyId, newRequiredCollateralRatio: Option<u128> }>;
      SettleCDPInDebit: AugmentedEvent<ApiType, [collateralType: AcalaPrimitivesCurrencyCurrencyId, owner: AccountId32], { collateralType: AcalaPrimitivesCurrencyCurrencyId, owner: AccountId32 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    cdpTreasury: {
      ExpectedCollateralAuctionSizeUpdated: AugmentedEvent<ApiType, [collateralType: AcalaPrimitivesCurrencyCurrencyId, newSize: u128], { collateralType: AcalaPrimitivesCurrencyCurrencyId, newSize: u128 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    collatorSelection: {
      CandidateAdded: AugmentedEvent<ApiType, [who: AccountId32, bond: u128], { who: AccountId32, bond: u128 }>;
      CandidateRemoved: AugmentedEvent<ApiType, [who: AccountId32], { who: AccountId32 }>;
      NewCandidacyBond: AugmentedEvent<ApiType, [newCandidacyBond: u128], { newCandidacyBond: u128 }>;
      NewDesiredCandidates: AugmentedEvent<ApiType, [newDesiredCandidates: u32], { newDesiredCandidates: u32 }>;
      NewInvulnerables: AugmentedEvent<ApiType, [newInvulnerables: Vec<AccountId32>], { newInvulnerables: Vec<AccountId32> }>;
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
      Deposited: AugmentedEvent<ApiType, [currencyId: AcalaPrimitivesCurrencyCurrencyId, who: AccountId32, amount: u128], { currencyId: AcalaPrimitivesCurrencyCurrencyId, who: AccountId32, amount: u128 }>;
      DustSwept: AugmentedEvent<ApiType, [currencyId: AcalaPrimitivesCurrencyCurrencyId, who: AccountId32, amount: u128], { currencyId: AcalaPrimitivesCurrencyCurrencyId, who: AccountId32, amount: u128 }>;
      Transferred: AugmentedEvent<ApiType, [currencyId: AcalaPrimitivesCurrencyCurrencyId, from: AccountId32, to: AccountId32, amount: u128], { currencyId: AcalaPrimitivesCurrencyCurrencyId, from: AccountId32, to: AccountId32, amount: u128 }>;
      Withdrawn: AugmentedEvent<ApiType, [currencyId: AcalaPrimitivesCurrencyCurrencyId, who: AccountId32, amount: u128], { currencyId: AcalaPrimitivesCurrencyCurrencyId, who: AccountId32, amount: u128 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    democracy: {
      Blacklisted: AugmentedEvent<ApiType, [proposalHash: H256], { proposalHash: H256 }>;
      Cancelled: AugmentedEvent<ApiType, [refIndex: u32], { refIndex: u32 }>;
      Delegated: AugmentedEvent<ApiType, [who: AccountId32, target: AccountId32], { who: AccountId32, target: AccountId32 }>;
      Executed: AugmentedEvent<ApiType, [refIndex: u32, result: Result<Null, SpRuntimeDispatchError>], { refIndex: u32, result: Result<Null, SpRuntimeDispatchError> }>;
      ExternalTabled: AugmentedEvent<ApiType, []>;
      NotPassed: AugmentedEvent<ApiType, [refIndex: u32], { refIndex: u32 }>;
      Passed: AugmentedEvent<ApiType, [refIndex: u32], { refIndex: u32 }>;
      PreimageInvalid: AugmentedEvent<ApiType, [proposalHash: H256, refIndex: u32], { proposalHash: H256, refIndex: u32 }>;
      PreimageMissing: AugmentedEvent<ApiType, [proposalHash: H256, refIndex: u32], { proposalHash: H256, refIndex: u32 }>;
      PreimageNoted: AugmentedEvent<ApiType, [proposalHash: H256, who: AccountId32, deposit: u128], { proposalHash: H256, who: AccountId32, deposit: u128 }>;
      PreimageReaped: AugmentedEvent<ApiType, [proposalHash: H256, provider: AccountId32, deposit: u128, reaper: AccountId32], { proposalHash: H256, provider: AccountId32, deposit: u128, reaper: AccountId32 }>;
      PreimageUsed: AugmentedEvent<ApiType, [proposalHash: H256, provider: AccountId32, deposit: u128], { proposalHash: H256, provider: AccountId32, deposit: u128 }>;
      ProposalCanceled: AugmentedEvent<ApiType, [propIndex: u32], { propIndex: u32 }>;
      Proposed: AugmentedEvent<ApiType, [proposalIndex: u32, deposit: u128], { proposalIndex: u32, deposit: u128 }>;
      Seconded: AugmentedEvent<ApiType, [seconder: AccountId32, propIndex: u32], { seconder: AccountId32, propIndex: u32 }>;
      Started: AugmentedEvent<ApiType, [refIndex: u32, threshold: PalletDemocracyVoteThreshold], { refIndex: u32, threshold: PalletDemocracyVoteThreshold }>;
      Tabled: AugmentedEvent<ApiType, [proposalIndex: u32, deposit: u128, depositors: Vec<AccountId32>], { proposalIndex: u32, deposit: u128, depositors: Vec<AccountId32> }>;
      Undelegated: AugmentedEvent<ApiType, [account: AccountId32], { account: AccountId32 }>;
      Vetoed: AugmentedEvent<ApiType, [who: AccountId32, proposalHash: H256, until: u32], { who: AccountId32, proposalHash: H256, until: u32 }>;
      Voted: AugmentedEvent<ApiType, [voter: AccountId32, refIndex: u32, vote: PalletDemocracyVoteAccountVote], { voter: AccountId32, refIndex: u32, vote: PalletDemocracyVoteAccountVote }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    dex: {
      AddLiquidity: AugmentedEvent<ApiType, [who: AccountId32, currency0: AcalaPrimitivesCurrencyCurrencyId, pool0: u128, currency1: AcalaPrimitivesCurrencyCurrencyId, pool1: u128, shareIncrement: u128], { who: AccountId32, currency0: AcalaPrimitivesCurrencyCurrencyId, pool0: u128, currency1: AcalaPrimitivesCurrencyCurrencyId, pool1: u128, shareIncrement: u128 }>;
      AddProvision: AugmentedEvent<ApiType, [who: AccountId32, currency0: AcalaPrimitivesCurrencyCurrencyId, contribution0: u128, currency1: AcalaPrimitivesCurrencyCurrencyId, contribution1: u128], { who: AccountId32, currency0: AcalaPrimitivesCurrencyCurrencyId, contribution0: u128, currency1: AcalaPrimitivesCurrencyCurrencyId, contribution1: u128 }>;
      DisableTradingPair: AugmentedEvent<ApiType, [tradingPair: AcalaPrimitivesTradingPair], { tradingPair: AcalaPrimitivesTradingPair }>;
      EnableTradingPair: AugmentedEvent<ApiType, [tradingPair: AcalaPrimitivesTradingPair], { tradingPair: AcalaPrimitivesTradingPair }>;
      ListProvisioning: AugmentedEvent<ApiType, [tradingPair: AcalaPrimitivesTradingPair], { tradingPair: AcalaPrimitivesTradingPair }>;
      ProvisioningAborted: AugmentedEvent<ApiType, [tradingPair: AcalaPrimitivesTradingPair, accumulatedProvision0: u128, accumulatedProvision1: u128], { tradingPair: AcalaPrimitivesTradingPair, accumulatedProvision0: u128, accumulatedProvision1: u128 }>;
      ProvisioningToEnabled: AugmentedEvent<ApiType, [tradingPair: AcalaPrimitivesTradingPair, pool0: u128, pool1: u128, shareAmount: u128], { tradingPair: AcalaPrimitivesTradingPair, pool0: u128, pool1: u128, shareAmount: u128 }>;
      RefundProvision: AugmentedEvent<ApiType, [who: AccountId32, currency0: AcalaPrimitivesCurrencyCurrencyId, contribution0: u128, currency1: AcalaPrimitivesCurrencyCurrencyId, contribution1: u128], { who: AccountId32, currency0: AcalaPrimitivesCurrencyCurrencyId, contribution0: u128, currency1: AcalaPrimitivesCurrencyCurrencyId, contribution1: u128 }>;
      RemoveLiquidity: AugmentedEvent<ApiType, [who: AccountId32, currency0: AcalaPrimitivesCurrencyCurrencyId, pool0: u128, currency1: AcalaPrimitivesCurrencyCurrencyId, pool1: u128, shareDecrement: u128], { who: AccountId32, currency0: AcalaPrimitivesCurrencyCurrencyId, pool0: u128, currency1: AcalaPrimitivesCurrencyCurrencyId, pool1: u128, shareDecrement: u128 }>;
      Swap: AugmentedEvent<ApiType, [trader: AccountId32, path: Vec<AcalaPrimitivesCurrencyCurrencyId>, liquidityChanges: Vec<u128>], { trader: AccountId32, path: Vec<AcalaPrimitivesCurrencyCurrencyId>, liquidityChanges: Vec<u128> }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    dmpQueue: {
      ExecutedDownward: AugmentedEvent<ApiType, [messageId: U8aFixed, outcome: XcmV2TraitsOutcome], { messageId: U8aFixed, outcome: XcmV2TraitsOutcome }>;
      InvalidFormat: AugmentedEvent<ApiType, [messageId: U8aFixed], { messageId: U8aFixed }>;
      OverweightEnqueued: AugmentedEvent<ApiType, [messageId: U8aFixed, overweightIndex: u64, requiredWeight: u64], { messageId: U8aFixed, overweightIndex: u64, requiredWeight: u64 }>;
      OverweightServiced: AugmentedEvent<ApiType, [overweightIndex: u64, weightUsed: u64], { overweightIndex: u64, weightUsed: u64 }>;
      UnsupportedVersion: AugmentedEvent<ApiType, [messageId: U8aFixed], { messageId: U8aFixed }>;
      WeightExhausted: AugmentedEvent<ApiType, [messageId: U8aFixed, remainingWeight: u64, requiredWeight: u64], { messageId: U8aFixed, remainingWeight: u64, requiredWeight: u64 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    emergencyShutdown: {
      OpenRefund: AugmentedEvent<ApiType, [blockNumber: u32], { blockNumber: u32 }>;
      Refund: AugmentedEvent<ApiType, [who: AccountId32, stableCoinAmount: u128, refundList: Vec<ITuple<[AcalaPrimitivesCurrencyCurrencyId, u128]>>], { who: AccountId32, stableCoinAmount: u128, refundList: Vec<ITuple<[AcalaPrimitivesCurrencyCurrencyId, u128]>> }>;
      Shutdown: AugmentedEvent<ApiType, [blockNumber: u32], { blockNumber: u32 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    evm: {
      ContractDevelopmentDisabled: AugmentedEvent<ApiType, [who: AccountId32], { who: AccountId32 }>;
      ContractDevelopmentEnabled: AugmentedEvent<ApiType, [who: AccountId32], { who: AccountId32 }>;
      ContractPublished: AugmentedEvent<ApiType, [contract: H160], { contract: H160 }>;
      ContractSelfdestructed: AugmentedEvent<ApiType, [contract: H160], { contract: H160 }>;
      ContractSetCode: AugmentedEvent<ApiType, [contract: H160], { contract: H160 }>;
      Created: AugmentedEvent<ApiType, [from: H160, contract: H160, logs: Vec<EthereumLog>, usedGas: u64, usedStorage: i32], { from: H160, contract: H160, logs: Vec<EthereumLog>, usedGas: u64, usedStorage: i32 }>;
      CreatedFailed: AugmentedEvent<ApiType, [from: H160, contract: H160, exitReason: EvmCoreErrorExitReason, logs: Vec<EthereumLog>, usedGas: u64, usedStorage: i32], { from: H160, contract: H160, exitReason: EvmCoreErrorExitReason, logs: Vec<EthereumLog>, usedGas: u64, usedStorage: i32 }>;
      Executed: AugmentedEvent<ApiType, [from: H160, contract: H160, logs: Vec<EthereumLog>, usedGas: u64, usedStorage: i32], { from: H160, contract: H160, logs: Vec<EthereumLog>, usedGas: u64, usedStorage: i32 }>;
      ExecutedFailed: AugmentedEvent<ApiType, [from: H160, contract: H160, exitReason: EvmCoreErrorExitReason, output: Bytes, logs: Vec<EthereumLog>, usedGas: u64, usedStorage: i32], { from: H160, contract: H160, exitReason: EvmCoreErrorExitReason, output: Bytes, logs: Vec<EthereumLog>, usedGas: u64, usedStorage: i32 }>;
      TransferredMaintainer: AugmentedEvent<ApiType, [contract: H160, newMaintainer: H160], { contract: H160, newMaintainer: H160 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    evmAccounts: {
      ClaimAccount: AugmentedEvent<ApiType, [accountId: AccountId32, evmAddress: H160], { accountId: AccountId32, evmAddress: H160 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    financialCouncil: {
      Approved: AugmentedEvent<ApiType, [proposalHash: H256], { proposalHash: H256 }>;
      Closed: AugmentedEvent<ApiType, [proposalHash: H256, yes: u32, no: u32], { proposalHash: H256, yes: u32, no: u32 }>;
      Disapproved: AugmentedEvent<ApiType, [proposalHash: H256], { proposalHash: H256 }>;
      Executed: AugmentedEvent<ApiType, [proposalHash: H256, result: Result<Null, SpRuntimeDispatchError>], { proposalHash: H256, result: Result<Null, SpRuntimeDispatchError> }>;
      MemberExecuted: AugmentedEvent<ApiType, [proposalHash: H256, result: Result<Null, SpRuntimeDispatchError>], { proposalHash: H256, result: Result<Null, SpRuntimeDispatchError> }>;
      Proposed: AugmentedEvent<ApiType, [account: AccountId32, proposalIndex: u32, proposalHash: H256, threshold: u32], { account: AccountId32, proposalIndex: u32, proposalHash: H256, threshold: u32 }>;
      Voted: AugmentedEvent<ApiType, [account: AccountId32, proposalHash: H256, voted: bool, yes: u32, no: u32], { account: AccountId32, proposalHash: H256, voted: bool, yes: u32, no: u32 }>;
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
      Approved: AugmentedEvent<ApiType, [proposalHash: H256], { proposalHash: H256 }>;
      Closed: AugmentedEvent<ApiType, [proposalHash: H256, yes: u32, no: u32], { proposalHash: H256, yes: u32, no: u32 }>;
      Disapproved: AugmentedEvent<ApiType, [proposalHash: H256], { proposalHash: H256 }>;
      Executed: AugmentedEvent<ApiType, [proposalHash: H256, result: Result<Null, SpRuntimeDispatchError>], { proposalHash: H256, result: Result<Null, SpRuntimeDispatchError> }>;
      MemberExecuted: AugmentedEvent<ApiType, [proposalHash: H256, result: Result<Null, SpRuntimeDispatchError>], { proposalHash: H256, result: Result<Null, SpRuntimeDispatchError> }>;
      Proposed: AugmentedEvent<ApiType, [account: AccountId32, proposalIndex: u32, proposalHash: H256, threshold: u32], { account: AccountId32, proposalIndex: u32, proposalHash: H256, threshold: u32 }>;
      Voted: AugmentedEvent<ApiType, [account: AccountId32, proposalHash: H256, voted: bool, yes: u32, no: u32], { account: AccountId32, proposalHash: H256, voted: bool, yes: u32, no: u32 }>;
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
      BumpEraFrequencyUpdated: AugmentedEvent<ApiType, [frequency: u32], { frequency: u32 }>;
      CommissionRateUpdated: AugmentedEvent<ApiType, [commissionRate: u128], { commissionRate: u128 }>;
      CurrentEraBumped: AugmentedEvent<ApiType, [newEraIndex: u32], { newEraIndex: u32 }>;
      CurrentEraReset: AugmentedEvent<ApiType, [newEraIndex: u32], { newEraIndex: u32 }>;
      EstimatedRewardRatePerEraUpdated: AugmentedEvent<ApiType, [rewardRate: u128], { rewardRate: u128 }>;
      FastMatchFeeRateUpdated: AugmentedEvent<ApiType, [fastMatchFeeRate: u128], { fastMatchFeeRate: u128 }>;
      LastEraBumpedBlockUpdated: AugmentedEvent<ApiType, [lastEraBumpedBlock: u32], { lastEraBumpedBlock: u32 }>;
      LedgerBondedReset: AugmentedEvent<ApiType, [subAccountIndex: u16, newBondedAmount: u128], { subAccountIndex: u16, newBondedAmount: u128 }>;
      LedgerUnlockingReset: AugmentedEvent<ApiType, [subAccountIndex: u16, newUnlocking: Vec<ModuleHomaModuleUnlockChunk>], { subAccountIndex: u16, newUnlocking: Vec<ModuleHomaModuleUnlockChunk> }>;
      Minted: AugmentedEvent<ApiType, [minter: AccountId32, stakingCurrencyAmount: u128, liquidAmountReceived: u128, liquidAmountAddedToVoid: u128], { minter: AccountId32, stakingCurrencyAmount: u128, liquidAmountReceived: u128, liquidAmountAddedToVoid: u128 }>;
      RedeemedByFastMatch: AugmentedEvent<ApiType, [redeemer: AccountId32, matchedLiquidAmount: u128, feeInLiquid: u128, redeemedStakingAmount: u128], { redeemer: AccountId32, matchedLiquidAmount: u128, feeInLiquid: u128, redeemedStakingAmount: u128 }>;
      RedeemedByUnbond: AugmentedEvent<ApiType, [redeemer: AccountId32, eraIndexWhenUnbond: u32, liquidAmount: u128, unbondingStakingAmount: u128], { redeemer: AccountId32, eraIndexWhenUnbond: u32, liquidAmount: u128, unbondingStakingAmount: u128 }>;
      RedeemRequestCancelled: AugmentedEvent<ApiType, [redeemer: AccountId32, cancelledLiquidAmount: u128], { redeemer: AccountId32, cancelledLiquidAmount: u128 }>;
      RequestedRedeem: AugmentedEvent<ApiType, [redeemer: AccountId32, liquidAmount: u128, allowFastMatch: bool], { redeemer: AccountId32, liquidAmount: u128, allowFastMatch: bool }>;
      SoftBondedCapPerSubAccountUpdated: AugmentedEvent<ApiType, [capAmount: u128], { capAmount: u128 }>;
      WithdrawRedemption: AugmentedEvent<ApiType, [redeemer: AccountId32, redemptionAmount: u128], { redeemer: AccountId32, redemptionAmount: u128 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    homaCouncil: {
      Approved: AugmentedEvent<ApiType, [proposalHash: H256], { proposalHash: H256 }>;
      Closed: AugmentedEvent<ApiType, [proposalHash: H256, yes: u32, no: u32], { proposalHash: H256, yes: u32, no: u32 }>;
      Disapproved: AugmentedEvent<ApiType, [proposalHash: H256], { proposalHash: H256 }>;
      Executed: AugmentedEvent<ApiType, [proposalHash: H256, result: Result<Null, SpRuntimeDispatchError>], { proposalHash: H256, result: Result<Null, SpRuntimeDispatchError> }>;
      MemberExecuted: AugmentedEvent<ApiType, [proposalHash: H256, result: Result<Null, SpRuntimeDispatchError>], { proposalHash: H256, result: Result<Null, SpRuntimeDispatchError> }>;
      Proposed: AugmentedEvent<ApiType, [account: AccountId32, proposalIndex: u32, proposalHash: H256, threshold: u32], { account: AccountId32, proposalIndex: u32, proposalHash: H256, threshold: u32 }>;
      Voted: AugmentedEvent<ApiType, [account: AccountId32, proposalHash: H256, voted: bool, yes: u32, no: u32], { account: AccountId32, proposalHash: H256, voted: bool, yes: u32, no: u32 }>;
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
      Authorization: AugmentedEvent<ApiType, [authorizer: AccountId32, authorizee: AccountId32, collateralType: AcalaPrimitivesCurrencyCurrencyId], { authorizer: AccountId32, authorizee: AccountId32, collateralType: AcalaPrimitivesCurrencyCurrencyId }>;
      TransferDebit: AugmentedEvent<ApiType, [fromCurrency: AcalaPrimitivesCurrencyCurrencyId, toCurrency: AcalaPrimitivesCurrencyCurrencyId, amount: u128], { fromCurrency: AcalaPrimitivesCurrencyCurrencyId, toCurrency: AcalaPrimitivesCurrencyCurrencyId, amount: u128 }>;
      UnAuthorization: AugmentedEvent<ApiType, [authorizer: AccountId32, authorizee: AccountId32, collateralType: AcalaPrimitivesCurrencyCurrencyId], { authorizer: AccountId32, authorizee: AccountId32, collateralType: AcalaPrimitivesCurrencyCurrencyId }>;
      UnAuthorizationAll: AugmentedEvent<ApiType, [authorizer: AccountId32], { authorizer: AccountId32 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    idleScheduler: {
      TaskAdded: AugmentedEvent<ApiType, [taskId: u32, task: AcalaRuntimeScheduledTasks], { taskId: u32, task: AcalaRuntimeScheduledTasks }>;
      TaskDispatched: AugmentedEvent<ApiType, [taskId: u32, result: Result<Null, SpRuntimeDispatchError>], { taskId: u32, result: Result<Null, SpRuntimeDispatchError> }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    incentives: {
      ClaimRewardDeductionRateUpdated: AugmentedEvent<ApiType, [pool: ModuleSupportIncentivesPoolId, deductionRate: u128], { pool: ModuleSupportIncentivesPoolId, deductionRate: u128 }>;
      ClaimRewards: AugmentedEvent<ApiType, [who: AccountId32, pool: ModuleSupportIncentivesPoolId, rewardCurrencyId: AcalaPrimitivesCurrencyCurrencyId, actualAmount: u128, deductionAmount: u128], { who: AccountId32, pool: ModuleSupportIncentivesPoolId, rewardCurrencyId: AcalaPrimitivesCurrencyCurrencyId, actualAmount: u128, deductionAmount: u128 }>;
      DepositDexShare: AugmentedEvent<ApiType, [who: AccountId32, dexShareType: AcalaPrimitivesCurrencyCurrencyId, deposit: u128], { who: AccountId32, dexShareType: AcalaPrimitivesCurrencyCurrencyId, deposit: u128 }>;
      IncentiveRewardAmountUpdated: AugmentedEvent<ApiType, [pool: ModuleSupportIncentivesPoolId, rewardCurrencyId: AcalaPrimitivesCurrencyCurrencyId, rewardAmountPerPeriod: u128], { pool: ModuleSupportIncentivesPoolId, rewardCurrencyId: AcalaPrimitivesCurrencyCurrencyId, rewardAmountPerPeriod: u128 }>;
      WithdrawDexShare: AugmentedEvent<ApiType, [who: AccountId32, dexShareType: AcalaPrimitivesCurrencyCurrencyId, withdraw: u128], { who: AccountId32, dexShareType: AcalaPrimitivesCurrencyCurrencyId, withdraw: u128 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    loans: {
      ConfiscateCollateralAndDebit: AugmentedEvent<ApiType, [owner: AccountId32, collateralType: AcalaPrimitivesCurrencyCurrencyId, confiscatedCollateralAmount: u128, deductDebitAmount: u128], { owner: AccountId32, collateralType: AcalaPrimitivesCurrencyCurrencyId, confiscatedCollateralAmount: u128, deductDebitAmount: u128 }>;
      PositionUpdated: AugmentedEvent<ApiType, [owner: AccountId32, collateralType: AcalaPrimitivesCurrencyCurrencyId, collateralAdjustment: i128, debitAdjustment: i128], { owner: AccountId32, collateralType: AcalaPrimitivesCurrencyCurrencyId, collateralAdjustment: i128, debitAdjustment: i128 }>;
      TransferLoan: AugmentedEvent<ApiType, [from: AccountId32, to: AccountId32, currencyId: AcalaPrimitivesCurrencyCurrencyId], { from: AccountId32, to: AccountId32, currencyId: AcalaPrimitivesCurrencyCurrencyId }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    multisig: {
      MultisigApproval: AugmentedEvent<ApiType, [approving: AccountId32, timepoint: PalletMultisigTimepoint, multisig: AccountId32, callHash: U8aFixed], { approving: AccountId32, timepoint: PalletMultisigTimepoint, multisig: AccountId32, callHash: U8aFixed }>;
      MultisigCancelled: AugmentedEvent<ApiType, [cancelling: AccountId32, timepoint: PalletMultisigTimepoint, multisig: AccountId32, callHash: U8aFixed], { cancelling: AccountId32, timepoint: PalletMultisigTimepoint, multisig: AccountId32, callHash: U8aFixed }>;
      MultisigExecuted: AugmentedEvent<ApiType, [approving: AccountId32, timepoint: PalletMultisigTimepoint, multisig: AccountId32, callHash: U8aFixed, result: Result<Null, SpRuntimeDispatchError>], { approving: AccountId32, timepoint: PalletMultisigTimepoint, multisig: AccountId32, callHash: U8aFixed, result: Result<Null, SpRuntimeDispatchError> }>;
      NewMultisig: AugmentedEvent<ApiType, [approving: AccountId32, multisig: AccountId32, callHash: U8aFixed], { approving: AccountId32, multisig: AccountId32, callHash: U8aFixed }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    nft: {
      BurnedToken: AugmentedEvent<ApiType, [owner: AccountId32, classId: u32, tokenId: u64], { owner: AccountId32, classId: u32, tokenId: u64 }>;
      BurnedTokenWithRemark: AugmentedEvent<ApiType, [owner: AccountId32, classId: u32, tokenId: u64, remarkHash: H256], { owner: AccountId32, classId: u32, tokenId: u64, remarkHash: H256 }>;
      CreatedClass: AugmentedEvent<ApiType, [owner: AccountId32, classId: u32], { owner: AccountId32, classId: u32 }>;
      DestroyedClass: AugmentedEvent<ApiType, [owner: AccountId32, classId: u32], { owner: AccountId32, classId: u32 }>;
      MintedToken: AugmentedEvent<ApiType, [from: AccountId32, to: AccountId32, classId: u32, quantity: u32], { from: AccountId32, to: AccountId32, classId: u32, quantity: u32 }>;
      TransferredToken: AugmentedEvent<ApiType, [from: AccountId32, to: AccountId32, classId: u32, tokenId: u64], { from: AccountId32, to: AccountId32, classId: u32, tokenId: u64 }>;
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
      Sent: AugmentedEvent<ApiType, [to: XcmV1MultiLocation, message: XcmV2Xcm], { to: XcmV1MultiLocation, message: XcmV2Xcm }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    parachainSystem: {
      DownwardMessagesProcessed: AugmentedEvent<ApiType, [weightUsed: u64, dmqHead: H256], { weightUsed: u64, dmqHead: H256 }>;
      DownwardMessagesReceived: AugmentedEvent<ApiType, [count: u32], { count: u32 }>;
      UpgradeAuthorized: AugmentedEvent<ApiType, [codeHash: H256], { codeHash: H256 }>;
      ValidationFunctionApplied: AugmentedEvent<ApiType, [relayChainBlockNum: u32], { relayChainBlockNum: u32 }>;
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
      Cleared: AugmentedEvent<ApiType, [hash_: H256], { hash_: H256 }>;
      Noted: AugmentedEvent<ApiType, [hash_: H256], { hash_: H256 }>;
      Requested: AugmentedEvent<ApiType, [hash_: H256], { hash_: H256 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    prices: {
      LockPrice: AugmentedEvent<ApiType, [currencyId: AcalaPrimitivesCurrencyCurrencyId, lockedPrice: u128], { currencyId: AcalaPrimitivesCurrencyCurrencyId, lockedPrice: u128 }>;
      UnlockPrice: AugmentedEvent<ApiType, [currencyId: AcalaPrimitivesCurrencyCurrencyId], { currencyId: AcalaPrimitivesCurrencyCurrencyId }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    proxy: {
      Announced: AugmentedEvent<ApiType, [real: AccountId32, proxy: AccountId32, callHash: H256], { real: AccountId32, proxy: AccountId32, callHash: H256 }>;
      AnonymousCreated: AugmentedEvent<ApiType, [anonymous: AccountId32, who: AccountId32, proxyType: RuntimeCommonProxyType, disambiguationIndex: u16], { anonymous: AccountId32, who: AccountId32, proxyType: RuntimeCommonProxyType, disambiguationIndex: u16 }>;
      ProxyAdded: AugmentedEvent<ApiType, [delegator: AccountId32, delegatee: AccountId32, proxyType: RuntimeCommonProxyType, delay: u32], { delegator: AccountId32, delegatee: AccountId32, proxyType: RuntimeCommonProxyType, delay: u32 }>;
      ProxyExecuted: AugmentedEvent<ApiType, [result: Result<Null, SpRuntimeDispatchError>], { result: Result<Null, SpRuntimeDispatchError> }>;
      ProxyRemoved: AugmentedEvent<ApiType, [delegator: AccountId32, delegatee: AccountId32, proxyType: RuntimeCommonProxyType, delay: u32], { delegator: AccountId32, delegatee: AccountId32, proxyType: RuntimeCommonProxyType, delay: u32 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    scheduler: {
      CallLookupFailed: AugmentedEvent<ApiType, [task: ITuple<[u32, u32]>, id: Option<Bytes>, error: FrameSupportScheduleLookupError], { task: ITuple<[u32, u32]>, id: Option<Bytes>, error: FrameSupportScheduleLookupError }>;
      Canceled: AugmentedEvent<ApiType, [when: u32, index: u32], { when: u32, index: u32 }>;
      Dispatched: AugmentedEvent<ApiType, [task: ITuple<[u32, u32]>, id: Option<Bytes>, result: Result<Null, SpRuntimeDispatchError>], { task: ITuple<[u32, u32]>, id: Option<Bytes>, result: Result<Null, SpRuntimeDispatchError> }>;
      Scheduled: AugmentedEvent<ApiType, [when: u32, index: u32], { when: u32, index: u32 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    session: {
      NewSession: AugmentedEvent<ApiType, [sessionIndex: u32], { sessionIndex: u32 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    sessionManager: {
      ScheduledSessionDuration: AugmentedEvent<ApiType, [blockNumber: u32, sessionIndex: u32, sessionDuration: u32], { blockNumber: u32, sessionIndex: u32, sessionDuration: u32 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    stableAsset: {
      AModified: AugmentedEvent<ApiType, [poolId: u32, value: u128, time: u32], { poolId: u32, value: u128, time: u32 }>;
      BalanceUpdated: AugmentedEvent<ApiType, [poolId: u32, oldBalances: Vec<u128>, newBalances: Vec<u128>], { poolId: u32, oldBalances: Vec<u128>, newBalances: Vec<u128> }>;
      CreatePool: AugmentedEvent<ApiType, [poolId: u32, a: u128, swapId: AccountId32, palletId: AccountId32], { poolId: u32, a: u128, swapId: AccountId32, palletId: AccountId32 }>;
      FeeCollected: AugmentedEvent<ApiType, [poolId: u32, a: u128, oldBalances: Vec<u128>, newBalances: Vec<u128>, oldTotalSupply: u128, newTotalSupply: u128, who: AccountId32, amount: u128], { poolId: u32, a: u128, oldBalances: Vec<u128>, newBalances: Vec<u128>, oldTotalSupply: u128, newTotalSupply: u128, who: AccountId32, amount: u128 }>;
      FeeModified: AugmentedEvent<ApiType, [poolId: u32, mintFee: u128, swapFee: u128, redeemFee: u128], { poolId: u32, mintFee: u128, swapFee: u128, redeemFee: u128 }>;
      Minted: AugmentedEvent<ApiType, [minter: AccountId32, poolId: u32, a: u128, inputAmounts: Vec<u128>, minOutputAmount: u128, balances: Vec<u128>, totalSupply: u128, feeAmount: u128, outputAmount: u128], { minter: AccountId32, poolId: u32, a: u128, inputAmounts: Vec<u128>, minOutputAmount: u128, balances: Vec<u128>, totalSupply: u128, feeAmount: u128, outputAmount: u128 }>;
      RecipientModified: AugmentedEvent<ApiType, [poolId: u32, feeRecipient: AccountId32, yieldRecipient: AccountId32], { poolId: u32, feeRecipient: AccountId32, yieldRecipient: AccountId32 }>;
      RedeemedMulti: AugmentedEvent<ApiType, [redeemer: AccountId32, poolId: u32, a: u128, outputAmounts: Vec<u128>, maxInputAmount: u128, balances: Vec<u128>, totalSupply: u128, feeAmount: u128, inputAmount: u128], { redeemer: AccountId32, poolId: u32, a: u128, outputAmounts: Vec<u128>, maxInputAmount: u128, balances: Vec<u128>, totalSupply: u128, feeAmount: u128, inputAmount: u128 }>;
      RedeemedProportion: AugmentedEvent<ApiType, [redeemer: AccountId32, poolId: u32, a: u128, inputAmount: u128, minOutputAmounts: Vec<u128>, balances: Vec<u128>, totalSupply: u128, feeAmount: u128, outputAmounts: Vec<u128>], { redeemer: AccountId32, poolId: u32, a: u128, inputAmount: u128, minOutputAmounts: Vec<u128>, balances: Vec<u128>, totalSupply: u128, feeAmount: u128, outputAmounts: Vec<u128> }>;
      RedeemedSingle: AugmentedEvent<ApiType, [redeemer: AccountId32, poolId: u32, a: u128, inputAmount: u128, outputAsset: AcalaPrimitivesCurrencyCurrencyId, minOutputAmount: u128, balances: Vec<u128>, totalSupply: u128, feeAmount: u128, outputAmount: u128], { redeemer: AccountId32, poolId: u32, a: u128, inputAmount: u128, outputAsset: AcalaPrimitivesCurrencyCurrencyId, minOutputAmount: u128, balances: Vec<u128>, totalSupply: u128, feeAmount: u128, outputAmount: u128 }>;
      TokenSwapped: AugmentedEvent<ApiType, [swapper: AccountId32, poolId: u32, a: u128, inputAsset: AcalaPrimitivesCurrencyCurrencyId, outputAsset: AcalaPrimitivesCurrencyCurrencyId, inputAmount: u128, minOutputAmount: u128, balances: Vec<u128>, totalSupply: u128, outputAmount: u128], { swapper: AccountId32, poolId: u32, a: u128, inputAsset: AcalaPrimitivesCurrencyCurrencyId, outputAsset: AcalaPrimitivesCurrencyCurrencyId, inputAmount: u128, minOutputAmount: u128, balances: Vec<u128>, totalSupply: u128, outputAmount: u128 }>;
      YieldCollected: AugmentedEvent<ApiType, [poolId: u32, a: u128, oldTotalSupply: u128, newTotalSupply: u128, who: AccountId32, amount: u128], { poolId: u32, a: u128, oldTotalSupply: u128, newTotalSupply: u128, who: AccountId32, amount: u128 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    sudo: {
      KeyChanged: AugmentedEvent<ApiType, [oldSudoer: Option<AccountId32>], { oldSudoer: Option<AccountId32> }>;
      Sudid: AugmentedEvent<ApiType, [sudoResult: Result<Null, SpRuntimeDispatchError>], { sudoResult: Result<Null, SpRuntimeDispatchError> }>;
      SudoAsDone: AugmentedEvent<ApiType, [sudoResult: Result<Null, SpRuntimeDispatchError>], { sudoResult: Result<Null, SpRuntimeDispatchError> }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    system: {
      CodeUpdated: AugmentedEvent<ApiType, []>;
      ExtrinsicFailed: AugmentedEvent<ApiType, [dispatchError: SpRuntimeDispatchError, dispatchInfo: FrameSupportWeightsDispatchInfo], { dispatchError: SpRuntimeDispatchError, dispatchInfo: FrameSupportWeightsDispatchInfo }>;
      ExtrinsicSuccess: AugmentedEvent<ApiType, [dispatchInfo: FrameSupportWeightsDispatchInfo], { dispatchInfo: FrameSupportWeightsDispatchInfo }>;
      KilledAccount: AugmentedEvent<ApiType, [account: AccountId32], { account: AccountId32 }>;
      NewAccount: AugmentedEvent<ApiType, [account: AccountId32], { account: AccountId32 }>;
      Remarked: AugmentedEvent<ApiType, [sender: AccountId32, hash_: H256], { sender: AccountId32, hash_: H256 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    technicalCommittee: {
      Approved: AugmentedEvent<ApiType, [proposalHash: H256], { proposalHash: H256 }>;
      Closed: AugmentedEvent<ApiType, [proposalHash: H256, yes: u32, no: u32], { proposalHash: H256, yes: u32, no: u32 }>;
      Disapproved: AugmentedEvent<ApiType, [proposalHash: H256], { proposalHash: H256 }>;
      Executed: AugmentedEvent<ApiType, [proposalHash: H256, result: Result<Null, SpRuntimeDispatchError>], { proposalHash: H256, result: Result<Null, SpRuntimeDispatchError> }>;
      MemberExecuted: AugmentedEvent<ApiType, [proposalHash: H256, result: Result<Null, SpRuntimeDispatchError>], { proposalHash: H256, result: Result<Null, SpRuntimeDispatchError> }>;
      Proposed: AugmentedEvent<ApiType, [account: AccountId32, proposalIndex: u32, proposalHash: H256, threshold: u32], { account: AccountId32, proposalIndex: u32, proposalHash: H256, threshold: u32 }>;
      Voted: AugmentedEvent<ApiType, [account: AccountId32, proposalHash: H256, voted: bool, yes: u32, no: u32], { account: AccountId32, proposalHash: H256, voted: bool, yes: u32, no: u32 }>;
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
      NewTip: AugmentedEvent<ApiType, [tipHash: H256], { tipHash: H256 }>;
      TipClosed: AugmentedEvent<ApiType, [tipHash: H256, who: AccountId32, payout: u128], { tipHash: H256, who: AccountId32, payout: u128 }>;
      TipClosing: AugmentedEvent<ApiType, [tipHash: H256], { tipHash: H256 }>;
      TipRetracted: AugmentedEvent<ApiType, [tipHash: H256], { tipHash: H256 }>;
      TipSlashed: AugmentedEvent<ApiType, [tipHash: H256, finder: AccountId32, deposit: u128], { tipHash: H256, finder: AccountId32, deposit: u128 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    tokens: {
      BalanceSet: AugmentedEvent<ApiType, [currencyId: AcalaPrimitivesCurrencyCurrencyId, who: AccountId32, free: u128, reserved: u128], { currencyId: AcalaPrimitivesCurrencyCurrencyId, who: AccountId32, free: u128, reserved: u128 }>;
      Deposited: AugmentedEvent<ApiType, [currencyId: AcalaPrimitivesCurrencyCurrencyId, who: AccountId32, amount: u128], { currencyId: AcalaPrimitivesCurrencyCurrencyId, who: AccountId32, amount: u128 }>;
      DustLost: AugmentedEvent<ApiType, [currencyId: AcalaPrimitivesCurrencyCurrencyId, who: AccountId32, amount: u128], { currencyId: AcalaPrimitivesCurrencyCurrencyId, who: AccountId32, amount: u128 }>;
      Endowed: AugmentedEvent<ApiType, [currencyId: AcalaPrimitivesCurrencyCurrencyId, who: AccountId32, amount: u128], { currencyId: AcalaPrimitivesCurrencyCurrencyId, who: AccountId32, amount: u128 }>;
      LockRemoved: AugmentedEvent<ApiType, [lockId: U8aFixed, currencyId: AcalaPrimitivesCurrencyCurrencyId, who: AccountId32], { lockId: U8aFixed, currencyId: AcalaPrimitivesCurrencyCurrencyId, who: AccountId32 }>;
      LockSet: AugmentedEvent<ApiType, [lockId: U8aFixed, currencyId: AcalaPrimitivesCurrencyCurrencyId, who: AccountId32, amount: u128], { lockId: U8aFixed, currencyId: AcalaPrimitivesCurrencyCurrencyId, who: AccountId32, amount: u128 }>;
      Reserved: AugmentedEvent<ApiType, [currencyId: AcalaPrimitivesCurrencyCurrencyId, who: AccountId32, amount: u128], { currencyId: AcalaPrimitivesCurrencyCurrencyId, who: AccountId32, amount: u128 }>;
      ReserveRepatriated: AugmentedEvent<ApiType, [currencyId: AcalaPrimitivesCurrencyCurrencyId, from: AccountId32, to: AccountId32, amount: u128, status: FrameSupportTokensMiscBalanceStatus], { currencyId: AcalaPrimitivesCurrencyCurrencyId, from: AccountId32, to: AccountId32, amount: u128, status: FrameSupportTokensMiscBalanceStatus }>;
      Slashed: AugmentedEvent<ApiType, [currencyId: AcalaPrimitivesCurrencyCurrencyId, who: AccountId32, freeAmount: u128, reservedAmount: u128], { currencyId: AcalaPrimitivesCurrencyCurrencyId, who: AccountId32, freeAmount: u128, reservedAmount: u128 }>;
      TotalIssuanceSet: AugmentedEvent<ApiType, [currencyId: AcalaPrimitivesCurrencyCurrencyId, amount: u128], { currencyId: AcalaPrimitivesCurrencyCurrencyId, amount: u128 }>;
      Transfer: AugmentedEvent<ApiType, [currencyId: AcalaPrimitivesCurrencyCurrencyId, from: AccountId32, to: AccountId32, amount: u128], { currencyId: AcalaPrimitivesCurrencyCurrencyId, from: AccountId32, to: AccountId32, amount: u128 }>;
      Unreserved: AugmentedEvent<ApiType, [currencyId: AcalaPrimitivesCurrencyCurrencyId, who: AccountId32, amount: u128], { currencyId: AcalaPrimitivesCurrencyCurrencyId, who: AccountId32, amount: u128 }>;
      Withdrawn: AugmentedEvent<ApiType, [currencyId: AcalaPrimitivesCurrencyCurrencyId, who: AccountId32, amount: u128], { currencyId: AcalaPrimitivesCurrencyCurrencyId, who: AccountId32, amount: u128 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    transactionPause: {
      EvmPrecompilePaused: AugmentedEvent<ApiType, [address: H160], { address: H160 }>;
      EvmPrecompileUnpaused: AugmentedEvent<ApiType, [address: H160], { address: H160 }>;
      TransactionPaused: AugmentedEvent<ApiType, [palletNameBytes: Bytes, functionNameBytes: Bytes], { palletNameBytes: Bytes, functionNameBytes: Bytes }>;
      TransactionUnpaused: AugmentedEvent<ApiType, [palletNameBytes: Bytes, functionNameBytes: Bytes], { palletNameBytes: Bytes, functionNameBytes: Bytes }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    transactionPayment: {
      ChargeFeePoolDisabled: AugmentedEvent<ApiType, [currencyId: AcalaPrimitivesCurrencyCurrencyId, foreignAmount: u128, nativeAmount: u128], { currencyId: AcalaPrimitivesCurrencyCurrencyId, foreignAmount: u128, nativeAmount: u128 }>;
      ChargeFeePoolEnabled: AugmentedEvent<ApiType, [subAccount: AccountId32, currencyId: AcalaPrimitivesCurrencyCurrencyId, exchangeRate: u128, poolSize: u128, swapThreshold: u128], { subAccount: AccountId32, currencyId: AcalaPrimitivesCurrencyCurrencyId, exchangeRate: u128, poolSize: u128, swapThreshold: u128 }>;
      ChargeFeePoolSwapped: AugmentedEvent<ApiType, [subAccount: AccountId32, supplyCurrencyId: AcalaPrimitivesCurrencyCurrencyId, oldExchangeRate: u128, swapExchangeRate: u128, newExchangeRate: u128, newPoolSize: u128], { subAccount: AccountId32, supplyCurrencyId: AcalaPrimitivesCurrencyCurrencyId, oldExchangeRate: u128, swapExchangeRate: u128, newExchangeRate: u128, newPoolSize: u128 }>;
      TransactionFeePaid: AugmentedEvent<ApiType, [who: AccountId32, actualFee: u128, actualTip: u128, actualSurplus: u128], { who: AccountId32, actualFee: u128, actualTip: u128, actualSurplus: u128 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    treasury: {
      Awarded: AugmentedEvent<ApiType, [proposalIndex: u32, award: u128, account: AccountId32], { proposalIndex: u32, award: u128, account: AccountId32 }>;
      Burnt: AugmentedEvent<ApiType, [burntFunds: u128], { burntFunds: u128 }>;
      Deposit: AugmentedEvent<ApiType, [value: u128], { value: u128 }>;
      Proposed: AugmentedEvent<ApiType, [proposalIndex: u32], { proposalIndex: u32 }>;
      Rejected: AugmentedEvent<ApiType, [proposalIndex: u32, slashed: u128], { proposalIndex: u32, slashed: u128 }>;
      Rollover: AugmentedEvent<ApiType, [rolloverBalance: u128], { rolloverBalance: u128 }>;
      SpendApproved: AugmentedEvent<ApiType, [proposalIndex: u32, amount: u128, beneficiary: AccountId32], { proposalIndex: u32, amount: u128, beneficiary: AccountId32 }>;
      Spending: AugmentedEvent<ApiType, [budgetRemaining: u128], { budgetRemaining: u128 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    unknownTokens: {
      Deposited: AugmentedEvent<ApiType, [asset: XcmV1MultiAsset, who: XcmV1MultiLocation], { asset: XcmV1MultiAsset, who: XcmV1MultiLocation }>;
      Withdrawn: AugmentedEvent<ApiType, [asset: XcmV1MultiAsset, who: XcmV1MultiLocation], { asset: XcmV1MultiAsset, who: XcmV1MultiLocation }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    utility: {
      BatchCompleted: AugmentedEvent<ApiType, []>;
      BatchCompletedWithErrors: AugmentedEvent<ApiType, []>;
      BatchInterrupted: AugmentedEvent<ApiType, [index: u32, error: SpRuntimeDispatchError], { index: u32, error: SpRuntimeDispatchError }>;
      DispatchedAs: AugmentedEvent<ApiType, [result: Result<Null, SpRuntimeDispatchError>], { result: Result<Null, SpRuntimeDispatchError> }>;
      ItemCompleted: AugmentedEvent<ApiType, []>;
      ItemFailed: AugmentedEvent<ApiType, [error: SpRuntimeDispatchError], { error: SpRuntimeDispatchError }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    vesting: {
      Claimed: AugmentedEvent<ApiType, [who: AccountId32, amount: u128], { who: AccountId32, amount: u128 }>;
      VestingScheduleAdded: AugmentedEvent<ApiType, [from: AccountId32, to: AccountId32, vestingSchedule: OrmlVestingVestingSchedule], { from: AccountId32, to: AccountId32, vestingSchedule: OrmlVestingVestingSchedule }>;
      VestingSchedulesUpdated: AugmentedEvent<ApiType, [who: AccountId32], { who: AccountId32 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    xcmInterface: {
      XcmDestWeightUpdated: AugmentedEvent<ApiType, [xcmOperation: ModuleXcmInterfaceModuleXcmInterfaceOperation, newXcmDestWeight: u64], { xcmOperation: ModuleXcmInterfaceModuleXcmInterfaceOperation, newXcmDestWeight: u64 }>;
      XcmFeeUpdated: AugmentedEvent<ApiType, [xcmOperation: ModuleXcmInterfaceModuleXcmInterfaceOperation, newXcmDestWeight: u128], { xcmOperation: ModuleXcmInterfaceModuleXcmInterfaceOperation, newXcmDestWeight: u128 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    xcmpQueue: {
      BadFormat: AugmentedEvent<ApiType, [messageHash: Option<H256>], { messageHash: Option<H256> }>;
      BadVersion: AugmentedEvent<ApiType, [messageHash: Option<H256>], { messageHash: Option<H256> }>;
      Fail: AugmentedEvent<ApiType, [messageHash: Option<H256>, error: XcmV2TraitsError, weight: u64], { messageHash: Option<H256>, error: XcmV2TraitsError, weight: u64 }>;
      OverweightEnqueued: AugmentedEvent<ApiType, [sender: u32, sentAt: u32, index: u64, required: u64], { sender: u32, sentAt: u32, index: u64, required: u64 }>;
      OverweightServiced: AugmentedEvent<ApiType, [index: u64, used: u64], { index: u64, used: u64 }>;
      Success: AugmentedEvent<ApiType, [messageHash: Option<H256>, weight: u64], { messageHash: Option<H256>, weight: u64 }>;
      UpwardMessageSent: AugmentedEvent<ApiType, [messageHash: Option<H256>], { messageHash: Option<H256> }>;
      XcmpMessageSent: AugmentedEvent<ApiType, [messageHash: Option<H256>], { messageHash: Option<H256> }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    xTokens: {
      TransferredMultiAssets: AugmentedEvent<ApiType, [sender: AccountId32, assets: XcmV1MultiassetMultiAssets, fee: XcmV1MultiAsset, dest: XcmV1MultiLocation], { sender: AccountId32, assets: XcmV1MultiassetMultiAssets, fee: XcmV1MultiAsset, dest: XcmV1MultiLocation }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
  } // AugmentedEvents
} // declare module
