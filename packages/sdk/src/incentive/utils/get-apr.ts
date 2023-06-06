import { FixedPointNumber, forceToCurrencyName, Token } from '@acala-network/sdk-core';
import { EXPECTED_BLOCK_TIME, MILLISECONDS_OF_YEAR } from '../../utils/constants';
import { IncentivePool, RewardAPR } from '../types';

/**
 * @name getAPR
 * @param collateral the pool collateral
 * @param accumulatePeriod reward accumulate period
 * @param prices prices of all required tokens
 * @param share total share of the pool
 * @param deductionRate deduction rate of the pool
 * @param rewardConfigs reward configs of the pool
 */
export function getAPR(
  collateral: Token,
  accumulatePeriod: number,
  prices: Record<string, FixedPointNumber>,
  share: FixedPointNumber,
  deductionRate: FixedPointNumber,
  rewardConfigs: IncentivePool['rewardTokensConfig']
): RewardAPR {
  const collateralPrice = prices[collateral.name];
  const totalDeposited = share.mul(collateralPrice);
  const periodCount = MILLISECONDS_OF_YEAR / EXPECTED_BLOCK_TIME / accumulatePeriod;
  const totalRewardOnePeriod = rewardConfigs.reduce((acc, cur) => {
    if (cur.amount && !cur.amount.isZero()) {
      return acc.plus(cur.amount.times(prices[forceToCurrencyName(cur.token)] || FixedPointNumber.ZERO));
    }

    return acc;
  }, FixedPointNumber.ZERO);

  const totalRewardOnePeriodWithDeduction = totalRewardOnePeriod.times(FixedPointNumber.ONE.minus(deductionRate));
  const apr = totalRewardOnePeriod.div(totalDeposited).times(new FixedPointNumber(periodCount));
  const aprWithDeduction = totalRewardOnePeriodWithDeduction
    .div(totalDeposited)
    .times(new FixedPointNumber(periodCount));

  const rateOnePeriod = totalRewardOnePeriod.div(totalDeposited);
  const apy = Math.pow(Number(rateOnePeriod.toString()) + 1, periodCount) - 1;

  return {
    apr: apr.toNumber(),
    aprWithDeduction: aprWithDeduction.toNumber(),
    apy
  };
}
