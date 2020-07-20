// Auto-generated via `yarn polkadot-types-from-chain`, do not edit
/* eslint-disable */

import { AnyNumber, ITuple } from '@polkadot/types/types';
import { Option, U8aFixed, Vec } from '@polkadot/types/codec';
import { Bytes, bool, u32, u64 } from '@polkadot/types/primitive';
import { CollateralAuctionItem, DebitAuctionItem, SurplusAuctionItem } from '@acala-network/types/interfaces/auctionManager';
import { RiskManagementParams } from '@acala-network/types/interfaces/cdpEngine';
import { BondingLedger } from '@acala-network/types/interfaces/nomineesElection';
import { AirDropCurrencyId, CurrencyId } from '@acala-network/types/interfaces/primitives';
import { AccountId, AccountIndex, AuctionId, AuctionIdOf, Balance, BalanceOf, BlockNumber, DebitBalance, ExtrinsicsWeight, Hash, KeyTypeId, Moment, OracleKey, Perbill, Releases, Share, ValidatorId } from '@acala-network/types/interfaces/runtime';
import { PolkadotAccountId } from '@acala-network/types/interfaces/stakingPool';
import { ExchangeRate, Rate } from '@acala-network/types/interfaces/support';
import { CallOf } from '@open-web3/orml-types/interfaces/authority';
import { GraduallyUpdate } from '@open-web3/orml-types/interfaces/graduallyUpdates';
import { OrderedSet, TimestampedValueOf } from '@open-web3/orml-types/interfaces/oracle';
import { AuctionInfo, DispatchId, Price } from '@open-web3/orml-types/interfaces/traits';
import { VestingScheduleOf } from '@open-web3/orml-types/interfaces/vesting';
import { BabeAuthorityWeight, MaybeRandomness, NextConfigDescriptor, Randomness } from '@polkadot/types/interfaces/babe';
import { AccountData, BalanceLock } from '@polkadot/types/interfaces/balances';
import { ProposalIndex, Votes } from '@polkadot/types/interfaces/collective';
import { AuthorityId } from '@polkadot/types/interfaces/consensus';
import { Proposal } from '@polkadot/types/interfaces/democracy';
import { EcdsaSignature } from '@polkadot/types/interfaces/extrinsics';
import { SetId, StoredPendingChange, StoredState } from '@polkadot/types/interfaces/grandpa';
import { ActiveRecovery, RecoveryConfig } from '@polkadot/types/interfaces/recovery';
import { Keys, SessionIndex } from '@polkadot/types/interfaces/session';
import { ActiveEraInfo, ElectionResult, ElectionScore, ElectionStatus, EraIndex, EraRewardPoints, Exposure, Forcing, MomentOf, Nominations, RewardDestination, SlashingSpans, SpanIndex, SpanRecord, StakingLedger, UnappliedSlash, ValidatorPrefs } from '@polkadot/types/interfaces/staking';
import { AccountInfo, DigestOf, EventIndex, EventRecord, LastRuntimeUpgradeInfo, Phase } from '@polkadot/types/interfaces/system';
import { OpenTip } from '@polkadot/types/interfaces/treasury';
import { Multiplier } from '@polkadot/types/interfaces/txpayment';
import { Multisig } from '@polkadot/types/interfaces/utility';
import { BaseStorageType, StorageDoubleMap, StorageMap } from '@open-web3/api-mobx';

