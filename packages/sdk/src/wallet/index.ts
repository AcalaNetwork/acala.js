/**
 * wallet sdk support user to query info about token list, token balance, token price and token value
 */

import { memoize } from '@polkadot/util';
import {
  FixedPointNumber as FN,
  AnyApi,
  forceToCurrencyIdName,
  Token,
  MaybeCurrency,
  getLPCurrenciesFormName
} from '@acala-network/sdk-core';
import { TradingPair, TradingPairStatus } from '@acala-network/types/interfaces';
import { StorageKey } from '@polkadot/types';
import { AccountInfo, Balance, RuntimeDispatchInfo } from '@polkadot/types/interfaces';
import { OrmlAccountData } from '@open-web3/orml-types/interfaces';
import { BehaviorSubject, combineLatest, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Storage } from '../storage';
import { CurrenciesRecord, CurrencyType, WalletConsts, BalanceData, TransferConfig, PresetTokens } from './type';
import { CurrencyNotFound } from '..';
import { getExistentialDepositConfig } from './utils/get-ed-config';
import { getMaxAvailableBalance } from './utils/get-max-available-balance';
import { MarketPriceProvider } from './price-provider/MarketPriceProvider';
import { OraclePriceProvider } from './price-provider/OraclePriceProvider';
import { PriceProvider, PriceProviderType } from './price-provider/types';

type PriceProviders = Partial<
  {
    [k in PriceProviderType]: PriceProvider;
  }
>;

export class Wallet {
  private api: AnyApi;
  private basicCurrencies: CurrenciesRecord;
  private lpCurrencies$: BehaviorSubject<CurrenciesRecord>;
  private priceProviders: PriceProviders;
  public consts!: WalletConsts;

  public constructor(api: AnyApi, priceProviders?: Record<PriceProviderType, PriceProvider>) {
    this.api = api;
    this.basicCurrencies = {};
    this.lpCurrencies$ = new BehaviorSubject<CurrenciesRecord>({});

    this.priceProviders = {
      ...this.defaultPriceProviders,
      ...priceProviders
    };
    this.initConsts();
    this.initBasicCurrencies();
    this.subscribeLPCurrencies();
  }

  private initConsts() {
    this.consts = {
      runtimeChain: this.api.runtimeChain.toString(),
      nativeCurrency: this.api.registry.chainTokens[0].toString()
    };
  }

  private get storages() {
    return {
      'trading-pairs': () =>
        Storage.create<[StorageKey<TradingPair>, TradingPairStatus][]>({
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
        const isNativeToken = forceToCurrencyIdName(this.consts.nativeCurrency) === forceToCurrencyIdName(token);

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

  private initBasicCurrencies() {
    const chainDecimals = this.api.registry.chainDecimals;
    const chainTokens = this.api.registry.chainTokens;

    this.basicCurrencies = Object.fromEntries(
      chainTokens.map((token, i) => {
        return [
          token,
          new Token(token, {
            isTokenSymbol: true,
            decimal: chainDecimals[i] ?? 12
          })
        ];
      })
    );
  }

  private subscribeLPCurrencies() {
    const storage$ = this.storages['trading-pairs']();

    storage$.observable.subscribe({
      next: (data) => {
        const enabled = data.filter((item) => [item[1].isEnabled]);

        const enabledTradingPair = enabled.map((item) =>
          this.api.createType('AcalaPrimitivesTradingPair' as any, item[0].args[0])
        ) as TradingPair[];

        const lpCurrencies = enabledTradingPair.map((item) => {
          return Token.fromCurrencies(item[0], item[1]);
        });

        this.lpCurrencies$.next(Object.fromEntries(lpCurrencies.map((item) => [forceToCurrencyIdName(item), item])));
      }
    });
  }

  /**
   *  @name subscribeCurrencies
   *  @param type
   *  @description subscirbe the currency list of `type`
   */
  public subscribeCurrencies = memoize((type: CurrencyType = CurrencyType.BASIC): Observable<CurrenciesRecord> => {
    if (type === CurrencyType.BASIC) return of(this.basicCurrencies);

    if (type === CurrencyType.LP) return this.lpCurrencies$.asObservable();

    // get all currencies
    return combineLatest([of(this.basicCurrencies), this.lpCurrencies$]).pipe(map(([a, b]) => ({ ...a, ...b })));
  });

  /**
   *  @name subscribeCurrency
   *  @description subscirbe the currency info
   */
  public subscribeCurrency = memoize((target: MaybeCurrency): Observable<Token> => {
    const name = forceToCurrencyIdName(target);

    return this.subscribeCurrencies(CurrencyType.ALL).pipe(
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
    return this.subscribeCurrency(token).pipe(
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
    return this.subscribeCurrency(token).pipe(
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
      const nativeToken = this.basicCurrencies[this.consts.nativeCurrency] as Token;
      const isNativeToken = forceToCurrencyIdName(token) === nativeToken.name;

      const handleNativeResult = (accountInfo: AccountInfo, token: Token) => {
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
          isNativeToken,
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

      const handleNonNativeResult = (accountInfo: AccountInfo, tokenInfo: OrmlAccountData, token: Token) => {
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
          isNativeToken,
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

      return this.subscribeCurrency(token).pipe(
        switchMap((token) => {
          if (isNativeToken) {
            return this.storages['native-balance'](address).observable.pipe(
              map((data) => handleNativeResult(data, token))
            );
          }

          return combineLatest({
            accountInfo: this.storages['native-balance'](address).observable,
            tokenInfo: this.storages['non-native-balance'](token, address).observable
          }).pipe(map(({ accountInfo, tokenInfo }) => handleNonNativeResult(accountInfo, tokenInfo, token)));
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
      const [token1] = Token.sortTokenNames(...getLPCurrenciesFormName(token.name));

      return {
        ed: getExistentialDepositConfig(runtimeChain, token1)
      };
    }

    return { ed: getExistentialDepositConfig(runtimeChain, token.name) };
  }

  public getPresetTokens(): PresetTokens {
    const { basicCurrencies } = this;

    const data: PresetTokens = {
      nativeToken: basicCurrencies[this.consts.nativeCurrency]
    };

    if (this.api.consts?.cdpEngine.getStableCurrencyId) {
      data.stableToken = basicCurrencies[forceToCurrencyIdName(this.api.consts.cdpEngine.getStableCurrencyId)];
    }

    if (this.api.consts?.homaLite.liquidCurrencyId) {
      data.liquidToken = basicCurrencies[forceToCurrencyIdName(this.api.consts.homaLite.liquidCurrencyId)];
    }

    if (this.api.consts?.homaLite.stakingCurrencyId) {
      data.stakingToken = basicCurrencies[forceToCurrencyIdName(this.api.consts.homaLite.stakingCurrencyId)];
    }

    return data;
  }

  public subscribePrice(token: MaybeCurrency, type = PriceProviderType.MARKET): Observable<FN> {
    let priceProvider: PriceProvider | undefined;

    if (type === PriceProviderType.MARKET) {
      priceProvider = this.priceProviders?.[PriceProviderType.MARKET];
    }

    if (type === PriceProviderType.ORACLE) {
      priceProvider = this.priceProviders?.[PriceProviderType.ORACLE];
    }

    if (!priceProvider) return of(FN.ZERO);

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.subscribeCurrency(token).pipe(switchMap((token) => priceProvider!.subscribe(token.name)));
  }
}
