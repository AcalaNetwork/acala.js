// Auto-generated via `yarn polkadot-types-from-chain`, do not edit
/* eslint-disable */

// import type lookup before we augment - in some environments
// this is required to allow for ambient/previous definitions
import '@polkadot/api-base/types/errors';

import type { ApiTypes, AugmentedError } from '@polkadot/api-base/types';

export type __AugmentedError<ApiType extends ApiTypes> = AugmentedError<ApiType>;

declare module '@polkadot/api-base/types/errors' {
  interface AugmentedErrors<ApiType extends ApiTypes> {
    acalaOracle: {
      AlreadyFeeded: AugmentedError<ApiType>;
      NoPermission: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    aggregatedDex: {
      CannotSwap: AugmentedError<ApiType>;
      InvalidPoolId: AugmentedError<ApiType>;
      InvalidSwapPath: AugmentedError<ApiType>;
      InvalidTokenIndex: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    assetRegistry: {
      AssetIdExisted: AugmentedError<ApiType>;
      AssetIdNotExists: AugmentedError<ApiType>;
      BadLocation: AugmentedError<ApiType>;
      MultiLocationExisted: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    auction: {
      AuctionNotExist: AugmentedError<ApiType>;
      AuctionNotStarted: AugmentedError<ApiType>;
      BidNotAccepted: AugmentedError<ApiType>;
      InvalidBidPrice: AugmentedError<ApiType>;
      NoAvailableAuctionId: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    auctionManager: {
      AuctionNotExists: AugmentedError<ApiType>;
      InReverseStage: AugmentedError<ApiType>;
      InvalidAmount: AugmentedError<ApiType>;
      InvalidBidPrice: AugmentedError<ApiType>;
      InvalidFeedPrice: AugmentedError<ApiType>;
      MustAfterShutdown: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    authority: {
      CallNotAuthorized: AugmentedError<ApiType>;
      FailedToCancel: AugmentedError<ApiType>;
      FailedToDelay: AugmentedError<ApiType>;
      FailedToFastTrack: AugmentedError<ApiType>;
      FailedToSchedule: AugmentedError<ApiType>;
      TriggerCallNotPermitted: AugmentedError<ApiType>;
      WrongCallWeightBound: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    authorship: {
      GenesisUncle: AugmentedError<ApiType>;
      InvalidUncleParent: AugmentedError<ApiType>;
      OldUncle: AugmentedError<ApiType>;
      TooHighUncle: AugmentedError<ApiType>;
      TooManyUncles: AugmentedError<ApiType>;
      UncleAlreadyIncluded: AugmentedError<ApiType>;
      UnclesAlreadySet: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    balances: {
      DeadAccount: AugmentedError<ApiType>;
      ExistentialDeposit: AugmentedError<ApiType>;
      ExistingVestingSchedule: AugmentedError<ApiType>;
      InsufficientBalance: AugmentedError<ApiType>;
      KeepAlive: AugmentedError<ApiType>;
      LiquidityRestrictions: AugmentedError<ApiType>;
      TooManyReserves: AugmentedError<ApiType>;
      VestingBalance: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    bounties: {
      HasActiveChildBounty: AugmentedError<ApiType>;
      InsufficientProposersBalance: AugmentedError<ApiType>;
      InvalidFee: AugmentedError<ApiType>;
      InvalidIndex: AugmentedError<ApiType>;
      InvalidValue: AugmentedError<ApiType>;
      PendingPayout: AugmentedError<ApiType>;
      Premature: AugmentedError<ApiType>;
      ReasonTooBig: AugmentedError<ApiType>;
      RequireCurator: AugmentedError<ApiType>;
      TooManyQueued: AugmentedError<ApiType>;
      UnexpectedStatus: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    cdpEngine: {
      AlreadyShutdown: AugmentedError<ApiType>;
      BelowLiquidationRatio: AugmentedError<ApiType>;
      BelowRequiredCollateralRatio: AugmentedError<ApiType>;
      CollateralAmountBelowMinimum: AugmentedError<ApiType>;
      CollateralContractNotFound: AugmentedError<ApiType>;
      CollateralNotEnough: AugmentedError<ApiType>;
      ConvertDebitBalanceFailed: AugmentedError<ApiType>;
      ExceedDebitValueHardCap: AugmentedError<ApiType>;
      InvalidCollateralType: AugmentedError<ApiType>;
      InvalidFeedPrice: AugmentedError<ApiType>;
      LiquidationFailed: AugmentedError<ApiType>;
      MustAfterShutdown: AugmentedError<ApiType>;
      MustBeSafe: AugmentedError<ApiType>;
      MustBeUnsafe: AugmentedError<ApiType>;
      NoDebitValue: AugmentedError<ApiType>;
      NotEnoughDebitDecrement: AugmentedError<ApiType>;
      RemainDebitValueTooSmall: AugmentedError<ApiType>;
      TooManyLiquidationContracts: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    cdpTreasury: {
      CannotSwap: AugmentedError<ApiType>;
      CollateralNotEnough: AugmentedError<ApiType>;
      DebitPoolNotEnough: AugmentedError<ApiType>;
      NotDexShare: AugmentedError<ApiType>;
      SurplusPoolNotEnough: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    collatorSelection: {
      AlreadyCandidate: AugmentedError<ApiType>;
      AlreadyInvulnerable: AugmentedError<ApiType>;
      BelowCandidatesMin: AugmentedError<ApiType>;
      InvalidProof: AugmentedError<ApiType>;
      MaxCandidatesExceeded: AugmentedError<ApiType>;
      MaxInvulnerablesExceeded: AugmentedError<ApiType>;
      NotCandidate: AugmentedError<ApiType>;
      NothingToWithdraw: AugmentedError<ApiType>;
      NotNonCandidate: AugmentedError<ApiType>;
      Permission: AugmentedError<ApiType>;
      RequireSessionKey: AugmentedError<ApiType>;
      StillLocked: AugmentedError<ApiType>;
      Unknown: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    cumulusXcm: {
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    currencies: {
      AmountIntoBalanceFailed: AugmentedError<ApiType>;
      BalanceTooLow: AugmentedError<ApiType>;
      DepositFailed: AugmentedError<ApiType>;
      Erc20InvalidOperation: AugmentedError<ApiType>;
      EvmAccountNotFound: AugmentedError<ApiType>;
      RealOriginNotFound: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    democracy: {
      AlreadyCanceled: AugmentedError<ApiType>;
      AlreadyDelegating: AugmentedError<ApiType>;
      AlreadyVetoed: AugmentedError<ApiType>;
      DuplicatePreimage: AugmentedError<ApiType>;
      DuplicateProposal: AugmentedError<ApiType>;
      Imminent: AugmentedError<ApiType>;
      InstantNotAllowed: AugmentedError<ApiType>;
      InsufficientFunds: AugmentedError<ApiType>;
      InvalidHash: AugmentedError<ApiType>;
      MaxVotesReached: AugmentedError<ApiType>;
      NoneWaiting: AugmentedError<ApiType>;
      Nonsense: AugmentedError<ApiType>;
      NoPermission: AugmentedError<ApiType>;
      NoProposal: AugmentedError<ApiType>;
      NotDelegating: AugmentedError<ApiType>;
      NotImminent: AugmentedError<ApiType>;
      NotSimpleMajority: AugmentedError<ApiType>;
      NotVoter: AugmentedError<ApiType>;
      PreimageInvalid: AugmentedError<ApiType>;
      PreimageMissing: AugmentedError<ApiType>;
      ProposalBlacklisted: AugmentedError<ApiType>;
      ProposalMissing: AugmentedError<ApiType>;
      ReferendumInvalid: AugmentedError<ApiType>;
      TooEarly: AugmentedError<ApiType>;
      TooManyProposals: AugmentedError<ApiType>;
      ValueLow: AugmentedError<ApiType>;
      VotesExist: AugmentedError<ApiType>;
      VotingPeriodLow: AugmentedError<ApiType>;
      WrongUpperBound: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    dex: {
      AlreadyEnabled: AugmentedError<ApiType>;
      AssetUnregistered: AugmentedError<ApiType>;
      CannotSwap: AugmentedError<ApiType>;
      ExcessiveSupplyAmount: AugmentedError<ApiType>;
      InsufficientLiquidity: AugmentedError<ApiType>;
      InsufficientTargetAmount: AugmentedError<ApiType>;
      InvalidContributionIncrement: AugmentedError<ApiType>;
      InvalidCurrencyId: AugmentedError<ApiType>;
      InvalidLiquidityIncrement: AugmentedError<ApiType>;
      InvalidTradingPath: AugmentedError<ApiType>;
      InvalidTradingPathLength: AugmentedError<ApiType>;
      InvariantCheckFailed: AugmentedError<ApiType>;
      MustBeDisabled: AugmentedError<ApiType>;
      MustBeEnabled: AugmentedError<ApiType>;
      MustBeProvisioning: AugmentedError<ApiType>;
      NotAllowedList: AugmentedError<ApiType>;
      NotAllowedRefund: AugmentedError<ApiType>;
      StillProvisioning: AugmentedError<ApiType>;
      UnacceptableLiquidityWithdrawn: AugmentedError<ApiType>;
      UnacceptableShareIncrement: AugmentedError<ApiType>;
      UnqualifiedProvision: AugmentedError<ApiType>;
      ZeroSupplyAmount: AugmentedError<ApiType>;
      ZeroTargetAmount: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    dexOracle: {
      AveragePriceAlreadyEnabled: AugmentedError<ApiType>;
      AveragePriceMustBeEnabled: AugmentedError<ApiType>;
      IntervalIsZero: AugmentedError<ApiType>;
      InvalidCurrencyId: AugmentedError<ApiType>;
      InvalidPool: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    dmpQueue: {
      OverLimit: AugmentedError<ApiType>;
      Unknown: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    emergencyShutdown: {
      AlreadyShutdown: AugmentedError<ApiType>;
      CanNotRefund: AugmentedError<ApiType>;
      ExistPotentialSurplus: AugmentedError<ApiType>;
      ExistUnhandledDebit: AugmentedError<ApiType>;
      MustAfterShutdown: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    evm: {
      AddressNotMapped: AugmentedError<ApiType>;
      CannotKillContract: AugmentedError<ApiType>;
      ChargeFeeFailed: AugmentedError<ApiType>;
      ChargeStorageFailed: AugmentedError<ApiType>;
      ContractAlreadyExisted: AugmentedError<ApiType>;
      ContractAlreadyPublished: AugmentedError<ApiType>;
      ContractDevelopmentAlreadyEnabled: AugmentedError<ApiType>;
      ContractDevelopmentNotEnabled: AugmentedError<ApiType>;
      ContractExceedsMaxCodeSize: AugmentedError<ApiType>;
      ContractNotFound: AugmentedError<ApiType>;
      InvalidDecimals: AugmentedError<ApiType>;
      NoPermission: AugmentedError<ApiType>;
      OutOfStorage: AugmentedError<ApiType>;
      ReserveStorageFailed: AugmentedError<ApiType>;
      StrictCallFailed: AugmentedError<ApiType>;
      UnreserveStorageFailed: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    evmAccounts: {
      AccountIdHasMapped: AugmentedError<ApiType>;
      BadSignature: AugmentedError<ApiType>;
      EthAddressHasMapped: AugmentedError<ApiType>;
      InvalidSignature: AugmentedError<ApiType>;
      NonZeroRefCount: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    evmBridge: {
      ExecutionError: AugmentedError<ApiType>;
      ExecutionFail: AugmentedError<ApiType>;
      ExecutionFatal: AugmentedError<ApiType>;
      ExecutionRevert: AugmentedError<ApiType>;
      InvalidReturnValue: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    financialCouncil: {
      AlreadyInitialized: AugmentedError<ApiType>;
      DuplicateProposal: AugmentedError<ApiType>;
      DuplicateVote: AugmentedError<ApiType>;
      NotMember: AugmentedError<ApiType>;
      ProposalMissing: AugmentedError<ApiType>;
      TooEarly: AugmentedError<ApiType>;
      TooManyProposals: AugmentedError<ApiType>;
      WrongIndex: AugmentedError<ApiType>;
      WrongProposalLength: AugmentedError<ApiType>;
      WrongProposalWeight: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    financialCouncilMembership: {
      AlreadyMember: AugmentedError<ApiType>;
      NotMember: AugmentedError<ApiType>;
      TooManyMembers: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    generalCouncil: {
      AlreadyInitialized: AugmentedError<ApiType>;
      DuplicateProposal: AugmentedError<ApiType>;
      DuplicateVote: AugmentedError<ApiType>;
      NotMember: AugmentedError<ApiType>;
      ProposalMissing: AugmentedError<ApiType>;
      TooEarly: AugmentedError<ApiType>;
      TooManyProposals: AugmentedError<ApiType>;
      WrongIndex: AugmentedError<ApiType>;
      WrongProposalLength: AugmentedError<ApiType>;
      WrongProposalWeight: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    generalCouncilMembership: {
      AlreadyMember: AugmentedError<ApiType>;
      NotMember: AugmentedError<ApiType>;
      TooManyMembers: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    homa: {
      BelowMintThreshold: AugmentedError<ApiType>;
      BelowRedeemThreshold: AugmentedError<ApiType>;
      CannotCompletelyFastMatch: AugmentedError<ApiType>;
      ExceededStakingCurrencySoftCap: AugmentedError<ApiType>;
      FastMatchIsNotAllowed: AugmentedError<ApiType>;
      InsufficientUnclaimedRedemption: AugmentedError<ApiType>;
      InvalidLastEraBumpedBlock: AugmentedError<ApiType>;
      OutdatedEraIndex: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    homaCouncil: {
      AlreadyInitialized: AugmentedError<ApiType>;
      DuplicateProposal: AugmentedError<ApiType>;
      DuplicateVote: AugmentedError<ApiType>;
      NotMember: AugmentedError<ApiType>;
      ProposalMissing: AugmentedError<ApiType>;
      TooEarly: AugmentedError<ApiType>;
      TooManyProposals: AugmentedError<ApiType>;
      WrongIndex: AugmentedError<ApiType>;
      WrongProposalLength: AugmentedError<ApiType>;
      WrongProposalWeight: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    homaCouncilMembership: {
      AlreadyMember: AugmentedError<ApiType>;
      NotMember: AugmentedError<ApiType>;
      TooManyMembers: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    honzon: {
      AlreadyAuthorized: AugmentedError<ApiType>;
      AlreadyShutdown: AugmentedError<ApiType>;
      AuthorizationNotExists: AugmentedError<ApiType>;
      NoPermission: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    incentives: {
      InvalidCurrencyId: AugmentedError<ApiType>;
      InvalidPoolId: AugmentedError<ApiType>;
      InvalidRate: AugmentedError<ApiType>;
      NotEnough: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    loans: {
      AmountConvertFailed: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    multisig: {
      AlreadyApproved: AugmentedError<ApiType>;
      AlreadyStored: AugmentedError<ApiType>;
      MaxWeightTooLow: AugmentedError<ApiType>;
      MinimumThreshold: AugmentedError<ApiType>;
      NoApprovalsNeeded: AugmentedError<ApiType>;
      NotFound: AugmentedError<ApiType>;
      NoTimepoint: AugmentedError<ApiType>;
      NotOwner: AugmentedError<ApiType>;
      SenderInSignatories: AugmentedError<ApiType>;
      SignatoriesOutOfOrder: AugmentedError<ApiType>;
      TooFewSignatories: AugmentedError<ApiType>;
      TooManySignatories: AugmentedError<ApiType>;
      UnexpectedTimepoint: AugmentedError<ApiType>;
      WrongTimepoint: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    nft: {
      AttributesTooLarge: AugmentedError<ApiType>;
      CannotDestroyClass: AugmentedError<ApiType>;
      ClassIdNotFound: AugmentedError<ApiType>;
      Immutable: AugmentedError<ApiType>;
      IncorrectTokenId: AugmentedError<ApiType>;
      InvalidQuantity: AugmentedError<ApiType>;
      NonBurnable: AugmentedError<ApiType>;
      NonMintable: AugmentedError<ApiType>;
      NonTransferable: AugmentedError<ApiType>;
      NoPermission: AugmentedError<ApiType>;
      TokenIdNotFound: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    operatorMembershipAcala: {
      AlreadyMember: AugmentedError<ApiType>;
      NotMember: AugmentedError<ApiType>;
      TooManyMembers: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    ormlNFT: {
      CannotDestroyClass: AugmentedError<ApiType>;
      ClassNotFound: AugmentedError<ApiType>;
      MaxMetadataExceeded: AugmentedError<ApiType>;
      NoAvailableClassId: AugmentedError<ApiType>;
      NoAvailableTokenId: AugmentedError<ApiType>;
      NoPermission: AugmentedError<ApiType>;
      TokenNotFound: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    ormlXcm: {
      BadVersion: AugmentedError<ApiType>;
      SendFailure: AugmentedError<ApiType>;
      Unreachable: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    parachainSystem: {
      HostConfigurationNotAvailable: AugmentedError<ApiType>;
      NothingAuthorized: AugmentedError<ApiType>;
      NotScheduled: AugmentedError<ApiType>;
      OverlappingUpgrades: AugmentedError<ApiType>;
      ProhibitedByPolkadot: AugmentedError<ApiType>;
      TooBig: AugmentedError<ApiType>;
      Unauthorized: AugmentedError<ApiType>;
      ValidationDataNotAvailable: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    polkadotXcm: {
      AlreadySubscribed: AugmentedError<ApiType>;
      BadLocation: AugmentedError<ApiType>;
      BadVersion: AugmentedError<ApiType>;
      CannotReanchor: AugmentedError<ApiType>;
      DestinationNotInvertible: AugmentedError<ApiType>;
      Empty: AugmentedError<ApiType>;
      Filtered: AugmentedError<ApiType>;
      InvalidOrigin: AugmentedError<ApiType>;
      NoSubscription: AugmentedError<ApiType>;
      SendFailure: AugmentedError<ApiType>;
      TooManyAssets: AugmentedError<ApiType>;
      Unreachable: AugmentedError<ApiType>;
      UnweighableMessage: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    preimage: {
      AlreadyNoted: AugmentedError<ApiType>;
      NotAuthorized: AugmentedError<ApiType>;
      NotNoted: AugmentedError<ApiType>;
      NotRequested: AugmentedError<ApiType>;
      Requested: AugmentedError<ApiType>;
      TooLarge: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    prices: {
      AccessPriceFailed: AugmentedError<ApiType>;
      NoLockedPrice: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    proxy: {
      Duplicate: AugmentedError<ApiType>;
      NoPermission: AugmentedError<ApiType>;
      NoSelfProxy: AugmentedError<ApiType>;
      NotFound: AugmentedError<ApiType>;
      NotProxy: AugmentedError<ApiType>;
      TooMany: AugmentedError<ApiType>;
      Unannounced: AugmentedError<ApiType>;
      Unproxyable: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    rewards: {
      CanSplitOnlyLessThanShare: AugmentedError<ApiType>;
      PoolDoesNotExist: AugmentedError<ApiType>;
      ShareDoesNotExist: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    scheduler: {
      FailedToSchedule: AugmentedError<ApiType>;
      NotFound: AugmentedError<ApiType>;
      RescheduleNoChange: AugmentedError<ApiType>;
      TargetBlockNumberInPast: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    session: {
      DuplicatedKey: AugmentedError<ApiType>;
      InvalidProof: AugmentedError<ApiType>;
      NoAccount: AugmentedError<ApiType>;
      NoAssociatedValidatorId: AugmentedError<ApiType>;
      NoKeys: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    sessionManager: {
      EstimateNextSessionFailed: AugmentedError<ApiType>;
      InvalidDuration: AugmentedError<ApiType>;
      InvalidSession: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    stableAsset: {
      ArgumentsError: AugmentedError<ApiType>;
      ArgumentsMismatch: AugmentedError<ApiType>;
      InconsistentStorage: AugmentedError<ApiType>;
      InvalidPoolAsset: AugmentedError<ApiType>;
      InvalidPoolValue: AugmentedError<ApiType>;
      Math: AugmentedError<ApiType>;
      MintUnderMin: AugmentedError<ApiType>;
      PoolNotFound: AugmentedError<ApiType>;
      RedeemOverMax: AugmentedError<ApiType>;
      RedeemUnderMin: AugmentedError<ApiType>;
      SwapUnderMin: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    sudo: {
      RequireSudo: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    system: {
      CallFiltered: AugmentedError<ApiType>;
      FailedToExtractRuntimeVersion: AugmentedError<ApiType>;
      InvalidSpecName: AugmentedError<ApiType>;
      NonDefaultComposite: AugmentedError<ApiType>;
      NonZeroRefCount: AugmentedError<ApiType>;
      SpecVersionNeedsToIncrease: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    technicalCommittee: {
      AlreadyInitialized: AugmentedError<ApiType>;
      DuplicateProposal: AugmentedError<ApiType>;
      DuplicateVote: AugmentedError<ApiType>;
      NotMember: AugmentedError<ApiType>;
      ProposalMissing: AugmentedError<ApiType>;
      TooEarly: AugmentedError<ApiType>;
      TooManyProposals: AugmentedError<ApiType>;
      WrongIndex: AugmentedError<ApiType>;
      WrongProposalLength: AugmentedError<ApiType>;
      WrongProposalWeight: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    technicalCommitteeMembership: {
      AlreadyMember: AugmentedError<ApiType>;
      NotMember: AugmentedError<ApiType>;
      TooManyMembers: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    tips: {
      AlreadyKnown: AugmentedError<ApiType>;
      NotFinder: AugmentedError<ApiType>;
      Premature: AugmentedError<ApiType>;
      ReasonTooBig: AugmentedError<ApiType>;
      StillOpen: AugmentedError<ApiType>;
      UnknownTip: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    tokens: {
      AmountIntoBalanceFailed: AugmentedError<ApiType>;
      BalanceTooLow: AugmentedError<ApiType>;
      DeadAccount: AugmentedError<ApiType>;
      ExistentialDeposit: AugmentedError<ApiType>;
      KeepAlive: AugmentedError<ApiType>;
      LiquidityRestrictions: AugmentedError<ApiType>;
      MaxLocksExceeded: AugmentedError<ApiType>;
      TooManyReserves: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    transactionPause: {
      CannotPause: AugmentedError<ApiType>;
      InvalidCharacter: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    transactionPayment: {
      ChargeFeePoolAlreadyExisted: AugmentedError<ApiType>;
      DexNotAvailable: AugmentedError<ApiType>;
      InvalidBalance: AugmentedError<ApiType>;
      InvalidRate: AugmentedError<ApiType>;
      InvalidSwapPath: AugmentedError<ApiType>;
      InvalidToken: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    treasury: {
      InsufficientPermission: AugmentedError<ApiType>;
      InsufficientProposersBalance: AugmentedError<ApiType>;
      InvalidIndex: AugmentedError<ApiType>;
      ProposalNotApproved: AugmentedError<ApiType>;
      TooManyApprovals: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    unknownTokens: {
      BalanceOverflow: AugmentedError<ApiType>;
      BalanceTooLow: AugmentedError<ApiType>;
      UnhandledAsset: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    utility: {
      TooManyCalls: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    vesting: {
      AmountLow: AugmentedError<ApiType>;
      InsufficientBalanceToLock: AugmentedError<ApiType>;
      MaxVestingSchedulesExceeded: AugmentedError<ApiType>;
      TooManyVestingSchedules: AugmentedError<ApiType>;
      ZeroVestingPeriod: AugmentedError<ApiType>;
      ZeroVestingPeriodCount: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    xcmInterface: {
      XcmFailed: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    xcmpQueue: {
      BadOverweightIndex: AugmentedError<ApiType>;
      BadXcm: AugmentedError<ApiType>;
      BadXcmOrigin: AugmentedError<ApiType>;
      FailedToSend: AugmentedError<ApiType>;
      WeightOverLimit: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    xTokens: {
      AssetHasNoReserve: AugmentedError<ApiType>;
      AssetIndexNonExistent: AugmentedError<ApiType>;
      BadVersion: AugmentedError<ApiType>;
      CannotReanchor: AugmentedError<ApiType>;
      DestinationNotInvertible: AugmentedError<ApiType>;
      DistinctReserveForAssetAndFee: AugmentedError<ApiType>;
      FeeNotEnough: AugmentedError<ApiType>;
      InvalidAncestry: AugmentedError<ApiType>;
      InvalidAsset: AugmentedError<ApiType>;
      InvalidDest: AugmentedError<ApiType>;
      MinXcmFeeNotDefined: AugmentedError<ApiType>;
      NotCrossChainTransfer: AugmentedError<ApiType>;
      NotCrossChainTransferableCurrency: AugmentedError<ApiType>;
      NotSupportedMultiLocation: AugmentedError<ApiType>;
      TooManyAssetsBeingSent: AugmentedError<ApiType>;
      UnweighableMessage: AugmentedError<ApiType>;
      XcmExecutionFailed: AugmentedError<ApiType>;
      ZeroAmount: AugmentedError<ApiType>;
      ZeroFee: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
  } // AugmentedErrors
} // declare module
