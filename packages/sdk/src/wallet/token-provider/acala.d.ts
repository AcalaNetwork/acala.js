import { AnyApi, MaybeCurrency, Token, TokenType } from '@acala-network/sdk-core';
import { StorageKey, Option, u16 } from '@polkadot/types';
import { AcalaPrimitivesTradingPair, ModuleDexTradingPairStatus, AcalaPrimitivesCurrencyAssetIds, AcalaPrimitivesCurrencyAssetMetadata, StagingXcmV3MultiLocation } from '@polkadot/types/lookup';
import { BehaviorSubject, Observable } from 'rxjs';
import { TokenProvider, TokenProviderConfigs } from './type.js';
import { TokenRecord } from '../types.js';
export declare const createStorages: (api: AnyApi) => {
    foreignAssetLocations: () => import("@acala-network/sdk/utils/storage/storage.js").SubStorage<[StorageKey<[u16]>, Option<StagingXcmV3MultiLocation>][]>;
    assetMetadatas: () => import("@acala-network/sdk/utils/storage/storage.js").SubStorage<[StorageKey<[AcalaPrimitivesCurrencyAssetIds]>, Option<AcalaPrimitivesCurrencyAssetMetadata>][]>;
    tradingPairs: () => import("@acala-network/sdk/utils/storage/storage.js").SubStorage<[StorageKey<[AcalaPrimitivesTradingPair]>, ModuleDexTradingPairStatus][]>;
};
export declare class AcalaTokenProvider implements TokenProvider {
    private api;
    private storages;
    private configs;
    private chainType;
    tokens$: BehaviorSubject<TokenRecord>;
    private ready$;
    constructor(api: AnyApi, configs?: TokenProviderConfigs);
    private initTokens;
    get isReady$(): Observable<boolean>;
    get isReady(): Promise<boolean>;
    /**
     * @name is TokenEqual
     * @description return true when `a` is equal to `b`'s name or symbol or fullname
     * @param a string
     * @param b Token
     * @param ignoreCase boolean
     * @returns boolean
     */
    private isTokenEqual;
    subscribeToken(token: MaybeCurrency): Observable<Token>;
    getToken(token: MaybeCurrency): Token;
    subscribeTokens(types?: TokenType | TokenType[]): Observable<TokenRecord>;
    getAllTokens(): TokenRecord;
    getNativeToken(): Token;
}
