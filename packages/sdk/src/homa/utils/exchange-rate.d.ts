import { FixedPointNumber as FN } from '@acala-network/sdk-core';
export declare function getExchangeRate(totalStaking: FN, totalLiquid: FN, defaultExchangeRate?: FN): FN;
export declare function convertLiquidToStaking(exchangeRate: FN, liquidAmount: FN): FN;
export declare function convertStakingToLiquid(exchangeRate: FN, stakingAmount: FN): FN;
