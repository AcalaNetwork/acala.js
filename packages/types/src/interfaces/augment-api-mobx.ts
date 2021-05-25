// Auto-generated via `yarn polkadot-types-from-chain`, do not edit
/* eslint-disable */

import type { Bytes, Option, U8aFixed, Vec, bool, u32, u64 } from '@polkadot/types';
import type { AnyNumber, ITuple } from '@polkadot/types/types';
import type { CollateralAuctionItem } from '@acala-network/types/interfaces/auctionManager';
import type { RiskManagementParams } from '@acala-network/types/interfaces/cdpEngine';
import type { TradingPairStatus } from '@acala-network/types/interfaces/dex';
import type { CodeInfo, Erc20Info, EvmAddress } from '@acala-network/types/interfaces/evm';
import type { Guarantee, RelaychainAccountId, ValidatorBacking } from '@acala-network/types/interfaces/homaValidatorList';
import type { PoolId } from '@acala-network/types/interfaces/incentives';
import type { Position } from '@acala-network/types/interfaces/loans';
import type { ClassId, ClassInfoOf, TokenId, TokenInfoOf } from '@acala-network/types/interfaces/nft';
import type { BondingLedger, NomineeId } from '@acala-network/types/interfaces/nomineesElection';
import type { AirDropCurrencyId, AuctionId, CurrencyId, TradingPair } from '@acala-network/types/interfaces/primitives';
import type { DestAddress, PublicKey } from '@acala-network/types/interfaces/renvmBridge';
import type { AccountId, AccountIndex, Balance, BalanceOf, BlockNumber, H256, Hash, KeyTypeId, Moment, OpaqueCall, OracleKey, Perbill, Releases, Slot, ValidatorId } from '@acala-network/types/interfaces/runtime';
import type { Ledger, Params, SubAccountStatus } from '@acala-network/types/interfaces/stakingPool';
import type { ExchangeRate, Rate } from '@acala-network/types/interfaces/support';
import type { GraduallyUpdate } from '@open-web3/orml-types/interfaces/graduallyUpdates';
import type { OrderedSet, TimestampedValueOf } from '@open-web3/orml-types/interfaces/oracle';
import type { PoolInfo, Share } from '@open-web3/orml-types/interfaces/rewards';
import type { AuctionInfo, Price } from '@open-web3/orml-types/interfaces/traits';
import type { VestingScheduleOf } from '@open-web3/orml-types/interfaces/vesting';
import type { UncleEntryItem } from '@polkadot/types/interfaces/authorship';
import type { BabeAuthorityWeight, BabeEpochConfiguration, MaybeRandomness, NextConfigDescriptor, Randomness } from '@polkadot/types/interfaces/babe';
import type { AccountData, BalanceLock } from '@polkadot/types/interfaces/balances';
import type { ProposalIndex, Votes } from '@polkadot/types/interfaces/collective';
import type { AuthorityId } from '@polkadot/types/interfaces/consensus';
import type { Proposal } from '@polkadot/types/interfaces/democracy';
import type { EcdsaSignature } from '@polkadot/types/interfaces/extrinsics';
import type { SetId, StoredPendingChange, StoredState } from '@polkadot/types/interfaces/grandpa';
import type { ProxyAnnouncement, ProxyDefinition } from '@polkadot/types/interfaces/proxy';
import type { ActiveRecovery, RecoveryConfig } from '@polkadot/types/interfaces/recovery';
import type { Scheduled, TaskAddress } from '@polkadot/types/interfaces/scheduler';
import type { Keys, SessionIndex } from '@polkadot/types/interfaces/session';
import type { ActiveEraInfo, ElectionPhase, EraIndex, EraRewardPoints, Exposure, Forcing, Nominations, ReadySolution, RewardDestination, RoundSnapshot, SeatHolder, SlashingSpans, SolutionOrSnapshotSize, SpanIndex, SpanRecord, StakingLedger, UnappliedSlash, ValidatorPrefs, Voter } from '@polkadot/types/interfaces/staking';
import type { AccountInfo, ConsumedWeight, DigestOf, EventIndex, EventRecord, LastRuntimeUpgradeInfo, Phase } from '@polkadot/types/interfaces/system';
import type { Bounty, BountyIndex, OpenTip } from '@polkadot/types/interfaces/treasury';
import type { Multiplier } from '@polkadot/types/interfaces/txpayment';
import type { Multisig } from '@polkadot/types/interfaces/utility';
import type { BaseStorageType, StorageDoubleMap, StorageMap } from '@open-web3/api-mobx';

