// Auto-generated via `yarn polkadot-types-from-chain`, do not edit
/* eslint-disable */

import { AnyNumber, ITuple, Observable } from '@polkadot/types/types';
import { Option, Vec } from '@polkadot/types/codec';
import { bool, u32 } from '@polkadot/types/primitive';
import { CollateralAuctionItem, DebitAuctionItem, SurplusAuctionItem } from '@acala-network/types/interfaces/auctionManager';
import { RiskManagementParams } from '@acala-network/types/interfaces/cdpEngine';
import { Position } from '@acala-network/types/interfaces/loans';
import { BondingLedger } from '@acala-network/types/interfaces/nomineesElection';
import { AirDropCurrencyId, CurrencyId, TradingPair } from '@acala-network/types/interfaces/primitives';
import { AccountId, AuctionId, Balance, BlockNumber } from '@acala-network/types/interfaces/runtime';
import { Params, PolkadotAccountId, SubAccountStatus } from '@acala-network/types/interfaces/stakingPool';
import { ExchangeRate, Rate } from '@acala-network/types/interfaces/support';
import { AuctionInfo, Price } from '@open-web3/orml-types/interfaces/traits';
import { AccountData, BalanceLock } from '@polkadot/types/interfaces/balances';
import { EraIndex } from '@polkadot/types/interfaces/staking';
import { Multiplier } from '@polkadot/types/interfaces/txpayment';
import { ApiTypes } from '@polkadot/api/types';

