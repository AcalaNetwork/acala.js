// Auto-generated via `yarn polkadot-types-from-chain`, do not edit
/* eslint-disable */

import type { AccountId32, H160, Percent, Permill } from '@acala-network/types/interfaces/runtime';
import type { ApiTypes } from '@polkadot/api-base/types';
import type { Vec, bool, u128, u16, u32, u64 } from '@polkadot/types-codec';
import type { Codec, ITuple } from '@polkadot/types-codec/types';
import type { FrameSupportPalletId, FrameSupportWeightsRuntimeDbWeight, FrameSupportWeightsWeightToFeeCoefficient, FrameSystemLimitsBlockLength, FrameSystemLimitsBlockWeights, SpVersionRuntimeVersion, XcmV1MultiLocation, AcalaPrimitivesCurrencyCurrencyId } from '@polkadot/types/lookup';

declare module '@polkadot/api-base/types/consts' {
  export interface AugmentedConsts<ApiType extends ApiTypes> {
    assetRegistry: {
      /**
       * The Currency ID for the Liquid Croadloan asset
       **/
      liquidCroadloanCurrencyId: AcalaPrimitivesCurrencyCurrencyId & AugmentedConst<ApiType>;
      /**
       * Generic const
       **/
      [key: string]: Codec;
    };
    auctionManager: {
      /**
       * When the total duration of the auction exceeds this soft cap, push
       * the auction to end more faster
       **/
      auctionDurationSoftCap: u32 & AugmentedConst<ApiType>;
      /**
       * The extended time for the auction to end after each successful bid
       **/
      auctionTimeToClose: u32 & AugmentedConst<ApiType>;
      /**
       * The stable currency id
       **/
      getStableCurrencyId: AcalaPrimitivesCurrencyCurrencyId & AugmentedConst<ApiType>;
      /**
       * The minimum increment size of each bid compared to the previous one
       **/
      minimumIncrementSize: u128 & AugmentedConst<ApiType>;
      /**
       * A configuration for base priority of unsigned transactions.
       *
       * This is exposed so that it can be tuned for particular runtime, when
       * multiple modules send unsigned transactions.
       **/
      unsignedPriority: u64 & AugmentedConst<ApiType>;
      /**
       * Generic const
       **/
      [key: string]: Codec;
    };
    authorship: {
      /**
       * The number of blocks back we should accept uncles.
       * This means that we will deal with uncle-parents that are
       * `UncleGenerations + 1` before `now`.
       **/
      uncleGenerations: u32 & AugmentedConst<ApiType>;
      /**
       * Generic const
       **/
      [key: string]: Codec;
    };
    balances: {
      /**
       * The minimum amount required to keep an account open.
       **/
      existentialDeposit: u128 & AugmentedConst<ApiType>;
      /**
       * The maximum number of locks that should exist on an account.
       * Not strictly enforced, but used for weight estimation.
       **/
      maxLocks: u32 & AugmentedConst<ApiType>;
      /**
       * The maximum number of named reserves that can exist on an account.
       **/
      maxReserves: u32 & AugmentedConst<ApiType>;
      /**
       * Generic const
       **/
      [key: string]: Codec;
    };
    bounties: {
      /**
       * Percentage of the curator fee that will be reserved upfront as deposit for bounty
       * curator.
       **/
      bountyCuratorDeposit: Permill & AugmentedConst<ApiType>;
      /**
       * The amount held on deposit for placing a bounty proposal.
       **/
      bountyDepositBase: u128 & AugmentedConst<ApiType>;
      /**
       * The delay period for which a bounty beneficiary need to wait before claim the payout.
       **/
      bountyDepositPayoutDelay: u32 & AugmentedConst<ApiType>;
      /**
       * Bounty duration in blocks.
       **/
      bountyUpdatePeriod: u32 & AugmentedConst<ApiType>;
      /**
       * Minimum value for a bounty.
       **/
      bountyValueMinimum: u128 & AugmentedConst<ApiType>;
      /**
       * The amount held on deposit per byte within the tip report reason or bounty description.
       **/
      dataDepositPerByte: u128 & AugmentedConst<ApiType>;
      /**
       * Maximum acceptable reason length.
       **/
      maximumReasonLength: u32 & AugmentedConst<ApiType>;
      /**
       * Generic const
       **/
      [key: string]: Codec;
    };
    cdpEngine: {
      /**
       * The list of valid collateral currency types
       **/
      collateralCurrencyIds: Vec<AcalaPrimitivesCurrencyCurrencyId> & AugmentedConst<ApiType>;
      /**
       * The default debit exchange rate for all collateral types
       **/
      defaultDebitExchangeRate: u128 & AugmentedConst<ApiType>;
      /**
       * The default liquidation penalty rate when liquidate unsafe CDP
       **/
      defaultLiquidationPenalty: u128 & AugmentedConst<ApiType>;
      /**
       * The default liquidation ratio for all collateral types of CDP
       **/
      defaultLiquidationRatio: u128 & AugmentedConst<ApiType>;
      /**
       * Stablecoin currency id
       **/
      getStableCurrencyId: AcalaPrimitivesCurrencyCurrencyId & AugmentedConst<ApiType>;
      /**
       * When swap with DEX, the acceptable max slippage for the price from oracle.
       **/
      maxSwapSlippageCompareToOracle: u128 & AugmentedConst<ApiType>;
      /**
       * The minimum debit value to avoid debit dust
       **/
      minimumDebitValue: u128 & AugmentedConst<ApiType>;
      /**
       * A configuration for base priority of unsigned transactions.
       *
       * This is exposed so that it can be tuned for particular runtime, when
       * multiple modules send unsigned transactions.
       **/
      unsignedPriority: u64 & AugmentedConst<ApiType>;
      /**
       * Generic const
       **/
      [key: string]: Codec;
    };
    cdpTreasury: {
      /**
       * The alternative swap path joint list, which can be concated to
       * alternative swap path when cdp treasury swap collateral to stable.
       **/
      alternativeSwapPathJointList: Vec<Vec<AcalaPrimitivesCurrencyCurrencyId>> & AugmentedConst<ApiType>;
      /**
       * Stablecoin currency id
       **/
      getStableCurrencyId: AcalaPrimitivesCurrencyCurrencyId & AugmentedConst<ApiType>;
      /**
       * The cap of lots number when create collateral auction on a
       * liquidation or to create debit/surplus auction on block end.
       * If set to 0, does not work.
       **/
      maxAuctionsCount: u32 & AugmentedConst<ApiType>;
      /**
       * The CDP treasury's module id, keep surplus and collateral assets
       * from liquidation.
       **/
      palletId: FrameSupportPalletId & AugmentedConst<ApiType>;
      treasuryAccount: AccountId32 & AugmentedConst<ApiType>;
      /**
       * Generic const
       **/
      [key: string]: Codec;
    };
    collatorSelection: {
      /**
       * Will be kicked if block is not produced in threshold.
       **/
      collatorKickThreshold: Permill & AugmentedConst<ApiType>;
      /**
       * The Kicked candidate cannot register candidate or withdraw bond until
       * `KickPenaltySessionLength` ends.
       **/
      kickPenaltySessionLength: u32 & AugmentedConst<ApiType>;
      /**
       * Maximum number of candidates that we should have. This is used for benchmarking and is
       * not enforced.
       *
       * This does not take into account the invulnerables.
       **/
      maxCandidates: u32 & AugmentedConst<ApiType>;
      /**
       * Maximum number of invulnerables.
       **/
      maxInvulnerables: u32 & AugmentedConst<ApiType>;
      /**
       * Minimum number of candidates.
       **/
      minCandidates: u32 & AugmentedConst<ApiType>;
      /**
       * Minimum reward to be distributed to the collators.
       **/
      minRewardDistributeAmount: u128 & AugmentedConst<ApiType>;
      /**
       * Account Identifier from which the internal Pot is generated.
       **/
      potId: FrameSupportPalletId & AugmentedConst<ApiType>;
      /**
       * Generic const
       **/
      [key: string]: Codec;
    };
    currencies: {
      /**
       * The native currency id
       **/
      getNativeCurrencyId: AcalaPrimitivesCurrencyCurrencyId & AugmentedConst<ApiType>;
      /**
       * Generic const
       **/
      [key: string]: Codec;
    };
    democracy: {
      /**
       * Period in blocks where an external proposal may not be re-submitted after being vetoed.
       **/
      cooloffPeriod: u32 & AugmentedConst<ApiType>;
      /**
       * The period between a proposal being approved and enacted.
       *
       * It should generally be a little more than the unstake period to ensure that
       * voting stakers have an opportunity to remove themselves from the system in the case
       * where they are on the losing side of a vote.
       **/
      enactmentPeriod: u32 & AugmentedConst<ApiType>;
      /**
       * Minimum voting period allowed for a fast-track referendum.
       **/
      fastTrackVotingPeriod: u32 & AugmentedConst<ApiType>;
      /**
       * Indicator for whether an emergency origin is even allowed to happen. Some chains may
       * want to set this permanently to `false`, others may want to condition it on things such
       * as an upgrade having happened recently.
       **/
      instantAllowed: bool & AugmentedConst<ApiType>;
      /**
       * How often (in blocks) new public referenda are launched.
       **/
      launchPeriod: u32 & AugmentedConst<ApiType>;
      /**
       * The maximum number of public proposals that can exist at any time.
       **/
      maxProposals: u32 & AugmentedConst<ApiType>;
      /**
       * The maximum number of votes for an account.
       *
       * Also used to compute weight, an overly big value can
       * lead to extrinsic with very big weight: see `delegate` for instance.
       **/
      maxVotes: u32 & AugmentedConst<ApiType>;
      /**
       * The minimum amount to be used as a deposit for a public referendum proposal.
       **/
      minimumDeposit: u128 & AugmentedConst<ApiType>;
      /**
       * The amount of balance that must be deposited per byte of preimage stored.
       **/
      preimageByteDeposit: u128 & AugmentedConst<ApiType>;
      /**
       * The minimum period of vote locking.
       *
       * It should be no shorter than enactment period to ensure that in the case of an approval,
       * those successful voters are locked into the consequences that their votes entail.
       **/
      voteLockingPeriod: u32 & AugmentedConst<ApiType>;
      /**
       * How often (in blocks) to check for new votes.
       **/
      votingPeriod: u32 & AugmentedConst<ApiType>;
      /**
       * Generic const
       **/
      [key: string]: Codec;
    };
    dex: {
      /**
       * Trading fee rate
       * The first item of the tuple is the numerator of the fee rate, second
       * item is the denominator, fee_rate = numerator / denominator,
       * use (u32, u32) over `Rate` type to minimize internal division
       * operation.
       **/
      getExchangeFee: ITuple<[u32, u32]> & AugmentedConst<ApiType>;
      /**
       * The DEX's module id, keep all assets in DEX.
       **/
      palletId: FrameSupportPalletId & AugmentedConst<ApiType>;
      /**
       * The limit for length of trading path
       **/
      tradingPathLimit: u32 & AugmentedConst<ApiType>;
      /**
       * Generic const
       **/
      [key: string]: Codec;
    };
    emergencyShutdown: {
      /**
       * The list of valid collateral currency types
       **/
      collateralCurrencyIds: Vec<AcalaPrimitivesCurrencyCurrencyId> & AugmentedConst<ApiType>;
      /**
       * Generic const
       **/
      [key: string]: Codec;
    };
    evm: {
      /**
       * Chain ID of EVM.
       **/
      chainId: u64 & AugmentedConst<ApiType>;
      /**
       * The fee for deploying the contract.
       **/
      deploymentFee: u128 & AugmentedConst<ApiType>;
      /**
       * Deposit for the developer.
       **/
      developerDeposit: u128 & AugmentedConst<ApiType>;
      /**
       * The EVM address for creating system contract.
       **/
      networkContractSource: H160 & AugmentedConst<ApiType>;
      /**
       * Charge extra bytes for creating a contract, would be reserved until
       * the contract deleted.
       **/
      newContractExtraBytes: u32 & AugmentedConst<ApiType>;
      /**
       * Storage required for per byte.
       **/
      storageDepositPerByte: u128 & AugmentedConst<ApiType>;
      treasuryAccount: AccountId32 & AugmentedConst<ApiType>;
      /**
       * Tx fee required for per gas.
       * Provide to the client
       **/
      txFeePerGas: u128 & AugmentedConst<ApiType>;
      /**
       * Generic const
       **/
      [key: string]: Codec;
    };
    homa: {
      /**
       * The index list of active Homa subaccounts.
       * `active` means these subaccounts can continue do bond/unbond operations by Homa.
       **/
      activeSubAccountsIndexList: Vec<u16> & AugmentedConst<ApiType>;
      /**
       * Number of eras for unbonding is expired on relaychain.
       **/
      bondingDuration: u32 & AugmentedConst<ApiType>;
      /**
       * The default exchange rate for liquid currency to staking currency.
       **/
      defaultExchangeRate: u128 & AugmentedConst<ApiType>;
      /**
       * The currency id of the Liquid asset
       **/
      liquidCurrencyId: AcalaPrimitivesCurrencyCurrencyId & AugmentedConst<ApiType>;
      /**
       * The staking amount of threshold to mint.
       **/
      mintThreshold: u128 & AugmentedConst<ApiType>;
      /**
       * The homa's module id.
       **/
      palletId: FrameSupportPalletId & AugmentedConst<ApiType>;
      /**
       * The liquid amount of threshold to redeem.
       **/
      redeemThreshold: u128 & AugmentedConst<ApiType>;
      /**
       * The currency id of the Staking asset
       **/
      stakingCurrencyId: AcalaPrimitivesCurrencyCurrencyId & AugmentedConst<ApiType>;
      /**
       * Vault reward of Homa protocol
       **/
      treasuryAccount: AccountId32 & AugmentedConst<ApiType>;
      /**
       * Generic const
       **/
      [key: string]: Codec;
    };
    homaXcm: {
      /**
       * The account of parachain on the relaychain.
       **/
      parachainAccount: AccountId32 & AugmentedConst<ApiType>;
      /**
       * Unbonding slashing spans for unbonding on the relaychain.
       **/
      relayChainUnbondingSlashingSpans: u32 & AugmentedConst<ApiType>;
      /**
       * The currency id of the Staking asset
       **/
      stakingCurrencyId: AcalaPrimitivesCurrencyCurrencyId & AugmentedConst<ApiType>;
      /**
       * Generic const
       **/
      [key: string]: Codec;
    };
    honzon: {
      /**
       * Reserved amount per authorization.
       **/
      depositPerAuthorization: u128 & AugmentedConst<ApiType>;
      /**
       * Generic const
       **/
      [key: string]: Codec;
    };
    idleScheduler: {
      /**
       * The minimum weight that should remain before idle tasks are dispatched.
       **/
      minimumWeightRemainInBlock: u64 & AugmentedConst<ApiType>;
      /**
       * Generic const
       **/
      [key: string]: Codec;
    };
    incentives: {
      /**
       * The period to accumulate rewards
       **/
      accumulatePeriod: u32 & AugmentedConst<ApiType>;
      /**
       * The module id, keep DexShare LP.
       **/
      palletId: FrameSupportPalletId & AugmentedConst<ApiType>;
      /**
       * The source account for native token rewards.
       **/
      rewardsSource: AccountId32 & AugmentedConst<ApiType>;
      /**
       * The reward type for dex saving.
       **/
      stableCurrencyId: AcalaPrimitivesCurrencyCurrencyId & AugmentedConst<ApiType>;
      /**
       * Generic const
       **/
      [key: string]: Codec;
    };
    loans: {
      /**
       * The loan's module id, keep all collaterals of CDPs.
       **/
      palletId: FrameSupportPalletId & AugmentedConst<ApiType>;
      /**
       * Generic const
       **/
      [key: string]: Codec;
    };
    multisig: {
      /**
       * The base amount of currency needed to reserve for creating a multisig execution or to
       * store a dispatch call for later.
       *
       * This is held for an additional storage item whose value size is
       * `4 + sizeof((BlockNumber, Balance, AccountId))` bytes and whose key size is
       * `32 + sizeof(AccountId)` bytes.
       **/
      depositBase: u128 & AugmentedConst<ApiType>;
      /**
       * The amount of currency needed per unit threshold when creating a multisig execution.
       *
       * This is held for adding 32 bytes more into a pre-existing storage value.
       **/
      depositFactor: u128 & AugmentedConst<ApiType>;
      /**
       * The maximum amount of signatories allowed in the multisig.
       **/
      maxSignatories: u16 & AugmentedConst<ApiType>;
      /**
       * Generic const
       **/
      [key: string]: Codec;
    };
    nft: {
      /**
       * The minimum balance to create class
       **/
      createClassDeposit: u128 & AugmentedConst<ApiType>;
      /**
       * The minimum balance to create token
       **/
      createTokenDeposit: u128 & AugmentedConst<ApiType>;
      /**
       * Deposit required for per byte.
       **/
      dataDepositPerByte: u128 & AugmentedConst<ApiType>;
      /**
       * Maximum number of bytes in attributes
       **/
      maxAttributesBytes: u32 & AugmentedConst<ApiType>;
      /**
       * The NFT's module id
       **/
      palletId: FrameSupportPalletId & AugmentedConst<ApiType>;
      /**
       * Generic const
       **/
      [key: string]: Codec;
    };
    prices: {
      /**
       * The liquid currency id, it should be LDOT in Acala.
       **/
      getLiquidCurrencyId: AcalaPrimitivesCurrencyCurrencyId & AugmentedConst<ApiType>;
      /**
       * The stable currency id, it should be AUSD in Acala.
       **/
      getStableCurrencyId: AcalaPrimitivesCurrencyCurrencyId & AugmentedConst<ApiType>;
      /**
       * The staking currency id, it should be DOT in Acala.
       **/
      getStakingCurrencyId: AcalaPrimitivesCurrencyCurrencyId & AugmentedConst<ApiType>;
      /**
       * The fixed prices of stable currency, it should be 1 USD in Acala.
       **/
      stableCurrencyFixedPrice: u128 & AugmentedConst<ApiType>;
      /**
       * Generic const
       **/
      [key: string]: Codec;
    };
    proxy: {
      /**
       * The base amount of currency needed to reserve for creating an announcement.
       *
       * This is held when a new storage item holding a `Balance` is created (typically 16
       * bytes).
       **/
      announcementDepositBase: u128 & AugmentedConst<ApiType>;
      /**
       * The amount of currency needed per announcement made.
       *
       * This is held for adding an `AccountId`, `Hash` and `BlockNumber` (typically 68 bytes)
       * into a pre-existing storage value.
       **/
      announcementDepositFactor: u128 & AugmentedConst<ApiType>;
      /**
       * The maximum amount of time-delayed announcements that are allowed to be pending.
       **/
      maxPending: u32 & AugmentedConst<ApiType>;
      /**
       * The maximum amount of proxies allowed for a single account.
       **/
      maxProxies: u32 & AugmentedConst<ApiType>;
      /**
       * The base amount of currency needed to reserve for creating a proxy.
       *
       * This is held for an additional storage item whose value size is
       * `sizeof(Balance)` bytes and whose key size is `sizeof(AccountId)` bytes.
       **/
      proxyDepositBase: u128 & AugmentedConst<ApiType>;
      /**
       * The amount of currency needed per proxy added.
       *
       * This is held for adding 32 bytes plus an instance of `ProxyType` more into a
       * pre-existing storage value. Thus, when configuring `ProxyDepositFactor` one should take
       * into account `32 + proxy_type.encode().len()` bytes of data.
       **/
      proxyDepositFactor: u128 & AugmentedConst<ApiType>;
      /**
       * Generic const
       **/
      [key: string]: Codec;
    };
    scheduler: {
      /**
       * The maximum weight that may be scheduled per block for any dispatchables of less
       * priority than `schedule::HARD_DEADLINE`.
       **/
      maximumWeight: u64 & AugmentedConst<ApiType>;
      /**
       * The maximum number of scheduled calls in the queue for a single block.
       * Not strictly enforced, but used for weight estimation.
       **/
      maxScheduledPerBlock: u32 & AugmentedConst<ApiType>;
      /**
       * Generic const
       **/
      [key: string]: Codec;
    };
    system: {
      /**
       * Maximum number of block number to block hash mappings to keep (oldest pruned first).
       **/
      blockHashCount: u32 & AugmentedConst<ApiType>;
      /**
       * The maximum length of a block (in bytes).
       **/
      blockLength: FrameSystemLimitsBlockLength & AugmentedConst<ApiType>;
      /**
       * Block & extrinsics weights: base values and limits.
       **/
      blockWeights: FrameSystemLimitsBlockWeights & AugmentedConst<ApiType>;
      /**
       * The weight of runtime database operations the runtime can invoke.
       **/
      dbWeight: FrameSupportWeightsRuntimeDbWeight & AugmentedConst<ApiType>;
      /**
       * The designated SS85 prefix of this chain.
       *
       * This replaces the "ss58Format" property declared in the chain spec. Reason is
       * that the runtime should know about the prefix in order to make use of it as
       * an identifier of the chain.
       **/
      ss58Prefix: u16 & AugmentedConst<ApiType>;
      /**
       * Get the chain's current version.
       **/
      version: SpVersionRuntimeVersion & AugmentedConst<ApiType>;
      /**
       * Generic const
       **/
      [key: string]: Codec;
    };
    timestamp: {
      /**
       * The minimum period between blocks. Beware that this is different to the *expected*
       * period that the block production apparatus provides. Your chosen consensus system will
       * generally work with this to determine a sensible block time. e.g. For Aura, it will be
       * double this period on default settings.
       **/
      minimumPeriod: u64 & AugmentedConst<ApiType>;
      /**
       * Generic const
       **/
      [key: string]: Codec;
    };
    tips: {
      /**
       * The amount held on deposit per byte within the tip report reason or bounty description.
       **/
      dataDepositPerByte: u128 & AugmentedConst<ApiType>;
      /**
       * Maximum acceptable reason length.
       **/
      maximumReasonLength: u32 & AugmentedConst<ApiType>;
      /**
       * The period for which a tip remains open after is has achieved threshold tippers.
       **/
      tipCountdown: u32 & AugmentedConst<ApiType>;
      /**
       * The percent of the final tip which goes to the original reporter of the tip.
       **/
      tipFindersFee: Percent & AugmentedConst<ApiType>;
      /**
       * The amount held on deposit for placing a tip report.
       **/
      tipReportDepositBase: u128 & AugmentedConst<ApiType>;
      /**
       * Generic const
       **/
      [key: string]: Codec;
    };
    tokens: {
      maxLocks: u32 & AugmentedConst<ApiType>;
      /**
       * Generic const
       **/
      [key: string]: Codec;
    };
    transactionPayment: {
      /**
       * Deposit for setting an Alternative fee swap
       **/
      alternativeFeeSwapDeposit: u128 & AugmentedConst<ApiType>;
      /**
       * Default fee swap path list
       **/
      defaultFeeSwapPathList: Vec<Vec<AcalaPrimitivesCurrencyCurrencyId>> & AugmentedConst<ApiType>;
      /**
       * When swap with DEX, the acceptable max slippage for the price from oracle.
       **/
      maxSwapSlippageCompareToOracle: u128 & AugmentedConst<ApiType>;
      /**
       * The maximum value of tips that affect the priority.
       * Set the maximum value of tips to prevent affecting the unsigned extrinsic.
       **/
      maxTipsOfPriority: u128 & AugmentedConst<ApiType>;
      /**
       * Native currency id, the actual received currency type as fee for
       * treasury. Should be ACA
       **/
      nativeCurrencyId: AcalaPrimitivesCurrencyCurrencyId & AugmentedConst<ApiType>;
      /**
       * A fee mulitplier for `Operational` extrinsics to compute "virtual tip" to boost their
       * `priority`
       *
       * This value is multipled by the `final_fee` to obtain a "virtual tip" that is later
       * added to a tip component in regular `priority` calculations.
       * It means that a `Normal` transaction can front-run a similarly-sized `Operational`
       * extrinsic (with no tip), by including a tip value greater than the virtual tip.
       *
       * ```rust,ignore
       * // For `Normal`
       * let priority = priority_calc(tip);
       *
       * // For `Operational`
       * let virtual_tip = (inclusion_fee + tip) * OperationalFeeMultiplier;
       * let priority = priority_calc(tip + virtual_tip);
       * ```
       *
       * Note that since we use `final_fee` the multiplier applies also to the regular `tip`
       * sent with the transaction. So, not only does the transaction get a priority bump based
       * on the `inclusion_fee`, but we also amplify the impact of tips applied to `Operational`
       * transactions.
       **/
      operationalFeeMultiplier: u64 & AugmentedConst<ApiType>;
      /**
       * PalletId used to derivate sub account.
       **/
      palletId: FrameSupportPalletId & AugmentedConst<ApiType>;
      /**
       * The step amount of tips required to effect transaction priority.
       **/
      tipPerWeightStep: u128 & AugmentedConst<ApiType>;
      /**
       * The limit for length of trading path
       **/
      tradingPathLimit: u32 & AugmentedConst<ApiType>;
      /**
       * The fee to be paid for making a transaction; the per-byte portion.
       **/
      transactionByteFee: u128 & AugmentedConst<ApiType>;
      /**
       * Treasury account used to transfer balance to sub account of `PalletId`.
       **/
      treasuryAccount: AccountId32 & AugmentedConst<ApiType>;
      /**
       * The polynomial that is applied in order to derive fee from weight.
       **/
      weightToFee: Vec<FrameSupportWeightsWeightToFeeCoefficient> & AugmentedConst<ApiType>;
      /**
       * Generic const
       **/
      [key: string]: Codec;
    };
    treasury: {
      /**
       * Percentage of spare funds (if any) that are burnt per spend period.
       **/
      burn: Permill & AugmentedConst<ApiType>;
      /**
       * The maximum number of approvals that can wait in the spending queue.
       **/
      maxApprovals: u32 & AugmentedConst<ApiType>;
      /**
       * The treasury's pallet id, used for deriving its sovereign account ID.
       **/
      palletId: FrameSupportPalletId & AugmentedConst<ApiType>;
      /**
       * Fraction of a proposal's value that should be bonded in order to place the proposal.
       * An accepted proposal gets these back. A rejected proposal does not.
       **/
      proposalBond: Permill & AugmentedConst<ApiType>;
      /**
       * Minimum amount of funds that should be placed in a deposit for making a proposal.
       **/
      proposalBondMinimum: u128 & AugmentedConst<ApiType>;
      /**
       * Period between successive spends.
       **/
      spendPeriod: u32 & AugmentedConst<ApiType>;
      /**
       * Generic const
       **/
      [key: string]: Codec;
    };
    utility: {
      /**
       * The limit on the number of batched calls.
       **/
      batchedCallsLimit: u32 & AugmentedConst<ApiType>;
      /**
       * Generic const
       **/
      [key: string]: Codec;
    };
    vesting: {
      /**
       * The minimum amount transferred to call `vested_transfer`.
       **/
      minVestedTransfer: u128 & AugmentedConst<ApiType>;
      /**
       * Generic const
       **/
      [key: string]: Codec;
    };
    xTokens: {
      /**
       * Base XCM weight.
       *
       * The actually weight for an XCM message is `T::BaseXcmWeight +
       * T::Weigher::weight(&msg)`.
       **/
      baseXcmWeight: u64 & AugmentedConst<ApiType>;
      /**
       * Self chain location.
       **/
      selfLocation: XcmV1MultiLocation & AugmentedConst<ApiType>;
      /**
       * Generic const
       **/
      [key: string]: Codec;
    };
  } // AugmentedConsts
} // declare module
