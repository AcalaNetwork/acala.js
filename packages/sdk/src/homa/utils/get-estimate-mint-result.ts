import { FixedPointNumber } from '@acala-network/sdk-core';
import { BelowMintThreshold, ExceededStakingCurrencySoftCap } from '../errors';
import { EstimateMintResult, HomaEnvironment } from '../types';
import { convertLiquidToStaking } from './exchange-rate';

export function getEstimateMintResult(amount: FixedPointNumber, env: HomaEnvironment): EstimateMintResult {
  const { mintThreshold, totalStaking, stakingSoftCap, exchangeRate, estimatedRewardRatePerEra } = env;
  if (amount.lt(mintThreshold)) throw new BelowMintThreshold();

  if (totalStaking.add(amount).gt(stakingSoftCap)) throw new ExceededStakingCurrencySoftCap();

  const liquditAmount = convertLiquidToStaking(exchangeRate, amount);

  const receive = FixedPointNumber.ONE.add(estimatedRewardRatePerEra).reciprocal().mul(liquditAmount);

  return {
    pay: amount,
    receive,
    env
  };
}
