// Auto-generated via `yarn polkadot-types-from-chain`, do not edit
/* eslint-disable */

import type { Option, Vec, bool, u32, u64 } from '@polkadot/types';
import type { AnyNumber, ITuple, Observable } from '@polkadot/types/types';
import type { CollateralAuctionItem } from '@acala-network/types/interfaces/auctionManager';
import type { RiskManagementParams } from '@acala-network/types/interfaces/cdpEngine';
import type { TradingPairStatus } from '@acala-network/types/interfaces/dex';
import type { Guarantee, RelaychainAccountId, ValidatorBacking } from '@acala-network/types/interfaces/homaValidatorList';
import type { Position } from '@acala-network/types/interfaces/loans';
import type { BondingLedger, NomineeId } from '@acala-network/types/interfaces/nomineesElection';
import type { AirDropCurrencyId, AuctionId, CurrencyId, TradingPair } from '@acala-network/types/interfaces/primitives';
import type { AccountId, Balance, BlockNumber } from '@acala-network/types/interfaces/runtime';
import type { Ledger, Params, SubAccountStatus } from '@acala-network/types/interfaces/stakingPool';
import type { ExchangeRate, Rate } from '@acala-network/types/interfaces/support';
import type { AuctionInfo, Price } from '@open-web3/orml-types/interfaces/traits';
import type { AccountData, BalanceLock } from '@polkadot/types/interfaces/balances';
import type { EraIndex } from '@polkadot/types/interfaces/staking';
import type { Phase } from '@polkadot/types/interfaces/system';
import type { ApiTypes } from '@polkadot/api/types';

