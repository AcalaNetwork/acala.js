// Auto-generated via `yarn polkadot-types-from-chain`, do not edit
/* eslint-disable */

import { AnyNumber, ITuple, Observable } from '@polkadot/types/types';
import { Option, Vec } from '@polkadot/types/codec';
import { bool, u32 } from '@polkadot/types/primitive';
import { CollateralAuctionItem, DebitAuctionItem, SurplusAuctionItem } from '@acala-network/types/interfaces/auctionManager';
import { RiskManagementParams } from '@acala-network/types/interfaces/cdpEngine';
import { BondingLedger } from '@acala-network/types/interfaces/homaCouncli';
import { AirDropCurrencyId, CurrencyId } from '@acala-network/types/interfaces/primitives';
import { AccountId, AuctionId, AuctionIdOf, Balance, BlockNumber, DebitBalance, OracleKey, Share } from '@acala-network/types/interfaces/runtime';
import { PolkadotAccountId } from '@acala-network/types/interfaces/stakingPool';
import { ExchangeRate, Rate } from '@acala-network/types/interfaces/support';
import { CallOf } from '@open-web3/orml-types/interfaces/authority';
import { OrderedSet, TimestampedValueOf } from '@open-web3/orml-types/interfaces/oracle';
import { Price } from '@open-web3/orml-types/interfaces/prices';
import { AuctionInfo, DispatchId } from '@open-web3/orml-types/interfaces/traits';
import { VestingScheduleOf } from '@open-web3/orml-types/interfaces/vesting';
import { AccountData, BalanceLock } from '@polkadot/types/interfaces/balances';
import { AuthorityId } from '@polkadot/types/interfaces/consensus';
import { EraIndex, MomentOf } from '@polkadot/types/interfaces/staking';
import { ApiTypes } from '@polkadot/api/types';

