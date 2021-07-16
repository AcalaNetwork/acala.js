import { ApiPromise } from '@polkadot/api';

import { assert } from '@polkadot/util';
import { TimestampedValue } from '@open-web3/orml-types/interfaces';
import { FixedPointNumber, Token, TokenBalance } from '@acala-network/sdk-core';
import { Balance, BlockNumber, CurrencyId, OracleKey } from '@acala-network/types/interfaces';
import {
  forceToCurrencyId,
  forceToCurrencyIdName,
  forceToTokenSymbolCurrencyId,
  getLPCurrenciesFormName,
  isDexShare
} from '@acala-network/sdk-core/converter';
import { MaybeAccount, MaybeCurrency } from '@acala-network/sdk-core/types';
import { PriceData, PriceDataWithTimestamp } from './types';
import type { ITuple } from '@polkadot/types/types';
import type { Option } from '@polkadot/types';
import { WalletBase } from './wallet-base';
import { BlockHash } from '@polkadot/types/interfaces';

const ORACLE_FEEDS_TOKEN = ['DOT', 'XBTC', 'RENBTC', 'POLKABTC'];

export class WalletPromise extends WalletBase<ApiPromise> {
  private decimalMap: Map<string, number>;
  private currencyIdMap: Map<string, CurrencyId>;
  private tokenMap: Map<string, Token>;
  private oracleFeed$: Promise<PriceDataWithTimestamp[]>;
  private nativeToken!: string;

  constructor(api: ApiPromise) {
    super(api);

    this.decimalMap = new Map<string, number>([]);
    this.currencyIdMap = new Map<string, CurrencyId>([]);
    this.tokenMap = new Map<string, Token>([]);
    this.oracleFeed$ = new Promise<PriceDataWithTimestamp[]>((resolve) => resolve([]));

    const tokenDecimals = this.api.registry.chainDecimals;
    const tokenSymbol = this.api.registry.chainTokens;
    this.nativeToken = tokenSymbol[0].toString();

    const defaultTokenDecimal = tokenDecimals?.[0] || 18;
    tokenSymbol.forEach((item, index) => {
      const key = item.toString();
      const currencyId = forceToTokenSymbolCurrencyId(this.api, key);
      const decimal = tokenDecimals?.[index] || defaultTokenDecimal;

      this.decimalMap.set(key, tokenDecimals?.[index] || defaultTokenDecimal);
      this.currencyIdMap.set(key, currencyId);
      this.tokenMap.set(key, Token.fromCurrencyId(currencyId, decimal));
    });
  }

  // query price info, support specify data source
  private _queryPrice = async (currency: MaybeCurrency, at?: number): Promise<PriceData> => {
    const currencyName = forceToCurrencyIdName(currency);
    const liquidCurrencyId = this.api.consts?.stakingPool?.liquidCurrencyId;

    // get liquid currency price from staking pool exchange rate
    if (liquidCurrencyId && forceToCurrencyIdName(currency) === forceToCurrencyIdName(liquidCurrencyId)) {
      return this.queryLiquidPriceFromStakingPool(at);
    }

    // get dex share price
    if (isDexShare(currencyName)) {
      return this.queryDexSharePriceFormDex(currency, at);
    }

    // get stable coin price
    if (currencyName === 'AUSD' || currencyName === 'KUSD') {
      const usd = this.tokenMap.get('AUSD') || this.tokenMap.get('KUSD') || new Token('USD', { decimal: 12 });

      return {
        token: usd,
        price: new FixedPointNumber(1, usd.decimal)
      };
    }

    // get price of ORACLE_FEEDS_TOKEN
    if (ORACLE_FEEDS_TOKEN.includes(currencyName)) {
      return this.queryPriceFromOracle(currency, at);
    }

    // get price from dex default
    return this.queryPriceFromDex(currency, at);
  };

  public queryDexSharePriceFormDex = async (currency: MaybeCurrency, at?: number): Promise<PriceData> => {
    const [key1, key2] = getLPCurrenciesFormName(forceToCurrencyIdName(currency));
    const dexShareCurrency = forceToCurrencyId(this.api, currency);
    const currency1 = forceToCurrencyId(this.api, key1);
    const currency2 = forceToCurrencyId(this.api, key2);
    const token1 = this.getToken(key1);
    const token2 = this.getToken(key2);
    const dexShareToken = this.getToken(dexShareCurrency);

    const [dex, totalIssuance, price1, price2] = await Promise.all([
      this.queryDexPool(currency1, currency2, at),
      this.queryIssuance(dexShareToken, at),
      this.queryPrice(token1, at),
      this.queryPrice(token2, at)
    ]);
    const currency1Amount = dex[0];
    const currency2Amount = dex[1];
    const currency1AmountOfOne = currency1Amount.div(totalIssuance);
    const currency2AmountOfOne = currency2Amount.div(totalIssuance);
    const price = currency1AmountOfOne.times(price1.price).plus(currency2AmountOfOne.times(price2.price));
    return {
      token: dexShareToken,
      price
    };
  };

