// Auto-generated via `yarn polkadot-types-from-chain`, do not edit
/* eslint-disable */

import type { Option, Vec, bool, u64 } from '@polkadot/types';
import type { AnyNumber, ITuple, Observable } from '@polkadot/types/types';
import type { CollateralAuctionItem } from '@acala-network/types/interfaces/auctionManager';
import type { RiskManagementParams } from '@acala-network/types/interfaces/cdpEngine';
import type { TradingPairStatus } from '@acala-network/types/interfaces/dex';
import type { Position } from '@acala-network/types/interfaces/loans';
import type { AuctionId, CurrencyId, TradingPair } from '@acala-network/types/interfaces/primitives';
import type { AccountId, Balance, BlockNumber } from '@acala-network/types/interfaces/runtime';
import type { ExchangeRate, Rate } from '@acala-network/types/interfaces/support';
import type { AuctionInfo, Price } from '@open-web3/orml-types/interfaces/traits';
import type { AccountData, BalanceLock } from '@polkadot/types/interfaces/balances';
import type { ApiTypes } from '@polkadot/api/types';

declare module '@polkadot/api/types/storage' {
  export interface AugmentedQueries<ApiType> {
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
      totalCollateralInAuction: AugmentedQuery<ApiType, (arg: CurrencyId | { Token: any } | { DEXShare: any } | { ERC20: any } | { ChainSafe: any } | string | Uint8Array) => Observable<Balance>, [CurrencyId]> & QueryableStorageEntry<ApiType, [CurrencyId]>;
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
    cdpEngine: {
      /**
       * Mapping from collateral type to its risk management params
       * 
       * CollateralParams: CurrencyId => RiskManagementParams
       **/
      collateralParams: AugmentedQuery<ApiType, (arg: CurrencyId | { Token: any } | { DEXShare: any } | { ERC20: any } | { ChainSafe: any } | string | Uint8Array) => Observable<RiskManagementParams>, [CurrencyId]> & QueryableStorageEntry<ApiType, [CurrencyId]>;
      /**
       * Mapping from collateral type to its exchange rate of debit units and
       * debit value
       * 
       * DebitExchangeRate: CurrencyId => Option<ExchangeRate>
       **/
      debitExchangeRate: AugmentedQuery<ApiType, (arg: CurrencyId | { Token: any } | { DEXShare: any } | { ERC20: any } | { ChainSafe: any } | string | Uint8Array) => Observable<Option<ExchangeRate>>, [CurrencyId]> & QueryableStorageEntry<ApiType, [CurrencyId]>;
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
      expectedCollateralAuctionSize: AugmentedQuery<ApiType, (arg: CurrencyId | { Token: any } | { DEXShare: any } | { ERC20: any } | { ChainSafe: any } | string | Uint8Array) => Observable<Balance>, [CurrencyId]> & QueryableStorageEntry<ApiType, [CurrencyId]>;
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
    honzon: {
      /**
       * The authorization relationship map from
       * Authorizer -> (CollateralType, Authorizee) -> Authorized
       * 
       * Authorization: double_map AccountId, (CurrencyId, T::AccountId) => Option<Balance>
       **/
      authorization: AugmentedQuery<ApiType, (arg1: AccountId | string | Uint8Array, arg2: ITuple<[CurrencyId, AccountId]> | [CurrencyId | { Token: any } | { DEXShare: any } | { ERC20: any } | { ChainSafe: any } | string | Uint8Array, AccountId | string | Uint8Array]) => Observable<Option<Balance>>, [AccountId, ITuple<[CurrencyId, AccountId]>]> & QueryableStorageEntry<ApiType, [AccountId, ITuple<[CurrencyId, AccountId]>]>;
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
      positions: AugmentedQuery<ApiType, (arg1: CurrencyId | { Token: any } | { DEXShare: any } | { ERC20: any } | { ChainSafe: any } | string | Uint8Array, arg2: AccountId | string | Uint8Array) => Observable<Position>, [CurrencyId, AccountId]> & QueryableStorageEntry<ApiType, [CurrencyId, AccountId]>;
      /**
       * The total collateralized debit positions, map from
       * CollateralType -> Position
       * 
       * TotalPositions: CurrencyId => Position
       **/
      totalPositions: AugmentedQuery<ApiType, (arg: CurrencyId | { Token: any } | { DEXShare: any } | { ERC20: any } | { ChainSafe: any } | string | Uint8Array) => Observable<Position>, [CurrencyId]> & QueryableStorageEntry<ApiType, [CurrencyId]>;
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
      lockedPrice: AugmentedQuery<ApiType, (arg: CurrencyId | { Token: any } | { DEXShare: any } | { ERC20: any } | { ChainSafe: any } | string | Uint8Array) => Observable<Option<Price>>, [CurrencyId]> & QueryableStorageEntry<ApiType, [CurrencyId]>;
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
      accounts: AugmentedQuery<ApiType, (arg1: AccountId | string | Uint8Array, arg2: CurrencyId | { Token: any } | { DEXShare: any } | { ERC20: any } | { ChainSafe: any } | string | Uint8Array) => Observable<AccountData>, [AccountId, CurrencyId]> & QueryableStorageEntry<ApiType, [AccountId, CurrencyId]>;
      /**
       * Any liquidity locks of a token type under an account.
       * NOTE: Should only be accessed when setting, changing and freeing a lock.
       **/
      locks: AugmentedQuery<ApiType, (arg1: AccountId | string | Uint8Array, arg2: CurrencyId | { Token: any } | { DEXShare: any } | { ERC20: any } | { ChainSafe: any } | string | Uint8Array) => Observable<Vec<BalanceLock>>, [AccountId, CurrencyId]> & QueryableStorageEntry<ApiType, [AccountId, CurrencyId]>;
      /**
       * The total issuance of a token type.
       **/
      totalIssuance: AugmentedQuery<ApiType, (arg: CurrencyId | { Token: any } | { DEXShare: any } | { ERC20: any } | { ChainSafe: any } | string | Uint8Array) => Observable<Balance>, [CurrencyId]> & QueryableStorageEntry<ApiType, [CurrencyId]>;
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
  }

  export interface QueryableStorage<ApiType extends ApiTypes> extends AugmentedQueries<ApiType> {
    [key: string]: QueryableModuleStorage<ApiType>;
  }
}
