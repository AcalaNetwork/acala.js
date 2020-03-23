import { CurrencyId, Rate, Balance, Moment, AccountId } from '@acala-network/types/interfaces/runtime';

export interface DerivedLoanConstants {
  minimumDebitValue: Balance;
  globalStabilityFee: Rate;
  defaultDebitExchangeRate: Rate;
  defaultLiquidationRatio: Rate;
  expectedBlockTime: Moment;
}

export interface DerivedLoanType {
  token: CurrencyId | string;
  debitExchangeRate: Rate;
  liquidationRatio: Rate;
  liquidationPenalty: Rate;
  requiredCollateralRatio: Rate;
  maximumTotalDebitValue: Balance;
  stabilityFee: Rate;
  globalStabilityFee: Rate;
  expectedBlockTime: Rate;
}

export interface DerivedUserLoan {
  token: CurrencyId | string;
  account: AccountId | string;
  collaterals: Balance;
  debits: Balance;
}

export interface DerivedLoanOverView {
  token: CurrencyId | string;
  totalDebit: Balance;
  totalCollateral: Balance;
}
