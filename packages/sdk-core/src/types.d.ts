import { ApiPromise, ApiRx } from '@polkadot/api';
import { AccountId } from '@polkadot/types/interfaces';
import { AcalaPrimitivesCurrencyCurrencyId, AcalaPrimitivesCurrencyDexShare } from '@polkadot/types/lookup';
import { Codec, Observable } from '@polkadot/types/types';
import { Token } from './token.js';
export type AnyApi = ApiPromise | ApiRx;
export type ObOrPromiseResult<T extends AnyApi, R> = T extends ApiRx ? Observable<R> : Promise<R>;
export type MaybeCurrency = number | string | Token | Codec | [string, string] | AcalaPrimitivesCurrencyCurrencyId | AcalaPrimitivesCurrencyDexShare;
export type MaybeAccount = string | AccountId | Codec;
export declare enum TokenType {
    'BASIC' = 0,
    'DEX_SHARE' = 1,
    'ERC20' = 2,
    'STABLE_ASSET_POOL_TOKEN' = 3,
    'LIQUID_CROWDLOAN' = 4,
    'FOREIGN_ASSET' = 5
}
/**
 * CurrencyObject is an object which can as parameters in api.registry.createType('CurrencyId', ...).
 * we can simple pass CurrencyObject to any call as CurrencyId type
 */
export type CurrencyObject = {
    Token: string;
} | {
    DexShare: [CurrencyObject, CurrencyObject];
} | {
    Erc20: string;
} | {
    StableAssetPoolToken: number;
} | {
    ForeignAsset: number;
} | {
    LiquidCrowdloan: number;
};
