import { FixedPointNumber } from '@acala-network/sdk-core';
import { PoolPositions } from '../types.js';
import { Observable } from 'rxjs';
import { Wallet } from '../../wallet/index.js';
export declare const getPoolTVL: (positions: PoolPositions, wallet: Wallet) => Observable<FixedPointNumber>;
