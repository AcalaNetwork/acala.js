import { Codec } from "@polkadot/types/types";

export interface DerivedLoanConstants {
    minimumDebitValue: Codec;
    globalStabilityFee: Codec;
    defaultDebitExchangeRate: Codec;
    defaultLiquidationRatio: Codec;
    expectedBlockTime: Codec;
}

export interface DerivedLoanType {
    asset: string;
    debitExchangeRate: Codec;
    liquidationRatio: Codec;
    liquidationPenalty: Codec;
    requiredCollateralRatio: Codec;
    maximumTotalDebitValue: Codec;
    stabilityFee: Codec;
    globalStabilityFee: Codec;
    expectedBlockTime: Codec;
}

export interface DerivedLoan {
    asset: string;
    account: string;
    collateral: Codec;
    debit: Codec;
    type: DerivedLoanType;
}

export interface DerivedLoanOverView {
    asset: string;
    totalDebit: Codec;
    totalCollateral: Codec;
    type: DerivedLoanType,
}