// Auto-generated via `yarn polkadot-types-from-chain`, do not edit
/* eslint-disable */

import type { CollateralAuctionItem } from '@acala-network/types/interfaces/auctionManager';
import type { RiskManagementParams } from '@acala-network/types/interfaces/cdpEngine';
import type { TradingPairStatus } from '@acala-network/types/interfaces/dex';
import type { CodeInfo, Erc20Info, EvmAddress } from '@acala-network/types/interfaces/evm';
import type { PoolId } from '@acala-network/types/interfaces/incentives';
import type { Position } from '@acala-network/types/interfaces/loans';
import type { ClassInfoOf, TokenId, TokenInfoOf } from '@acala-network/types/interfaces/nft';
import type { AuctionId, CurrencyId, TradingPair } from '@acala-network/types/interfaces/primitives';
import type { AccountId, Balance, BalanceOf, BlockNumber, H256, Hash, OracleKey, Permill, RelayChainBlockNumberOf, Weight } from '@acala-network/types/interfaces/runtime';
import type { ExchangeRate, Rate } from '@acala-network/types/interfaces/support';
import type { CallOf, ScheduleTaskIndex } from '@open-web3/orml-types/interfaces/authority';
import type { OrderedSet, TimestampedValueOf } from '@open-web3/orml-types/interfaces/oracle';
import type { PoolInfo, Share } from '@open-web3/orml-types/interfaces/rewards';
import type { AuctionInfo, Price } from '@open-web3/orml-types/interfaces/traits';
import type { ApiTypes } from '@polkadot/api-base/types';
import type { BTreeMap, BTreeSet, Bytes, Option, Vec, bool, u128, u32, u64 } from '@polkadot/types-codec';
import type { AnyNumber, ITuple } from '@polkadot/types-codec/types';
import type { AccountData, BalanceLock } from '@polkadot/types/interfaces/balances';
import type { Votes } from '@polkadot/types/interfaces/collective';
import type { Proposal } from '@polkadot/types/interfaces/democracy';
import type { SessionIndex } from '@polkadot/types/interfaces/session';
import type { AccountInfo } from '@polkadot/types/interfaces/system';
import type { ClassId } from '@polkadot/types/interfaces/uniques';
import type { MultiLocation } from '@polkadot/types/interfaces/xcm';
import type { Observable } from '@polkadot/types/types';

