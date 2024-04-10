import { FixedPointNumber } from '@acala-network/sdk-core';
import { EstimateRedeemResult, HomaEnvironment } from '../types.js';
export declare function getEstimateRedeemResult(env: HomaEnvironment, amount: FixedPointNumber, isFastReddem: boolean): EstimateRedeemResult;
