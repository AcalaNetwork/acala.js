// Auto-generated via `yarn polkadot-types-from-chain`, do not edit
/* eslint-disable */

import { AnyNumber, ITuple } from '@polkadot/types/types';
import { Compact, Option, Vec } from '@polkadot/types/codec';
import { u32 } from '@polkadot/types/primitive';
import { ChangeBalance, ChangeOptionRate, ChangeOptionRatio } from '@acala-network/types/interfaces/cdpEngine';
import { RedeemStrategy } from '@acala-network/types/interfaces/homa';
import { AirDropCurrencyId, CurrencyId } from '@acala-network/types/interfaces/primitives';
import { AccountId, AccountIndex, Address, Amount, AmountOf, AuctionId, AuctionIdOf, Balance, BalanceOf, BlockNumber, Call, CurrencyIdOf, DebitAmount, LookupSource, OracleKey, OracleValue, Share } from '@acala-network/types/interfaces/runtime';
import { PolkadotAccountId } from '@acala-network/types/interfaces/stakingPool';
import { Rate } from '@acala-network/types/interfaces/support';
import { CallOf } from '@open-web3/orml-types/interfaces/authority';
import { DelayedDispatchTime, DispatchId } from '@open-web3/orml-types/interfaces/traits';
import { VestingScheduleOf } from '@open-web3/orml-types/interfaces/vesting';
import { AuthorityId } from '@polkadot/types/interfaces/consensus';
import { Extrinsic, Signature } from '@polkadot/types/interfaces/extrinsics';
import { ApiTypes, SubmittableExtrinsic } from '@polkadot/api/types';

