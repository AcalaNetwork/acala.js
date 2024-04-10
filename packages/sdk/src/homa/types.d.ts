import { FixedPointNumber } from '@acala-network/sdk-core';
export interface StakingLedger {
    index: number;
    bonded: FixedPointNumber;
    unlocking: {
        value: FixedPointNumber;
        era: number;
    }[];
}
export interface HomaEnvironment {
    totalStaking: FixedPointNumber;
    totalLiquidity: FixedPointNumber;
    exchangeRate: FixedPointNumber;
    toBondPool: FixedPointNumber;
    estimatedRewardRatePerEra: FixedPointNumber;
    apy: number;
    fastMatchFeeRate: FixedPointNumber;
    mintThreshold: FixedPointNumber;
    redeemThreshold: FixedPointNumber;
    stakingSoftCap: FixedPointNumber;
    commissionRate: FixedPointNumber;
    eraFrequency: number;
}
export interface EstimateMintResult {
    pay: FixedPointNumber;
    receive: FixedPointNumber;
    env: HomaEnvironment;
}
export interface EstimateRedeemResult {
    request: FixedPointNumber;
    receive: FixedPointNumber;
    fee: FixedPointNumber;
    canTryFastRedeem: boolean;
    env: HomaEnvironment;
}
export interface Unbonding {
    era: number;
    amount: FixedPointNumber;
}
export interface HomaConvertor {
    convertLiquidToStaking: (amount: FixedPointNumber) => FixedPointNumber;
    convertStakingToLiquid: (amount: FixedPointNumber) => FixedPointNumber;
}
export interface RedeemRequest {
    amount: FixedPointNumber;
    fastRedeem: boolean;
}
export interface UserLiquidityTokenSummary {
    totalUnbonding: FixedPointNumber;
    claimable: FixedPointNumber;
    unbondings: Unbonding[];
    redeemRequest: RedeemRequest;
    currentRelayEra: number;
}
