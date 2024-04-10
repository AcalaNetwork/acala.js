import { FixedPointNumber, Token } from '@acala-network/sdk-core';
import { EstimateAddLiquidityResult, PoolDetail } from '../types.js';
export declare function getEstimateAddLiquidityResult(liquidityDetail: PoolDetail, tokenA: Token, _tokenB: Token, maxAmountA: FixedPointNumber, maxAmountB: FixedPointNumber, slippage: number): EstimateAddLiquidityResult;
