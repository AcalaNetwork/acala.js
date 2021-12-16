/**
 * wallet sdk support to query info about token list, token balance, token price and token value
 */

import { memoize } from '@polkadot/util';
import {
  FixedPointNumber as FN,
  AnyApi,
  Token,
  MaybeCurrency,
  forceToCurrencyName,
  unzipDexShareName,
  TokenType
} from '@acala-network/sdk-core';
import { AcalaAssetMetadata, TradingPair, TradingPairStatus } from '@acala-network/types/interfaces';
import { Option, StorageKey, u16 } from '@polkadot/types';
import { AccountInfo, Balance, RuntimeDispatchInfo } from '@polkadot/types/interfaces';
import { OrmlAccountData } from '@open-web3/orml-types/interfaces';
import { BehaviorSubject, combineLatest, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Storage } from '../storage';
import { TokenRecord, WalletConsts, BalanceData, TransferConfig, PresetTokens } from './type';
import { CurrencyNotFound, SDKNotReady } from '..';
import { getExistentialDepositConfig } from './utils/get-ed-config';
import { getMaxAvailableBalance } from './utils/get-max-available-balance';
import { MarketPriceProvider } from './price-provider/MarketPriceProvider';
import { OraclePriceProvider } from './price-provider/OraclePriceProvider';
import { PriceProvider, PriceProviderType } from './price-provider/types';
import { createTokenList } from './utils/create-token-list';

type PriceProviders = Partial<{
  [k in PriceProviderType]: PriceProvider;
}>;

export class Wallet {
  private api: AnyApi;
  private priceProviders: PriceProviders;
  // readed from chain information
  private tokens$: BehaviorSubject<TokenRecord>;
  // FIXME: also need tokens from nuts
  private isReady$: BehaviorSubject<boolean>;
  public consts!: WalletConsts;

  public constructor(api: AnyApi, priceProviders?: Record<PriceProviderType, PriceProvider>) {
    this.api = api;

    this.isReady$ = new BehaviorSubject<boolean>(false);
    this.tokens$ = new BehaviorSubject<TokenRecord>({});

    this.priceProviders = {
      ...this.defaultPriceProviders,
      ...priceProviders
    };

    this.init();
  }

  public get isReady(): Observable<boolean> {
    return this.isReady$.asObservable();
  }

  private init() {
    // 1. init constants
    this.initConsts();
    // 2. init tokens information
    this.initTokens();
  }

  private initConsts() {
    this.consts = {
      runtimeChain: this.api.runtimeChain.toString(),
      nativeCurrency: this.api.registry.chainTokens[0].toString()
    };
  }

  private get storages() {
    return {
      'foreign-assets': () =>
        Storage.create<[StorageKey<u16[]>, Option<AcalaAssetMetadata>][]>({
          api: this.api,
          path: 'query.assetRegistry.assetMetadatas.entries',
          params: []
        }),
      'trading-pairs': () =>
        Storage.create<[StorageKey<[TradingPair]>, TradingPairStatus][]>({
          api: this.api,
          path: 'query.dex.tradingPairStatuses.entries',
          params: []
        }),
      'native-balance': (address: string) =>
        Storage.create<AccountInfo>({
          api: this.api,
          path: 'query.system.account',
          params: [address]
        }),
      'non-native-balance': (token: Token, address: string) =>
        Storage.create<OrmlAccountData>({
          api: this.api,
          path: 'query.tokens.accounts',
          params: [address, token.toChainData()]
        }),
      issuance: (token: Token) => {
        const isNativeToken = forceToCurrencyName(this.consts.nativeCurrency) === forceToCurrencyName(token);

        return Storage.create<Balance>({
          api: this.api,
          path: isNativeToken ? 'query.balances.totalIssuance' : 'query.tokens.totalIssuance',
          params: isNativeToken ? [] : [token.toChainData()]
        });
      }
    } as const;
  }

  private get defaultPriceProviders(): PriceProviders {
    return {
      [PriceProviderType.MARKET]: new MarketPriceProvider(),
      [PriceProviderType.ORACLE]: new OraclePriceProvider(this.api)
    };
  }

  private initTokens() {
    const chainDecimals = this.api.registry.chainDecimals;
    const chainTokens = this.api.registry.chainTokens;
    const tradingPairs$ = this.storages['trading-pairs']().observable;
    const foreignAssets$ = this.storages['foreign-assets']().observable;

    const basicTokens = Object.fromEntries(
      chainTokens.map((token, i) => {
        return [
          token,
          new Token(token, {
            type: TokenType.BASIC,
            decimal: chainDecimals[i] ?? 12,
            symbol: token
          })
        ];
      })
    );

    return combineLatest({
      tradingPairs: tradingPairs$,
      foreignAssets: foreignAssets$
    }).subscribe({
      next: ({ tradingPairs, foreignAssets }) => {
        const list = createTokenList(basicTokens, tradingPairs, foreignAssets);

        this.tokens$.next(list);
        this.isReady$.next(true);
      }
    });
  }

