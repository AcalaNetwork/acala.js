import { FixedPointNumber, Token } from '@acala-network/sdk-core';
import { Wallet } from '../../wallet/index.js';
import { Observable } from 'rxjs';
import { PoolPositions } from '../types.js';
export declare function calcDexPriceAndAmountFormPool(target: Token, detail: PoolPositions, wallet: Wallet): Observable<[FixedPointNumber, FixedPointNumber]>;
export declare function calcDexPrice(target: Token, details: PoolPositions[], wallet: Wallet): Observable<FixedPointNumber>;
