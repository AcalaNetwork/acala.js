import { AnyApi, forceToCurrencyName, MaybeCurrency, Token, TokenType } from '@acala-network/sdk-core';
import { StorageKey, Option, u16 } from '@polkadot/types';
import {
  AcalaPrimitivesTradingPair,
  ModuleDexTradingPairStatus,
  AcalaPrimitivesCurrencyAssetIds,
  AcalaPrimitivesCurrencyAssetMetadata,
  StagingXcmV3MultiLocation
} from '@polkadot/types/lookup';
import { BehaviorSubject, combineLatest, firstValueFrom, Observable } from 'rxjs';
import { filter, map, shareReplay, take } from 'rxjs/operators';
import { TokenProvider, TokenProviderConfigs } from './type.js';
import { Storage } from '../../utils/storage/index.js';
import { createTokenList } from './create-token-list.js';
import { ChainType } from '../../types.js';
import { getChainType } from '../../utils/get-chain-type.js';
import { TokenRecord } from '../types.js';
import { CurrencyNotFound } from '../errors.js';

export const createStorages = (api: AnyApi) => {
  return {
    foreignAssetLocations: () =>
      Storage.create<[StorageKey<[u16]>, Option<StagingXcmV3MultiLocation>][]>({
        api: api,
        path: 'query.assetRegistry.foreignAssetLocations.entries',
        params: []
      }),
    assetMetadatas: () =>
      Storage.create<[StorageKey<[AcalaPrimitivesCurrencyAssetIds]>, Option<AcalaPrimitivesCurrencyAssetMetadata>][]>({
        api: api,
        path: 'query.assetRegistry.assetMetadatas.entries',
        params: []
      }),
    tradingPairs: () =>
      Storage.create<[StorageKey<[AcalaPrimitivesTradingPair]>, ModuleDexTradingPairStatus][]>({
        api: api,
        path: 'query.dex.tradingPairStatuses.entries',
        params: []
      })
  };
};

export class AcalaTokenProvider implements TokenProvider {
  private api: AnyApi;
  private storages: ReturnType<typeof createStorages>;
  private configs: TokenProviderConfigs;
  private chainType: ChainType;
  public tokens$: BehaviorSubject<TokenRecord>;
  private ready$: BehaviorSubject<boolean>;

  constructor(api: AnyApi, configs?: TokenProviderConfigs) {
    this.api = api;
    this.storages = createStorages(api);
    this.configs = {
      kusd2ausd: true,
      ignoreCase: true,
      ...configs
    };
    this.chainType = getChainType(this.api.runtimeChain.toString());
    this.ready$ = new BehaviorSubject<boolean>(false);
    this.tokens$ = new BehaviorSubject<TokenRecord>({});

    this.initTokens().subscribe({
      next: (data) => {
        this.tokens$.next(data);
        this.ready$.next(true);
      }
    });
  }

  private initTokens() {
    const tradingPairs$ = this.storages.tradingPairs().observable;
    const assetMetadatas$ = this.storages.assetMetadatas().observable;
    const foreignAssetLocations$ = this.storages.foreignAssetLocations().observable;

    return combineLatest({
      tradingPairs: tradingPairs$,
      assetMetadatas: assetMetadatas$,
      foreignAssetLocations: foreignAssetLocations$
    }).pipe(
      take(1),
      map(({ tradingPairs, assetMetadatas, foreignAssetLocations }) => {
        return createTokenList(tradingPairs, assetMetadatas, foreignAssetLocations, {
          kusd2ausd: !this.configs.kusd2ausd,
          insertLCDOT: this.chainType === ChainType.ACALA || this.chainType === ChainType.MANDALA
        });
      })
    );
  }

  public get isReady$() {
    return this.ready$.pipe(filter((i) => !!i));
  }

  public get isReady(): Promise<boolean> {
    return firstValueFrom(this.isReady$);
  }

  /**
   * @name is TokenEqual
   * @description return true when `a` is equal to `b`'s name or symbol or fullname
   * @param a string
   * @param b Token
   * @param ignoreCase boolean
   * @returns boolean
   */
  private isTokenEqual(a: string, b: Token, ignoreCase = true): boolean {
    const isEqual = (a: string, b: string) => (ignoreCase ? a.toLowerCase() === b.toLowerCase() : a === b);

    if (this.configs.kusd2ausd) {
      const upperName = a.toUpperCase();

      if (upperName === 'KUSD' || upperName === 'AUSD') {
        return (
          isEqual(b.display, 'AUSD') ||
          isEqual(b.display, 'KUSD') ||
          isEqual(b.symbol, 'AUSD') ||
          isEqual(b.symbol, 'KUSD') ||
          isEqual(b.name, 'AUSD') ||
          isEqual(b.name, 'KUSD') ||
          isEqual(b.fullname, 'AUSD') ||
          isEqual(b.fullname, 'KUSD')
        );
      }
    }

    return isEqual(b.display, a) || isEqual(b.symbol, a) || isEqual(b.name, a) || isEqual(b.fullname, a);
  }

  public subscribeToken(token: MaybeCurrency): Observable<Token> {
    const name = forceToCurrencyName(token);

    return this.tokens$.pipe(
      filter((data) => !!data),
      map((tokens) => {
        const result = Object.values(tokens).find((item) => this.isTokenEqual(name, item));

        if (!result) throw new CurrencyNotFound(name);

        return result;
      })
    );
  }

  public getToken(token: MaybeCurrency): Token {
    const name = forceToCurrencyName(token);
    const result = Object.values(this.tokens$.getValue() || {}).find((item) => this.isTokenEqual(name, item));

    if (!result) throw new CurrencyNotFound(name);

    return result;
  }

  public subscribeTokens(types?: TokenType | TokenType[]): Observable<TokenRecord> {
    return this.tokens$.pipe(
      map((data) => {
        if (types === undefined) return data || {};

        return Object.fromEntries(
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          Object.entries(data).filter(([, value]) => {
            if (Array.isArray(types)) {
              return types.includes(value.type);
            }

            return value.type === types;
          })
        );
      }),
      shareReplay(1)
    );
  }

  public getAllTokens() {
    if (this.ready$.getValue() === false) {
      console.warn(`__getAllToken need sdk ready`);
    }

    return this.tokens$.getValue();
  }

  public getNativeToken() {
    const nativeCurrency = this.api.registry.chainTokens[0];

    return this.getToken(nativeCurrency);
  }
}
