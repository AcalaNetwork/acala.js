import { AnyApi, forceToCurrencyName, MaybeCurrency, Token, TokenType } from '@acala-network/sdk-core';
import { StorageKey, Option, u16 } from '@polkadot/types';
import {
  ModuleAssetRegistryModuleAssetIds,
  ModuleAssetRegistryModuleAssetMetadata,
  XcmV1MultiLocation
} from '@acala-network/types/interfaces/types-lookup';
import { BehaviorSubject, combineLatest, firstValueFrom, Observable } from 'rxjs';
import { filter, map, shareReplay, switchMap } from 'rxjs/operators';
import { TokenProvider, TokenProviderConfigs } from './type';
import { Storage } from '../../utils/storage';
import { createTokenList } from './create-token-list';
import { ChainType } from '@acala-network/sdk/types';
import { getChainType } from '@acala-network/sdk/utils/get-chain-type';
import { TokenRecord } from '../type';
import { CurrencyNotFound } from '../errors';
import { TradingPair, TradingPairStatus } from '@acala-network/types/interfaces';

export const createStorages = (api: AnyApi) => {
  return {
    foreignAssetLocations: () =>
      Storage.create<[StorageKey<[u16]>, Option<XcmV1MultiLocation>][]>({
        api: api,
        path: 'query.assetRegistry.foreignAssetLocations.entries',
        params: []
      }),
    assetMetadatas: () =>
      Storage.create<
        [StorageKey<[ModuleAssetRegistryModuleAssetIds]>, Option<ModuleAssetRegistryModuleAssetMetadata>][]
      >({
        api: api,
        path: 'query.assetRegistry.assetMetadatas.entries',
        params: []
      }),
    tradingPairs: () =>
      Storage.create<[StorageKey<[TradingPair]>, TradingPairStatus][]>({
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

  private isTokenEqual(a: string, b: Token): boolean {
    if (this.configs.kusd2ausd) {
      const upperName = a.toUpperCase();

      if (upperName === 'KUSD' || upperName === 'AUSD') {
        return (
          b.display === 'AUSD' ||
          b.display === 'KUSD' ||
          b.symbol === 'AUSD' ||
          b.symbol === 'KUSD' ||
          b.name === 'AUSD' ||
          b.name === 'KUSD' ||
          b.fullname === 'AUSD' ||
          b.fullname === 'KUSD'
        );
      }
    }

    return b.display === a || b.symbol === a || b.name === a || b.fullname === a;
  }

  public subscribeToken(token: MaybeCurrency): Observable<Token> {
    const name = forceToCurrencyName(token);

    return this.isReady$.pipe(
      switchMap(() => this.tokens$),
      filter((data) => !!data),
      map((tokens) => {
        const result = Object.values(tokens).find((item) => this.isTokenEqual(name, item));

        if (!result) throw new CurrencyNotFound(name);

        return result;
      })
    );
  }

  public async getToken(token: MaybeCurrency): Promise<Token> {
    return firstValueFrom(this.subscribeToken(token));
  }

  public __getToken(token: MaybeCurrency): Token {
    const name = forceToCurrencyName(token);
    const result = Object.values(this.tokens$.getValue() || {}).find((item) => this.isTokenEqual(name, item));

    if (!result) throw new CurrencyNotFound(name);

    return result;
  }

  public subscribeTokens(types?: TokenType | TokenType[]): Observable<TokenRecord> {
    return this.isReady$.pipe(
      switchMap(() => this.tokens$),
      filter((data) => !!data),
      map((data) => {
        if (types === undefined) return data || {};

        return Object.fromEntries(
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          Object.entries(data!).filter(([, value]) => {
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

  public __getAllTokens() {
    if (this.ready$.getValue() === false) {
      console.warn(`__getAllToken need sdk ready`);
    }

    return this.tokens$.getValue();
  }
}
