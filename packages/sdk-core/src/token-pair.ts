import { Token } from '@acala-network/sdk-core/token';
import { CurrencyId, TradingPair } from '@acala-network/types/interfaces';
import { ApiPromise, ApiRx } from '@polkadot/api';
import { assert } from '@polkadot/util';

// class for store token pair
export class TokenPair {
  private token1: Token;
  private token2: Token;
  private origin: [Token, Token];

  static fromCurrencyId(currency: CurrencyId): TokenPair {
    assert(currency.isDexShare, 'TokenPair.fromCurrencyId should receive the currency of DexShare');

    const [currency1, currency2] = currency.asDexShare;

    return new TokenPair(Token.fromTokenSymbol(currency1), Token.fromTokenSymbol(currency2));
  }

  static fromCurrencies(currency1: CurrencyId, currency2: CurrencyId): TokenPair {
    assert(
      currency1.isToken && currency2.isToken,
      'TokenPair.fromCurrenciesArray should receive the currency of Token'
    );

    return new TokenPair(Token.fromCurrencyId(currency1), Token.fromCurrencyId(currency2));
  }

  static fromTrandingPair(tradingPair: TradingPair): TokenPair {
    const [currency1, currency2] = tradingPair;

    return TokenPair.fromCurrencies(currency1, currency2);
  }

  constructor(token1: Token, token2: Token) {
    assert(!token1.isEqual(token2), "can't create token pair by equal tokens.");

    const sorted = Token.sort(token1, token2);

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

  public toDexShare(api: ApiRx | ApiPromise): CurrencyId {
    return api.createType('CurrencyId', { DexShare: [this.token1.symbol, this.token2.symbol] });
  }

  public toTradingPair(api: ApiRx | ApiPromise): TradingPair {
    return api.createType('TradingPair', this.toChainData());
  }
}
