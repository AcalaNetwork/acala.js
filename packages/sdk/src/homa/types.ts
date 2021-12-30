import { FixedPointNumber } from '@acala-network/sdk-core';

export interface StakingLedger {
  index: number;
  bonded: FixedPointNumber;
  unlocking: {
    value: FixedPointNumber;
    era: number;
  }[];
}

export interface HomaEnvironment {
  // total staking token amount
  totalStaking: FixedPointNumber;
  // token liquidity token amount
  totalLiquidity: FixedPointNumber;
  // the exchange rate of homa
  exchangeRate: FixedPointNumber;
  // total to bond staking token amount
  toBondPool: FixedPointNumber;
  // estimated reward rate pre era
  estimatedRewardRatePerEra: FixedPointNumber;
  // estimated apy
  apy: number;
  // fast match fee
  fastMatchFeeRate: FixedPointNumber;
  // mint threshold
  mintThreshold: FixedPointNumber;
  // redeem threshold
  redeemThreshold: FixedPointNumber;
  // staking soft cap
  stakingSoftCap: FixedPointNumber;
  // the homa commission rate
  commissionRate: FixedPointNumber;
  // era frequency
  eraFrequency: number;
}

export interface EstimateMintResult {
  pay: FixedPointNumber;
  receive: FixedPointNumber;
  env: HomaEnvironment;
}

export interface EstimateRedeemResult {
  request: FixedPointNumber;
  receive: FixedPointNumber;
  fee: FixedPointNumber;
  canTryFastReddem: boolean;
  env: HomaEnvironment;
}

export interface Unbonding {
  era: number;
  amount: FixedPointNumber;
}

export interface HomaConvertor {
  convertLiquidToStaking: (amount: FixedPointNumber) => FixedPointNumber;
  convertStakingToLiquid: (amount: FixedPointNumber) => FixedPointNumber;
}

export interface RedeemRequest {
  amount: FixedPointNumber;
  fastRedeem: boolean;
}

export interface UserLiquidityTokenSummary {
  // total unbonding amount = unbonging + redeem request
  totalUnbonding: FixedPointNumber;
  claimable: FixedPointNumber;
  unbondings: Unbonding[];
  redeemRequest: RedeemRequest;
  currentRelayEra: number;
}
