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
  FixedPointNumber,
  isLiquidCrowdloanName,
  getLiquidCrowdloanIdFromName
} from '@acala-network/sdk-core';
import { BehaviorSubject, combineLatest, Observable, of, firstValueFrom } from 'rxjs';
import { map, switchMap, filter, catchError } from 'rxjs/operators';
import { TokenRecord, WalletConsts, BalanceData, PresetTokens, WalletConfigs, PriceProviders } from './types';
import { BelowExistentialDeposit, ChainType, Homa, Liquidity, SDKNotReady } from '..';
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
import { subscribeLiquidCrowdloanTokenPrice } from './utils/get-liquid-crowdloan-token-price';
import { Vesting } from './vesting';
import { toPromise } from './utils/to-promise';

export class Wallet implements BaseSDK {
  private api: AnyApi;
  // readed from chain information
  private storages!: ReturnType<typeof createStorages>;
  private configs!: WalletConfigs;

  private balanceAdapter!: AcalaExpandBalanceAdapter;
  private tokenProvider!: TokenProvider;
  public priceProviders!: PriceProviders;

  // inject liquidity, homa sdk by default for easy using
  public liquidity!: Liquidity;
  public homa!: Homa;
  public web3Name!: DIDWeb3Name;

  public isReady$: BehaviorSubject<boolean>;
  public consts!: WalletConsts;
  public vesting!: Vesting;

  public constructor(api: AnyApi, configs?: WalletConfigs) {
    this.api = api;
    this.isReady$ = new BehaviorSubject<boolean>(false);
    this.configs = {
      ...configs
    };

    this.tokenProvider = new AcalaTokenProvider(this.api);
    this.init();
  }

  public get isReady(): Promise<boolean> {
    return firstValueFrom(this.isReady$.asObservable().pipe(filter((i) => i)));
  }

