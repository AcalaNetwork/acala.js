import { FixedU128 } from './fixed-u128';

export function calcCanGenerater (
  collateralAmount: FixedU128,
  debitAmount: FixedU128,
  requiredCollateralRatio: FixedU128,
  stableCoinPrice: FixedU128
): FixedU128 {
  if (requiredCollateralRatio.isZero() || stableCoinPrice.isZero()) {
    return FixedU128.ZERO;
  }
  // sub 0.00001 to ensure generate success
  const result = collateralAmount
    .div(requiredCollateralRatio)
    .sub(debitAmount)
    .div(stableCoinPrice)
    .sub(FixedU128.fromNatural(0.00001));
  return result.isNaN() ? FixedU128.ZERO : result;
}

export function calcLiquidationPrice (
  collateral: FixedU128,
  debitAmount: FixedU128,
  liquidationRatio: FixedU128
): FixedU128 {
  if (debitAmount.isZero()) {
    return FixedU128.ZERO;
  }
  return debitAmount.mul(liquidationRatio).div(collateral);
}
