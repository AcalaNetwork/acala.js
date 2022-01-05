// Auto-generated via `yarn polkadot-types-from-chain`, do not edit
/* eslint-disable */

import type { ChangeBalance, ChangeOptionRate, ChangeOptionRatio } from '@acala-network/types/interfaces/cdpEngine';
import type { Amount, AmountOf, AuctionId, CurrencyId, CurrencyIdOf } from '@acala-network/types/interfaces/primitives';
import type { AccountId, Balance, BalanceOf, BlockNumber, Call, LookupSource, Weight } from '@acala-network/types/interfaces/runtime';
import type { Rate } from '@acala-network/types/interfaces/support';
import type { ApiTypes, AugmentedSubmittable, SubmittableExtrinsic, SubmittableExtrinsicFunction, SubmittableModuleExtrinsics } from '@polkadot/api/types';
import type { Compact, Option, Vec, bool } from '@polkadot/types';
import type { Extrinsic } from '@polkadot/types/interfaces/extrinsics';
import type { MultiAsset, MultiLocation } from '@polkadot/types/interfaces/xcm';
import type { AnyNumber } from '@polkadot/types/types';

declare module '@polkadot/api/types/submittable' {
  export interface AugmentedSubmittables<ApiType> {
    auction: {
      /**
       * Bid an auction.
       * 
       * The dispatch origin for this call must be `Signed` by the
       * transactor.
       **/
      bid: AugmentedSubmittable<(id: AuctionId | AnyNumber | Uint8Array, value: Compact<Balance> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [AuctionId, Compact<Balance>]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    auctionManager: {
      /**
       * Cancel active auction after system shutdown
       * 
       * The dispatch origin of this call must be _None_.
       **/
      cancel: AugmentedSubmittable<(id: AuctionId | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [AuctionId]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    cdpEngine: {
      /**
       * Liquidate unsafe CDP
       * 
       * The dispatch origin of this call must be _None_.
       * 
       * - `currency_id`: CDP's collateral type.
       * - `who`: CDP's owner.
       **/
      liquidate: AugmentedSubmittable<(currencyId: CurrencyId | { Token: any } | { DEXShare: any } | { ERC20: any } | { StableAssetPoolToken: any } | string | Uint8Array, who: LookupSource | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [CurrencyId, LookupSource]>;
      /**
       * Update parameters related to risk management of CDP under specific
       * collateral type
       * 
       * The dispatch origin of this call must be `UpdateOrigin`.
       * 
       * - `currency_id`: collateral type.
       * - `interest_rate_per_sec`: extra interest rate per sec, `None` means do not update,
       * `Some(None)` means update it to `None`.
       * - `liquidation_ratio`: liquidation ratio, `None` means do not update, `Some(None)` means
       * update it to `None`.
       * - `liquidation_penalty`: liquidation penalty, `None` means do not update, `Some(None)`
       * means update it to `None`.
       * - `required_collateral_ratio`: required collateral ratio, `None` means do not update,
       * `Some(None)` means update it to `None`.
       * - `maximum_total_debit_value`: maximum total debit value.
       **/
      setCollateralParams: AugmentedSubmittable<(currencyId: CurrencyId | { Token: any } | { DEXShare: any } | { ERC20: any } | { StableAssetPoolToken: any } | string | Uint8Array, interestRatePerSec: ChangeOptionRate | { NoChange: any } | { NewValue: any } | string | Uint8Array, liquidationRatio: ChangeOptionRatio | { NoChange: any } | { NewValue: any } | string | Uint8Array, liquidationPenalty: ChangeOptionRate | { NoChange: any } | { NewValue: any } | string | Uint8Array, requiredCollateralRatio: ChangeOptionRatio | { NoChange: any } | { NewValue: any } | string | Uint8Array, maximumTotalDebitValue: ChangeBalance | { NoChange: any } | { NewValue: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [CurrencyId, ChangeOptionRate, ChangeOptionRatio, ChangeOptionRate, ChangeOptionRatio, ChangeBalance]>;
      /**
       * Update global parameters related to risk management of CDP
       * 
       * The dispatch origin of this call must be `UpdateOrigin`.
       * 
       * - `global_interest_rate_per_sec`: global interest rate per sec.
       **/
      setGlobalParams: AugmentedSubmittable<(globalInterestRatePerSec: Rate | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Rate]>;
      /**
       * Settle CDP has debit after system shutdown
       * 
       * The dispatch origin of this call must be _None_.
       * 
       * - `currency_id`: CDP's collateral type.
       * - `who`: CDP's owner.
       **/
      settle: AugmentedSubmittable<(currencyId: CurrencyId | { Token: any } | { DEXShare: any } | { ERC20: any } | { StableAssetPoolToken: any } | string | Uint8Array, who: LookupSource | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [CurrencyId, LookupSource]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    cdpTreasury: {
      auctionCollateral: AugmentedSubmittable<(currencyId: CurrencyId | { Token: any } | { DEXShare: any } | { ERC20: any } | { StableAssetPoolToken: any } | string | Uint8Array, amount: Balance | AnyNumber | Uint8Array, target: Balance | AnyNumber | Uint8Array, splited: bool | boolean | Uint8Array) => SubmittableExtrinsic<ApiType>, [CurrencyId, Balance, Balance, bool]>;
      extractSurplusToTreasury: AugmentedSubmittable<(amount: Balance | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Balance]>;
      /**
       * Update parameters related to collateral auction under specific
       * collateral type
       * 
       * The dispatch origin of this call must be `UpdateOrigin`.
       * 
       * - `currency_id`: collateral type
       * - `amount`: expected size of per lot collateral auction
       **/
      setExpectedCollateralAuctionSize: AugmentedSubmittable<(currencyId: CurrencyId | { Token: any } | { DEXShare: any } | { ERC20: any } | { StableAssetPoolToken: any } | string | Uint8Array, size: Balance | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [CurrencyId, Balance]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    currencies: {
      sweepDust: AugmentedSubmittable<(currencyId: CurrencyIdOf | { Token: any } | { DEXShare: any } | { ERC20: any } | { StableAssetPoolToken: any } | string | Uint8Array, accounts: Vec<AccountId> | (AccountId | string | Uint8Array)[]) => SubmittableExtrinsic<ApiType>, [CurrencyIdOf, Vec<AccountId>]>;
      /**
       * Transfer some balance to another account under `currency_id`.
       * 
       * The dispatch origin for this call must be `Signed` by the
       * transactor.
       **/
      transfer: AugmentedSubmittable<(dest: LookupSource | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array, currencyId: CurrencyIdOf | { Token: any } | { DEXShare: any } | { ERC20: any } | { StableAssetPoolToken: any } | string | Uint8Array, amount: Compact<BalanceOf> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [LookupSource, CurrencyIdOf, Compact<BalanceOf>]>;
      /**
       * Transfer some native currency to another account.
       * 
       * The dispatch origin for this call must be `Signed` by the
       * transactor.
       **/
      transferNativeCurrency: AugmentedSubmittable<(dest: LookupSource | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array, amount: Compact<BalanceOf> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [LookupSource, Compact<BalanceOf>]>;
      /**
       * update amount of account `who` under `currency_id`.
       * 
       * The dispatch origin of this call must be _Root_.
       **/
      updateBalance: AugmentedSubmittable<(who: LookupSource | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array, currencyId: CurrencyIdOf | { Token: any } | { DEXShare: any } | { ERC20: any } | { StableAssetPoolToken: any } | string | Uint8Array, amount: AmountOf | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [LookupSource, CurrencyIdOf, AmountOf]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    dex: {
      /**
       * Add liquidity to Enabled trading pair.
       * - Add provision success will record the provision, issue shares to caller in the initial
       * exchange rate when trading pair convert to Enabled.
       * 
       * - `currency_id_a`: currency id A.
       * - `currency_id_b`: currency id B.
       * - `max_amount_a`: maximum amount of currency_id_a is allowed to inject to liquidity
       * pool.
       * - `max_amount_b`: maximum amount of currency_id_b is allowed to inject to liquidity
       * pool.
       * - `min_share_increment`: minimum acceptable share amount.
       * - `stake_increment_share`: indicates whether to stake increased dex share to earn
       * incentives
       **/
      addLiquidity: AugmentedSubmittable<(currencyIdA: CurrencyId | { Token: any } | { DEXShare: any } | { ERC20: any } | { StableAssetPoolToken: any } | string | Uint8Array, currencyIdB: CurrencyId | { Token: any } | { DEXShare: any } | { ERC20: any } | { StableAssetPoolToken: any } | string | Uint8Array, maxAmountA: Compact<Balance> | AnyNumber | Uint8Array, maxAmountB: Compact<Balance> | AnyNumber | Uint8Array, minShareIncrement: Compact<Balance> | AnyNumber | Uint8Array, stakeIncrementShare: bool | boolean | Uint8Array) => SubmittableExtrinsic<ApiType>, [CurrencyId, CurrencyId, Compact<Balance>, Compact<Balance>, Compact<Balance>, bool]>;
      /**
       * Add provision to Provisioning trading pair.
       * If succecced, will record the provision, but shares issuing will happen after the
       * trading pair convert to Enabled status.
       * 
       * - `currency_id_a`: currency id A.
       * - `currency_id_b`: currency id B.
       * - `amount_a`: provision amount for currency_id_a.
       * - `amount_b`: provision amount for currency_id_b.
       **/
      addProvision: AugmentedSubmittable<(currencyIdA: CurrencyId | { Token: any } | { DEXShare: any } | { ERC20: any } | { StableAssetPoolToken: any } | string | Uint8Array, currencyIdB: CurrencyId | { Token: any } | { DEXShare: any } | { ERC20: any } | { StableAssetPoolToken: any } | string | Uint8Array, amountA: Compact<Balance> | AnyNumber | Uint8Array, amountB: Compact<Balance> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [CurrencyId, CurrencyId, Compact<Balance>, Compact<Balance>]>;
      /**
       * Claim dex share for founders who have participated in trading pair provision.
       * 
       * - `owner`: founder account.
       * - `currency_id_a`: currency id A.
       * - `currency_id_b`: currency id B.
       **/
      claimDexShare: AugmentedSubmittable<(owner: AccountId | string | Uint8Array, currencyIdA: CurrencyId | { Token: any } | { DEXShare: any } | { ERC20: any } | { StableAssetPoolToken: any } | string | Uint8Array, currencyIdB: CurrencyId | { Token: any } | { DEXShare: any } | { ERC20: any } | { StableAssetPoolToken: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [AccountId, CurrencyId, CurrencyId]>;
      /**
       * Disable a `Enabled` trading pair.
       **/
      disableTradingPair: AugmentedSubmittable<(currencyIdA: CurrencyId | { Token: any } | { DEXShare: any } | { ERC20: any } | { StableAssetPoolToken: any } | string | Uint8Array, currencyIdB: CurrencyId | { Token: any } | { DEXShare: any } | { ERC20: any } | { StableAssetPoolToken: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [CurrencyId, CurrencyId]>;
      /**
       * Enable a trading pair
       * if the status of trading pair is `Disabled`, or `Provisioning` without any accumulated
       * provision, enable it directly.
       **/
      enableTradingPair: AugmentedSubmittable<(currencyIdA: CurrencyId | { Token: any } | { DEXShare: any } | { ERC20: any } | { StableAssetPoolToken: any } | string | Uint8Array, currencyIdB: CurrencyId | { Token: any } | { DEXShare: any } | { ERC20: any } | { StableAssetPoolToken: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [CurrencyId, CurrencyId]>;
      /**
       * Enable a Provisioning trading pair if meet the condition.
       **/
      endProvisioning: AugmentedSubmittable<(currencyIdA: CurrencyId | { Token: any } | { DEXShare: any } | { ERC20: any } | { StableAssetPoolToken: any } | string | Uint8Array, currencyIdB: CurrencyId | { Token: any } | { DEXShare: any } | { ERC20: any } | { StableAssetPoolToken: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [CurrencyId, CurrencyId]>;
      /**
       * List a new provisioning trading pair.
       **/
      listProvisioning: AugmentedSubmittable<(currencyIdA: CurrencyId | { Token: any } | { DEXShare: any } | { ERC20: any } | { StableAssetPoolToken: any } | string | Uint8Array, currencyIdB: CurrencyId | { Token: any } | { DEXShare: any } | { ERC20: any } | { StableAssetPoolToken: any } | string | Uint8Array, minContributionA: Balance | AnyNumber | Uint8Array, minContributionB: Balance | AnyNumber | Uint8Array, targetProvisionA: Balance | AnyNumber | Uint8Array, targetProvisionB: Balance | AnyNumber | Uint8Array, notBefore: BlockNumber | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [CurrencyId, CurrencyId, Balance, Balance, Balance, Balance, BlockNumber]>;
      /**
       * Remove liquidity from specific liquidity pool in the form of burning
       * shares, and withdrawing currencies in trading pairs from liquidity
       * pool in proportion, and withdraw liquidity incentive interest.
       * 
       * - `currency_id_a`: currency id A.
       * - `currency_id_b`: currency id B.
       * - `remove_share`: liquidity amount to remove.
       * - `min_withdrawn_a`: minimum acceptable withrawn for currency_id_a.
       * - `min_withdrawn_b`: minimum acceptable withrawn for currency_id_b.
       * - `by_unstake`: this flag indicates whether to withdraw share which is on incentives.
       **/
      removeLiquidity: AugmentedSubmittable<(currencyIdA: CurrencyId | { Token: any } | { DEXShare: any } | { ERC20: any } | { StableAssetPoolToken: any } | string | Uint8Array, currencyIdB: CurrencyId | { Token: any } | { DEXShare: any } | { ERC20: any } | { StableAssetPoolToken: any } | string | Uint8Array, removeShare: Compact<Balance> | AnyNumber | Uint8Array, minWithdrawnA: Compact<Balance> | AnyNumber | Uint8Array, minWithdrawnB: Compact<Balance> | AnyNumber | Uint8Array, byUnstake: bool | boolean | Uint8Array) => SubmittableExtrinsic<ApiType>, [CurrencyId, CurrencyId, Compact<Balance>, Compact<Balance>, Compact<Balance>, bool]>;
      /**
       * Trading with DEX, swap with exact supply amount
       * 
       * - `path`: trading path.
       * - `supply_amount`: exact supply amount.
       * - `min_target_amount`: acceptable minimum target amount.
       **/
      swapWithExactSupply: AugmentedSubmittable<(path: Vec<CurrencyId> | (CurrencyId | { Token: any } | { DEXShare: any } | { ERC20: any } | { StableAssetPoolToken: any } | string | Uint8Array)[], supplyAmount: Compact<Balance> | AnyNumber | Uint8Array, minTargetAmount: Compact<Balance> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Vec<CurrencyId>, Compact<Balance>, Compact<Balance>]>;
      /**
       * Trading with DEX, swap with exact target amount
       * 
       * - `path`: trading path.
       * - `target_amount`: exact target amount.
       * - `max_supply_amount`: acceptable maximum supply amount.
       **/
      swapWithExactTarget: AugmentedSubmittable<(path: Vec<CurrencyId> | (CurrencyId | { Token: any } | { DEXShare: any } | { ERC20: any } | { StableAssetPoolToken: any } | string | Uint8Array)[], targetAmount: Compact<Balance> | AnyNumber | Uint8Array, maxSupplyAmount: Compact<Balance> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Vec<CurrencyId>, Compact<Balance>, Compact<Balance>]>;
      /**
       * List a new trading pair, trading pair will become Enabled status
       * after provision process.
       **/
      updateProvisioningParameters: AugmentedSubmittable<(currencyIdA: CurrencyId | { Token: any } | { DEXShare: any } | { ERC20: any } | { StableAssetPoolToken: any } | string | Uint8Array, currencyIdB: CurrencyId | { Token: any } | { DEXShare: any } | { ERC20: any } | { StableAssetPoolToken: any } | string | Uint8Array, minContributionA: Balance | AnyNumber | Uint8Array, minContributionB: Balance | AnyNumber | Uint8Array, targetProvisionA: Balance | AnyNumber | Uint8Array, targetProvisionB: Balance | AnyNumber | Uint8Array, notBefore: BlockNumber | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [CurrencyId, CurrencyId, Balance, Balance, Balance, Balance, BlockNumber]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    emergencyShutdown: {
      /**
       * Start emergency shutdown
       * 
       * The dispatch origin of this call must be `ShutdownOrigin`.
       **/
      emergencyShutdown: AugmentedSubmittable<() => SubmittableExtrinsic<ApiType>, []>;
      /**
       * Open final redemption if settlement is completed.
       * 
       * The dispatch origin of this call must be `ShutdownOrigin`.
       **/
      openCollateralRefund: AugmentedSubmittable<() => SubmittableExtrinsic<ApiType>, []>;
      /**
       * Refund a basket of remaining collateral assets to caller
       * 
       * - `amount`: stable currency amount used to refund.
       **/
      refundCollaterals: AugmentedSubmittable<(amount: Compact<Balance> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<Balance>]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    homaLite: {
      /**
       * Adjusts the total_staking_currency by the given difference.
       * Requires `T::GovernanceOrigin`
       * 
       * Parameters:
       * - `adjustment`: The difference in amount the total_staking_currency should be adjusted
       * by.
       **/
      adjustTotalStakingCurrency: AugmentedSubmittable<(byAmount: AmountOf | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [AmountOf]>;
      /**
       * Mint some Liquid currency, by locking up the given amount of Staking currency.
       * The exchange rate is calculated using the ratio of the total amount of the staking and
       * liquid currency. A portion is reducted (defined as T::MaxRewardPerEra) to make up for
       * the fact that staking is only effective from the next era on (on the relaychain).
       * 
       * Parameters:
       * - `amount`: The amount of Staking currency to be exchanged.
       **/
      mint: AugmentedSubmittable<(amount: Balance | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Balance]>;
      /**
       * Updates the cap for how much Staking currency can be used to Mint liquid currency.
       * Requires `T::GovernanceOrigin`
       * 
       * Parameters:
       * - `new_cap`: The new cap for staking currency.
       **/
      setMintingCap: AugmentedSubmittable<(newCap: Balance | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Balance]>;
      /**
       * Sets the total amount of the Staking currency that are currently on the relaychain.
       * Requires `T::GovernanceOrigin`
       * 
       * Parameters:
       * - `staking_total`: The current amount of the Staking currency. Used to calculate
       * conversion rate.
       **/
      setTotalStakingCurrency: AugmentedSubmittable<(stakingTotal: Balance | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Balance]>;
      /**
       * Sets the xcm_dest_weight for XCM transfers.
       * Requires `T::GovernanceOrigin`
       * 
       * Parameters:
       * - `xcm_dest_weight`: The new weight for XCM transfers.
       **/
      setXcmDestWeight: AugmentedSubmittable<(xcmDestWeight: Weight | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Weight]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    honzon: {
      /**
       * Adjust the loans of `currency_id` by specific
       * `collateral_adjustment` and `debit_adjustment`
       * 
       * - `currency_id`: collateral currency id.
       * - `collateral_adjustment`: signed amount, positive means to deposit collateral currency
       * into CDP, negative means withdraw collateral currency from CDP.
       * - `debit_adjustment`: signed amount, positive means to issue some amount of stablecoin
       * to caller according to the debit adjustment, negative means caller will payback some
       * amount of stablecoin to CDP according to to the debit adjustment.
       **/
      adjustLoan: AugmentedSubmittable<(currencyId: CurrencyId | { Token: any } | { DEXShare: any } | { ERC20: any } | { StableAssetPoolToken: any } | string | Uint8Array, collateralAdjustment: Amount | AnyNumber | Uint8Array, debitAdjustment: Amount | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [CurrencyId, Amount, Amount]>;
      /**
       * Authorize `to` to manipulate the loan under `currency_id`
       * 
       * - `currency_id`: collateral currency id.
       * - `to`: authorizee account
       **/
      authorize: AugmentedSubmittable<(currencyId: CurrencyId | { Token: any } | { DEXShare: any } | { ERC20: any } | { StableAssetPoolToken: any } | string | Uint8Array, to: LookupSource | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [CurrencyId, LookupSource]>;
      /**
       * Close caller's CDP which has debit but still in safe by use collateral to swap
       * stable token on DEX for clearing debit.
       * 
       * - `currency_id`: collateral currency id.
       * - `max_collateral_amount`: the max collateral amount which is used to swap enough
       * stable token to clear debit.
       * - `maybe_path`: the custom swap path.
       **/
      closeLoanHasDebitByDex: AugmentedSubmittable<(currencyId: CurrencyId | { Token: any } | { DEXShare: any } | { ERC20: any } | { StableAssetPoolToken: any } | string | Uint8Array, maxCollateralAmount: Balance | AnyNumber | Uint8Array, maybePath: Option<Vec<CurrencyId>> | null | object | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [CurrencyId, Balance, Option<Vec<CurrencyId>>]>;
      /**
       * Transfer the whole CDP of `from` under `currency_id` to caller's CDP
       * under the same `currency_id`, caller must have the authorization of
       * `from` for the specific collateral type
       * 
       * - `currency_id`: collateral currency id.
       * - `from`: authorizer account
       **/
      transferLoanFrom: AugmentedSubmittable<(currencyId: CurrencyId | { Token: any } | { DEXShare: any } | { ERC20: any } | { StableAssetPoolToken: any } | string | Uint8Array, from: LookupSource | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [CurrencyId, LookupSource]>;
      /**
       * Cancel the authorization for `to` under `currency_id`
       * 
       * - `currency_id`: collateral currency id.
       * - `to`: authorizee account
       **/
      unauthorize: AugmentedSubmittable<(currencyId: CurrencyId | { Token: any } | { DEXShare: any } | { ERC20: any } | { StableAssetPoolToken: any } | string | Uint8Array, to: LookupSource | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [CurrencyId, LookupSource]>;
      /**
       * Cancel all authorization of caller
       **/
      unauthorizeAll: AugmentedSubmittable<() => SubmittableExtrinsic<ApiType>, []>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    loans: {
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    prices: {
      /**
       * Lock the price and feed it to system.
       * 
       * The dispatch origin of this call must be `LockOrigin`.
       * 
       * - `currency_id`: currency type.
       **/
      lockPrice: AugmentedSubmittable<(currencyId: CurrencyId | { Token: any } | { DEXShare: any } | { ERC20: any } | { StableAssetPoolToken: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [CurrencyId]>;
      /**
       * Unlock the price and get the price from `PriceProvider` again
       * 
       * The dispatch origin of this call must be `LockOrigin`.
       * 
       * - `currency_id`: currency type.
       **/
      unlockPrice: AugmentedSubmittable<(currencyId: CurrencyId | { Token: any } | { DEXShare: any } | { ERC20: any } | { StableAssetPoolToken: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [CurrencyId]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    xTokens: {
      /**
       * Transfer native currencies.
       * 
       * `dest_weight` is the weight for XCM execution on the dest chain, and
       * it would be charged from the transferred assets. If set below
       * requirements, the execution may fail and assets wouldn't be
       * received.
       * 
       * It's a no-op if any error on local XCM execution or message sending.
       * Note sending assets out per se doesn't guarantee they would be
       * received. Receiving depends on if the XCM message could be delivered
       * by the network, and if the receiving chain would handle
       * messages correctly.
       **/
      transfer: AugmentedSubmittable<(currencyId: CurrencyId | { Token: any } | { DEXShare: any } | { ERC20: any } | { StableAssetPoolToken: any } | string | Uint8Array, amount: Balance | AnyNumber | Uint8Array, dest: MultiLocation | { parents?: any; interior?: any } | string | Uint8Array, destWeight: Weight | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [CurrencyId, Balance, MultiLocation, Weight]>;
      /**
       * Transfer `MultiAsset`.
       * 
       * `dest_weight` is the weight for XCM execution on the dest chain, and
       * it would be charged from the transferred assets. If set below
       * requirements, the execution may fail and assets wouldn't be
       * received.
       * 
       * It's a no-op if any error on local XCM execution or message sending.
       * Note sending assets out per se doesn't guarantee they would be
       * received. Receiving depends on if the XCM message could be delivered
       * by the network, and if the receiving chain would handle
       * messages correctly.
       **/
      transferMultiasset: AugmentedSubmittable<(asset: MultiAsset | { id?: any; fungibility?: any } | string | Uint8Array, dest: MultiLocation | { parents?: any; interior?: any } | string | Uint8Array, destWeight: Weight | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [MultiAsset, MultiLocation, Weight]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
  }

  export interface SubmittableExtrinsics<ApiType extends ApiTypes> extends AugmentedSubmittables<ApiType> {
    (extrinsic: Call | Extrinsic | Uint8Array | string): SubmittableExtrinsic<ApiType>;
    [key: string]: SubmittableModuleExtrinsics<ApiType>;
  }
}