  public queryPriceFromOracle = (token: MaybeCurrency, at?: number): Promise<PriceData> => {
    if (!at) {
      const currencyName = forceToCurrencyIdName(token);

      return this.oracleFeed$.then(
        (data): PriceData => {
          const maybe = data.find((item) => item.token.name === currencyName);

          return {
            token: maybe?.token || new Token(currencyName),
            price: maybe?.price || FixedPointNumber.ZERO
          };
        }
      );
    }

    return this.getBlockHash(at).then((hash) => {
      const currencyId = forceToCurrencyId(this.api, token);

      return this.api.query.acalaOracle.values
        .at<Option<TimestampedValue>>(hash.toString(), currencyId)
        .then((data) => {
          const token = this.getToken(currencyId);
          const price = data.unwrapOrDefault().value;

          return price.isEmpty
            ? { token, price: new FixedPointNumber(0) }
            : { token, price: FixedPointNumber.fromInner(price.toString()) };
        });
    });
  };

  public queryLiquidPriceFromStakingPool = (at?: number) => {
    const liquidCurrencyId = this.api.consts.stakingPool.liquidCurrencyId;
    const stakingCurrencyId = this.api.consts.stakingPool.stakingCurrencyId;

    const liquidToken = this.getToken(liquidCurrencyId);
    const stakingToken = this.getToken(stakingCurrencyId);

    return this.getBlockHash(at)
      .then((hash) => {
        return Promise.all([
          this.queryPriceFromOracle(stakingToken, at),
          this.api.query.stakingPool.stakingPoolLedger.at(hash.toString()),
          this._queryIssuance(liquidToken, at)
        ]);
      })
      .then(([stakingTokenPrice, ledger, liquidIssuance]) => {
        const bonded = FixedPointNumber.fromInner(ledger.bonded.toString());
        const freePool = FixedPointNumber.fromInner(ledger.freePool.toString());
        const unbindingToFree = FixedPointNumber.fromInner(ledger.unbondingToFree.toString());
        const toUnbindNextEra = FixedPointNumber.fromInner(
          !ledger.toUnbondNextEra.isEmpty ? ledger.toUnbondNextEra[0].toString() : '0'
        );

        const totalStakingTokenBalance = bonded
          .plus(freePool)
          .plus(unbindingToFree)
          .minus(toUnbindNextEra)
          .max(FixedPointNumber.ZERO);

        totalStakingTokenBalance.forceSetPrecision(stakingToken.decimal);

        const ratio = liquidIssuance.isZero() ? FixedPointNumber.ZERO : totalStakingTokenBalance.div(liquidIssuance);

        return {
          token: liquidToken,
          price: stakingTokenPrice.price.times(ratio)
        };
      });
  };

  public queryDexPool = (token1: MaybeCurrency, token2: MaybeCurrency, at?: number) => {
    const token1CurrencyId = forceToCurrencyId(this.api, token1);
    const token2CurrencyId = forceToCurrencyId(this.api, token2);
    const _token1 = Token.fromCurrencyId(token1CurrencyId);
    const _token2 = Token.fromCurrencyId(token2CurrencyId);
    const [sorted1, sorted2] = Token.sort(_token1, _token2);

    return this.getBlockHash(at).then((hash) => {
      return this.api.query.dex.liquidityPool
        .at<ITuple<[Balance, Balance]>>(hash.toString(), [sorted1.toChainData(), sorted2.toChainData()])
        .then((pool: ITuple<[Balance, Balance]>) => {
          const balance1 = pool[0];
          const balance2 = pool[1];

          const fixedPoint1 = FixedPointNumber.fromInner(balance1.toString(), this.getToken(sorted1).decimal);
          const fixedPoint2 = FixedPointNumber.fromInner(balance2.toString(), this.getToken(sorted2).decimal);

          if (forceToCurrencyIdName(sorted1) === forceToCurrencyIdName(token1)) {
            return [fixedPoint1, fixedPoint2];
          } else {
            return [fixedPoint2, fixedPoint1];
          }
        });
    });
  };

  public queryPriceFromDex = (currency: MaybeCurrency, at?: number) => {
    const target = this.tokenMap.get(forceToCurrencyIdName(currency));
    const usd = this.tokenMap.get('AUSD') || this.tokenMap.get('KUSD');

    if (!target || !usd)
      return {
        token: new Token(forceToCurrencyIdName(currency)),
        price: FixedPointNumber.ZERO
      };

    return this.queryDexPool(target, usd, at).then((result) => {
      if (result[0].isZero() || result[1].isZero()) return { token: target, price: FixedPointNumber.ZERO };

      return {
        token: target,
        price: result[1].div(result[0])
      };
    });
  };

