import { ApiRx } from '@polkadot/api';
import { WalletBase } from './wallet-base';
import { switchMap, shareReplay, map, takeWhile, filter } from '@polkadot/x-rxjs/operators';
import { assert, memoize } from '@polkadot/util';
import { Observable, of, BehaviorSubject, combineLatest } from '@polkadot/x-rxjs';
import { Balance, ChainProperties } from '@polkadot/types/interfaces';
import { TimestampedValue } from '@open-web3/orml-types/interfaces';
import { eventsFilterRx, FixedPointNumber, Token, TokenBalance } from '@acala-network/sdk-core';
import { CurrencyId, OracleKey } from '@acala-network/types/interfaces';
import {
  forceToCurrencyId,
  forceToCurrencyIdName,
  forceToTokenSymbolCurrencyId,
  getLPCurrenciesFormName,
  isDexShare
} from '@acala-network/sdk-core/converter';
import { MaybeAccount, MaybeCurrency } from '@acala-network/sdk-core/types';
import { PriceData, PriceDataWithTimestamp } from './types';
import { DerivedDexPool } from '@acala-network/api-derive';

const ORACLE_FEEDS_TOKEN = ['DOT', 'XBTC', 'RENBTC', 'POLKABTC'];

export class WalletRx extends WalletBase<ApiRx> {
  private decimalMap: Map<string, number>;
  private currencyIdMap: Map<string, CurrencyId>;
  private tokenMap: Map<string, Token>;
  private oracleFeed$: BehaviorSubject<PriceDataWithTimestamp[]>;
  private isReady$: BehaviorSubject<boolean>;
  private nativeToken!: string;

  constructor(api: ApiRx) {
    super(api);

    this.decimalMap = new Map<string, number>([]);
    this.currencyIdMap = new Map<string, CurrencyId>([]);
    this.tokenMap = new Map<string, Token>([]);
    this.isReady$ = new BehaviorSubject<boolean>(false);
    this.oracleFeed$ = new BehaviorSubject<PriceDataWithTimestamp[]>([]);

    // auto init and subscrbe oracle feed
    this._init().subscribe(() => {
      this.subscribeInnerOracleFeed();
    });
  }

  public get isReady(): boolean {
    return this.isReady$.getValue();
  }

  // subscribe the sdk ready status
  public subscribteIsReady(): BehaviorSubject<boolean> {
    return this.isReady$;
  }

  // get all useable tokens from chain config.
  public getAllTokens(): Token[] {
    return Array.from(this.tokenMap.values());
  }

  // get token object
  public getToken(currency: MaybeCurrency): Token {
    const currencyName = forceToCurrencyIdName(currency);

    if (isDexShare(currencyName)) {
      const [token1, token2] = getLPCurrenciesFormName(currencyName);

      const decimal1 = this.decimalMap.get(token1) || 18;
      const decimal2 = this.decimalMap.get(token2) || 18;

      return Token.fromCurrencyId(forceToCurrencyId(this.api, currency), [decimal1, decimal2]);
    }

    return this.tokenMap.get(currencyName) || new Token('mock');
  }

  // query balance
  public queryBalance(account: MaybeAccount, currency: MaybeCurrency): Observable<TokenBalance> {
    return this._queryBalance(account, currency);
  }

  // query issuance
  public queryIssuance(currency: MaybeCurrency): Observable<FixedPointNumber> {
    return this._queryIssunace(currency);
  }

  // get prices of token array
  public getPrices(currencies: MaybeCurrency[]): Observable<PriceData[]> {
    return this.isReady$.pipe(
      filter((isReady) => isReady),
      switchMap(() => combineLatest(currencies.map((item) => this.getPrice(item))))
    );
  }

  // get price of one token
  public getPrice(currency: MaybeCurrency): Observable<PriceData> {
    return this.isReady$.pipe(
      filter((isReady) => isReady),
      switchMap(() => this._getPrice(currency))
    );
  }

  // subscribe oracle price
  public getOraclePrice(): Observable<PriceDataWithTimestamp[]> {
    return this.oracleFeed$;
  }

