import { FixedPointNumber, Token } from '@acala-network/sdk-core';
import { Observable } from 'rxjs';
import { BalanceData } from '../types.js';
export interface BalanceAdapter {
    subscribeBalance(token: Token | string, address: string): Observable<BalanceData>;
    getED(token: Token | string): FixedPointNumber;
}
export interface AcalaExpandBalanceAdapter extends BalanceAdapter {
    subscribeIssuance(token: Token): Observable<FixedPointNumber>;
}
