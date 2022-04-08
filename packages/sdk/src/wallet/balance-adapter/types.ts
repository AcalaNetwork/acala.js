import { Token } from '@acala-network/sdk-core';
import { Observable } from 'rxjs';
import { BalanceData } from '../type';

export interface BalanceAdapter {
  subscribeBalance(token: Token, address: string): Observable<BalanceData>;
}