  // subscribe oracle feed
  public subscribeOracleFeed(provider: string): Observable<PriceDataWithTimestamp[]> {
    return this._subscribeOracleFeed(provider);
  }

  private _init = memoize(
    (): Observable<boolean> => {
      return this.api.rpc.system.properties<ChainProperties>().pipe(
        switchMap((properties) => {
          const tokenDecimals = properties.tokenDecimals.unwrapOrDefault();
          const tokenSymbol = properties.tokenSymbol.unwrapOrDefault();

          const defaultTokenDecimal = tokenDecimals?.[0].toNumber() || 18;

          this.nativeToken = tokenSymbol[0].toString();

          try {
            tokenSymbol.forEach((item, index) => {
              const key = item.toString();
              const currencyId = forceToTokenSymbolCurrencyId(this.api, key);
              const decimal = tokenDecimals?.[index].toNumber() || defaultTokenDecimal;

              this.decimalMap.set(key, tokenDecimals?.[index].toNumber() || defaultTokenDecimal);
              this.currencyIdMap.set(key, currencyId);
              this.tokenMap.set(key, Token.fromCurrencyId(currencyId, decimal));
            });

            this.isReady$.next(true);
          } catch (e) {
            throw new Error('init wallet sdk failed');
          }

          return of(true);
        }),
        shareReplay(1)
      );
    }
  );

  // query price info, support specify data source
  private _getPrice = memoize(
    (currency: MaybeCurrency): Observable<PriceData> => {
      const currencyName = forceToCurrencyIdName(currency);

      // get dex share price
      if (isDexShare(currencyName)) {
        return this.getDexSharePrice(currencyName);
      }

      // get stable coin price
      if (currencyName === 'AUSD' || currencyName === 'KUSD') {
        const usd = this.tokenMap.get('AUSD') || this.tokenMap.get('KUSD') || new Token('USD', { decimal: 12 });

        return of({
          token: usd,
          price: new FixedPointNumber(1, usd.decimal)
        });
      }

      // get price of ORACLE_FEEDS_TOKEN
      if (ORACLE_FEEDS_TOKEN.includes(currencyName)) {
        return this.oracleFeed$.pipe(
          map(
            (data): PriceData => {
              const maybe = data.find((item) => item.token.name === currencyName);

              return {
                token: maybe?.token || new Token(currencyName),
                price: maybe?.price || FixedPointNumber.ZERO
              };
            }
          )
        ) as Observable<PriceData>;
      }

      // get price from dex default
      return this.getPriceFromDex(currency);
    }
  );

  // push oracle feeds data to oracleFeed$
  private subscribeInnerOracleFeed() {
    this._subscribeOracleFeed().subscribe({
      next: (result) => {
        this.oracleFeed$.next(result);
      }
    });
  }