declare module '@polkadot/api/types/storage' {
  export interface AugmentedQueries<ApiType> {
    accounts: {
      [key: string]: QueryableStorageEntry<ApiType>;
      nextFeeMultiplier: AugmentedQuery<ApiType, () => Observable<Multiplier>> & QueryableStorageEntry<ApiType>;
    };
    airDrop: {
      [key: string]: QueryableStorageEntry<ApiType>;
      airDrops: AugmentedQueryDoubleMap<ApiType, (key1: AccountId | string | Uint8Array, key2: AirDropCurrencyId | 'KAR' | 'ACA' | number | Uint8Array) => Observable<Balance>> & QueryableStorageEntry<ApiType>;
    };
    auction: {
      [key: string]: QueryableStorageEntry<ApiType>;
      /**
       * Index auctions by end time.
       **/
      auctionEndTime: AugmentedQueryDoubleMap<ApiType, (key1: BlockNumber | AnyNumber | Uint8Array, key2: AuctionId | AnyNumber | Uint8Array) => Observable<Option<ITuple<[]>>>> & QueryableStorageEntry<ApiType>;
      /**
       * Stores on-going and future auctions. Closed auction are removed.
       **/
      auctions: AugmentedQuery<ApiType, (arg: AuctionId | AnyNumber | Uint8Array) => Observable<Option<AuctionInfo>>> & QueryableStorageEntry<ApiType>;
      /**
       * Track the next auction ID.
       **/
      auctionsIndex: AugmentedQuery<ApiType, () => Observable<AuctionId>> & QueryableStorageEntry<ApiType>;
    };
    auctionManager: {
      [key: string]: QueryableStorageEntry<ApiType>;
      /**
       * Mapping from auction id to collateral auction info
       **/
      collateralAuctions: AugmentedQuery<ApiType, (arg: AuctionId | AnyNumber | Uint8Array) => Observable<Option<CollateralAuctionItem>>> & QueryableStorageEntry<ApiType>;
      /**
       * Mapping from auction id to debit auction info
       **/
      debitAuctions: AugmentedQuery<ApiType, (arg: AuctionId | AnyNumber | Uint8Array) => Observable<Option<DebitAuctionItem>>> & QueryableStorageEntry<ApiType>;
      /**
       * Mapping from auction id to surplus auction info
       **/
      surplusAuctions: AugmentedQuery<ApiType, (arg: AuctionId | AnyNumber | Uint8Array) => Observable<Option<SurplusAuctionItem>>> & QueryableStorageEntry<ApiType>;
      /**
       * Record of the total collateral amount of all active collateral auctions under specific collateral type
       * CollateralType -> TotalAmount
       **/
      totalCollateralInAuction: AugmentedQuery<ApiType, (arg: CurrencyId | { Token: any } | { DEXShare: any } | string | Uint8Array) => Observable<Balance>> & QueryableStorageEntry<ApiType>;
      /**
       * Record of total fix amount of all active debit auctions
       **/
      totalDebitInAuction: AugmentedQuery<ApiType, () => Observable<Balance>> & QueryableStorageEntry<ApiType>;
      /**
       * Record of total surplus amount of all active surplus auctions
       **/
      totalSurplusInAuction: AugmentedQuery<ApiType, () => Observable<Balance>> & QueryableStorageEntry<ApiType>;
      /**
       * Record of total target sales of all active collateral auctions
       **/
      totalTargetInAuction: AugmentedQuery<ApiType, () => Observable<Balance>> & QueryableStorageEntry<ApiType>;
    };
    cdpEngine: {
      [key: string]: QueryableStorageEntry<ApiType>;
      /**
       * Mapping from collateral type to its risk management params
       **/
      collateralParams: AugmentedQuery<ApiType, (arg: CurrencyId | { Token: any } | { DEXShare: any } | string | Uint8Array) => Observable<RiskManagementParams>> & QueryableStorageEntry<ApiType>;
      /**
       * Mapping from collateral type to its exchange rate of debit units and debit value
       **/
      debitExchangeRate: AugmentedQuery<ApiType, (arg: CurrencyId | { Token: any } | { DEXShare: any } | string | Uint8Array) => Observable<Option<ExchangeRate>>> & QueryableStorageEntry<ApiType>;
      /**
       * Global stability fee rate for all types of collateral
       **/
      globalStabilityFee: AugmentedQuery<ApiType, () => Observable<Rate>> & QueryableStorageEntry<ApiType>;
    };
    cdpTreasury: {
      [key: string]: QueryableStorageEntry<ApiType>;
      /**
       * The maximum amount of collateral amount for sale per collateral auction
       **/
      collateralAuctionMaximumSize: AugmentedQuery<ApiType, (arg: CurrencyId | { Token: any } | { DEXShare: any } | string | Uint8Array) => Observable<Balance>> & QueryableStorageEntry<ApiType>;
      /**
       * Current total debit value of system. It's not same as debit in CDP engine,
       * it is the bad debt of the system.
       **/
      debitPool: AugmentedQuery<ApiType, () => Observable<Balance>> & QueryableStorageEntry<ApiType>;
    };
    dex: {
      [key: string]: QueryableStorageEntry<ApiType>;
      /**
       * Liquidity pool for specific pair(a tuple consisting of two sorted CurrencyIds).
       * (CurrencyId_0, CurrencyId_1) -> (Amount_0, Amount_1)
       **/
      liquidityPool: AugmentedQuery<ApiType, (arg: TradingPair) => Observable<ITuple<[Balance, Balance]>>> & QueryableStorageEntry<ApiType>;
    };
    emergencyShutdown: {
      [key: string]: QueryableStorageEntry<ApiType>;
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
      [key: string]: QueryableStorageEntry<ApiType>;
      /**
       * The authorization relationship map from
       * Authorizer -> (CollateralType, Authorizee) -> Authorized
       **/
      authorization: AugmentedQueryDoubleMap<ApiType, (key1: AccountId | string | Uint8Array, key2: ITuple<[CurrencyId, AccountId]> | [CurrencyId | { Token: any } | { DEXShare: any } | string | Uint8Array, AccountId | string | Uint8Array]) => Observable<bool>> & QueryableStorageEntry<ApiType>;
    };
    loans: {
      [key: string]: QueryableStorageEntry<ApiType>;
      /**
       * The collateralized debit positions, map from
       * Owner -> CollateralType -> Position
       **/
      positions: AugmentedQueryDoubleMap<ApiType, (key1: CurrencyId | { Token: any } | { DEXShare: any } | string | Uint8Array, key2: AccountId | string | Uint8Array) => Observable<Position>> & QueryableStorageEntry<ApiType>;
      /**
       * The total collateralized debit positions, map from
       * CollateralType -> Position
       **/
      totalPositions: AugmentedQuery<ApiType, (arg: CurrencyId | { Token: any } | { DEXShare: any } | string | Uint8Array) => Observable<Position>> & QueryableStorageEntry<ApiType>;
    };
    nomineesElection: {
      [key: string]: QueryableStorageEntry<ApiType>;
      currentEra: AugmentedQuery<ApiType, () => Observable<EraIndex>> & QueryableStorageEntry<ApiType>;
      ledger: AugmentedQuery<ApiType, (arg: AccountId | string | Uint8Array) => Observable<BondingLedger>> & QueryableStorageEntry<ApiType>;
      nominations: AugmentedQuery<ApiType, (arg: AccountId | string | Uint8Array) => Observable<Vec<PolkadotAccountId>>> & QueryableStorageEntry<ApiType>;
      nominees: AugmentedQuery<ApiType, () => Observable<Vec<PolkadotAccountId>>> & QueryableStorageEntry<ApiType>;
      votes: AugmentedQuery<ApiType, (arg: PolkadotAccountId | string | Uint8Array) => Observable<Balance>> & QueryableStorageEntry<ApiType>;
    };
    polkadotBridge: {
      [key: string]: QueryableStorageEntry<ApiType>;
      currentEra: AugmentedQuery<ApiType, () => Observable<EraIndex>> & QueryableStorageEntry<ApiType>;
      eraStartBlockNumber: AugmentedQuery<ApiType, () => Observable<BlockNumber>> & QueryableStorageEntry<ApiType>;
      forcedEra: AugmentedQuery<ApiType, () => Observable<Option<BlockNumber>>> & QueryableStorageEntry<ApiType>;
      subAccounts: AugmentedQuery<ApiType, (arg: u32 | AnyNumber | Uint8Array) => Observable<SubAccountStatus>> & QueryableStorageEntry<ApiType>;
    };
    prices: {
      [key: string]: QueryableStorageEntry<ApiType>;
      /**
       * Mapping from currency id to it's locked price
       **/
      lockedPrice: AugmentedQuery<ApiType, (arg: CurrencyId | { Token: any } | { DEXShare: any } | string | Uint8Array) => Observable<Option<Price>>> & QueryableStorageEntry<ApiType>;
    };
    stakingPool: {
      [key: string]: QueryableStorageEntry<ApiType>;
      claimedUnbond: AugmentedQueryDoubleMap<ApiType, (key1: AccountId | string | Uint8Array, key2: EraIndex | AnyNumber | Uint8Array) => Observable<Balance>> & QueryableStorageEntry<ApiType>;
      currentEra: AugmentedQuery<ApiType, () => Observable<EraIndex>> & QueryableStorageEntry<ApiType>;
      freeUnbonded: AugmentedQuery<ApiType, () => Observable<Balance>> & QueryableStorageEntry<ApiType>;
      nextEraUnbond: AugmentedQuery<ApiType, () => Observable<ITuple<[Balance, Balance]>>> & QueryableStorageEntry<ApiType>;
      stakingPoolParams: AugmentedQuery<ApiType, () => Observable<Params>> & QueryableStorageEntry<ApiType>;
      totalBonded: AugmentedQuery<ApiType, () => Observable<Balance>> & QueryableStorageEntry<ApiType>;
      totalClaimedUnbonded: AugmentedQuery<ApiType, () => Observable<Balance>> & QueryableStorageEntry<ApiType>;
      unbonding: AugmentedQuery<ApiType, (arg: EraIndex | AnyNumber | Uint8Array) => Observable<ITuple<[Balance, Balance, Balance]>>> & QueryableStorageEntry<ApiType>;
      unbondingToFree: AugmentedQuery<ApiType, () => Observable<Balance>> & QueryableStorageEntry<ApiType>;
    };
    tokens: {
      [key: string]: QueryableStorageEntry<ApiType>;
      /**
       * The balance of a token type under an account.
       * 
       * NOTE: If the total is ever zero, decrease account ref account.
       * 
       * NOTE: This is only used in the case that this module is used to store balances.
       **/
      accounts: AugmentedQueryDoubleMap<ApiType, (key1: AccountId | string | Uint8Array, key2: CurrencyId | { Token: any } | { DEXShare: any } | string | Uint8Array) => Observable<AccountData>> & QueryableStorageEntry<ApiType>;
      /**
       * Any liquidity locks of a token type under an account.
       * NOTE: Should only be accessed when setting, changing and freeing a lock.
       **/
      locks: AugmentedQueryDoubleMap<ApiType, (key1: AccountId | string | Uint8Array, key2: CurrencyId | { Token: any } | { DEXShare: any } | string | Uint8Array) => Observable<Vec<BalanceLock>>> & QueryableStorageEntry<ApiType>;
      /**
       * The total issuance of a token type.
       **/
      totalIssuance: AugmentedQuery<ApiType, (arg: CurrencyId | { Token: any } | { DEXShare: any } | string | Uint8Array) => Observable<Balance>> & QueryableStorageEntry<ApiType>;
    };
  }

  export interface QueryableStorage<ApiType extends ApiTypes> extends AugmentedQueries<ApiType> {
    [key: string]: QueryableModuleStorage<ApiType>;
  }
}
