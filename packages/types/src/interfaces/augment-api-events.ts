// Auto-generated via `yarn polkadot-types-from-chain`, do not edit
/* eslint-disable */

// import type lookup before we augment - in some environments
// this is required to allow for ambient/previous definitions
import '@polkadot/api-base/types/events';

import type { ApiTypes, AugmentedEvent } from '@polkadot/api-base/types';
import type { Bytes, Null, Option, Result, U8aFixed, Vec, bool, i128, i32, u128, u16, u32, u64, u8 } from '@polkadot/types-codec';
import type { ITuple } from '@polkadot/types-codec/types';
import type { AccountId32, H160, H256, Percent } from '@polkadot/types/interfaces/runtime';
import type { AcalaPrimitivesCurrencyAssetIds, AcalaPrimitivesCurrencyAssetMetadata, AcalaPrimitivesCurrencyCurrencyId, AcalaPrimitivesTradingPair, EthereumLog, EvmCoreErrorExitReason, FrameSupportScheduleLookupError, FrameSupportTokensMiscBalanceStatus, FrameSupportWeightsDispatchInfo, MandalaRuntimeOriginCaller, MandalaRuntimeScheduledTasks, ModuleHomaModuleUnlockChunk, ModuleSupportIncentivesPoolId, ModuleXcmInterfaceModuleXcmInterfaceOperation, OrmlVestingVestingSchedule, PalletDemocracyVoteAccountVote, PalletDemocracyVoteThreshold, PalletMultisigTimepoint, RuntimeCommonProxyType, SpRuntimeDispatchError, XcmV1MultiAsset, XcmV1MultiLocation, XcmV1MultiassetMultiAssets, XcmV2Response, XcmV2TraitsError, XcmV2TraitsOutcome, XcmV2Xcm, XcmVersionedMultiAssets, XcmVersionedMultiLocation } from '@polkadot/types/lookup';

export type __AugmentedEvent<ApiType extends ApiTypes> = AugmentedEvent<ApiType>;

