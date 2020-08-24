import { CurrencyId, Rate, OptionRatio, OptionRate, Balance, Moment, AccountId, DebitBalance, ExchangeRate } from '@acala-network/types/interfaces';

export interface DerivedLoanConstants {
  minimumDebitValue: Balance;
  defaultDebitExchangeRate: Rate;
  defaultLiquidationRatio: Rate;
  defaultLiquidationPenalty: Rate;
  expectedBlockTime: Moment;
}

export interface CollateralParams {
  maximumTotalDebitValue: Balance;
  stabilityFee: OptionRate;
  liquidationRatio: OptionRatio;
  liquidationPenalty: OptionRate;
  requiredCollateralRatio: OptionRatio;
}

export interface DerivedLoanType extends Omit<CollateralParams, 'liquidationRatio' | 'liquidationPenalty'> {
  currency: CurrencyId | string;
  debitExchangeRate: Rate;
  liquidationRatio: OptionRatio | ExchangeRate;
  liquidationPenalty: OptionRatio | Rate;
  globalStabilityFee: Rate;
  expectedBlockTime: Rate;
}

export interface DerivedUserLoan {
  currency: CurrencyId | string;
  account: AccountId | string;
  collateral: Balance;
  debit: DebitBalance;
}

export interface DerivedLoanOverView {
  currency: CurrencyId | string;
  totalDebit: DebitBalance;
  totalCollateral: Balance;
}
