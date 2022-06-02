import { MaybeCurrency, Token, TokenType } from '@acala-network/sdk-core';
import { Observable } from 'rxjs';
import { TokenRecord } from '../type';

export interface TokenProvider {
  get isReady$(): Observable<boolean>;
  get isReady(): Promise<boolean>;
  // subscribe token information
  subscribeToken(token: MaybeCurrency): Observable<Token>;
  // get token information
  getToken(token: MaybeCurrency): Promise<Token>;
  // direct get token information
  __getToken(token: MaybeCurrency): Token;
  // direct get all token
  __getAllTokens(): TokenRecord;
  // get tokens list by type, return all tokens when no params
  subscribeTokens(types?: TokenType | TokenType[]): Observable<TokenRecord>;
}

export interface TokenProviderConfigs {
  kusd2ausd: boolean;
}
