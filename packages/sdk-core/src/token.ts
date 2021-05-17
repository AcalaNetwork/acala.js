import { CurrencyId, TokenSymbol, DexShare, TradingPair } from '@acala-network/types/interfaces';
import primitivesConfig from '@acala-network/type-definitions/primitives';
import { assert } from '@polkadot/util';

import { AnyApi } from './types';

const TOKEN_SORT: Record<string, number> = primitivesConfig.types.TokenSymbol._enum;

interface TokenOpts {
  decimal?: number;
  isDexShare?: boolean;
  isTokenSymbol?: boolean;
  isERC20?: boolean;
}

export class Token {
  readonly name: string;
  readonly decimal: number;
  readonly isDexShare: boolean;
  readonly isTokenSymbol: boolean;
  readonly isERC20: boolean;

  constructor(name: string, options?: TokenOpts) {
    this.name = name;
    this.decimal = options?.decimal || 18;
    this.isDexShare = options?.isDexShare || false;
    this.isTokenSymbol = options?.isTokenSymbol || false;
    this.isERC20 = options?.isERC20 || false;
  }

  static fromCurrencyId(currency: CurrencyId, decimal?: number | number[]): Token {
    const _decimal = Array.isArray(decimal) ? decimal.sort().reverse()[0] : decimal;

    if (currency.isDexShare) {
      return new Token(`${currency.asDexShare[0].toString()}-${currency.asDexShare[1].toString()}`, {
        decimal: _decimal,
        isDexShare: true,
        isTokenSymbol: false,
        isERC20: false
      });
    }

    if (currency.isToken) {
      return new Token(`${currency.asToken.toString()}`, {
        decimal: _decimal,
        isDexShare: false,
        isTokenSymbol: true,
        isERC20: false
      });
    }

    if (currency.isErc20) {
      return new Token(`${currency.asErc20.toString()}`, {
        decimal: _decimal,
        isDexShare: false,
        isTokenSymbol: false,
        isERC20: true
      });
    }

    throw new Error(`can't construct from CurrencyId`);
  }

  static fromTokenSymbol(token: TokenSymbol, decimal?: number): Token {
    return new Token(token.toString(), {
      decimal,
      isDexShare: false,
      isTokenSymbol: true,
      isERC20: false
    });
  }

  static fromTokenName(name: string, options?: TokenOpts): Token {
    return new Token(name, options);
  }

  static fromTokens(token1: Token, token2: Token): Token {
    const decimal = token1.decimal > token2.decimal ? token1.decimal : token2.decimal;

    return new Token(`${token1.name}-${token2.name}`, {
      decimal,
      isDexShare: true,
      isTokenSymbol: false,
      isERC20: false
    });
  }

  static sort(...tokens: Token[]): Token[] {
    const result = [...tokens];

    return result.sort((a, b) => TOKEN_SORT[a.name] - TOKEN_SORT[b.name]);
  }

  public toCurrencyId(api: AnyApi): CurrencyId {
    try {
      return api.createType('CurrencyId', this.toChainData());
    } catch (e) {
      throw new Error(`can't convert to CurrencyId`);
    }
  }

  public toTradingPair(api: AnyApi): TradingPair {
    if (!this.isDexShare) throw new Error(`can't convert to TradingPair`);

    try {
      return api.createType('TradingPair', [this.name.split('-').map((i) => ({ token: i }))]);
    } catch (e) {
      throw new Error(`can't convert to TradingPair`);
    }
  }

  public toDexShare(api: AnyApi): DexShare {
    try {
      assert(this.isDexShare, 'the currency is not a dex share');

      return api.createType('DexShare', this.toChainData());
    } catch (e) {
      throw new Error(`can't convert to DexShare`);
    }
  }

  public toTokenSymbol(api: AnyApi): TokenSymbol {
    try {
      assert(this.isTokenSymbol, 'the currency is not a token symbol');

      return api.createType('TokenSymbol', this.name);
    } catch (e) {
      throw new Error(`can't convert to DexShare`);
    }
  }

  public clone(): Token {
    return new Token(this.name, {
      decimal: this.decimal,
      isTokenSymbol: this.isTokenSymbol,
      isERC20: this.isERC20,
      isDexShare: this.isDexShare
    });
  }

  public isEqual(target: Token, compair?: (token1: Token, token2: Token) => boolean): boolean {
    if (compair) {
      return compair(this, target);
    }
    let temp = this.name === target.name;

    if (this.decimal || target.decimal) {
      temp = temp && this.decimal === target.decimal;
    }

    if (this.isDexShare || target.isDexShare) {
      temp = temp && this.isDexShare === target.isDexShare;
    }

    if (this.isTokenSymbol || target.isTokenSymbol) {
      temp = temp && this.isTokenSymbol === target.isTokenSymbol;
    }

    if (this.isERC20 || target.isERC20) {
      temp = temp && this.isERC20 === target.isERC20;
    }

    return temp;
  }

  public toChainData(): { Token: string } | { DexShare: [string, string] } | { ERC20: string } {
    if (this.isDexShare) {
      return { DexShare: this.name.split('-').sort((i, j) => TOKEN_SORT[i] - TOKEN_SORT[j]) as [string, string] };
    }

    if (this.isERC20) {
      return { ERC20: this.name };
    }

    return { Token: this.name };
  }

  public toString(): string {
    return this.name;
  }
}
