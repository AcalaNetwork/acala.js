import { FixedPointNumber } from '@acala-network/sdk-core/fixed-point-number';

export type SwapTradeMode = 'EXACT_INPUT' | 'EXACT_OUTPUT';

export interface Fee {
  numerator: FixedPointNumber;
  denominator: FixedPointNumber;
}

// get how much target amount will be got fro specific supply amount and price impact
export function getTargetAmount (
  supplyPool: FixedPointNumber,
  targetPool: FixedPointNumber,
  supplyAmount: FixedPointNumber,
  exchangeFee: Fee
): FixedPointNumber {
  if (supplyAmount.isZero() || supplyPool.isZero() || targetPool.isZero()) return FixedPointNumber.ZERO;

  const supplyAmountWithFee = supplyAmount.times(exchangeFee.denominator.minus(exchangeFee.numerator));
  const numerator = supplyAmountWithFee.times(targetPool);
  const denominator = supplyPool.times(exchangeFee.denominator).plus(supplyAmountWithFee);

  if (denominator.isZero()) return FixedPointNumber.ZERO;

  return numerator.div(denominator);
}

// get how much supply amount will be paid for specific target amount
export function getSupplyAmount (
  supplyPool: FixedPointNumber,
  targetPool: FixedPointNumber,
  targetAmount: FixedPointNumber,
  exchangeFee: Fee
): FixedPointNumber {
  if (targetAmount.isZero() || supplyPool.isZero() || targetPool.isZero()) return FixedPointNumber.ZERO;

  const { numerator: feeNumerator, denominator: feeDenominator } = exchangeFee;

  const numerator = supplyPool.times(targetAmount).times(feeDenominator);
  const denominator = targetPool.minus(targetAmount).times(feeDenominator.minus(feeNumerator));

  if (denominator.isZero()) return FixedPointNumber.ZERO;

  return FixedPointNumber.fromInner(numerator.div(denominator)._getInner().toNumber() + 1, numerator.getPrecision());
}