declare module '@polkadot/api/types/storage' {
  export interface AugmentedQueries<ApiType> {
    airDrop: {
      [key: string]: QueryableStorageEntry<ApiType>;
      airDrops: AugmentedQueryDoubleMap<ApiType, (key1: AccountId | string | Uint8Array, key2: AirDropCurrencyId | 'KAR' | 'ACA' | number | Uint8Array) => Observable<Balance>, [AccountId, AirDropCurrencyId]> & QueryableStorageEntry<ApiType, [AccountId, AirDropCurrencyId]>;
    };
    auction: {
      [key: string]: QueryableStorageEntry<ApiType>;
      /**
       * Index auctions by end time.
       **/
      auctionEndTime: AugmentedQueryDoubleMap<ApiType, (key1: BlockNumber | AnyNumber | Uint8Array, key2: AuctionId | AnyNumber | Uint8Array) => Observable<Option<ITuple<[]>>>, [BlockNumber, AuctionId]> & QueryableStorageEntry<ApiType, [BlockNumber, AuctionId]>;
      /**
       * Stores on-going and future auctions. Closed auction are removed.
       **/
      auctions: AugmentedQuery<ApiType, (arg: AuctionId | AnyNumber | Uint8Array) => Observable<Option<AuctionInfo>>, [AuctionId]> & QueryableStorageEntry<ApiType, [AuctionId]>;
      /**
       * Track the next auction ID.
       **/
      auctionsIndex: AugmentedQuery<ApiType, () => Observable<AuctionId>, []> & QueryableStorageEntry<ApiType, []>;
    };
    auctionManager: {
      [key: string]: QueryableStorageEntry<ApiType>;
      /**
       * Mapping from auction id to collateral auction info
       **/
      collateralAuctions: AugmentedQuery<ApiType, (arg: AuctionId | AnyNumber | Uint8Array) => Observable<Option<CollateralAuctionItem>>, [AuctionId]> & QueryableStorageEntry<ApiType, [AuctionId]>;
      /**
       * Record of the total collateral amount of all active collateral auctions
       * under specific collateral type CollateralType -> TotalAmount
       **/
      totalCollateralInAuction: AugmentedQuery<ApiType, (arg: CurrencyId | { Token: any } | { DEXShare: any } | { ERC20: any } | string | Uint8Array) => Observable<Balance>, [CurrencyId]> & QueryableStorageEntry<ApiType, [CurrencyId]>;
      /**
       * Record of total target sales of all active collateral auctions
       **/
      totalTargetInAuction: AugmentedQuery<ApiType, () => Observable<Balance>, []> & QueryableStorageEntry<ApiType, []>;
    };
    cdpEngine: {
      [key: string]: QueryableStorageEntry<ApiType>;
      /**
       * Mapping from collateral type to its risk management params
       **/
      collateralParams: AugmentedQuery<ApiType, (arg: CurrencyId | { Token: any } | { DEXShare: any } | { ERC20: any } | string | Uint8Array) => Observable<RiskManagementParams>, [CurrencyId]> & QueryableStorageEntry<ApiType, [CurrencyId]>;
      /**
       * Mapping from collateral type to its exchange rate of debit units and
       * debit value
       **/
      debitExchangeRate: AugmentedQuery<ApiType, (arg: CurrencyId | { Token: any } | { DEXShare: any } | { ERC20: any } | string | Uint8Array) => Observable<Option<ExchangeRate>>, [CurrencyId]> & QueryableStorageEntry<ApiType, [CurrencyId]>;
      /**
       * Global interest rate per sec for all types of collateral
       **/
      globalInterestRatePerSec: AugmentedQuery<ApiType, () => Observable<Rate>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Timestamp in seconds of the last interest accumulation
       **/
      lastAccumulationSecs: AugmentedQuery<ApiType, () => Observable<u64>, []> & QueryableStorageEntry<ApiType, []>;
    };
    cdpTreasury: {
      [key: string]: QueryableStorageEntry<ApiType>;
      /**
       * Current total debit value of system. It's not same as debit in CDP
       * engine, it is the bad debt of the system.
       **/
      debitPool: AugmentedQuery<ApiType, () => Observable<Balance>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * The expected amount size for per lot collateral auction of specific
       * collateral type.
       **/
      expectedCollateralAuctionSize: AugmentedQuery<ApiType, (arg: CurrencyId | { Token: any } | { DEXShare: any } | { ERC20: any } | string | Uint8Array) => Observable<Balance>, [CurrencyId]> & QueryableStorageEntry<ApiType, [CurrencyId]>;
    };
    dex: {
      [key: string]: QueryableStorageEntry<ApiType>;
      /**
       * Liquidity pool for TradingPair.
       **/
      liquidityPool: AugmentedQuery<ApiType, (arg: TradingPair) => Observable<ITuple<[Balance, Balance]>>, [TradingPair]> & QueryableStorageEntry<ApiType, [TradingPair]>;
      /**
       * Provision of TradingPair by AccountId.
       **/
      provisioningPool: AugmentedQueryDoubleMap<ApiType, (key1: TradingPair, key2: AccountId | string | Uint8Array) => Observable<ITuple<[Balance, Balance]>>, [TradingPair, AccountId]> & QueryableStorageEntry<ApiType, [TradingPair, AccountId]>;
      /**
       * Status for TradingPair.
       **/
      tradingPairStatuses: AugmentedQuery<ApiType, (arg: TradingPair) => Observable<TradingPairStatus>, [TradingPair]> & QueryableStorageEntry<ApiType, [TradingPair]>;
    };
    emergencyShutdown: {
      [key: string]: QueryableStorageEntry<ApiType>;
      /**
       * Open final redemption flag
       **/
      canRefund: AugmentedQuery<ApiType, () => Observable<bool>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Emergency shutdown flag
       **/
      isShutdown: AugmentedQuery<ApiType, () => Observable<bool>, []> & QueryableStorageEntry<ApiType, []>;
    };
    homaValidatorListModule: {
      [key: string]: QueryableStorageEntry<ApiType>;
      guarantees: AugmentedQueryDoubleMap<ApiType, (key1: RelaychainAccountId | string | Uint8Array, key2: AccountId | string | Uint8Array) => Observable<Option<Guarantee>>, [RelaychainAccountId, AccountId]> & QueryableStorageEntry<ApiType, [RelaychainAccountId, AccountId]>;
      totalLockedByGuarantor: AugmentedQuery<ApiType, (arg: AccountId | string | Uint8Array) => Observable<Option<Balance>>, [AccountId]> & QueryableStorageEntry<ApiType, [AccountId]>;
      validatorBackings: AugmentedQuery<ApiType, (arg: RelaychainAccountId | string | Uint8Array) => Observable<Option<ValidatorBacking>>, [RelaychainAccountId]> & QueryableStorageEntry<ApiType, [RelaychainAccountId]>;
    };
    honzon: {
      [key: string]: QueryableStorageEntry<ApiType>;
      /**
       * The authorization relationship map from
       * Authorizer -> (CollateralType, Authorizee) -> Authorized
       **/
      authorization: AugmentedQueryDoubleMap<ApiType, (key1: AccountId | string | Uint8Array, key2: ITuple<[CurrencyId, AccountId]> | [CurrencyId | { Token: any } | { DEXShare: any } | { ERC20: any } | string | Uint8Array, AccountId | string | Uint8Array]) => Observable<bool>, [AccountId, ITuple<[CurrencyId, AccountId]>]> & QueryableStorageEntry<ApiType, [AccountId, ITuple<[CurrencyId, AccountId]>]>;
    };
    loans: {
      [key: string]: QueryableStorageEntry<ApiType>;
      /**
       * The collateralized debit positions, map from
       * Owner -> CollateralType -> Position
       **/
      positions: AugmentedQueryDoubleMap<ApiType, (key1: CurrencyId | { Token: any } | { DEXShare: any } | { ERC20: any } | string | Uint8Array, key2: AccountId | string | Uint8Array) => Observable<Position>, [CurrencyId, AccountId]> & QueryableStorageEntry<ApiType, [CurrencyId, AccountId]>;
      /**
       * The total collateralized debit positions, map from
       * CollateralType -> Position
       **/
      totalPositions: AugmentedQuery<ApiType, (arg: CurrencyId | { Token: any } | { DEXShare: any } | { ERC20: any } | string | Uint8Array) => Observable<Position>, [CurrencyId]> & QueryableStorageEntry<ApiType, [CurrencyId]>;
    };
    nomineesElection: {
      [key: string]: QueryableStorageEntry<ApiType>;
      currentEra: AugmentedQuery<ApiType, () => Observable<EraIndex>, []> & QueryableStorageEntry<ApiType, []>;
      ledger: AugmentedQuery<ApiType, (arg: AccountId | string | Uint8Array) => Observable<BondingLedger>, [AccountId]> & QueryableStorageEntry<ApiType, [AccountId]>;
      nominations: AugmentedQuery<ApiType, (arg: AccountId | string | Uint8Array) => Observable<Vec<NomineeId>>, [AccountId]> & QueryableStorageEntry<ApiType, [AccountId]>;
      nominees: AugmentedQuery<ApiType, () => Observable<Vec<NomineeId>>, []> & QueryableStorageEntry<ApiType, []>;
      votes: AugmentedQuery<ApiType, (arg: NomineeId | string | Uint8Array) => Observable<Balance>, [NomineeId]> & QueryableStorageEntry<ApiType, [NomineeId]>;
    };
    polkadotBridge: {
      [key: string]: QueryableStorageEntry<ApiType>;
      currentEra: AugmentedQuery<ApiType, () => Observable<EraIndex>, []> & QueryableStorageEntry<ApiType, []>;
      eraStartBlockNumber: AugmentedQuery<ApiType, () => Observable<BlockNumber>, []> & QueryableStorageEntry<ApiType, []>;
      forcedEra: AugmentedQuery<ApiType, () => Observable<Option<BlockNumber>>, []> & QueryableStorageEntry<ApiType, []>;
      subAccounts: AugmentedQuery<ApiType, (arg: u32 | AnyNumber | Uint8Array) => Observable<SubAccountStatus>, [u32]> & QueryableStorageEntry<ApiType, [u32]>;
    };
    prices: {
      [key: string]: QueryableStorageEntry<ApiType>;
      /**
       * Mapping from currency id to it's locked price
       **/
      lockedPrice: AugmentedQuery<ApiType, (arg: CurrencyId | { Token: any } | { DEXShare: any } | { ERC20: any } | string | Uint8Array) => Observable<Option<Price>>, [CurrencyId]> & QueryableStorageEntry<ApiType, [CurrencyId]>;
    };
    stakingPool: {
      [key: string]: QueryableStorageEntry<ApiType>;
      /**
       * Current era index of Polkadot.
       **/
      currentEra: AugmentedQuery<ApiType, () => Observable<EraIndex>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Unbond on next era beginning by AccountId.
       * AccountId => Unbond
       **/
      nextEraUnbonds: AugmentedQuery<ApiType, (arg: AccountId | string | Uint8Array) => Observable<Balance>, [AccountId]> & QueryableStorageEntry<ApiType, [AccountId]>;
      /**
       * The rebalance phase of current era.
       **/
      rebalancePhase: AugmentedQuery<ApiType, () => Observable<Phase>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * The ledger of staking pool.
       **/
      stakingPoolLedger: AugmentedQuery<ApiType, () => Observable<Ledger>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * The params of staking pool.
       **/
      stakingPoolParams: AugmentedQuery<ApiType, () => Observable<Params>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * The records of unbonding.
       * ExpiredEraIndex => (TotalUnbounding, ClaimedUnbonding,
       * InitialClaimedUnbonding)
       **/
      unbonding: AugmentedQuery<ApiType, (arg: EraIndex | AnyNumber | Uint8Array) => Observable<ITuple<[Balance, Balance, Balance]>>, [EraIndex]> & QueryableStorageEntry<ApiType, [EraIndex]>;
      /**
       * The records of unbonding by AccountId.
       * AccountId, ExpiredEraIndex => Unbounding
       **/
      unbondings: AugmentedQueryDoubleMap<ApiType, (key1: AccountId | string | Uint8Array, key2: EraIndex | AnyNumber | Uint8Array) => Observable<Balance>, [AccountId, EraIndex]> & QueryableStorageEntry<ApiType, [AccountId, EraIndex]>;
    };
    tokens: {
      [key: string]: QueryableStorageEntry<ApiType>;
      /**
       * The balance of a token type under an account.
       * 
       * NOTE: If the total is ever zero, decrease account ref account.
       * 
       * NOTE: This is only used in the case that this module is used to store
       * balances.
       **/
      accounts: AugmentedQueryDoubleMap<ApiType, (key1: AccountId | string | Uint8Array, key2: CurrencyId | { Token: any } | { DEXShare: any } | { ERC20: any } | string | Uint8Array) => Observable<AccountData>, [AccountId, CurrencyId]> & QueryableStorageEntry<ApiType, [AccountId, CurrencyId]>;
      /**
       * Any liquidity locks of a token type under an account.
       * NOTE: Should only be accessed when setting, changing and freeing a lock.
       **/
      locks: AugmentedQueryDoubleMap<ApiType, (key1: AccountId | string | Uint8Array, key2: CurrencyId | { Token: any } | { DEXShare: any } | { ERC20: any } | string | Uint8Array) => Observable<Vec<BalanceLock>>, [AccountId, CurrencyId]> & QueryableStorageEntry<ApiType, [AccountId, CurrencyId]>;
      /**
       * The total issuance of a token type.
       **/
      totalIssuance: AugmentedQuery<ApiType, (arg: CurrencyId | { Token: any } | { DEXShare: any } | { ERC20: any } | string | Uint8Array) => Observable<Balance>, [CurrencyId]> & QueryableStorageEntry<ApiType, [CurrencyId]>;
    };
  }

  export interface QueryableStorage<ApiType extends ApiTypes> extends AugmentedQueries<ApiType> {
    [key: string]: QueryableModuleStorage<ApiType>;
  }
}
