import { MaybeCurrency, Token, TokenType } from '@acala-network/sdk-core';
import { Observable } from 'rxjs';
import { TokenRecord } from '../types.js';
export interface TokenProvider {
    get isReady$(): Observable<boolean>;
    get isReady(): Promise<boolean>;
    subscribeToken(token: MaybeCurrency): Observable<Token>;
    subscribeTokens(types?: TokenType | TokenType[]): Observable<TokenRecord>;
    getToken(token: MaybeCurrency): Token;
    getAllTokens(): TokenRecord;
    getNativeToken(): Token;
}
export interface TokenProviderConfigs {
    kusd2ausd?: boolean;
    ignoreCase?: boolean;
}
