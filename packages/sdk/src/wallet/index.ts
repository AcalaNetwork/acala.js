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
  TokenType,
  isDexShareName,
  FixedPointNumber
} from '@acala-network/sdk-core';
import { BehaviorSubject, combineLatest, Observable, of, firstValueFrom } from 'rxjs';
import { map, switchMap, filter } from 'rxjs/operators';
import { TokenRecord, WalletConsts, BalanceData, PresetTokens, WalletConfigs, PriceProviders } from './type';
import { ChainType, Homa, Liquidity, SDKNotReady } from '..';
import { getMaxAvailableBalance } from './utils/get-max-available-balance';
import { MarketPriceProvider } from './price-provider/market-price-provider';
import { OraclePriceProvider } from './price-provider/oracle-price-provider';
import { PriceProviderType } from './price-provider/types';
import { BaseSDK } from '../types';
import { createStorages } from './storages';
import { getChainType } from '../utils/get-chain-type';
import { DexPriceProvider } from './price-provider/dex-price-provider';
import { AggregateProvider } from './price-provider/aggregate-price-provider';
import { AcalaExpandBalanceAdapter } from './balance-adapter/types';
import { AcalaBalanceAdapter } from './balance-adapter/acala';
import { TokenProvider } from './token-provider/type';
import { AcalaTokenProvider } from './token-provider/acala';
import { DIDWeb3Name } from './web3name/did';

export class Wallet implements BaseSDK {
  private api: AnyApi;
  // readed from chain information
  private storages: ReturnType<typeof createStorages>;
  private configs: WalletConfigs;

  private balanceAdapter: AcalaExpandBalanceAdapter;
  private tokenProvider: TokenProvider;
  private priceProviders: PriceProviders;

  // inject liquidity, homa sdk by default for easy using
  public readonly liquidity: Liquidity;
  public readonly homa: Homa;

  public isReady$: BehaviorSubject<boolean>;
  public consts!: WalletConsts;
  readonly web3Name: DIDWeb3Name;

  public constructor(
    api: AnyApi,
    configs?: WalletConfigs
    // tokenPriceFetchSource = defaultTokenPriceFetchSource,
    // priceProviders?: Record<PriceProviderType, PriceProvider>
  ) {
    this.api = api;
    this.isReady$ = new BehaviorSubject<boolean>(false);
    this.configs = {
      supportAUSD: true,
      ...configs
    };

    this.tokenProvider = new AcalaTokenProvider(this.api, {
      kusd2ausd: this.configs.supportAUSD || true
    });
    this.balanceAdapter = new AcalaBalanceAdapter({
      api: this.api,
      wsProvider: configs?.wsProvider
    });

    // init liquidty module
    this.liquidity = new Liquidity(this.api, this);
    // init homa module
    this.homa = new Homa(this.api, this);
    // init did-web3 name module
    this.web3Name = new DIDWeb3Name();
    // init price module
    const market = new MarketPriceProvider();
    const dex = new DexPriceProvider(this.liquidity);
    const aggregate = new AggregateProvider({ market, dex });
    const oracle = new OraclePriceProvider(this.api);

    this.priceProviders = {
      // default price provider
      [PriceProviderType.AGGREGATE]: aggregate,
      [PriceProviderType.MARKET]: market,
      [PriceProviderType.ORACLE]: oracle,
      [PriceProviderType.DEX]: dex,
      ...this.configs?.priceProviders
    };
    this.storages = createStorages(this.api);

    this.init();
  }

  public get isReady(): Promise<boolean> {
    return firstValueFrom(this.isReady$.asObservable().pipe(filter((i) => i)));
  }

  private init() {
    // 1. init constants
    this.initConsts();

    this.tokenProvider.isReady$.subscribe({
      next: (status) => this.isReady$.next(status)
    });
  }

  private initConsts() {
    this.consts = {
      runtimeChain: this.api.runtimeChain.toString(),
      nativeCurrency: this.api.registry.chainTokens[0].toString()
    };
  }

  /**
   *  @name subscribeTokens
   *  @param type
   *  @description subscirbe the token list, can filter by type
   */
  public subscribeTokens = memoize((type?: TokenType | TokenType[]): Observable<TokenRecord> => {
    return this.tokenProvider.subscribeTokens(type);
  });

