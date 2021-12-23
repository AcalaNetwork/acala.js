import { Token } from '@acala-network/sdk-core/token';
import { CurrencyId, TradingPair } from '@acala-network/types/interfaces';
import { assert } from '@polkadot/util';
import { AnyApi } from './types';

// class for store token pair
export class TokenPair {
  private token1: Token;
  private token2: Token;
  private origin: [Token, Token];

  static fromCurrencyId(currency: CurrencyId): TokenPair {
    assert(currency.isDexShare, 'TokenPair.fromCurrencyId should receive CurrencyId which is DexShare');

    const [currency1, currency2] = currency.asDexShare;

    return new TokenPair(Token.fromTokenSymbol(currency1 as any), Token.fromTokenSymbol(currency2 as any));
  }

  static fromCurrencies(currency1: CurrencyId, currency2: CurrencyId): TokenPair {
    assert(
      currency1.isToken && currency2.isToken,
      'TokenPair.fromCurrenciesArray should receive CurrencyId which is TokenSymbol'
    );

    return new TokenPair(Token.fromCurrencyId(currency1), Token.fromCurrencyId(currency2));
  }

  static fromTrandingPair(tradingPair: TradingPair): TokenPair {
    const [currency1, currency2] = tradingPair;

    return TokenPair.fromCurrencies(currency1, currency2);
  }

  constructor(token1: Token, token2: Token) {
    assert(!token1.isEqual(token2), "can't create token pair by equal tokens.");

    const [_token1, _token2] = Token.sort(token1, token2);

    this.token1 = _token1;
    this.token2 = _token2;
    this.origin = [token1, token2];
  }

  public getOrigin(): [Token, Token] {
    return this.origin;
  }

  public getPair(): [Token, Token] {
    return [this.token1, this.token2];
  }

  public isEqual(pair: TokenPair, compare?: (token1: Token, token2: Token) => boolean): boolean {
    return pair.token1.isEqual(this.token1, compare) && pair.token2.isEqual(this.token2, compare);
  }

  public toChainData(): [{ Token: string }, { Token: string }] {
    return [this.token1.toChainData() as { Token: string }, this.token2.toChainData() as { Token: string }];
  }

  public toTradingPair(api: AnyApi): TradingPair {
    return api.createType('TradingPair', this.toChainData());
  }
}
