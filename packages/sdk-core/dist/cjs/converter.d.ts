import { AcalaPrimitivesCurrencyCurrencyId, AcalaPrimitivesCurrencyTokenSymbol } from '@polkadot/types/lookup';
import { Token } from './token';
import { AnyApi, CurrencyObject, MaybeCurrency, TokenType } from './types';
/**
 *  we set a name with a prefix to all types of tokens for easy passing and use.
 *  e.g.
 *  { DexShare: [{ Token: KAR }, { Token: KSM }] } is lp://KAR/KSM
 *  { stableAsset: 0 } is sa://0
 *  { foreignAsset: 0 } is fa://0
 *  { ERC20: '0x100000000' } is erc20://0x10000
 *  we can also combine these name for complex types
 *  e.g.
 *  lp://${encode(lp://KAR/KSM)}/${encode(sa://0)} is { DexShare: [ { DexShare: [{ Token: 'KAR' }, { Token: 'KSM}] }, { stableAsset: 0 } ] }
 */
export declare function isBasicToken(name: string): boolean;
export declare function createDexShareName(name1: string, name2: string): string;
export declare function isDexShareName(name: string): boolean;
/**
 * @name unzipDexShareName
 * @description unzip dex share name to two token name, e.g. lp://KAR/KSM -> [KAR, KSM];
 */
export declare function unzipDexShareName(name: string): [string, string];
export declare function createStableAssetName(id: number): string;
export declare function isStableAssetName(name: string): boolean;
export declare function getStableAssetTokenName(api: AnyApi, name: string): string;
export declare function getStableAssetPoolIdFromName(name: string): number;
export declare function createForeignAssetName(id: number): string;
export declare function isForeignAssetName(name: string): boolean;
export declare function getForeignAssetIdFromName(name: string): number;
export declare function createLiquidCrowdloanName(id: number): string;
export declare function isLiquidCrowdloanName(name: string): boolean;
export declare function getLiquidCrowdloanIdFromName(name: string): number;
export declare function createERC20Name(hash: string): string;
export declare function isERC20Name(name: string): boolean;
export declare function getERC20TokenAddressFromName(name: string): string;
export declare function getCurrencyTypeByName(name: string): TokenType;
export declare function getBasicCurrencyObject(name: string): CurrencyObject;
export declare function getStableAssetCurrencyObject(name: string): CurrencyObject;
export declare function getForeignAssetCurrencyObject(name: string): CurrencyObject;
export declare function getLiquidCrowdloanObject(name: string): CurrencyObject;
export declare function getERC20Object(name: string): CurrencyObject;
export declare function getDexShareCurrencyObject(name: string): CurrencyObject;
export declare function getCurrencyObject(name: string): CurrencyObject;
/**
 * @name forceToCurrencyName
 * @description convert `maybeCurrency` to currency name
 */
export declare function forceToCurrencyName(target: MaybeCurrency): string;
export declare function forceToCurrencyId(api: AnyApi, target: MaybeCurrency): AcalaPrimitivesCurrencyCurrencyId;
export declare const forceToTokenSymbolCurrencyId: (api: AnyApi, target: string | Token | AcalaPrimitivesCurrencyCurrencyId | AcalaPrimitivesCurrencyTokenSymbol) => AcalaPrimitivesCurrencyCurrencyId;
export declare const forceToDexShareCurrencyId: (api: AnyApi, target: [string, string] | AcalaPrimitivesCurrencyCurrencyId) => AcalaPrimitivesCurrencyCurrencyId;
export declare const forceToStableAssetCurrencyId: (api: AnyApi, target: number | AcalaPrimitivesCurrencyCurrencyId) => AcalaPrimitivesCurrencyCurrencyId;
export declare const forceToForeignAssetCurrencyId: (api: AnyApi, target: number | AcalaPrimitivesCurrencyCurrencyId) => AcalaPrimitivesCurrencyCurrencyId;
export declare const forceToERC20CurrencyId: (api: AnyApi, target: string | AcalaPrimitivesCurrencyCurrencyId) => AcalaPrimitivesCurrencyCurrencyId;