  public async getTokens(type?: TokenType | TokenType[]): Promise<TokenRecord> {
    return firstValueFrom(this.subscribeTokens(type));
  }

  /**
   *  @name subscribeToken
   *  @description subscirbe the token info
   */
  public subscribeToken = memoize((target: MaybeCurrency): Observable<Token> => {
    return this.tokenProvider.subscribeToken(target);
  });

  public async getToken(target: MaybeCurrency): Promise<Token> {
    return firstValueFrom(this.subscribeToken(target));
  }

  // direct get token no need await, must be called after wallet sdk is ready
  public __getToken(target: MaybeCurrency): Token {
    return this.tokenProvider.__getToken(target);
  }

  /**
   * @name subscribeBalance
   * @description subscribe `address` `token` balance information
   * @param token
   * @param address
   */
  public subscribeBalance = memoize((token: MaybeCurrency, address: string): Observable<BalanceData> => {
    return this.subscribeToken(token).pipe(switchMap((token) => this.balanceAdapter.subscribeBalance(token, address)));
  });

  public async getBalance(token: MaybeCurrency, address: string): Promise<BalanceData> {
    return firstValueFrom(this.subscribeBalance(token, address));
  }

  /**
   * @name subscribeIssuance
   * @description subscribe `token` issuance amount
   * @param token
   */
  public subscribeIssuance = memoize((token: MaybeCurrency): Observable<FN> => {
    return this.subscribeToken(token).pipe(switchMap((token) => this.balanceAdapter.subscribeIssuance(token)));
  });