  /**
   *  @name subscribeTokens
   *  @param type
   *  @description subscirbe the token list, can filter by type
   */
  public subscribeTokens = memoize((type?: TokenType): Observable<TokenRecord> => {
    return this.tokens$.pipe(
      map((data) => {
        if (!type) return data;

        return Object.fromEntries(
          Object.entries(data).filter(([, value]) => {
            return value.type === type;
          })
        );
      })
    );
  });

  /**
   *  @name subscribeToken
   *  @description subscirbe the token info
   */
  public subscribeToken = memoize((target: MaybeCurrency): Observable<Token> => {
    const name = forceToCurrencyName(target);

    return this.subscribeTokens().pipe(
      map((all) => {
        const result = Object.values(all).find((item) => item.name === name);

        if (!result) throw new CurrencyNotFound(name);

        return result;
      })
    );
  });

  /**
   * @name subscribeBalance
   * @description subscribe `address` `token` balance info
   * @param token
   * @param address
   */
  public subscribeBalance = memoize((token: MaybeCurrency, address: string): Observable<BalanceData> => {
    return this.subscribeToken(token).pipe(
      switchMap((token) => {
        const { nativeCurrency } = this.consts;
        const isNativeToken = nativeCurrency === token.name;

        const handleNative = (data: AccountInfo, token: Token) => {
          const free = FN.fromInner(data.data.free.toString(), token.decimal);
          const locked = FN.fromInner(data.data.miscFrozen.toString(), token.decimal).max(
            FN.fromInner(data.data.feeFrozen.toString(), token.decimal)
          );
          const reserved = FN.fromInner(data.data.reserved.toString(), token.decimal);
          const available = free.sub(locked).max(FN.ZERO);

          return { available, token, free, locked, reserved };
        };

        const handleNonNative = (data: OrmlAccountData, token: Token) => {
          const free = FN.fromInner(data.free.toString(), token.decimal);
          const locked = FN.fromInner(data.frozen.toString(), token.decimal);
          const reserved = FN.fromInner(data.reserved.toString(), token.decimal);
          const available = free.sub(locked).max(FN.ZERO);

          return { available, token, free, locked, reserved };
        };

        if (isNativeToken) {
          const storage = this.storages['native-balance'](address);

          return storage.observable.pipe(map((data) => handleNative(data, token)));
        }

        // non-native token
        const storage = this.storages['non-native-balance'](token, address);

        return storage.observable.pipe(map((data) => handleNonNative(data, token)));
      })
    );
  });

  /**
   * @name subscribeIssuance
   * @description subscribe `token` issuance amount
   * @param token
   */
  public subscribeIssuance = memoize((token: MaybeCurrency): Observable<FN> => {
    return this.subscribeToken(token).pipe(
      switchMap((token) => {
        const storage = this.storages.issuance(token);
        const handleIssuance = (data: Balance, token: Token) => FN.fromInner(data.toString(), token.decimal);

        return storage.observable.pipe(map((data) => handleIssuance(data, token)));
      })
    );
  });

