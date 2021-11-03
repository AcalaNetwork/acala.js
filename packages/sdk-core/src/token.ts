import { CurrencyId, TokenSymbol, DexShare, TradingPair } from '@acala-network/types/interfaces';
import primitivesConfig from '@acala-network/type-definitions/primitives';
import { assert } from '@polkadot/util';

import { AnyApi } from './types';
import { createLPCurrencyName, forceToCurrencyIdName, getLPCurrenciesFormName } from './converter';

const TOKEN_SORT: Record<string, number> = primitivesConfig.types.TokenSymbol._enum;

interface TokenOpts {
  decimal?: number;
  isDexShare?: boolean;
  isTokenSymbol?: boolean;
  isERC20?: boolean;
  isStableAssetPoolToken?: boolean;
  chain?: string;
}

export class Token {
  readonly name: string;
  readonly decimal: number;
  readonly isDexShare: boolean;
  readonly isTokenSymbol: boolean;
  readonly isERC20: boolean;
  readonly isStableAssetPoolToken: boolean;
  readonly chain: string | undefined;

  constructor(name: string, options?: TokenOpts) {
    this.name = name;
    this.decimal = options?.decimal || 18;
    this.isDexShare = options?.isDexShare || false;
    this.isTokenSymbol = options?.isTokenSymbol || false;
    this.isERC20 = options?.isERC20 || false;
    this.isStableAssetPoolToken = options?.isStableAssetPoolToken || false;
    this.chain = options?.chain;
  }

  static fromCurrencyId(currency: CurrencyId, decimal?: number): Token {
    if (currency.isDexShare) {
      // resort the Currencies of DexShare
      const name = forceToCurrencyIdName(currency);
      const [token1, token2] = Token.sortTokenNames(...getLPCurrenciesFormName(name));

      return new Token(createLPCurrencyName(token1, token2), {
        decimal: decimal,
        isDexShare: true
      });
    }

    if (currency.isToken) {
      return new Token(forceToCurrencyIdName(currency), {
        decimal: decimal,
        isTokenSymbol: true
      });
    }

    if (currency.isErc20) {
      return new Token(forceToCurrencyIdName(currency), {
        decimal: decimal,
        isERC20: true
      });
    }

    if (currency.isStableAssetPoolToken) {
      return new Token(forceToCurrencyIdName(currency), {
        decimal: decimal,
        isStableAssetPoolToken: true
      });
    }

    throw new Error(`can't construct from CurrencyId`);
  }

  static fromTokenSymbol(token: TokenSymbol, decimal?: number): Token {
    return new Token(token.toString(), {
      decimal,
      isTokenSymbol: true
    });
  }

  static fromTokenName(name: string, options?: TokenOpts): Token {
    return new Token(name, options);
  }

  /* create DexShareToken by Token array */
  static fromTokens(token1: Token, token2: Token, decimal?: number): Token {
    const [_token1, _token2] = this.sort(token1, token2);

    // set token1 decimal as decimal;
    const _decimal = decimal || _token1.decimal;

    return new Token(createLPCurrencyName(_token1.name, _token2.name), {
      decimal: _decimal,
      isDexShare: true
    });
  }

  /* create DexShareToken by CurrencyId array */
  static fromCurrencies(currency1: CurrencyId, currency2: CurrencyId, decimal?: number | [number, number]): Token {
    const decimal1 = Array.isArray(decimal) ? decimal[0] : decimal;
    const decimal2 = Array.isArray(decimal) ? decimal[1] : decimal;

    const token1 = Token.fromCurrencyId(currency1, decimal1);
    const token2 = Token.fromCurrencyId(currency2, decimal2);

    return Token.fromTokens(token1, token2);
  }

  /* create DexShareToken by TokenSymbol array */
  static fromTokenSymbols(currency1: TokenSymbol, currency2: TokenSymbol, decimal?: number | [number, number]): Token {
    const decimal1 = Array.isArray(decimal) ? decimal[0] : decimal;
    const decimal2 = Array.isArray(decimal) ? decimal[1] : decimal;

    const token1 = Token.fromTokenSymbol(currency1, decimal1);
    const token2 = Token.fromTokenSymbol(currency2, decimal2);

    return Token.fromTokens(token1, token2);
  }

  static sortTokenNames(...names: string[]): string[] {
    const result = [...names];

    return result.sort((a, b) => TOKEN_SORT[a] - TOKEN_SORT[b]);
  }

  static sortCurrencies(...currencies: CurrencyId[]): CurrencyId[] {
    const result = [...currencies];

    // FIXME: sort currencies should handle ERC20 and DexShare
    for (const item of currencies) {
      assert(item.isToken, `sortCurrencies doesn't support ERC20 and DexShare yet.`);
    }

    return result.sort((a, b) => TOKEN_SORT[a.asToken.toString()] - TOKEN_SORT[b.asToken.toString()]);
  }

  static sort(...tokens: Token[]): Token[] {
    const result = [...tokens];

    return result.sort((a, b) => TOKEN_SORT[a.name] - TOKEN_SORT[b.name]);
  }

  public toCurrencyId(api: AnyApi): CurrencyId {
    try {
      return api.createType('CurrencyId', this.toChainData());
    } catch (e) {
      throw new Error(`can't convert ${this.toChainData()} to Currency Id`);
    }
  }

  public toTradingPair(api: AnyApi): TradingPair {
    assert(this.isDexShare, 'the currency is not a dex share');

    try {
      return api.createType('TradingPair', [
        Token.sortTokenNames(...getLPCurrenciesFormName(this.name)).map((i) => ({ token: i }))
      ]);
    } catch (e) {
      throw new Error(`can't convert ${this.toChainData()} to Trading Pair`);
    }
  }

  public toDexShare(api: AnyApi): DexShare {
    try {
      assert(this.isDexShare, 'the token is not a dexShare');

      return api.createType('DexShare', this.toChainData());
    } catch (e) {
      throw new Error(`can't convert ${this.toChainData()} to DexShare`);
    }
  }

  public toTokenSymbol(api: AnyApi): TokenSymbol {
    try {
      assert(this.isTokenSymbol, 'the currency is not a token symbol');

      return api.createType('TokenSymbol', this.name);
    } catch (e) {
      throw new Error(`can't convert ${this.toChainData()} to Token Symbol`);
    }
  }

  public clone(): Token {
    return new Token(this.name, { ...this });
  }

  public isEqual(target: Token, compare?: (token1: Token, token2: Token) => boolean): boolean {
    if (compare) {
      return compare(this, target);
    }

    return this.name === target.name;
  }

  public toChainData():
    | { Token: string }
    | { DexShare: [{ Token: string }, { Token: string }] }
    | { ERC20: string }
    | { StableAssetPoolToken: string } {
    if (this.isDexShare) {
      return {
        DexShare: (
          getLPCurrenciesFormName(this.name).sort((i, j) => TOKEN_SORT[i] - TOKEN_SORT[j]) as [string, string]
        ).map((item) => ({ Token: item })) as [{ Token: string }, { Token: string }]
      };
    }

    if (this.isERC20) {
      return { ERC20: this.name };
    }

    if (this.isStableAssetPoolToken) {
      return { StableAssetPoolToken: this.name };
    }

    return { Token: this.name };
  }

  public toString(): string {
    return this.name;
  }
}