declare module '@polkadot/api-base/types/storage' {
  export interface AugmentedQueries<ApiType extends ApiTypes> {
    acalaOracle: {
      /**
       * If an oracle operator has feed a value in this block
       **/
      hasDispatched: AugmentedQuery<ApiType, () => Observable<OrderedSet>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * True if Self::values(key) is up to date, otherwise the value is stale
       **/
      isUpdated: AugmentedQuery<ApiType, (arg: OracleKey | { Token: any } | { DEXShare: any } | { ERC20: any } | { StableAssetPoolToken: any } | { LiquidCroadloan: any } | { ForeignAsset: any } | string | Uint8Array) => Observable<bool>, [OracleKey]> & QueryableStorageEntry<ApiType, [OracleKey]>;
      /**
       * Raw values for each oracle operators
       **/
      rawValues: AugmentedQuery<ApiType, (arg1: AccountId | string | Uint8Array, arg2: OracleKey | { Token: any } | { DEXShare: any } | { ERC20: any } | { StableAssetPoolToken: any } | { LiquidCroadloan: any } | { ForeignAsset: any } | string | Uint8Array) => Observable<Option<TimestampedValueOf>>, [AccountId, OracleKey]> & QueryableStorageEntry<ApiType, [AccountId, OracleKey]>;
      /**
       * Combined value, may not be up to date
       **/
      values: AugmentedQuery<ApiType, (arg: OracleKey | { Token: any } | { DEXShare: any } | { ERC20: any } | { StableAssetPoolToken: any } | { LiquidCroadloan: any } | { ForeignAsset: any } | string | Uint8Array) => Observable<Option<TimestampedValueOf>>, [OracleKey]> & QueryableStorageEntry<ApiType, [OracleKey]>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    auction: {
      /**
       * Index auctions by end time.
       **/
      auctionEndTime: AugmentedQuery<ApiType, (arg1: BlockNumber | AnyNumber | Uint8Array, arg2: AuctionId | AnyNumber | Uint8Array) => Observable<Option<ITuple<[]>>>, [BlockNumber, AuctionId]> & QueryableStorageEntry<ApiType, [BlockNumber, AuctionId]>;
      /**
       * Stores on-going and future auctions. Closed auction are removed.
       **/
      auctions: AugmentedQuery<ApiType, (arg: AuctionId | AnyNumber | Uint8Array) => Observable<Option<AuctionInfo>>, [AuctionId]> & QueryableStorageEntry<ApiType, [AuctionId]>;
      /**
       * Track the next auction ID.
       **/
      auctionsIndex: AugmentedQuery<ApiType, () => Observable<AuctionId>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    auctionManager: {
      /**
       * Mapping from auction id to collateral auction info
       * 
       * CollateralAuctions: map AuctionId => Option<CollateralAuctionItem>
       **/
      collateralAuctions: AugmentedQuery<ApiType, (arg: AuctionId | AnyNumber | Uint8Array) => Observable<Option<CollateralAuctionItem>>, [AuctionId]> & QueryableStorageEntry<ApiType, [AuctionId]>;
      /**
       * Record of the total collateral amount of all active collateral auctions
       * under specific collateral type CollateralType -> TotalAmount
       * 
       * TotalCollateralInAuction: map CurrencyId => Balance
       **/
      totalCollateralInAuction: AugmentedQuery<ApiType, (arg: CurrencyId | { Token: any } | { DEXShare: any } | { ERC20: any } | { StableAssetPoolToken: any } | { LiquidCroadloan: any } | { ForeignAsset: any } | string | Uint8Array) => Observable<Balance>, [CurrencyId]> & QueryableStorageEntry<ApiType, [CurrencyId]>;
      /**
       * Record of total target sales of all active collateral auctions
       * 
       * TotalTargetInAuction: Balance
       **/
      totalTargetInAuction: AugmentedQuery<ApiType, () => Observable<Balance>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    authority: {
      nextTaskIndex: AugmentedQuery<ApiType, () => Observable<ScheduleTaskIndex>, []> & QueryableStorageEntry<ApiType, []>;
      savedCalls: AugmentedQuery<ApiType, (arg: Hash | string | Uint8Array) => Observable<Option<ITuple<[CallOf, Option<AccountId>]>>>, [Hash]> & QueryableStorageEntry<ApiType, [Hash]>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    cdpEngine: {
      /**
       * Mapping from collateral type to its risk management params
       * 
       * CollateralParams: CurrencyId => RiskManagementParams
       **/
      collateralParams: AugmentedQuery<ApiType, (arg: CurrencyId | { Token: any } | { DEXShare: any } | { ERC20: any } | { StableAssetPoolToken: any } | { LiquidCroadloan: any } | { ForeignAsset: any } | string | Uint8Array) => Observable<RiskManagementParams>, [CurrencyId]> & QueryableStorageEntry<ApiType, [CurrencyId]>;
      /**
       * Mapping from collateral type to its exchange rate of debit units and
       * debit value
       * 
       * DebitExchangeRate: CurrencyId => Option<ExchangeRate>
       **/
      debitExchangeRate: AugmentedQuery<ApiType, (arg: CurrencyId | { Token: any } | { DEXShare: any } | { ERC20: any } | { StableAssetPoolToken: any } | { LiquidCroadloan: any } | { ForeignAsset: any } | string | Uint8Array) => Observable<Option<ExchangeRate>>, [CurrencyId]> & QueryableStorageEntry<ApiType, [CurrencyId]>;
      /**
       * Global interest rate per sec for all types of collateral
       * 
       * GlobalInterestRatePerSec: Rate
       **/
      globalInterestRatePerSec: AugmentedQuery<ApiType, () => Observable<Rate>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Timestamp in seconds of the last interest accumulation
       * 
       * LastAccumulationSecs: u64
       **/
      lastAccumulationSecs: AugmentedQuery<ApiType, () => Observable<u64>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    cdpTreasury: {
      /**
       * Current total debit value of system. It's not same as debit in CDP
       * engine, it is the bad debt of the system.
       * 
       * DebitPool: Balance
       **/
      debitPool: AugmentedQuery<ApiType, () => Observable<Balance>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * The expected amount size for per lot collateral auction of specific
       * collateral type.
       * 
       * ExpectedCollateralAuctionSize: map CurrencyId => Balance
       **/
      expectedCollateralAuctionSize: AugmentedQuery<ApiType, (arg: CurrencyId | { Token: any } | { DEXShare: any } | { ERC20: any } | { StableAssetPoolToken: any } | { LiquidCroadloan: any } | { ForeignAsset: any } | string | Uint8Array) => Observable<Balance>, [CurrencyId]> & QueryableStorageEntry<ApiType, [CurrencyId]>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    collatorSelection: {
      /**
       * Fixed deposit bond for each candidate.
       * 
       * CandidacyBond: Balance
       **/
      candidacyBond: AugmentedQuery<ApiType, () => Observable<BalanceOf>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * The (community, limited) collation candidates.
       * 
       * Candidates: BTreeSet<AccountId>
       **/
      candidates: AugmentedQuery<ApiType, () => Observable<BTreeSet<AccountId>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Desired number of candidates.
       * 
       * This should ideally always be less than [`Config::MaxCandidates`] for weights to be correct.
       * DesiredCandidates: u32
       **/
      desiredCandidates: AugmentedQuery<ApiType, () => Observable<u32>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * The invulnerable, fixed collators.
       * 
       * Invulnerables: Vec<AccountId>
       **/
      invulnerables: AugmentedQuery<ApiType, () => Observable<Vec<AccountId>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Mapping from the kicked candidate or the left candidate to session index.
       * 
       * NonCandidates: map AccountId => SessionIndex
       **/
      nonCandidates: AugmentedQuery<ApiType, (arg: AccountId | string | Uint8Array) => Observable<SessionIndex>, [AccountId]> & QueryableStorageEntry<ApiType, [AccountId]>;
      /**
       * Session points for each candidate.
       * 
       * SessionPoints: map AccountId => u32
       **/
      sessionPoints: AugmentedQuery<ApiType, (arg: AccountId | string | Uint8Array) => Observable<u32>, [AccountId]> & QueryableStorageEntry<ApiType, [AccountId]>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    dex: {
      /**
       * Initial exchange rate, used to calculate the dex share amount for founders of provisioning
       * 
       * InitialShareExchangeRates: map TradingPair => (ExchangeRate, ExchangeRate)
       **/
      initialShareExchangeRates: AugmentedQuery<ApiType, (arg: TradingPair) => Observable<ITuple<[ExchangeRate, ExchangeRate]>>, [TradingPair]> & QueryableStorageEntry<ApiType, [TradingPair]>;
      /**
       * Liquidity pool for TradingPair.
       * 
       * LiquidityPool: map TradingPair => (Balance, Balance)
       **/
      liquidityPool: AugmentedQuery<ApiType, (arg: TradingPair) => Observable<ITuple<[Balance, Balance]>>, [TradingPair]> & QueryableStorageEntry<ApiType, [TradingPair]>;
      /**
       * Provision of TradingPair by AccountId.
       * 
       * ProvisioningPool: double_map TradingPair, AccountId => (Balance,
       * Balance)
       **/
      provisioningPool: AugmentedQuery<ApiType, (arg1: TradingPair, arg2: AccountId | string | Uint8Array) => Observable<ITuple<[Balance, Balance]>>, [TradingPair, AccountId]> & QueryableStorageEntry<ApiType, [TradingPair, AccountId]>;
      /**
       * Status for TradingPair.
       * 
       * TradingPairStatuses: map TradingPair => TradingPairStatus
       **/
      tradingPairStatuses: AugmentedQuery<ApiType, (arg: TradingPair) => Observable<TradingPairStatus>, [TradingPair]> & QueryableStorageEntry<ApiType, [TradingPair]>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    emergencyShutdown: {
      /**
       * Open final redemption flag
       * 
       * CanRefund: bool
       **/
      canRefund: AugmentedQuery<ApiType, () => Observable<bool>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Emergency shutdown flag
       * 
       * IsShutdown: bool
       **/
      isShutdown: AugmentedQuery<ApiType, () => Observable<bool>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    evm: {
      /**
       * The EVM accounts info.
       * 
       * Accounts: map EvmAddress => Option<AccountInfo<T>>
       **/
      accounts: AugmentedQuery<ApiType, (arg: EvmAddress | string | Uint8Array) => Observable<Option<AccountInfo>>, [EvmAddress]> & QueryableStorageEntry<ApiType, [EvmAddress]>;
      /**
       * The storages for EVM contracts.
       * 
       * AccountStorages: double_map EvmAddress, H256 => H256
       **/
      accountStorages: AugmentedQuery<ApiType, (arg1: EvmAddress | string | Uint8Array, arg2: H256 | string | Uint8Array) => Observable<H256>, [EvmAddress, H256]> & QueryableStorageEntry<ApiType, [EvmAddress, H256]>;
      /**
       * The code info for EVM contracts.
       * Key is Keccak256 hash of code.
       * 
       * CodeInfos: H256 => Option<CodeInfo>
       **/
      codeInfos: AugmentedQuery<ApiType, (arg: H256 | string | Uint8Array) => Observable<Option<CodeInfo>>, [H256]> & QueryableStorageEntry<ApiType, [H256]>;
      /**
       * The code for EVM contracts.
       * Key is Keccak256 hash of code.
       * 
       * Codes: H256 => Vec<u8>
       **/
      codes: AugmentedQuery<ApiType, (arg: H256 | string | Uint8Array) => Observable<Bytes>, [H256]> & QueryableStorageEntry<ApiType, [H256]>;
      /**
       * The storage usage for contracts. Including code size, extra bytes and total AccountStorages
       * size.
       * 
       * Accounts: map EvmAddress => u32
       **/
      contractStorageSizes: AugmentedQuery<ApiType, (arg: EvmAddress | string | Uint8Array) => Observable<u32>, [EvmAddress]> & QueryableStorageEntry<ApiType, [EvmAddress]>;
      /**
       * Extrinsics origin for the current transaction.
       * 
       * ExtrinsicOrigin: Option<AccountId>
       **/
      extrinsicOrigin: AugmentedQuery<ApiType, () => Observable<Option<AccountId>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Next available system contract address.
       * 
       * NetworkContractIndex: u64
       **/
      networkContractIndex: AugmentedQuery<ApiType, () => Observable<u64>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    evmAccounts: {
      /**
       * The Substrate Account for EvmAddresses
       * 
       * Accounts: map EvmAddress => Option<AccountId>
       **/
      accounts: AugmentedQuery<ApiType, (arg: EvmAddress | string | Uint8Array) => Observable<Option<AccountId>>, [EvmAddress]> & QueryableStorageEntry<ApiType, [EvmAddress]>;
      /**
       * The EvmAddress for Substrate Accounts
       * 
       * EvmAddresses: map AccountId => Option<EvmAddress>
       **/
      evmAddresses: AugmentedQuery<ApiType, (arg: AccountId | string | Uint8Array) => Observable<Option<EvmAddress>>, [AccountId]> & QueryableStorageEntry<ApiType, [AccountId]>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    evmManager: {
      /**
       * Mapping between u32 and Erc20 address.
       * Erc20 address is 20 byte, take the first 4 non-zero bytes, if it is less
       * than 4, add 0 to the left.
       * 
       * map u32 => Option<Erc20Info>
       **/
      currencyIdMap: AugmentedQuery<ApiType, (arg: u32 | AnyNumber | Uint8Array) => Observable<Option<Erc20Info>>, [u32]> & QueryableStorageEntry<ApiType, [u32]>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    financialCouncil: {
      /**
       * The current members of the collective. This is stored sorted (just by value).
       **/
      members: AugmentedQuery<ApiType, () => Observable<Vec<AccountId>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * The prime member that helps determine the default vote behavior in case of absentations.
       **/
      prime: AugmentedQuery<ApiType, () => Observable<Option<AccountId>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Proposals so far.
       **/
      proposalCount: AugmentedQuery<ApiType, () => Observable<u32>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Actual proposal for a given hash, if it's current.
       **/
      proposalOf: AugmentedQuery<ApiType, (arg: Hash | string | Uint8Array) => Observable<Option<Proposal>>, [Hash]> & QueryableStorageEntry<ApiType, [Hash]>;
      /**
       * The hashes of the active proposals.
       **/
      proposals: AugmentedQuery<ApiType, () => Observable<Vec<Hash>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Votes on a given proposal, if it is ongoing.
       **/
      voting: AugmentedQuery<ApiType, (arg: Hash | string | Uint8Array) => Observable<Option<Votes>>, [Hash]> & QueryableStorageEntry<ApiType, [Hash]>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    financialCouncilMembership: {
      /**
       * The current membership, stored as an ordered Vec.
       **/
      members: AugmentedQuery<ApiType, () => Observable<Vec<AccountId>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * The current prime member, if one exists.
       **/
      prime: AugmentedQuery<ApiType, () => Observable<Option<AccountId>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    generalCouncil: {
      /**
       * The current members of the collective. This is stored sorted (just by value).
       **/
      members: AugmentedQuery<ApiType, () => Observable<Vec<AccountId>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * The prime member that helps determine the default vote behavior in case of absentations.
       **/
      prime: AugmentedQuery<ApiType, () => Observable<Option<AccountId>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Proposals so far.
       **/
      proposalCount: AugmentedQuery<ApiType, () => Observable<u32>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Actual proposal for a given hash, if it's current.
       **/
      proposalOf: AugmentedQuery<ApiType, (arg: Hash | string | Uint8Array) => Observable<Option<Proposal>>, [Hash]> & QueryableStorageEntry<ApiType, [Hash]>;
      /**
       * The hashes of the active proposals.
       **/
      proposals: AugmentedQuery<ApiType, () => Observable<Vec<Hash>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Votes on a given proposal, if it is ongoing.
       **/
      voting: AugmentedQuery<ApiType, (arg: Hash | string | Uint8Array) => Observable<Option<Votes>>, [Hash]> & QueryableStorageEntry<ApiType, [Hash]>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    generalCouncilMembership: {
      /**
       * The current membership, stored as an ordered Vec.
       **/
      members: AugmentedQuery<ApiType, () => Observable<Vec<AccountId>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * The current prime member, if one exists.
       **/
      prime: AugmentedQuery<ApiType, () => Observable<Option<AccountId>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    homaCouncil: {
      /**
       * The current members of the collective. This is stored sorted (just by value).
       **/
      members: AugmentedQuery<ApiType, () => Observable<Vec<AccountId>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * The prime member that helps determine the default vote behavior in case of absentations.
       **/
      prime: AugmentedQuery<ApiType, () => Observable<Option<AccountId>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Proposals so far.
       **/
      proposalCount: AugmentedQuery<ApiType, () => Observable<u32>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Actual proposal for a given hash, if it's current.
       **/
      proposalOf: AugmentedQuery<ApiType, (arg: Hash | string | Uint8Array) => Observable<Option<Proposal>>, [Hash]> & QueryableStorageEntry<ApiType, [Hash]>;
      /**
       * The hashes of the active proposals.
       **/
      proposals: AugmentedQuery<ApiType, () => Observable<Vec<Hash>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Votes on a given proposal, if it is ongoing.
       **/
      voting: AugmentedQuery<ApiType, (arg: Hash | string | Uint8Array) => Observable<Option<Votes>>, [Hash]> & QueryableStorageEntry<ApiType, [Hash]>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    homaCouncilMembership: {
      /**
       * The current membership, stored as an ordered Vec.
       **/
      members: AugmentedQuery<ApiType, () => Observable<Vec<AccountId>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * The current prime member, if one exists.
       **/
      prime: AugmentedQuery<ApiType, () => Observable<Option<AccountId>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    homaLite: {
      /**
       * The amount of staking currency that is available to be redeemed.
       * AvailableStakingBalance: value: Balance
       **/
      availableStakingBalance: AugmentedQuery<ApiType, () => Observable<Balance>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Requests to redeem staked currencies.
       * RedeemRequests: Map: AccountId => Option<(liquid_amount: Balance, addtional_fee: Permill)>
       **/
      redeemRequests: AugmentedQuery<ApiType, (arg: AccountId | string | Uint8Array) => Observable<Option<ITuple<[Balance, Permill]>>>, [AccountId]> & QueryableStorageEntry<ApiType, [AccountId]>;
      /**
       * Funds that will be unbonded in the future
       * ScheduledUnbond: Vec<(staking_amount: Balance, unbond_at: RelayChainBlockNumber>
       **/
      scheduledUnbond: AugmentedQuery<ApiType, () => Observable<Vec<ITuple<[Balance, RelayChainBlockNumberOf]>>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * The cap on the total amount of staking currency allowed to mint Liquid currency.
       * StakingCurrencyMintCap: value: Balance
       **/
      stakingCurrencyMintCap: AugmentedQuery<ApiType, () => Observable<Balance>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * The total amount of the staking currency on the relaychain.
       * This info is used to calculate the exchange rate between Staking and Liquid currencies.
       * TotalStakingCurrency: value: Balance
       **/
      totalStakingCurrency: AugmentedQuery<ApiType, () => Observable<Balance>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * The extra weight for cross-chain XCM transfers.
       * xcm_dest_weight: value: Weight
       **/
      xcmDestWeight: AugmentedQuery<ApiType, () => Observable<Weight>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    honzon: {
      /**
       * The authorization relationship map from
       * Authorizer -> (CollateralType, Authorizee) -> Authorized
       * 
       * Authorization: double_map AccountId, (CurrencyId, T::AccountId) => Option<Balance>
       **/
      authorization: AugmentedQuery<ApiType, (arg1: AccountId | string | Uint8Array, arg2: ITuple<[CurrencyId, AccountId]> | [CurrencyId | { Token: any } | { DEXShare: any } | { ERC20: any } | { StableAssetPoolToken: any } | { LiquidCroadloan: any } | { ForeignAsset: any } | string | Uint8Array, AccountId | string | Uint8Array]) => Observable<Option<Balance>>, [AccountId, ITuple<[CurrencyId, AccountId]>]> & QueryableStorageEntry<ApiType, [AccountId, ITuple<[CurrencyId, AccountId]>]>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    incentives: {
      /**
       * Mapping from pool to its claim reward deduction rate.
       * 
       * ClaimRewardDeductionRates: map Pool => DeductionRate
       **/
      claimRewardDeductionRates: AugmentedQuery<ApiType, (arg: PoolId | { Loans: any } | { Dex: any } | string | Uint8Array) => Observable<Rate>, [PoolId]> & QueryableStorageEntry<ApiType, [PoolId]>;
      /**
       * Mapping from pool to its fixed reward rate per period.
       * 
       * DexSavingRewardRates: map Pool => SavingRatePerPeriod
       **/
      dexSavingRewardRates: AugmentedQuery<ApiType, (arg: PoolId | { Loans: any } | { Dex: any } | string | Uint8Array) => Observable<Rate>, [PoolId]> & QueryableStorageEntry<ApiType, [PoolId]>;
      /**
       * Mapping from pool to its fixed incentive amounts of multi currencies per period.
       * 
       * IncentiveRewardAmounts: double_map Pool, RewardCurrencyId => RewardAmountPerPeriod
       **/
      incentiveRewardAmounts: AugmentedQuery<ApiType, (arg1: PoolId | { Loans: any } | { Dex: any } | string | Uint8Array, arg2: CurrencyId | { Token: any } | { DEXShare: any } | { ERC20: any } | { StableAssetPoolToken: any } | { LiquidCroadloan: any } | { ForeignAsset: any } | string | Uint8Array) => Observable<Balance>, [PoolId, CurrencyId]> & QueryableStorageEntry<ApiType, [PoolId, CurrencyId]>;
      /**
       * The pending rewards amount, actual available rewards amount may be deducted
       * 
       * PendingMultiRewards: double_map PoolId, AccountId => BTreeMap<CurrencyId, Balance>
       **/
      pendingMultiRewards: AugmentedQuery<ApiType, (arg1: PoolId | { Loans: any } | { Dex: any } | string | Uint8Array, arg2: AccountId | string | Uint8Array) => Observable<BTreeMap<CurrencyId, Balance>>, [PoolId, AccountId]> & QueryableStorageEntry<ApiType, [PoolId, AccountId]>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    loans: {
      /**
       * The collateralized debit positions, map from
       * Owner -> CollateralType -> Position
       * 
       * Positions: double_map CurrencyId, AccountId => Position
       **/
      positions: AugmentedQuery<ApiType, (arg1: CurrencyId | { Token: any } | { DEXShare: any } | { ERC20: any } | { StableAssetPoolToken: any } | { LiquidCroadloan: any } | { ForeignAsset: any } | string | Uint8Array, arg2: AccountId | string | Uint8Array) => Observable<Position>, [CurrencyId, AccountId]> & QueryableStorageEntry<ApiType, [CurrencyId, AccountId]>;
      /**
       * The total collateralized debit positions, map from
       * CollateralType -> Position
       * 
       * TotalPositions: CurrencyId => Position
       **/
      totalPositions: AugmentedQuery<ApiType, (arg: CurrencyId | { Token: any } | { DEXShare: any } | { ERC20: any } | { StableAssetPoolToken: any } | { LiquidCroadloan: any } | { ForeignAsset: any } | string | Uint8Array) => Observable<Position>, [CurrencyId]> & QueryableStorageEntry<ApiType, [CurrencyId]>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    operatorMembershipAcala: {
      /**
       * The current membership, stored as an ordered Vec.
       **/
      members: AugmentedQuery<ApiType, () => Observable<Vec<AccountId>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * The current prime member, if one exists.
       **/
      prime: AugmentedQuery<ApiType, () => Observable<Option<AccountId>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    ormlNFT: {
      /**
       * Store class info.
       * 
       * Returns `None` if class info not set or removed.
       **/
      classes: AugmentedQuery<ApiType, (arg: ClassId | AnyNumber | Uint8Array) => Observable<Option<ClassInfoOf>>, [ClassId]> & QueryableStorageEntry<ApiType, [ClassId]>;
      /**
       * Next available class ID.
       **/
      nextClassId: AugmentedQuery<ApiType, () => Observable<ClassId>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Next available token ID.
       **/
      nextTokenId: AugmentedQuery<ApiType, (arg: ClassId | AnyNumber | Uint8Array) => Observable<TokenId>, [ClassId]> & QueryableStorageEntry<ApiType, [ClassId]>;
      /**
       * Store token info.
       * 
       * Returns `None` if token info not set or removed.
       **/
      tokens: AugmentedQuery<ApiType, (arg1: ClassId | AnyNumber | Uint8Array, arg2: TokenId | AnyNumber | Uint8Array) => Observable<Option<TokenInfoOf>>, [ClassId, TokenId]> & QueryableStorageEntry<ApiType, [ClassId, TokenId]>;
      /**
       * Token existence check by owner and class ID.
       **/
      tokensByOwner: AugmentedQuery<ApiType, (arg1: AccountId | string | Uint8Array, arg2: ClassId | AnyNumber | Uint8Array, arg3: TokenId | AnyNumber | Uint8Array) => Observable<ITuple<[]>>, [AccountId, ClassId, TokenId]> & QueryableStorageEntry<ApiType, [AccountId, ClassId, TokenId]>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    prices: {
      /**
       * Mapping from currency id to it's locked price
       * 
       * map CurrencyId => Option<Price>
       **/
      lockedPrice: AugmentedQuery<ApiType, (arg: CurrencyId | { Token: any } | { DEXShare: any } | { ERC20: any } | { StableAssetPoolToken: any } | { LiquidCroadloan: any } | { ForeignAsset: any } | string | Uint8Array) => Observable<Option<Price>>, [CurrencyId]> & QueryableStorageEntry<ApiType, [CurrencyId]>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    rewards: {
      /**
       * Record reward pool info.
       * 
       * map PoolId => PoolInfo
       **/
      poolInfos: AugmentedQuery<ApiType, (arg: PoolId | { Loans: any } | { Dex: any } | string | Uint8Array) => Observable<PoolInfo>, [PoolId]> & QueryableStorageEntry<ApiType, [PoolId]>;
      /**
       * Record share amount, reward currency and withdrawn reward amount for
       * specific `AccountId` under `PoolId`.
       * 
       * double_map (PoolId, AccountId) => (Share, BTreeMap<CurrencyId, Balance>)
       **/
      sharesAndWithdrawnRewards: AugmentedQuery<ApiType, (arg1: PoolId | { Loans: any } | { Dex: any } | string | Uint8Array, arg2: AccountId | string | Uint8Array) => Observable<ITuple<[Share, BTreeMap<CurrencyId, Balance>]>>, [PoolId, AccountId]> & QueryableStorageEntry<ApiType, [PoolId, AccountId]>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    sessionManager: {
      /**
       * The current session duration offset.
       * 
       * DurationOffset: T::BlockNumber
       **/
      durationOffset: AugmentedQuery<ApiType, () => Observable<BlockNumber>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * The current session duration.
       * 
       * SessionDuration: T::BlockNumber
       **/
      sessionDuration: AugmentedQuery<ApiType, () => Observable<BlockNumber>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Mapping from block number to new session index and duration.
       * 
       * SessionDurationChanges: map BlockNumber => (SessionIndex, SessionDuration)
       **/
      sessionDurationChanges: AugmentedQuery<ApiType, (arg: BlockNumber | AnyNumber | Uint8Array) => Observable<ITuple<[SessionIndex, BlockNumber]>>, [BlockNumber]> & QueryableStorageEntry<ApiType, [BlockNumber]>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    tokens: {
      /**
       * The balance of a token type under an account.
       * 
       * NOTE: If the total is ever zero, decrease account ref account.
       * 
       * NOTE: This is only used in the case that this module is used to store
       * balances.
       **/
      accounts: AugmentedQuery<ApiType, (arg1: AccountId | string | Uint8Array, arg2: CurrencyId | { Token: any } | { DEXShare: any } | { ERC20: any } | { StableAssetPoolToken: any } | { LiquidCroadloan: any } | { ForeignAsset: any } | string | Uint8Array) => Observable<AccountData>, [AccountId, CurrencyId]> & QueryableStorageEntry<ApiType, [AccountId, CurrencyId]>;
      /**
       * Any liquidity locks of a token type under an account.
       * NOTE: Should only be accessed when setting, changing and freeing a lock.
       **/
      locks: AugmentedQuery<ApiType, (arg1: AccountId | string | Uint8Array, arg2: CurrencyId | { Token: any } | { DEXShare: any } | { ERC20: any } | { StableAssetPoolToken: any } | { LiquidCroadloan: any } | { ForeignAsset: any } | string | Uint8Array) => Observable<Vec<BalanceLock>>, [AccountId, CurrencyId]> & QueryableStorageEntry<ApiType, [AccountId, CurrencyId]>;
      /**
       * The total issuance of a token type.
       **/
      totalIssuance: AugmentedQuery<ApiType, (arg: CurrencyId | { Token: any } | { DEXShare: any } | { ERC20: any } | { StableAssetPoolToken: any } | { LiquidCroadloan: any } | { ForeignAsset: any } | string | Uint8Array) => Observable<Balance>, [CurrencyId]> & QueryableStorageEntry<ApiType, [CurrencyId]>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    transactionPause: {
      /**
       * The paused transaction map
       * 
       * map (PalletNameBytes, FunctionNameBytes) => Option<()>
       **/
      pausedTransactions: AugmentedQuery<ApiType, (arg: ITuple<[Bytes, Bytes]> | [Bytes | string | Uint8Array, Bytes | string | Uint8Array]) => Observable<Option<ITuple<[]>>>, [ITuple<[Bytes, Bytes]>]> & QueryableStorageEntry<ApiType, [ITuple<[Bytes, Bytes]>]>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    unknownTokens: {
      /**
       * Abstract fungible balances under a given location and a abstract
       * fungible id.
       * 
       * double_map: who, asset_id => u128
       **/
      abstractFungibleBalances: AugmentedQuery<ApiType, (arg1: MultiLocation | { parents?: any; interior?: any } | string | Uint8Array, arg2: Bytes | string | Uint8Array) => Observable<u128>, [MultiLocation, Bytes]> & QueryableStorageEntry<ApiType, [MultiLocation, Bytes]>;
      /**
       * Concrete fungible balances under a given location and a concrete
       * fungible id.
       * 
       * double_map: who, asset_id => u128
       **/
      concreteFungibleBalances: AugmentedQuery<ApiType, (arg1: MultiLocation | { parents?: any; interior?: any } | string | Uint8Array, arg2: MultiLocation | { parents?: any; interior?: any } | string | Uint8Array) => Observable<u128>, [MultiLocation, MultiLocation]> & QueryableStorageEntry<ApiType, [MultiLocation, MultiLocation]>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    xTokens: {
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
  } // AugmentedQueries
} // declare module