  /**
   * @name subscribeSuggestInput
   * @description subscirbe the suggest input amount for `account` `token`
   * @params token: Token
   * @params account: string
   */
  public subscribeSuggestInput = memoize(
    (
      token: MaybeCurrency,
      address: string,
      isAllowDeath: boolean,
      paymentInfo: RuntimeDispatchInfo,
      feeFactor = 1
    ): Observable<FN> => {
      const handleNativeResult = (accountInfo: AccountInfo, token: Token, nativeToken: Token) => {
        const providers = accountInfo.providers.toNumber();
        const consumers = accountInfo.consumers.toNumber();
        const nativeFreeBalance = FN.fromInner(accountInfo.data.free.toString(), nativeToken.decimal);
        // native locked balance = max(accountInfo.data.miscFrozen, accountInfo.data.feeFrozen)
        const nativeLockedBalance = FN.fromInner(accountInfo.data.miscFrozen.toString(), nativeToken.decimal).max(
          FN.fromInner(accountInfo.data.feeFrozen.toString(), nativeToken.decimal)
        );
        const ed = this.getTransferConfig(token).ed;
        const fee = FN.fromInner(paymentInfo.partialFee.toString(), nativeToken.decimal).mul(new FN(feeFactor));

        return getMaxAvailableBalance({
          isNativeToken: true,
          isAllowDeath,
          providers,
          consumers,
          nativeFreeBalance,
          nativeLockedBalance,
          targetFreeBalance: FN.ZERO,
          targetLockedBalance: FN.ZERO,
          ed,
          fee
        });
      };

      const handleNonNativeResult = (
        accountInfo: AccountInfo,
        tokenInfo: OrmlAccountData,
        token: Token,
        nativeToken: Token
      ) => {
        const providers = accountInfo.providers.toNumber();
        const consumers = accountInfo.consumers.toNumber();
        const nativeFreeBalance = FN.fromInner(accountInfo.data.free.toString(), nativeToken.decimal);
        // native locked balance = max(accountInfo.data.miscFrozen, accountInfo.data.feeFrozen)
        const nativeLockedBalance = FN.fromInner(accountInfo.data.miscFrozen.toString(), nativeToken.decimal).max(
          FN.fromInner(accountInfo.data.feeFrozen.toString(), nativeToken.decimal)
        );
        const targetFreeBalance = FN.fromInner(tokenInfo.free.toString(), token.decimal);
        const targetLockedBalance = FN.fromInner(tokenInfo.frozen.toString(), token.decimal);
        const ed = this.getTransferConfig(token).ed;
        const fee = FN.fromInner(paymentInfo.partialFee.toString(), nativeToken.decimal).mul(new FN(feeFactor));

        return getMaxAvailableBalance({
          isNativeToken: false,
          isAllowDeath,
          providers,
          consumers,
          nativeFreeBalance,
          nativeLockedBalance,
          targetFreeBalance,
          targetLockedBalance,
          ed,
          fee
        });
      };

      return combineLatest({
        token: this.subscribeToken(token),
        nativeToken: this.subscribeToken(this.consts.nativeCurrency)
      }).pipe(
        switchMap(({ token, nativeToken }) => {
          const isNativeToken = forceToCurrencyName(token) === nativeToken.name;

          if (isNativeToken) {
            return this.storages['native-balance'](address).observable.pipe(
              map((data) => handleNativeResult(data, token, nativeToken))
            );
          }

          return combineLatest({
            accountInfo: this.storages['native-balance'](address).observable,
            tokenInfo: this.storages['non-native-balance'](token, address).observable
          }).pipe(
            map(({ accountInfo, tokenInfo }) => handleNonNativeResult(accountInfo, tokenInfo, token, nativeToken))
          );
        })
      );
    }
  );

  /**
   * @name getTransferConfig
   * @params get `currency` ed config
   * @param currency
   * @returns
   */
  public getTransferConfig(token: Token): TransferConfig {
    const { runtimeChain } = this.consts;

    if (token.isDexShare) {
      const [token1] = Token.sortTokenNames(...unzipDexShareName(token.name));

      return {
        ed: getExistentialDepositConfig(runtimeChain, token1)
      };
    }

    return { ed: getExistentialDepositConfig(runtimeChain, token.name) };
  }

  public getPresetTokens(): PresetTokens {
    if (this.isReady$.value === false) {
      throw new SDKNotReady('wallet');
    }

    const tokens = this.tokens$.value;

    const data: PresetTokens = {
      nativeToken: tokens[forceToCurrencyName(this.consts.nativeCurrency)]
    };

    if (this.api.consts?.cdpEngine.getStableCurrencyId) {
      data.stableToken = tokens[forceToCurrencyName(this.api.consts.cdpEngine.getStableCurrencyId)];
    }

    if (this.api.consts?.homaLite.liquidCurrencyId) {
      data.liquidToken = tokens[forceToCurrencyName(this.api.consts.homaLite.liquidCurrencyId)];
    }

    if (this.api.consts?.homaLite.stakingCurrencyId) {
      data.stakingToken = tokens[forceToCurrencyName(this.api.consts.homaLite.stakingCurrencyId)];
    }

    return data;
  }

  /**
   * @name subscribePrice
   * @description subscirbe the price of `token`
   */
  public subscribePrice = memoize((token: MaybeCurrency, type = PriceProviderType.MARKET): Observable<FN> => {
    let priceProvider: PriceProvider | undefined;

    if (type === PriceProviderType.MARKET) {
      priceProvider = this.priceProviders?.[PriceProviderType.MARKET];
    }

    if (type === PriceProviderType.ORACLE) {
      priceProvider = this.priceProviders?.[PriceProviderType.ORACLE];
    }

    if (!priceProvider) return of(FN.ZERO);

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.subscribeToken(token).pipe(switchMap((token) => priceProvider!.subscribe(token.name)));
  });
}