export interface StorageType extends BaseStorageType {
  accounts: {    /**
     * Mapping from account id to flag for free transfer.
     **/
    freeTransferEnabledAccounts: StorageMap<AccountId | string | Uint8Array, Option<bool>>;
    /**
     * Mapping from account id to free transfer records, record moment when a transfer tx occurs.
     **/
    lastFreeTransfers: StorageMap<AccountId | string | Uint8Array, Vec<MomentOf>>;
  };
  airDrop: {    airDrops: StorageDoubleMap<AccountId | string | Uint8Array, AirDropCurrencyId | 'KAR'|'ACA' | number | Uint8Array, Balance>;
  };
  auction: {    /**
     * Index auctions by end time.
     **/
    auctionEndTime: StorageDoubleMap<BlockNumber | AnyNumber | Uint8Array, AuctionId | AnyNumber | Uint8Array, Option<ITuple<[]>>>;
    /**
     * Stores on-going and future auctions. Closed auction are removed.
     **/
    auctions: StorageMap<AuctionId | AnyNumber | Uint8Array, Option<AuctionInfo>>;
    /**
     * Track the next auction ID.
     **/
    auctionsIndex: AuctionId;
  };
  auctionManager: {    /**
     * Mapping from auction id to collateral auction info
     **/
    collateralAuctions: StorageMap<AuctionIdOf | AnyNumber | Uint8Array, Option<CollateralAuctionItem>>;
    /**
     * Mapping from auction id to debit auction info
     **/
    debitAuctions: StorageMap<AuctionIdOf | AnyNumber | Uint8Array, Option<DebitAuctionItem>>;
    /**
     * System shutdown flag
     **/
    isShutdown: bool;
    /**
     * Mapping from auction id to surplus auction info
     **/
    surplusAuctions: StorageMap<AuctionIdOf | AnyNumber | Uint8Array, Option<SurplusAuctionItem>>;
    /**
     * Record of the total collateral amount of all ative collateral auctions under specific collateral type
     * CollateralType -> TotalAmount
     **/
    totalCollateralInAuction: StorageMap<CurrencyId | 'ACA'|'AUSD'|'DOT'|'XBTC'|'LDOT'|'RENBTC' | number | Uint8Array, Balance>;
    /**
     * Record of total fix amount of all ative debit auctions
     **/
    totalDebitInAuction: Balance;
    /**
     * Record of total surplus amount of all ative surplus auctions
     **/
    totalSurplusInAuction: Balance;
    /**
     * Record of total target sales of all ative collateral auctions
     **/
    totalTargetInAuction: Balance;
  };
  babe: {    /**
     * Current epoch authorities.
     **/
    authorities: Vec<ITuple<[AuthorityId, BabeAuthorityWeight]>>;
    /**
     * Current slot number.
     **/
    currentSlot: u64;
    /**
     * Current epoch index.
     **/
    epochIndex: u64;
    /**
     * The slot at which the first epoch actually started. This is 0
     * until the first block of the chain.
     **/
    genesisSlot: u64;
    /**
     * Temporary value (cleared at block finalization) which is `Some`
     * if per-block initialization has already been called for current block.
     **/
    initialized: Option<MaybeRandomness>;
    /**
     * How late the current block is compared to its parent.
     * 
     * This entry is populated as part of block execution and is cleaned up
     * on block finalization. Querying this storage entry outside of block
     * execution context should always yield zero.
     **/
    lateness: BlockNumber;
    /**
     * Next epoch configuration, if changed.
     **/
    nextEpochConfig: Option<NextConfigDescriptor>;
    /**
     * Next epoch randomness.
     **/
    nextRandomness: Randomness;
    /**
     * The epoch randomness for the *current* epoch.
     * 
     * # Security
     * 
     * This MUST NOT be used for gambling, as it can be influenced by a
     * malicious validator in the short term. It MAY be used in many
     * cryptographic protocols, however, so long as one remembers that this
     * (like everything else on-chain) it is public. For example, it can be
     * used where a number is needed that cannot have been chosen by an
     * adversary, for purposes such as public-coin zero-knowledge proofs.
     **/
    randomness: Randomness;
    /**
     * Randomness under construction.
     * 
     * We make a tradeoff between storage accesses and list length.
     * We store the under-construction randomness in segments of up to
     * `UNDER_CONSTRUCTION_SEGMENT_LENGTH`.
     * 
     * Once a segment reaches this length, we begin the next one.
     * We reset all segments and return to `0` at the beginning of every
     * epoch.
     **/
    segmentIndex: u32;
    /**
     * TWOX-NOTE: `SegmentIndex` is an increasing integer, so this is okay.
     **/
    underConstruction: StorageMap<u32 | AnyNumber | Uint8Array, Vec<Randomness>>;
  };
  balances: {    /**
     * The balance of an account.
     * 
     * NOTE: This is only used in the case that this module is used to store balances.
     **/
    account: StorageMap<AccountId | string | Uint8Array, AccountData>;
    /**
     * Any liquidity locks on some account balances.
     * NOTE: Should only be accessed when setting, changing and freeing a lock.
     **/
    locks: StorageMap<AccountId | string | Uint8Array, Vec<BalanceLock>>;
    /**
     * Storage version of the pallet.
     * 
     * This is set to v2.0.0 for new networks.
     **/
    storageVersion: Releases;
    /**
     * The total units issued in the system.
     **/
    totalIssuance: Balance;
  };
  cdpEngine: {    /**
     * Mapping from collateral type to its risk management params
     **/
    collateralParams: StorageMap<CurrencyId | 'ACA'|'AUSD'|'DOT'|'XBTC'|'LDOT'|'RENBTC' | number | Uint8Array, RiskManagementParams>;
    /**
     * Mapping from collateral type to its exchange rate of debit units and debit value
     **/
    debitExchangeRate: StorageMap<CurrencyId | 'ACA'|'AUSD'|'DOT'|'XBTC'|'LDOT'|'RENBTC' | number | Uint8Array, Option<ExchangeRate>>;
    /**
     * Global stability fee rate for all types of collateral
     **/
    globalStabilityFee: Rate;
    /**
     * System shutdown flag
     **/
    isShutdown: bool;
  };
  cdpTreasury: {    /**
     * The maximum amount of collateral amount for sale per collateral auction
     **/
    collateralAuctionMaximumSize: StorageMap<CurrencyId | 'ACA'|'AUSD'|'DOT'|'XBTC'|'LDOT'|'RENBTC' | number | Uint8Array, Balance>;
    /**
     * The fixed amount of stable coin per surplus auction wants to get
     **/
    debitAuctionFixedSize: Balance;
    /**
     * Current total debit value of system. It's not same as debit in CDP engine,
     * it is the bad debt of the system.
     **/
    debitPool: Balance;
    /**
     * Initial amount of native token for sale per debit auction
     **/
    initialAmountPerDebitAuction: Balance;
    /**
     * System shutdown flag
     **/
    isShutdown: bool;
    /**
     * The fixed amount of stable coin for sale per surplus auction
     **/
    surplusAuctionFixedSize: Balance;
    /**
     * The buffer size of surplus pool, the system will process the surplus through
     * surplus auction when above this value
     **/
    surplusBufferSize: Balance;
    /**
     * Current total surplus of system.
     **/
    surplusPool: Balance;
    /**
     * Mapping from collateral type to collateral assets amount kept in CDP treasury
     **/
    totalCollaterals: StorageMap<CurrencyId | 'ACA'|'AUSD'|'DOT'|'XBTC'|'LDOT'|'RENBTC' | number | Uint8Array, Balance>;
  };
  dex: {    /**
     * System shutdown flag
     **/
    isShutdown: bool;
    /**
     * Incentive reward rate for different currency type
     * CurrencyType -> IncentiveRate
     **/
    liquidityIncentiveRate: StorageMap<CurrencyId | 'ACA'|'AUSD'|'DOT'|'XBTC'|'LDOT'|'RENBTC' | number | Uint8Array, Rate>;
    /**
     * Liquidity pool, which is the trading pair for specific currency type to base currency type.
     * CurrencyType -> (OtherCurrencyAmount, BaseCurrencyAmount)
     **/
    liquidityPool: StorageMap<CurrencyId | 'ACA'|'AUSD'|'DOT'|'XBTC'|'LDOT'|'RENBTC' | number | Uint8Array, ITuple<[Balance, Balance]>>;
    /**
     * Shares records indexed by currency type and account id
     * CurrencyType -> Owner -> ShareAmount
     **/
    shares: StorageDoubleMap<CurrencyId | 'ACA'|'AUSD'|'DOT'|'XBTC'|'LDOT'|'RENBTC' | number | Uint8Array, AccountId | string | Uint8Array, Share>;
    /**
     * Total interest(include total withdrawn) and total withdrawn interest for different currency type
     * CurrencyType -> (TotalInterest, TotalWithdrawnInterest)
     **/
    totalInterest: StorageMap<CurrencyId | 'ACA'|'AUSD'|'DOT'|'XBTC'|'LDOT'|'RENBTC' | number | Uint8Array, ITuple<[Balance, Balance]>>;
    /**
     * Total shares amount of liquidity pool specificed by currency type
     * CurrencyType -> TotalSharesAmount
     **/
    totalShares: StorageMap<CurrencyId | 'ACA'|'AUSD'|'DOT'|'XBTC'|'LDOT'|'RENBTC' | number | Uint8Array, Share>;
    /**
     * Withdrawn interest indexed by currency type and account id
     * CurrencyType -> Owner -> WithdrawnInterest
     **/
    withdrawnInterest: StorageDoubleMap<CurrencyId | 'ACA'|'AUSD'|'DOT'|'XBTC'|'LDOT'|'RENBTC' | number | Uint8Array, AccountId | string | Uint8Array, Balance>;
  };
  emergencyShutdown: {    /**
     * Open final redemption flag
     **/
    canRefund: bool;
    /**
     * Emergency shutdown flag
     **/
    isShutdown: bool;
  };
  generalCouncil: {    /**
     * The current members of the collective. This is stored sorted (just by value).
     **/
    members: Vec<AccountId>;
    /**
     * The member who provides the default vote for any other members that do not vote before
     * the timeout. If None, then no member has that privilege.
     **/
    prime: Option<AccountId>;
    /**
     * Proposals so far.
     **/
    proposalCount: u32;
    /**
     * Actual proposal for a given hash, if it's current.
     **/
    proposalOf: StorageMap<Hash | string | Uint8Array, Option<Proposal>>;
    /**
     * The hashes of the active proposals.
     **/
    proposals: Vec<Hash>;
    /**
     * Votes on a given proposal, if it is ongoing.
     **/
    voting: StorageMap<Hash | string | Uint8Array, Option<Votes>>;
  };
  generalCouncilMembership: {    /**
     * The current membership, stored as an ordered Vec.
     **/
    members: Vec<AccountId>;
    /**
     * The current prime member, if one exists.
     **/
    prime: Option<AccountId>;
  };
  graduallyUpdate: {    /**
     * All the on-going updates
     **/
    graduallyUpdates: Vec<GraduallyUpdate>;
    /**
     * The last updated block number
     **/
    lastUpdatedAt: BlockNumber;
  };
  grandpa: {    /**
     * The number of changes (both in terms of keys and underlying economic responsibilities)
     * in the "set" of Grandpa validators from genesis.
     **/
    currentSetId: SetId;
    /**
     * next block number where we can force a change.
     **/
    nextForced: Option<BlockNumber>;
    /**
     * Pending change: (signaled at, scheduled change).
     **/
    pendingChange: Option<StoredPendingChange>;
    /**
     * A mapping from grandpa set ID to the index of the *most recent* session for which its
     * members were responsible.
     * 
     * TWOX-NOTE: `SetId` is not under user control.
     **/
    setIdSession: StorageMap<SetId | AnyNumber | Uint8Array, Option<SessionIndex>>;
    /**
     * `true` if we are currently stalled.
     **/
    stalled: Option<ITuple<[BlockNumber, BlockNumber]>>;
    /**
     * State of the current authority set.
     **/
    state: StoredState;
  };
  homaCouncil: {    /**
     * The current members of the collective. This is stored sorted (just by value).
     **/
    members: Vec<AccountId>;
    /**
     * The member who provides the default vote for any other members that do not vote before
     * the timeout. If None, then no member has that privilege.
     **/
    prime: Option<AccountId>;
    /**
     * Proposals so far.
     **/
    proposalCount: u32;
    /**
     * Actual proposal for a given hash, if it's current.
     **/
    proposalOf: StorageMap<Hash | string | Uint8Array, Option<Proposal>>;
    /**
     * The hashes of the active proposals.
     **/
    proposals: Vec<Hash>;
    /**
     * Votes on a given proposal, if it is ongoing.
     **/
    voting: StorageMap<Hash | string | Uint8Array, Option<Votes>>;
  };
  homaCouncilMembership: {    /**
     * The current membership, stored as an ordered Vec.
     **/
    members: Vec<AccountId>;
    /**
     * The current prime member, if one exists.
     **/
    prime: Option<AccountId>;
  };
  honzon: {    /**
     * The authorization relationship map from
     * Authorizer -> (CollateralType, Authorizee) -> Authorized
     **/
    authorization: StorageDoubleMap<AccountId | string | Uint8Array, ITuple<[CurrencyId, AccountId]> | [CurrencyId | 'ACA' | 'AUSD' | 'DOT' | 'XBTC' | 'LDOT' | 'RENBTC' | number | Uint8Array, AccountId | string | Uint8Array], bool>;
    /**
     * System shutdown flag
     **/
    isShutdown: bool;
  };
  honzonCouncil: {    /**
     * The current members of the collective. This is stored sorted (just by value).
     **/
    members: Vec<AccountId>;
    /**
     * The member who provides the default vote for any other members that do not vote before
     * the timeout. If None, then no member has that privilege.
     **/
    prime: Option<AccountId>;
    /**
     * Proposals so far.
     **/
    proposalCount: u32;
    /**
     * Actual proposal for a given hash, if it's current.
     **/
    proposalOf: StorageMap<Hash | string | Uint8Array, Option<Proposal>>;
    /**
     * The hashes of the active proposals.
     **/
    proposals: Vec<Hash>;
    /**
     * Votes on a given proposal, if it is ongoing.
     **/
    voting: StorageMap<Hash | string | Uint8Array, Option<Votes>>;
  };
  honzonCouncilMembership: {    /**
     * The current membership, stored as an ordered Vec.
     **/
    members: Vec<AccountId>;
    /**
     * The current prime member, if one exists.
     **/
    prime: Option<AccountId>;
  };
  indices: {    /**
     * The lookup from index to account.
     **/
    accounts: StorageMap<AccountIndex | AnyNumber | Uint8Array, Option<ITuple<[AccountId, BalanceOf, bool]>>>;
  };
  loans: {    /**
     * The collateral asset amount of CDPs, map from
     * Owner -> CollateralType -> CollateralAmount
     **/
    collaterals: StorageDoubleMap<AccountId | string | Uint8Array, CurrencyId | 'ACA'|'AUSD'|'DOT'|'XBTC'|'LDOT'|'RENBTC' | number | Uint8Array, Balance>;
    /**
     * The debit amount records of CDPs, map from
     * CollateralType -> Owner -> DebitAmount
     **/
    debits: StorageDoubleMap<CurrencyId | 'ACA'|'AUSD'|'DOT'|'XBTC'|'LDOT'|'RENBTC' | number | Uint8Array, AccountId | string | Uint8Array, DebitBalance>;
    /**
     * The total collateral asset amount, map from
     * CollateralType -> TotalCollateralAmount
     **/
    totalCollaterals: StorageMap<CurrencyId | 'ACA'|'AUSD'|'DOT'|'XBTC'|'LDOT'|'RENBTC' | number | Uint8Array, Balance>;
    /**
     * The total debit amount, map from
     * CollateralType -> TotalDebitAmount
     **/
    totalDebits: StorageMap<CurrencyId | 'ACA'|'AUSD'|'DOT'|'XBTC'|'LDOT'|'RENBTC' | number | Uint8Array, DebitBalance>;
  };
  multisig: {    calls: StorageMap<U8aFixed | string | Uint8Array, Option<ITuple<[Bytes, AccountId, BalanceOf]>>>;
    /**
     * The set of open multisig operations.
     **/
    multisigs: StorageDoubleMap<AccountId | string | Uint8Array, U8aFixed | string | Uint8Array, Option<Multisig>>;
  };
  nomineesElection: {    currentEra: EraIndex;
    ledger: StorageMap<AccountId | string | Uint8Array, BondingLedger>;
    nominations: StorageMap<AccountId | string | Uint8Array, Vec<PolkadotAccountId>>;
    nominees: Vec<PolkadotAccountId>;
    votes: StorageMap<PolkadotAccountId | string | Uint8Array, Balance>;
  };
  operatorMembership: {    /**
     * The current membership, stored as an ordered Vec.
     **/
    members: Vec<AccountId>;
    /**
     * The current prime member, if one exists.
     **/
    prime: Option<AccountId>;
  };
  oracle: {    /**
     * If an oracle operator has feed a value in this block
     **/
    hasDispatched: OrderedSet;
    /**
     * True if Self::values(key) is up to date, otherwise the value is stale
     **/
    isUpdated: StorageMap<OracleKey | 'ACA'|'AUSD'|'DOT'|'XBTC'|'LDOT'|'RENBTC' | number | Uint8Array, bool>;
    /**
     * The current members of the collective. This is stored sorted (just by value).
     **/
    members: OrderedSet;
    nonces: StorageMap<AccountId | string | Uint8Array, u32>;
    /**
     * Raw values for each oracle operators
     **/
    rawValues: StorageDoubleMap<AccountId | string | Uint8Array, OracleKey | 'ACA'|'AUSD'|'DOT'|'XBTC'|'LDOT'|'RENBTC' | number | Uint8Array, Option<TimestampedValueOf>>;
    /**
     * Session key for oracle operators
     **/
    sessionKeys: StorageMap<AccountId | string | Uint8Array, Option<AuthorityId>>;
    /**
     * Combined value, may not be up to date
     **/
    values: StorageMap<OracleKey | 'ACA'|'AUSD'|'DOT'|'XBTC'|'LDOT'|'RENBTC' | number | Uint8Array, Option<TimestampedValueOf>>;
  };
  palletTreasury: {    /**
     * Proposal indices that have been approved but not yet awarded.
     **/
    approvals: Vec<ProposalIndex>;
    /**
     * Number of proposals that have been made.
     **/
    proposalCount: ProposalIndex;
    /**
     * Proposals that have been made.
     **/
    proposals: StorageMap<ProposalIndex | AnyNumber | Uint8Array, Option<Proposal>>;
    /**
     * Simple preimage lookup from the reason's hash to the original data. Again, has an
     * insecure enumerable hash since the key is guaranteed to be the result of a secure hash.
     **/
    reasons: StorageMap<Hash | string | Uint8Array, Option<Bytes>>;
    /**
     * Tips that are not yet completed. Keyed by the hash of `(reason, who)` from the value.
     * This has the insecure enumerable hash function since the key itself is already
     * guaranteed to be a secure hash.
     **/
    tips: StorageMap<Hash | string | Uint8Array, Option<OpenTip>>;
  };
  polkadotBridge: {    available: Balance;
    bonded: Balance;
    currentEra: EraIndex;
    eraStartBlockNumber: BlockNumber;
    forcedEra: Option<BlockNumber>;
    mockRewardRate: Option<Rate>;
    unbonding: Vec<ITuple<[Balance, EraIndex]>>;
  };
  prices: {    /**
     * Mapping from currency id to it's locked price
     **/
    lockedPrice: StorageMap<CurrencyId | 'ACA'|'AUSD'|'DOT'|'XBTC'|'LDOT'|'RENBTC' | number | Uint8Array, Option<Price>>;
  };
  randomnessCollectiveFlip: {    /**
     * Series of block headers from the last 81 blocks that acts as random seed material. This
     * is arranged as a ring buffer with `block_number % 81` being the index into the `Vec` of
     * the oldest hash.
     **/
    randomMaterial: Vec<Hash>;
  };
  recovery: {    /**
     * Active recovery attempts.
     * 
     * First account is the account to be recovered, and the second account
     * is the user trying to recover the account.
     **/
    activeRecoveries: StorageDoubleMap<AccountId | string | Uint8Array, AccountId | string | Uint8Array, Option<ActiveRecovery>>;
    /**
     * The list of allowed proxy accounts.
     * 
     * Map from the user who can access it to the recovered account.
     **/
    proxy: StorageMap<AccountId | string | Uint8Array, Option<AccountId>>;
    /**
     * The set of recoverable accounts and their recovery configuration.
     **/
    recoverable: StorageMap<AccountId | string | Uint8Array, Option<RecoveryConfig>>;
  };
  renVmBridge: {    /**
     * Signature blacklist. This is required to prevent double claim.
     **/
    signatures: StorageMap<EcdsaSignature | string | Uint8Array, Option<ITuple<[]>>>;
  };
  scheduleUpdate: {    delayedNormalDispatches: StorageDoubleMap<BlockNumber | AnyNumber | Uint8Array, DispatchId | AnyNumber | Uint8Array, Option<ITuple<[Option<AccountId>, CallOf, DispatchId]>>>;
    delayedOperationalDispatches: StorageDoubleMap<BlockNumber | AnyNumber | Uint8Array, DispatchId | AnyNumber | Uint8Array, Option<ITuple<[Option<AccountId>, CallOf, DispatchId]>>>;
    nextId: DispatchId;
  };
  session: {    /**
     * Current index of the session.
     **/
    currentIndex: SessionIndex;
    /**
     * Indices of disabled validators.
     * 
     * The set is cleared when `on_session_ending` returns a new set of identities.
     **/
    disabledValidators: Vec<u32>;
    /**
     * The owner of a key. The key is the `KeyTypeId` + the encoded key.
     **/
    keyOwner: StorageMap<ITuple<[KeyTypeId, Bytes]> | [KeyTypeId | AnyNumber | Uint8Array, Bytes | string | Uint8Array], Option<ValidatorId>>;
    /**
     * The next session keys for a validator.
     **/
    nextKeys: StorageMap<ValidatorId | string | Uint8Array, Option<Keys>>;
    /**
     * True if the underlying economic identities or weighting behind the validators
     * has changed in the queued validator set.
     **/
    queuedChanged: bool;
    /**
     * The queued keys for the next session. When the next session begins, these keys
     * will be used to determine the validator's session keys.
     **/
    queuedKeys: Vec<ITuple<[ValidatorId, Keys]>>;
    /**
     * The current set of validators.
     **/
    validators: Vec<ValidatorId>;
  };
  staking: {    /**
     * The active era information, it holds index and start.
     * 
     * The active era is the era currently rewarded.
     * Validator set of this era must be equal to `SessionInterface::validators`.
     **/
    activeEra: Option<ActiveEraInfo>;
    /**
     * Map from all locked "stash" accounts to the controller account.
     **/
    bonded: StorageMap<AccountId | string | Uint8Array, Option<AccountId>>;
    /**
     * A mapping from still-bonded eras to the first session index of that era.
     * 
     * Must contains information for eras for the range:
     * `[active_era - bounding_duration; active_era]`
     **/
    bondedEras: Vec<ITuple<[EraIndex, SessionIndex]>>;
    /**
     * The amount of currency given to reporters of a slash event which was
     * canceled by extraordinary circumstances (e.g. governance).
     **/
    canceledSlashPayout: BalanceOf;
    /**
     * The current era index.
     * 
     * This is the latest planned era, depending on how the Session pallet queues the validator
     * set, it might be active or not.
     **/
    currentEra: Option<EraIndex>;
    /**
     * The earliest era for which we have a pending, unapplied slash.
     **/
    earliestUnappliedSlash: Option<EraIndex>;
    /**
     * Flag to control the execution of the offchain election. When `Open(_)`, we accept
     * solutions to be submitted.
     **/
    eraElectionStatus: ElectionStatus;
    /**
     * Rewards for the last `HISTORY_DEPTH` eras.
     * If reward hasn't been set or has been removed then 0 reward is returned.
     **/
    erasRewardPoints: StorageMap<EraIndex | AnyNumber | Uint8Array, EraRewardPoints>;
    /**
     * Exposure of validator at era.
     * 
     * This is keyed first by the era index to allow bulk deletion and then the stash account.
     * 
     * Is it removed after `HISTORY_DEPTH` eras.
     * If stakers hasn't been set or has been removed then empty exposure is returned.
     **/
    erasStakers: StorageDoubleMap<EraIndex | AnyNumber | Uint8Array, AccountId | string | Uint8Array, Exposure>;
    /**
     * Clipped Exposure of validator at era.
     * 
     * This is similar to [`ErasStakers`] but number of nominators exposed is reduced to the
     * `T::MaxNominatorRewardedPerValidator` biggest stakers.
     * (Note: the field `total` and `own` of the exposure remains unchanged).
     * This is used to limit the i/o cost for the nominator payout.
     * 
     * This is keyed fist by the era index to allow bulk deletion and then the stash account.
     * 
     * Is it removed after `HISTORY_DEPTH` eras.
     * If stakers hasn't been set or has been removed then empty exposure is returned.
     **/
    erasStakersClipped: StorageDoubleMap<EraIndex | AnyNumber | Uint8Array, AccountId | string | Uint8Array, Exposure>;
    /**
     * The session index at which the era start for the last `HISTORY_DEPTH` eras.
     **/
    erasStartSessionIndex: StorageMap<EraIndex | AnyNumber | Uint8Array, Option<SessionIndex>>;
    /**
     * The total amount staked for the last `HISTORY_DEPTH` eras.
     * If total hasn't been set or has been removed then 0 stake is returned.
     **/
    erasTotalStake: StorageMap<EraIndex | AnyNumber | Uint8Array, BalanceOf>;
    /**
     * Similar to `ErasStakers`, this holds the preferences of validators.
     * 
     * This is keyed first by the era index to allow bulk deletion and then the stash account.
     * 
     * Is it removed after `HISTORY_DEPTH` eras.
     **/
    erasValidatorPrefs: StorageDoubleMap<EraIndex | AnyNumber | Uint8Array, AccountId | string | Uint8Array, ValidatorPrefs>;
    /**
     * The total validator era payout for the last `HISTORY_DEPTH` eras.
     * 
     * Eras that haven't finished yet or has been removed doesn't have reward.
     **/
    erasValidatorReward: StorageMap<EraIndex | AnyNumber | Uint8Array, Option<BalanceOf>>;
    /**
     * Mode of era forcing.
     **/
    forceEra: Forcing;
    /**
     * Number of eras to keep in history.
     * 
     * Information is kept for eras in `[current_era - history_depth; current_era]`.
     * 
     * Must be more than the number of eras delayed by session otherwise. I.e. active era must
     * always be in history. I.e. `active_era > current_era - history_depth` must be
     * guaranteed.
     **/
    historyDepth: u32;
    /**
     * Any validators that may never be slashed or forcibly kicked. It's a Vec since they're
     * easy to initialize and the performance hit is minimal (we expect no more than four
     * invulnerables) and restricted to testnets.
     **/
    invulnerables: Vec<AccountId>;
    /**
     * True if the current **planned** session is final. Note that this does not take era
     * forcing into account.
     **/
    isCurrentSessionFinal: bool;
    /**
     * Map from all (unlocked) "controller" accounts to the info regarding the staking.
     **/
    ledger: StorageMap<AccountId | string | Uint8Array, Option<StakingLedger>>;
    /**
     * Minimum number of staking participants before emergency conditions are imposed.
     **/
    minimumValidatorCount: u32;
    /**
     * The map from nominator stash key to the set of stash keys of all validators to nominate.
     **/
    nominators: StorageMap<AccountId | string | Uint8Array, Option<Nominations>>;
    /**
     * All slashing events on nominators, mapped by era to the highest slash value of the era.
     **/
    nominatorSlashInEra: StorageDoubleMap<EraIndex | AnyNumber | Uint8Array, AccountId | string | Uint8Array, Option<BalanceOf>>;
    /**
     * Where the reward payment should be made. Keyed by stash.
     **/
    payee: StorageMap<AccountId | string | Uint8Array, RewardDestination>;
    /**
     * The next validator set. At the end of an era, if this is available (potentially from the
     * result of an offchain worker), it is immediately used. Otherwise, the on-chain election
     * is executed.
     **/
    queuedElected: Option<ElectionResult>;
    /**
     * The score of the current [`QueuedElected`].
     **/
    queuedScore: Option<ElectionScore>;
    /**
     * Slashing spans for stash accounts.
     **/
    slashingSpans: StorageMap<AccountId | string | Uint8Array, Option<SlashingSpans>>;
    /**
     * The percentage of the slash that is distributed to reporters.
     * 
     * The rest of the slashed value is handled by the `Slash`.
     **/
    slashRewardFraction: Perbill;
    /**
     * Snapshot of nominators at the beginning of the current election window. This should only
     * have a value when [`EraElectionStatus`] == `ElectionStatus::Open(_)`.
     **/
    snapshotNominators: Option<Vec<AccountId>>;
    /**
     * Snapshot of validators at the beginning of the current election window. This should only
     * have a value when [`EraElectionStatus`] == `ElectionStatus::Open(_)`.
     **/
    snapshotValidators: Option<Vec<AccountId>>;
    /**
     * Records information about the maximum slash of a stash within a slashing span,
     * as well as how much reward has been paid out.
     **/
    spanSlash: StorageMap<ITuple<[AccountId, SpanIndex]> | [AccountId | string | Uint8Array, SpanIndex | AnyNumber | Uint8Array], SpanRecord>;
    /**
     * True if network has been upgraded to this version.
     * Storage version of the pallet.
     * 
     * This is set to v3.0.0 for new networks.
     **/
    storageVersion: Releases;
    /**
     * All unapplied slashes that are queued for later.
     **/
    unappliedSlashes: StorageMap<EraIndex | AnyNumber | Uint8Array, Vec<UnappliedSlash>>;
    /**
     * The ideal number of staking participants.
     **/
    validatorCount: u32;
    /**
     * The map from (wannabe) validator stash key to the preferences of that validator.
     **/
    validators: StorageMap<AccountId | string | Uint8Array, ValidatorPrefs>;
    /**
     * All slashing events on validators, mapped by era to the highest slash proportion
     * and slash value of the era.
     **/
    validatorSlashInEra: StorageDoubleMap<EraIndex | AnyNumber | Uint8Array, AccountId | string | Uint8Array, Option<ITuple<[Perbill, BalanceOf]>>>;
  };
  stakingPool: {    claimedUnbond: StorageDoubleMap<AccountId | string | Uint8Array, EraIndex | AnyNumber | Uint8Array, Balance>;
    currentEra: EraIndex;
    freeUnbonded: Balance;
    nextEraUnbond: ITuple<[Balance, Balance]>;
    totalBonded: Balance;
    totalClaimedUnbonded: Balance;
    unbonding: StorageMap<EraIndex | AnyNumber | Uint8Array, ITuple<[Balance, Balance]>>;
    unbondingToFree: Balance;
  };
  sudo: {    /**
     * The `AccountId` of the sudo key.
     **/
    key: AccountId;
  };
  system: {    /**
     * The full account information for a particular account ID.
     **/
    account: StorageMap<AccountId | string | Uint8Array, AccountInfo>;
    /**
     * Total length (in bytes) for all extrinsics put together, for the current block.
     **/
    allExtrinsicsLen: Option<u32>;
    /**
     * Map of block numbers to block hashes.
     **/
    blockHash: StorageMap<BlockNumber | AnyNumber | Uint8Array, Hash>;
    /**
     * The current weight for the block.
     **/
    blockWeight: ExtrinsicsWeight;
    /**
     * Digest of the current block, also part of the block header.
     **/
    digest: DigestOf;
    /**
     * The number of events in the `Events<T>` list.
     **/
    eventCount: EventIndex;
    /**
     * Events deposited for the current block.
     **/
    events: Vec<EventRecord>;
    /**
     * Mapping between a topic (represented by T::Hash) and a vector of indexes
     * of events in the `<Events<T>>` list.
     * 
     * All topic vectors have deterministic storage locations depending on the topic. This
     * allows light-clients to leverage the changes trie storage tracking mechanism and
     * in case of changes fetch the list of events of interest.
     * 
     * The value has the type `(T::BlockNumber, EventIndex)` because if we used only just
     * the `EventIndex` then in case if the topic has the same contents on the next block
     * no notification will be triggered thus the event might be lost.
     **/
    eventTopics: StorageMap<Hash | string | Uint8Array, Vec<ITuple<[BlockNumber, EventIndex]>>>;
    /**
     * The execution phase of the block.
     **/
    executionPhase: Option<Phase>;
    /**
     * Total extrinsics count for the current block.
     **/
    extrinsicCount: Option<u32>;
    /**
     * Extrinsics data for the current block (maps an extrinsic's index to its data).
     **/
    extrinsicData: StorageMap<u32 | AnyNumber | Uint8Array, Bytes>;
    /**
     * Extrinsics root of the current block, also part of the block header.
     **/
    extrinsicsRoot: Hash;
    /**
     * Stores the `spec_version` and `spec_name` of when the last runtime upgrade happened.
     **/
    lastRuntimeUpgrade: Option<LastRuntimeUpgradeInfo>;
    /**
     * The current block number being processed. Set by `execute_block`.
     **/
    number: BlockNumber;
    /**
     * Hash of the previous block.
     **/
    parentHash: Hash;
  };
  technicalCouncil: {    /**
     * The current members of the collective. This is stored sorted (just by value).
     **/
    members: Vec<AccountId>;
    /**
     * The member who provides the default vote for any other members that do not vote before
     * the timeout. If None, then no member has that privilege.
     **/
    prime: Option<AccountId>;
    /**
     * Proposals so far.
     **/
    proposalCount: u32;
    /**
     * Actual proposal for a given hash, if it's current.
     **/
    proposalOf: StorageMap<Hash | string | Uint8Array, Option<Proposal>>;
    /**
     * The hashes of the active proposals.
     **/
    proposals: Vec<Hash>;
    /**
     * Votes on a given proposal, if it is ongoing.
     **/
    voting: StorageMap<Hash | string | Uint8Array, Option<Votes>>;
  };
  technicalCouncilMembership: {    /**
     * The current membership, stored as an ordered Vec.
     **/
    members: Vec<AccountId>;
    /**
     * The current prime member, if one exists.
     **/
    prime: Option<AccountId>;
  };
  timestamp: {    /**
     * Did the timestamp get updated in this block?
     **/
    didUpdate: bool;
    /**
     * Current time for the current block.
     **/
    now: Moment;
  };
  tokens: {    /**
     * The balance of a token type under an account.
     * 
     * NOTE: If the total is ever zero, decrease account ref account.
     * 
     * NOTE: This is only used in the case that this module is used to store balances.
     **/
    accounts: StorageDoubleMap<AccountId | string | Uint8Array, CurrencyId | 'ACA'|'AUSD'|'DOT'|'XBTC'|'LDOT'|'RENBTC' | number | Uint8Array, AccountData>;
    /**
     * Any liquidity locks of a token type under an account.
     * NOTE: Should only be accessed when setting, changing and freeing a lock.
     **/
    locks: StorageDoubleMap<AccountId | string | Uint8Array, CurrencyId | 'ACA'|'AUSD'|'DOT'|'XBTC'|'LDOT'|'RENBTC' | number | Uint8Array, Vec<BalanceLock>>;
    /**
     * The total issuance of a token type.
     **/
    totalIssuance: StorageMap<CurrencyId | 'ACA'|'AUSD'|'DOT'|'XBTC'|'LDOT'|'RENBTC' | number | Uint8Array, Balance>;
  };
  transactionPayment: {    nextFeeMultiplier: Multiplier;
    storageVersion: Releases;
  };
  vesting: {    /**
     * Vesting schedules of an account.
     **/
    vestingSchedules: StorageMap<AccountId | string | Uint8Array, Vec<VestingScheduleOf>>;
  };
}
