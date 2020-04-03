import { Fixed18 } from './fixed-18';

/**
 * @name debitToStableCoin
 * @description transform debit to stable coin
 * @param {Fixed18} quantity - user loan debit quantity
 * @param {Fixed18} debitExchangeRate - loan debit exchange rate
 * @returns {Fixed18} return the stable coin quantity
 */
export function debitToStableCoin (quantity: Fixed18, debitExchangeRate: Fixed18): Fixed18 {
  return quantity.mul(debitExchangeRate);
}

/**
 * @name stableCoinToDebit
 * @description transform stable coin to debit
 * @param {Fixed18} amount - stable coin amount
 * @param {Fixed18} debitExchangeRate - loan debit exchange rate
 * @returns {Fixed18} return the debit quantity
 */
export function stableCoinToDebit (amount: Fixed18, debitExchangeRate: Fixed18): Fixed18 {
  return debitExchangeRate.isZero() ? Fixed18.ZERO : amount.div(debitExchangeRate);
}

/**
 * @name debitToUSD
 * @description transform debit to USD
 * @param {Fixed18} quantity - user loan debit quantity
 * @param {Fixed18} debitExchangeRate - loan debit exchange rate
 * @param {Fixed18} stableCoinPrice - stable coin price
 * @returns {Fixed18} return the debit amount denominated in USD
 */
export function debitToUSD (quantity: Fixed18, debitExchangeRate: Fixed18, stableCoinPrice: Fixed18): Fixed18 {
  return debitToStableCoin(quantity, debitExchangeRate).mul(stableCoinPrice);
}

/**
 * @name USDToDebit
 * @description transform USD to debit
 * @param {Fixed18} amount - USD amount
 * @param {Fixed18} debitExchangeRate - loan debit exchange rate
 * @param {Fixed18} stableCoinPrice - stable coin price
 * @returns {Fixed18} return the debit quantity
 */
export function USDToDebit (amount: Fixed18, debitExchangeRate: Fixed18, stableCoinPrice: Fixed18): Fixed18 {
  return stableCoinPrice.isZero() ? Fixed18.ZERO : stableCoinToDebit(amount.div(stableCoinPrice), debitExchangeRate);
}

/**
 * @name collateralToUSD
 * @description transform collateral to USD
 * @param {Fixed18} quantity - collateral quantity
 * @param {Fixed18} collateralPrice - collateral price
 * @returns {Fixed18} return the collateral amount denominated in USD
 */
export function collateralToUSD (quantity: Fixed18, collateralPrice: Fixed18): Fixed18 {
  return quantity.mul(collateralPrice);
}

/**
 * @name USDToCollateral
 * @description transform USD to collateral
 * @param {Fixed18} amount - USD amount
 * @param {Fixed18} collateralPrice - collateral price
 * @returns {Fixed18} return the collateral quantity
 */
export function USDToCollateral (amount: Fixed18, collateralPrice: Fixed18): Fixed18 {
  return amount.div(collateralPrice);
}

/**
 * @name calcCollateralRatio
 * @description calculate collateral ratio. Equation: collateralRatio = collateralAmount / debitAmount
 * @param {Fixed18} collateralAmount - collateral amount (USD)
 * @param {Fixed18} debitAmount - debit amount (USD)
 * @returns {Fixed18} return collateral ratio
 */
export function calcCollateralRatio (collateralAmount: Fixed18, debitAmount: Fixed18): Fixed18 {
  return collateralAmount.div(debitAmount);
}

const YEAR = 365 * 24 * 60 * 60; // second of one year
/**
 * @name calcStableFeeAPR
 * @description calculate stable fee annual percentage rate. Equation: stableFee = (1 + stableFee) ** (yearSecond * 1000 / expectedBlockTime) - 1
 * @param {Fixed18} stableFee - loan stable fee on the chain config
 * @param {number} expectedBlockTime - expected block time on the chain config (precision in milliseconds)
 * @return {Fixed18} return stable fee annual percentage rate
 */
export function calcStableFeeAPR (stableFee: Fixed18, blockTime: number): Fixed18 {
  // set stable fee decimal places to 18 and round mode to ROUND_FLOOR
  return Fixed18.fromNatural((1 + stableFee.toNumber(18, 3)) ** ((YEAR / blockTime) * 1000) - 1);
}

/**
 * @name calcRequiredCollateral
 * @description calculate how many collateral needs. Equation: requiredColalteral = debitAmount * requiredCollateralRatio / collateralPrice
 * the function always returns a nonnegative number
 * @param {Fixed18} debitAmount - debit amount (USD)
 * @param {Fixed18} requiredCollateralRatio - required collateral ratio
 * @param {Fixed18} collateralPrice - collateral price
 * @returns {Fixed18} return the collateral quantity which is required
 */
export function calcRequiredCollateral (debitAmount: Fixed18, requiredCollateralRatio: Fixed18, collateralPrice: Fixed18): Fixed18 {
  const result = debitAmount.mul(requiredCollateralRatio).div(collateralPrice);
  if (result.isLessThan(Fixed18.ZERO) || !result.isFinity()) {
    return Fixed18.ZERO;
  }
  return result;
}

