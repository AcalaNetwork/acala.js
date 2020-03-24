import { FixedU128 } from './fixed-u128';

/**
 * @name debitToStableCoin
 * @description transform debit to stable coin
 * @param {FixedU128} quantity - user loan debit quantity
 * @param {FixedU128} debitExchangeRate - loan debit exchange rate
 * @returns {FixedU128} return the stable coin quantity
 */
export function debitToStableCoin (quantity: FixedU128, debitExchangeRate: FixedU128): FixedU128 {
  return quantity.mul(debitExchangeRate);
}

/**
 * @name stableCoinToDebit
 * @description transform stable coin to debit
 * @param {FixedU128} amount - stable coin amount
 * @param {FixedU128} debitExchangeRate - loan debit exchange rate
 * @returns {FixedU128} return the debit quantity
 */
export function stableCoinToDebit (amount: FixedU128, debitExchangeRate: FixedU128): FixedU128 {
  return debitExchangeRate.isZero ? FixedU128.ZERO : amount.div(debitExchangeRate);
}

/**
 * @name debitToUSD
 * @description transform debit to USD
 * @param {FixedU128} quantity - user loan debit quantity
 * @param {FixedU128} debitExchangeRate - loan debit exchange rate
 * @param {FixedU128} stableCoinPrice - stable coin price
 * @returns {FixedU128} return the debit amount denominated in USD
 */
export function debitToUSD (quantity: FixedU128, debitExchangeRate: FixedU128, stableCoinPrice: FixedU128): FixedU128 {
  return debitToStableCoin(quantity, debitExchangeRate).mul(stableCoinPrice);
}

/**
 * @name USDToDebit
 * @description transform USD to debit
 * @param {FixedU128} amount - USD amount
 * @param {FixedU128} debitExchangeRate - loan debit exchange rate
 * @param {FixedU128} stableCoinPrice - stable coin price
 * @returns {FixedU128} return the debit quantity
 */
export function USDToDebit (amount: FixedU128, debitExchangeRate: FixedU128, stableCoinPrice: FixedU128): FixedU128 {
  return stableCoinPrice.isZero() ? FixedU128.ZERO : stableCoinToDebit(amount.div(stableCoinPrice), debitExchangeRate);
}

/**
 * @name collateralToUSD
 * @description transform collateral to USD
 * @param {FixedU128} quantity - collateral quantity
 * @param {FixedU128} collateralPrice - collateral price
 * @returns {FixedU128} return the collateral amount denominated in USD
 */
export function collateralToUSD (quantity: FixedU128, collateralPrice: FixedU128): FixedU128 {
  return quantity.mul(collateralPrice);
}

/**
 * @name USDToCollateral
 * @description transform USD to collateral
 * @param {FixedU128} amount - USD amount
 * @param {FixedU128} collateralPrice - collateral price
 * @returns {FixedU128} return the collateral quantity
 */
export function USDToCollateral (amount: FixedU128, collateralPrice: FixedU128): FixedU128 {
  return amount.div(collateralPrice);
}

/**
 * @name calcCollateralRatio
 * @description calculate collateral ratio. Equation: collateralRatio = collateralAmount : debitAmount
 * @param {FixedU128} collateralAmount - collateral amount (USD). Equation: collateralAmount = collateral * collateralPrice
 * @param {FixedU128} debitAmount - debit amount (USD). Equation: debitAmount = debit * debitExchangeRate * stableCoinPrice
 * @returns {FixedU128} return collateral ratio
 */
export function calcCollateralRatio (collateralAmount: FixedU128, debitAmount: FixedU128): FixedU128 {
  return debitAmount.isZero() ? FixedU128.ZERO : collateralAmount.div(debitAmount);
}

const YEAR = 365 * 24 * 60 * 60; // second of one year
/**
 * @name calcStableFeeAPR
 * @description calculate stable fee annual percentage rate. Equation: stableFee = (1 + stableFee) ** (yearSecond * 1000 / expectedBlockTime) - 1
 * @param {FixedU128} stableFee - loan stable fee on the chain config
 * @param {number} expectedBlockTime - expected block time on the chain config (precision in milliseconds)
 * @return {FixedU128} return stable fee annual percentage rate
 */
export function calcStableFeeAPR (stableFee: FixedU128, blockTime: number): FixedU128 {
  return FixedU128.fromNatural((1 + stableFee.toNumber()) ** ((YEAR / blockTime) * 1000) - 1);
}

/**
 * @name calcRequiredCollateral
 * @description calculate how many collateral needs. Equation: requiredColalteral = debitAmount * requiredCollateralRatio / collateralPrice
 * @param {FixedU128} debitAmount - debit amount (USD)
 * @param {FixedU128} requiredCollateralRatio - required collateral ratio
 * @param {FixedU128} collateralPrice - collateral price
 * @returns {FixedU128} return the collateral quantity which is required
 */
export function calcRequiredCollateral (debitAmount: FixedU128, requiredCollateralRatio: FixedU128, collateralPrice: FixedU128): FixedU128 {
  if (requiredCollateralRatio.isZero() || collateralPrice.isZero()) {
    return FixedU128.ZERO;
  }
  return debitAmount.mul(requiredCollateralRatio).div(collateralPrice);
}

