import { CurrencyId, Rate, Balance, Moment, AccountId, DebitBalance } from '@acala-network/types/interfaces';

export interface DerivedLoanConstants {
  minimumDebitValue: Balance;
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
  debits: DebitBalance;
}

export interface DerivedLoanOverView {
  token: CurrencyId | string;
  totalDebit: DebitBalance;
  totalCollateral: Balance;
}
