import { MaybeCurrency, Token, TokenType } from '@acala-network/sdk-core';
import { Observable } from 'rxjs';
import { TokenRecord } from '../types';

export interface TokenProvider {
  get isReady$(): Observable<boolean>;
  get isReady(): Promise<boolean>;
  // subscribe token information
  subscribeToken(token: MaybeCurrency): Observable<Token>;
  // get tokens list by type, return all tokens when no params
  subscribeTokens(types?: TokenType | TokenType[]): Observable<TokenRecord>;
  // direct get token information
  getToken(token: MaybeCurrency): Token;
  // direct get all token
  getAllTokens(): TokenRecord;
}

export interface TokenProviderConfigs {
  kusd2ausd?: boolean;
  ignoreCase?: boolean;
}
