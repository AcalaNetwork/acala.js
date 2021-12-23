import { FixedPointNumber, Token } from '@acala-network/sdk-core';
import { EstimateAddLiquidityResult, PoolDetail } from '../types';

export function getEstimateAddLiquidityResult(
  liquidityDetail: PoolDetail,
  tokenA: Token,
  _tokenB: Token,
  maxAmountA: FixedPointNumber,
  maxAmountB: FixedPointNumber,
  slippage: number
): EstimateAddLiquidityResult {
  const { share: totalShare, amounts, info } = liquidityDetail;
  const [pool0, pool1] = amounts;
  const [token0, token1] = info.pair;
  // sort input by ordered tokens
  const [maxAmount0, maxAmount1] = token0.isEqual(tokenA) ? [maxAmountA, maxAmountB] : [maxAmountB, maxAmountA];

  totalShare.forceSetPrecision(18);
  maxAmount0.forceSetPrecision(18);
  maxAmount1.forceSetPrecision(18);

  let pool0Increment = FixedPointNumber.ZERO;
  let pool1Increment = FixedPointNumber.ZERO;
  let incrementShare = FixedPointNumber.ZERO;

  if (totalShare.isZero()) {
    const exchangeRate0 = FixedPointNumber.ONE;
    const exchagneRate1 = FixedPointNumber.fromRational(maxAmount0, maxAmount1);

    const sharesFromToken0 = exchangeRate0.mul(maxAmount0);
    const sharesFromToken1 = exchagneRate1.mul(maxAmount1);

    const initialShares = sharesFromToken0.add(sharesFromToken1);

    pool0Increment = maxAmount0;
    pool1Increment = maxAmount1;
    incrementShare = initialShares;
  } else {
    const exchangeRate01 = FixedPointNumber.fromRational(pool1, pool0);
    const inputExchangeRate01 = FixedPointNumber.fromRational(maxAmount1, maxAmount0);

    if (inputExchangeRate01.lte(exchangeRate01)) {
      const exchangeRate10 = FixedPointNumber.fromRational(pool0, pool1);
      const amount0 = exchangeRate10.mul(maxAmount1);
      const _incrementShare = FixedPointNumber.fromRational(amount0, pool0).mul(totalShare);

      pool0Increment = amount0;
      pool1Increment = maxAmount1;
      incrementShare = _incrementShare;
    } else {
      const amount1 = exchangeRate01.mul(maxAmount0);
      const _incrementShare = FixedPointNumber.fromRational(amount1, pool1).mul(totalShare);

      pool0Increment = maxAmount0;
      pool1Increment = amount1;
      incrementShare = _incrementShare;
    }
  }

  pool0Increment.forceSetPrecision(token0.decimals);
  pool1Increment.forceSetPrecision(token1.decimals);
  incrementShare.forceSetPrecision(token0.decimals);

  return {
    poolDetail: liquidityDetail,
    incrementA: token0.isEqual(tokenA) ? pool0Increment : pool1Increment,
    incrementB: token0.isEqual(tokenA) ? pool1Increment : pool0Increment,
    incrementShare,
    incrementShareWithSlippage: incrementShare.mul(new FixedPointNumber(1 - slippage)),
    slippage
  };
}
