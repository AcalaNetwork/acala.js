// Auto-generated via `yarn polkadot-types-from-chain`, do not edit
/* eslint-disable */

// import type lookup before we augment - in some environments
// this is required to allow for ambient/previous definitions
import '@polkadot/api-base/types/consts';

import type { AccountId32, H160, Percent, Permill } from '@acala-network/types/interfaces/runtime';
import type { ApiTypes, AugmentedConst } from '@polkadot/api-base/types';
import type { Option, Vec, bool, u128, u16, u32, u64 } from '@polkadot/types-codec';
import type { Codec, ITuple } from '@polkadot/types-codec/types';
import type { AcalaPrimitivesCurrencyCurrencyId, FrameSupportPalletId, FrameSupportWeightsRuntimeDbWeight, FrameSystemLimitsBlockLength, FrameSystemLimitsBlockWeights, SpVersionRuntimeVersion, XcmV1MultiLocation } from '@polkadot/types/lookup';

export type __AugmentedConst<ApiType extends ApiTypes> = AugmentedConst<ApiType>;

declare module '@polkadot/api-base/types/consts' {
  interface AugmentedConsts<ApiType extends ApiTypes> {
    acalaOracle: {
      maxHasDispatchedSize: u32 & AugmentedConst<ApiType>;
      rootOperatorAccountId: AccountId32 & AugmentedConst<ApiType>;
      /**
       * Generic const
       **/
      [key: string]: Codec;
    };
    aggregatedDex: {
      dexSwapJointList: Vec<Vec<AcalaPrimitivesCurrencyCurrencyId>> & AugmentedConst<ApiType>;
      swapPathLimit: u32 & AugmentedConst<ApiType>;
      /**
       * Generic const
       **/
      [key: string]: Codec;
    };
    assetRegistry: {
      stakingCurrencyId: AcalaPrimitivesCurrencyCurrencyId & AugmentedConst<ApiType>;
      /**
       * Generic const
       **/
      [key: string]: Codec;
    };
    auctionManager: {
      auctionDurationSoftCap: u32 & AugmentedConst<ApiType>;
      auctionTimeToClose: u32 & AugmentedConst<ApiType>;
      getStableCurrencyId: AcalaPrimitivesCurrencyCurrencyId & AugmentedConst<ApiType>;
      minimumIncrementSize: u128 & AugmentedConst<ApiType>;
      unsignedPriority: u64 & AugmentedConst<ApiType>;
      /**
       * Generic const
       **/
      [key: string]: Codec;
    };
    authorship: {
      uncleGenerations: u32 & AugmentedConst<ApiType>;
      /**
       * Generic const
       **/
      [key: string]: Codec;
    };
    balances: {
      existentialDeposit: u128 & AugmentedConst<ApiType>;
      maxLocks: u32 & AugmentedConst<ApiType>;
      maxReserves: u32 & AugmentedConst<ApiType>;
      /**
       * Generic const
       **/
      [key: string]: Codec;
    };
    bounties: {
      bountyDepositBase: u128 & AugmentedConst<ApiType>;
      bountyDepositPayoutDelay: u32 & AugmentedConst<ApiType>;
      bountyUpdatePeriod: u32 & AugmentedConst<ApiType>;
      bountyValueMinimum: u128 & AugmentedConst<ApiType>;
      curatorDepositMax: Option<u128> & AugmentedConst<ApiType>;
      curatorDepositMin: Option<u128> & AugmentedConst<ApiType>;
      curatorDepositMultiplier: Permill & AugmentedConst<ApiType>;
      dataDepositPerByte: u128 & AugmentedConst<ApiType>;
      maximumReasonLength: u32 & AugmentedConst<ApiType>;
      /**
       * Generic const
       **/
      [key: string]: Codec;
    };
    cdpEngine: {
      defaultDebitExchangeRate: u128 & AugmentedConst<ApiType>;
      defaultLiquidationPenalty: u128 & AugmentedConst<ApiType>;
      defaultLiquidationRatio: u128 & AugmentedConst<ApiType>;
      getStableCurrencyId: AcalaPrimitivesCurrencyCurrencyId & AugmentedConst<ApiType>;
      maxLiquidationContracts: u32 & AugmentedConst<ApiType>;
      maxLiquidationContractSlippage: u128 & AugmentedConst<ApiType>;
      maxSwapSlippageCompareToOracle: u128 & AugmentedConst<ApiType>;
      minimumDebitValue: u128 & AugmentedConst<ApiType>;
      palletId: FrameSupportPalletId & AugmentedConst<ApiType>;
      unsignedPriority: u64 & AugmentedConst<ApiType>;
      /**
       * Generic const
       **/
      [key: string]: Codec;
    };
    cdpTreasury: {
      getStableCurrencyId: AcalaPrimitivesCurrencyCurrencyId & AugmentedConst<ApiType>;
      maxAuctionsCount: u32 & AugmentedConst<ApiType>;
      palletId: FrameSupportPalletId & AugmentedConst<ApiType>;
      treasuryAccount: AccountId32 & AugmentedConst<ApiType>;
      /**
       * Generic const
       **/
      [key: string]: Codec;
    };
    collatorSelection: {
      collatorKickThreshold: Permill & AugmentedConst<ApiType>;
      kickPenaltySessionLength: u32 & AugmentedConst<ApiType>;
      maxCandidates: u32 & AugmentedConst<ApiType>;
      maxInvulnerables: u32 & AugmentedConst<ApiType>;
      minCandidates: u32 & AugmentedConst<ApiType>;
      minRewardDistributeAmount: u128 & AugmentedConst<ApiType>;
      potId: FrameSupportPalletId & AugmentedConst<ApiType>;
      /**
       * Generic const
       **/
      [key: string]: Codec;
    };
    currencies: {
      erc20HoldingAccount: H160 & AugmentedConst<ApiType>;
      getNativeCurrencyId: AcalaPrimitivesCurrencyCurrencyId & AugmentedConst<ApiType>;
      /**
       * Generic const
       **/
      [key: string]: Codec;
    };
    democracy: {
      cooloffPeriod: u32 & AugmentedConst<ApiType>;
      enactmentPeriod: u32 & AugmentedConst<ApiType>;
      fastTrackVotingPeriod: u32 & AugmentedConst<ApiType>;
      instantAllowed: bool & AugmentedConst<ApiType>;
      launchPeriod: u32 & AugmentedConst<ApiType>;
      maxProposals: u32 & AugmentedConst<ApiType>;
      maxVotes: u32 & AugmentedConst<ApiType>;
      minimumDeposit: u128 & AugmentedConst<ApiType>;
      preimageByteDeposit: u128 & AugmentedConst<ApiType>;
      voteLockingPeriod: u32 & AugmentedConst<ApiType>;
      votingPeriod: u32 & AugmentedConst<ApiType>;
      /**
       * Generic const
       **/
      [key: string]: Codec;
    };
    dex: {
      extendedProvisioningBlocks: u32 & AugmentedConst<ApiType>;
      getExchangeFee: ITuple<[u32, u32]> & AugmentedConst<ApiType>;
      palletId: FrameSupportPalletId & AugmentedConst<ApiType>;
      tradingPathLimit: u32 & AugmentedConst<ApiType>;
      /**
       * Generic const
       **/
      [key: string]: Codec;
    };
    evm: {
      developerDeposit: u128 & AugmentedConst<ApiType>;
      networkContractSource: H160 & AugmentedConst<ApiType>;
      newContractExtraBytes: u32 & AugmentedConst<ApiType>;
      publicationFee: u128 & AugmentedConst<ApiType>;
      storageDepositPerByte: u128 & AugmentedConst<ApiType>;
      treasuryAccount: AccountId32 & AugmentedConst<ApiType>;
      txFeePerGas: u128 & AugmentedConst<ApiType>;
      /**
       * Generic const
       **/
      [key: string]: Codec;
    };
    evmAccounts: {
      chainId: u64 & AugmentedConst<ApiType>;
      /**
       * Generic const
       **/
      [key: string]: Codec;
    };
    homa: {
      activeSubAccountsIndexList: Vec<u16> & AugmentedConst<ApiType>;
      bondingDuration: u32 & AugmentedConst<ApiType>;
      defaultExchangeRate: u128 & AugmentedConst<ApiType>;
      liquidCurrencyId: AcalaPrimitivesCurrencyCurrencyId & AugmentedConst<ApiType>;
      mintThreshold: u128 & AugmentedConst<ApiType>;
      palletId: FrameSupportPalletId & AugmentedConst<ApiType>;
      redeemThreshold: u128 & AugmentedConst<ApiType>;
      stakingCurrencyId: AcalaPrimitivesCurrencyCurrencyId & AugmentedConst<ApiType>;
      treasuryAccount: AccountId32 & AugmentedConst<ApiType>;
      /**
       * Generic const
       **/
      [key: string]: Codec;
    };
    honzon: {
      depositPerAuthorization: u128 & AugmentedConst<ApiType>;
      /**
       * Generic const
       **/
      [key: string]: Codec;
    };
    idleScheduler: {
      disableBlockThreshold: u32 & AugmentedConst<ApiType>;
      minimumWeightRemainInBlock: u64 & AugmentedConst<ApiType>;
      /**
       * Generic const
       **/
      [key: string]: Codec;
    };
    incentives: {
      accumulatePeriod: u32 & AugmentedConst<ApiType>;
      earnShareBooster: Permill & AugmentedConst<ApiType>;
      nativeCurrencyId: AcalaPrimitivesCurrencyCurrencyId & AugmentedConst<ApiType>;
      palletId: FrameSupportPalletId & AugmentedConst<ApiType>;
      rewardsSource: AccountId32 & AugmentedConst<ApiType>;
      stableCurrencyId: AcalaPrimitivesCurrencyCurrencyId & AugmentedConst<ApiType>;
      /**
       * Generic const
       **/
      [key: string]: Codec;
    };
    loans: {
      palletId: FrameSupportPalletId & AugmentedConst<ApiType>;
      /**
       * Generic const
       **/
      [key: string]: Codec;
    };
    multisig: {
      depositBase: u128 & AugmentedConst<ApiType>;
      depositFactor: u128 & AugmentedConst<ApiType>;
      maxSignatories: u16 & AugmentedConst<ApiType>;
      /**
       * Generic const
       **/
      [key: string]: Codec;
    };
    nft: {
      createClassDeposit: u128 & AugmentedConst<ApiType>;
      createTokenDeposit: u128 & AugmentedConst<ApiType>;
      dataDepositPerByte: u128 & AugmentedConst<ApiType>;
      maxAttributesBytes: u32 & AugmentedConst<ApiType>;
      palletId: FrameSupportPalletId & AugmentedConst<ApiType>;
      /**
       * Generic const
       **/
      [key: string]: Codec;
    };
    prices: {
      getLiquidCurrencyId: AcalaPrimitivesCurrencyCurrencyId & AugmentedConst<ApiType>;
      getStableCurrencyId: AcalaPrimitivesCurrencyCurrencyId & AugmentedConst<ApiType>;
      getStakingCurrencyId: AcalaPrimitivesCurrencyCurrencyId & AugmentedConst<ApiType>;
      rewardRatePerRelaychainBlock: u128 & AugmentedConst<ApiType>;
      stableCurrencyFixedPrice: u128 & AugmentedConst<ApiType>;
      /**
       * Generic const
       **/
      [key: string]: Codec;
    };
    proxy: {
      announcementDepositBase: u128 & AugmentedConst<ApiType>;
      announcementDepositFactor: u128 & AugmentedConst<ApiType>;
      maxPending: u32 & AugmentedConst<ApiType>;
      maxProxies: u32 & AugmentedConst<ApiType>;
      proxyDepositBase: u128 & AugmentedConst<ApiType>;
      proxyDepositFactor: u128 & AugmentedConst<ApiType>;
      /**
       * Generic const
       **/
      [key: string]: Codec;
    };
    scheduler: {
      maximumWeight: u64 & AugmentedConst<ApiType>;
      maxScheduledPerBlock: u32 & AugmentedConst<ApiType>;
      /**
       * Generic const
       **/
      [key: string]: Codec;
    };
    stableAsset: {
      aPrecision: u128 & AugmentedConst<ApiType>;
      feePrecision: u128 & AugmentedConst<ApiType>;
      palletId: FrameSupportPalletId & AugmentedConst<ApiType>;
      poolAssetLimit: u32 & AugmentedConst<ApiType>;
      swapExactOverAmount: u128 & AugmentedConst<ApiType>;
      /**
       * Generic const
       **/
      [key: string]: Codec;
    };
    system: {
      blockHashCount: u32 & AugmentedConst<ApiType>;
      blockLength: FrameSystemLimitsBlockLength & AugmentedConst<ApiType>;
      blockWeights: FrameSystemLimitsBlockWeights & AugmentedConst<ApiType>;
      dbWeight: FrameSupportWeightsRuntimeDbWeight & AugmentedConst<ApiType>;
      ss58Prefix: u16 & AugmentedConst<ApiType>;
      version: SpVersionRuntimeVersion & AugmentedConst<ApiType>;
      /**
       * Generic const
       **/
      [key: string]: Codec;
    };
    timestamp: {
      minimumPeriod: u64 & AugmentedConst<ApiType>;
      /**
       * Generic const
       **/
      [key: string]: Codec;
    };
    tips: {
      dataDepositPerByte: u128 & AugmentedConst<ApiType>;
      maximumReasonLength: u32 & AugmentedConst<ApiType>;
      tipCountdown: u32 & AugmentedConst<ApiType>;
      tipFindersFee: Percent & AugmentedConst<ApiType>;
      tipReportDepositBase: u128 & AugmentedConst<ApiType>;
      /**
       * Generic const
       **/
      [key: string]: Codec;
    };
    tokens: {
      maxLocks: u32 & AugmentedConst<ApiType>;
      maxReserves: u32 & AugmentedConst<ApiType>;
      /**
       * Generic const
       **/
      [key: string]: Codec;
    };
    transactionPayment: {
      alternativeFeeSurplus: Percent & AugmentedConst<ApiType>;
      alternativeFeeSwapDeposit: u128 & AugmentedConst<ApiType>;
      customFeeSurplus: Percent & AugmentedConst<ApiType>;
      defaultFeeTokens: Vec<AcalaPrimitivesCurrencyCurrencyId> & AugmentedConst<ApiType>;
      maxSwapSlippageCompareToOracle: u128 & AugmentedConst<ApiType>;
      maxTipsOfPriority: u128 & AugmentedConst<ApiType>;
      nativeCurrencyId: AcalaPrimitivesCurrencyCurrencyId & AugmentedConst<ApiType>;
      operationalFeeMultiplier: u64 & AugmentedConst<ApiType>;
      palletId: FrameSupportPalletId & AugmentedConst<ApiType>;
      tipPerWeightStep: u128 & AugmentedConst<ApiType>;
      tradingPathLimit: u32 & AugmentedConst<ApiType>;
      transactionByteFee: u128 & AugmentedConst<ApiType>;
      treasuryAccount: AccountId32 & AugmentedConst<ApiType>;
      /**
       * Generic const
       **/
      [key: string]: Codec;
    };
    treasury: {
      burn: Permill & AugmentedConst<ApiType>;
      maxApprovals: u32 & AugmentedConst<ApiType>;
      palletId: FrameSupportPalletId & AugmentedConst<ApiType>;
      proposalBond: Permill & AugmentedConst<ApiType>;
      proposalBondMaximum: Option<u128> & AugmentedConst<ApiType>;
      proposalBondMinimum: u128 & AugmentedConst<ApiType>;
      spendPeriod: u32 & AugmentedConst<ApiType>;
      /**
       * Generic const
       **/
      [key: string]: Codec;
    };
    utility: {
      batchedCallsLimit: u32 & AugmentedConst<ApiType>;
      /**
       * Generic const
       **/
      [key: string]: Codec;
    };
    vesting: {
      minVestedTransfer: u128 & AugmentedConst<ApiType>;
      /**
       * Generic const
       **/
      [key: string]: Codec;
    };
    xcmInterface: {
      parachainAccount: AccountId32 & AugmentedConst<ApiType>;
      relayChainUnbondingSlashingSpans: u32 & AugmentedConst<ApiType>;
      stakingCurrencyId: AcalaPrimitivesCurrencyCurrencyId & AugmentedConst<ApiType>;
      /**
       * Generic const
       **/
      [key: string]: Codec;
    };
    xTokens: {
      baseXcmWeight: u64 & AugmentedConst<ApiType>;
      selfLocation: XcmV1MultiLocation & AugmentedConst<ApiType>;
      /**
       * Generic const
       **/
      [key: string]: Codec;
    };
  } // AugmentedConsts
} // declare module