declare module '@polkadot/api/types/submittable' {
  export interface AugmentedSubmittables<ApiType> {
    accounts: {
      [index: string]: SubmittableExtrinsicFunction<ApiType>;
      disableFreeTransfers: AugmentedSubmittable<() => SubmittableExtrinsic<ApiType>>;
      enableFreeTransfer: AugmentedSubmittable<() => SubmittableExtrinsic<ApiType>>;
    };
    airDrop: {
      [index: string]: SubmittableExtrinsicFunction<ApiType>;
      airdrop: AugmentedSubmittable<(to: AccountId | string | Uint8Array, currencyId: AirDropCurrencyId | 'KAR'|'ACA' | number | Uint8Array, amount: Balance | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      updateAirdrop: AugmentedSubmittable<(to: AccountId | string | Uint8Array, currencyId: AirDropCurrencyId | 'KAR'|'ACA' | number | Uint8Array, amount: Balance | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
    };
    auction: {
      [index: string]: SubmittableExtrinsicFunction<ApiType>;
      /**
       * # <weight>
       * - Preconditions:
       * - T::Handler is module_auction_manager of Acala
       * - Indirectly needs orml_currencies and module_cdp_treasury of Acala
       * - Complexity: `O(1)`
       * - Db reads: `Auctions`, 2 items of module_auction_manager, 4 items of orml_currencies, 2 items of module_cdp_treasury
       * - Db writes: `Auctions`, 2 items of module_auction_manager, 4 items of orml_currencies, 2 items of module_cdp_treasury
       * -------------------
       * Base Weight:
       * - collateral auction:
       * - best cases: 49.61 µs
       * - worst cases: 83.65 µs
       * - surplus auction:
       * - best cases: 42.67 µs
       * - worst cases: 49.76 µs
       * - debit auction:
       * - best cases: 45.96 µs
       * - worst cases: 48.55 µs
       * # </weight>
       **/
      bid: AugmentedSubmittable<(id: AuctionId | AnyNumber | Uint8Array, value: Compact<Balance> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
    };
    auctionManager: {
      [index: string]: SubmittableExtrinsicFunction<ApiType>;
      /**
       * Cancel active auction after system shutdown
       * 
       * The dispatch origin of this call must be _None_.
       * 
       * - `auction_id`: auction id
       * 
       * # <weight>
       * - Preconditions:
       * - T::Currency is orml_currencies
       * - T::CDPTreasury is module_cdp_treasury
       * - T::Auction is orml_auction
       * - Complexity: `O(1)`
       * - Db reads:
       * - surplus auction worst case: `SurplusAuctions`, `TotalSurplusInAuction`, 1 item in orml_auction, 1 item in orml_currencies
       * - debit auction worst case: `DebitAuctions`, `TotalDebitInAuction`, 1 item in orml_auction, 1 item in orml_currencies, 1 item in cdp_treasury
       * - collateral auction worst case: `CollateralAuctions`, `TotalCollateralInAuction`, `TotalTargetInAuction`, 1 item in orml_auction, 3 item in orml_currencies, 2 item in cdp_treasury
       * - Db writes:
       * - surplus auction worst case: `SurplusAuctions`, `TotalSurplusInAuction`, 1 item in orml_auction, 1 item in orml_currencies
       * - debit auction worst case: `DebitAuctions`, `TotalDebitInAuction`, 1 item in orml_auction, 1 item in orml_currencies, 1 item in cdp_treasury
       * - collateral auction worst case: `CollateralAuctions`, `TotalCollateralInAuction`, `TotalTargetInAuction`, 1 item in orml_auction, 3 item in orml_currencies, 2 item in cdp_treasury
       * -------------------
       * Base Weight:
       * - surplus auction worst case: 33.72 µs
       * - debit auction worst case: 27.63 µs
       * - collateral auction worst case: 80.13 µs
       * # </weight>
       **/
      cancel: AugmentedSubmittable<(id: AuctionIdOf | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
    };
    cdpEngine: {
      [index: string]: SubmittableExtrinsicFunction<ApiType>;
      /**
       * Liquidate unsafe CDP
       * 
       * The dispatch origin of this call must be _None_.
       * 
       * - `currency_id`: CDP's collateral type.
       * - `who`: CDP's owner.
       * 
       * # <weight>
       * - Preconditions:
       * - T::CDPTreasury is module_cdp_treasury
       * - T::DEX is module_dex
       * - Complexity: `O(1)`
       * - Db reads:
       * - liquidate by auction: `IsShutdown`, (4 + 2 + 3 + 2 + 1 + 3 + 2) items of modules related to module_cdp_engine
       * - liquidate by dex: `IsShutdown`, (4 + 5 + 3 + 2 + 2 + 0 + 2) items of modules related to module_cdp_engine
       * - Db writes:
       * - liquidate by auction: (4 + 2 + 0 + 2 + 0 + 5) items of modules related to module_cdp_engine
       * - liquidate by dex: (4 + 5 + 0 + 2 + 1 + 0) items of modules related to module_cdp_engine
       * -------------------
       * Base Weight:
       * - liquidate by auction: 119.4 µs
       * - liquidate by dex: 125.1 µs
       * # </weight>
       **/
      liquidate: AugmentedSubmittable<(currencyId: CurrencyId | 'ACA'|'AUSD'|'DOT'|'XBTC'|'LDOT' | number | Uint8Array, who: AccountId | string | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      /**
       * Update parameters related to risk management of CDP under specific collateral type
       * 
       * The dispatch origin of this call must be `UpdateOrigin` or _Root_.
       * 
       * - `currency_id`: collateral type.
       * - `stability_fee`: extra stability fee rate, `None` means do not update, `Some(None)` means update it to `None`.
       * - `liquidation_ratio`: liquidation ratio, `None` means do not update, `Some(None)` means update it to `None`.
       * - `liquidation_penalty`: liquidation penalty, `None` means do not update, `Some(None)` means update it to `None`.
       * - `required_collateral_ratio`: required collateral ratio, `None` means do not update, `Some(None)` means update it to `None`.
       * - `maximum_total_debit_value`: maximum total debit value.
       * 
       * # <weight>
       * - Complexity: `O(1)`
       * - Db reads:	`CollateralParams`
       * - Db writes: `CollateralParams`
       * -------------------
       * Base Weight: 32.81 µs
       * # </weight>
       **/
      setCollateralParams: AugmentedSubmittable<(currencyId: CurrencyId | 'ACA'|'AUSD'|'DOT'|'XBTC'|'LDOT' | number | Uint8Array, stabilityFee: ChangeOptionRate | { NoChange: any } | { NewValue: any } | string | Uint8Array, liquidationRatio: ChangeOptionRatio | { NoChange: any } | { NewValue: any } | string | Uint8Array, liquidationPenalty: ChangeOptionRate | { NoChange: any } | { NewValue: any } | string | Uint8Array, requiredCollateralRatio: ChangeOptionRatio | { NoChange: any } | { NewValue: any } | string | Uint8Array, maximumTotalDebitValue: ChangeBalance | { NoChange: any } | { NewValue: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      /**
       * Update global parameters related to risk management of CDP
       * 
       * The dispatch origin of this call must be `UpdateOrigin` or _Root_.
       * 
       * - `global_stability_fee`: global stability fee rate.
       * 
       * # <weight>
       * - Complexity: `O(1)`
       * - Db reads:
       * - Db writes: `GlobalStabilityFee`
       * -------------------
       * Base Weight: 21.04 µs
       * # </weight>
       **/
      setGlobalParams: AugmentedSubmittable<(globalStabilityFee: Rate | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      /**
       * Settle CDP has debit after system shutdown
       * 
       * The dispatch origin of this call must be _None_.
       * 
       * - `currency_id`: CDP's collateral type.
       * - `who`: CDP's owner.
       * 
       * # <weight>
       * - Preconditions:
       * - T::CDPTreasury is module_cdp_treasury
       * - T::DEX is module_dex
       * - Complexity: `O(1)`
       * - Db reads: `IsShutdown`, 9 items of modules related to module_cdp_engine
       * - Db writes: 8 items of modules related to module_cdp_engine
       * -------------------
       * Base Weight: 76.54 µs
       * # </weight>
       **/
      settle: AugmentedSubmittable<(currencyId: CurrencyId | 'ACA'|'AUSD'|'DOT'|'XBTC'|'LDOT' | number | Uint8Array, who: AccountId | string | Uint8Array) => SubmittableExtrinsic<ApiType>>;
    };
    cdpTreasury: {
      [index: string]: SubmittableExtrinsicFunction<ApiType>;
      /**
       * Update parameters related to collateral auction under specific collateral type
       * 
       * The dispatch origin of this call must be `UpdateOrigin` or _Root_.
       * 
       * - `currency_id`: collateral type
       * - `surplus_buffer_size`: collateral auction maximum size
       * 
       * # <weight>
       * - Complexity: `O(1)`
       * - Db reads:
       * - Db writes: `CollateralAuctionMaximumSize`
       * -------------------
       * Base Weight: 15.59 µs
       * # </weight>
       **/
      setCollateralAuctionMaximumSize: AugmentedSubmittable<(currencyId: CurrencyId | 'ACA'|'AUSD'|'DOT'|'XBTC'|'LDOT' | number | Uint8Array, size: Balance | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      /**
       * Update parameters related to surplus and debit auction
       * 
       * The dispatch origin of this call must be `UpdateOrigin` or _Root_.
       * 
       * - `surplus_auction_fixed_size`: new fixed amount of stable coin for sale per surplus auction, `None` means do not update
       * - `surplus_buffer_size`: new buffer size of surplus pool, `None` means do not update
       * - `initial_amount_per_debit_auction`: initial amount of native token for sale per debit auction, `None` means do not update
       * - `debit_auction_fixed_size`: the fixed amount of stable coin per collateral auction wants to get, `None` means do not update
       * 
       * # <weight>
       * - Complexity: `O(1)`
       * - Db reads:
       * - Db writes: `SurplusAuctionFixedSize`, `SurplusBufferSize`, `InitialAmountPerDebitAuction`, `DebitAuctionFixedSize`
       * -------------------
       * Base Weight: 20.18 µs
       * # </weight>
       **/
      setDebitAndSurplusHandleParams: AugmentedSubmittable<(surplusAuctionFixedSize: Option<Balance> | null | object | string | Uint8Array, surplusBufferSize: Option<Balance> | null | object | string | Uint8Array, initialAmountPerDebitAuction: Option<Balance> | null | object | string | Uint8Array, debitAuctionFixedSize: Option<Balance> | null | object | string | Uint8Array) => SubmittableExtrinsic<ApiType>>;
    };
    currencies: {
      [index: string]: SubmittableExtrinsicFunction<ApiType>;
      /**
       * Transfer some balance to another account under `currency_id`.
       * 
       * The dispatch origin for this call must be `Signed` by the transactor.
       * 
       * # <weight>
       * - Preconditions:
       * - T::MultiCurrency is orml_tokens
       * - T::NativeCurrency is pallet_balances
       * - Complexity: `O(1)`
       * - Db reads: 2 * `Accounts`
       * - Db writes: 2 * `Accounts`
       * -------------------
       * Base Weight:
       * - non-native currency: 26.72 µs
       * - native currency in worst case: 29.9 µs
       * # </weight>
       **/
      transfer: AugmentedSubmittable<(dest: LookupSource | Address | AccountId | AccountIndex | string | Uint8Array, currencyId: CurrencyIdOf | 'ACA'|'AUSD'|'DOT'|'XBTC'|'LDOT' | number | Uint8Array, amount: Compact<BalanceOf> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      /**
       * Transfer some native currency to another account.
       * 
       * The dispatch origin for this call must be `Signed` by the transactor.
       * 
       * # <weight>
       * - Preconditions:
       * - T::MultiCurrency is orml_tokens
       * - T::NativeCurrency is pallet_balances
       * - Complexity: `O(1)`
       * - Db reads: 2 * `Accounts`
       * - Db writes: 2 * `Accounts`
       * -------------------
       * Base Weight: 29.53 µs
       * # </weight>
       **/
      transferNativeCurrency: AugmentedSubmittable<(dest: LookupSource | Address | AccountId | AccountIndex | string | Uint8Array, amount: Compact<BalanceOf> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      /**
       * update amount of account `who` under `currency_id`.
       * 
       * The dispatch origin of this call must be _Root_.
       * 
       * # <weight>
       * - Preconditions:
       * - T::MultiCurrency is orml_tokens
       * - T::NativeCurrency is pallet_balances
       * - Complexity: `O(1)`
       * - Db reads: `Accounts`
       * - Db writes: `Accounts`
       * -------------------
       * Base Weight:
       * - non-native currency: 25.36 µs
       * - native currency and killing account: 26.33 µs
       * - native currency and create account: 27.39 µs
       * # </weight>
       **/
      updateBalance: AugmentedSubmittable<(who: LookupSource | Address | AccountId | AccountIndex | string | Uint8Array, currencyId: CurrencyIdOf | 'ACA'|'AUSD'|'DOT'|'XBTC'|'LDOT' | number | Uint8Array, amount: AmountOf | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
    };
    dex: {
      [index: string]: SubmittableExtrinsicFunction<ApiType>;
      /**
       * Injecting liquidity to specific liquidity pool in the form of depositing currencies in trading pairs
       * into liquidity pool, and issue shares in proportion to the caller. Shares are temporarily not
       * allowed to transfer and trade, it represents the proportion of assets in liquidity pool.
       * 
       * - `other_currency_id`: currency type to determine the type of liquidity pool.
       * - `max_other_currency_amount`: maximum currency amount allowed to inject to liquidity pool.
       * - `max_base_currency_amount`: maximum base currency(stable coin) amount allowed to inject to liquidity pool.
       * 
       * # <weight>
       * - Preconditions:
       * - T::Currency is orml_currencies
       * - Complexity: `O(1)`
       * - Db reads:
       * - best case: `TotalShares`, `LiquidityPool`, `Shares`, 4 items of orml_currencies
       * - worst case: `TotalShares`, `LiquidityPool`, `Shares`, `WithdrawnInterest`, `TotalInterest`, 4 items of orml_currencies
       * - Db writes:
       * - best case: `TotalShares`, `LiquidityPool`, `Shares`, 4 items of orml_currencies
       * - worst case: `TotalShares`, `LiquidityPool`, `Shares`, `WithdrawnInterest`, `TotalInterest`, 4 items of orml_currencies
       * -------------------
       * Base Weight:
       * - best case: 49.04 µs
       * - worst case: 57.72 µs
       * # </weight>
       **/
      addLiquidity: AugmentedSubmittable<(otherCurrencyId: CurrencyId | 'ACA'|'AUSD'|'DOT'|'XBTC'|'LDOT' | number | Uint8Array, maxOtherCurrencyAmount: Compact<Balance> | AnyNumber | Uint8Array, maxBaseCurrencyAmount: Compact<Balance> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      /**
       * Update liquidity incentive rate of specific liquidity pool
       * 
       * The dispatch origin of this call must be `UpdateOrigin` or _Root_.
       * 
       * - `currency_id`: currency type to determine the type of liquidity pool.
       * - `liquidity_incentive_rate`: liquidity incentive rate.
       * 
       * # <weight>
       * - Complexity: `O(1)`
       * - Db reads:
       * - Db writes: LiquidityIncentiveRate
       * -------------------
       * Base Weight: 3.591 µs
       * # </weight>
       **/
      setLiquidityIncentiveRate: AugmentedSubmittable<(currencyId: CurrencyId | 'ACA'|'AUSD'|'DOT'|'XBTC'|'LDOT' | number | Uint8Array, liquidityIncentiveRate: Rate | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      /**
       * Trading with DEX, swap supply currency to target currency
       * 
       * - `supply_currency_id`: supply currency type.
       * - `supply_amount`: supply currency amount.
       * - `target_currency_id`: target currency type.
       * - `acceptable_target_amount`: acceptable target amount, if actual amount is under it, swap will not happen
       * 
       * # <weight>
       * - Preconditions:
       * - T::Currency is orml_currencies
       * - Complexity: `O(1)`
       * - Db reads:
       * - swap other to base: 1 * `LiquidityPool`, 4 items of orml_currencies
       * - swap base to other: 1 * `LiquidityPool`, 4 items of orml_currencies
       * - swap other to other: 2 * `LiquidityPool`, 4 items of orml_currencies
       * - Db writes:
       * - swap other to base: 1 * `LiquidityPool`, 4 items of orml_currencies
       * - swap base to other: 1 * `LiquidityPool`, 4 items of orml_currencies
       * - swap other to other: 2 * `LiquidityPool`, 4 items of orml_currencies
       * -------------------
       * Base Weight:
       * - swap base to other: 47.81 µs
       * - swap other to base: 42.57 µs
       * - swap other to other: 54.77 µs
       * # </weight>
       **/
      swapCurrency: AugmentedSubmittable<(supplyCurrencyId: CurrencyId | 'ACA'|'AUSD'|'DOT'|'XBTC'|'LDOT' | number | Uint8Array, supplyAmount: Compact<Balance> | AnyNumber | Uint8Array, targetCurrencyId: CurrencyId | 'ACA'|'AUSD'|'DOT'|'XBTC'|'LDOT' | number | Uint8Array, acceptableTargetAmount: Compact<Balance> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      /**
       * Just withdraw liquidity incentive interest as the additional reward for liquidity contribution
       * 
       * - `currency_id`: currency type to determine the type of liquidity pool.
       * 
       * # <weight>
       * - Preconditions:
       * - T::Currency is orml_currencies
       * - T::CDPTreasury is module_cdp_treasury
       * - Complexity: `O(1)`
       * - Db reads: `WithdrawnInterest`, `TotalWithdrawnInterest`, 2 items of orml_currencies
       * - Db writes: `WithdrawnInterest`, `TotalWithdrawnInterest`, 2 items of orml_currencies
       * -------------------
       * Base Weight: 38.4 µs
       * # </weight>
       **/
      withdrawIncentiveInterest: AugmentedSubmittable<(currencyId: CurrencyId | 'ACA'|'AUSD'|'DOT'|'XBTC'|'LDOT' | number | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      /**
       * Withdraw liquidity from specific liquidity pool in the form of burning shares, and withdrawing currencies in trading pairs
       * from liquidity pool in proportion, and withdraw liquidity incentive interest.
       * 
       * - `currency_id`: currency type to determine the type of liquidity pool.
       * - `share_amount`: share amount to burn.
       * 
       * # <weight>
       * - Preconditions:
       * - T::Currency is orml_currencies
       * - Complexity: `O(1)`
       * - Db reads: `Shares`, `LiquidityPool`, `TotalShares`, `WithdrawnInterest`, `TotalInterest`, 4 items of orml_currencies
       * - Db writes: `Shares`, `LiquidityPool`, `TotalShares`, `WithdrawnInterest`, `TotalInterest`, 4 items of orml_currencies
       * -------------------
       * Base Weight:
       * - best case: 66.59 µs
       * - worst case: 71.18 µs
       * # </weight>
       **/
      withdrawLiquidity: AugmentedSubmittable<(currencyId: CurrencyId | 'ACA'|'AUSD'|'DOT'|'XBTC'|'LDOT' | number | Uint8Array, shareAmount: Compact<Share> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
    };
    emergencyShutdown: {
      [index: string]: SubmittableExtrinsicFunction<ApiType>;
      /**
       * Start emergency shutdown
       * 
       * The dispatch origin of this call must be `ShutdownOrigin` or _Root_.
       * 
       * # <weight>
       * - Preconditions:
       * - T::CDPTreasury is module_cdp_treasury
       * - T::AuctionManagerHandler is module_auction_manager
       * - T::OnShutdown is (module_cdp_treasury, module_cdp_engine, module_honzon, module_dex)
       * - Complexity: `O(1)`
       * - Db reads: `IsShutdown`, (length of collateral_ids) items in modules related to module_emergency_shutdown
       * - Db writes: `IsShutdown`, (4 + length of collateral_ids) items in modules related to module_emergency_shutdown
       * -------------------
       * Base Weight: 47.4 µs
       * # </weight>
       **/
      emergencyShutdown: AugmentedSubmittable<() => SubmittableExtrinsic<ApiType>>;
      /**
       * Open final redemption if settlement is completed.
       * 
       * The dispatch origin of this call must be `ShutdownOrigin` or _Root_.
       * 
       * # <weight>
       * - Preconditions:
       * - T::CDPTreasury is module_cdp_treasury
       * - T::AuctionManagerHandler is module_auction_manager
       * - T::OnShutdown is (module_cdp_treasury, module_cdp_engine, module_honzon, module_dex)
       * - Complexity: `O(1)`
       * - Db reads: `IsShutdown`, (2 + 2 * length of collateral_ids) items in modules related to module_emergency_shutdown
       * - Db writes: `CanRefund`
       * -------------------
       * Base Weight: 47.4 µs
       * # </weight>
       **/
      openCollateralRefund: AugmentedSubmittable<() => SubmittableExtrinsic<ApiType>>;
      /**
       * Refund a basket of remaining collateral assets to caller
       * 
       * - `amount`: stable coin amount used to refund.
       * 
       * # <weight>
       * - Preconditions:
       * - T::CDPTreasury is module_cdp_treasury
       * - T::AuctionManagerHandler is module_auction_manager
       * - T::OnShutdown is (module_cdp_treasury, module_cdp_engine, module_honzon, module_dex)
       * - Complexity: `O(1)`
       * - Db reads: `CanRefund`, (2 + 3 * length of collateral_ids) items in modules related to module_emergency_shutdown
       * - Db writes: (3 * length of collateral_ids) items in modules related to module_emergency_shutdown
       * -------------------
       * Base Weight: 95.86 µs
       * # </weight>
       **/
      refundCollaterals: AugmentedSubmittable<(amount: Compact<Balance> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
    };
    homa: {
      [index: string]: SubmittableExtrinsicFunction<ApiType>;
      mint: AugmentedSubmittable<(amount: Compact<Balance> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      redeem: AugmentedSubmittable<(amount: Compact<Balance> | AnyNumber | Uint8Array, strategy: RedeemStrategy | { Immediately: any } | { Target: any } | { WaitForUnbonding: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      withdrawRedemption: AugmentedSubmittable<() => SubmittableExtrinsic<ApiType>>;
    };
    honzon: {
      [index: string]: SubmittableExtrinsicFunction<ApiType>;
      /**
       * Adjust the loans of `currency_id` by specific `collateral_adjustment` and `debit_adjustment`
       * 
       * - `currency_id`: collateral currency id.
       * - `collateral_adjustment`: signed amount, positive means to deposit collateral currency into CDP,
       * negative means withdraw collateral currency from CDP.
       * - `debit_adjustment`: signed amount, positive means to issue some amount of stablecoin to caller according to the debit adjustment,
       * negative means caller will payback some amount of stablecoin to CDP according to to the debit adjustment.
       * 
       * # <weight>
       * - Complexity: `O(1)`
       * - Db reads: `IsShutdown`, (4 + 4 + 4 + 1 + 2) items in modules related to module_loans and module_cdp_engine
       * - Db writes: (4 + 4 + 1) items in modules related to module_loans and module_cdp_engine
       * -------------------
       * Base Weight: 99.77 µs
       * # </weight>
       **/
      adjustLoan: AugmentedSubmittable<(currencyId: CurrencyId | 'ACA'|'AUSD'|'DOT'|'XBTC'|'LDOT' | number | Uint8Array, collateralAdjustment: Amount | AnyNumber | Uint8Array, debitAdjustment: DebitAmount | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      /**
       * Authorize `to` to manipulate the loan under `currency_id`
       * 
       * - `currency_id`: collateral currency id.
       * - `to`: authorizee account
       * 
       * # <weight>
       * - Complexity: `O(1)`
       * - Db reads:
       * - Db writes: `Authorization`
       * -------------------
       * Base Weight: 20.04 µs
       * # </weight>
       **/
      authorize: AugmentedSubmittable<(currencyId: CurrencyId | 'ACA'|'AUSD'|'DOT'|'XBTC'|'LDOT' | number | Uint8Array, to: AccountId | string | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      /**
       * Transfer the whole CDP of `from` under `currency_id` to caller's CDP under the same `currency_id`,
       * caller must have the authrization of `from` for the specific collateral type
       * 
       * - `currency_id`: collateral currency id.
       * - `from`: authorizer account
       * 
       * # <weight>
       * - Complexity: `O(1)`
       * - Db reads: `IsShutdown`, `Authorization`, (4 + 3 + 2) items in modules related to module_loans and module_cdp_engine
       * - Db writes: 4 items in module_loans
       * -------------------
       * Base Weight: 74.81 µs
       * # </weight>
       **/
      transferLoanFrom: AugmentedSubmittable<(currencyId: CurrencyId | 'ACA'|'AUSD'|'DOT'|'XBTC'|'LDOT' | number | Uint8Array, from: AccountId | string | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      /**
       * Cancel the authorization for `to` under `currency_id`
       * 
       * - `currency_id`: collateral currency id.
       * - `to`: authorizee account
       * 
       * # <weight>
       * - Complexity: `O(1)`
       * - Db reads:
       * - Db writes: `Authorization`
       * -------------------
       * Base Weight: 19.77 µs
       * # </weight>
       **/
      unauthorize: AugmentedSubmittable<(currencyId: CurrencyId | 'ACA'|'AUSD'|'DOT'|'XBTC'|'LDOT' | number | Uint8Array, to: AccountId | string | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      /**
       * Cancel all authorization of caller
       * 
       * # <weight>
       * - Complexity: `O(C + M)` where C is the length of collateral_ids and M is the number of authorizees
       * - Db reads:
       * - Db writes: `Authorization`
       * -------------------
       * Base Weight: 0 + 2.5 * M + 115 * C µs
       * # </weight>
       **/
      unauthorizeAll: AugmentedSubmittable<() => SubmittableExtrinsic<ApiType>>;
    };
    nomineesElection: {
      [index: string]: SubmittableExtrinsicFunction<ApiType>;
      bond: AugmentedSubmittable<(amount: Compact<Balance> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      chill: AugmentedSubmittable<() => SubmittableExtrinsic<ApiType>>;
      nominate: AugmentedSubmittable<(targets: Vec<PolkadotAccountId> | (PolkadotAccountId | string | Uint8Array)[]) => SubmittableExtrinsic<ApiType>>;
      rebond: AugmentedSubmittable<(amount: Balance | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      unbond: AugmentedSubmittable<(amount: Balance | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      withdrawUnbonded: AugmentedSubmittable<() => SubmittableExtrinsic<ApiType>>;
    };
    oracle: {
      [index: string]: SubmittableExtrinsicFunction<ApiType>;
      feedValues: AugmentedSubmittable<(values: Vec<ITuple<[OracleKey, OracleValue]>> | ([OracleKey | 'ACA' | 'AUSD' | 'DOT' | 'XBTC' | 'LDOT' | number | Uint8Array, OracleValue | AnyNumber | Uint8Array])[], index: Compact<u32> | AnyNumber | Uint8Array, signature: Signature | string | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      setSessionKey: AugmentedSubmittable<(key: AuthorityId | string | Uint8Array) => SubmittableExtrinsic<ApiType>>;
    };
    polkadotBridge: {
      [index: string]: SubmittableExtrinsicFunction<ApiType>;
      forceEra: AugmentedSubmittable<(at: BlockNumber | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      setMockRewardRate: AugmentedSubmittable<(mockRewardRate: Option<Rate> | null | object | string | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      simualteReceive: AugmentedSubmittable<(to: AccountId | string | Uint8Array, amount: Balance | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      simulateBond: AugmentedSubmittable<(amount: Balance | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      simulateRedeem: AugmentedSubmittable<(to: PolkadotAccountId | string | Uint8Array, amount: Balance | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      simulateSlash: AugmentedSubmittable<(amount: Balance | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      simulateUnbond: AugmentedSubmittable<(amount: Balance | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      simulateWithdrawUnbonded: AugmentedSubmittable<() => SubmittableExtrinsic<ApiType>>;
    };
    prices: {
      [index: string]: SubmittableExtrinsicFunction<ApiType>;
      lockPrice: AugmentedSubmittable<(currencyId: CurrencyId | 'ACA'|'AUSD'|'DOT'|'XBTC'|'LDOT' | number | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      unlockPrice: AugmentedSubmittable<(currencyId: CurrencyId | 'ACA'|'AUSD'|'DOT'|'XBTC'|'LDOT' | number | Uint8Array) => SubmittableExtrinsic<ApiType>>;
    };
    scheduleUpdate: {
      [index: string]: SubmittableExtrinsicFunction<ApiType>;
      /**
       * Cancel schedule_update
       **/
      cancelDelayedDispatch: AugmentedSubmittable<(at: BlockNumber | AnyNumber | Uint8Array, id: DispatchId | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      /**
       * Add schedule_update at block_number
       **/
      scheduleDispatch: AugmentedSubmittable<(call: CallOf | { callIndex?: any; args?: any } | string | Uint8Array, when: DelayedDispatchTime | { At: any } | { After: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>>;
    };
    vesting: {
      [index: string]: SubmittableExtrinsicFunction<ApiType>;
      /**
       * # <weight>
       * - Preconditions:
       * - T::Currency is orml_currencies
       * - Complexity: `O(1)`
       * - Db reads: `VestingSchedules`, 3 items of orml_currencies
       * - Db writes: `VestingSchedules`, 3 items of orml_currencies
       * -------------------
       * Base Weight: 47.26 µs
       * # </weight>
       **/
      addVestingSchedule: AugmentedSubmittable<(dest: LookupSource | Address | AccountId | AccountIndex | string | Uint8Array, schedule: VestingScheduleOf | { start?: any; period?: any; periodCount?: any; perPeriod?: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      /**
       * # <weight>
       * - Preconditions:
       * - T::Currency is orml_currencies
       * - Complexity: `O(1)`
       * - Db reads: `VestingSchedules`, 3 items of orml_currencies
       * - Db writes: `VestingSchedules`, 3 items of orml_currencies
       * -------------------
       * Base Weight: 29.86 µs
       * # </weight>
       **/
      claim: AugmentedSubmittable<() => SubmittableExtrinsic<ApiType>>;
      /**
       * # <weight>
       * - Preconditions:
       * - T::Currency is orml_currencies
       * - Complexity: `O(1)`
       * - Db reads: `VestingSchedules`, 3 items of orml_currencies
       * - Db writes: `VestingSchedules`, 3 items of orml_currencies
       * -------------------
       * Base Weight: 27.96 µs
       * # </weight>
       **/
      updateVestingSchedules: AugmentedSubmittable<(who: LookupSource | Address | AccountId | AccountIndex | string | Uint8Array, vestingSchedules: Vec<VestingScheduleOf> | (VestingScheduleOf | { start?: any; period?: any; periodCount?: any; perPeriod?: any } | string | Uint8Array)[]) => SubmittableExtrinsic<ApiType>>;
    };
  }

  export interface SubmittableExtrinsics<ApiType extends ApiTypes> extends AugmentedSubmittables<ApiType> {
    (extrinsic: Call | Extrinsic | Uint8Array | string): SubmittableExtrinsic<ApiType>;
    [index: string]: SubmittableModuleExtrinsics<ApiType>;
  }
}
