// Auto-generated via `yarn polkadot-types-from-chain`, do not edit
/* eslint-disable */

import { AnyNumber } from '@polkadot/types/types';
import { Compact, Option, Vec } from '@polkadot/types/codec';
import { bool, u32 } from '@polkadot/types/primitive';
import { ChangeBalance, ChangeOptionRate, ChangeOptionRatio } from '@acala-network/types/interfaces/cdpEngine';
import { RedeemStrategy } from '@acala-network/types/interfaces/homa';
import { AirDropCurrencyId, CurrencyId } from '@acala-network/types/interfaces/primitives';
import { AccountId, AccountIndex, Address, Amount, AmountOf, AuctionId, Balance, BalanceOf, BlockNumber, Call, CurrencyIdOf, LookupSource } from '@acala-network/types/interfaces/runtime';
import { ChangeRate, ChangeRatio, PolkadotAccountId } from '@acala-network/types/interfaces/stakingPool';
import { Rate } from '@acala-network/types/interfaces/support';
import { Extrinsic } from '@polkadot/types/interfaces/extrinsics';
import { ApiTypes, SubmittableExtrinsic } from '@polkadot/api/types';

declare module '@polkadot/api/types/submittable' {
  export interface AugmentedSubmittables<ApiType> {
    accounts: {
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
      /**
       * Kill self account from system.
       * 
       * The dispatch origin of this call must be Signed.
       * 
       * - `recipient`: the account as recipient to receive remaining currencies of the account will be killed,
       * None means no recipient is specified.
       **/
      closeAccount: AugmentedSubmittable<(recipient: Option<AccountId> | null | object | string | Uint8Array) => SubmittableExtrinsic<ApiType>>;
    };
    airDrop: {
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
      airdrop: AugmentedSubmittable<(to: AccountId | string | Uint8Array, currencyId: AirDropCurrencyId | 'KAR' | 'ACA' | number | Uint8Array, amount: Balance | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      updateAirdrop: AugmentedSubmittable<(to: AccountId | string | Uint8Array, currencyId: AirDropCurrencyId | 'KAR' | 'ACA' | number | Uint8Array, amount: Balance | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
    };
    auction: {
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
      /**
       * Bid an auction.
       * 
       * The dispatch origin for this call must be `Signed` by the transactor.
       * 
       * # <weight>
       * - Preconditions:
       * - T::Handler is module_auction_manager of Acala
       * - Indirectly needs orml_currencies and module_cdp_treasury of Acala
       * - Complexity: `O(1)`
       * - Db reads:
       * - collateral auction:
       * - best cases: 7
       * - worst cases: 14
       * - surplus auction:
       * - best cases: 5
       * - worst cases: 6
       * - debit auction:
       * - best cases: 8
       * - worst cases: 7
       * - Db writes:
       * - collateral auction:
       * - best cases: 7
       * - worst cases: 14
       * - surplus auction:
       * - best cases: 3
       * - worst cases: 5
       * - debit auction:
       * - best cases: 8
       * - worst cases: 8
       * -------------------
       * Base Weight:
       * - collateral auction:
       * - best cases: 134 µs
       * - worst cases: 300.4 µs
       * - surplus auction:
       * - best cases: 97.9 µs
       * - worst cases: 157.6 µs
       * - debit auction:
       * - best cases: 140.7 µs
       * - worst cases: 142.8 µs
       * # </weight>
       **/
      bid: AugmentedSubmittable<(id: AuctionId | AnyNumber | Uint8Array, value: Compact<Balance> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
    };
    auctionManager: {
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
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
       * - surplus auction worst case: 6
       * - debit auction worst case: 5
       * - collateral auction worst case: 15
       * - Db writes:
       * - surplus auction worst case: 3
       * - debit auction worst case: 4
       * - collateral auction worst case: 10
       * -------------------
       * Base Weight:
       * - surplus auction worst case: 63.96 µs
       * - debit auction worst case: 66.04 µs
       * - collateral auction worst case: 197.5 µs
       * # </weight>
       * Use the collateral auction worst case as default weight.
       **/
      cancel: AugmentedSubmittable<(id: AuctionId | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
    };
    cdpEngine: {
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
      /**
       * Liquidate unsafe CDP
       * 
       * The dispatch origin of this call must be _None_.
       * 
       * - `currency_id`: CDP's collateral type.
       * - `who`: CDP's owner.
       **/
      liquidate: AugmentedSubmittable<(currencyId: CurrencyId | { Token: any } | { DEXShare: any } | string | Uint8Array, who: AccountId | string | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      /**
       * Update parameters related to risk management of CDP under specific collateral type
       * 
       * The dispatch origin of this call must be `UpdateOrigin`.
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
       * - Db reads:	1
       * - Db writes: 1
       * -------------------
       * Base Weight: 76.08 µs
       * # </weight>
       **/
      setCollateralParams: AugmentedSubmittable<(currencyId: CurrencyId | { Token: any } | { DEXShare: any } | string | Uint8Array, stabilityFee: ChangeOptionRate | { NoChange: any } | { NewValue: any } | string | Uint8Array, liquidationRatio: ChangeOptionRatio | { NoChange: any } | { NewValue: any } | string | Uint8Array, liquidationPenalty: ChangeOptionRate | { NoChange: any } | { NewValue: any } | string | Uint8Array, requiredCollateralRatio: ChangeOptionRatio | { NoChange: any } | { NewValue: any } | string | Uint8Array, maximumTotalDebitValue: ChangeBalance | { NoChange: any } | { NewValue: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      /**
       * Update global parameters related to risk management of CDP
       * 
       * The dispatch origin of this call must be `UpdateOrigin`.
       * 
       * - `global_stability_fee`: global stability fee rate.
       * 
       * # <weight>
       * - Complexity: `O(1)`
       * - Db reads: 0
       * - Db writes: 1
       * -------------------
       * Base Weight: 24.16 µs
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
       * - Complexity: `O(1)`
       * - Db reads: 10
       * - Db writes: 6
       * -------------------
       * Base Weight: 161.5 µs
       * # </weight>
       **/
      settle: AugmentedSubmittable<(currencyId: CurrencyId | { Token: any } | { DEXShare: any } | string | Uint8Array, who: AccountId | string | Uint8Array) => SubmittableExtrinsic<ApiType>>;
    };
    cdpTreasury: {
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
      auctionCollateral: AugmentedSubmittable<(currencyId: CurrencyId | { Token: any } | { DEXShare: any } | string | Uint8Array, amount: Balance | AnyNumber | Uint8Array, target: Balance | AnyNumber | Uint8Array, splited: bool | boolean | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      auctionDebit: AugmentedSubmittable<(amount: Balance | AnyNumber | Uint8Array, initialPrice: Balance | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      auctionSurplus: AugmentedSubmittable<(amount: Balance | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      /**
       * Update parameters related to collateral auction under specific collateral type
       * 
       * The dispatch origin of this call must be `UpdateOrigin`.
       * 
       * - `currency_id`: collateral type
       * - `surplus_buffer_size`: collateral auction maximum size
       * 
       * # <weight>
       * - Complexity: `O(1)`
       * - Db reads: 0
       * - Db writes: 1
       * -------------------
       * Base Weight: 24.64 µs
       * # </weight>
       **/
      setCollateralAuctionMaximumSize: AugmentedSubmittable<(currencyId: CurrencyId | { Token: any } | { DEXShare: any } | string | Uint8Array, size: Balance | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
    };
    currencies: {
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
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
       * - Db reads: 5
       * - Db writes: 2
       * -------------------
       * Base Weight:
       * - non-native currency: 90.23 µs
       * - native currency in worst case: 70 µs
       * # </weight>
       **/
      transfer: AugmentedSubmittable<(dest: LookupSource | Address | AccountId | AccountIndex | string | Uint8Array, currencyId: CurrencyIdOf | { Token: any } | { DEXShare: any } | string | Uint8Array, amount: Compact<BalanceOf> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
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
       * Base Weight: 70 µs
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
       * - Db reads:
       * - non-native currency: 5
       * - Db writes:
       * - non-native currency: 2
       * -------------------
       * Base Weight:
       * - non-native currency: 66.24 µs
       * - native currency and killing account: 26.33 µs
       * - native currency and create account: 27.39 µs
       * # </weight>
       **/
      updateBalance: AugmentedSubmittable<(who: LookupSource | Address | AccountId | AccountIndex | string | Uint8Array, currencyId: CurrencyIdOf | { Token: any } | { DEXShare: any } | string | Uint8Array, amount: AmountOf | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
    };
    dex: {
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
      /**
       * Injecting liquidity to specific liquidity pool in the form of depositing currencies in trading pairs
       * into liquidity pool, and issue shares in proportion to the caller. Shares are temporarily not
       * allowed to transfer and trade, it represents the proportion of assets in liquidity pool.
       * 
       * - `currency_id_a`: currency id A.
       * - `currency_id_b`: currency id B.
       * - `max_amount_a`: maximum currency A amount allowed to inject to liquidity pool.
       * - `max_amount_b`: maximum currency A amount allowed to inject to liquidity pool.
       **/
      addLiquidity: AugmentedSubmittable<(currencyIdA: CurrencyId | { Token: any } | { DEXShare: any } | string | Uint8Array, currencyIdB: CurrencyId | { Token: any } | { DEXShare: any } | string | Uint8Array, maxAmountA: Compact<Balance> | AnyNumber | Uint8Array, maxAmountB: Compact<Balance> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      /**
       * Remove liquidity from specific liquidity pool in the form of burning shares, and withdrawing currencies in trading pairs
       * from liquidity pool in proportion, and withdraw liquidity incentive interest.
       * 
       * - `currency_id_a`: currency id A.
       * - `currency_id_b`: currency id B.
       * - `remove_share`: liquidity amount to remove.
       **/
      removeLiquidity: AugmentedSubmittable<(currencyIdA: CurrencyId | { Token: any } | { DEXShare: any } | string | Uint8Array, currencyIdB: CurrencyId | { Token: any } | { DEXShare: any } | string | Uint8Array, removeShare: Compact<Balance> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      /**
       * Trading with DEX, swap with exact supply amount
       * 
       * - `path`: trading path.
       * - `supply_amount`: exact supply amount.
       * - `min_target_amount`: acceptable minimum target amount.
       **/
      swapWithExactSupply: AugmentedSubmittable<(path: Vec<CurrencyId> | (CurrencyId | { Token: any } | { DEXShare: any } | string | Uint8Array)[], supplyAmount: Compact<Balance> | AnyNumber | Uint8Array, minTargetAmount: Compact<Balance> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      /**
       * Trading with DEX, swap with exact target amount
       * 
       * - `path`: trading path.
       * - `target_amount`: exact target amount.
       * - `max_supply_amount`: acceptable maxmum supply amount.
       **/
      swapWithExactTarget: AugmentedSubmittable<(path: Vec<CurrencyId> | (CurrencyId | { Token: any } | { DEXShare: any } | string | Uint8Array)[], targetAmount: Compact<Balance> | AnyNumber | Uint8Array, maxSupplyAmount: Compact<Balance> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
    };
    emergencyShutdown: {
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
      /**
       * Start emergency shutdown
       * 
       * The dispatch origin of this call must be `ShutdownOrigin`.
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
       * Base Weight: 148.3 µs
       * # </weight>
       **/
      emergencyShutdown: AugmentedSubmittable<() => SubmittableExtrinsic<ApiType>>;
      /**
       * Open final redemption if settlement is completed.
       * 
       * The dispatch origin of this call must be `ShutdownOrigin`.
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
       * Base Weight: 71.8 µs
       * # </weight>
       **/
      openCollateralRefund: AugmentedSubmittable<() => SubmittableExtrinsic<ApiType>>;
      /**
       * Refund a basket of remaining collateral assets to caller
       * 
       * - `amount`: stable currency amount used to refund.
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
       * Base Weight: 455.1 µs
       * # </weight>
       **/
      refundCollaterals: AugmentedSubmittable<(amount: Compact<Balance> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
    };
    homa: {
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
      mint: AugmentedSubmittable<(amount: Compact<Balance> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      redeem: AugmentedSubmittable<(amount: Compact<Balance> | AnyNumber | Uint8Array, strategy: RedeemStrategy | { Immediately: any } | { Target: any } | { WaitForUnbonding: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      withdrawRedemption: AugmentedSubmittable<() => SubmittableExtrinsic<ApiType>>;
    };
    honzon: {
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
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
       * - Db reads: 17
       * - Db writes: 9
       * -------------------
       * Base Weight: 246.2 µs
       * # </weight>
       **/
      adjustLoan: AugmentedSubmittable<(currencyId: CurrencyId | { Token: any } | { DEXShare: any } | string | Uint8Array, collateralAdjustment: Amount | AnyNumber | Uint8Array, debitAdjustment: Amount | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      /**
       * Authorize `to` to manipulate the loan under `currency_id`
       * 
       * - `currency_id`: collateral currency id.
       * - `to`: authorizee account
       * 
       * # <weight>
       * - Complexity: `O(1)`
       * - Db reads: 0
       * - Db writes: 1
       * -------------------
       * Base Weight: 27.82 µs
       * # </weight>
       **/
      authorize: AugmentedSubmittable<(currencyId: CurrencyId | { Token: any } | { DEXShare: any } | string | Uint8Array, to: AccountId | string | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      /**
       * Transfer the whole CDP of `from` under `currency_id` to caller's CDP under the same `currency_id`,
       * caller must have the authorization of `from` for the specific collateral type
       * 
       * - `currency_id`: collateral currency id.
       * - `from`: authorizer account
       * 
       * # <weight>
       * - Complexity: `O(1)`
       * - Db reads: 13
       * - Db writes: 6
       * -------------------
       * Base Weight: 178.2 µs
       * # </weight>
       **/
      transferLoanFrom: AugmentedSubmittable<(currencyId: CurrencyId | { Token: any } | { DEXShare: any } | string | Uint8Array, from: AccountId | string | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      /**
       * Cancel the authorization for `to` under `currency_id`
       * 
       * - `currency_id`: collateral currency id.
       * - `to`: authorizee account
       * 
       * # <weight>
       * - Complexity: `O(1)`
       * - Db reads: 0
       * - Db writes: 1
       * -------------------
       * Base Weight: 28.14 µs
       * # </weight>
       **/
      unauthorize: AugmentedSubmittable<(currencyId: CurrencyId | { Token: any } | { DEXShare: any } | string | Uint8Array, to: AccountId | string | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      /**
       * Cancel all authorization of caller
       * 
       * # <weight>
       * - Complexity: `O(C + M)` where C is the length of collateral_ids and M is the number of authorizees
       * - Db reads: 0
       * - Db writes: 1
       * -------------------
       * Base Weight: 0 + 3.8 * M + 128.4 * C µs
       * # </weight>
       **/
      unauthorizeAll: AugmentedSubmittable<() => SubmittableExtrinsic<ApiType>>;
    };
    nomineesElection: {
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
      bond: AugmentedSubmittable<(amount: Compact<Balance> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      chill: AugmentedSubmittable<() => SubmittableExtrinsic<ApiType>>;
      nominate: AugmentedSubmittable<(targets: Vec<PolkadotAccountId> | (PolkadotAccountId | string | Uint8Array)[]) => SubmittableExtrinsic<ApiType>>;
      rebond: AugmentedSubmittable<(amount: Balance | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      unbond: AugmentedSubmittable<(amount: Balance | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      withdrawUnbonded: AugmentedSubmittable<() => SubmittableExtrinsic<ApiType>>;
    };
    polkadotBridge: {
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
      forceEra: AugmentedSubmittable<(at: BlockNumber | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      setMockRewardRate: AugmentedSubmittable<(accountIndex: u32 | AnyNumber | Uint8Array, rewardRate: Rate | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      simualteReceiveFromSubAccount: AugmentedSubmittable<(accountIndex: u32 | AnyNumber | Uint8Array, to: AccountId | string | Uint8Array, amount: Balance | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      simulateBondExtra: AugmentedSubmittable<(accountIndex: u32 | AnyNumber | Uint8Array, amount: Balance | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      simulatePayoutNominator: AugmentedSubmittable<(accountIndex: u32 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      simulateRebond: AugmentedSubmittable<(accountIndex: u32 | AnyNumber | Uint8Array, amount: Balance | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      simulateSlashSubAccount: AugmentedSubmittable<(accountIndex: u32 | AnyNumber | Uint8Array, amount: Balance | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      simulateTransferToSubAccount: AugmentedSubmittable<(accountIndex: u32 | AnyNumber | Uint8Array, amount: Balance | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      simulateUnbond: AugmentedSubmittable<(accountIndex: u32 | AnyNumber | Uint8Array, amount: Balance | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      simulateWithdrawUnbonded: AugmentedSubmittable<(accountIndex: u32 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
    };
    prices: {
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
      /**
       * Lock the price and feed it to system.
       * 
       * The dispatch origin of this call must be `LockOrigin`.
       * 
       * - `currency_id`: currency type.
       **/
      lockPrice: AugmentedSubmittable<(currencyId: CurrencyId | { Token: any } | { DEXShare: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      /**
       * Unlock the price and get the price from `PriceProvider` again
       * 
       * The dispatch origin of this call must be `LockOrigin`.
       * 
       * - `currency_id`: currency type.
       **/
      unlockPrice: AugmentedSubmittable<(currencyId: CurrencyId | { Token: any } | { DEXShare: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>>;
    };
    stakingPool: {
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
      setStakingPoolParams: AugmentedSubmittable<(targetMaxFreeUnbondedRatio: ChangeRatio | { NoChange: any } | { NewValue: any } | string | Uint8Array, targetMinFreeUnbondedRatio: ChangeRatio | { NoChange: any } | { NewValue: any } | string | Uint8Array, targetUnbondingToFreeRatio: ChangeRatio | { NoChange: any } | { NewValue: any } | string | Uint8Array, unbondingToFreeAdjustment: ChangeRate | { NoChange: any } | { NewValue: any } | string | Uint8Array, baseFeeRate: ChangeRate | { NoChange: any } | { NewValue: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>>;
    };
  }

  export interface SubmittableExtrinsics<ApiType extends ApiTypes> extends AugmentedSubmittables<ApiType> {
    (extrinsic: Call | Extrinsic | Uint8Array | string): SubmittableExtrinsic<ApiType>;
    [key: string]: SubmittableModuleExtrinsics<ApiType>;
  }
}
