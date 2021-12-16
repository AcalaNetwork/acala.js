import { CurrencyId, TokenSymbol, DexShare, TradingPair } from '@acala-network/types/interfaces';
import primitivesConfig from '@acala-network/type-definitions/primitives';
import { assert } from '@polkadot/util';

import { AnyApi, TokenType } from './types';
import { forceToCurrencyName } from './converter';
import {
  createDexShareName,
  createStableAssetName,
  CurrencyObject,
  FixedPointNumber,
  getCurrencyObject,
  getCurrencyTypeByName,
  unzipDexShareName
} from '.';

export interface StableAsset {
  poolId: number;
  name: string;
  decimal: number;
  assets: string[];
}

export const STABLE_ASSET_POOLS: { [chain: string]: StableAsset[] } = {
  'Mandala Dev': [
    {
      poolId: 0,
      name: 'Taiga DOT-Liquid DOT',
      decimal: 10,
      assets: ['DOT', 'LDOT']
    }
  ]
};

const TOKEN_SORT: Record<string, number> = primitivesConfig.types.TokenSymbol._enum;

interface Configs {
  display?: string; // namae for display
  decimal?: number; // token decimal
  type?: TokenType; // token type
  symbol?: string; // token symbol
  chain?: string;
  minimalBalance?: FixedPointNumber;
}

export class Token {
  readonly name: string;
  readonly symbol: string;
  readonly decimal: number;
  readonly minimalBalance: FixedPointNumber;
  readonly chain: string | undefined;
  readonly type: TokenType;
  readonly display: string;

  constructor(name: string, configs?: Configs) {
    this.name = name;
    this.decimal = configs?.decimal || 18;
    this.minimalBalance = configs?.minimalBalance || FixedPointNumber.ZERO;
    this.chain = configs?.chain;
    this.type = configs?.type || TokenType.BASIC;
    this.symbol = configs?.symbol || name;
    this.display = configs?.display || name;
  }

  get isTokenSymbol(): boolean {
    return this.type === TokenType.BASIC;
  }

  get isDexShare(): boolean {
    return this.type === TokenType.DEX_SHARE;
  }

  get isERC20(): boolean {
    return this.type === TokenType.ERC20;
  }

  get isStableAssetPoolToken(): boolean {
    return this.type === TokenType.STABLE_ASSET_POOL_TOKEN;
  }

  get isLiquidCroadloan(): boolean {
    return this.type === TokenType.LIQUID_CROADLOAN;
  }

  get isForeignAsset(): boolean {
    return this.type === TokenType.FOREIGN_ASSET;
  }

  static create(name: string, configs?: Configs): Token {
    return new Token(name, configs);
  }

  /**
   * @name fromCurrencyName
   * @description create token from curreync name
   */
  static fromCurrencyName(name: string, configs?: Configs): Token {
    const type = getCurrencyTypeByName(name);

    return new Token(name, { ...configs, type });
  }

  /**
   * @name fromCurrencyId
   * @description create token from currency id
   */
  static fromCurrencyId(currency: CurrencyId, configs?: Configs): Token {
    return this.fromCurrencyName(forceToCurrencyName(currency), configs);
  }

  static fromTokenSymbol(token: TokenSymbol, configs?: Configs): Token {
    return this.fromCurrencyName(token.toString(), configs);
  }

  /* create DexShareToken by Token array */
  static fromTokens(token1: Token, token2: Token): Token {
    const [_token1, _token2] = this.sort(token1, token2);

    // set token1 decimal as decimal;
    const decimal = _token1.decimal;

    return new Token(createDexShareName(_token1.name, _token2.name), { decimal, type: TokenType.DEX_SHARE });
  }

  /* create DexShareToken form CurrencyId array */
  static fromCurrencies(currency1: CurrencyId, currency2: CurrencyId, decimal?: number | [number, number]): Token {
    const decimal1 = Array.isArray(decimal) ? decimal[0] : decimal;
    const decimal2 = Array.isArray(decimal) ? decimal[1] : decimal;

    const token1 = Token.fromCurrencyId(currency1, { decimal: decimal1 });
    const token2 = Token.fromCurrencyId(currency2, { decimal: decimal2 });

    return Token.fromTokens(token1, token2);
  }

  /* create DexShareToken from TokenSymbol array */
  static fromTokenSymbols(currency1: TokenSymbol, currency2: TokenSymbol, decimal?: number | [number, number]): Token {
    const decimal1 = Array.isArray(decimal) ? decimal[0] : decimal;
    const decimal2 = Array.isArray(decimal) ? decimal[1] : decimal;

    const token1 = Token.fromTokenSymbol(currency1, { decimal: decimal1 });
    const token2 = Token.fromTokenSymbol(currency2, { decimal: decimal2 });

    return Token.fromTokens(token1, token2);
  }

  /** Create StableAssetPoolToken by stable asset pool ID. Chain must be provided/ */
  static fromStableAssetPool(chain: string, poolId: number): Token {
    return new Token(createStableAssetName(poolId), {
      decimal: STABLE_ASSET_POOLS[chain][poolId].decimal,
      type: TokenType.STABLE_ASSET_POOL_TOKEN
    });
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
      return api.createType('AcalaPrimitivesCurrencyCurrencyId', this.toChainData());
    } catch (e) {
      throw new Error(`can't convert ${this.toChainData()} to Currency Id`);
    }
  }

  public toTradingPair(api: AnyApi): TradingPair {
    assert(this.isDexShare, 'the currency is not a dex share');

    try {
      return api.createType('AcalaPrimitivesTradingPair', [
        ...unzipDexShareName(this.name).map((i) => getCurrencyObject(i))
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

  public toChainData(): CurrencyObject {
    return getCurrencyObject(this.name);
  }

  public toString(): string {
    return this.name;
  }
}
