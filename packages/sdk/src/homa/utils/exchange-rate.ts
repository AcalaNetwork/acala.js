import { FixedPointNumber as FN } from '@acala-network/sdk-core';

export function getExchangeRate(totalStaking: FN, totalLiquid: FN, defaultExchangeRate = new FN(0.1, 18)): FN {
  if (totalStaking.isZero()) return defaultExchangeRate;

  try {
    return FN.fromRational(totalStaking, totalLiquid);
  } catch (e) {
    return defaultExchangeRate;
  }
}

export function convertLiquidToStaking(exchangeRate: FN, liquidAmount: FN): FN {
  return exchangeRate.mul(liquidAmount);
}

export function convertStakingToLiquid(exchangeRate: FN, stakingAmount: FN): FN {
  return stakingAmount.div(exchangeRate);
}
