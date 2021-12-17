import { FixedPointNumber, Token } from '@acala-network/sdk-core';
import { Observable } from 'rxjs';

export type VaultParams = {
  debitExchangeRate: FixedPointNumber;
  maximumTotalDebitValue: FixedPointNumber;
  liquidationRatio: FixedPointNumber;
  requiredCollateralRatio: FixedPointNumber;
  interestRatePerSec: FixedPointNumber; // interest rate + global rate
};

export interface AmountData {
  value: FixedPointNumber;
  amount: FixedPointNumber;
}

export interface GlobalVault {
  type: Token; // the vault type
  totalCollateral: AmountData; // total collateral information
  totalDebit: AmountData; // total debit information
  remainedDebit: AmountData; // the remained debit gap of the type vault
}

export interface VaultData {
  type: Token; // the collateral type
  owner: string; // the owner of vault
  params: VaultParams; // the type of vault params
  global: GlobalVault; // the type of vault global information
  debit: AmountData; // the debit information of the vault
  collateral: AmountData; // the collateral information of the vault
  price: FixedPointNumber; // oracle price
  collateralRatio: FixedPointNumber; // the collateral ratio of the vault
  requiredCollateral: AmountData; // the required collateral
  stableFeeAPR: FixedPointNumber; // the APR of stable fee
  liquidationPrice: FixedPointNumber; // the price when liquidation occurred
  liquidationRatio: FixedPointNumber; // the collateral rate when liquidation occurred
  maxGenerate: AmountData; // the max debit amount information can generate
  canGenerate: AmountData; // currently, the debit amount information of can generate
  canPayBack: FixedPointNumber; // equal to debit value
  canWithdraw: FixedPointNumber; // the collateral amount which can withdraw
}

export interface VaultsOverview {
  vaults: VaultData[];
  totalCollateral: FixedPointNumber; // the total value of all collaterals
  totalDebit: FixedPointNumber; // the total debit of all collaterals
}

export type PriceProvider = (token: Token) => Observable<FixedPointNumber> | Promise<FixedPointNumber>;