declare module '@polkadot/api-base/types/events' {
  interface AugmentedEvents<ApiType extends ApiTypes> {
    acalaOracle: {
      /**
       * New feed data is submitted.
       **/
      NewFeedData: AugmentedEvent<ApiType, [sender: AccountId32, values: Vec<ITuple<[AcalaPrimitivesCurrencyCurrencyId, u128]>>], { sender: AccountId32, values: Vec<ITuple<[AcalaPrimitivesCurrencyCurrencyId, u128]>> }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    assetRegistry: {
      /**
       * The asset registered.
       **/
      AssetRegistered: AugmentedEvent<ApiType, [assetId: AcalaPrimitivesCurrencyAssetIds, metadata: AcalaPrimitivesCurrencyAssetMetadata], { assetId: AcalaPrimitivesCurrencyAssetIds, metadata: AcalaPrimitivesCurrencyAssetMetadata }>;
      /**
       * The asset updated.
       **/
      AssetUpdated: AugmentedEvent<ApiType, [assetId: AcalaPrimitivesCurrencyAssetIds, metadata: AcalaPrimitivesCurrencyAssetMetadata], { assetId: AcalaPrimitivesCurrencyAssetIds, metadata: AcalaPrimitivesCurrencyAssetMetadata }>;
      /**
       * The foreign asset registered.
       **/
      ForeignAssetRegistered: AugmentedEvent<ApiType, [assetId: u16, assetAddress: XcmV1MultiLocation, metadata: AcalaPrimitivesCurrencyAssetMetadata], { assetId: u16, assetAddress: XcmV1MultiLocation, metadata: AcalaPrimitivesCurrencyAssetMetadata }>;
      /**
       * The foreign asset updated.
       **/
      ForeignAssetUpdated: AugmentedEvent<ApiType, [assetId: u16, assetAddress: XcmV1MultiLocation, metadata: AcalaPrimitivesCurrencyAssetMetadata], { assetId: u16, assetAddress: XcmV1MultiLocation, metadata: AcalaPrimitivesCurrencyAssetMetadata }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    auction: {
      /**
       * A bid is placed
       **/
      Bid: AugmentedEvent<ApiType, [auctionId: u32, bidder: AccountId32, amount: u128], { auctionId: u32, bidder: AccountId32, amount: u128 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    auctionManager: {
      /**
       * Active auction cancelled.
       **/
      CancelAuction: AugmentedEvent<ApiType, [auctionId: u32], { auctionId: u32 }>;
      /**
       * Collateral auction aborted.
       **/
      CollateralAuctionAborted: AugmentedEvent<ApiType, [auctionId: u32, collateralType: AcalaPrimitivesCurrencyCurrencyId, collateralAmount: u128, targetStableAmount: u128, refundRecipient: AccountId32], { auctionId: u32, collateralType: AcalaPrimitivesCurrencyCurrencyId, collateralAmount: u128, targetStableAmount: u128, refundRecipient: AccountId32 }>;
      /**
       * Collateral auction dealt.
       **/
      CollateralAuctionDealt: AugmentedEvent<ApiType, [auctionId: u32, collateralType: AcalaPrimitivesCurrencyCurrencyId, collateralAmount: u128, winner: AccountId32, paymentAmount: u128], { auctionId: u32, collateralType: AcalaPrimitivesCurrencyCurrencyId, collateralAmount: u128, winner: AccountId32, paymentAmount: u128 }>;
      /**
       * Dex take collateral auction.
       **/
      DEXTakeCollateralAuction: AugmentedEvent<ApiType, [auctionId: u32, collateralType: AcalaPrimitivesCurrencyCurrencyId, collateralAmount: u128, supplyCollateralAmount: u128, targetStableAmount: u128], { auctionId: u32, collateralType: AcalaPrimitivesCurrencyCurrencyId, collateralAmount: u128, supplyCollateralAmount: u128, targetStableAmount: u128 }>;
      /**
       * Collateral auction created.
       **/
      NewCollateralAuction: AugmentedEvent<ApiType, [auctionId: u32, collateralType: AcalaPrimitivesCurrencyCurrencyId, collateralAmount: u128, targetBidPrice: u128], { auctionId: u32, collateralType: AcalaPrimitivesCurrencyCurrencyId, collateralAmount: u128, targetBidPrice: u128 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    authority: {
      /**
       * A call is authorized.
       **/
      AuthorizedCall: AugmentedEvent<ApiType, [hash_: H256, caller: Option<AccountId32>], { hash_: H256, caller: Option<AccountId32> }>;
      /**
       * A scheduled call is cancelled.
       **/
      Cancelled: AugmentedEvent<ApiType, [origin: MandalaRuntimeOriginCaller, index: u32], { origin: MandalaRuntimeOriginCaller, index: u32 }>;
      /**
       * A scheduled call is delayed.
       **/
      Delayed: AugmentedEvent<ApiType, [origin: MandalaRuntimeOriginCaller, index: u32, when: u32], { origin: MandalaRuntimeOriginCaller, index: u32, when: u32 }>;
      /**
       * A call is dispatched.
       **/
      Dispatched: AugmentedEvent<ApiType, [result: Result<Null, SpRuntimeDispatchError>], { result: Result<Null, SpRuntimeDispatchError> }>;
      /**
       * A scheduled call is fast tracked.
       **/
      FastTracked: AugmentedEvent<ApiType, [origin: MandalaRuntimeOriginCaller, index: u32, when: u32], { origin: MandalaRuntimeOriginCaller, index: u32, when: u32 }>;
      /**
       * An authorized call was removed.
       **/
      RemovedAuthorizedCall: AugmentedEvent<ApiType, [hash_: H256], { hash_: H256 }>;
      /**
       * A call is scheduled.
       **/
      Scheduled: AugmentedEvent<ApiType, [origin: MandalaRuntimeOriginCaller, index: u32], { origin: MandalaRuntimeOriginCaller, index: u32 }>;
      /**
       * An authorized call was triggered.
       **/
      TriggeredCallBy: AugmentedEvent<ApiType, [hash_: H256, caller: AccountId32], { hash_: H256, caller: AccountId32 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    balances: {
      /**
       * A balance was set by root.
       **/
      BalanceSet: AugmentedEvent<ApiType, [who: AccountId32, free: u128, reserved: u128], { who: AccountId32, free: u128, reserved: u128 }>;
      /**
       * Some amount was deposited (e.g. for transaction fees).
       **/
      Deposit: AugmentedEvent<ApiType, [who: AccountId32, amount: u128], { who: AccountId32, amount: u128 }>;
      /**
       * An account was removed whose balance was non-zero but below ExistentialDeposit,
       * resulting in an outright loss.
       **/
      DustLost: AugmentedEvent<ApiType, [account: AccountId32, amount: u128], { account: AccountId32, amount: u128 }>;
      /**
       * An account was created with some free balance.
       **/
      Endowed: AugmentedEvent<ApiType, [account: AccountId32, freeBalance: u128], { account: AccountId32, freeBalance: u128 }>;
      /**
       * Some balance was reserved (moved from free to reserved).
       **/
      Reserved: AugmentedEvent<ApiType, [who: AccountId32, amount: u128], { who: AccountId32, amount: u128 }>;
      /**
       * Some balance was moved from the reserve of the first account to the second account.
       * Final argument indicates the destination balance type.
       **/
      ReserveRepatriated: AugmentedEvent<ApiType, [from: AccountId32, to: AccountId32, amount: u128, destinationStatus: FrameSupportTokensMiscBalanceStatus], { from: AccountId32, to: AccountId32, amount: u128, destinationStatus: FrameSupportTokensMiscBalanceStatus }>;
      /**
       * Some amount was removed from the account (e.g. for misbehavior).
       **/
      Slashed: AugmentedEvent<ApiType, [who: AccountId32, amount: u128], { who: AccountId32, amount: u128 }>;
      /**
       * Transfer succeeded.
       **/
      Transfer: AugmentedEvent<ApiType, [from: AccountId32, to: AccountId32, amount: u128], { from: AccountId32, to: AccountId32, amount: u128 }>;
      /**
       * Some balance was unreserved (moved from reserved to free).
       **/
      Unreserved: AugmentedEvent<ApiType, [who: AccountId32, amount: u128], { who: AccountId32, amount: u128 }>;
      /**
       * Some amount was withdrawn from the account (e.g. for transaction fees).
       **/
      Withdraw: AugmentedEvent<ApiType, [who: AccountId32, amount: u128], { who: AccountId32, amount: u128 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    bounties: {
      /**
       * A bounty is awarded to a beneficiary.
       **/
      BountyAwarded: AugmentedEvent<ApiType, [index: u32, beneficiary: AccountId32], { index: u32, beneficiary: AccountId32 }>;
      /**
       * A bounty proposal is funded and became active.
       **/
      BountyBecameActive: AugmentedEvent<ApiType, [index: u32], { index: u32 }>;
      /**
       * A bounty is cancelled.
       **/
      BountyCanceled: AugmentedEvent<ApiType, [index: u32], { index: u32 }>;
      /**
       * A bounty is claimed by beneficiary.
       **/
      BountyClaimed: AugmentedEvent<ApiType, [index: u32, payout: u128, beneficiary: AccountId32], { index: u32, payout: u128, beneficiary: AccountId32 }>;
      /**
       * A bounty expiry is extended.
       **/
      BountyExtended: AugmentedEvent<ApiType, [index: u32], { index: u32 }>;
      /**
       * New bounty proposal.
       **/
      BountyProposed: AugmentedEvent<ApiType, [index: u32], { index: u32 }>;
      /**
       * A bounty proposal was rejected; funds were slashed.
       **/
      BountyRejected: AugmentedEvent<ApiType, [index: u32, bond: u128], { index: u32, bond: u128 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    cdpEngine: {
      /**
       * Directly close CDP has debit by handle debit with DEX.
       **/
      CloseCDPInDebitByDEX: AugmentedEvent<ApiType, [collateralType: AcalaPrimitivesCurrencyCurrencyId, owner: AccountId32, soldCollateralAmount: u128, refundCollateralAmount: u128, debitValue: u128], { collateralType: AcalaPrimitivesCurrencyCurrencyId, owner: AccountId32, soldCollateralAmount: u128, refundCollateralAmount: u128, debitValue: u128 }>;
      /**
       * The interest rate per sec for specific collateral type updated.
       **/
      InterestRatePerSecUpdated: AugmentedEvent<ApiType, [collateralType: AcalaPrimitivesCurrencyCurrencyId, newInterestRatePerSec: Option<u128>], { collateralType: AcalaPrimitivesCurrencyCurrencyId, newInterestRatePerSec: Option<u128> }>;
      /**
       * Liquidate the unsafe CDP.
       **/
      LiquidateUnsafeCDP: AugmentedEvent<ApiType, [collateralType: AcalaPrimitivesCurrencyCurrencyId, owner: AccountId32, collateralAmount: u128, badDebtValue: u128, targetAmount: u128], { collateralType: AcalaPrimitivesCurrencyCurrencyId, owner: AccountId32, collateralAmount: u128, badDebtValue: u128, targetAmount: u128 }>;
      /**
       * A new liquidation contract is deregistered.
       **/
      LiquidationContractDeregistered: AugmentedEvent<ApiType, [address: H160], { address: H160 }>;
      /**
       * A new liquidation contract is registered.
       **/
      LiquidationContractRegistered: AugmentedEvent<ApiType, [address: H160], { address: H160 }>;
      /**
       * The liquidation penalty rate for specific collateral type updated.
       **/
      LiquidationPenaltyUpdated: AugmentedEvent<ApiType, [collateralType: AcalaPrimitivesCurrencyCurrencyId, newLiquidationPenalty: Option<u128>], { collateralType: AcalaPrimitivesCurrencyCurrencyId, newLiquidationPenalty: Option<u128> }>;
      /**
       * The liquidation fee for specific collateral type updated.
       **/
      LiquidationRatioUpdated: AugmentedEvent<ApiType, [collateralType: AcalaPrimitivesCurrencyCurrencyId, newLiquidationRatio: Option<u128>], { collateralType: AcalaPrimitivesCurrencyCurrencyId, newLiquidationRatio: Option<u128> }>;
      /**
       * The hard cap of total debit value for specific collateral type updated.
       **/
      MaximumTotalDebitValueUpdated: AugmentedEvent<ApiType, [collateralType: AcalaPrimitivesCurrencyCurrencyId, newTotalDebitValue: u128], { collateralType: AcalaPrimitivesCurrencyCurrencyId, newTotalDebitValue: u128 }>;
      /**
       * The required collateral penalty rate for specific collateral type updated.
       **/
      RequiredCollateralRatioUpdated: AugmentedEvent<ApiType, [collateralType: AcalaPrimitivesCurrencyCurrencyId, newRequiredCollateralRatio: Option<u128>], { collateralType: AcalaPrimitivesCurrencyCurrencyId, newRequiredCollateralRatio: Option<u128> }>;
      /**
       * Settle the CDP has debit.
       **/
      SettleCDPInDebit: AugmentedEvent<ApiType, [collateralType: AcalaPrimitivesCurrencyCurrencyId, owner: AccountId32], { collateralType: AcalaPrimitivesCurrencyCurrencyId, owner: AccountId32 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    cdpTreasury: {
      /**
       * The expected amount size for per lot collateral auction of specific collateral type
       * updated.
       **/
      ExpectedCollateralAuctionSizeUpdated: AugmentedEvent<ApiType, [collateralType: AcalaPrimitivesCurrencyCurrencyId, newSize: u128], { collateralType: AcalaPrimitivesCurrencyCurrencyId, newSize: u128 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    collatorSelection: {
      /**
       * A candidate was added.
       **/
      CandidateAdded: AugmentedEvent<ApiType, [who: AccountId32, bond: u128], { who: AccountId32, bond: u128 }>;
      /**
       * A candidate was removed.
       **/
      CandidateRemoved: AugmentedEvent<ApiType, [who: AccountId32], { who: AccountId32 }>;
      /**
       * Candidacy bond was updated.
       **/
      NewCandidacyBond: AugmentedEvent<ApiType, [newCandidacyBond: u128], { newCandidacyBond: u128 }>;
      /**
       * Desired candidates was updated.
       **/
      NewDesiredCandidates: AugmentedEvent<ApiType, [newDesiredCandidates: u32], { newDesiredCandidates: u32 }>;
      /**
       * Invulnurable was updated.
       **/
      NewInvulnerables: AugmentedEvent<ApiType, [newInvulnerables: Vec<AccountId32>], { newInvulnerables: Vec<AccountId32> }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    compoundCash: {
      /**
       * Set the future yield for the Cash asset.
       **/
      FutureYieldSet: AugmentedEvent<ApiType, [yieldAmount: u128, index: u128, timestamp: u64], { yieldAmount: u128, index: u128, timestamp: u64 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    cumulusXcm: {
      /**
       * Downward message executed with the given outcome.
       * \[ id, outcome \]
       **/
      ExecutedDownward: AugmentedEvent<ApiType, [U8aFixed, XcmV2TraitsOutcome]>;
      /**
       * Downward message is invalid XCM.
       * \[ id \]
       **/
      InvalidFormat: AugmentedEvent<ApiType, [U8aFixed]>;
      /**
       * Downward message is unsupported version of XCM.
       * \[ id \]
       **/
      UnsupportedVersion: AugmentedEvent<ApiType, [U8aFixed]>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    currencies: {
      /**
       * Deposited some balance into an account
       **/
      Deposited: AugmentedEvent<ApiType, [currencyId: AcalaPrimitivesCurrencyCurrencyId, who: AccountId32, amount: u128], { currencyId: AcalaPrimitivesCurrencyCurrencyId, who: AccountId32, amount: u128 }>;
      /**
       * Dust swept.
       **/
      DustSwept: AugmentedEvent<ApiType, [currencyId: AcalaPrimitivesCurrencyCurrencyId, who: AccountId32, amount: u128], { currencyId: AcalaPrimitivesCurrencyCurrencyId, who: AccountId32, amount: u128 }>;
      /**
       * Currency transfer success.
       **/
      Transferred: AugmentedEvent<ApiType, [currencyId: AcalaPrimitivesCurrencyCurrencyId, from: AccountId32, to: AccountId32, amount: u128], { currencyId: AcalaPrimitivesCurrencyCurrencyId, from: AccountId32, to: AccountId32, amount: u128 }>;
      /**
       * Withdrawn some balances from an account
       **/
      Withdrawn: AugmentedEvent<ApiType, [currencyId: AcalaPrimitivesCurrencyCurrencyId, who: AccountId32, amount: u128], { currencyId: AcalaPrimitivesCurrencyCurrencyId, who: AccountId32, amount: u128 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    democracy: {
      /**
       * A proposal_hash has been blacklisted permanently.
       **/
      Blacklisted: AugmentedEvent<ApiType, [proposalHash: H256], { proposalHash: H256 }>;
      /**
       * A referendum has been cancelled.
       **/
      Cancelled: AugmentedEvent<ApiType, [refIndex: u32], { refIndex: u32 }>;
      /**
       * An account has delegated their vote to another account.
       **/
      Delegated: AugmentedEvent<ApiType, [who: AccountId32, target: AccountId32], { who: AccountId32, target: AccountId32 }>;
      /**
       * A proposal has been enacted.
       **/
      Executed: AugmentedEvent<ApiType, [refIndex: u32, result: Result<Null, SpRuntimeDispatchError>], { refIndex: u32, result: Result<Null, SpRuntimeDispatchError> }>;
      /**
       * An external proposal has been tabled.
       **/
      ExternalTabled: AugmentedEvent<ApiType, []>;
      /**
       * A proposal has been rejected by referendum.
       **/
      NotPassed: AugmentedEvent<ApiType, [refIndex: u32], { refIndex: u32 }>;
      /**
       * A proposal has been approved by referendum.
       **/
      Passed: AugmentedEvent<ApiType, [refIndex: u32], { refIndex: u32 }>;
      /**
       * A proposal could not be executed because its preimage was invalid.
       **/
      PreimageInvalid: AugmentedEvent<ApiType, [proposalHash: H256, refIndex: u32], { proposalHash: H256, refIndex: u32 }>;
      /**
       * A proposal could not be executed because its preimage was missing.
       **/
      PreimageMissing: AugmentedEvent<ApiType, [proposalHash: H256, refIndex: u32], { proposalHash: H256, refIndex: u32 }>;
      /**
       * A proposal's preimage was noted, and the deposit taken.
       **/
      PreimageNoted: AugmentedEvent<ApiType, [proposalHash: H256, who: AccountId32, deposit: u128], { proposalHash: H256, who: AccountId32, deposit: u128 }>;
      /**
       * A registered preimage was removed and the deposit collected by the reaper.
       **/
      PreimageReaped: AugmentedEvent<ApiType, [proposalHash: H256, provider: AccountId32, deposit: u128, reaper: AccountId32], { proposalHash: H256, provider: AccountId32, deposit: u128, reaper: AccountId32 }>;
      /**
       * A proposal preimage was removed and used (the deposit was returned).
       **/
      PreimageUsed: AugmentedEvent<ApiType, [proposalHash: H256, provider: AccountId32, deposit: u128], { proposalHash: H256, provider: AccountId32, deposit: u128 }>;
      /**
       * A proposal got canceled.
       **/
      ProposalCanceled: AugmentedEvent<ApiType, [propIndex: u32], { propIndex: u32 }>;
      /**
       * A motion has been proposed by a public account.
       **/
      Proposed: AugmentedEvent<ApiType, [proposalIndex: u32, deposit: u128], { proposalIndex: u32, deposit: u128 }>;
      /**
       * An account has secconded a proposal
       **/
      Seconded: AugmentedEvent<ApiType, [seconder: AccountId32, propIndex: u32], { seconder: AccountId32, propIndex: u32 }>;
      /**
       * A referendum has begun.
       **/
      Started: AugmentedEvent<ApiType, [refIndex: u32, threshold: PalletDemocracyVoteThreshold], { refIndex: u32, threshold: PalletDemocracyVoteThreshold }>;
      /**
       * A public proposal has been tabled for referendum vote.
       **/
      Tabled: AugmentedEvent<ApiType, [proposalIndex: u32, deposit: u128, depositors: Vec<AccountId32>], { proposalIndex: u32, deposit: u128, depositors: Vec<AccountId32> }>;
      /**
       * An account has cancelled a previous delegation operation.
       **/
      Undelegated: AugmentedEvent<ApiType, [account: AccountId32], { account: AccountId32 }>;
      /**
       * An external proposal has been vetoed.
       **/
      Vetoed: AugmentedEvent<ApiType, [who: AccountId32, proposalHash: H256, until: u32], { who: AccountId32, proposalHash: H256, until: u32 }>;
      /**
       * An account has voted in a referendum
       **/
      Voted: AugmentedEvent<ApiType, [voter: AccountId32, refIndex: u32, vote: PalletDemocracyVoteAccountVote], { voter: AccountId32, refIndex: u32, vote: PalletDemocracyVoteAccountVote }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    dex: {
      /**
       * Add liquidity success.
       **/
      AddLiquidity: AugmentedEvent<ApiType, [who: AccountId32, currency0: AcalaPrimitivesCurrencyCurrencyId, pool0: u128, currency1: AcalaPrimitivesCurrencyCurrencyId, pool1: u128, shareIncrement: u128], { who: AccountId32, currency0: AcalaPrimitivesCurrencyCurrencyId, pool0: u128, currency1: AcalaPrimitivesCurrencyCurrencyId, pool1: u128, shareIncrement: u128 }>;
      /**
       * add provision success
       **/
      AddProvision: AugmentedEvent<ApiType, [who: AccountId32, currency0: AcalaPrimitivesCurrencyCurrencyId, contribution0: u128, currency1: AcalaPrimitivesCurrencyCurrencyId, contribution1: u128], { who: AccountId32, currency0: AcalaPrimitivesCurrencyCurrencyId, contribution0: u128, currency1: AcalaPrimitivesCurrencyCurrencyId, contribution1: u128 }>;
      /**
       * Disable trading pair.
       **/
      DisableTradingPair: AugmentedEvent<ApiType, [tradingPair: AcalaPrimitivesTradingPair], { tradingPair: AcalaPrimitivesTradingPair }>;
      /**
       * Enable trading pair.
       **/
      EnableTradingPair: AugmentedEvent<ApiType, [tradingPair: AcalaPrimitivesTradingPair], { tradingPair: AcalaPrimitivesTradingPair }>;
      /**
       * List provisioning trading pair.
       **/
      ListProvisioning: AugmentedEvent<ApiType, [tradingPair: AcalaPrimitivesTradingPair], { tradingPair: AcalaPrimitivesTradingPair }>;
      /**
       * Provisioning trading pair aborted.
       **/
      ProvisioningAborted: AugmentedEvent<ApiType, [tradingPair: AcalaPrimitivesTradingPair, accumulatedProvision0: u128, accumulatedProvision1: u128], { tradingPair: AcalaPrimitivesTradingPair, accumulatedProvision0: u128, accumulatedProvision1: u128 }>;
      /**
       * Provisioning trading pair convert to Enabled.
       **/
      ProvisioningToEnabled: AugmentedEvent<ApiType, [tradingPair: AcalaPrimitivesTradingPair, pool0: u128, pool1: u128, shareAmount: u128], { tradingPair: AcalaPrimitivesTradingPair, pool0: u128, pool1: u128, shareAmount: u128 }>;
      /**
       * refund provision success
       **/
      RefundProvision: AugmentedEvent<ApiType, [who: AccountId32, currency0: AcalaPrimitivesCurrencyCurrencyId, contribution0: u128, currency1: AcalaPrimitivesCurrencyCurrencyId, contribution1: u128], { who: AccountId32, currency0: AcalaPrimitivesCurrencyCurrencyId, contribution0: u128, currency1: AcalaPrimitivesCurrencyCurrencyId, contribution1: u128 }>;
      /**
       * Remove liquidity from the trading pool success.
       **/
      RemoveLiquidity: AugmentedEvent<ApiType, [who: AccountId32, currency0: AcalaPrimitivesCurrencyCurrencyId, pool0: u128, currency1: AcalaPrimitivesCurrencyCurrencyId, pool1: u128, shareDecrement: u128], { who: AccountId32, currency0: AcalaPrimitivesCurrencyCurrencyId, pool0: u128, currency1: AcalaPrimitivesCurrencyCurrencyId, pool1: u128, shareDecrement: u128 }>;
      /**
       * Use supply currency to swap target currency.
       **/
      Swap: AugmentedEvent<ApiType, [trader: AccountId32, path: Vec<AcalaPrimitivesCurrencyCurrencyId>, liquidityChanges: Vec<u128>], { trader: AccountId32, path: Vec<AcalaPrimitivesCurrencyCurrencyId>, liquidityChanges: Vec<u128> }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    dmpQueue: {
      /**
       * Downward message executed with the given outcome.
       **/
      ExecutedDownward: AugmentedEvent<ApiType, [messageId: U8aFixed, outcome: XcmV2TraitsOutcome], { messageId: U8aFixed, outcome: XcmV2TraitsOutcome }>;
      /**
       * Downward message is invalid XCM.
       **/
      InvalidFormat: AugmentedEvent<ApiType, [messageId: U8aFixed], { messageId: U8aFixed }>;
      /**
       * Downward message is overweight and was placed in the overweight queue.
       **/
      OverweightEnqueued: AugmentedEvent<ApiType, [messageId: U8aFixed, overweightIndex: u64, requiredWeight: u64], { messageId: U8aFixed, overweightIndex: u64, requiredWeight: u64 }>;
      /**
       * Downward message from the overweight queue was executed.
       **/
      OverweightServiced: AugmentedEvent<ApiType, [overweightIndex: u64, weightUsed: u64], { overweightIndex: u64, weightUsed: u64 }>;
      /**
       * Downward message is unsupported version of XCM.
       **/
      UnsupportedVersion: AugmentedEvent<ApiType, [messageId: U8aFixed], { messageId: U8aFixed }>;
      /**
       * The weight limit for handling downward messages was reached.
       **/
      WeightExhausted: AugmentedEvent<ApiType, [messageId: U8aFixed, remainingWeight: u64, requiredWeight: u64], { messageId: U8aFixed, remainingWeight: u64, requiredWeight: u64 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    earning: {
      Bonded: AugmentedEvent<ApiType, [who: AccountId32, amount: u128], { who: AccountId32, amount: u128 }>;
      InstantUnbonded: AugmentedEvent<ApiType, [who: AccountId32, amount: u128, fee: u128], { who: AccountId32, amount: u128, fee: u128 }>;
      Rebonded: AugmentedEvent<ApiType, [who: AccountId32, amount: u128], { who: AccountId32, amount: u128 }>;
      Unbonded: AugmentedEvent<ApiType, [who: AccountId32, amount: u128], { who: AccountId32, amount: u128 }>;
      Withdrawn: AugmentedEvent<ApiType, [who: AccountId32, amount: u128], { who: AccountId32, amount: u128 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    emergencyShutdown: {
      /**
       * The final redemption opened.
       **/
      OpenRefund: AugmentedEvent<ApiType, [blockNumber: u32], { blockNumber: u32 }>;
      /**
       * Refund info.
       **/
      Refund: AugmentedEvent<ApiType, [who: AccountId32, stableCoinAmount: u128, refundList: Vec<ITuple<[AcalaPrimitivesCurrencyCurrencyId, u128]>>], { who: AccountId32, stableCoinAmount: u128, refundList: Vec<ITuple<[AcalaPrimitivesCurrencyCurrencyId, u128]>> }>;
      /**
       * Emergency shutdown occurs.
       **/
      Shutdown: AugmentedEvent<ApiType, [blockNumber: u32], { blockNumber: u32 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    evm: {
      /**
       * Disabled contract development.
       **/
      ContractDevelopmentDisabled: AugmentedEvent<ApiType, [who: AccountId32], { who: AccountId32 }>;
      /**
       * Enabled contract development.
       **/
      ContractDevelopmentEnabled: AugmentedEvent<ApiType, [who: AccountId32], { who: AccountId32 }>;
      /**
       * Published contract.
       **/
      ContractPublished: AugmentedEvent<ApiType, [contract: H160], { contract: H160 }>;
      /**
       * Selfdestructed contract code.
       **/
      ContractSelfdestructed: AugmentedEvent<ApiType, [contract: H160], { contract: H160 }>;
      /**
       * Set contract code.
       **/
      ContractSetCode: AugmentedEvent<ApiType, [contract: H160], { contract: H160 }>;
      /**
       * A contract has been created at given
       **/
      Created: AugmentedEvent<ApiType, [from: H160, contract: H160, logs: Vec<EthereumLog>, usedGas: u64, usedStorage: i32], { from: H160, contract: H160, logs: Vec<EthereumLog>, usedGas: u64, usedStorage: i32 }>;
      /**
       * A contract was attempted to be created, but the execution failed.
       **/
      CreatedFailed: AugmentedEvent<ApiType, [from: H160, contract: H160, exitReason: EvmCoreErrorExitReason, logs: Vec<EthereumLog>, usedGas: u64, usedStorage: i32], { from: H160, contract: H160, exitReason: EvmCoreErrorExitReason, logs: Vec<EthereumLog>, usedGas: u64, usedStorage: i32 }>;
      /**
       * A contract has been executed successfully with states applied.
       **/
      Executed: AugmentedEvent<ApiType, [from: H160, contract: H160, logs: Vec<EthereumLog>, usedGas: u64, usedStorage: i32], { from: H160, contract: H160, logs: Vec<EthereumLog>, usedGas: u64, usedStorage: i32 }>;
      /**
       * A contract has been executed with errors. States are reverted with
       * only gas fees applied.
       **/
      ExecutedFailed: AugmentedEvent<ApiType, [from: H160, contract: H160, exitReason: EvmCoreErrorExitReason, output: Bytes, logs: Vec<EthereumLog>, usedGas: u64, usedStorage: i32], { from: H160, contract: H160, exitReason: EvmCoreErrorExitReason, output: Bytes, logs: Vec<EthereumLog>, usedGas: u64, usedStorage: i32 }>;
      /**
       * Transferred maintainer.
       **/
      TransferredMaintainer: AugmentedEvent<ApiType, [contract: H160, newMaintainer: H160], { contract: H160, newMaintainer: H160 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    evmAccounts: {
      /**
       * Mapping between Substrate accounts and EVM accounts
       * claim account.
       **/
      ClaimAccount: AugmentedEvent<ApiType, [accountId: AccountId32, evmAddress: H160], { accountId: AccountId32, evmAddress: H160 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    financialCouncil: {
      /**
       * A motion was approved by the required threshold.
       **/
      Approved: AugmentedEvent<ApiType, [proposalHash: H256], { proposalHash: H256 }>;
      /**
       * A proposal was closed because its threshold was reached or after its duration was up.
       **/
      Closed: AugmentedEvent<ApiType, [proposalHash: H256, yes: u32, no: u32], { proposalHash: H256, yes: u32, no: u32 }>;
      /**
       * A motion was not approved by the required threshold.
       **/
      Disapproved: AugmentedEvent<ApiType, [proposalHash: H256], { proposalHash: H256 }>;
      /**
       * A motion was executed; result will be `Ok` if it returned without error.
       **/
      Executed: AugmentedEvent<ApiType, [proposalHash: H256, result: Result<Null, SpRuntimeDispatchError>], { proposalHash: H256, result: Result<Null, SpRuntimeDispatchError> }>;
      /**
       * A single member did some action; result will be `Ok` if it returned without error.
       **/
      MemberExecuted: AugmentedEvent<ApiType, [proposalHash: H256, result: Result<Null, SpRuntimeDispatchError>], { proposalHash: H256, result: Result<Null, SpRuntimeDispatchError> }>;
      /**
       * A motion (given hash) has been proposed (by given account) with a threshold (given
       * `MemberCount`).
       **/
      Proposed: AugmentedEvent<ApiType, [account: AccountId32, proposalIndex: u32, proposalHash: H256, threshold: u32], { account: AccountId32, proposalIndex: u32, proposalHash: H256, threshold: u32 }>;
      /**
       * A motion (given hash) has been voted on by given account, leaving
       * a tally (yes votes and no votes given respectively as `MemberCount`).
       **/
      Voted: AugmentedEvent<ApiType, [account: AccountId32, proposalHash: H256, voted: bool, yes: u32, no: u32], { account: AccountId32, proposalHash: H256, voted: bool, yes: u32, no: u32 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    financialCouncilMembership: {
      /**
       * Phantom member, never used.
       **/
      Dummy: AugmentedEvent<ApiType, []>;
      /**
       * One of the members' keys changed.
       **/
      KeyChanged: AugmentedEvent<ApiType, []>;
      /**
       * The given member was added; see the transaction for who.
       **/
      MemberAdded: AugmentedEvent<ApiType, []>;
      /**
       * The given member was removed; see the transaction for who.
       **/
      MemberRemoved: AugmentedEvent<ApiType, []>;
      /**
       * The membership was reset; see the transaction for who the new set is.
       **/
      MembersReset: AugmentedEvent<ApiType, []>;
      /**
       * Two members were swapped; see the transaction for who.
       **/
      MembersSwapped: AugmentedEvent<ApiType, []>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    generalCouncil: {
      /**
       * A motion was approved by the required threshold.
       **/
      Approved: AugmentedEvent<ApiType, [proposalHash: H256], { proposalHash: H256 }>;
      /**
       * A proposal was closed because its threshold was reached or after its duration was up.
       **/
      Closed: AugmentedEvent<ApiType, [proposalHash: H256, yes: u32, no: u32], { proposalHash: H256, yes: u32, no: u32 }>;
      /**
       * A motion was not approved by the required threshold.
       **/
      Disapproved: AugmentedEvent<ApiType, [proposalHash: H256], { proposalHash: H256 }>;
      /**
       * A motion was executed; result will be `Ok` if it returned without error.
       **/
      Executed: AugmentedEvent<ApiType, [proposalHash: H256, result: Result<Null, SpRuntimeDispatchError>], { proposalHash: H256, result: Result<Null, SpRuntimeDispatchError> }>;
      /**
       * A single member did some action; result will be `Ok` if it returned without error.
       **/
      MemberExecuted: AugmentedEvent<ApiType, [proposalHash: H256, result: Result<Null, SpRuntimeDispatchError>], { proposalHash: H256, result: Result<Null, SpRuntimeDispatchError> }>;
      /**
       * A motion (given hash) has been proposed (by given account) with a threshold (given
       * `MemberCount`).
       **/
      Proposed: AugmentedEvent<ApiType, [account: AccountId32, proposalIndex: u32, proposalHash: H256, threshold: u32], { account: AccountId32, proposalIndex: u32, proposalHash: H256, threshold: u32 }>;
      /**
       * A motion (given hash) has been voted on by given account, leaving
       * a tally (yes votes and no votes given respectively as `MemberCount`).
       **/
      Voted: AugmentedEvent<ApiType, [account: AccountId32, proposalHash: H256, voted: bool, yes: u32, no: u32], { account: AccountId32, proposalHash: H256, voted: bool, yes: u32, no: u32 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    generalCouncilMembership: {
      /**
       * Phantom member, never used.
       **/
      Dummy: AugmentedEvent<ApiType, []>;
      /**
       * One of the members' keys changed.
       **/
      KeyChanged: AugmentedEvent<ApiType, []>;
      /**
       * The given member was added; see the transaction for who.
       **/
      MemberAdded: AugmentedEvent<ApiType, []>;
      /**
       * The given member was removed; see the transaction for who.
       **/
      MemberRemoved: AugmentedEvent<ApiType, []>;
      /**
       * The membership was reset; see the transaction for who the new set is.
       **/
      MembersReset: AugmentedEvent<ApiType, []>;
      /**
       * Two members were swapped; see the transaction for who.
       **/
      MembersSwapped: AugmentedEvent<ApiType, []>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    homa: {
      /**
       * The frequency to bump era has been updated.
       **/
      BumpEraFrequencyUpdated: AugmentedEvent<ApiType, [frequency: u32], { frequency: u32 }>;
      /**
       * The commission rate has been updated.
       **/
      CommissionRateUpdated: AugmentedEvent<ApiType, [commissionRate: u128], { commissionRate: u128 }>;
      /**
       * The current era has been bumped.
       **/
      CurrentEraBumped: AugmentedEvent<ApiType, [newEraIndex: u32], { newEraIndex: u32 }>;
      /**
       * The current era has been reset.
       **/
      CurrentEraReset: AugmentedEvent<ApiType, [newEraIndex: u32], { newEraIndex: u32 }>;
      /**
       * The estimated reward rate per era of relaychain staking has been updated.
       **/
      EstimatedRewardRatePerEraUpdated: AugmentedEvent<ApiType, [rewardRate: u128], { rewardRate: u128 }>;
      /**
       * The fast match fee rate has been updated.
       **/
      FastMatchFeeRateUpdated: AugmentedEvent<ApiType, [fastMatchFeeRate: u128], { fastMatchFeeRate: u128 }>;
      /**
       * The relaychain block number of last era bumped updated.
       **/
      LastEraBumpedBlockUpdated: AugmentedEvent<ApiType, [lastEraBumpedBlock: u32], { lastEraBumpedBlock: u32 }>;
      /**
       * The bonded amount of subaccount's ledger has been reset.
       **/
      LedgerBondedReset: AugmentedEvent<ApiType, [subAccountIndex: u16, newBondedAmount: u128], { subAccountIndex: u16, newBondedAmount: u128 }>;
      /**
       * The unlocking of subaccount's ledger has been reset.
       **/
      LedgerUnlockingReset: AugmentedEvent<ApiType, [subAccountIndex: u16, newUnlocking: Vec<ModuleHomaModuleUnlockChunk>], { subAccountIndex: u16, newUnlocking: Vec<ModuleHomaModuleUnlockChunk> }>;
      /**
       * The minter use staking currency to mint liquid currency.
       **/
      Minted: AugmentedEvent<ApiType, [minter: AccountId32, stakingCurrencyAmount: u128, liquidAmountReceived: u128, liquidAmountAddedToVoid: u128], { minter: AccountId32, stakingCurrencyAmount: u128, liquidAmountReceived: u128, liquidAmountAddedToVoid: u128 }>;
      /**
       * Redeem request is redeemed partially or fully by fast match.
       **/
      RedeemedByFastMatch: AugmentedEvent<ApiType, [redeemer: AccountId32, matchedLiquidAmount: u128, feeInLiquid: u128, redeemedStakingAmount: u128], { redeemer: AccountId32, matchedLiquidAmount: u128, feeInLiquid: u128, redeemedStakingAmount: u128 }>;
      /**
       * Redeem request is redeemed by unbond on relaychain.
       **/
      RedeemedByUnbond: AugmentedEvent<ApiType, [redeemer: AccountId32, eraIndexWhenUnbond: u32, liquidAmount: u128, unbondingStakingAmount: u128], { redeemer: AccountId32, eraIndexWhenUnbond: u32, liquidAmount: u128, unbondingStakingAmount: u128 }>;
      /**
       * Redeem request has been cancelled.
       **/
      RedeemRequestCancelled: AugmentedEvent<ApiType, [redeemer: AccountId32, cancelledLiquidAmount: u128], { redeemer: AccountId32, cancelledLiquidAmount: u128 }>;
      /**
       * Request redeem.
       **/
      RequestedRedeem: AugmentedEvent<ApiType, [redeemer: AccountId32, liquidAmount: u128, allowFastMatch: bool], { redeemer: AccountId32, liquidAmount: u128, allowFastMatch: bool }>;
      /**
       * The soft bonded cap of per sub account has been updated.
       **/
      SoftBondedCapPerSubAccountUpdated: AugmentedEvent<ApiType, [capAmount: u128], { capAmount: u128 }>;
      /**
       * The redeemer withdraw expired redemption.
       **/
      WithdrawRedemption: AugmentedEvent<ApiType, [redeemer: AccountId32, redemptionAmount: u128], { redeemer: AccountId32, redemptionAmount: u128 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    homaCouncil: {
      /**
       * A motion was approved by the required threshold.
       **/
      Approved: AugmentedEvent<ApiType, [proposalHash: H256], { proposalHash: H256 }>;
      /**
       * A proposal was closed because its threshold was reached or after its duration was up.
       **/
      Closed: AugmentedEvent<ApiType, [proposalHash: H256, yes: u32, no: u32], { proposalHash: H256, yes: u32, no: u32 }>;
      /**
       * A motion was not approved by the required threshold.
       **/
      Disapproved: AugmentedEvent<ApiType, [proposalHash: H256], { proposalHash: H256 }>;
      /**
       * A motion was executed; result will be `Ok` if it returned without error.
       **/
      Executed: AugmentedEvent<ApiType, [proposalHash: H256, result: Result<Null, SpRuntimeDispatchError>], { proposalHash: H256, result: Result<Null, SpRuntimeDispatchError> }>;
      /**
       * A single member did some action; result will be `Ok` if it returned without error.
       **/
      MemberExecuted: AugmentedEvent<ApiType, [proposalHash: H256, result: Result<Null, SpRuntimeDispatchError>], { proposalHash: H256, result: Result<Null, SpRuntimeDispatchError> }>;
      /**
       * A motion (given hash) has been proposed (by given account) with a threshold (given
       * `MemberCount`).
       **/
      Proposed: AugmentedEvent<ApiType, [account: AccountId32, proposalIndex: u32, proposalHash: H256, threshold: u32], { account: AccountId32, proposalIndex: u32, proposalHash: H256, threshold: u32 }>;
      /**
       * A motion (given hash) has been voted on by given account, leaving
       * a tally (yes votes and no votes given respectively as `MemberCount`).
       **/
      Voted: AugmentedEvent<ApiType, [account: AccountId32, proposalHash: H256, voted: bool, yes: u32, no: u32], { account: AccountId32, proposalHash: H256, voted: bool, yes: u32, no: u32 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    homaCouncilMembership: {
      /**
       * Phantom member, never used.
       **/
      Dummy: AugmentedEvent<ApiType, []>;
      /**
       * One of the members' keys changed.
       **/
      KeyChanged: AugmentedEvent<ApiType, []>;
      /**
       * The given member was added; see the transaction for who.
       **/
      MemberAdded: AugmentedEvent<ApiType, []>;
      /**
       * The given member was removed; see the transaction for who.
       **/
      MemberRemoved: AugmentedEvent<ApiType, []>;
      /**
       * The membership was reset; see the transaction for who the new set is.
       **/
      MembersReset: AugmentedEvent<ApiType, []>;
      /**
       * Two members were swapped; see the transaction for who.
       **/
      MembersSwapped: AugmentedEvent<ApiType, []>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    honzon: {
      /**
       * Authorize someone to operate the loan of specific collateral.
       **/
      Authorization: AugmentedEvent<ApiType, [authorizer: AccountId32, authorizee: AccountId32, collateralType: AcalaPrimitivesCurrencyCurrencyId], { authorizer: AccountId32, authorizee: AccountId32, collateralType: AcalaPrimitivesCurrencyCurrencyId }>;
      /**
       * Transfers debit between two CDPs
       **/
      TransferDebit: AugmentedEvent<ApiType, [fromCurrency: AcalaPrimitivesCurrencyCurrencyId, toCurrency: AcalaPrimitivesCurrencyCurrencyId, amount: u128], { fromCurrency: AcalaPrimitivesCurrencyCurrencyId, toCurrency: AcalaPrimitivesCurrencyCurrencyId, amount: u128 }>;
      /**
       * Cancel the authorization of specific collateral for someone.
       **/
      UnAuthorization: AugmentedEvent<ApiType, [authorizer: AccountId32, authorizee: AccountId32, collateralType: AcalaPrimitivesCurrencyCurrencyId], { authorizer: AccountId32, authorizee: AccountId32, collateralType: AcalaPrimitivesCurrencyCurrencyId }>;
      /**
       * Cancel all authorization.
       **/
      UnAuthorizationAll: AugmentedEvent<ApiType, [authorizer: AccountId32], { authorizer: AccountId32 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    idleScheduler: {
      /**
       * A task is added.
       **/
      TaskAdded: AugmentedEvent<ApiType, [taskId: u32, task: MandalaRuntimeScheduledTasks], { taskId: u32, task: MandalaRuntimeScheduledTasks }>;
      /**
       * A task has been dispatched on_idle.
       **/
      TaskDispatched: AugmentedEvent<ApiType, [taskId: u32, result: Result<Null, SpRuntimeDispatchError>], { taskId: u32, result: Result<Null, SpRuntimeDispatchError> }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    incentives: {
      /**
       * Payout deduction rate updated.
       **/
      ClaimRewardDeductionRateUpdated: AugmentedEvent<ApiType, [pool: ModuleSupportIncentivesPoolId, deductionRate: u128], { pool: ModuleSupportIncentivesPoolId, deductionRate: u128 }>;
      /**
       * Claim rewards.
       **/
      ClaimRewards: AugmentedEvent<ApiType, [who: AccountId32, pool: ModuleSupportIncentivesPoolId, rewardCurrencyId: AcalaPrimitivesCurrencyCurrencyId, actualAmount: u128, deductionAmount: u128], { who: AccountId32, pool: ModuleSupportIncentivesPoolId, rewardCurrencyId: AcalaPrimitivesCurrencyCurrencyId, actualAmount: u128, deductionAmount: u128 }>;
      /**
       * Deposit DEX share.
       **/
      DepositDexShare: AugmentedEvent<ApiType, [who: AccountId32, dexShareType: AcalaPrimitivesCurrencyCurrencyId, deposit: u128], { who: AccountId32, dexShareType: AcalaPrimitivesCurrencyCurrencyId, deposit: u128 }>;
      /**
       * Incentive reward amount updated.
       **/
      IncentiveRewardAmountUpdated: AugmentedEvent<ApiType, [pool: ModuleSupportIncentivesPoolId, rewardCurrencyId: AcalaPrimitivesCurrencyCurrencyId, rewardAmountPerPeriod: u128], { pool: ModuleSupportIncentivesPoolId, rewardCurrencyId: AcalaPrimitivesCurrencyCurrencyId, rewardAmountPerPeriod: u128 }>;
      /**
       * Withdraw DEX share.
       **/
      WithdrawDexShare: AugmentedEvent<ApiType, [who: AccountId32, dexShareType: AcalaPrimitivesCurrencyCurrencyId, withdraw: u128], { who: AccountId32, dexShareType: AcalaPrimitivesCurrencyCurrencyId, withdraw: u128 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    indices: {
      /**
       * A account index was assigned.
       **/
      IndexAssigned: AugmentedEvent<ApiType, [who: AccountId32, index: u32], { who: AccountId32, index: u32 }>;
      /**
       * A account index has been freed up (unassigned).
       **/
      IndexFreed: AugmentedEvent<ApiType, [index: u32], { index: u32 }>;
      /**
       * A account index has been frozen to its current account ID.
       **/
      IndexFrozen: AugmentedEvent<ApiType, [index: u32, who: AccountId32], { index: u32, who: AccountId32 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    loans: {
      /**
       * Confiscate CDP's collateral assets and eliminate its debit.
       **/
      ConfiscateCollateralAndDebit: AugmentedEvent<ApiType, [owner: AccountId32, collateralType: AcalaPrimitivesCurrencyCurrencyId, confiscatedCollateralAmount: u128, deductDebitAmount: u128], { owner: AccountId32, collateralType: AcalaPrimitivesCurrencyCurrencyId, confiscatedCollateralAmount: u128, deductDebitAmount: u128 }>;
      /**
       * Position updated.
       **/
      PositionUpdated: AugmentedEvent<ApiType, [owner: AccountId32, collateralType: AcalaPrimitivesCurrencyCurrencyId, collateralAdjustment: i128, debitAdjustment: i128], { owner: AccountId32, collateralType: AcalaPrimitivesCurrencyCurrencyId, collateralAdjustment: i128, debitAdjustment: i128 }>;
      /**
       * Transfer loan.
       **/
      TransferLoan: AugmentedEvent<ApiType, [from: AccountId32, to: AccountId32, currencyId: AcalaPrimitivesCurrencyCurrencyId], { from: AccountId32, to: AccountId32, currencyId: AcalaPrimitivesCurrencyCurrencyId }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    multisig: {
      /**
       * A multisig operation has been approved by someone.
       **/
      MultisigApproval: AugmentedEvent<ApiType, [approving: AccountId32, timepoint: PalletMultisigTimepoint, multisig: AccountId32, callHash: U8aFixed], { approving: AccountId32, timepoint: PalletMultisigTimepoint, multisig: AccountId32, callHash: U8aFixed }>;
      /**
       * A multisig operation has been cancelled.
       **/
      MultisigCancelled: AugmentedEvent<ApiType, [cancelling: AccountId32, timepoint: PalletMultisigTimepoint, multisig: AccountId32, callHash: U8aFixed], { cancelling: AccountId32, timepoint: PalletMultisigTimepoint, multisig: AccountId32, callHash: U8aFixed }>;
      /**
       * A multisig operation has been executed.
       **/
      MultisigExecuted: AugmentedEvent<ApiType, [approving: AccountId32, timepoint: PalletMultisigTimepoint, multisig: AccountId32, callHash: U8aFixed, result: Result<Null, SpRuntimeDispatchError>], { approving: AccountId32, timepoint: PalletMultisigTimepoint, multisig: AccountId32, callHash: U8aFixed, result: Result<Null, SpRuntimeDispatchError> }>;
      /**
       * A new multisig operation has begun.
       **/
      NewMultisig: AugmentedEvent<ApiType, [approving: AccountId32, multisig: AccountId32, callHash: U8aFixed], { approving: AccountId32, multisig: AccountId32, callHash: U8aFixed }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    nft: {
      /**
       * Burned NFT token.
       **/
      BurnedToken: AugmentedEvent<ApiType, [owner: AccountId32, classId: u32, tokenId: u64], { owner: AccountId32, classId: u32, tokenId: u64 }>;
      /**
       * Burned NFT token with remark.
       **/
      BurnedTokenWithRemark: AugmentedEvent<ApiType, [owner: AccountId32, classId: u32, tokenId: u64, remarkHash: H256], { owner: AccountId32, classId: u32, tokenId: u64, remarkHash: H256 }>;
      /**
       * Created NFT class.
       **/
      CreatedClass: AugmentedEvent<ApiType, [owner: AccountId32, classId: u32], { owner: AccountId32, classId: u32 }>;
      /**
       * Destroyed NFT class.
       **/
      DestroyedClass: AugmentedEvent<ApiType, [owner: AccountId32, classId: u32], { owner: AccountId32, classId: u32 }>;
      /**
       * Minted NFT token.
       **/
      MintedToken: AugmentedEvent<ApiType, [from: AccountId32, to: AccountId32, classId: u32, quantity: u32], { from: AccountId32, to: AccountId32, classId: u32, quantity: u32 }>;
      /**
       * Transferred NFT token.
       **/
      TransferredToken: AugmentedEvent<ApiType, [from: AccountId32, to: AccountId32, classId: u32, tokenId: u64], { from: AccountId32, to: AccountId32, classId: u32, tokenId: u64 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    nomineesElection: {
      Rebond: AugmentedEvent<ApiType, [who: AccountId32, amount: u128], { who: AccountId32, amount: u128 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    operatorMembershipAcala: {
      /**
       * Phantom member, never used.
       **/
      Dummy: AugmentedEvent<ApiType, []>;
      /**
       * One of the members' keys changed.
       **/
      KeyChanged: AugmentedEvent<ApiType, []>;
      /**
       * The given member was added; see the transaction for who.
       **/
      MemberAdded: AugmentedEvent<ApiType, []>;
      /**
       * The given member was removed; see the transaction for who.
       **/
      MemberRemoved: AugmentedEvent<ApiType, []>;
      /**
       * The membership was reset; see the transaction for who the new set is.
       **/
      MembersReset: AugmentedEvent<ApiType, []>;
      /**
       * Two members were swapped; see the transaction for who.
       **/
      MembersSwapped: AugmentedEvent<ApiType, []>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    ormlXcm: {
      /**
       * XCM message sent. \[to, message\]
       **/
      Sent: AugmentedEvent<ApiType, [to: XcmV1MultiLocation, message: XcmV2Xcm], { to: XcmV1MultiLocation, message: XcmV2Xcm }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    parachainSystem: {
      /**
       * Downward messages were processed using the given weight.
       **/
      DownwardMessagesProcessed: AugmentedEvent<ApiType, [weightUsed: u64, dmqHead: H256], { weightUsed: u64, dmqHead: H256 }>;
      /**
       * Some downward messages have been received and will be processed.
       **/
      DownwardMessagesReceived: AugmentedEvent<ApiType, [count: u32], { count: u32 }>;
      /**
       * An upgrade has been authorized.
       **/
      UpgradeAuthorized: AugmentedEvent<ApiType, [codeHash: H256], { codeHash: H256 }>;
      /**
       * The validation function was applied as of the contained relay chain block number.
       **/
      ValidationFunctionApplied: AugmentedEvent<ApiType, [relayChainBlockNum: u32], { relayChainBlockNum: u32 }>;
      /**
       * The relay-chain aborted the upgrade process.
       **/
      ValidationFunctionDiscarded: AugmentedEvent<ApiType, []>;
      /**
       * The validation function has been scheduled to apply.
       **/
      ValidationFunctionStored: AugmentedEvent<ApiType, []>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    payments: {
      /**
       * Payment has been cancelled by the creator
       **/
      PaymentCancelled: AugmentedEvent<ApiType, [from: AccountId32, to: AccountId32], { from: AccountId32, to: AccountId32 }>;
      /**
       * A new payment has been created
       **/
      PaymentCreated: AugmentedEvent<ApiType, [from: AccountId32, asset: AcalaPrimitivesCurrencyCurrencyId, amount: u128, remark: Option<Bytes>], { from: AccountId32, asset: AcalaPrimitivesCurrencyCurrencyId, amount: u128, remark: Option<Bytes> }>;
      /**
       * the payment creator has created a refund request
       **/
      PaymentCreatorRequestedRefund: AugmentedEvent<ApiType, [from: AccountId32, to: AccountId32, expiry: u32], { from: AccountId32, to: AccountId32, expiry: u32 }>;
      /**
       * the refund request from creator was disputed by recipient
       **/
      PaymentRefundDisputed: AugmentedEvent<ApiType, [from: AccountId32, to: AccountId32], { from: AccountId32, to: AccountId32 }>;
      /**
       * Payment amount released to the recipient
       **/
      PaymentReleased: AugmentedEvent<ApiType, [from: AccountId32, to: AccountId32], { from: AccountId32, to: AccountId32 }>;
      /**
       * Payment request was completed by sender
       **/
      PaymentRequestCompleted: AugmentedEvent<ApiType, [from: AccountId32, to: AccountId32], { from: AccountId32, to: AccountId32 }>;
      /**
       * Payment request was created by recipient
       **/
      PaymentRequestCreated: AugmentedEvent<ApiType, [from: AccountId32, to: AccountId32], { from: AccountId32, to: AccountId32 }>;
      /**
       * A payment that NeedsReview has been resolved by Judge
       **/
      PaymentResolved: AugmentedEvent<ApiType, [from: AccountId32, to: AccountId32, recipientShare: Percent], { from: AccountId32, to: AccountId32, recipientShare: Percent }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    phragmenElection: {
      /**
       * A candidate was slashed by amount due to failing to obtain a seat as member or
       * runner-up.
       * 
       * Note that old members and runners-up are also candidates.
       **/
      CandidateSlashed: AugmentedEvent<ApiType, [candidate: AccountId32, amount: u128], { candidate: AccountId32, amount: u128 }>;
      /**
       * Internal error happened while trying to perform election.
       **/
      ElectionError: AugmentedEvent<ApiType, []>;
      /**
       * No (or not enough) candidates existed for this round. This is different from
       * `NewTerm(\[\])`. See the description of `NewTerm`.
       **/
      EmptyTerm: AugmentedEvent<ApiType, []>;
      /**
       * A member has been removed. This should always be followed by either `NewTerm` or
       * `EmptyTerm`.
       **/
      MemberKicked: AugmentedEvent<ApiType, [member: AccountId32], { member: AccountId32 }>;
      /**
       * A new term with new_members. This indicates that enough candidates existed to run
       * the election, not that enough have has been elected. The inner value must be examined
       * for this purpose. A `NewTerm(\[\])` indicates that some candidates got their bond
       * slashed and none were elected, whilst `EmptyTerm` means that no candidates existed to
       * begin with.
       **/
      NewTerm: AugmentedEvent<ApiType, [newMembers: Vec<ITuple<[AccountId32, u128]>>], { newMembers: Vec<ITuple<[AccountId32, u128]>> }>;
      /**
       * Someone has renounced their candidacy.
       **/
      Renounced: AugmentedEvent<ApiType, [candidate: AccountId32], { candidate: AccountId32 }>;
      /**
       * A seat holder was slashed by amount by being forcefully removed from the set.
       **/
      SeatHolderSlashed: AugmentedEvent<ApiType, [seatHolder: AccountId32, amount: u128], { seatHolder: AccountId32, amount: u128 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    polkadotXcm: {
      /**
       * Some assets have been placed in an asset trap.
       * 
       * \[ hash, origin, assets \]
       **/
      AssetsTrapped: AugmentedEvent<ApiType, [H256, XcmV1MultiLocation, XcmVersionedMultiAssets]>;
      /**
       * Execution of an XCM message was attempted.
       * 
       * \[ outcome \]
       **/
      Attempted: AugmentedEvent<ApiType, [XcmV2TraitsOutcome]>;
      /**
       * Expected query response has been received but the origin location of the response does
       * not match that expected. The query remains registered for a later, valid, response to
       * be received and acted upon.
       * 
       * \[ origin location, id, expected location \]
       **/
      InvalidResponder: AugmentedEvent<ApiType, [XcmV1MultiLocation, u64, Option<XcmV1MultiLocation>]>;
      /**
       * Expected query response has been received but the expected origin location placed in
       * storage by this runtime previously cannot be decoded. The query remains registered.
       * 
       * This is unexpected (since a location placed in storage in a previously executing
       * runtime should be readable prior to query timeout) and dangerous since the possibly
       * valid response will be dropped. Manual governance intervention is probably going to be
       * needed.
       * 
       * \[ origin location, id \]
       **/
      InvalidResponderVersion: AugmentedEvent<ApiType, [XcmV1MultiLocation, u64]>;
      /**
       * Query response has been received and query is removed. The registered notification has
       * been dispatched and executed successfully.
       * 
       * \[ id, pallet index, call index \]
       **/
      Notified: AugmentedEvent<ApiType, [u64, u8, u8]>;
      /**
       * Query response has been received and query is removed. The dispatch was unable to be
       * decoded into a `Call`; this might be due to dispatch function having a signature which
       * is not `(origin, QueryId, Response)`.
       * 
       * \[ id, pallet index, call index \]
       **/
      NotifyDecodeFailed: AugmentedEvent<ApiType, [u64, u8, u8]>;
      /**
       * Query response has been received and query is removed. There was a general error with
       * dispatching the notification call.
       * 
       * \[ id, pallet index, call index \]
       **/
      NotifyDispatchError: AugmentedEvent<ApiType, [u64, u8, u8]>;
      /**
       * Query response has been received and query is removed. The registered notification could
       * not be dispatched because the dispatch weight is greater than the maximum weight
       * originally budgeted by this runtime for the query result.
       * 
       * \[ id, pallet index, call index, actual weight, max budgeted weight \]
       **/
      NotifyOverweight: AugmentedEvent<ApiType, [u64, u8, u8, u64, u64]>;
      /**
       * A given location which had a version change subscription was dropped owing to an error
       * migrating the location to our new XCM format.
       * 
       * \[ location, query ID \]
       **/
      NotifyTargetMigrationFail: AugmentedEvent<ApiType, [XcmVersionedMultiLocation, u64]>;
      /**
       * A given location which had a version change subscription was dropped owing to an error
       * sending the notification to it.
       * 
       * \[ location, query ID, error \]
       **/
      NotifyTargetSendFail: AugmentedEvent<ApiType, [XcmV1MultiLocation, u64, XcmV2TraitsError]>;
      /**
       * Query response has been received and is ready for taking with `take_response`. There is
       * no registered notification call.
       * 
       * \[ id, response \]
       **/
      ResponseReady: AugmentedEvent<ApiType, [u64, XcmV2Response]>;
      /**
       * Received query response has been read and removed.
       * 
       * \[ id \]
       **/
      ResponseTaken: AugmentedEvent<ApiType, [u64]>;
      /**
       * A XCM message was sent.
       * 
       * \[ origin, destination, message \]
       **/
      Sent: AugmentedEvent<ApiType, [XcmV1MultiLocation, XcmV1MultiLocation, XcmV2Xcm]>;
      /**
       * The supported version of a location has been changed. This might be through an
       * automatic notification or a manual intervention.
       * 
       * \[ location, XCM version \]
       **/
      SupportedVersionChanged: AugmentedEvent<ApiType, [XcmV1MultiLocation, u32]>;
      /**
       * Query response received which does not match a registered query. This may be because a
       * matching query was never registered, it may be because it is a duplicate response, or
       * because the query timed out.
       * 
       * \[ origin location, id \]
       **/
      UnexpectedResponse: AugmentedEvent<ApiType, [XcmV1MultiLocation, u64]>;
      /**
       * An XCM version change notification message has been attempted to be sent.
       * 
       * \[ destination, result \]
       **/
      VersionChangeNotified: AugmentedEvent<ApiType, [XcmV1MultiLocation, u32]>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    preimage: {
      /**
       * A preimage has ben cleared.
       **/
      Cleared: AugmentedEvent<ApiType, [hash_: H256], { hash_: H256 }>;
      /**
       * A preimage has been noted.
       **/
      Noted: AugmentedEvent<ApiType, [hash_: H256], { hash_: H256 }>;
      /**
       * A preimage has been requested.
       **/
      Requested: AugmentedEvent<ApiType, [hash_: H256], { hash_: H256 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    prices: {
      /**
       * Lock price.
       **/
      LockPrice: AugmentedEvent<ApiType, [currencyId: AcalaPrimitivesCurrencyCurrencyId, lockedPrice: u128], { currencyId: AcalaPrimitivesCurrencyCurrencyId, lockedPrice: u128 }>;
      /**
       * Unlock price.
       **/
      UnlockPrice: AugmentedEvent<ApiType, [currencyId: AcalaPrimitivesCurrencyCurrencyId], { currencyId: AcalaPrimitivesCurrencyCurrencyId }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    proxy: {
      /**
       * An announcement was placed to make a call in the future.
       **/
      Announced: AugmentedEvent<ApiType, [real: AccountId32, proxy: AccountId32, callHash: H256], { real: AccountId32, proxy: AccountId32, callHash: H256 }>;
      /**
       * Anonymous account has been created by new proxy with given
       * disambiguation index and proxy type.
       **/
      AnonymousCreated: AugmentedEvent<ApiType, [anonymous: AccountId32, who: AccountId32, proxyType: RuntimeCommonProxyType, disambiguationIndex: u16], { anonymous: AccountId32, who: AccountId32, proxyType: RuntimeCommonProxyType, disambiguationIndex: u16 }>;
      /**
       * A proxy was added.
       **/
      ProxyAdded: AugmentedEvent<ApiType, [delegator: AccountId32, delegatee: AccountId32, proxyType: RuntimeCommonProxyType, delay: u32], { delegator: AccountId32, delegatee: AccountId32, proxyType: RuntimeCommonProxyType, delay: u32 }>;
      /**
       * A proxy was executed correctly, with the given.
       **/
      ProxyExecuted: AugmentedEvent<ApiType, [result: Result<Null, SpRuntimeDispatchError>], { result: Result<Null, SpRuntimeDispatchError> }>;
      /**
       * A proxy was removed.
       **/
      ProxyRemoved: AugmentedEvent<ApiType, [delegator: AccountId32, delegatee: AccountId32, proxyType: RuntimeCommonProxyType, delay: u32], { delegator: AccountId32, delegatee: AccountId32, proxyType: RuntimeCommonProxyType, delay: u32 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    recovery: {
      /**
       * Lost account has been successfully recovered by rescuer account.
       **/
      AccountRecovered: AugmentedEvent<ApiType, [lostAccount: AccountId32, rescuerAccount: AccountId32], { lostAccount: AccountId32, rescuerAccount: AccountId32 }>;
      /**
       * A recovery process for lost account by rescuer account has been closed.
       **/
      RecoveryClosed: AugmentedEvent<ApiType, [lostAccount: AccountId32, rescuerAccount: AccountId32], { lostAccount: AccountId32, rescuerAccount: AccountId32 }>;
      /**
       * A recovery process has been set up for an account.
       **/
      RecoveryCreated: AugmentedEvent<ApiType, [account: AccountId32], { account: AccountId32 }>;
      /**
       * A recovery process has been initiated for lost account by rescuer account.
       **/
      RecoveryInitiated: AugmentedEvent<ApiType, [lostAccount: AccountId32, rescuerAccount: AccountId32], { lostAccount: AccountId32, rescuerAccount: AccountId32 }>;
      /**
       * A recovery process has been removed for an account.
       **/
      RecoveryRemoved: AugmentedEvent<ApiType, [lostAccount: AccountId32], { lostAccount: AccountId32 }>;
      /**
       * A recovery process for lost account by rescuer account has been vouched for by sender.
       **/
      RecoveryVouched: AugmentedEvent<ApiType, [lostAccount: AccountId32, rescuerAccount: AccountId32, sender: AccountId32], { lostAccount: AccountId32, rescuerAccount: AccountId32, sender: AccountId32 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    renVmBridge: {
      /**
       * Asset burnt in this chain.
       **/
      Burnt: AugmentedEvent<ApiType, [owner: AccountId32, dest: Bytes, amount: u128], { owner: AccountId32, dest: Bytes, amount: u128 }>;
      /**
       * Asset minted.
       **/
      Minted: AugmentedEvent<ApiType, [owner: AccountId32, amount: u128], { owner: AccountId32, amount: u128 }>;
      /**
       * Rotated key
       **/
      RotatedKey: AugmentedEvent<ApiType, [key: U8aFixed], { key: U8aFixed }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    scheduler: {
      /**
       * The call for the provided hash was not found so the task has been aborted.
       **/
      CallLookupFailed: AugmentedEvent<ApiType, [task: ITuple<[u32, u32]>, id: Option<Bytes>, error: FrameSupportScheduleLookupError], { task: ITuple<[u32, u32]>, id: Option<Bytes>, error: FrameSupportScheduleLookupError }>;
      /**
       * Canceled some task.
       **/
      Canceled: AugmentedEvent<ApiType, [when: u32, index: u32], { when: u32, index: u32 }>;
      /**
       * Dispatched some task.
       **/
      Dispatched: AugmentedEvent<ApiType, [task: ITuple<[u32, u32]>, id: Option<Bytes>, result: Result<Null, SpRuntimeDispatchError>], { task: ITuple<[u32, u32]>, id: Option<Bytes>, result: Result<Null, SpRuntimeDispatchError> }>;
      /**
       * Scheduled some task.
       **/
      Scheduled: AugmentedEvent<ApiType, [when: u32, index: u32], { when: u32, index: u32 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    session: {
      /**
       * New session has happened. Note that the argument is the session index, not the
       * block number as the type might suggest.
       **/
      NewSession: AugmentedEvent<ApiType, [sessionIndex: u32], { sessionIndex: u32 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    sessionManager: {
      /**
       * Scheduled session duration.
       **/
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
    starport: {
      /**
       * User has locked some asset and uploaded them into Compound.
       **/
      AssetLockedTo: AugmentedEvent<ApiType, [currencyId: AcalaPrimitivesCurrencyCurrencyId, amount: u128, user: AccountId32], { currencyId: AcalaPrimitivesCurrencyCurrencyId, amount: u128, user: AccountId32 }>;
      /**
       * The user has unlocked some asset and downloaded them back into Acala.
       **/
      AssetUnlocked: AugmentedEvent<ApiType, [currencyId: AcalaPrimitivesCurrencyCurrencyId, amount: u128, user: AccountId32], { currencyId: AcalaPrimitivesCurrencyCurrencyId, amount: u128, user: AccountId32 }>;
      /**
       * The future yield for CASH is set.
       **/
      FutureYieldSet: AugmentedEvent<ApiType, [yieldAmount: u128, index: u128, timestamp: u64], { yieldAmount: u128, index: u128, timestamp: u64 }>;
      /**
       * The list of authorities has been updated.
       **/
      GatewayAuthoritiesChanged: AugmentedEvent<ApiType, []>;
      /**
       * The supply cap for an asset has been updated.
       **/
      SupplyCapSet: AugmentedEvent<ApiType, [currencyId: AcalaPrimitivesCurrencyCurrencyId, newCap: u128], { currencyId: AcalaPrimitivesCurrencyCurrencyId, newCap: u128 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    sudo: {
      /**
       * The \[sudoer\] just switched identity; the old key is supplied if one existed.
       **/
      KeyChanged: AugmentedEvent<ApiType, [oldSudoer: Option<AccountId32>], { oldSudoer: Option<AccountId32> }>;
      /**
       * A sudo just took place. \[result\]
       **/
      Sudid: AugmentedEvent<ApiType, [sudoResult: Result<Null, SpRuntimeDispatchError>], { sudoResult: Result<Null, SpRuntimeDispatchError> }>;
      /**
       * A sudo just took place. \[result\]
       **/
      SudoAsDone: AugmentedEvent<ApiType, [sudoResult: Result<Null, SpRuntimeDispatchError>], { sudoResult: Result<Null, SpRuntimeDispatchError> }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    system: {
      /**
       * `:code` was updated.
       **/
      CodeUpdated: AugmentedEvent<ApiType, []>;
      /**
       * An extrinsic failed.
       **/
      ExtrinsicFailed: AugmentedEvent<ApiType, [dispatchError: SpRuntimeDispatchError, dispatchInfo: FrameSupportWeightsDispatchInfo], { dispatchError: SpRuntimeDispatchError, dispatchInfo: FrameSupportWeightsDispatchInfo }>;
      /**
       * An extrinsic completed successfully.
       **/
      ExtrinsicSuccess: AugmentedEvent<ApiType, [dispatchInfo: FrameSupportWeightsDispatchInfo], { dispatchInfo: FrameSupportWeightsDispatchInfo }>;
      /**
       * An account was reaped.
       **/
      KilledAccount: AugmentedEvent<ApiType, [account: AccountId32], { account: AccountId32 }>;
      /**
       * A new account was created.
       **/
      NewAccount: AugmentedEvent<ApiType, [account: AccountId32], { account: AccountId32 }>;
      /**
       * On on-chain remark happened.
       **/
      Remarked: AugmentedEvent<ApiType, [sender: AccountId32, hash_: H256], { sender: AccountId32, hash_: H256 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    technicalCommittee: {
      /**
       * A motion was approved by the required threshold.
       **/
      Approved: AugmentedEvent<ApiType, [proposalHash: H256], { proposalHash: H256 }>;
      /**
       * A proposal was closed because its threshold was reached or after its duration was up.
       **/
      Closed: AugmentedEvent<ApiType, [proposalHash: H256, yes: u32, no: u32], { proposalHash: H256, yes: u32, no: u32 }>;
      /**
       * A motion was not approved by the required threshold.
       **/
      Disapproved: AugmentedEvent<ApiType, [proposalHash: H256], { proposalHash: H256 }>;
      /**
       * A motion was executed; result will be `Ok` if it returned without error.
       **/
      Executed: AugmentedEvent<ApiType, [proposalHash: H256, result: Result<Null, SpRuntimeDispatchError>], { proposalHash: H256, result: Result<Null, SpRuntimeDispatchError> }>;
      /**
       * A single member did some action; result will be `Ok` if it returned without error.
       **/
      MemberExecuted: AugmentedEvent<ApiType, [proposalHash: H256, result: Result<Null, SpRuntimeDispatchError>], { proposalHash: H256, result: Result<Null, SpRuntimeDispatchError> }>;
      /**
       * A motion (given hash) has been proposed (by given account) with a threshold (given
       * `MemberCount`).
       **/
      Proposed: AugmentedEvent<ApiType, [account: AccountId32, proposalIndex: u32, proposalHash: H256, threshold: u32], { account: AccountId32, proposalIndex: u32, proposalHash: H256, threshold: u32 }>;
      /**
       * A motion (given hash) has been voted on by given account, leaving
       * a tally (yes votes and no votes given respectively as `MemberCount`).
       **/
      Voted: AugmentedEvent<ApiType, [account: AccountId32, proposalHash: H256, voted: bool, yes: u32, no: u32], { account: AccountId32, proposalHash: H256, voted: bool, yes: u32, no: u32 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    technicalCommitteeMembership: {
      /**
       * Phantom member, never used.
       **/
      Dummy: AugmentedEvent<ApiType, []>;
      /**
       * One of the members' keys changed.
       **/
      KeyChanged: AugmentedEvent<ApiType, []>;
      /**
       * The given member was added; see the transaction for who.
       **/
      MemberAdded: AugmentedEvent<ApiType, []>;
      /**
       * The given member was removed; see the transaction for who.
       **/
      MemberRemoved: AugmentedEvent<ApiType, []>;
      /**
       * The membership was reset; see the transaction for who the new set is.
       **/
      MembersReset: AugmentedEvent<ApiType, []>;
      /**
       * Two members were swapped; see the transaction for who.
       **/
      MembersSwapped: AugmentedEvent<ApiType, []>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    tips: {
      /**
       * A new tip suggestion has been opened.
       **/
      NewTip: AugmentedEvent<ApiType, [tipHash: H256], { tipHash: H256 }>;
      /**
       * A tip suggestion has been closed.
       **/
      TipClosed: AugmentedEvent<ApiType, [tipHash: H256, who: AccountId32, payout: u128], { tipHash: H256, who: AccountId32, payout: u128 }>;
      /**
       * A tip suggestion has reached threshold and is closing.
       **/
      TipClosing: AugmentedEvent<ApiType, [tipHash: H256], { tipHash: H256 }>;
      /**
       * A tip suggestion has been retracted.
       **/
      TipRetracted: AugmentedEvent<ApiType, [tipHash: H256], { tipHash: H256 }>;
      /**
       * A tip suggestion has been slashed.
       **/
      TipSlashed: AugmentedEvent<ApiType, [tipHash: H256, finder: AccountId32, deposit: u128], { tipHash: H256, finder: AccountId32, deposit: u128 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    tokens: {
      /**
       * A balance was set by root.
       **/
      BalanceSet: AugmentedEvent<ApiType, [currencyId: AcalaPrimitivesCurrencyCurrencyId, who: AccountId32, free: u128, reserved: u128], { currencyId: AcalaPrimitivesCurrencyCurrencyId, who: AccountId32, free: u128, reserved: u128 }>;
      /**
       * Deposited some balance into an account
       **/
      Deposited: AugmentedEvent<ApiType, [currencyId: AcalaPrimitivesCurrencyCurrencyId, who: AccountId32, amount: u128], { currencyId: AcalaPrimitivesCurrencyCurrencyId, who: AccountId32, amount: u128 }>;
      /**
       * An account was removed whose balance was non-zero but below
       * ExistentialDeposit, resulting in an outright loss.
       **/
      DustLost: AugmentedEvent<ApiType, [currencyId: AcalaPrimitivesCurrencyCurrencyId, who: AccountId32, amount: u128], { currencyId: AcalaPrimitivesCurrencyCurrencyId, who: AccountId32, amount: u128 }>;
      /**
       * An account was created with some free balance.
       **/
      Endowed: AugmentedEvent<ApiType, [currencyId: AcalaPrimitivesCurrencyCurrencyId, who: AccountId32, amount: u128], { currencyId: AcalaPrimitivesCurrencyCurrencyId, who: AccountId32, amount: u128 }>;
      /**
       * Some locked funds were unlocked
       **/
      LockRemoved: AugmentedEvent<ApiType, [lockId: U8aFixed, currencyId: AcalaPrimitivesCurrencyCurrencyId, who: AccountId32], { lockId: U8aFixed, currencyId: AcalaPrimitivesCurrencyCurrencyId, who: AccountId32 }>;
      /**
       * Some funds are locked
       **/
      LockSet: AugmentedEvent<ApiType, [lockId: U8aFixed, currencyId: AcalaPrimitivesCurrencyCurrencyId, who: AccountId32, amount: u128], { lockId: U8aFixed, currencyId: AcalaPrimitivesCurrencyCurrencyId, who: AccountId32, amount: u128 }>;
      /**
       * Some balance was reserved (moved from free to reserved).
       **/
      Reserved: AugmentedEvent<ApiType, [currencyId: AcalaPrimitivesCurrencyCurrencyId, who: AccountId32, amount: u128], { currencyId: AcalaPrimitivesCurrencyCurrencyId, who: AccountId32, amount: u128 }>;
      /**
       * Some reserved balance was repatriated (moved from reserved to
       * another account).
       **/
      ReserveRepatriated: AugmentedEvent<ApiType, [currencyId: AcalaPrimitivesCurrencyCurrencyId, from: AccountId32, to: AccountId32, amount: u128, status: FrameSupportTokensMiscBalanceStatus], { currencyId: AcalaPrimitivesCurrencyCurrencyId, from: AccountId32, to: AccountId32, amount: u128, status: FrameSupportTokensMiscBalanceStatus }>;
      /**
       * Some balances were slashed (e.g. due to mis-behavior)
       **/
      Slashed: AugmentedEvent<ApiType, [currencyId: AcalaPrimitivesCurrencyCurrencyId, who: AccountId32, freeAmount: u128, reservedAmount: u128], { currencyId: AcalaPrimitivesCurrencyCurrencyId, who: AccountId32, freeAmount: u128, reservedAmount: u128 }>;
      /**
       * The total issuance of an currency has been set
       **/
      TotalIssuanceSet: AugmentedEvent<ApiType, [currencyId: AcalaPrimitivesCurrencyCurrencyId, amount: u128], { currencyId: AcalaPrimitivesCurrencyCurrencyId, amount: u128 }>;
      /**
       * Transfer succeeded.
       **/
      Transfer: AugmentedEvent<ApiType, [currencyId: AcalaPrimitivesCurrencyCurrencyId, from: AccountId32, to: AccountId32, amount: u128], { currencyId: AcalaPrimitivesCurrencyCurrencyId, from: AccountId32, to: AccountId32, amount: u128 }>;
      /**
       * Some balance was unreserved (moved from reserved to free).
       **/
      Unreserved: AugmentedEvent<ApiType, [currencyId: AcalaPrimitivesCurrencyCurrencyId, who: AccountId32, amount: u128], { currencyId: AcalaPrimitivesCurrencyCurrencyId, who: AccountId32, amount: u128 }>;
      /**
       * Some balances were withdrawn (e.g. pay for transaction fee)
       **/
      Withdrawn: AugmentedEvent<ApiType, [currencyId: AcalaPrimitivesCurrencyCurrencyId, who: AccountId32, amount: u128], { currencyId: AcalaPrimitivesCurrencyCurrencyId, who: AccountId32, amount: u128 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    transactionPause: {
      /**
       * Paused transaction
       **/
      TransactionPaused: AugmentedEvent<ApiType, [palletNameBytes: Bytes, functionNameBytes: Bytes], { palletNameBytes: Bytes, functionNameBytes: Bytes }>;
      /**
       * Unpaused transaction
       **/
      TransactionUnpaused: AugmentedEvent<ApiType, [palletNameBytes: Bytes, functionNameBytes: Bytes], { palletNameBytes: Bytes, functionNameBytes: Bytes }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    transactionPayment: {
      /**
       * The charge fee pool is disabled
       **/
      ChargeFeePoolDisabled: AugmentedEvent<ApiType, [currencyId: AcalaPrimitivesCurrencyCurrencyId, foreignAmount: u128, nativeAmount: u128], { currencyId: AcalaPrimitivesCurrencyCurrencyId, foreignAmount: u128, nativeAmount: u128 }>;
      /**
       * The charge fee pool is enabled
       **/
      ChargeFeePoolEnabled: AugmentedEvent<ApiType, [subAccount: AccountId32, currencyId: AcalaPrimitivesCurrencyCurrencyId, exchangeRate: u128, poolSize: u128, swapThreshold: u128], { subAccount: AccountId32, currencyId: AcalaPrimitivesCurrencyCurrencyId, exchangeRate: u128, poolSize: u128, swapThreshold: u128 }>;
      /**
       * The charge fee pool is swapped
       **/
      ChargeFeePoolSwapped: AugmentedEvent<ApiType, [subAccount: AccountId32, supplyCurrencyId: AcalaPrimitivesCurrencyCurrencyId, oldExchangeRate: u128, swapExchangeRate: u128, newExchangeRate: u128, newPoolSize: u128], { subAccount: AccountId32, supplyCurrencyId: AcalaPrimitivesCurrencyCurrencyId, oldExchangeRate: u128, swapExchangeRate: u128, newExchangeRate: u128, newPoolSize: u128 }>;
      /**
       * A transaction `actual_fee`, of which `actual_tip` was added to the minimum inclusion
       * fee, has been paid by `who`. `actual_surplus` indicate extra amount when paid by none
       * native token.
       **/
      TransactionFeePaid: AugmentedEvent<ApiType, [who: AccountId32, actualFee: u128, actualTip: u128, actualSurplus: u128], { who: AccountId32, actualFee: u128, actualTip: u128, actualSurplus: u128 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    treasury: {
      /**
       * Some funds have been allocated.
       **/
      Awarded: AugmentedEvent<ApiType, [proposalIndex: u32, award: u128, account: AccountId32], { proposalIndex: u32, award: u128, account: AccountId32 }>;
      /**
       * Some of our funds have been burnt.
       **/
      Burnt: AugmentedEvent<ApiType, [burntFunds: u128], { burntFunds: u128 }>;
      /**
       * Some funds have been deposited.
       **/
      Deposit: AugmentedEvent<ApiType, [value: u128], { value: u128 }>;
      /**
       * New proposal.
       **/
      Proposed: AugmentedEvent<ApiType, [proposalIndex: u32], { proposalIndex: u32 }>;
      /**
       * A proposal was rejected; funds were slashed.
       **/
      Rejected: AugmentedEvent<ApiType, [proposalIndex: u32, slashed: u128], { proposalIndex: u32, slashed: u128 }>;
      /**
       * Spending has finished; this is the amount that rolls over until next spend.
       **/
      Rollover: AugmentedEvent<ApiType, [rolloverBalance: u128], { rolloverBalance: u128 }>;
      /**
       * A new spend proposal has been approved.
       **/
      SpendApproved: AugmentedEvent<ApiType, [proposalIndex: u32, amount: u128, beneficiary: AccountId32], { proposalIndex: u32, amount: u128, beneficiary: AccountId32 }>;
      /**
       * We have ended a spend period and will now allocate funds.
       **/
      Spending: AugmentedEvent<ApiType, [budgetRemaining: u128], { budgetRemaining: u128 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    unknownTokens: {
      /**
       * Deposit success.
       **/
      Deposited: AugmentedEvent<ApiType, [asset: XcmV1MultiAsset, who: XcmV1MultiLocation], { asset: XcmV1MultiAsset, who: XcmV1MultiLocation }>;
      /**
       * Withdraw success.
       **/
      Withdrawn: AugmentedEvent<ApiType, [asset: XcmV1MultiAsset, who: XcmV1MultiLocation], { asset: XcmV1MultiAsset, who: XcmV1MultiLocation }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    utility: {
      /**
       * Batch of dispatches completed fully with no error.
       **/
      BatchCompleted: AugmentedEvent<ApiType, []>;
      /**
       * Batch of dispatches completed but has errors.
       **/
      BatchCompletedWithErrors: AugmentedEvent<ApiType, []>;
      /**
       * Batch of dispatches did not complete fully. Index of first failing dispatch given, as
       * well as the error.
       **/
      BatchInterrupted: AugmentedEvent<ApiType, [index: u32, error: SpRuntimeDispatchError], { index: u32, error: SpRuntimeDispatchError }>;
      /**
       * A call was dispatched.
       **/
      DispatchedAs: AugmentedEvent<ApiType, [result: Result<Null, SpRuntimeDispatchError>], { result: Result<Null, SpRuntimeDispatchError> }>;
      /**
       * A single item within a Batch of dispatches has completed with no error.
       **/
      ItemCompleted: AugmentedEvent<ApiType, []>;
      /**
       * A single item within a Batch of dispatches has completed with error.
       **/
      ItemFailed: AugmentedEvent<ApiType, [error: SpRuntimeDispatchError], { error: SpRuntimeDispatchError }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    vesting: {
      /**
       * Claimed vesting.
       **/
      Claimed: AugmentedEvent<ApiType, [who: AccountId32, amount: u128], { who: AccountId32, amount: u128 }>;
      /**
       * Added new vesting schedule.
       **/
      VestingScheduleAdded: AugmentedEvent<ApiType, [from: AccountId32, to: AccountId32, vestingSchedule: OrmlVestingVestingSchedule], { from: AccountId32, to: AccountId32, vestingSchedule: OrmlVestingVestingSchedule }>;
      /**
       * Updated vesting schedules.
       **/
      VestingSchedulesUpdated: AugmentedEvent<ApiType, [who: AccountId32], { who: AccountId32 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    xcmInterface: {
      /**
       * Xcm dest weight has been updated.
       **/
      XcmDestWeightUpdated: AugmentedEvent<ApiType, [xcmOperation: ModuleXcmInterfaceModuleXcmInterfaceOperation, newXcmDestWeight: u64], { xcmOperation: ModuleXcmInterfaceModuleXcmInterfaceOperation, newXcmDestWeight: u64 }>;
      /**
       * Xcm dest weight has been updated.
       **/
      XcmFeeUpdated: AugmentedEvent<ApiType, [xcmOperation: ModuleXcmInterfaceModuleXcmInterfaceOperation, newXcmDestWeight: u128], { xcmOperation: ModuleXcmInterfaceModuleXcmInterfaceOperation, newXcmDestWeight: u128 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    xcmpQueue: {
      /**
       * Bad XCM format used.
       **/
      BadFormat: AugmentedEvent<ApiType, [messageHash: Option<H256>], { messageHash: Option<H256> }>;
      /**
       * Bad XCM version used.
       **/
      BadVersion: AugmentedEvent<ApiType, [messageHash: Option<H256>], { messageHash: Option<H256> }>;
      /**
       * Some XCM failed.
       **/
      Fail: AugmentedEvent<ApiType, [messageHash: Option<H256>, error: XcmV2TraitsError, weight: u64], { messageHash: Option<H256>, error: XcmV2TraitsError, weight: u64 }>;
      /**
       * An XCM exceeded the individual message weight budget.
       **/
      OverweightEnqueued: AugmentedEvent<ApiType, [sender: u32, sentAt: u32, index: u64, required: u64], { sender: u32, sentAt: u32, index: u64, required: u64 }>;
      /**
       * An XCM from the overweight queue was executed with the given actual weight used.
       **/
      OverweightServiced: AugmentedEvent<ApiType, [index: u64, used: u64], { index: u64, used: u64 }>;
      /**
       * Some XCM was executed ok.
       **/
      Success: AugmentedEvent<ApiType, [messageHash: Option<H256>, weight: u64], { messageHash: Option<H256>, weight: u64 }>;
      /**
       * An upward message was sent to the relay chain.
       **/
      UpwardMessageSent: AugmentedEvent<ApiType, [messageHash: Option<H256>], { messageHash: Option<H256> }>;
      /**
       * An HRMP message was sent to a sibling parachain.
       **/
      XcmpMessageSent: AugmentedEvent<ApiType, [messageHash: Option<H256>], { messageHash: Option<H256> }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    xTokens: {
      /**
       * Transferred `MultiAsset` with fee.
       **/
      TransferredMultiAssets: AugmentedEvent<ApiType, [sender: AccountId32, assets: XcmV1MultiassetMultiAssets, fee: XcmV1MultiAsset, dest: XcmV1MultiLocation], { sender: AccountId32, assets: XcmV1MultiassetMultiAssets, fee: XcmV1MultiAsset, dest: XcmV1MultiLocation }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
  } // AugmentedEvents
} // declare module