  private _queryIssuance = async (currency: MaybeCurrency, at?: number) => {
    let currencyId: CurrencyId;
    let currencyName: string;
    let token: Token;

    try {
      currencyId = forceToCurrencyId(this.api, currency);
      currencyName = forceToCurrencyIdName(currency);
      token = this.getToken(currency);
    } catch (e) {
      return FixedPointNumber.ZERO;
    }

    return this.getBlockHash(at)
      .then((hash) => {
        if (currencyName === this.nativeToken) {
          return this.api.query.balances.totalIssuance.at(hash.toString(), currencyId) as Promise<Balance>;
        }

        return this.api.query.tokens.totalIssuance.at(hash.toString(), currencyId) as Promise<Balance>;
      })
      .then((data) =>
        !data ? new FixedPointNumber(0, token.decimal) : FixedPointNumber.fromInner(data.toString(), token.decimal)
      );
  };

  private _queryBalance = async (account: MaybeAccount, currency: MaybeCurrency, at?: number) => {
    let currencyId: CurrencyId;

    try {
      currencyId = forceToCurrencyId(this.api, currency);
    } catch (e) {
      return new TokenBalance(new Token('empty'), FixedPointNumber.ZERO);
    }

    return this.getBlockHash(at)
      .then((hash) => {
        const currencyName = forceToCurrencyIdName(currencyId);

        if (currencyName === this.nativeToken) {
          return this.api.query.system.account.at(hash.toString(), account).then((data) => data.data.free);
        }
        return this.api.query.tokens.accounts.at(hash.toString(), account, currencyId).then((data) => data.free);
      })
      .then((balance) => {
        const token = this.getToken(currencyId);
        const _balance = FixedPointNumber.fromInner(balance.toString(), token?.decimal);

        assert(token && _balance, `token or balance create failed in query balance`);

        return new TokenBalance(token, _balance);
      });
  };

  private async getBlockHash(at?: number | string): Promise<BlockNumber | BlockHash> {
    if (!at) return this.api.query.system.number();
    return this.api.rpc.chain.getBlockHash(at);
  }

  public getAllTokens(): Token[] {
    return Array.from(this.tokenMap.values());
  }

  public getToken(currency: MaybeCurrency): Token {
    const currencyName = forceToCurrencyIdName(currency);

    if (isDexShare(currencyName)) {
      return this.getDexTokenPair(currency);
    }

    // FIXME: need handle erc20

    return this.tokenMap.get(currencyName) || new Token('mock');
  }

  public getDexTokenPair(currency: MaybeCurrency): Token {
    const currencyName = forceToCurrencyIdName(currency);

    if (isDexShare(currencyName)) {
      const [token1, token2] = getLPCurrenciesFormName(currencyName);

      const decimal1 = this.decimalMap.get(token1) || 18;
      const decimal2 = this.decimalMap.get(token2) || 18;

      return Token.fromCurrencyId(forceToCurrencyId(this.api, currency), [decimal1, decimal2]);
    }

    return new Token('mock');
  }

  public queryBalance(account: MaybeAccount, currency: MaybeCurrency, at?: number): Promise<TokenBalance> {
    return this._queryBalance(account, currency, at);
  }

  public queryIssuance(currency: MaybeCurrency, at?: number): Promise<FixedPointNumber> {
    return this._queryIssuance(currency, at);
  }

  public queryPrices(currencies: MaybeCurrency[]): Promise<PriceData[]> {
    return Promise.all(currencies.map((item) => this._queryPrice(item)));
  }

  public queryPrice(currency: MaybeCurrency, at?: number): Promise<PriceData> {
    return this._queryPrice(currency, at);
  }

  public async queryOraclePrice(oracleProvider = 'Aggregated'): Promise<PriceDataWithTimestamp[]> {
    return (this.api.rpc as any).oracle.getAllValues(oracleProvider).then((result: [[OracleKey, TimestampedValue]]) => {
      return result.map((item) => {
        const token = this.tokenMap.get(item[0].asToken.toString()) || Token.fromTokenName(item[0].asToken.toString());
        const price = FixedPointNumber.fromInner(
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          (item[1]?.value as any)?.value.toString() || '0'
        );

        return {
          token,
          price,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          timestamp: new Date((item[1]?.value as any)?.timestamp.toNumber())
        };
      });
    });
  }

  // this interface is not implemented
  public async subscribeOracleFeed(provider: string): Promise<PriceDataWithTimestamp[]> {
    return [];
  }
}
