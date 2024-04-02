import { FixedPointNumber } from '@acala-network/sdk-core';
import { EstimateRemoveLiquidityResult, PoolDetail } from '../types.js';

export function getEstimateRemoveLiquidityResult(
  poolDetail: PoolDetail,
  removeShare: FixedPointNumber,
  slippage: number
): EstimateRemoveLiquidityResult {
  const {
    share: totalShare,
    amounts,
    info: { token }
  } = poolDetail;

  const ratio = removeShare.mul(new FixedPointNumber(1 - slippage, token.decimals)).div(totalShare);

  if (!ratio.isPositive())
    return {
      poolDetail,
      removeShare,
      minReceived: [FixedPointNumber.ZERO, FixedPointNumber.ZERO],
      slippage
    };

  return {
    poolDetail,
    removeShare,
    minReceived: [amounts[0].mul(ratio), amounts[1].mul(ratio)],
    slippage
  };
}
