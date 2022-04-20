import { ChainType } from '@acala-network/sdk';
import {
  Token,
  MaybeAccount,
  MaybeCurrency,
  ObOrPromiseResult,
  forceToTokenSymbolCurrencyId,
  forceToCurrencyName,
  unzipDexShareName,
  getStableAssetPoolIdFromName,
  FixedPointNumber as FN,
  isDexShareName,
  isStableAssetName,
  createLiquidCrowdloanName
} from '@acala-network/sdk-core';
import { getChainType } from '@acala-network/sdk/utils/get-chain-type';
import { AcalaPrimitivesCurrencyCurrencyId } from '@acala-network/types/interfaces/types-lookup';

import { ApiRx, ApiPromise } from '@polkadot/api';
import { SubmittableExtrinsic } from '@polkadot/api/types';
import { ISubmittableResult } from '@polkadot/types/types';
import { BalanceData, PriceData, PriceDataWithTimestamp, TransferConfig } from './types';
import { getExistentialDepositConfig } from './utils/get-existential-deposit-config';

export abstract class WalletBase<T extends ApiRx | ApiPromise> {
  protected api: T;
  protected decimalsMap: Map<string, number>;
  protected currencyIdMap: Map<string, AcalaPrimitivesCurrencyCurrencyId>;
  protected tokenMap: Map<string, Token>;
  protected nativeToken!: string;
  protected runtimeChain!: string;

  protected constructor(api: T) {
    this.api = api;
    this.decimalsMap = new Map<string, number>([]);
    this.currencyIdMap = new Map<string, AcalaPrimitivesCurrencyCurrencyId>([]);
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
        const decimals = Number(tokenDecimals?.[index]) || defaultTokenDecimal;

        this.decimalsMap.set(key, Number(tokenDecimals?.[index]) || defaultTokenDecimal);
        this.currencyIdMap.set(key, currencyId);
        this.tokenMap.set(key, Token.fromCurrencyId(currencyId, { decimals }));
      } catch (e) {
        // ignore eorror
      }
    });

    // insert LCDOT if chain is acala
    const chainType = getChainType(this.runtimeChain);

    if (chainType === ChainType.ACALA || chainType === ChainType.MANDALA) {
      const name = createLiquidCrowdloanName(13);

      this.tokenMap.set(
        name,
        new Token(name, {
          decimals: this.tokenMap.get('DOT')?.decimals || 12
        })
      );
    }
  }

  public isNativeToken(currency: MaybeCurrency): boolean {
    return forceToCurrencyName(currency) === forceToCurrencyName(this.nativeToken);
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
    const currencyName = forceToCurrencyName(currency);

    if (isDexShareName(currencyName)) {
      const [token1, token2] = unzipDexShareName(currencyName);

      const _token1 = this.getToken(token1);
      const _token2 = this.getToken(token2);

      return Token.fromTokens(_token1, _token2);
    } else if (isStableAssetName(currencyName)) {
      const poolId = getStableAssetPoolIdFromName(currencyName);

      return Token.fromStableAssetPool(this.api.runtimeChain.toString(), poolId);
    }

    return this.tokenMap.get(currencyName)?.clone() || new Token('EMPTY');
  }

  public getTransferConfig(currency: MaybeCurrency): TransferConfig {
    const name = forceToCurrencyName(currency);
    const token = this.getToken(name);

    if (token.isForeignAsset) {
      return { existentialDeposit: token.ed };
    }

    if (isDexShareName(name)) {
      // if the token is dex, use the first token config after sort
      const [token1] = Token.sortTokenNames(...unzipDexShareName(name));

      return {
        existentialDeposit: getExistentialDepositConfig(this.runtimeChain, token1)
      };
    }

    const existentialDeposit = getExistentialDepositConfig(this.runtimeChain, forceToCurrencyName(currency));

    return { existentialDeposit };
  }

  /**
   * @name checkTransfer
   * @description check transfer amount to target account is ok or not
   */
  public abstract checkTransfer(
    account: MaybeAccount,
    currency: MaybeCurrency,
    amount: FN,
    direction?: 'from' | 'to'
  ): ObOrPromiseResult<T, boolean>;

  /**
   * @name queryBalance
   * @description get the balance of the currency
   */
  public abstract queryBalance(
    account: MaybeAccount,
    currency: MaybeCurrency,
    at?: number
  ): ObOrPromiseResult<T, BalanceData>;

  /**
   * @name queryPrices
   * @description get prices of tokens
   */
  public abstract queryPrices(tokens: MaybeCurrency[], at?: number): ObOrPromiseResult<T, PriceData[]>;

  /**
   * @name queryPrice
   * @description get the price
   */
  public abstract queryPrice(currency: MaybeCurrency, at?: number): ObOrPromiseResult<T, PriceData>;

  /**
   * @name queryPriceFromDex
   * @description get the oracle feed price
   */
  public abstract queryPriceFromDex(currency: MaybeCurrency, at?: number): ObOrPromiseResult<T, PriceData>;

  /**
   * @name queryDexSharePriceFormDex
   * @description get the oracle feed price
   */
  public abstract queryDexSharePriceFormDex(currency: MaybeCurrency, at?: number): ObOrPromiseResult<T, PriceData>;

  /**
   * @name subscribeOracleFeeds
   */
  public abstract subscribeOracleFeed(provider: string): ObOrPromiseResult<T, PriceDataWithTimestamp[]>;

  public abstract getMaxInputBalance(
    call: SubmittableExtrinsic<T extends ApiRx ? 'rxjs' : 'promise', ISubmittableResult>,
    currency: MaybeCurrency,
    account: MaybeAccount,
    isAllowDeath: boolean,
    feeFactor?: number
  ): ObOrPromiseResult<T, FN>;
}
