// Auto-generated via `yarn polkadot-types-from-chain`, do not edit
/* eslint-disable */

import type { BTreeMap, BTreeSet, Bytes, Option, U8aFixed, Vec, bool, u128, u16, u32, u64 } from '@polkadot/types';
import type { AnyNumber, ITuple } from '@polkadot/types/types';
import type { CollateralAuctionItem } from '@acala-network/types/interfaces/auctionManager';
import type { RiskManagementParams } from '@acala-network/types/interfaces/cdpEngine';
import type { TradingPairStatus } from '@acala-network/types/interfaces/dex';
import type { CodeInfo, Erc20Info, EvmAddress } from '@acala-network/types/interfaces/evm';
import type { PoolId } from '@acala-network/types/interfaces/incentives';
import type { Position } from '@acala-network/types/interfaces/loans';
import type { ClassInfoOf, TokenId, TokenInfoOf } from '@acala-network/types/interfaces/nft';
import type { AuctionId, CurrencyId, TradingPair } from '@acala-network/types/interfaces/primitives';
import type { AccountId, Balance, BalanceOf, BlockNumber, H256, Hash, KeyTypeId, Moment, OpaqueCall, OracleKey, Releases, Slot, ValidatorId, Weight } from '@acala-network/types/interfaces/runtime';
import type { ExchangeRate, Rate } from '@acala-network/types/interfaces/support';
import type { ScheduleTaskIndex } from '@open-web3/orml-types/interfaces/authority';
import type { OrderedSet, TimestampedValueOf } from '@open-web3/orml-types/interfaces/oracle';
import type { PoolInfo, Share } from '@open-web3/orml-types/interfaces/rewards';
import type { AuctionInfo, Price } from '@open-web3/orml-types/interfaces/traits';
import type { VestingScheduleOf } from '@open-web3/orml-types/interfaces/vesting';
import type { UncleEntryItem } from '@polkadot/types/interfaces/authorship';
import type { AccountData, BalanceLock, ReserveData } from '@polkadot/types/interfaces/balances';
import type { ProposalIndex, Votes } from '@polkadot/types/interfaces/collective';
import type { AuthorityId } from '@polkadot/types/interfaces/consensus';
import type { ConfigData, OverweightIndex, PageCounter, PageIndexData } from '@polkadot/types/interfaces/cumulus';
import type { PreimageStatus, PropIndex, Proposal, ReferendumIndex, ReferendumInfo, Voting } from '@polkadot/types/interfaces/democracy';
import type { VoteThreshold } from '@polkadot/types/interfaces/elections';
import type { AbridgedHostConfiguration, MessageQueueChain, MessagingStateSnapshot, OutboundHrmpMessage, ParaId, PersistedValidationData, RelayBlockNumber, RelayChainBlockNumber, UpwardMessage } from '@polkadot/types/interfaces/parachains';
import type { ProxyAnnouncement, ProxyDefinition } from '@polkadot/types/interfaces/proxy';
import type { Scheduled, TaskAddress } from '@polkadot/types/interfaces/scheduler';
import type { Keys, SessionIndex } from '@polkadot/types/interfaces/session';
import type { AccountInfo, ConsumedWeight, DigestOf, EventIndex, EventRecord, LastRuntimeUpgradeInfo, Phase } from '@polkadot/types/interfaces/system';
import type { Bounty, BountyIndex, OpenTip, TreasuryProposal } from '@polkadot/types/interfaces/treasury';
import type { Multiplier } from '@polkadot/types/interfaces/txpayment';
import type { ClassId } from '@polkadot/types/interfaces/uniques';
import type { Multisig } from '@polkadot/types/interfaces/utility';
import type { InboundStatus, MultiLocation, OutboundStatus, QueueConfigData, XcmpMessageFormat } from '@polkadot/types/interfaces/xcm';
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
     * Raw values for each oracle operators
     **/
    rawValues: StorageDoubleMap<AccountId | string, OracleKey | { Token: any } | { DEXShare: any } | { ERC20: any } | { ChainSafe: any } | string, Option<TimestampedValueOf>>;
    /**
     * Combined value, may not be up to date
     **/
    values: StorageMap<OracleKey | { Token: any } | { DEXShare: any } | { ERC20: any } | { ChainSafe: any } | string, Option<TimestampedValueOf>>;
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
  aura: {    /**
     * The current authority set.
     **/
    authorities: Vec<AuthorityId> | null;
    /**
     * The current slot of this block.
     * 
     * This will be set in `on_initialize`.
     **/
    currentSlot: Slot | null;
  };
  auraExt: {    /**
     * Serves as cache for the authorities.
     * 
     * The authorities in AuRa are overwritten in `on_initialize` when we switch to a new session,
     * but we require the old authorities to verify the seal when validating a PoV. This will always
     * be updated to the latest AuRa authorities in `on_finalize`.
     **/
    authorities: Vec<AuthorityId> | null;
  };
  authority: {    nextTaskIndex: ScheduleTaskIndex | null;
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
     * Named reserves on some account balances.
     **/
    reserves: StorageMap<AccountId | string, Vec<ReserveData>>;
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
  collatorSelection: {    /**
     * Fixed deposit bond for each candidate.
     * 
     * CandidacyBond: Balance
     **/
    candidacyBond: BalanceOf | null;
    /**
     * The (community, limited) collation candidates.
     * 
     * Candidates: BTreeSet<AccountId>
     **/
    candidates: BTreeSet<AccountId> | null;
    /**
     * Desired number of candidates.
     * 
     * This should ideally always be less than [`Config::MaxCandidates`] for weights to be correct.
     * DesiredCandidates: u32
     **/
    desiredCandidates: u32 | null;
    /**
     * The invulnerable, fixed collators.
     * 
     * Invulnerables: Vec<AccountId>
     **/
    invulnerables: Vec<AccountId> | null;
    /**
     * Mapping from the kicked candidate or the left candidate to session index.
     * 
     * NonCandidates: map AccountId => SessionIndex
     **/
    nonCandidates: StorageMap<AccountId | string, SessionIndex>;
    /**
     * Session points for each candidate.
     * 
     * SessionPoints: map AccountId => u32
     **/
    sessionPoints: StorageMap<AccountId | string, u32>;
  };
  democracy: {    /**
     * A record of who vetoed what. Maps proposal hash to a possible existent block number
     * (until when it may not be resubmitted) and who vetoed it.
     **/
    blacklist: StorageMap<Hash | string, Option<ITuple<[BlockNumber, Vec<AccountId>]>>>;
    /**
     * Record of all proposals that have been subject to emergency cancellation.
     **/
    cancellations: StorageMap<Hash | string, bool>;
    /**
     * Those who have locked a deposit.
     * 
     * TWOX-NOTE: Safe, as increasing integer keys are safe.
     **/
    depositOf: StorageMap<PropIndex | AnyNumber, Option<ITuple<[Vec<AccountId>, BalanceOf]>>>;
    /**
     * True if the last referendum tabled was submitted externally. False if it was a public
     * proposal.
     **/
    lastTabledWasExternal: bool | null;
    /**
     * Accounts for which there are locks in action which may be removed at some point in the
     * future. The value is the block number at which the lock expires and may be removed.
     * 
     * TWOX-NOTE: OK ― `AccountId` is a secure hash.
     **/
    locks: StorageMap<AccountId | string, Option<BlockNumber>>;
    /**
     * The lowest referendum index representing an unbaked referendum. Equal to
     * `ReferendumCount` if there isn't a unbaked referendum.
     **/
    lowestUnbaked: ReferendumIndex | null;
    /**
     * The referendum to be tabled whenever it would be valid to table an external proposal.
     * This happens when a referendum needs to be tabled and one of two conditions are met:
     * - `LastTabledWasExternal` is `false`; or
     * - `PublicProps` is empty.
     **/
    nextExternal: Option<ITuple<[Hash, VoteThreshold]>> | null;
    /**
     * Map of hashes to the proposal preimage, along with who registered it and their deposit.
     * The block number is the block at which it was deposited.
     **/
    preimages: StorageMap<Hash | string, Option<PreimageStatus>>;
    /**
     * The number of (public) proposals that have been made so far.
     **/
    publicPropCount: PropIndex | null;
    /**
     * The public proposals. Unsorted. The second item is the proposal's hash.
     **/
    publicProps: Vec<ITuple<[PropIndex, Hash, AccountId]>> | null;
    /**
     * The next free referendum index, aka the number of referenda started so far.
     **/
    referendumCount: ReferendumIndex | null;
    /**
     * Information concerning any given referendum.
     * 
     * TWOX-NOTE: SAFE as indexes are not under an attacker’s control.
     **/
    referendumInfoOf: StorageMap<ReferendumIndex | AnyNumber, Option<ReferendumInfo>>;
    /**
     * Storage version of the pallet.
     * 
     * New networks start with last version.
     **/
    storageVersion: Option<Releases> | null;
    /**
     * All votes for a particular voter. We store the balance for the number of votes that we
     * have recorded. The second item is the total amount of delegations, that will be added.
     * 
     * TWOX-NOTE: SAFE as `AccountId`s are crypto hashes anyway.
     **/
    votingOf: StorageMap<AccountId | string, Voting>;
  };
  dex: {    /**
     * Initial exchange rate, used to calculate the dex share amount for founders of provisioning
     * 
     * InitialShareExchangeRates: map TradingPair => (ExchangeRate, ExchangeRate)
     **/
    initialShareExchangeRates: StorageMap<TradingPair, ITuple<[ExchangeRate, ExchangeRate]>>;
    /**
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
  dmpQueue: {    /**
     * The configuration.
     **/
    configuration: ConfigData | null;
    /**
     * The overweight messages.
     **/
    overweight: StorageMap<OverweightIndex | AnyNumber, Option<ITuple<[RelayBlockNumber, Bytes]>>>;
    /**
     * The page index.
     **/
    pageIndex: PageIndexData | null;
    /**
     * The queue pages.
     **/
    pages: StorageMap<PageCounter | AnyNumber, Vec<ITuple<[RelayBlockNumber, Bytes]>>>;
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
     * The storage usage for contracts. Including code size, extra bytes and total AccountStorages
     * size.
     * 
     * Accounts: map EvmAddress => u32
     **/
    contractStorageSizes: StorageMap<EvmAddress | string, u32>;
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
  financialCouncil: {    /**
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
  financialCouncilMembership: {    /**
     * The current membership, stored as an ordered Vec.
     **/
    members: Vec<AccountId> | null;
    /**
     * The current prime member, if one exists.
     **/
    prime: Option<AccountId> | null;
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
  homaLite: {    /**
     * The cap on the total amount of staking currency allowed to mint Liquid currency.
     * StakingCurrencyMintCap: value: Balance
     **/
    stakingCurrencyMintCap: Balance | null;
    /**
     * The total amount of the staking currency on the relaychain.
     * This info is used to calculate the exchange rate between Staking and Liquid currencies.
     * TotalStakingCurrency: value: Balance
     **/
    totalStakingCurrency: Balance | null;
    /**
     * The extra weight for cross-chain XCM transfers.
     * xcm_dest_weight: value: Weight
     **/
    xcmDestWeight: Weight | null;
  };
  honzon: {    /**
     * The authorization relationship map from
     * Authorizer -> (CollateralType, Authorizee) -> Authorized
     * 
     * Authorization: double_map AccountId, (CurrencyId, T::AccountId) => Option<Balance>
     **/
    authorization: StorageDoubleMap<AccountId | string, ITuple<[CurrencyId, AccountId]> | [CurrencyId | { Token: any } | { DEXShare: any } | { ERC20: any } | { ChainSafe: any } | string, AccountId | string], Option<Balance>>;
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
    /**
     * Mapping from pool to its payout deduction rate.
     * 
     * PayoutDeductionRates: map PoolId => Rate
     **/
    payoutDeductionRates: StorageMap<PoolId | { LoansIncentive: any } | { DexIncentive: any } | { HomaIncentive: any } | { DexSaving: any } | { HomaValidatorAllowance: any } | string, Rate>;
    /**
     * The pending rewards amount, actual available rewards amount may be deducted
     * 
     * PendingRewards: double_map PoolId, AccountId => Balance
     **/
    pendingRewards: StorageDoubleMap<PoolId | { LoansIncentive: any } | { DexIncentive: any } | { HomaIncentive: any } | { DexSaving: any } | { HomaValidatorAllowance: any } | string, AccountId | string, Balance>;
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
  operatorMembershipAcala: {    /**
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
    tokensByOwner: ITuple<[]> | null;
  };
  parachainInfo: {    parachainId: ParaId | null;
  };
  parachainSystem: {    /**
     * The number of HRMP messages we observed in `on_initialize` and thus used that number for
     * announcing the weight of `on_initialize` and `on_finalize`.
     **/
    announcedHrmpMessagesPerCandidate: u32 | null;
    /**
     * The next authorized upgrade, if there is one.
     **/
    authorizedUpgrade: Option<Hash> | null;
    /**
     * Were the validation data set to notify the relay chain?
     **/
    didSetValidationCode: bool | null;
    /**
     * The parachain host configuration that was obtained from the relay parent.
     * 
     * This field is meant to be updated each block with the validation data inherent. Therefore,
     * before processing of the inherent, e.g. in `on_initialize` this data may be stale.
     * 
     * This data is also absent from the genesis.
     **/
    hostConfiguration: Option<AbridgedHostConfiguration> | null;
    /**
     * HRMP messages that were sent in a block.
     * 
     * This will be cleared in `on_initialize` of each new block.
     **/
    hrmpOutboundMessages: Vec<OutboundHrmpMessage> | null;
    /**
     * HRMP watermark that was set in a block.
     * 
     * This will be cleared in `on_initialize` of each new block.
     **/
    hrmpWatermark: BlockNumber | null;
    /**
     * The last downward message queue chain head we have observed.
     * 
     * This value is loaded before and saved after processing inbound downward messages carried
     * by the system inherent.
     **/
    lastDmqMqcHead: MessageQueueChain | null;
    /**
     * The message queue chain heads we have observed per each channel incoming channel.
     * 
     * This value is loaded before and saved after processing inbound downward messages carried
     * by the system inherent.
     **/
    lastHrmpMqcHeads: BTreeMap<ParaId, MessageQueueChain> | null;
    /**
     * The last relay parent block number at which we signalled the code upgrade.
     **/
    lastUpgrade: BlockNumber | null;
    /**
     * New validation code that was set in a block.
     * 
     * This will be cleared in `on_initialize` of each new block if no other pallet already set
     * the value.
     **/
    newValidationCode: Option<Bytes> | null;
    /**
     * We need to store the new validation function for the span between
     * setting it and applying it. If it has a
     * value, then [`PendingValidationCode`] must have a real value, and
     * together will coordinate the block number where the upgrade will happen.
     **/
    pendingRelayChainBlockNumber: Option<RelayChainBlockNumber> | null;
    /**
     * Upward messages that are still pending and not yet send to the relay chain.
     **/
    pendingUpwardMessages: Vec<UpwardMessage> | null;
    /**
     * The new validation function we will upgrade to when the relay chain
     * reaches [`PendingRelayChainBlockNumber`]. A real validation function must
     * exist here as long as [`PendingRelayChainBlockNumber`] is set.
     **/
    pendingValidationCode: Bytes | null;
    /**
     * Number of downward messages processed in a block.
     * 
     * This will be cleared in `on_initialize` of each new block.
     **/
    processedDownwardMessages: u32 | null;
    /**
     * The snapshot of some state related to messaging relevant to the current parachain as per
     * the relay parent.
     * 
     * This field is meant to be updated each block with the validation data inherent. Therefore,
     * before processing of the inherent, e.g. in `on_initialize` this data may be stale.
     * 
     * This data is also absent from the genesis.
     **/
    relevantMessagingState: Option<MessagingStateSnapshot> | null;
    /**
     * The weight we reserve at the beginning of the block for processing DMP messages. This
     * overrides the amount set in the Config trait.
     **/
    reservedDmpWeightOverride: Option<Weight> | null;
    /**
     * The weight we reserve at the beginning of the block for processing XCMP messages. This
     * overrides the amount set in the Config trait.
     **/
    reservedXcmpWeightOverride: Option<Weight> | null;
    /**
     * Upward messages that were sent in a block.
     * 
     * This will be cleared in `on_initialize` of each new block.
     **/
    upwardMessages: Vec<UpwardMessage> | null;
    /**
     * The [`PersistedValidationData`] set for this block.
     **/
    validationData: Option<PersistedValidationData> | null;
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
  sessionManager: {    /**
     * The current session duration offset.
     * 
     * DurationOffset: T::BlockNumber
     **/
    durationOffset: BlockNumber | null;
    /**
     * The current session duration.
     * 
     * SessionDuration: T::BlockNumber
     **/
    sessionDuration: BlockNumber | null;
    /**
     * Mapping from block number to new session index and duration.
     * 
     * SessionDurationChanges: map BlockNumber => (SessionIndex, SessionDuration)
     **/
    sessionDurationChanges: StorageMap<BlockNumber | AnyNumber, ITuple<[SessionIndex, BlockNumber]>>;
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
  transactionPause: {    /**
     * The paused transaction map
     * 
     * map (PalletNameBytes, FunctionNameBytes) => Option<()>
     **/
    pausedTransactions: StorageMap<ITuple<[Bytes, Bytes]> | [Bytes | string, Bytes | string], Option<ITuple<[]>>>;
  };
  transactionPayment: {    /**
     * The alternative fee swap path of accounts.
     **/
    alternativeFeeSwapPath: StorageMap<AccountId | string, Option<Vec<CurrencyId>>>;
    /**
     * The next fee multiplier.
     * 
     * NextFeeMultiplier: Multiplier
     **/
    nextFeeMultiplier: Multiplier | null;
  };
  treasury: {    /**
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
    proposals: StorageMap<ProposalIndex | AnyNumber, Option<TreasuryProposal>>;
  };
  unknownTokens: {    /**
     * Abstract fungible balances under a given location and a abstract
     * fungible id.
     * 
     * double_map: who, asset_id => u128
     **/
    abstractFungibleBalances: StorageDoubleMap<MultiLocation | { Here: any } | { X1: any } | { X2: any } | { X3: any } | { X4: any } | { X5: any } | { X6: any } | { X7: any } | { X8: any } | string, Bytes | string, u128>;
    /**
     * Concrete fungible balances under a given location and a concrete
     * fungible id.
     * 
     * double_map: who, asset_id => u128
     **/
    concreteFungibleBalances: StorageDoubleMap<MultiLocation | { Here: any } | { X1: any } | { X2: any } | { X3: any } | { X4: any } | { X5: any } | { X6: any } | { X7: any } | { X8: any } | string, MultiLocation | { Here: any } | { X1: any } | { X2: any } | { X3: any } | { X4: any } | { X5: any } | { X6: any } | { X7: any } | { X8: any } | string, u128>;
  };
  vesting: {    /**
     * Vesting schedules of an account.
     * 
     * VestingSchedules: map AccountId => Vec<VestingSchedule>
     **/
    vestingSchedules: StorageMap<AccountId | string, Vec<VestingScheduleOf>>;
  };
  xcmpQueue: {    /**
     * Inbound aggregate XCMP messages. It can only be one per ParaId/block.
     **/
    inboundXcmpMessages: StorageDoubleMap<ParaId | AnyNumber, RelayBlockNumber | AnyNumber, Bytes>;
    /**
     * Status of the inbound XCMP channels.
     **/
    inboundXcmpStatus: Vec<ITuple<[ParaId, InboundStatus, Vec<ITuple<[RelayBlockNumber, XcmpMessageFormat]>>]>> | null;
    /**
     * The messages outbound in a given XCMP channel.
     **/
    outboundXcmpMessages: StorageDoubleMap<ParaId | AnyNumber, u16 | AnyNumber, Bytes>;
    /**
     * The non-empty XCMP channels in order of becoming non-empty, and the index of the first
     * and last outbound message. If the two indices are equal, then it indicates an empty
     * queue and there must be a non-`Ok` `OutboundStatus`. We assume queues grow no greater
     * than 65535 items. Queue indices for normal messages begin at one; zero is reserved in
     * case of the need to send a high-priority signal message this block.
     * The bool is true if there is a signal message waiting to be sent.
     **/
    outboundXcmpStatus: Vec<ITuple<[ParaId, OutboundStatus, bool, u16, u16]>> | null;
    /**
     * The configuration which controls the dynamics of the outbound queue.
     **/
    queueConfig: QueueConfigData | null;
    /**
     * Any signal messages waiting to be sent.
     **/
    signalMessages: StorageMap<ParaId | AnyNumber, Bytes>;
  };
  xTokens: {  };
}
