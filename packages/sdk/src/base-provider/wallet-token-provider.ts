import { MaybeCurrency, Token } from '@acala-network/sdk-core';
import { Observable } from 'rxjs';
import { Wallet } from '..';
import { TokenProvider } from './types';

export class WalletTokenProvider implements TokenProvider {
  private wallet: Wallet;

  constructor(wallet: Wallet) {
    this.wallet = wallet;
  }

  subscribeToken(name: MaybeCurrency): Observable<Token> {
    return this.wallet.subscribeToken(name);
  }
}
