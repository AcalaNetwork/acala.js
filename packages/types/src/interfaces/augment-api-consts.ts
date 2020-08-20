// Auto-generated via `yarn polkadot-types-from-chain`, do not edit
/* eslint-disable */

import { Codec } from '@polkadot/types/types';
import { Vec } from '@polkadot/types/codec';
import { u32, u8 } from '@polkadot/types/primitive';
import { CurrencyId } from '@acala-network/types/interfaces/primitives';
import { Balance, BlockNumber, CurrencyIdOf, ModuleId } from '@acala-network/types/interfaces/runtime';
import { ExchangeRate, Rate, Ratio } from '@acala-network/types/interfaces/support';
import { Price } from '@open-web3/orml-types/interfaces/traits';
import { EraIndex, MomentOf } from '@polkadot/types/interfaces/staking';

declare module '@polkadot/metadata/Decorated/consts/types' {
  export interface Constants {
    [index: string]: ModuleConstants;
    accounts: {
      [index: string]: AugmentedConst<object & Codec>;
      /**
       * All non-native currency ids in Acala.
       **/
      allNonNativeCurrencyIds: AugmentedConst<Vec<CurrencyId>>;
      /**
       * The number of fee transfer times per period.
       **/
      freeTransferCount: AugmentedConst<u8>;
      /**
       * Deposit for free transfer service.
       **/
      freeTransferDeposit: AugmentedConst<Balance>;
      /**
       * The period to count free transfer.
       **/
      freeTransferPeriod: AugmentedConst<MomentOf>;
      /**
       * The max slippage allowed when swap open account deposit or fee with DEX
       **/
      maxSlippageSwapWithDex: AugmentedConst<Ratio>;
      /**
       * Native currency id, the actual received currency type as fee for treasury
       **/
      nativeCurrencyId: AugmentedConst<CurrencyId>;
      /**
       * Deposit for opening account, would be reserved until account closed.
       **/
      newAccountDeposit: AugmentedConst<Balance>;
      /**
       * The treasury module account id to recycle assets.
       **/
      treasuryModuleId: AugmentedConst<ModuleId>;
    };
    auctionManager: {
      [index: string]: AugmentedConst<object & Codec>;
      /**
       * When the total duration of the auction exceeds this soft cap,
       * double the effect of `MinimumIncrementSize`, halve the effect of `AuctionTimeToClose`
       **/
      auctionDurationSoftCap: AugmentedConst<BlockNumber>;
      /**
       * The extended time for the auction to end after each successful bid
       **/
      auctionTimeToClose: AugmentedConst<BlockNumber>;
      /**
       * The native currency id
       **/
      getNativeCurrencyId: AugmentedConst<CurrencyId>;
      /**
       * The stable currency id
       **/
      getStableCurrencyId: AugmentedConst<CurrencyId>;
      /**
       * The minimum increment size of each bid compared to the previous one
       **/
      minimumIncrementSize: AugmentedConst<Rate>;
    };
    cdpEngine: {
      [index: string]: AugmentedConst<object & Codec>;
      /**
       * The list of valid collateral currency types
       **/
      collateralCurrencyIds: AugmentedConst<Vec<CurrencyId>>;
      /**
       * The default debit exchange rate for all collateral types,
       * if the debit exchange rate for specific collateral is `None`, it works.
       **/
      defaultDebitExchangeRate: AugmentedConst<ExchangeRate>;
      /**
       * The default liquidation penalty rate when liquidate unsafe CDP,
       * if the liquidation penalty rate for specific collateral is `None`, it works.
       **/
      defaultLiquidationPenalty: AugmentedConst<Rate>;
      /**
       * The default liquidation ratio for all collateral types of CDP,
       * if the liquidation ratio for specific collateral is `None`, it works.
       **/
      defaultLiquidationRatio: AugmentedConst<Ratio>;
      /**
       * The stable currency id
       **/
      getStableCurrencyId: AugmentedConst<CurrencyId>;
      /**
       * The max slippage allowed when liquidate an unsafe CDP by swap with DEX
       **/
      maxSlippageSwapWithDex: AugmentedConst<Ratio>;
      /**
       * The minimum debit value allowed exists in CDP which has debit amount to avoid dust
       **/
      minimumDebitValue: AugmentedConst<Balance>;
    };
    cdpTreasury: {
      [index: string]: AugmentedConst<object & Codec>;
      /**
       * Stablecoin currency id
       **/
      getStableCurrencyId: AugmentedConst<CurrencyId>;
      /**
       * Lots cap when create auction
       **/
      maxAuctionsCount: AugmentedConst<u32>;
      /**
       * The CDP treasury's module id, keep surplus and collateral assets from liquidation.
       **/
      moduleId: AugmentedConst<ModuleId>;
    };
    currencies: {
      [index: string]: AugmentedConst<object & Codec>;
      nativeCurrencyId: AugmentedConst<CurrencyIdOf>;
    };
    dex: {
      [index: string]: AugmentedConst<object & Codec>;
      /**
       * Tradable currency type list
       **/
      enabledCurrencyIds: AugmentedConst<Vec<CurrencyId>>;
      /**
       * Base currency type id
       **/
      getBaseCurrencyId: AugmentedConst<CurrencyId>;
      /**
       * Trading fee rate
       **/
      getExchangeFee: AugmentedConst<Rate>;
      /**
       * The DEX's module id, keep all assets in DEX.
       **/
      moduleId: AugmentedConst<ModuleId>;
    };
    emergencyShutdown: {
      [index: string]: AugmentedConst<object & Codec>;
      /**
       * The list of valid collateral currency types
       **/
      collateralCurrencyIds: AugmentedConst<Vec<CurrencyId>>;
    };
    loans: {
      [index: string]: AugmentedConst<object & Codec>;
      /**
       * The loan's module id, keep all collaterals of CDPs.
       **/
      moduleId: AugmentedConst<ModuleId>;
    };
    nomineesElection: {
      [index: string]: AugmentedConst<object & Codec>;
      maxUnlockingChunks: AugmentedConst<u32>;
      minBondThreshold: AugmentedConst<Balance>;
      nominateesCount: AugmentedConst<u32>;
    };
    polkadotBridge: {
      [index: string]: AugmentedConst<object & Codec>;
      bondingDuration: AugmentedConst<EraIndex>;
      eraLength: AugmentedConst<BlockNumber>;
    };
    prices: {
      [index: string]: AugmentedConst<object & Codec>;
      getLiquidCurrencyId: AugmentedConst<CurrencyId>;
      getStableCurrencyId: AugmentedConst<CurrencyId>;
      getStakingCurrencyId: AugmentedConst<CurrencyId>;
      stableCurrencyFixedPrice: AugmentedConst<Price>;
    };
    stakingPool: {
      [index: string]: AugmentedConst<object & Codec>;
      claimFeeReturnRatio: AugmentedConst<Ratio>;
      defaultExchangeRate: AugmentedConst<ExchangeRate>;
      liquidCurrencyId: AugmentedConst<CurrencyId>;
      maxBondRatio: AugmentedConst<Ratio>;
      maxClaimFee: AugmentedConst<Rate>;
      minBondRatio: AugmentedConst<Ratio>;
      moduleId: AugmentedConst<ModuleId>;
      stakingCurrencyId: AugmentedConst<CurrencyId>;
    };
  }
}
