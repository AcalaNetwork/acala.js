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
  token: CurrencyId | string;
  debitExchangeRate: Rate;
  liquidationRatio: OptionRatio | ExchangeRate;
  liquidationPenalty: OptionRatio | Rate;
  globalStabilityFee: Rate;
  expectedBlockTime: Rate;
}

export interface DerivedUserLoan {
  token: CurrencyId | string;
  account: AccountId | string;
  collaterals: Balance;
  debits: DebitBalance;
}

export interface DerivedLoanOverView {
  token: CurrencyId | string;
  totalDebit: DebitBalance;
  totalCollateral: Balance;
}
