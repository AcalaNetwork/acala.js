import { FixedPointNumber, Token } from '@acala-network/sdk-core';
import { IncentivePool, RewardAPR } from '../types.js';
/**
 * @name getAPR
 * @param collateral the pool collateral
 * @param accumulatePeriod reward accumulate period
 * @param prices prices of all required tokens
 * @param share total share of the pool
 * @param deductionRate deduction rate of the pool
 * @param rewardConfigs reward configs of the pool
 */
export declare function getAPR(collateral: Token, accumulatePeriod: number, prices: Record<string, FixedPointNumber>, share: FixedPointNumber, deductionRate: FixedPointNumber, rewardConfigs: IncentivePool['rewardTokensConfig']): RewardAPR;
