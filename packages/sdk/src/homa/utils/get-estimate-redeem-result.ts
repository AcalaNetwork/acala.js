import { FixedPointNumber } from '@acala-network/sdk-core';
import { BelowMintThreshold, ExceededStakingCurrencySoftCap } from '../errors';
import { convertLiquidToStaking } from './exchange-rate';

export function getEstimateResultResult(
  amount: FixedPointNumber,
  mintThreshold: FixedPointNumber,
  totalStaking: FixedPointNumber,
  stakingSoftCap: FixedPointNumber,
  exchangeRate: FixedPointNumber,
  estimatedRewardRatePerEra: FixedPointNumber
): FixedPointNumber {
  if (amount.lt(mintThreshold)) throw new BelowMintThreshold();

  if (totalStaking.add(amount).gt(stakingSoftCap)) throw new ExceededStakingCurrencySoftCap();

  const liquditAmount = convertLiquidToStaking(exchangeRate, amount);

  const liquidIssueToMinter = FixedPointNumber.ONE.add(estimatedRewardRatePerEra).reciprocal().mul(liquditAmount);

  return liquidIssueToMinter;
}
