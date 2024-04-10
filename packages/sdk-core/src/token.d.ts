import { AnyApi, CurrencyObject, TokenType } from './types.js';
import { FixedPointNumber } from './fixed-point-number.js';
import { AcalaPrimitivesCurrencyCurrencyId, AcalaPrimitivesCurrencyDexShare, AcalaPrimitivesCurrencyTokenSymbol, AcalaPrimitivesTradingPair } from '@polkadot/types/lookup';
export interface StableAsset {
    poolId: number;
    name: string;
    decimals: number;
    assets: string[];
}
export declare const STABLE_ASSET_POOLS: {
    [chain: string]: StableAsset[];
};
interface Configs {
    type?: TokenType;
    chain?: string;
    display?: string;
    fullname?: string;
    symbol?: string;
    decimals?: number;
    decimal?: number;
    ed?: FixedPointNumber;
    locations?: {
        paraChainId?: number;
        generalIndex?: number;
        palletInstance?: number;
    };
}
export declare class Token {
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
    constructor(name: string, configs?: Configs);
    get isTokenSymbol(): boolean;
    get isDexShare(): boolean;
    get isERC20(): boolean;
    get isStableAssetPoolToken(): boolean;
    get isLiquidCrowdloan(): boolean;
    get isForeignAsset(): boolean;
    get decimal(): number;
    static create(name: string, configs?: Configs): Token;
    /**
     * @name fromCurrencyName
     * @description create token from curreync name
     */
    static fromCurrencyName(name: string, configs?: Configs): Token;
    /**
     * @name fromCurrencyId
     * @description create token from currency id
     */
    static fromCurrencyId(currency: AcalaPrimitivesCurrencyCurrencyId, configs?: Configs): Token;
    static fromTokenSymbol(token: AcalaPrimitivesCurrencyTokenSymbol, configs?: Configs): Token;
    static fromTokens(token1: Token, token2: Token, configs?: Configs): Token;
    static fromCurrencies(currency1: AcalaPrimitivesCurrencyCurrencyId, currency2: AcalaPrimitivesCurrencyCurrencyId, decimals?: number | [number, number]): Token;
    static fromTokenSymbols(currency1: AcalaPrimitivesCurrencyTokenSymbol, currency2: AcalaPrimitivesCurrencyTokenSymbol, decimals?: number | [number, number]): Token;
    /** Create StableAssetPoolToken by stable asset pool ID. Chain must be provided/ */
    static fromStableAssetPool(chain: string, poolId: number, configs?: Configs): Token;
    static sortTokenNames(...names: string[]): string[];
    static sortCurrencies(...currencies: AcalaPrimitivesCurrencyCurrencyId[]): AcalaPrimitivesCurrencyCurrencyId[];
    static sort(...tokens: Token[]): Token[];
    toCurrencyId(api: AnyApi): AcalaPrimitivesCurrencyCurrencyId;
    toTradingPair(api: AnyApi): AcalaPrimitivesTradingPair;
    toDexShare(api: AnyApi): AcalaPrimitivesCurrencyDexShare;
    toTokenSymbol(api: AnyApi): AcalaPrimitivesCurrencyTokenSymbol;
    clone(): Token;
    isEqual(target: Token, compare?: (token1: Token, token2: Token) => boolean): boolean;
    toChainData(): CurrencyObject;
    toString(): string;
}
export {};
