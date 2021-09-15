import { FixedPointNumber as FN, MaybeAccount, MaybeCurrency } from '@acala-network/sdk-core';

export interface LoanParams {
  // the debit exchange rate
  debitExchange: FN;
  // interest rate
  interestRatePerSec: FN;
  // liquidition ratio
  liquidationRatio: FN;
  // required collateral ratio
  requiredCollateralRatio: FN;
  // stable fee apr
  stableFeeAPR: FN;
}

export interface LoanPosition {
  // the position type
  type: MaybeCurrency;
  // the position owner
  owner: MaybeAccount;
  // loan params
  params: LoanParams;
  // loan position detail
  position: {
    // the debit amount
    debitAmount: FN;
    // the debit value (amount * exchange rate)
    debitValue: FN;
    // the collateral amount
    collateralAmount: FN;
    // the collateral value (amount * price)
    collateralValue: FN;
    // collateral ratio
    collateralRatio: FN;
  };
  // the max stable amount can generate
  maxGenerate: FN;
  // the max collateral amount can withdrawn
  maxWithdrawn: FN;
  // the max stable amount can payback
  maxPayback: FN;
}