export interface StorageType extends BaseStorageType {
  acalaOracle: {    /**
     * If an oracle operator has feed a value in this block
     **/
    hasDispatched: OrderedSet | null;
    /**
     * True if Self::values(key) is up to date, otherwise the value is stale
     **/
    isUpdated: StorageMap<OracleKey | { Token: any } | { DEXShare: any } | { ERC20: any } | { ChainSafe: any } | string, bool>;
    /**
     * The current members of the collective. This is stored sorted (just by
     * value).
     **/
    members: OrderedSet | null;
    /**
     * Raw values for each oracle operators
     **/
    rawValues: StorageDoubleMap<AccountId | string, OracleKey | { Token: any } | { DEXShare: any } | { ERC20: any } | { ChainSafe: any } | string, Option<TimestampedValueOf>>;
    /**
     * Combined value, may not be up to date
     **/
    values: StorageMap<OracleKey | { Token: any } | { DEXShare: any } | { ERC20: any } | { ChainSafe: any } | string, Option<TimestampedValueOf>>;
  };
  acalaTreasury: {    /**
     * Proposal indices that have been approved but not yet awarded.
     **/
    approvals: Vec<ProposalIndex> | null;
    /**
     * Number of proposals that have been made.
     **/
    proposalCount: ProposalIndex | null;
    /**
     * Proposals that have been made.
     **/
    proposals: StorageMap<ProposalIndex | AnyNumber, Option<Proposal>>;
  };
  airDrop: {    airDrops: StorageDoubleMap<AccountId | string, AirDropCurrencyId | 'KAR'|'ACA' | number, Balance>;
  };
  auction: {    /**
     * Index auctions by end time.
     **/
    auctionEndTime: StorageDoubleMap<BlockNumber | AnyNumber, AuctionId | AnyNumber, Option<ITuple<[]>>>;
    /**
     * Stores on-going and future auctions. Closed auction are removed.
     **/
    auctions: StorageMap<AuctionId | AnyNumber, Option<AuctionInfo>>;
    /**
     * Track the next auction ID.
     **/
    auctionsIndex: AuctionId | null;
  };
  auctionManager: {    /**
     * Mapping from auction id to collateral auction info
     * 
     * CollateralAuctions: map AuctionId => Option<CollateralAuctionItem>
     **/
    collateralAuctions: StorageMap<AuctionId | AnyNumber, Option<CollateralAuctionItem>>;
    /**
     * Record of the total collateral amount of all active collateral auctions
     * under specific collateral type CollateralType -> TotalAmount
     * 
     * TotalCollateralInAuction: map CurrencyId => Balance
     **/
    totalCollateralInAuction: StorageMap<CurrencyId | { Token: any } | { DEXShare: any } | { ERC20: any } | { ChainSafe: any } | string, Balance>;
    /**
     * Record of total target sales of all active collateral auctions
     * 
     * TotalTargetInAuction: Balance
     **/
    totalTargetInAuction: Balance | null;
  };
  authorship: {    /**
     * Author of current block.
     **/
    author: Option<AccountId> | null;
    /**
     * Whether uncles were already set in this block.
     **/
    didSetUncles: bool | null;
    /**
     * Uncles
     **/
    uncles: Vec<UncleEntryItem> | null;
  };
  babe: {    /**
     * Current epoch authorities.
     **/
    authorities: Vec<ITuple<[AuthorityId, BabeAuthorityWeight]>> | null;
    /**
     * Temporary value (cleared at block finalization) that includes the VRF output generated
     * at this block. This field should always be populated during block processing unless
     * secondary plain slots are enabled (which don't contain a VRF output).
     **/
    authorVrfRandomness: MaybeRandomness | null;
    /**
     * Current slot number.
     **/
    currentSlot: Slot | null;
    /**
     * The configuration for the current epoch. Should never be `None` as it is initialized in genesis.
     **/
    epochConfig: Option<BabeEpochConfiguration> | null;
    /**
     * Current epoch index.
     **/
    epochIndex: u64 | null;
    /**
     * The block numbers when the last and current epoch have started, respectively `N-1` and
     * `N`.
     * NOTE: We track this is in order to annotate the block number when a given pool of
     * entropy was fixed (i.e. it was known to chain observers). Since epochs are defined in
     * slots, which may be skipped, the block numbers may not line up with the slot numbers.
     **/
    epochStart: ITuple<[BlockNumber, BlockNumber]> | null;
    /**
     * The slot at which the first epoch actually started. This is 0
     * until the first block of the chain.
     **/
    genesisSlot: Slot | null;
    /**
     * Temporary value (cleared at block finalization) which is `Some`
     * if per-block initialization has already been called for current block.
     **/
    initialized: Option<MaybeRandomness> | null;
    /**
     * How late the current block is compared to its parent.
     * 
     * This entry is populated as part of block execution and is cleaned up
     * on block finalization. Querying this storage entry outside of block
     * execution context should always yield zero.
     **/
    lateness: BlockNumber | null;
    /**
     * Next epoch authorities.
     **/
    nextAuthorities: Vec<ITuple<[AuthorityId, BabeAuthorityWeight]>> | null;
    /**
     * The configuration for the next epoch, `None` if the config will not change
     * (you can fallback to `EpochConfig` instead in that case).
     **/
    nextEpochConfig: Option<BabeEpochConfiguration> | null;
    /**
     * Next epoch randomness.
     **/
    nextRandomness: Randomness | null;
    /**
     * Pending epoch configuration change that will be applied when the next epoch is enacted.
     **/
    pendingEpochConfigChange: Option<NextConfigDescriptor> | null;
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
    randomness: Randomness | null;
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
    segmentIndex: u32 | null;
    /**
     * TWOX-NOTE: `SegmentIndex` is an increasing integer, so this is okay.
     **/
    underConstruction: StorageMap<u32 | AnyNumber, Vec<Randomness>>;
  };
  balances: {    /**
     * The balance of an account.
     * 
     * NOTE: This is only used in the case that this pallet is used to store balances.
     **/
    account: StorageMap<AccountId | string, AccountData>;
    /**
     * Any liquidity locks on some account balances.
     * NOTE: Should only be accessed when setting, changing and freeing a lock.
     **/
    locks: StorageMap<AccountId | string, Vec<BalanceLock>>;
    /**
     * Storage version of the pallet.
     * 
     * This is set to v2.0.0 for new networks.
     **/
    storageVersion: Releases | null;
    /**
     * The total units issued in the system.
     **/
    totalIssuance: Balance | null;
  };
  bandOracle: {    /**
     * If an oracle operator has feed a value in this block
     **/
    hasDispatched: OrderedSet | null;
    /**
     * True if Self::values(key) is up to date, otherwise the value is stale
     **/
    isUpdated: StorageMap<OracleKey | { Token: any } | { DEXShare: any } | { ERC20: any } | { ChainSafe: any } | string, bool>;
    /**
     * The current members of the collective. This is stored sorted (just by
     * value).
     **/
    members: OrderedSet | null;
    /**
     * Raw values for each oracle operators
     **/
    rawValues: StorageDoubleMap<AccountId | string, OracleKey | { Token: any } | { DEXShare: any } | { ERC20: any } | { ChainSafe: any } | string, Option<TimestampedValueOf>>;
    /**
     * Combined value, may not be up to date
     **/
    values: StorageMap<OracleKey | { Token: any } | { DEXShare: any } | { ERC20: any } | { ChainSafe: any } | string, Option<TimestampedValueOf>>;
  };
  bounties: {    /**
     * Bounties that have been made.
     **/
    bounties: StorageMap<BountyIndex | AnyNumber, Option<Bounty>>;
    /**
     * Bounty indices that have been approved but not yet funded.
     **/
    bountyApprovals: Vec<BountyIndex> | null;
    /**
     * Number of bounty proposals that have been made.
     **/
    bountyCount: BountyIndex | null;
    /**
     * The description of each bounty.
     **/
    bountyDescriptions: StorageMap<BountyIndex | AnyNumber, Option<Bytes>>;
  };
  cdpEngine: {    /**
     * Mapping from collateral type to its risk management params
     * 
     * CollateralParams: CurrencyId => RiskManagementParams
     **/
    collateralParams: StorageMap<CurrencyId | { Token: any } | { DEXShare: any } | { ERC20: any } | { ChainSafe: any } | string, RiskManagementParams>;
    /**
     * Mapping from collateral type to its exchange rate of debit units and
     * debit value
     * 
     * DebitExchangeRate: CurrencyId => Option<ExchangeRate>
     **/
    debitExchangeRate: StorageMap<CurrencyId | { Token: any } | { DEXShare: any } | { ERC20: any } | { ChainSafe: any } | string, Option<ExchangeRate>>;
    /**
     * Global interest rate per sec for all types of collateral
     * 
     * GlobalInterestRatePerSec: Rate
     **/
    globalInterestRatePerSec: Rate | null;
    /**
     * Timestamp in seconds of the last interest accumulation
     * 
     * LastAccumulationSecs: u64
     **/
    lastAccumulationSecs: u64 | null;
  };
  cdpTreasury: {    /**
     * Current total debit value of system. It's not same as debit in CDP
     * engine, it is the bad debt of the system.
     * 
     * DebitPool: Balance
     **/
    debitPool: Balance | null;
    /**
     * The expected amount size for per lot collateral auction of specific
     * collateral type.
     * 
     * ExpectedCollateralAuctionSize: map CurrencyId => Balance
     **/
    expectedCollateralAuctionSize: StorageMap<CurrencyId | { Token: any } | { DEXShare: any } | { ERC20: any } | { ChainSafe: any } | string, Balance>;
  };
  dex: {    /**
     * Liquidity pool for TradingPair.
     * 
     * LiquidityPool: map TradingPair => (Balance, Balance)
     **/
    liquidityPool: StorageMap<TradingPair, ITuple<[Balance, Balance]>>;
    /**
     * Provision of TradingPair by AccountId.
     * 
     * ProvisioningPool: double_map TradingPair, AccountId => (Balance,
     * Balance)
     **/
    provisioningPool: StorageDoubleMap<TradingPair, AccountId | string, ITuple<[Balance, Balance]>>;
    /**
     * Status for TradingPair.
     * 
     * TradingPairStatuses: map TradingPair => TradingPairStatus
     **/
    tradingPairStatuses: StorageMap<TradingPair, TradingPairStatus>;
  };
  electionProviderMultiPhase: {    /**
     * Current phase.
     **/
    currentPhase: ElectionPhase | null;
    /**
     * Desired number of targets to elect for this round.
     * 
     * Only exists when [`Snapshot`] is present.
     **/
    desiredTargets: Option<u32> | null;
    /**
     * Current best solution, signed or unsigned, queued to be returned upon `elect`.
     **/
    queuedSolution: Option<ReadySolution> | null;
    /**
     * Internal counter for the number of rounds.
     * 
     * This is useful for de-duplication of transactions submitted to the pool, and general
     * diagnostics of the pallet.
     * 
     * This is merely incremented once per every time that an upstream `elect` is called.
     **/
    round: u32 | null;
    /**
     * Snapshot data of the round.
     * 
     * This is created at the beginning of the signed phase and cleared upon calling `elect`.
     **/
    snapshot: Option<RoundSnapshot> | null;
    /**
     * The metadata of the [`RoundSnapshot`]
     * 
     * Only exists when [`Snapshot`] is present.
     **/
    snapshotMetadata: Option<SolutionOrSnapshotSize> | null;
  };
  electionsPhragmen: {    /**
     * The present candidate list. A current member or runner-up can never enter this vector
     * and is always implicitly assumed to be a candidate.
     * 
     * Second element is the deposit.
     * 
     * Invariant: Always sorted based on account id.
     **/
    candidates: Vec<ITuple<[AccountId, BalanceOf]>> | null;
    /**
     * The total number of vote rounds that have happened, excluding the upcoming one.
     **/
    electionRounds: u32 | null;
    /**
     * The current elected members.
     * 
     * Invariant: Always sorted based on account id.
     **/
    members: Vec<SeatHolder> | null;
    /**
     * The current reserved runners-up.
     * 
     * Invariant: Always sorted based on rank (worse to best). Upon removal of a member, the
     * last (i.e. _best_) runner-up will be replaced.
     **/
    runnersUp: Vec<SeatHolder> | null;
    /**
     * Votes and locked stake of a particular voter.
     * 
     * TWOX-NOTE: SAFE as `AccountId` is a crypto hash.
     **/
    voting: StorageMap<AccountId | string, Voter>;
  };
  emergencyShutdown: {    /**
     * Open final redemption flag
     * 
     * CanRefund: bool
     **/
    canRefund: bool | null;
    /**
     * Emergency shutdown flag
     * 
     * IsShutdown: bool
     **/
    isShutdown: bool | null;
  };
  evm: {    /**
     * The EVM accounts info.
     * 
     * Accounts: map EvmAddress => Option<AccountInfo<T>>
     **/
    accounts: StorageMap<EvmAddress | string, Option<AccountInfo>>;
    /**
     * The storages for EVM contracts.
     * 
     * AccountStorages: double_map EvmAddress, H256 => H256
     **/
    accountStorages: StorageDoubleMap<EvmAddress | string, H256 | string, H256>;
    /**
     * The code info for EVM contracts.
     * Key is Keccak256 hash of code.
     * 
     * CodeInfos: H256 => Option<CodeInfo>
     **/
    codeInfos: StorageMap<H256 | string, Option<CodeInfo>>;
    /**
     * The code for EVM contracts.
     * Key is Keccak256 hash of code.
     * 
     * Codes: H256 => Vec<u8>
     **/
    codes: StorageMap<H256 | string, Bytes>;
    /**
     * Extrinsics origin for the current transaction.
     * 
     * ExtrinsicOrigin: Option<AccountId>
     **/
    extrinsicOrigin: Option<AccountId> | null;
    /**
     * Next available system contract address.
     * 
     * NetworkContractIndex: u64
     **/
    networkContractIndex: u64 | null;
  };
  evmAccounts: {    /**
     * The Substrate Account for EvmAddresses
     * 
     * Accounts: map EvmAddress => Option<AccountId>
     **/
    accounts: StorageMap<EvmAddress | string, Option<AccountId>>;
    /**
     * The EvmAddress for Substrate Accounts
     * 
     * EvmAddresses: map AccountId => Option<EvmAddress>
     **/
    evmAddresses: StorageMap<AccountId | string, Option<EvmAddress>>;
  };
  evmManager: {    /**
     * Mapping between u32 and Erc20 address.
     * Erc20 address is 20 byte, take the first 4 non-zero bytes, if it is less
     * than 4, add 0 to the left.
     * 
     * map u32 => Option<Erc20Info>
     **/
    currencyIdMap: StorageMap<u32 | AnyNumber, Option<Erc20Info>>;
  };
  generalCouncil: {    /**
     * The current members of the collective. This is stored sorted (just by value).
     **/
    members: Vec<AccountId> | null;
    /**
     * The prime member that helps determine the default vote behavior in case of absentations.
     **/
    prime: Option<AccountId> | null;
    /**
     * Proposals so far.
     **/
    proposalCount: u32 | null;
    /**
     * Actual proposal for a given hash, if it's current.
     **/
    proposalOf: StorageMap<Hash | string, Option<Proposal>>;
    /**
     * The hashes of the active proposals.
     **/
    proposals: Vec<Hash> | null;
    /**
     * Votes on a given proposal, if it is ongoing.
     **/
    voting: StorageMap<Hash | string, Option<Votes>>;
  };
  generalCouncilMembership: {    /**
     * The current membership, stored as an ordered Vec.
     **/
    members: Vec<AccountId> | null;
    /**
     * The current prime member, if one exists.
     **/
    prime: Option<AccountId> | null;
  };
  graduallyUpdate: {    /**
     * All the on-going updates
     **/
    graduallyUpdates: Vec<GraduallyUpdate> | null;
    /**
     * The last updated block number
     **/
    lastUpdatedAt: BlockNumber | null;
  };
  grandpa: {    /**
     * The number of changes (both in terms of keys and underlying economic responsibilities)
     * in the "set" of Grandpa validators from genesis.
     **/
    currentSetId: SetId | null;
    /**
     * next block number where we can force a change.
     **/
    nextForced: Option<BlockNumber> | null;
    /**
     * Pending change: (signaled at, scheduled change).
     **/
    pendingChange: Option<StoredPendingChange> | null;
    /**
     * A mapping from grandpa set ID to the index of the *most recent* session for which its
     * members were responsible.
     * 
     * TWOX-NOTE: `SetId` is not under user control.
     **/
    setIdSession: StorageMap<SetId | AnyNumber, Option<SessionIndex>>;
    /**
     * `true` if we are currently stalled.
     **/
    stalled: Option<ITuple<[BlockNumber, BlockNumber]>> | null;
    /**
     * State of the current authority set.
     **/
    state: StoredState | null;
  };
  homaCouncil: {    /**
     * The current members of the collective. This is stored sorted (just by value).
     **/
    members: Vec<AccountId> | null;
    /**
     * The prime member that helps determine the default vote behavior in case of absentations.
     **/
    prime: Option<AccountId> | null;
    /**
     * Proposals so far.
     **/
    proposalCount: u32 | null;
    /**
     * Actual proposal for a given hash, if it's current.
     **/
    proposalOf: StorageMap<Hash | string, Option<Proposal>>;
    /**
     * The hashes of the active proposals.
     **/
    proposals: Vec<Hash> | null;
    /**
     * Votes on a given proposal, if it is ongoing.
     **/
    voting: StorageMap<Hash | string, Option<Votes>>;
  };
  homaCouncilMembership: {    /**
     * The current membership, stored as an ordered Vec.
     **/
    members: Vec<AccountId> | null;
    /**
     * The current prime member, if one exists.
     **/
    prime: Option<AccountId> | null;
  };
  homaValidatorListModule: {    /**
     * The slash guarantee deposits for relaychain validators.
     * 
     * Guarantees: double_map RelaychainAccountId, AccountId => Option<Guarantee>
     **/
    guarantees: StorageDoubleMap<RelaychainAccountId | string, AccountId | string, Option<Guarantee>>;
    /**
     * Total deposits for users.
     * 
     * TotalLockedByGuarantor: map AccountId => Option<Balance>
     **/
    totalLockedByGuarantor: StorageMap<AccountId | string, Option<Balance>>;
    /**
     * Total deposit for validators.
     * 
     * ValidatorBackings: map RelaychainAccountId => Option<ValidatorBacking>
     **/
    validatorBackings: StorageMap<RelaychainAccountId | string, Option<ValidatorBacking>>;
  };
  honzon: {    /**
     * The authorization relationship map from
     * Authorizer -> (CollateralType, Authorizee) -> Authorized
     * 
     * Authorization: double_map AccountId, (CurrencyId, T::AccountId) => Option<()>
     **/
    authorization: StorageDoubleMap<AccountId | string, ITuple<[CurrencyId, AccountId]> | [CurrencyId | { Token: any } | { DEXShare: any } | { ERC20: any } | { ChainSafe: any } | string, AccountId | string], Option<ITuple<[]>>>;
  };
  honzonCouncil: {    /**
     * The current members of the collective. This is stored sorted (just by value).
     **/
    members: Vec<AccountId> | null;
    /**
     * The prime member that helps determine the default vote behavior in case of absentations.
     **/
    prime: Option<AccountId> | null;
    /**
     * Proposals so far.
     **/
    proposalCount: u32 | null;
    /**
     * Actual proposal for a given hash, if it's current.
     **/
    proposalOf: StorageMap<Hash | string, Option<Proposal>>;
    /**
     * The hashes of the active proposals.
     **/
    proposals: Vec<Hash> | null;
    /**
     * Votes on a given proposal, if it is ongoing.
     **/
    voting: StorageMap<Hash | string, Option<Votes>>;
  };
  honzonCouncilMembership: {    /**
     * The current membership, stored as an ordered Vec.
     **/
    members: Vec<AccountId> | null;
    /**
     * The current prime member, if one exists.
     **/
    prime: Option<AccountId> | null;
  };
  incentives: {    /**
     * Mapping from pool to its fixed reward rate per period.
     * 
     * DexSavingRewardRate: map PoolId => Rate
     **/
    dexSavingRewardRate: StorageMap<PoolId | { LoansIncentive: any } | { DexIncentive: any } | { HomaIncentive: any } | { DexSaving: any } | { HomaValidatorAllowance: any } | string, Rate>;
    /**
     * Mapping from pool to its fixed reward amount per period.
     * 
     * IncentiveRewardAmount: map PoolId => Balance
     **/
    incentiveRewardAmount: StorageMap<PoolId | { LoansIncentive: any } | { DexIncentive: any } | { HomaIncentive: any } | { DexSaving: any } | { HomaValidatorAllowance: any } | string, Balance>;
  };
  indices: {    /**
     * The lookup from index to account.
     **/
    accounts: StorageMap<AccountIndex | AnyNumber, Option<ITuple<[AccountId, BalanceOf, bool]>>>;
  };
  loans: {    /**
     * The collateralized debit positions, map from
     * Owner -> CollateralType -> Position
     * 
     * Positions: double_map CurrencyId, AccountId => Position
     **/
    positions: StorageDoubleMap<CurrencyId | { Token: any } | { DEXShare: any } | { ERC20: any } | { ChainSafe: any } | string, AccountId | string, Position>;
    /**
     * The total collateralized debit positions, map from
     * CollateralType -> Position
     * 
     * TotalPositions: CurrencyId => Position
     **/
    totalPositions: StorageMap<CurrencyId | { Token: any } | { DEXShare: any } | { ERC20: any } | { ChainSafe: any } | string, Position>;
  };
  multisig: {    calls: StorageMap<U8aFixed | string, Option<ITuple<[OpaqueCall, AccountId, BalanceOf]>>>;
    /**
     * The set of open multisig operations.
     **/
    multisigs: StorageDoubleMap<AccountId | string, U8aFixed | string, Option<Multisig>>;
  };
  nomineesElection: {    /**
     * Current era index.
     * 
     * CurrentEra: EraIndex
     **/
    currentEra: EraIndex | null;
    /**
     * The nomination bonding ledger.
     * 
     * Ledger: map => AccountId, BondingLedger
     **/
    ledger: StorageMap<AccountId | string, BondingLedger>;
    /**
     * The nominations for nominators.
     * 
     * Nominations: map AccountId => Vec<NomineeId>
     **/
    nominations: StorageMap<AccountId | string, Vec<NomineeId>>;
    /**
     * The elected nominees.
     * 
     * Nominees: Vec<NomineeId>
     **/
    nominees: Vec<NomineeId> | null;
    /**
     * The total voting value for nominees.
     * 
     * Votes: map NomineeId => Balance
     **/
    votes: StorageMap<NomineeId | string, Balance>;
  };
  operatorMembershipAcala: {    /**
     * The current membership, stored as an ordered Vec.
     **/
    members: Vec<AccountId> | null;
    /**
     * The current prime member, if one exists.
     **/
    prime: Option<AccountId> | null;
  };
  operatorMembershipBand: {    /**
     * The current membership, stored as an ordered Vec.
     **/
    members: Vec<AccountId> | null;
    /**
     * The current prime member, if one exists.
     **/
    prime: Option<AccountId> | null;
  };
  ormlNft: {    /**
     * Store class info.
     * 
     * Returns `None` if class info not set or removed.
     **/
    classes: StorageMap<ClassId | AnyNumber, Option<ClassInfoOf>>;
    /**
     * Next available class ID.
     **/
    nextClassId: ClassId | null;
    /**
     * Next available token ID.
     **/
    nextTokenId: StorageMap<ClassId | AnyNumber, TokenId>;
    /**
     * Store token info.
     * 
     * Returns `None` if token info not set or removed.
     **/
    tokens: StorageDoubleMap<ClassId | AnyNumber, TokenId | AnyNumber, Option<TokenInfoOf>>;
    /**
     * Token existence check by owner and class ID.
     **/
    tokensByOwner: StorageDoubleMap<AccountId | string, ITuple<[ClassId, TokenId]> | [ClassId | AnyNumber, TokenId | AnyNumber], ITuple<[]>>;
  };
  polkadotBridge: {    currentEra: EraIndex | null;
    eraStartBlockNumber: BlockNumber | null;
    forcedEra: Option<BlockNumber> | null;
    subAccounts: StorageMap<u32 | AnyNumber, SubAccountStatus>;
  };
  prices: {    /**
     * Mapping from currency id to it's locked price
     * 
     * map CurrencyId => Option<Price>
     **/
    lockedPrice: StorageMap<CurrencyId | { Token: any } | { DEXShare: any } | { ERC20: any } | { ChainSafe: any } | string, Option<Price>>;
  };
  proxy: {    /**
     * The announcements made by the proxy (key).
     **/
    announcements: StorageMap<AccountId | string, ITuple<[Vec<ProxyAnnouncement>, BalanceOf]>>;
    /**
     * The set of account proxies. Maps the account which has delegated to the accounts
     * which are being delegated to, together with the amount held on deposit.
     **/
    proxies: StorageMap<AccountId | string, ITuple<[Vec<ProxyDefinition>, BalanceOf]>>;
  };
  randomnessCollectiveFlip: {    /**
     * Series of block headers from the last 81 blocks that acts as random seed material. This
     * is arranged as a ring buffer with `block_number % 81` being the index into the `Vec` of
     * the oldest hash.
     **/
    randomMaterial: Vec<Hash> | null;
  };
  recovery: {    /**
     * Active recovery attempts.
     * 
     * First account is the account to be recovered, and the second account
     * is the user trying to recover the account.
     **/
    activeRecoveries: StorageDoubleMap<AccountId | string, AccountId | string, Option<ActiveRecovery>>;
    /**
     * The list of allowed proxy accounts.
     * 
     * Map from the user who can access it to the recovered account.
     **/
    proxy: StorageMap<AccountId | string, Option<AccountId>>;
    /**
     * The set of recoverable accounts and their recovery configuration.
     **/
    recoverable: StorageMap<AccountId | string, Option<RecoveryConfig>>;
  };
  renVmBridge: {    /**
     * Record burn event details
     **/
    burnEvents: StorageMap<u32 | AnyNumber, Option<ITuple<[BlockNumber, DestAddress, Balance]>>>;
    /**
     * Next burn event ID
     **/
    nextBurnEventId: u32 | null;
    /**
     * The RenVM split public key
     **/
    renVmPublicKey: Option<PublicKey> | null;
    /**
     * Signature blacklist. This is required to prevent double claim.
     **/
    signatures: StorageMap<EcdsaSignature | string, Option<ITuple<[]>>>;
  };
  rewards: {    /**
     * Stores reward pool info.
     **/
    pools: StorageMap<PoolId | { LoansIncentive: any } | { DexIncentive: any } | { HomaIncentive: any } | { DexSaving: any } | { HomaValidatorAllowance: any } | string, PoolInfo>;
    /**
     * Record share amount and withdrawn reward amount for specific `AccountId`
     * under `PoolId`.
     **/
    shareAndWithdrawnReward: StorageDoubleMap<PoolId | { LoansIncentive: any } | { DexIncentive: any } | { HomaIncentive: any } | { DexSaving: any } | { HomaValidatorAllowance: any } | string, AccountId | string, ITuple<[Share, Balance]>>;
  };
  scheduler: {    /**
     * Items to be executed, indexed by the block number that they should be executed on.
     **/
    agenda: StorageMap<BlockNumber | AnyNumber, Vec<Option<Scheduled>>>;
    /**
     * Lookup from identity to the block number and index of the task.
     **/
    lookup: StorageMap<Bytes | string, Option<TaskAddress>>;
    /**
     * Storage version of the pallet.
     * 
     * New networks start with last version.
     **/
    storageVersion: Releases | null;
  };
  session: {    /**
     * Current index of the session.
     **/
    currentIndex: SessionIndex | null;
    /**
     * Indices of disabled validators.
     * 
     * The set is cleared when `on_session_ending` returns a new set of identities.
     **/
    disabledValidators: Vec<u32> | null;
    /**
     * The owner of a key. The key is the `KeyTypeId` + the encoded key.
     **/
    keyOwner: StorageMap<ITuple<[KeyTypeId, Bytes]> | [KeyTypeId | AnyNumber, Bytes | string], Option<ValidatorId>>;
    /**
     * The next session keys for a validator.
     **/
    nextKeys: StorageMap<ValidatorId | string, Option<Keys>>;
    /**
     * True if the underlying economic identities or weighting behind the validators
     * has changed in the queued validator set.
     **/
    queuedChanged: bool | null;
    /**
     * The queued keys for the next session. When the next session begins, these keys
     * will be used to determine the validator's session keys.
     **/
    queuedKeys: Vec<ITuple<[ValidatorId, Keys]>> | null;
    /**
     * The current set of validators.
     **/
    validators: Vec<ValidatorId> | null;
  };
  staking: {    /**
     * The active era information, it holds index and start.
     * 
     * The active era is the era being currently rewarded. Validator set of this era must be
     * equal to [`SessionInterface::validators`].
     **/
    activeEra: Option<ActiveEraInfo> | null;
    /**
     * Map from all locked "stash" accounts to the controller account.
     **/
    bonded: StorageMap<AccountId | string, Option<AccountId>>;
    /**
     * A mapping from still-bonded eras to the first session index of that era.
     * 
     * Must contains information for eras for the range:
     * `[active_era - bounding_duration; active_era]`
     **/
    bondedEras: Vec<ITuple<[EraIndex, SessionIndex]>> | null;
    /**
     * The amount of currency given to reporters of a slash event which was
     * canceled by extraordinary circumstances (e.g. governance).
     **/
    canceledSlashPayout: BalanceOf | null;
    /**
     * The current era index.
     * 
     * This is the latest planned era, depending on how the Session pallet queues the validator
     * set, it might be active or not.
     **/
    currentEra: Option<EraIndex> | null;
    /**
     * The last planned session scheduled by the session pallet.
     * 
     * This is basically in sync with the call to [`SessionManager::new_session`].
     **/
    currentPlannedSession: SessionIndex | null;
    /**
     * The earliest era for which we have a pending, unapplied slash.
     **/
    earliestUnappliedSlash: Option<EraIndex> | null;
    /**
     * Rewards for the last `HISTORY_DEPTH` eras.
     * If reward hasn't been set or has been removed then 0 reward is returned.
     **/
    erasRewardPoints: StorageMap<EraIndex | AnyNumber, EraRewardPoints>;
    /**
     * Exposure of validator at era.
     * 
     * This is keyed first by the era index to allow bulk deletion and then the stash account.
     * 
     * Is it removed after `HISTORY_DEPTH` eras.
     * If stakers hasn't been set or has been removed then empty exposure is returned.
     **/
    erasStakers: StorageDoubleMap<EraIndex | AnyNumber, AccountId | string, Exposure>;
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
    erasStakersClipped: StorageDoubleMap<EraIndex | AnyNumber, AccountId | string, Exposure>;
    /**
     * The session index at which the era start for the last `HISTORY_DEPTH` eras.
     * 
     * Note: This tracks the starting session (i.e. session index when era start being active)
     * for the eras in `[CurrentEra - HISTORY_DEPTH, CurrentEra]`.
     **/
    erasStartSessionIndex: StorageMap<EraIndex | AnyNumber, Option<SessionIndex>>;
    /**
     * The total amount staked for the last `HISTORY_DEPTH` eras.
     * If total hasn't been set or has been removed then 0 stake is returned.
     **/
    erasTotalStake: StorageMap<EraIndex | AnyNumber, BalanceOf>;
    /**
     * Similar to `ErasStakers`, this holds the preferences of validators.
     * 
     * This is keyed first by the era index to allow bulk deletion and then the stash account.
     * 
     * Is it removed after `HISTORY_DEPTH` eras.
     **/
    erasValidatorPrefs: StorageDoubleMap<EraIndex | AnyNumber, AccountId | string, ValidatorPrefs>;
    /**
     * The total validator era payout for the last `HISTORY_DEPTH` eras.
     * 
     * Eras that haven't finished yet or has been removed doesn't have reward.
     **/
    erasValidatorReward: StorageMap<EraIndex | AnyNumber, Option<BalanceOf>>;
    /**
     * Mode of era forcing.
     **/
    forceEra: Forcing | null;
    /**
     * Number of eras to keep in history.
     * 
     * Information is kept for eras in `[current_era - history_depth; current_era]`.
     * 
     * Must be more than the number of eras delayed by session otherwise. I.e. active era must
     * always be in history. I.e. `active_era > current_era - history_depth` must be
     * guaranteed.
     **/
    historyDepth: u32 | null;
    /**
     * Any validators that may never be slashed or forcibly kicked. It's a Vec since they're
     * easy to initialize and the performance hit is minimal (we expect no more than four
     * invulnerables) and restricted to testnets.
     **/
    invulnerables: Vec<AccountId> | null;
    /**
     * Map from all (unlocked) "controller" accounts to the info regarding the staking.
     **/
    ledger: StorageMap<AccountId | string, Option<StakingLedger>>;
    /**
     * Minimum number of staking participants before emergency conditions are imposed.
     **/
    minimumValidatorCount: u32 | null;
    /**
     * The map from nominator stash key to the set of stash keys of all validators to nominate.
     **/
    nominators: StorageMap<AccountId | string, Option<Nominations>>;
    /**
     * All slashing events on nominators, mapped by era to the highest slash value of the era.
     **/
    nominatorSlashInEra: StorageDoubleMap<EraIndex | AnyNumber, AccountId | string, Option<BalanceOf>>;
    /**
     * Where the reward payment should be made. Keyed by stash.
     **/
    payee: StorageMap<AccountId | string, RewardDestination>;
    /**
     * Slashing spans for stash accounts.
     **/
    slashingSpans: StorageMap<AccountId | string, Option<SlashingSpans>>;
    /**
     * The percentage of the slash that is distributed to reporters.
     * 
     * The rest of the slashed value is handled by the `Slash`.
     **/
    slashRewardFraction: Perbill | null;
    /**
     * Records information about the maximum slash of a stash within a slashing span,
     * as well as how much reward has been paid out.
     **/
    spanSlash: StorageMap<ITuple<[AccountId, SpanIndex]> | [AccountId | string, SpanIndex | AnyNumber], SpanRecord>;
    /**
     * True if network has been upgraded to this version.
     * Storage version of the pallet.
     * 
     * This is set to v6.0.0 for new networks.
     **/
    storageVersion: Releases | null;
    /**
     * All unapplied slashes that are queued for later.
     **/
    unappliedSlashes: StorageMap<EraIndex | AnyNumber, Vec<UnappliedSlash>>;
    /**
     * The ideal number of staking participants.
     **/
    validatorCount: u32 | null;
    /**
     * The map from (wannabe) validator stash key to the preferences of that validator.
     **/
    validators: StorageMap<AccountId | string, ValidatorPrefs>;
    /**
     * All slashing events on validators, mapped by era to the highest slash proportion
     * and slash value of the era.
     **/
    validatorSlashInEra: StorageDoubleMap<EraIndex | AnyNumber, AccountId | string, Option<ITuple<[Perbill, BalanceOf]>>>;
  };
  stakingPool: {    /**
     * Current era index on Relaychain.
     * 
     * CurrentEra: EraIndex
     **/
    currentEra: EraIndex | null;
    /**
     * Unbond on next era beginning by AccountId.
     * AccountId => Unbond
     * 
     * NextEraUnbonds: AccountId => Balance
     **/
    nextEraUnbonds: StorageMap<AccountId | string, Balance>;
    /**
     * The rebalance phase of current era.
     * 
     * RebalancePhase: Phase
     **/
    rebalancePhase: Phase | null;
    /**
     * The ledger of staking pool.
     * 
     * StakingPoolLedger: Ledger
     **/
    stakingPoolLedger: Ledger | null;
    /**
     * The params of staking pool.
     * 
     * StakingPoolParams: Params
     **/
    stakingPoolParams: Params | null;
    /**
     * The records of unbonding.
     * ExpiredEraIndex => (TotalUnbounding, ClaimedUnbonding,
     * InitialClaimedUnbonding)
     * 
     * Unbonding: map EraIndex => (Balance, Balance, Balance)
     **/
    unbonding: StorageMap<EraIndex | AnyNumber, ITuple<[Balance, Balance, Balance]>>;
    /**
     * The records of unbonding by AccountId.
     * AccountId, ExpiredEraIndex => Unbounding
     * 
     * Unbondings: double_map AccountId, EraIndex => Balance
     **/
    unbondings: StorageDoubleMap<AccountId | string, EraIndex | AnyNumber, Balance>;
  };
  sudo: {    /**
     * The `AccountId` of the sudo key.
     **/
    key: AccountId | null;
  };
  system: {    /**
     * The full account information for a particular account ID.
     **/
    account: StorageMap<AccountId | string, AccountInfo>;
    /**
     * Total length (in bytes) for all extrinsics put together, for the current block.
     **/
    allExtrinsicsLen: Option<u32> | null;
    /**
     * Map of block numbers to block hashes.
     **/
    blockHash: StorageMap<BlockNumber | AnyNumber, Hash>;
    /**
     * The current weight for the block.
     **/
    blockWeight: ConsumedWeight | null;
    /**
     * Digest of the current block, also part of the block header.
     **/
    digest: DigestOf | null;
    /**
     * The number of events in the `Events<T>` list.
     **/
    eventCount: EventIndex | null;
    /**
     * Events deposited for the current block.
     **/
    events: Vec<EventRecord> | null;
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
    eventTopics: StorageMap<Hash | string, Vec<ITuple<[BlockNumber, EventIndex]>>>;
    /**
     * The execution phase of the block.
     **/
    executionPhase: Option<Phase> | null;
    /**
     * Total extrinsics count for the current block.
     **/
    extrinsicCount: Option<u32> | null;
    /**
     * Extrinsics data for the current block (maps an extrinsic's index to its data).
     **/
    extrinsicData: StorageMap<u32 | AnyNumber, Bytes>;
    /**
     * Stores the `spec_version` and `spec_name` of when the last runtime upgrade happened.
     **/
    lastRuntimeUpgrade: Option<LastRuntimeUpgradeInfo> | null;
    /**
     * The current block number being processed. Set by `execute_block`.
     **/
    number: BlockNumber | null;
    /**
     * Hash of the previous block.
     **/
    parentHash: Hash | null;
    /**
     * True if we have upgraded so that AccountInfo contains three types of `RefCount`. False
     * (default) if not.
     **/
    upgradedToTripleRefCount: bool | null;
    /**
     * True if we have upgraded so that `type RefCount` is `u32`. False (default) if not.
     **/
    upgradedToU32RefCount: bool | null;
  };
  technicalCommittee: {    /**
     * The current members of the collective. This is stored sorted (just by value).
     **/
    members: Vec<AccountId> | null;
    /**
     * The prime member that helps determine the default vote behavior in case of absentations.
     **/
    prime: Option<AccountId> | null;
    /**
     * Proposals so far.
     **/
    proposalCount: u32 | null;
    /**
     * Actual proposal for a given hash, if it's current.
     **/
    proposalOf: StorageMap<Hash | string, Option<Proposal>>;
    /**
     * The hashes of the active proposals.
     **/
    proposals: Vec<Hash> | null;
    /**
     * Votes on a given proposal, if it is ongoing.
     **/
    voting: StorageMap<Hash | string, Option<Votes>>;
  };
  technicalCommitteeMembership: {    /**
     * The current membership, stored as an ordered Vec.
     **/
    members: Vec<AccountId> | null;
    /**
     * The current prime member, if one exists.
     **/
    prime: Option<AccountId> | null;
  };
  timestamp: {    /**
     * Did the timestamp get updated in this block?
     **/
    didUpdate: bool | null;
    /**
     * Current time for the current block.
     **/
    now: Moment | null;
  };
  tips: {    /**
     * Simple preimage lookup from the reason's hash to the original data. Again, has an
     * insecure enumerable hash since the key is guaranteed to be the result of a secure hash.
     **/
    reasons: StorageMap<Hash | string, Option<Bytes>>;
    /**
     * TipsMap that are not yet completed. Keyed by the hash of `(reason, who)` from the value.
     * This has the insecure enumerable hash function since the key itself is already
     * guaranteed to be a secure hash.
     **/
    tips: StorageMap<Hash | string, Option<OpenTip>>;
  };
  tokens: {    /**
     * The balance of a token type under an account.
     * 
     * NOTE: If the total is ever zero, decrease account ref account.
     * 
     * NOTE: This is only used in the case that this module is used to store
     * balances.
     **/
    accounts: StorageDoubleMap<AccountId | string, CurrencyId | { Token: any } | { DEXShare: any } | { ERC20: any } | { ChainSafe: any } | string, AccountData>;
    /**
     * Any liquidity locks of a token type under an account.
     * NOTE: Should only be accessed when setting, changing and freeing a lock.
     **/
    locks: StorageDoubleMap<AccountId | string, CurrencyId | { Token: any } | { DEXShare: any } | { ERC20: any } | { ChainSafe: any } | string, Vec<BalanceLock>>;
    /**
     * The total issuance of a token type.
     **/
    totalIssuance: StorageMap<CurrencyId | { Token: any } | { DEXShare: any } | { ERC20: any } | { ChainSafe: any } | string, Balance>;
  };
  transactionPayment: {    /**
     * The default fee currency for accounts.
     * 
     * DefaultFeeCurrencyId: AccountId => Option<CurrencyId>
     **/
    defaultFeeCurrencyId: StorageMap<AccountId | string, Option<CurrencyId>>;
    /**
     * The next fee multiplier.
     * 
     * NextFeeMultiplier: Multiplier
     **/
    nextFeeMultiplier: Multiplier | null;
  };
  vesting: {    /**
     * Vesting schedules of an account.
     **/
    vestingSchedules: StorageMap<AccountId | string, Vec<VestingScheduleOf>>;
  };
}
