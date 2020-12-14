import { CHAIN, DexShare, TokenSymbol } from '@acala-network/sdk-core/token';
import { CurrencyId } from '@acala-network/types/interfaces';
import { assert } from './utils';


const TOKEN_WEIGHT_LIST: Record<string, number> = {
  ACA: 0,
  AUSD: 1,
  DOT: 2,
  XBTC: 3,
  LDOT: 4,
  RENBTC: 5
};

export function sortTokens(...tokens: TokenSymbol[]): TokenSymbol[] {
  return tokens.sort((a, b) => (TOKEN_WEIGHT_LIST[a.symbol] ?? 0) - (TOKEN_WEIGHT_LIST[b.symbol] ?? 0));
}

export class TokenPair {
  private token1: TokenSymbol;
  private token2: TokenSymbol;
  private oiginalSort: [TokenSymbol, TokenSymbol];

  constructor(token1: TokenSymbol, token2: TokenSymbol) {
    assert(!token1.isEqual(token2), "can't create TokenPair through equal tokens.");

    const sorted = sortTokens(token1, token2);

    this.token1 = sorted[0];
    this.token2 = sorted[1];
    this.oiginalSort = [token1, token2];
  }

  public static fromTokenSymbols (token1: TokenSymbol, token2: TokenSymbol): TokenPair {
    return new TokenPair(token1, token2);
  }

  public static fromDexShare (token: DexShare): TokenPair {
    return token.toTokenPare();
  }

  public static fromCurrencyId (currency: CurrencyId, chain: CHAIN, precision = 18): TokenPair {
    return DexShare.fromCurrencyId(currency, chain, precision).toTokenPare();
  }

  public getOrigin(): [TokenSymbol, TokenSymbol] {
    return this.oiginalSort;
  }

  public getPair(): [TokenSymbol, TokenSymbol] {
    return [this.token1, this.token2];
  }

  public isEqual(pair: TokenPair) {
    return pair.token1.isEqual(this.token1) && pair.token2.isEqual(this.token2);
  }

  public toChainData() {
    return [this.token1.toChainData(), this.token2.toChainData()];
  }
}