  private init() {
    // 1. init constants
    this.initConsts();

    this.tokenProvider.isReady$.subscribe({
      next: (status) => {
        this.balanceAdapter = new AcalaBalanceAdapter({
          api: this.api,
          evmProvider: this.configs?.evmProvider
        });
        this.liquidity = new Liquidity(this.api, this);
        this.homa = new Homa(this.api, this);
        this.web3Name = new DIDWeb3Name();

        const market = new MarketPriceProvider();
        const dex = new DexPriceProvider(this.liquidity);
        const aggregate = new AggregateProvider({ market, dex });
        const oracle = new OraclePriceProvider(this.api, {
          stakingToken: this.getPresetTokens(true).stableToken,
          tokenPrivoder: this.tokenProvider
        });

        this.priceProviders = {
          // default price provider
          [PriceProviderType.AGGREGATE]: aggregate,
          [PriceProviderType.MARKET]: market,
          [PriceProviderType.ORACLE]: oracle,
          [PriceProviderType.DEX]: dex,
          ...this.configs?.priceProviders
        };
        this.vesting = new Vesting({ api: this.api, tokenProvider: this.tokenProvider });
        this.storages = createStorages(this.api);

        this.isReady$.next(status);
      }
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

  /**
   * @name __getToken
   * @deprecated change to `getToke`
   */
  public __getToken(target: MaybeCurrency): Token {
    return this.tokenProvider.getToken(target);
  }

  // direct get token no need await, must be called after wallet sdk is ready
  public getToken(target: MaybeCurrency): Token {
    return this.tokenProvider.getToken(target);
  }

  /**
   * @name subscribeBalance
   * @description subscribe `address` `token` balance information
   * @param token
   * @param address
   */
  public subscribeBalance = memoize((symbol: MaybeCurrency, address: string): Observable<BalanceData> => {
    const token = this.tokenProvider.getToken(symbol);

    return this.balanceAdapter.subscribeBalance(token, address);
  });

  public async getBalance(token: MaybeCurrency, address: string): Promise<BalanceData> {
    return firstValueFrom(this.subscribeBalance(token, address));
  }

  /**
   * @name subscribeIssuance
   * @description subscribe `token` issuance amount
   * @param token
   */
  public subscribeIssuance = memoize((symbol: MaybeCurrency): Observable<FN> => {
    const token = this.tokenProvider.getToken(symbol);

    return this.balanceAdapter.subscribeIssuance(token);
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
      symbol: MaybeCurrency,
      address: string,
      isAllowDeath: boolean,
      fee: {
        currency: MaybeCurrency;
        amount: FN;
      }
    ): Observable<FN> => {
      const token = this.tokenProvider.getToken(symbol);

      return combineLatest({
        nativeToken: this.subscribeToken(this.consts.nativeCurrency),
        feeToken: this.subscribeToken(fee.currency)
      }).pipe(
        switchMap(({ nativeToken, feeToken }) => {
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
              const nativeLockedBalance = FN.fromInner(
                accountInfo.data.miscFrozen.toString(),
                nativeToken.decimals
              ).max(FN.fromInner(accountInfo.data.feeFrozen.toString(), nativeToken.decimals));
              const isDefaultFee = forceToCurrencyName(feeToken) === nativeToken.name;
              const feeFreeBalance = isDefaultFee ? nativeFreeBalance : feeInfo.free;
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

  public getPresetTokens(ignoreCheck = false): PresetTokens {
    if (!ignoreCheck && this.isReady$.value === false) throw new SDKNotReady('wallet');

    const tokens = this.tokenProvider.getAllTokens();

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
  public subscribePrice = memoize((symbol: MaybeCurrency, type = PriceProviderType.AGGREGATE): Observable<FN> => {
    const name = forceToCurrencyName(symbol);
    const isDexShare = isDexShareName(name);
    const presetTokens = this.getPresetTokens();
    const isLiquidToken = presetTokens?.liquidToken?.name === name;
    const stakingToken = presetTokens.stakingToken;

    // if token is dex share, get dex share price form liquidity sdk
    if (isDexShare) {
      return this.liquidity.subscribePoolDetails(name).pipe(
        map((data) => data.sharePrice),
        catchError(() => {
          // return 0 when error occured
          return of(FixedPointNumber.ZERO);
        })
      );
    }

    // get liquid token price when type price type isn't dex
    if (isLiquidToken && stakingToken && type !== PriceProviderType.DEX) {
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

    // get liquid crowdloan token price when the price type is not dex
    if (isLiquidCrowdloanName(name) && type !== PriceProviderType.DEX) {
      return this.subscribePrice(stakingToken, type).pipe(
        switchMap((price) => subscribeLiquidCrowdloanTokenPrice(this.api, price, getLiquidCrowdloanIdFromName(name)))
      );
    }

    // handle sa://0 as KSM, when chain is karuar
    if (ChainType.KARURA === getChainType(this.consts.runtimeChain) && name === 'sa://0' && stakingToken) {
      return this.subscribePrice(stakingToken, type);
    }

    const token = this.tokenProvider.getToken(symbol);

    if (type === PriceProviderType.MARKET && this.priceProviders[PriceProviderType.MARKET]) {
      return this.priceProviders[PriceProviderType.MARKET]?.subscribe(token) || of(FixedPointNumber.ZERO);
    }

    if (type === PriceProviderType.AGGREGATE && this.priceProviders[PriceProviderType.AGGREGATE]) {
      return this.priceProviders[PriceProviderType.AGGREGATE]?.subscribe(token) || of(FixedPointNumber.ZERO);
    }

    if (type === PriceProviderType.DEX && this.priceProviders[PriceProviderType.DEX]) {
      return this.priceProviders[PriceProviderType.DEX]?.subscribe(token) || of(FixedPointNumber.ZERO);
    }

    if (type === PriceProviderType.ORACLE && this.priceProviders[PriceProviderType.ORACLE]) {
      return this.priceProviders[PriceProviderType.ORACLE]?.subscribe(token) || of(FixedPointNumber.ZERO);
    }

    return of(FixedPointNumber.ZERO);
  });

  public getPrice(token: MaybeCurrency, type?: PriceProviderType): Promise<FN> {
    return firstValueFrom(this.subscribePrice(token, type));
  }

  public async checkTransfer(address: string, currency: MaybeCurrency, amount: FN, direction: 'from' | 'to' = 'to') {
    const { nativeToken } = this.getPresetTokens();
    const token = this.getToken(currency);
    const isNativeToken = nativeToken.isEqual(token);
    const accountInfo = await toPromise(this.api.query.system.account(address));
    const balance = await this.getBalance(currency, address);

    let needCheck = true;

    // always check ED if the direction is `to`
    if (direction === 'to' && balance.free.add(amount).lt(token.ed || FN.ZERO)) {
      throw new BelowExistentialDeposit(address, token);
    }

    if (direction === 'from') {
      if (isNativeToken) {
        needCheck = !(accountInfo.consumers.toBigInt() === BigInt(0));
      } else {
        needCheck = !(accountInfo.providers.toBigInt() > BigInt(0) || accountInfo.consumers.toBigInt() === BigInt(0));
      }

      if (needCheck && balance.free.minus(amount).lt(token.ed || FN.ZERO)) {
        throw new BelowExistentialDeposit(address, token);
      }
    }

    return true;
  }
}