declare module '@polkadot/api/types/storage' {
  export interface AugmentedQueries<ApiType> {
    accounts: {
      [index: string]: QueryableStorageEntry<ApiType>;
      freeTransferEnabledAccounts: AugmentedQuery<ApiType, (arg: AccountId | string | Uint8Array) => Observable<Option<bool>>> & QueryableStorageEntry<ApiType>;
      lastFreeTransfers: AugmentedQuery<ApiType, (arg: AccountId | string | Uint8Array) => Observable<Vec<MomentOf>>> & QueryableStorageEntry<ApiType>;
    };
    airDrop: {
      [index: string]: QueryableStorageEntry<ApiType>;
      airDrops: AugmentedQueryDoubleMap<ApiType, (key1: AccountId | string | Uint8Array, key2: AirDropCurrencyId | 'KAR'|'ACA' | number | Uint8Array) => Observable<Balance>> & QueryableStorageEntry<ApiType>;
    };
    auction: {
      [index: string]: QueryableStorageEntry<ApiType>;
      auctionEndTime: AugmentedQueryDoubleMap<ApiType, (key1: BlockNumber | AnyNumber | Uint8Array, key2: AuctionId | AnyNumber | Uint8Array) => Observable<Option<bool>>> & QueryableStorageEntry<ApiType>;
      auctions: AugmentedQuery<ApiType, (arg: AuctionId | AnyNumber | Uint8Array) => Observable<Option<AuctionInfo>>> & QueryableStorageEntry<ApiType>;
      auctionsIndex: AugmentedQuery<ApiType, () => Observable<AuctionId>> & QueryableStorageEntry<ApiType>;
    };
    auctionManager: {
      [index: string]: QueryableStorageEntry<ApiType>;
      /**
       * Mapping from auction id to collateral auction info
       **/
      collateralAuctions: AugmentedQuery<ApiType, (arg: AuctionIdOf | AnyNumber | Uint8Array) => Observable<Option<CollateralAuctionItem>>> & QueryableStorageEntry<ApiType>;
      /**
       * Mapping from auction id to debit auction info
       **/
      debitAuctions: AugmentedQuery<ApiType, (arg: AuctionIdOf | AnyNumber | Uint8Array) => Observable<Option<DebitAuctionItem>>> & QueryableStorageEntry<ApiType>;
      /**
       * System shutdown flag
       **/
      isShutdown: AugmentedQuery<ApiType, () => Observable<bool>> & QueryableStorageEntry<ApiType>;
      /**
       * Mapping from auction id to surplus auction info
       **/
      surplusAuctions: AugmentedQuery<ApiType, (arg: AuctionIdOf | AnyNumber | Uint8Array) => Observable<Option<SurplusAuctionItem>>> & QueryableStorageEntry<ApiType>;
      /**
       * Record of the total collateral amount of all ative collateral auctions under specific collateral type
       * CollateralType -> TotalAmount
       **/
      totalCollateralInAuction: AugmentedQuery<ApiType, (arg: CurrencyId | 'ACA'|'AUSD'|'DOT'|'XBTC'|'LDOT' | number | Uint8Array) => Observable<Balance>> & QueryableStorageEntry<ApiType>;
      /**
       * Record of total fix amount of all ative debit auctions
       **/
      totalDebitInAuction: AugmentedQuery<ApiType, () => Observable<Balance>> & QueryableStorageEntry<ApiType>;
      /**
       * Record of total surplus amount of all ative surplus auctions
       **/
      totalSurplusInAuction: AugmentedQuery<ApiType, () => Observable<Balance>> & QueryableStorageEntry<ApiType>;
      /**
       * Record of total target sales of all ative collateral auctions
       **/
      totalTargetInAuction: AugmentedQuery<ApiType, () => Observable<Balance>> & QueryableStorageEntry<ApiType>;
    };
    cdpEngine: {
      [index: string]: QueryableStorageEntry<ApiType>;
      /**
       * Mapping from collateral type to its risk management params
       **/
      collateralParams: AugmentedQuery<ApiType, (arg: CurrencyId | 'ACA'|'AUSD'|'DOT'|'XBTC'|'LDOT' | number | Uint8Array) => Observable<RiskManagementParams>> & QueryableStorageEntry<ApiType>;
      /**
       * Mapping from collateral type to its exchange rate of debit units and debit value
       **/
      debitExchangeRate: AugmentedQuery<ApiType, (arg: CurrencyId | 'ACA'|'AUSD'|'DOT'|'XBTC'|'LDOT' | number | Uint8Array) => Observable<Option<ExchangeRate>>> & QueryableStorageEntry<ApiType>;
      /**
       * Global stability fee rate for all types of collateral
       **/
      globalStabilityFee: AugmentedQuery<ApiType, () => Observable<Rate>> & QueryableStorageEntry<ApiType>;
      /**
       * System shutdown flag
       **/
      isShutdown: AugmentedQuery<ApiType, () => Observable<bool>> & QueryableStorageEntry<ApiType>;
    };
    cdpTreasury: {
      [index: string]: QueryableStorageEntry<ApiType>;
      /**
       * The maximum amount of collateral amount for sale per collateral auction
       **/
      collateralAuctionMaximumSize: AugmentedQuery<ApiType, (arg: CurrencyId | 'ACA'|'AUSD'|'DOT'|'XBTC'|'LDOT' | number | Uint8Array) => Observable<Balance>> & QueryableStorageEntry<ApiType>;
      /**
       * The fixed amount of stable coin per surplus auction wants to get
       **/
      debitAuctionFixedSize: AugmentedQuery<ApiType, () => Observable<Balance>> & QueryableStorageEntry<ApiType>;
      /**
       * Current total debit value of system. It's not same as debit in CDP engine,
       * it is the bad debt of the system.
       **/
      debitPool: AugmentedQuery<ApiType, () => Observable<Balance>> & QueryableStorageEntry<ApiType>;
      /**
       * Initial amount of native token for sale per debit auction
       **/
      initialAmountPerDebitAuction: AugmentedQuery<ApiType, () => Observable<Balance>> & QueryableStorageEntry<ApiType>;
      /**
       * System shutdown flag
       **/
      isShutdown: AugmentedQuery<ApiType, () => Observable<bool>> & QueryableStorageEntry<ApiType>;
      /**
       * The fixed amount of stable coin for sale per surplus auction
       **/
      surplusAuctionFixedSize: AugmentedQuery<ApiType, () => Observable<Balance>> & QueryableStorageEntry<ApiType>;
      /**
       * The buffer size of surplus pool, the system will process the surplus through
       * surplus auction when above this value
       **/
      surplusBufferSize: AugmentedQuery<ApiType, () => Observable<Balance>> & QueryableStorageEntry<ApiType>;
      /**
       * Current total surplus of system.
       **/
      surplusPool: AugmentedQuery<ApiType, () => Observable<Balance>> & QueryableStorageEntry<ApiType>;
      /**
       * Mapping from collateral type to collateral assets amount kept in CDP treasury
       **/
      totalCollaterals: AugmentedQuery<ApiType, (arg: CurrencyId | 'ACA'|'AUSD'|'DOT'|'XBTC'|'LDOT' | number | Uint8Array) => Observable<Balance>> & QueryableStorageEntry<ApiType>;
    };
    dex: {
      [index: string]: QueryableStorageEntry<ApiType>;
      /**
       * System shutdown flag
       **/
      isShutdown: AugmentedQuery<ApiType, () => Observable<bool>> & QueryableStorageEntry<ApiType>;
      /**
       * Incentive reward rate for different currency type
       * CurrencyType -> IncentiveRate
       **/
      liquidityIncentiveRate: AugmentedQuery<ApiType, (arg: CurrencyId | 'ACA'|'AUSD'|'DOT'|'XBTC'|'LDOT' | number | Uint8Array) => Observable<Rate>> & QueryableStorageEntry<ApiType>;
      /**
       * Liquidity pool, which is the trading pair for specific currency type to base currency type.
       * CurrencyType -> (CurrencyAmount, BaseCurrencyAmount)
       **/
      liquidityPool: AugmentedQuery<ApiType, (arg: CurrencyId | 'ACA'|'AUSD'|'DOT'|'XBTC'|'LDOT' | number | Uint8Array) => Observable<ITuple<[Balance, Balance]>>> & QueryableStorageEntry<ApiType>;
      /**
       * Shares records indexed by currency type and account id
       * CurrencyType -> Owner -> ShareAmount
       **/
      shares: AugmentedQueryDoubleMap<ApiType, (key1: CurrencyId | 'ACA'|'AUSD'|'DOT'|'XBTC'|'LDOT' | number | Uint8Array, key2: AccountId | string | Uint8Array) => Observable<Share>> & QueryableStorageEntry<ApiType>;
      /**
       * Total interest(include total withdrawn) and total withdrawn interest for different currency type
       * CurrencyType -> (TotalInterest, TotalWithdrawnInterest)
       **/
      totalInterest: AugmentedQuery<ApiType, (arg: CurrencyId | 'ACA'|'AUSD'|'DOT'|'XBTC'|'LDOT' | number | Uint8Array) => Observable<ITuple<[Balance, Balance]>>> & QueryableStorageEntry<ApiType>;
      /**
       * Total shares amount of liquidity pool specificed by currency type
       * CurrencyType -> TotalSharesAmount
       **/
      totalShares: AugmentedQuery<ApiType, (arg: CurrencyId | 'ACA'|'AUSD'|'DOT'|'XBTC'|'LDOT' | number | Uint8Array) => Observable<Share>> & QueryableStorageEntry<ApiType>;
      /**
       * Withdrawn interest indexed by currency type and account id
       * CurrencyType -> Owner -> WithdrawnInterest
       **/
      withdrawnInterest: AugmentedQueryDoubleMap<ApiType, (key1: CurrencyId | 'ACA'|'AUSD'|'DOT'|'XBTC'|'LDOT' | number | Uint8Array, key2: AccountId | string | Uint8Array) => Observable<Balance>> & QueryableStorageEntry<ApiType>;
    };
    emergencyShutdown: {
      [index: string]: QueryableStorageEntry<ApiType>;
      /**
       * Open final redemption flag
       **/
      canRefund: AugmentedQuery<ApiType, () => Observable<bool>> & QueryableStorageEntry<ApiType>;
      /**
       * Emergency shutdown flag
       **/
      isShutdown: AugmentedQuery<ApiType, () => Observable<bool>> & QueryableStorageEntry<ApiType>;
    };
    honzon: {
      [index: string]: QueryableStorageEntry<ApiType>;
      /**
       * The authorization relationship map from
       * Authorizer -> (CollateralType, Authorizee) -> Authorized
       **/
      authorization: AugmentedQueryDoubleMap<ApiType, (key1: AccountId | string | Uint8Array, key2: ITuple<[CurrencyId, AccountId]> | [CurrencyId | 'ACA' | 'AUSD' | 'DOT' | 'XBTC' | 'LDOT' | number | Uint8Array, AccountId | string | Uint8Array]) => Observable<bool>> & QueryableStorageEntry<ApiType>;
      /**
       * System shutdown flag
       **/
      isShutdown: AugmentedQuery<ApiType, () => Observable<bool>> & QueryableStorageEntry<ApiType>;
    };
    loans: {
      [index: string]: QueryableStorageEntry<ApiType>;
      /**
       * The collateral asset amount of CDPs, map from
       * Owner -> CollateralType -> CollateralAmount
       **/
      collaterals: AugmentedQueryDoubleMap<ApiType, (key1: AccountId | string | Uint8Array, key2: CurrencyId | 'ACA'|'AUSD'|'DOT'|'XBTC'|'LDOT' | number | Uint8Array) => Observable<Balance>> & QueryableStorageEntry<ApiType>;
      /**
       * The debit amount records of CDPs, map from
       * CollateralType -> Owner -> DebitAmount
       **/
      debits: AugmentedQueryDoubleMap<ApiType, (key1: CurrencyId | 'ACA'|'AUSD'|'DOT'|'XBTC'|'LDOT' | number | Uint8Array, key2: AccountId | string | Uint8Array) => Observable<DebitBalance>> & QueryableStorageEntry<ApiType>;
      /**
       * The total collateral asset amount, map from
       * CollateralType -> TotalCollateralAmount
       **/
      totalCollaterals: AugmentedQuery<ApiType, (arg: CurrencyId | 'ACA'|'AUSD'|'DOT'|'XBTC'|'LDOT' | number | Uint8Array) => Observable<Balance>> & QueryableStorageEntry<ApiType>;
      /**
       * The total debit amount, map from
       * CollateralType -> TotalDebitAmount
       **/
      totalDebits: AugmentedQuery<ApiType, (arg: CurrencyId | 'ACA'|'AUSD'|'DOT'|'XBTC'|'LDOT' | number | Uint8Array) => Observable<DebitBalance>> & QueryableStorageEntry<ApiType>;
    };
    nomineesElection: {
      [index: string]: QueryableStorageEntry<ApiType>;
      currentEra: AugmentedQuery<ApiType, () => Observable<EraIndex>> & QueryableStorageEntry<ApiType>;
      ledger: AugmentedQuery<ApiType, (arg: AccountId | string | Uint8Array) => Observable<BondingLedger>> & QueryableStorageEntry<ApiType>;
      nominations: AugmentedQuery<ApiType, (arg: AccountId | string | Uint8Array) => Observable<Vec<PolkadotAccountId>>> & QueryableStorageEntry<ApiType>;
      nominees: AugmentedQuery<ApiType, () => Observable<Vec<PolkadotAccountId>>> & QueryableStorageEntry<ApiType>;
      votes: AugmentedQuery<ApiType, (arg: PolkadotAccountId | string | Uint8Array) => Observable<Balance>> & QueryableStorageEntry<ApiType>;
    };
    oracle: {
      [index: string]: QueryableStorageEntry<ApiType>;
      /**
       * If an oracle operator has feed a value in this block
       **/
      hasDispatched: AugmentedQuery<ApiType, () => Observable<OrderedSet>> & QueryableStorageEntry<ApiType>;
      /**
       * True if Self::values(key) is up to date, otherwise the value is stale
       **/
      isUpdated: AugmentedQuery<ApiType, (arg: OracleKey | 'ACA'|'AUSD'|'DOT'|'XBTC'|'LDOT' | number | Uint8Array) => Observable<bool>> & QueryableStorageEntry<ApiType>;
      /**
       * The current members of the collective. This is stored sorted (just by value).
       **/
      members: AugmentedQuery<ApiType, () => Observable<OrderedSet>> & QueryableStorageEntry<ApiType>;
      nonces: AugmentedQuery<ApiType, (arg: AccountId | string | Uint8Array) => Observable<u32>> & QueryableStorageEntry<ApiType>;
      /**
       * Raw values for each oracle operators
       **/
      rawValues: AugmentedQueryDoubleMap<ApiType, (key1: AccountId | string | Uint8Array, key2: OracleKey | 'ACA'|'AUSD'|'DOT'|'XBTC'|'LDOT' | number | Uint8Array) => Observable<Option<TimestampedValueOf>>> & QueryableStorageEntry<ApiType>;
      /**
       * Session key for oracle operators
       **/
      sessionKeys: AugmentedQuery<ApiType, (arg: AccountId | string | Uint8Array) => Observable<Option<AuthorityId>>> & QueryableStorageEntry<ApiType>;
      /**
       * Combined value, may not be up to date
       **/
      values: AugmentedQuery<ApiType, (arg: OracleKey | 'ACA'|'AUSD'|'DOT'|'XBTC'|'LDOT' | number | Uint8Array) => Observable<Option<TimestampedValueOf>>> & QueryableStorageEntry<ApiType>;
    };
    polkadotBridge: {
      [index: string]: QueryableStorageEntry<ApiType>;
      available: AugmentedQuery<ApiType, () => Observable<Balance>> & QueryableStorageEntry<ApiType>;
      bonded: AugmentedQuery<ApiType, () => Observable<Balance>> & QueryableStorageEntry<ApiType>;
      currentEra: AugmentedQuery<ApiType, () => Observable<EraIndex>> & QueryableStorageEntry<ApiType>;
      eraStartBlockNumber: AugmentedQuery<ApiType, () => Observable<BlockNumber>> & QueryableStorageEntry<ApiType>;
      forcedEra: AugmentedQuery<ApiType, () => Observable<Option<BlockNumber>>> & QueryableStorageEntry<ApiType>;
      mockRewardRate: AugmentedQuery<ApiType, () => Observable<Option<Rate>>> & QueryableStorageEntry<ApiType>;
      unbonding: AugmentedQuery<ApiType, () => Observable<Vec<ITuple<[Balance, EraIndex]>>>> & QueryableStorageEntry<ApiType>;
    };
    prices: {
      [index: string]: QueryableStorageEntry<ApiType>;
      lockedPrice: AugmentedQuery<ApiType, (arg: CurrencyId | 'ACA'|'AUSD'|'DOT'|'XBTC'|'LDOT' | number | Uint8Array) => Observable<Option<Price>>> & QueryableStorageEntry<ApiType>;
    };
    scheduleUpdate: {
      [index: string]: QueryableStorageEntry<ApiType>;
      delayedNormalDispatches: AugmentedQueryDoubleMap<ApiType, (key1: BlockNumber | AnyNumber | Uint8Array, key2: DispatchId | AnyNumber | Uint8Array) => Observable<Option<ITuple<[Option<AccountId>, CallOf, DispatchId]>>>> & QueryableStorageEntry<ApiType>;
      delayedOperationalDispatches: AugmentedQueryDoubleMap<ApiType, (key1: BlockNumber | AnyNumber | Uint8Array, key2: DispatchId | AnyNumber | Uint8Array) => Observable<Option<ITuple<[Option<AccountId>, CallOf, DispatchId]>>>> & QueryableStorageEntry<ApiType>;
      nextId: AugmentedQuery<ApiType, () => Observable<DispatchId>> & QueryableStorageEntry<ApiType>;
    };
    stakingPool: {
      [index: string]: QueryableStorageEntry<ApiType>;
      claimedUnbond: AugmentedQueryDoubleMap<ApiType, (key1: AccountId | string | Uint8Array, key2: EraIndex | AnyNumber | Uint8Array) => Observable<Balance>> & QueryableStorageEntry<ApiType>;
      currentEra: AugmentedQuery<ApiType, () => Observable<EraIndex>> & QueryableStorageEntry<ApiType>;
      freeUnbonded: AugmentedQuery<ApiType, () => Observable<Balance>> & QueryableStorageEntry<ApiType>;
      nextEraUnbond: AugmentedQuery<ApiType, () => Observable<ITuple<[Balance, Balance]>>> & QueryableStorageEntry<ApiType>;
      totalBonded: AugmentedQuery<ApiType, () => Observable<Balance>> & QueryableStorageEntry<ApiType>;
      totalClaimedUnbonded: AugmentedQuery<ApiType, () => Observable<Balance>> & QueryableStorageEntry<ApiType>;
      unbonding: AugmentedQuery<ApiType, (arg: EraIndex | AnyNumber | Uint8Array) => Observable<ITuple<[Balance, Balance]>>> & QueryableStorageEntry<ApiType>;
      unbondingToFree: AugmentedQuery<ApiType, () => Observable<Balance>> & QueryableStorageEntry<ApiType>;
    };
    tokens: {
      [index: string]: QueryableStorageEntry<ApiType>;
      /**
       * The balance of a token type under an account.
       * 
       * NOTE: If the total is ever zero, decrease account ref account.
       * 
       * NOTE: This is only used in the case that this module is used to store balances.
       **/
      accounts: AugmentedQueryDoubleMap<ApiType, (key1: AccountId | string | Uint8Array, key2: CurrencyId | 'ACA'|'AUSD'|'DOT'|'XBTC'|'LDOT' | number | Uint8Array) => Observable<AccountData>> & QueryableStorageEntry<ApiType>;
      /**
       * Any liquidity locks of a token type under an account.
       * NOTE: Should only be accessed when setting, changing and freeing a lock.
       **/
      locks: AugmentedQueryDoubleMap<ApiType, (key1: AccountId | string | Uint8Array, key2: CurrencyId | 'ACA'|'AUSD'|'DOT'|'XBTC'|'LDOT' | number | Uint8Array) => Observable<Vec<BalanceLock>>> & QueryableStorageEntry<ApiType>;
      /**
       * The total issuance of a token type.
       **/
      totalIssuance: AugmentedQuery<ApiType, (arg: CurrencyId | 'ACA'|'AUSD'|'DOT'|'XBTC'|'LDOT' | number | Uint8Array) => Observable<Balance>> & QueryableStorageEntry<ApiType>;
    };
    vesting: {
      [index: string]: QueryableStorageEntry<ApiType>;
      /**
       * Vesting schedules of an account.
       **/
      vestingSchedules: AugmentedQuery<ApiType, (arg: AccountId | string | Uint8Array) => Observable<Vec<VestingScheduleOf>>> & QueryableStorageEntry<ApiType>;
    };
  }

  export interface QueryableStorage<ApiType extends ApiTypes> extends AugmentedQueries<ApiType> {
    [index: string]: QueryableModuleStorage<ApiType>;
  }
}
