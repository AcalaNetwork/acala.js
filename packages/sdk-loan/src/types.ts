import { Wallet } from '@acala-network/sdk';
import { AnyApi, FixedPointNumber, Token } from '@acala-network/sdk-core';
import { Observable } from 'rxjs';

export interface LoanSDKParams {
  api: AnyApi;
  wallet: Wallet;
}

export interface LoanType {
  collateral: Token;
  debitExchangeRate: FixedPointNumber;
  liquidationRatio: FixedPointNumber;
  requiredCollateralRatio: FixedPointNumber;
  interestRatePerSec: FixedPointNumber;
  maximumTotalDebitValaue: FixedPointNumber;
  stableFeeAPR: FixedPointNumber;
}

export type LoanTypes = LoanType[];

export interface GlobalLoan {
  type: LoanType;
  totalDebitAmount: FixedPointNumber;
  totalDebitValue: FixedPointNumber;
  totalCollateral: FixedPointNumber;
}

export interface UserLoanStats {
  type: LoanType;
  debitAmount: FixedPointNumber;
  debitValue: FixedPointNumber;
  collateralAmount: FixedPointNumber;
  collateralValue: FixedPointNumber;
  collateralRatio: FixedPointNumber;
  requiredCollateral: FixedPointNumber;
  liquidationPrice: FixedPointNumber;
  liquidationRatio: FixedPointNumber;
}

export interface LoanSDKInterface {
  getLoanTypes: () => Promise<LoanTypes>;
  subscribeGlobalLoan: (collateral: Token) => Observable<GlobalLoan>;
  subscribeUesrLoan: (address: string, collateral: Token) => Observable<UserLoanStats>;
}

export interface AdjustLoanParams {
  debitAmount?: FixedPointNumber;
  debitValue?: FixedPointNumber;
  collateral?: FixedPointNumber;
}

export interface LoanCalculator {
  adjust: (loan: UserLoanStats, params: AdjustLoanParams) => UserLoanStats;
}