  public async getIssuance(token: MaybeCurrency): Promise<FN> {
    return firstValueFrom(this.subscribeIssuance(token));
  }

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
      fee: {
        currency: MaybeCurrency;
        amount: FN;
      }
    ): Observable<FN> => {
      return combineLatest({
        token: this.subscribeToken(token),
        nativeToken: this.subscribeToken(this.consts.nativeCurrency),
        feeToken: this.subscribeToken(fee.currency)
      }).pipe(
        switchMap(({ token, nativeToken, feeToken }) => {
          const isNativeToken = forceToCurrencyName(token) === nativeToken.name;
          const isFeeToken = forceToCurrencyName(feeToken) === forceToCurrencyName(token);

          return combineLatest({
            accountInfo: this.storages.nativeBalance(address).observable,
            tokenInfo: this.balanceAdapter.subscribeBalance(token, address),
            feeInfo: this.balanceAdapter.subscribeBalance(feeToken, address)
          }).pipe(
            map(({ accountInfo, tokenInfo, feeInfo }) => {
              const providers = accountInfo.providers.toBigInt();
              const consumers = accountInfo.consumers.toBigInt();
              const nativeFreeBalance = FN.fromInner(accountInfo.data.free.toString(), nativeToken.decimals);
              // native locked balance = max(accountInfo.data.miscFrozen, accountInfo.data.feeFrozen)
              const nativeLockedBalance = FN.fromInner(
                accountInfo.data.miscFrozen.toString(),
                nativeToken.decimals
              ).max(FN.fromInner(accountInfo.data.feeFrozen.toString(), nativeToken.decimals));
              const isDefaultFee = forceToCurrencyName(feeToken) === nativeToken.name;
              const feeFreeBalance = isDefaultFee ? nativeFreeBalance : feeInfo.free;
              // const feeLockedBalance =
              //   forceToCurrencyName(feeToken) === nativeToken.name ? nativeLockedBalance : feeInfo.locked;

              const targetFreeBalance: FixedPointNumber = isNativeToken ? nativeFreeBalance : tokenInfo.free;
              const targetLockedBalance: FixedPointNumber = isNativeToken ? nativeLockedBalance : tokenInfo.locked;
              const ed = token.ed;

              return getMaxAvailableBalance({
                isDefaultFee,
                isFeeToken,
                isAllowDeath,
                providers,
                consumers,
                feeFreeBalance,
                targetFreeBalance,
                targetLockedBalance,
                ed,
                fee: fee.amount
              });
            })
          );
        })
      );
    }
  );

  public async getSuggestInput(
    token: MaybeCurrency,
    address: string,
    isAllowDeath: boolean,
    fee: {
      currency: MaybeCurrency;
      amount: FN;
    }
  ): Promise<FN> {
    return firstValueFrom(this.subscribeSuggestInput(token, address, isAllowDeath, fee));
  }

  public getPresetTokens(): PresetTokens {
    if (this.isReady$.value === false) {
      throw new SDKNotReady('wallet');
    }

    const tokens = this.tokenProvider.__getAllTokens();

    const data: PresetTokens = {
      nativeToken: tokens[forceToCurrencyName(this.consts.nativeCurrency)],
      stableToken: tokens[forceToCurrencyName(this.api.consts.cdpEngine.getStableCurrencyId)],
      liquidToken:
        tokens[
          forceToCurrencyName(
            this.api.consts.homa?.liquidCurrencyId || this.api.consts.homaLite?.liquidCurrencyId || ''
          )
        ],
      stakingToken:
        tokens[
          forceToCurrencyName(
            this.api.consts.homa?.stakingCurrencyId || this.api.consts.homaLite?.stakingCurrencyId || ''
          )
        ]
    };

    return data;
  }

  /**
   * @name subscribePrice
   * @description subscirbe the price of `token`
   */
  public subscribePrice = memoize((token: MaybeCurrency, type = PriceProviderType.AGGREGATE): Observable<FN> => {
    const name = forceToCurrencyName(token);
    const isDexShare = isDexShareName(name);
    const presetTokens = this.getPresetTokens();
    const isLiquidToken = presetTokens?.liquidToken?.name === name;
    const stakingToken = presetTokens.stakingToken;

    // if token is dex share, get dex share price form liquidity sdk
    if (isDexShare) {
      return this.liquidity.subscribePoolDetails(name).pipe(map((data) => data.sharePrice));
    }

    // get liquid token price when price type is market/aggergate/oracle
    if (isLiquidToken && stakingToken && type !== PriceProviderType.DEX) {
      // create homa sd for get exchange rate
      return this.homa.env$.pipe(
        filter((env) => !env.exchangeRate.isZero()),
        switchMap((env) =>
          this.subscribePrice(stakingToken, type).pipe(
            map((price) => {
              return price.times(env.exchangeRate);
            })
          )
        )
      );
    }

    // handle sa://0 as KSM, when chain is karuar
    if (ChainType.KARURA === getChainType(this.consts.runtimeChain) && name === 'sa://0' && stakingToken) {
      return this.subscribePrice(stakingToken, type);
    }

    if (type === PriceProviderType.MARKET && this.priceProviders[PriceProviderType.MARKET]) {
      return this.subscribeToken(token).pipe(
        switchMap(
          (token) => this.priceProviders[PriceProviderType.MARKET]?.subscribe(token) || of(FixedPointNumber.ZERO)
        )
      );
    }

    if (type === PriceProviderType.AGGREGATE && this.priceProviders[PriceProviderType.AGGREGATE]) {
      return this.subscribeToken(token).pipe(
        switchMap(
          (token) => this.priceProviders[PriceProviderType.AGGREGATE]?.subscribe(token) || of(FixedPointNumber.ZERO)
        )
      );
    }

    if (type === PriceProviderType.DEX && this.priceProviders[PriceProviderType.DEX]) {
      return this.subscribeToken(token).pipe(
        switchMap((token) => this.priceProviders[PriceProviderType.DEX]?.subscribe(token) || of(FixedPointNumber.ZERO))
      );
    }

    if (type === PriceProviderType.ORACLE && this.priceProviders[PriceProviderType.ORACLE]) {
      return this.subscribeToken(token).pipe(
        switchMap(
          (token) => this.priceProviders[PriceProviderType.ORACLE]?.subscribe(token) || of(FixedPointNumber.ZERO)
        )
      );
    }

    return of(FixedPointNumber.ZERO);
  });

  public getPrice(token: MaybeCurrency, type?: PriceProviderType): Promise<FN> {
    return firstValueFrom(this.subscribePrice(token, type));
  }
}
