import { MaybeCurrency, Token } from '@acala-network/sdk-core';
import { Observable } from 'rxjs';

export interface TokenProvider {
  subscribeToken(token: MaybeCurrency): Observable<Token>;
}
