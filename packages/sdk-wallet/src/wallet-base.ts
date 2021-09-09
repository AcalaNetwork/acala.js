import {
  Token,
  MaybeAccount,
  MaybeCurrency,
  ObOrPromiseResult,
  forceToTokenSymbolCurrencyId,
  forceToCurrencyIdName,
  getLPCurrenciesFormName,
  isDexShare,
  FixedPointNumber
} from '@acala-network/sdk-core';
import { CurrencyId } from '@acala-network/types/interfaces';

import { ApiRx, ApiPromise } from '@polkadot/api';
import { getExistentialDeposit } from './existential-deposit';
import { BalanceData, PriceData, PriceDataWithTimestamp, TransferConfig } from './types';

export abstract class WalletBase<T extends ApiRx | ApiPromise> {
  protected api: T;
  protected decimalMap: Map<string, number>;
  protected currencyIdMap: Map<string, CurrencyId>;
  protected tokenMap: Map<string, Token>;
  protected nativeToken!: string;
  protected runtimeChain!: string;

  protected constructor(api: T) {
    this.api = api;
    this.decimalMap = new Map<string, number>([]);
    this.currencyIdMap = new Map<string, CurrencyId>([]);
    this.tokenMap = new Map<string, Token>([]);

    this.init();
  }

  private init() {
    const tokenDecimals = this.api.registry.chainDecimals;
    const tokenSymbol = this.api.registry.chainTokens;

    const defaultTokenDecimal = Number(tokenDecimals?.[0]) || 12;

    this.runtimeChain = this.api.runtimeChain.toString();
    this.nativeToken = tokenSymbol[0].toString();

    tokenSymbol.forEach((item, index) => {
      try {
        const key = item.toString();
        const currencyId = forceToTokenSymbolCurrencyId(this.api, key);
        const decimal = Number(tokenDecimals?.[index]) || defaultTokenDecimal;

        this.decimalMap.set(key, Number(tokenDecimals?.[index]) || defaultTokenDecimal);
        this.currencyIdMap.set(key, currencyId);
        this.tokenMap.set(key, Token.fromCurrencyId(currencyId, decimal));
      } catch (e) {
        // ignore eorror
      }
    });
  }

  /**
   * @name getAllTokens
   * @description get all available currencies
   */
  public getAllTokens(): Token[] {
    return Array.from(this.tokenMap.values()).map((item) => item.clone());
  }

  public getNativeToken(): Token {
    const nativeCurrencyId = this.api.consts.currencies.getNativeCurrencyId;

    return this.getToken(nativeCurrencyId).clone();
  }

  /**
   * @name getToken
   * @description get the currency
   */
  public getToken(currency: MaybeCurrency): Token {
    const currencyName = forceToCurrencyIdName(currency);

    if (isDexShare(currencyName)) {
      const [token1, token2] = getLPCurrenciesFormName(currencyName);

      const _token1 = this.getToken(token1);
      const _token2 = this.getToken(token2);

      return Token.fromTokens(_token1, _token2);
    }

    // FIXME: need handle erc20

    return this.tokenMap.get(currencyName)?.clone() || new Token('EMPTY');
  }

  public getTransferConfig(currency: MaybeCurrency): TransferConfig {
    const name = forceToCurrencyIdName(currency);

    if (isDexShare(name)) {
      const [token1] = Token.sortTokenNames(...getLPCurrenciesFormName(name));

      return {
        existentialDeposit: getExistentialDeposit(this.runtimeChain, token1)
      };
    }

    const existentialDeposit = getExistentialDeposit(this.runtimeChain, forceToCurrencyIdName(currency));

    return { existentialDeposit };
  }

  /**
   * @name checkTransfer
   * @description check transfer amount to target account is ok or not
   */
  abstract checkTransfer(
    account: MaybeAccount,
    currency: MaybeCurrency,
    amount: FixedPointNumber,
    direction?: 'from' | 'to'
  ): ObOrPromiseResult<T, boolean>;

  /**
   * @name queryBalance
   * @description get the balance of the currency
   */
  abstract queryBalance(account: MaybeAccount, currency: MaybeCurrency, at?: number): ObOrPromiseResult<T, BalanceData>;

  /**
   * @name queryPrices
   * @description get prices of tokens
   */
  abstract queryPrices(tokens: MaybeCurrency[], at?: number): ObOrPromiseResult<T, PriceData[]>;

  /**
   * @name queryPrice
   * @description get the price
   */
  abstract queryPrice(currency: MaybeCurrency, at?: number): ObOrPromiseResult<T, PriceData>;

  /**
   * @name queryOraclePrice
   * @description get the oracle feed price
   */
  abstract queryOraclePrice(): ObOrPromiseResult<T, PriceDataWithTimestamp[]>;

  /**
   * @name queryLiquidPriceFromStakingPool
   * @description get the oracle feed price
   */
  abstract queryLiquidPriceFromStakingPool(at?: number): ObOrPromiseResult<T, PriceData>;

  /**
   * @name queryPriceFromDex
   * @description get the oracle feed price
   */
  abstract queryPriceFromDex(currency: MaybeCurrency, at?: number): ObOrPromiseResult<T, PriceData>;

  /**
   * @name queryDexSharePriceFormDex
   * @description get the oracle feed price
   */
  abstract queryDexSharePriceFormDex(currency: MaybeCurrency, at?: number): ObOrPromiseResult<T, PriceData>;

  /**
   * @name subscribeOracleFeeds
   */
  abstract subscribeOracleFeed(provider: string): ObOrPromiseResult<T, PriceDataWithTimestamp[]>;
}
