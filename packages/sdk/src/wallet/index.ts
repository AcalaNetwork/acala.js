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
import { Storage, StorageManager } from '../storage';
import { CurrenciesRecord, CurrencyType, WalletConsts, BalanceData, TransferConfig, PresetTokens } from './type';
import { CurrencyNotFound } from '..';
import { getExistentialDepositConfig } from './utils/get-ed-config';
import { getMaxAvailableBalance } from './utils/get-max-available-balance';

type Keys = 'trading-pairs' | 'native-balance' | 'non-native-balance';

type StorageConfigs = {
  'trading-pairs': () => Storage<[StorageKey<TradingPair>, TradingPairStatus][]>;
  'native-balance': ([address]: [string]) => Storage<AccountInfo>;
  'non-native-balance': ([token, address]: [Token, string]) => Storage<OrmlAccountData>;
  [k: Keys]: any;
};


export class Wallet {
  private api: AnyApi;
  private basicCurrencies: CurrenciesRecord;
  private lpCurrencies$: BehaviorSubject<CurrenciesRecord>;
  private storages: StorageManager<Keys, StorageConfigs>;
  public consts!: WalletConsts;

  public constructor(api: AnyApi) {
    this.api = api;
    this.basicCurrencies = {};
    this.lpCurrencies$ = new BehaviorSubject<CurrenciesRecord>({});
    this.storages = new StorageManager(this.storageFetchers);

    this.initConsts();
    this.initBasicCurrencies();
    this.getLpCurrencies$();
  }

  private initConsts() {
    this.consts = {
      runtimeChain: this.api.runtimeChain.toString(),
      nativeCurrency: this.api.registry.chainTokens[0].toString()
    };
  }

  private get storageFetchers() {
    return {
      'trading-pairs': () =>
        new Storage<[StorageKey<TradingPair>, TradingPairStatus][]>({
          api: this.api,
          path: 'query.dex.tradingPairStatuses.entries',
          params: []
        }),
      'native-balance': ([address]: [string]) =>
        new Storage<AccountInfo>({
          api: this.api,
          path: 'query.system.account',
          params: [address]
        }),
      'non-native-balance': ([token, address]: [Token, string]) =>
        new Storage<OrmlAccountData>({
          api: this.api,
          path: 'query.tokens.accounts',
          params: [address, token.toChainData()]
        })
    } as StorageConfigs;
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

  private getLpCurrencies$() {
    const storage$ = this.storages.get();

    storage$.subscribe({
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

  private getNativeBalanceStorage(token: Token, address: string) {
    const key = `balance-${token.name}-${address}`;

    return this.getStorage(
      key,
      () =>
        new Storage<AccountInfo>(key, {
          api: this.api,
          path: 'query.system.account',
          params: [address]
        })
    );
  }

  private getNonNativeBalanceStorage(token: Token, address: string) {
    const key = `balance-${token.name}-${address}`;

    return this.getStorage(
      key,
      () =>
        new Storage<OrmlAccountData>(key, {
          api: this.api,
          path: 'query.tokens.accounts',
          params: [address, token.toChainData()]
        })
    );
  }

  /**
   *  @name subscribeCurrencies
   *  @param type
   *  @description subscirbe the currency list of `type`
   */
  public subscribeCurrencies = memoize((type: CurrencyType = CurrencyType.basic): Observable<CurrenciesRecord> => {
    if (type === CurrencyType.basic) return of(this.basicCurrencies);

    if (type === CurrencyType.lp) return this.lpCurrencies$.asObservable();

    return combineLatest([of(this.basicCurrencies), this.lpCurrencies$]).pipe(
      map(([a, b]) => {
        return { ...a, ...b };
      })
    );
  });

  /**
   *  @name subscribeCurrency
   *  @description subscirbe the currency info
   */
  public subscribeCurrency = memoize((target: MaybeCurrency): Observable<Token> => {
    const name = forceToCurrencyIdName(target);

    return this.subscribeCurrencies(CurrencyType.all).pipe(
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
  public subscribeBalance = memoize((token: Token, address: string): Observable<BalanceData> => {
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
      const storage = this.getNativeBalanceStorage(token, address);

      return storage.observable.pipe(map((data) => handleNative(data, token)));
    }

    // non-native token
    const storage = this.getNonNativeBalanceStorage(token, address);

    return storage.observable.pipe(map((data) => handleNonNative(data, token)));
  });

  /**
   * @name subscribeIssuance
   * @description subscribe `token` issuance amount
   * @param token
   */
  public subscribeIssuance = memoize((token: Token): Observable<FN> => {
    const { nativeCurrency } = this.consts;
    const key = `issuance-${token.name}`;
    const isNativeToken = nativeCurrency === token.name;

    const storage = this.getStorage(
      key,
      () =>
        new Storage<Balance>(key, {
          api: this.api,
          path: isNativeToken ? 'query.balances.totalIssuance' : 'query.tokens.totalIssuance',
          params: [token.toChainData()]
        })
    );

    const handleIssuance = (data: Balance, token: Token) => FN.fromInner(data.toString(), token.decimal);

    return storage.observable.pipe(map((data) => handleIssuance(data, token)));
  });

  /**
   * @name subscribeSuggestInput
   * @description subscirbe the suggest input amount for `account` `token`
   * @params token: Token
   * @params account: string
   */
  public subscribeSuggestInput = memoize(
    (
      _token: MaybeCurrency,
      address: string,
      isAllowDeath: boolean,
      paymentInfo: RuntimeDispatchInfo,
      feeFactor = 1
    ): Observable<FN> => {
      const nativeToken = this.basicCurrencies[this.consts.nativeCurrency] as Token;
      const isNativeToken = forceToCurrencyIdName(_token) === nativeToken.name;

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

      const inner = (token: Token) => {
        if (isNativeToken) {
          return this.getNativeBalanceStorage(token, address).observable.pipe(
            map((data) => handleNativeResult(data, token))
          );
        }

        return combineLatest({
          accountInfo: this.getNativeBalanceStorage(nativeToken, address).observable,
          tokenInfo: this.getNonNativeBalanceStorage(token, address).observable
        }).pipe(map(({ accountInfo, tokenInfo }) => handleNonNativeResult(accountInfo, tokenInfo, token)));
      };

      return this.subscribeCurrency(_token).pipe(switchMap((token) => inner(token)));
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
}