/**
 * @name calcLiquidationPrice
 * @description calculate liquidation price. Equation: liquidatioPrice = debitAmount * liquidatioRatio / collateralQuantity
 * @param {FixedU128} collateralQuantity - collateral quantity
 * @param {FixedU128} debitAmount - debit amount (USD)
 * @param {FixedU128} liquidationRatio - required liquidation ratio on the chain config
 * @returns {FixedU128} return liquidation price
 */
export function calcLiquidationPrice (collateralQuantity: FixedU128, debitAmount: FixedU128, liquidationRatio: FixedU128): FixedU128 {
  return collateralQuantity.isZero() ? FixedU128.ZERO : debitAmount.mul(liquidationRatio).div(collateralQuantity);
}

/**
 * @name calcCanGenerate
 * @description calculate how many stable coins can generate. Equation: canGenerate = (collateralAmount / requiredCollateralRatio - currentDebitAmount) / stableCoinPrice
 * @param {FixedU128} collateralAmount - collateral amount (USD)
 * @param {FixedU128} currentDebitAmount - current debit amount in the loan (USD)
 * @param {FixedU128} requiredCollateralRatio - loan required collateral ratio on the chain config
 * @param {FixedU128} stableCoinPrice - stable coin price
 * @param {FixedU128=} slippage - slippage amount, because of can generate amount is reduce every block time.
 * @returns {FixedU128} return stable coin quantity which can be generated
 */
export function calcCanGenerate (collateralAmount: FixedU128, currentDebitAmount: FixedU128, requiredCollateralRatio: FixedU128, stableCoinPrice: FixedU128, slippage?: FixedU128): FixedU128 {
  if (requiredCollateralRatio.isZero() || stableCoinPrice.isZero()) {
    return FixedU128.ZERO;
  }
  const result = collateralAmount
    .div(requiredCollateralRatio)
    .sub(currentDebitAmount)
    .div(stableCoinPrice);
  return slippage ? result.sub(slippage) : result;
}

interface LoanParams {
  debits: FixedU128;
  collaterals: FixedU128;
  requiredCollateralRatio: FixedU128;
  stableFee: FixedU128;
  expectedBlockTime: number;
  liquidationRatio: FixedU128;
  collateralPrice: FixedU128;
  stableCoinPrice: FixedU128;
  debitExchangeRate: FixedU128;
}

/**
 * @class Loan
 * @classdesc support more structured api, include loan properties and derived properties
 */
export class Loan {
  public debits: FixedU128;
  public collaterals: FixedU128;
  public requiredCollateralRatio: FixedU128;
  public stableFee: FixedU128;
  public expectedBlockTime: number;
  public liquidationRatio: FixedU128;
  public collateralPrice: FixedU128;
  public stableCoinPrice: FixedU128;
  public debitExchangeRate: FixedU128;

  constructor (params: LoanParams) {
    const ZERO = FixedU128.ZERO;
    this.debits = params.debits || ZERO;
    this.collaterals = params.collaterals || ZERO;
    this.requiredCollateralRatio = params.requiredCollateralRatio || ZERO;
    this.stableFee = params.stableFee || ZERO;
    this.expectedBlockTime = params.expectedBlockTime || 0;
    this.liquidationRatio = params.liquidationRatio || ZERO;
    this.collateralPrice = params.collateralPrice || ZERO;
    this.debitExchangeRate = params.debitExchangeRate || ZERO;
    this.collateralPrice = params.collateralPrice || ZERO;
    this.stableCoinPrice = params.stableCoinPrice || ZERO;
  }

  /**
   * @property {FixedU128} debitAmount
   */
  get debitAmount (): FixedU128 {
    return debitToUSD(this.debits, this.debitExchangeRate, this.stableCoinPrice);
  }

  /**
   * @property {FixedU128} collateralAmount
   */
  get collateralAmount (): FixedU128 {
    return collateralToUSD(this.collaterals, this.collateralPrice);
  }

  /**
   * @property {FixedU128} collateralRatio
   */
  get collateralRatio (): FixedU128 {
    return calcCollateralRatio(this.collateralAmount, this.debitAmount);
  }

  /**
   * @property {FixedU128} stableFeAPR
   */
  get stableFeeAPR (): FixedU128 {
    return calcStableFeeAPR(this.stableFee, this.expectedBlockTime);
  }

  /**
   * @property {FixedU128} liquidationPrice
   */
  get liquidationPrice (): FixedU128 {
    return calcLiquidationPrice(this.collaterals, this.debitAmount, this.liquidationRatio);
  }

  /**
   * @property {FixedU128} canGenerate
   */
  get canGenerate (): FixedU128 {
    // set slippage to 0.000001
    return calcCanGenerate(this.collateralAmount, this.debitAmount, this.requiredCollateralRatio, this.stableCoinPrice, FixedU128.fromNatural(0.000001));
  }

  /**
   * @property {FixedU128} canPayback
   */
  get canPayBack (): FixedU128 {
    return this.debitAmount;
  }
}
