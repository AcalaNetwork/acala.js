import { FixedPointNumber } from '@acala-network/sdk-core';
import { BelowMintThreshold, ExceededStakingCurrencySoftCap } from '../errors';
import { EstimateMintResult, HomaEnvironment } from '../types';
import { convertStakingToLiquid } from './exchange-rate';

export function getEstimateMintResult(amount: FixedPointNumber, env: HomaEnvironment): EstimateMintResult {
  const { mintThreshold, totalStaking, stakingSoftCap, exchangeRate, estimatedRewardRatePerEra } = env;

  if (amount.lt(mintThreshold)) throw new BelowMintThreshold();

  if (totalStaking.add(amount).gt(stakingSoftCap)) throw new ExceededStakingCurrencySoftCap();

  const liquditAmount = convertStakingToLiquid(exchangeRate, amount);

  const receive = liquditAmount.div(FixedPointNumber.ONE.add(estimatedRewardRatePerEra));

  return {
    pay: amount,
    receive,
    env
  };
}