  // subscribe oracle feed
  private _subscribeOracleFeed = memoize((oracleProvider = 'Aggregated') => {
    return eventsFilterRx(this.api, [{ section: '*', method: 'NewFeedData' }], true).pipe(
      switchMap(() => {
        /* eslint-disable-next-line */
          return ((this.api.rpc as any).oracle.getAllValues(oracleProvider) as Observable<[[OracleKey, TimestampedValue]]>);
      }),
      map((result) => {
        return result.map((item) => {
          const token =
            this.tokenMap.get(item[0].asToken.toString()) || Token.fromTokenName(item[0].asToken.toString());
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
      })
    );
  });

  public getDexSharePrice = memoize(
    (currency: MaybeCurrency): Observable<PriceData> => {
      const [key1, key2] = getLPCurrenciesFormName(forceToCurrencyIdName(currency));
      const dexShareCurrency = forceToCurrencyId(this.api, currency);
      const currency1 = forceToCurrencyId(this.api, key1);
      const currency2 = forceToCurrencyId(this.api, key2);
      const token1 = this.getToken(key1);
      const token2 = this.getToken(key2);
      const dexShareToken = this.getToken(dexShareCurrency);

      return combineLatest([
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        (this.api.derive as any).dex.pool(currency1, currency2) as Observable<DerivedDexPool>,
        this.queryIssuance(dexShareToken),
        this.getPrice(token1),
        this.getPrice(token2)
      ]).pipe(
        map(([dex, totalIssuance, price1, price2]) => {
          const currency1Amount = FixedPointNumber.fromInner(dex[0].toString(), token1.decimal);
          const currency2Amount = FixedPointNumber.fromInner(dex[1].toString(), token2.decimal);

          const currency1AmountOfOne = currency1Amount.div(totalIssuance);
          const currency2AmountOfOne = currency2Amount.div(totalIssuance);
          const price = currency1AmountOfOne.times(price1.price).plus(currency2AmountOfOne.times(price2.price));

          return {
            token: dexShareToken,
            price
          };
        })
      );
    }
  );

  // query token price from dex
  public getPriceFromDex = memoize(
    (currency: MaybeCurrency): Observable<PriceData> => {
      const target = this.tokenMap.get(forceToCurrencyIdName(currency));
      const usd = this.tokenMap.get('AUSD') || this.tokenMap.get('KUSD');

      if (!target || !usd)
        return of({
          token: Token.fromTokenName(forceToCurrencyIdName(currency)),
          price: FixedPointNumber.ZERO
        });

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      return ((this.api.derive as any).dex.pool(
        target.toCurrencyId(this.api),
        usd.toCurrencyId(this.api)
      ) as Observable<DerivedDexPool>).pipe(
        map((result) => {
          return {
            token: target,
            price: FixedPointNumber.fromInner(result[1].toString(), usd.decimal).div(
              FixedPointNumber.fromInner(result[0].toString(), target.decimal)
            )
          };
        }),
        shareReplay(1)
      );
    }
  );

  private _queryIssunace = memoize((currency: MaybeCurrency) => {
    let currencyId: CurrencyId;
    let currencyName: string;
    let token: Token;

    try {
      currencyId = forceToCurrencyId(this.api, currency);
      currencyName = forceToCurrencyIdName(currency);
      token = this.getToken(currency);
    } catch (e) {
      return of(FixedPointNumber.ZERO);
    }

    return this.isReady$.pipe(
      takeWhile((isReady) => isReady),
      switchMap(() => {
        if (currencyName === this.nativeToken) {
          return this.api.query.balances.totalIssuance(currencyId) as Observable<Balance>;
        }

        return this.api.query.tokens.totalIssuance(currencyId) as Observable<Balance>;
      }),
      map((data) =>
        !data ? new FixedPointNumber(0, token.decimal) : FixedPointNumber.fromInner(data.toString(), token.decimal)
      )
    );
  });

  // query account balance information
  private _queryBalance = memoize(
    (account: MaybeAccount, currency: MaybeCurrency): Observable<TokenBalance> => {
      let currencyId: CurrencyId;

      try {
        currencyId = forceToCurrencyId(this.api, currency);
      } catch (e) {
        return of(new TokenBalance(new Token('empty'), FixedPointNumber.ZERO));
      }

      return this.isReady$.pipe(
        takeWhile((isReady) => isReady),
        switchMap(() => {
          /* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access */
          return ((this.api.derive as any).currencies.balance(account, currencyId) as Observable<Balance>).pipe(
            map((balance) => {
              let token = new Token('mock');

              if (currencyId?.isDexShare) {
                const [token1, token2] = getLPCurrenciesFormName(forceToCurrencyIdName(currency));

                token = Token.fromCurrencyId(currencyId, [
                  this.decimalMap.get(token1) || 18,
                  this.decimalMap.get(token2) || 18
                ]);
              } else if (currencyId?.isToken) {
                const key = forceToCurrencyIdName(currencyId);

                token = Token.fromCurrencyId(currencyId, this.decimalMap.get(key));
              } else if (currencyId?.isErc20) {
                console.warn(`doesn't support query ERC20 balance`);

                token = new Token(currencyId.asErc20.toString(), {
                  isERC20: true,
                  isDexShare: false,
                  isTokenSymbol: false,
                  decimal: 18
                });
              }

              const _balance = FixedPointNumber.fromInner(balance.toString(), token?.decimal);

              assert(token && _balance, `token or balance create failed in query balance`);

              return new TokenBalance(token, _balance);
            }),
            shareReplay(1)
          );
        })
      );
    }
  );
}
