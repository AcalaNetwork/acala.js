import { CurrencyId, TokenSymbol, DexShare, TradingPair } from '@acala-network/types/interfaces';
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
import { sortTokenByName } from './sort-token';

export interface StableAsset {
  poolId: number;
  name: string;
  decimals: number;
  assets: string[];
}

export const STABLE_ASSET_POOLS: { [chain: string]: StableAsset[] } = {
  // Mandala testnet
  'Mandala Dev': [
    {
      poolId: 0,
      name: 'taiKSM',
      decimals: 12,
      assets: ['KSM', 'LKSM']
    }
  ],
  // Mandala
  'Acala Mandala TC7': [
    {
      poolId: 0,
      name: 'taiKSM',
      decimals: 12,
      assets: ['KSM', 'LKSM']
    }
  ],
  // Karura testnet
  'Acala Karura Dev': [
    {
      poolId: 0,
      name: 'taiKSM',
      decimals: 12,
      assets: ['KSM', 'LKSM']
    }
  ],
  // Karura
  Karura: [
    {
      poolId: 0,
      name: 'taiKSM',
      decimals: 12,
      assets: ['KSM', 'LKSM']
    }
  ]
};

interface Configs {
  display?: string; // namae for display
  decimals?: number; // token decimals
  decimal?: number; // token decimals
  type?: TokenType; // token type
  chain?: string;
  symbol?: string;
  detail?: { id: number };
  ed?: FixedPointNumber;
}

export class Token {
  readonly name: string;
  readonly symbol: string;
  readonly decimals: number;
  readonly decimal: number;
  readonly ed: FixedPointNumber;
  readonly chain: string | undefined;
  readonly type: TokenType;
  readonly display: string;
  readonly pair?: [Token, Token];

  constructor(name: string, configs?: Configs) {
    this.name = name;
    this.decimals = configs?.decimals || configs?.decimal || 18;
    this.decimal = this.decimals;
    this.ed = configs?.ed || FixedPointNumber.ZERO;
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

    // set token1 decimals as decimals;
    const decimals = _token1.decimals;
    const ed = _token1.ed;

    return new Token(createDexShareName(_token1.name, _token2.name), {
      decimals,
      type: TokenType.DEX_SHARE,
      ed
    });
  }

  /* create DexShareToken form CurrencyId array */
  static fromCurrencies(currency1: CurrencyId, currency2: CurrencyId, decimals?: number | [number, number]): Token {
    const decimals1 = Array.isArray(decimals) ? decimals[0] : decimals;
    const decimals2 = Array.isArray(decimals) ? decimals[1] : decimals;

    const token1 = Token.fromCurrencyId(currency1, { decimals: decimals1 });
    const token2 = Token.fromCurrencyId(currency2, { decimals: decimals2 });

    return Token.fromTokens(token1, token2);
  }

  /* create DexShareToken from TokenSymbol array */
  static fromTokenSymbols(currency1: TokenSymbol, currency2: TokenSymbol, decimals?: number | [number, number]): Token {
    const decimals1 = Array.isArray(decimals) ? decimals[0] : decimals;
    const decimals2 = Array.isArray(decimals) ? decimals[1] : decimals;

    const token1 = Token.fromTokenSymbol(currency1, { decimals: decimals1 });
    const token2 = Token.fromTokenSymbol(currency2, { decimals: decimals2 });

    return Token.fromTokens(token1, token2);
  }

  /** Create StableAssetPoolToken by stable asset pool ID. Chain must be provided/ */
  static fromStableAssetPool(chain: string, poolId: number, configs?: Configs): Token {
    return new Token(createStableAssetName(poolId), {
      decimals: STABLE_ASSET_POOLS[chain][poolId].decimals,
      type: TokenType.STABLE_ASSET_POOL_TOKEN,
      ...configs
    });
  }

  static sortTokenNames(...names: string[]): string[] {
    const result = [...names];

    return result.sort((a, b) => {
      return sortTokenByName(a, b);
    });
  }

  static sortCurrencies(...currencies: CurrencyId[]): CurrencyId[] {
    const result = [...currencies];
    const nameMap = Object.fromEntries(result.map((item) => [forceToCurrencyName(item), item]));

    return Object.keys(nameMap)
      .sort((a, b) => sortTokenByName(a, b))
      .map((name) => nameMap[name]);
  }

  static sort(...tokens: Token[]): Token[] {
    const result = [...tokens];
    const nameMap = Object.fromEntries(result.map((item) => [item.name, item]));

    return Object.keys(nameMap)
      .sort((a, b) => sortTokenByName(a, b))
      .map((name) => nameMap[name]);
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
