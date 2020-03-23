import { FixedU128 } from './fixed-u128';

const ZERO = FixedU128.ZERO;

export function debitToUSD (debit: FixedU128, debitExchangeRate: FixedU128, stableCoinPrice: FixedU128): FixedU128 {
  return debit.mul(debitExchangeRate).mul(stableCoinPrice);
}

export function USDToDebit (
  stableValue: FixedU128,
  debitExchangeRate: FixedU128,
  stableCoinPrice: FixedU128
): FixedU128 {
  if (stableCoinPrice.isZero() || debitExchangeRate.isZero()) {
    return ZERO;
  }
  return stableValue.div(stableCoinPrice).div(debitExchangeRate);
}

export function debitToStableCoin (debit: FixedU128, debitExchangeRate: FixedU128): FixedU128 {
  return debit.mul(debitExchangeRate);
}

export function stableCoinToDebit (amount: FixedU128, debitExchangeRate: FixedU128): FixedU128 {
  return amount.div(debitExchangeRate);
}

export function collateralToUSD (collateral: FixedU128, collateralPrice: FixedU128): FixedU128 {
  return collateral.mul(collateralPrice);
}

export function calcCollateralRatio (collateralAmount: FixedU128, debitAmount: FixedU128): FixedU128 {
  if (debitAmount.isZero()) {
    return ZERO;
  }
  return collateralAmount.div(debitAmount);
}

const YEAR = 364 * 24 * 60 * 60; // second of one yera
export function calcStableFee (stableFee: FixedU128, blockTime: number): FixedU128 {
  return FixedU128.fromNatural((1 + stableFee.toNumber()) ** ((YEAR / blockTime) * 1000) - 1);
}

export function calcRequiredCollateral (
  debitAmount: FixedU128,
  requiredCollateralRatio: FixedU128,
  collateralPrice: FixedU128
): FixedU128 {
  if (requiredCollateralRatio.isZero() || collateralPrice.isZero()) {
    return ZERO;
  }
  return debitAmount.mul(requiredCollateralRatio).div(collateralPrice);
}
