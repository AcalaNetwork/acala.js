import { FixedPointNumber } from '@acala-network/sdk-core';
import { EstimateRemoveLiquidityResult, PoolDetail } from '../types.js';
export declare function getEstimateRemoveLiquidityResult(poolDetail: PoolDetail, removeShare: FixedPointNumber, slippage: number): EstimateRemoveLiquidityResult;
