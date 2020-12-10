import { Token, sortTokens } from '@acala-network/sdk-core/token';

// class for store token pair
export class TokenPair {
  private token1: Token;
  private token2: Token;
  private origin: [Token, Token];

  constructor(token1: Token, token2: Token) {
    if (token1.isEqual(token2)) throw new Error("can't create token pair by equal tokens.");

    const sorted = sortTokens(token1, token2);

    this.token1 = sorted[0];
    this.token2 = sorted[1];
    this.origin = [token1, token2];
  }

  public getOrigin(): [Token, Token] {
    return this.origin;
  }

  public getPair(): [Token, Token] {
    return [this.token1, this.token2];
  }

  public isEqual(pair: TokenPair): boolean {
    return pair.token1.isEqual(this.token1) && pair.token2.isEqual(this.token2);
  }

  public toChainData(): [string | { Token: string }, string | { Token: string }] {
    return [this.token1.toChainData(), this.token2.toChainData()];
  }
}
