// Auto-generated via `yarn polkadot-types-from-chain`, do not edit
/* eslint-disable */

import type { Vec, u32 } from '@polkadot/types';
import type { Codec, ITuple } from '@polkadot/types/types';
import type { CurrencyId } from '@acala-network/types/interfaces/primitives';
import type { Balance, BlockNumber, ModuleId } from '@acala-network/types/interfaces/runtime';
import type { ExchangeRate, Rate, Ratio } from '@acala-network/types/interfaces/support';
import type { Price } from '@open-web3/orml-types/interfaces/traits';
import type { EraIndex } from '@polkadot/types/interfaces/staking';
import type { ApiTypes } from '@polkadot/api/types';

declare module '@polkadot/api/types/consts' {
  export interface AugmentedConsts<ApiType> {
    auctionManager: {
      [key: string]: Codec;
      /**
       * When the total duration of the auction exceeds this soft cap,
       * double the effect of `MinimumIncrementSize`, halve the effect of `AuctionTimeToClose`
       **/
      auctionDurationSoftCap: BlockNumber & AugmentedConst<ApiType>;
      /**
       * The extended time for the auction to end after each successful bid
       **/
      auctionTimeToClose: BlockNumber & AugmentedConst<ApiType>;
      /**
       * The native currency id
       **/
      getNativeCurrencyId: CurrencyId & AugmentedConst<ApiType>;
      /**
       * The stable currency id
       **/
      getStableCurrencyId: CurrencyId & AugmentedConst<ApiType>;
      /**
       * The minimum increment size of each bid compared to the previous one
       **/
      minimumIncrementSize: Rate & AugmentedConst<ApiType>;
    };
    cdpEngine: {
      [key: string]: Codec;
      /**
       * The list of valid collateral currency types
       **/
      collateralCurrencyIds: Vec<CurrencyId> & AugmentedConst<ApiType>;
      /**
       * The default debit exchange rate for all collateral types,
       * if the debit exchange rate for specific collateral is `None`, it works.
       **/
      defaultDebitExchangeRate: ExchangeRate & AugmentedConst<ApiType>;
      /**
       * The default liquidation penalty rate when liquidate unsafe CDP,
       * if the liquidation penalty rate for specific collateral is `None`, it works.
       **/
      defaultLiquidationPenalty: Rate & AugmentedConst<ApiType>;
      /**
       * The default liquidation ratio for all collateral types of CDP,
       * if the liquidation ratio for specific collateral is `None`, it works.
       **/
      defaultLiquidationRatio: Ratio & AugmentedConst<ApiType>;
      /**
       * The stable currency id
       **/
      getStableCurrencyId: CurrencyId & AugmentedConst<ApiType>;
      /**
       * The max slippage allowed when liquidate an unsafe CDP by swap with DEX
       **/
      maxSlippageSwapWithDex: Ratio & AugmentedConst<ApiType>;
      /**
       * The minimum debit value allowed exists in CDP which has debit amount to avoid dust
       **/
      minimumDebitValue: Balance & AugmentedConst<ApiType>;
    };
    cdpTreasury: {
      [key: string]: Codec;
      /**
       * Stablecoin currency id
       **/
      getStableCurrencyId: CurrencyId & AugmentedConst<ApiType>;
      /**
       * Lots cap when create auction
       **/
      maxAuctionsCount: u32 & AugmentedConst<ApiType>;
      /**
       * The CDP treasury's module id, keep surplus and collateral assets from liquidation.
       **/
      moduleId: ModuleId & AugmentedConst<ApiType>;
    };
    dex: {
      [key: string]: Codec;
      /**
       * Trading fee rate
       **/
      getExchangeFee: ITuple<[u32, u32]> & AugmentedConst<ApiType>;
      /**
       * The DEX's module id, keep all assets in DEX.
       **/
      moduleId: ModuleId & AugmentedConst<ApiType>;
      /**
       * The limit for length of trading path
       **/
      tradingPathLimit: u32 & AugmentedConst<ApiType>;
    };
    emergencyShutdown: {
      [key: string]: Codec;
      /**
       * The list of valid collateral currency types
       **/
      collateralCurrencyIds: Vec<CurrencyId> & AugmentedConst<ApiType>;
    };
    loans: {
      [key: string]: Codec;
      /**
       * The loan's module id, keep all collaterals of CDPs.
       **/
      moduleId: ModuleId & AugmentedConst<ApiType>;
    };
    nomineesElection: {
      [key: string]: Codec;
      maxUnlockingChunks: u32 & AugmentedConst<ApiType>;
      minBondThreshold: Balance & AugmentedConst<ApiType>;
      nominateesCount: u32 & AugmentedConst<ApiType>;
    };
    polkadotBridge: {
      [key: string]: Codec;
      bondingDuration: EraIndex & AugmentedConst<ApiType>;
      eraLength: BlockNumber & AugmentedConst<ApiType>;
    };
    prices: {
      [key: string]: Codec;
      getLiquidCurrencyId: CurrencyId & AugmentedConst<ApiType>;
      getStableCurrencyId: CurrencyId & AugmentedConst<ApiType>;
      getStakingCurrencyId: CurrencyId & AugmentedConst<ApiType>;
      stableCurrencyFixedPrice: Price & AugmentedConst<ApiType>;
    };
    stakingPool: {
      [key: string]: Codec;
      /**
       * The default exchange rate for liquid currency to staking currency.
       **/
      defaultExchangeRate: ExchangeRate & AugmentedConst<ApiType>;
      /**
       * The liquid currency id(should be LDOT in acala)
       **/
      liquidCurrencyId: CurrencyId & AugmentedConst<ApiType>;
      /**
       * The staking pool's module id, keep all staking currency belong to Homa protocol.
       **/
      moduleId: ModuleId & AugmentedConst<ApiType>;
      /**
       * The sub account indexs of parachain to vault assets of Homa protocol in Polkadot.
       **/
      poolAccountIndexes: Vec<u32> & AugmentedConst<ApiType>;
      /**
       * The staking currency id(should be DOT in acala)
       **/
      stakingCurrencyId: CurrencyId & AugmentedConst<ApiType>;
    };
  }

  export interface QueryableConsts<ApiType extends ApiTypes> extends AugmentedConsts<ApiType> {
    [key: string]: QueryableModuleConsts;
  }
}
