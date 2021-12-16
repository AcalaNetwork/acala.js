// Auto-generated via `yarn polkadot-types-from-chain`, do not edit
/* eslint-disable */

declare module '@polkadot/api/types/consts' {
  import type { EvmAddress } from '@acala-network/types/interfaces/evm';
  import type { CurrencyId } from '@acala-network/types/interfaces/primitives';
  import type { AccountId, Balance, BalanceOf, BlockNumber, PalletId, Permill, TransactionPriority, Weight } from '@acala-network/types/interfaces/runtime';
  import type { ExchangeRate, Rate, Ratio } from '@acala-network/types/interfaces/support';
  import type { Price } from '@open-web3/orml-types/interfaces/traits';
  import type { ApiTypes, AugmentedConst, QueryableModuleConsts } from '@polkadot/api/types';
  import type { Vec, u16, u32, u64 } from '@polkadot/types';
  import type { MultiLocation } from '@polkadot/types/interfaces/xcm';
  import type { Codec, ITuple } from '@polkadot/types/types';

  export interface AugmentedConsts<ApiType  extends ApiTypes> {
    auctionManager: {
      /**
       * When the total duration of the auction exceeds this soft cap, push
       * the auction to end more faster
       **/
      auctionDurationSoftCap: BlockNumber & AugmentedConst<ApiType>;
      /**
       * The extended time for the auction to end after each successful bid
       **/
      auctionTimeToClose: BlockNumber & AugmentedConst<ApiType>;
      /**
       * The default parital path list for DEX to directly take auction,
       * Note: the path is parital, the whole swap path is collateral currency id concat
       * the partial path. And the list is sorted, DEX try to take auction by order.
       **/
      defaultSwapParitalPathList: Vec<Vec<CurrencyId>> & AugmentedConst<ApiType>;
      /**
       * The stable currency id
       **/
      getStableCurrencyId: CurrencyId & AugmentedConst<ApiType>;
      /**
       * The minimum increment size of each bid compared to the previous one
       **/
      minimumIncrementSize: Rate & AugmentedConst<ApiType>;
      /**
       * A configuration for base priority of unsigned transactions.
       * 
       * This is exposed so that it can be tuned for particular runtime, when
       * multiple modules send unsigned transactions.
       **/
      unsignedPriority: TransactionPriority & AugmentedConst<ApiType>;
      /**
       * Generic const
       **/
      [key: string]: Codec;
    };
    cdpEngine: {
      /**
       * The list of valid collateral currency types
       **/
      collateralCurrencyIds: Vec<CurrencyId> & AugmentedConst<ApiType>;
      /**
       * The default debit exchange rate for all collateral types
       **/
      defaultDebitExchangeRate: ExchangeRate & AugmentedConst<ApiType>;
      /**
       * The default liquidation penalty rate when liquidate unsafe CDP
       **/
      defaultLiquidationPenalty: Rate & AugmentedConst<ApiType>;
      /**
       * The default liquidation ratio for all collateral types of CDP
       **/
      defaultLiquidationRatio: Ratio & AugmentedConst<ApiType>;
      /**
       * The default parital path list for CDP engine to swap collateral to stable,
       * Note: the path is parital, the whole swap path is collateral currency id concat
       * the partial path. And the list is sorted, CDP engine trys to swap stable by order.
       **/
      defaultSwapParitalPathList: Vec<Vec<CurrencyId>> & AugmentedConst<ApiType>;
      /**
       * Stablecoin currency id
       **/
      getStableCurrencyId: CurrencyId & AugmentedConst<ApiType>;
      /**
       * When swap with DEX, the acceptable max slippage for the price from oracle.
       **/
      maxSwapSlippageCompareToOracle: Ratio & AugmentedConst<ApiType>;
      /**
       * The minimum debit value to avoid debit dust
       **/
      minimumDebitValue: Balance & AugmentedConst<ApiType>;
      /**
       * A configuration for base priority of unsigned transactions.
       * 
       * This is exposed so that it can be tuned for particular runtime, when
       * multiple modules send unsigned transactions.
       **/
      unsignedPriority: TransactionPriority & AugmentedConst<ApiType>;
      /**
       * Generic const
       **/
      [key: string]: Codec;
    };
    cdpTreasury: {
      /**
       * Stablecoin currency id
       **/
      getStableCurrencyId: CurrencyId & AugmentedConst<ApiType>;
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
      palletId: PalletId & AugmentedConst<ApiType>;
      treasuryAccount: AccountId & AugmentedConst<ApiType>;
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
       * Account Identifier from which the internal Pot is generated.
       **/
      potId: PalletId & AugmentedConst<ApiType>;
      /**
       * Generic const
       **/
      [key: string]: Codec;
    };
    currencies: {
      /**
       * The native currency id
       **/
      getNativeCurrencyId: CurrencyId & AugmentedConst<ApiType>;
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
      palletId: PalletId & AugmentedConst<ApiType>;
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
      collateralCurrencyIds: Vec<CurrencyId> & AugmentedConst<ApiType>;
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
      deploymentFee: BalanceOf & AugmentedConst<ApiType>;
      /**
       * Deposit for the developer.
       **/
      developerDeposit: BalanceOf & AugmentedConst<ApiType>;
      /**
       * The EVM address for creating system contract.
       **/
      networkContractSource: EvmAddress & AugmentedConst<ApiType>;
      /**
       * Charge extra bytes for creating a contract, would be reserved until
       * the contract deleted.
       **/
      newContractExtraBytes: u32 & AugmentedConst<ApiType>;
      /**
       * Storage required for per byte.
       **/
      storageDepositPerByte: BalanceOf & AugmentedConst<ApiType>;
      treasuryAccount: AccountId & AugmentedConst<ApiType>;
      /**
       * Generic const
       **/
      [key: string]: Codec;
    };
    homaLite: {
      /**
       * Equivalent to the loss of % staking reward from unbonding on the RelayChain.
       **/
      baseWithdrawFee: Permill & AugmentedConst<ApiType>;
      /**
       * The default exchange rate for liquid currency to staking currency.
       **/
      defaultExchangeRate: ExchangeRate & AugmentedConst<ApiType>;
      /**
       * The Currency ID for the Liquid asset
       **/
      liquidCurrencyId: CurrencyId & AugmentedConst<ApiType>;
      /**
       * The maximum number of redeem requests to match in "Mint" extrinsic.
       **/
      maximumRedeemRequestMatchesForMint: u32 & AugmentedConst<ApiType>;
      /**
       * The maximum rewards that are earned on the relaychain.
       **/
      maxRewardPerEra: Permill & AugmentedConst<ApiType>;
      /**
       * Maximum number of scheduled unbonds allowed
       **/
      maxScheduledUnbonds: u32 & AugmentedConst<ApiType>;
      /**
       * The minimal amount of Staking currency to be locked
       **/
      minimumMintThreshold: Balance & AugmentedConst<ApiType>;
      /**
       * The minimal amount of Liquid currency to be Redeemed
       **/
      minimumRedeemThreshold: Balance & AugmentedConst<ApiType>;
      /**
       * The fixed cost of transaction fee for XCM transfers.
       **/
      mintFee: Balance & AugmentedConst<ApiType>;
      /**
       * The account ID to redeem from on the relaychain.
       **/
      parachainAccount: AccountId & AugmentedConst<ApiType>;
      /**
       * Unbonding slashing spans for unbonding on the relaychain.
       **/
      relayChainUnbondingSlashingSpans: u32 & AugmentedConst<ApiType>;
      /**
       * The MultiLocation of the sovereign sub-account for where the staking currencies are sent
       * to.
       **/
      sovereignSubAccountLocation: MultiLocation & AugmentedConst<ApiType>;
      /**
       * The Currency ID for the Staking asset
       **/
      stakingCurrencyId: CurrencyId & AugmentedConst<ApiType>;
      /**
       * The Index to the Homa Lite Sub-account
       **/
      subAccountIndex: u16 & AugmentedConst<ApiType>;
      /**
       * The fixed cost of withdrawing Staking currency via redeem. In Staking currency.
       **/
      xcmUnbondFee: Balance & AugmentedConst<ApiType>;
      /**
       * Generic const
       **/
      [key: string]: Codec;
    };
    honzon: {
      /**
       * Reserved amount per authorization.
       **/
      depositPerAuthorization: Balance & AugmentedConst<ApiType>;
      /**
       * Generic const
       **/
      [key: string]: Codec;
    };
    incentives: {
      /**
       * The period to accumulate rewards
       **/
      accumulatePeriod: BlockNumber & AugmentedConst<ApiType>;
      /**
       * The module id, keep DexShare LP.
       **/
      palletId: PalletId & AugmentedConst<ApiType>;
      /**
       * The source account for native token rewards.
       **/
      rewardsSource: AccountId & AugmentedConst<ApiType>;
      /**
       * The reward type for dex saving.
       **/
      stableCurrencyId: CurrencyId & AugmentedConst<ApiType>;
      /**
       * Generic const
       **/
      [key: string]: Codec;
    };
    loans: {
      /**
       * The loan's module id, keep all collaterals of CDPs.
       **/
      palletId: PalletId & AugmentedConst<ApiType>;
      /**
       * Generic const
       **/
      [key: string]: Codec;
    };
    nft: {
      /**
       * The minimum balance to create class
       **/
      createClassDeposit: BalanceOf & AugmentedConst<ApiType>;
      /**
       * The minimum balance to create token
       **/
      createTokenDeposit: BalanceOf & AugmentedConst<ApiType>;
      /**
       * Deposit required for per byte.
       **/
      dataDepositPerByte: BalanceOf & AugmentedConst<ApiType>;
      /**
       * Maximum number of bytes in attributes
       **/
      maxAttributesBytes: u32 & AugmentedConst<ApiType>;
      /**
       * The NFT's module id
       **/
      palletId: PalletId & AugmentedConst<ApiType>;
      /**
       * Generic const
       **/
      [key: string]: Codec;
    };
    prices: {
      /**
       * The liquid currency id, it should be LDOT in Acala.
       **/
      getLiquidCurrencyId: CurrencyId & AugmentedConst<ApiType>;
      /**
       * The stable currency id, it should be AUSD in Acala.
       **/
      getStableCurrencyId: CurrencyId & AugmentedConst<ApiType>;
      /**
       * The staking currency id, it should be DOT in Acala.
       **/
      getStakingCurrencyId: CurrencyId & AugmentedConst<ApiType>;
      /**
       * The fixed prices of stable currency, it should be 1 USD in Acala.
       **/
      stableCurrencyFixedPrice: Price & AugmentedConst<ApiType>;
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
    xTokens: {
      /**
       * Base XCM weight.
       * 
       * The actually weight for an XCM message is `T::BaseXcmWeight +
       * T::Weigher::weight(&msg)`.
       **/
      baseXcmWeight: Weight & AugmentedConst<ApiType>;
      /**
       * Self chain location.
       **/
      selfLocation: MultiLocation & AugmentedConst<ApiType>;
      /**
       * Generic const
       **/
      [key: string]: Codec;
    };
  } // AugmentedConsts

  export interface QueryableConsts<ApiType extends ApiTypes> extends AugmentedConsts<ApiType> {
    [key: string]: QueryableModuleConsts;
  } // QueryableConsts

} // declare module
