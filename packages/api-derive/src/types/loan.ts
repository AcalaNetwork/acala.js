import {
  CurrencyId,
  Rate,
  OptionRatio,
  OptionRate,
  AccountId,
  Balance,
  ExchangeRate
} from '@acala-network/types/interfaces';

export interface DerivedLoanConstants {
  minimumDebitValue: Balance;
  defaultDebitExchangeRate: Rate;
  defaultLiquidationRatio: Rate;
  defaultLiquidationPenalty: Rate;
}

export interface CollateralParams {
  maximumTotalDebitValue: Balance;
  interestRatePerSec: OptionRate;
  liquidationRatio: OptionRatio;
  liquidationPenalty: OptionRate;
  requiredCollateralRatio: OptionRatio;
}

export interface DerivedLoanType extends Omit<CollateralParams, 'liquidationRatio' | 'liquidationPenalty'> {
  currency: CurrencyId | string;
  debitExchangeRate: Rate;
  liquidationRatio: OptionRatio | ExchangeRate;
  liquidationPenalty: OptionRatio | Rate;
  globalInterestRatePerSec: Rate;
}

export interface DerivedUserLoan {
  currency: CurrencyId | string;
  account: AccountId | string;
  collateral: Balance;
  debit: Balance;
}

export interface DerivedLoanOverView {
  currency: CurrencyId | string;
  totalDebit: Balance;
  totalCollateral: Balance;
}
