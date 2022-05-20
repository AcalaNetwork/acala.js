import { assert } from '@polkadot/util';

import { AnyApi, CurrencyObject, TokenType } from './types';
import {
  createDexShareName,
  createStableAssetName,
  forceToCurrencyName,
  getCurrencyObject,
  getCurrencyTypeByName,
  unzipDexShareName
} from './converter';
import { sortTokenByName } from './sort-token';
import { FixedPointNumber } from './fixed-point-number';
import {
  AcalaPrimitivesCurrencyCurrencyId,
  AcalaPrimitivesCurrencyDexShare,
  AcalaPrimitivesCurrencyTokenSymbol,
  AcalaPrimitivesTradingPair
} from '@acala-network/types/interfaces/types-lookup';

export interface StableAsset {
  poolId: number;
  name: string;
  decimals: number;
  assets: string[];
}

export const STABLE_ASSET_POOLS: { [chain: string]: StableAsset[] } = {
  // Mandala
  'Acala Mandala TC7': [
    {
      poolId: 0,
      name: 'taiKSM',
      decimals: 12,
      assets: ['KSM', 'LKSM']
    },
    {
      poolId: 1,
      name: '3USD',
      decimals: 12,
      assets: ['AUSD', 'erc20://0x5f8e26facc23fa4cbd87b8d9dbbd33d5047abde1', 'fa://0']
    },
    {
      poolId: 2,
      name: 'tDOT',
      decimals: 10,
      assets: ['DOT', 'LDOT']
    }
  ],
  // Karura
  Karura: [
    {
      poolId: 0,
      name: 'taiKSM',
      decimals: 12,
      assets: ['KSM', 'LKSM']
    },
    {
      poolId: 1,
      name: '3USD',
      decimals: 12,
      assets: ['KUSD', 'erc20://0x1f3a10587a20114ea25ba1b388ee2dd4a337ce27', 'fa://7']
    }
  ],
  // Mandala testnet
  'Mandala Dev': [
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
  ]
};

interface Configs {
  // basic token informations
  type?: TokenType; // token type
  chain?: string; // token's chain
  display?: string; // for display
  fullname?: string; // token full name
  symbol?: string; // token symbol
  decimals?: number; // token decimals
  decimal?: number; // token decimals
  ed?: FixedPointNumber;

  // configs for cross-chain transfer
  locations?: {
    paraChainId?: number;
    generalIndex?: number;
    palletInstance?: number;
  };
}

export class Token {
  readonly name: string;
  readonly display: string;
  readonly fullname: string;
  readonly symbol: string;
  readonly decimals: number;
  readonly ed: FixedPointNumber;
  readonly chain: string | undefined;
  readonly type: TokenType;
  readonly pair?: [Token, Token];
  readonly locations?: {
    paraChainId?: number;
    generalIndex?: number;
    palletInstance?: number;
  };

  constructor(name: string, configs?: Configs) {
    // basic token informations
    this.name = name;
    this.type = configs?.type || TokenType.BASIC;
    this.display = configs?.display || configs?.symbol || name;
    this.fullname = configs?.fullname || this.display;
    this.symbol = configs?.symbol || name;
    this.decimals = configs?.decimals || configs?.decimal || 18;
    this.ed = configs?.ed || FixedPointNumber.ZERO;
    this.chain = configs?.chain;

    // foreign asset locations
    this.locations = configs?.locations;
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

  get isLiquidCrowdloan(): boolean {
    return this.type === TokenType.LIQUID_CROWDLOAN;
  }

  get isForeignAsset(): boolean {
    return this.type === TokenType.FOREIGN_ASSET;
  }

  get decimal(): number {
    console.warn('decimal is deprecated, please use decimals');

    return this.decimals;
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
  static fromCurrencyId(currency: AcalaPrimitivesCurrencyCurrencyId, configs?: Configs): Token {
    return this.fromCurrencyName(forceToCurrencyName(currency), configs);
  }

  static fromTokenSymbol(token: AcalaPrimitivesCurrencyTokenSymbol, configs?: Configs): Token {
    return this.fromCurrencyName(token.toString(), configs);
  }

  /* create DexShareToken by Token array */
  static fromTokens(token1: Token, token2: Token, configs?: Configs): Token {
    const [_token1, _token2] = this.sort(token1, token2);

    // set token1 decimals as decimals;
    const decimals = _token1.decimals;
    const ed = _token1.ed;

    return new Token(createDexShareName(_token1.name, _token2.name), {
      decimals,
      type: TokenType.DEX_SHARE,
      ed,
      ...configs
    });
  }

  /* create DexShareToken form CombinedCurrencyId array */
  static fromCurrencies(
    currency1: AcalaPrimitivesCurrencyCurrencyId,
    currency2: AcalaPrimitivesCurrencyCurrencyId,
    decimals?: number | [number, number]
  ): Token {
    const decimals1 = Array.isArray(decimals) ? decimals[0] : decimals;
    const decimals2 = Array.isArray(decimals) ? decimals[1] : decimals;

    const token1 = Token.fromCurrencyId(currency1, { decimals: decimals1 });
    const token2 = Token.fromCurrencyId(currency2, { decimals: decimals2 });

    return Token.fromTokens(token1, token2);
  }

  /* create DexShareToken from TokenSymbol array */
  static fromTokenSymbols(
    currency1: AcalaPrimitivesCurrencyTokenSymbol,
    currency2: AcalaPrimitivesCurrencyTokenSymbol,
    decimals?: number | [number, number]
  ): Token {
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

  static sortCurrencies(...currencies: AcalaPrimitivesCurrencyCurrencyId[]): AcalaPrimitivesCurrencyCurrencyId[] {
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

  public toCurrencyId(api: AnyApi): AcalaPrimitivesCurrencyCurrencyId {
    try {
      return api.registry.createType('AcalaPrimitivesCurrencyCurrencyId', this.toChainData());
    } catch (e) {
      throw new Error(`can't convert ${this.toChainData()} to Currency Id. ${e}`);
    }
  }

  public toTradingPair(api: AnyApi): AcalaPrimitivesTradingPair {
    assert(this.isDexShare, 'the currency is not a dex share');

    try {
      return api.registry.createType('AcalaPrimitivesTradingPair', [
        ...unzipDexShareName(this.name).map((i) => getCurrencyObject(i))
      ]);
    } catch (e) {
      throw new Error(`can't convert ${this.toChainData()} to Trading Pair`);
    }
  }

  public toDexShare(api: AnyApi): AcalaPrimitivesCurrencyDexShare {
    try {
      assert(this.isDexShare, 'the token is not a dexShare');

      return api.registry.createType('AcalaPrimitivesCurrencyDexShare', this.toChainData());
    } catch (e) {
      throw new Error(`can't convert ${this.toChainData()} to DexShare`);
    }
  }

  public toTokenSymbol(api: AnyApi): AcalaPrimitivesCurrencyTokenSymbol {
    try {
      assert(this.isTokenSymbol, 'the currency is not a token symbol');

      return api.registry.createType('AcalaPrimitivesCurrencyTokenSymbol', this.name);
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
