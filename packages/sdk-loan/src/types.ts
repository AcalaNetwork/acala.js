import { Wallet } from '@acala-network/sdk';
import { AnyApi, FixedPointNumber, Token } from '@acala-network/sdk-core';
import { PriceProviderType } from '@acala-network/sdk/wallet/price-provider/types';

export interface LoanSDKParams {
  api: AnyApi;
  wallet: Wallet;
  priceProviderType?: PriceProviderType;
}

export interface LoanType {
  collateral: Token;
  liquidationRatio: FixedPointNumber;
  liquidationPenalty: FixedPointNumber;
  requiredCollateralRatio: FixedPointNumber;
  interestRatePerSec: FixedPointNumber;
  maximumTotalDebitValue: FixedPointNumber;
  stableFeeAPR: number;
  minimumDebitValue: FixedPointNumber;
}

export type LoanTypes = LoanType[];

export interface GlobalLoan {
  type: LoanType;
  debitAmount: FixedPointNumber;
  debitValue: FixedPointNumber;
  collateralAmount: FixedPointNumber;
}

export interface UserLoan {
  address: string;
  type: LoanType;
  debitAmount: FixedPointNumber;
  debitValue: FixedPointNumber;
  collateralAmount: FixedPointNumber;
}

export interface AdjustLoanParams {
  debitAmount?: FixedPointNumber;
  debitValue?: FixedPointNumber;
  collateral?: FixedPointNumber;
}

export enum LoanStatus {
  'WARNING',
  'SAFE',
  'DANGEROUS'
}
