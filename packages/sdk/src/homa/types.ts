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
  // staking soft cap
  stakingSoftCap: FixedPointNumber;
}

export interface EstimateMintResult {
  pay: FixedPointNumber;
  receive: FixedPointNumber;
  fee: FixedPointNumber;
  homa: HomaEnvironment;
}
