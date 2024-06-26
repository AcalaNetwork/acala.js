import { FixedPointNumber } from '@acala-network/sdk-core';
import { EstimateRedeemResult, HomaEnvironment } from '../types.js';
import { convertLiquidToStaking } from './exchange-rate.js';

export function getEstimateRedeemResult(
  env: HomaEnvironment,
  amount: FixedPointNumber,
  isFastReddem: boolean
): EstimateRedeemResult {
  if (isFastReddem) {
    const liquidToBurn = amount.mul(new FixedPointNumber(1).sub(env.fastMatchFeeRate));
    const redeemStaking = convertLiquidToStaking(env.exchangeRate, liquidToBurn);
    const fee = amount.sub(liquidToBurn);

    return {
      request: amount,
      receive: redeemStaking,
      fee,
      canTryFastRedeem: env.toBondPool.gt(redeemStaking),
      env
    };
  }

  return {
    request: amount,
    receive: convertLiquidToStaking(env.exchangeRate, amount),
    fee: FixedPointNumber.ZERO,
    canTryFastRedeem: false,
    env
  };
}