/**
 * @name calcLiquidationPrice
 * @description calculate liquidation price. Equation: liquidatioPrice = debitAmount * liquidatioRatio / collateralQuantity
 * the function always returns a positive number or NaN
 * @param {Fixed18} collateralQuantity - collateral quantity
 * @param {Fixed18} debitAmount - debit amount (USD)
 * @param {Fixed18} liquidationRatio - required liquidation ratio on the chain config
 * @returns {Fixed18} return liquidation price
 */
export function calcLiquidationPrice (collateralQuantity: Fixed18, debitAmount: Fixed18, liquidationRatio: Fixed18): Fixed18 {
  const result = debitAmount.mul(liquidationRatio).div(collateralQuantity);
  if (result.isLessThan(Fixed18.ZERO) || result.isEqualTo(Fixed18.ZERO) || !result.isFinity()) {
    return Fixed18.fromNatural(NaN);
  }
  return result;
}

/**
 * @name calcCanGenerate
 * @description calculate how many stable coins can generate. Equation: canGenerate = (collateralAmount / requiredCollateralRatio - currentDebitAmount) / stableCoinPrice
 * the function always returns a nonnegative number
 * @param {Fixed18} collateralAmount - collateral amount (USD)
 * @param {Fixed18} currentDebitAmount - current debit amount in the loan (USD)
 * @param {Fixed18} requiredCollateralRatio - loan required collateral ratio on the chain config
 * @param {Fixed18} stableCoinPrice - stable coin price
 * @param {Fixed18} [slippage=0] - slippage amount, because canGenerate amount is reduce every block time.
 * @returns {Fixed18} return stable coin quantity which can be generated
 */
export function calcCanGenerate (collateralAmount: Fixed18, currentDebitAmount: Fixed18, requiredCollateralRatio: Fixed18, stableCoinPrice: Fixed18, slippage = Fixed18.ZERO): Fixed18 {
  const result = collateralAmount
    .div(requiredCollateralRatio)
    .sub(currentDebitAmount)
    .div(stableCoinPrice)
    .sub(slippage);
  if (result.isLessThan(Fixed18.ZERO) || !result.isFinity()) {
    return Fixed18.ZERO;
  }
  return result;
}

interface LoanParams {
  debits: Fixed18;
  collaterals: Fixed18;
  requiredCollateralRatio: Fixed18;
  stableFee: Fixed18;
  expectedBlockTime: number;
  liquidationRatio: Fixed18;
  collateralPrice: Fixed18;
  stableCoinPrice: Fixed18;
  debitExchangeRate: Fixed18;
}

/**
 * @class Loan
 * @classdesc support more structured api, include loan properties and derived properties
 */
export class Loan {
  public debits: Fixed18;
  public collaterals: Fixed18;
  public requiredCollateralRatio: Fixed18;
  public stableFee: Fixed18;
  public expectedBlockTime: number;
  public liquidationRatio: Fixed18;
  public collateralPrice: Fixed18;
  public stableCoinPrice: Fixed18;
  public debitExchangeRate: Fixed18;

  constructor (params: LoanParams) {
    this.debits = params.debits;
    this.collaterals = params.collaterals;
    this.requiredCollateralRatio = params.requiredCollateralRatio;
    this.stableFee = params.stableFee;
    this.expectedBlockTime = params.expectedBlockTime;
    this.liquidationRatio = params.liquidationRatio;
    this.collateralPrice = params.collateralPrice;
    this.debitExchangeRate = params.debitExchangeRate;
    this.collateralPrice = params.collateralPrice;
    this.stableCoinPrice = params.stableCoinPrice;
  }

  /**
   * @property {Fixed18} debitAmount
   */
  get debitAmount (): Fixed18 {
    return debitToUSD(this.debits, this.debitExchangeRate, this.stableCoinPrice);
  }

  /**
   * @property {Fixed18} collateralAmount
   */
  get collateralAmount (): Fixed18 {
    return collateralToUSD(this.collaterals, this.collateralPrice);
  }

  /**
   * @property {Fixed18} collateralRatio
   */
  get collateralRatio (): Fixed18 {
    return calcCollateralRatio(this.collateralAmount, this.debitAmount);
  }

  /**
   * @property {Fixed18} requiredCollateral
   */
  get requiredCollateral (): Fixed18 {
    return calcRequiredCollateral(this.debitAmount, this.requiredCollateralRatio, this.collateralPrice);
  }

  /**
   * @property {Fixed18} stableFeAPR
   */
  get stableFeeAPR (): Fixed18 {
    return calcStableFeeAPR(this.stableFee, this.expectedBlockTime);
  }

  /**
   * @property {Fixed18} liquidationPrice
   */
  get liquidationPrice (): Fixed18 {
    return calcLiquidationPrice(this.collaterals, this.debitAmount, this.liquidationRatio);
  }

  /**
   * @property {Fixed18} canGenerate
   */
  get canGenerate (): Fixed18 {
    // set slippage to 0.000001
    return calcCanGenerate(this.collateralAmount, this.debitAmount, this.requiredCollateralRatio, this.stableCoinPrice, Fixed18.fromNatural(0.000001));
  }

  /**
   * @property {Fixed18} canPayback
   */
  get canPayBack (): Fixed18 {
    return this.debitAmount;
  }
}
