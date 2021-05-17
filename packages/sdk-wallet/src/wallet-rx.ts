import { ApiRx } from '@polkadot/api';
import { WalletBase } from './wallet-base';
import { switchMap, shareReplay, map, takeWhile, filter } from '@polkadot/x-rxjs/operators';
import { assert, memoize } from '@polkadot/util';
import { Observable, of, BehaviorSubject, combineLatest } from '@polkadot/x-rxjs';
import { Balance, ChainProperties } from '@polkadot/types/interfaces';
import { TimestampedValue } from '@open-web3/orml-types/interfaces';
import { eventsFilterRx, FixedPointNumber, Token, TokenBalance } from '@acala-network/sdk-core';
import { CurrencyId, OracleKey, TokenSymbol } from '@acala-network/types/interfaces';
import {
  forcedToCurrencyId,
  forcedToCurrencyIdName,
  forcedToTokenSymbolCurrencyId
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

  constructor(api: ApiRx) {
    super(api);

    this.decimalMap = new Map<string, number>([]);
    this.currencyIdMap = new Map<string, CurrencyId>([]);
    this.tokenMap = new Map<string, Token>([]);
    this.isReady$ = new BehaviorSubject<boolean>(false);
    this.oracleFeed$ = new BehaviorSubject<PriceDataWithTimestamp[]>([]);

    this.init().subscribe(() => {
      this.subscrineInnerOracleFeed();
    });
  }

  public get isReady(): boolean {
    return this.isReady$.getValue();
  }

  public init(): Observable<boolean> {
    return this._init();
  }

  public getAllTokens(): Token[] {
    return Array.from(this.tokenMap.values());
  }

  public getToken(currency: MaybeCurrency): Token | undefined {
    const currencyId = forcedToCurrencyId(this.api, currency);

    if (currencyId.isDexShare) {
      const decimal1 = this.decimalMap.get(currencyId.asDexShare[0].toString()) || 18;
      const decimal2 = this.decimalMap.get(currencyId.asDexShare[1].toString()) || 18;

      return Token.fromCurrencyId(currencyId, [decimal1, decimal2]);
    }

    if (currencyId.isErc20) {
      return Token.fromCurrencyId(currencyId);
    }

    const key = currencyId.asToken.toString();

    return this.tokenMap.get(key);
  }

  public queryBalance(account: MaybeAccount, currency: MaybeCurrency): Observable<TokenBalance> {
    return this._queryBalance(account, currency);
  }

  public getPrices(currencies: MaybeCurrency[]): Observable<PriceData[]> {
    return this.isReady$.pipe(
      filter((isReady) => isReady),
      switchMap(() => combineLatest(currencies.map((item) => this.getPrice(item))))
    );
  }

  public getPrice(currency: MaybeCurrency): Observable<PriceData> {
    return this.isReady$.pipe(
      filter((isReady) => isReady),
      switchMap(() => this._getPrice(currency))
    );
  }

  public getPriceFrom(currency: MaybeCurrency, source: 'dex' | 'oracle'): Observable<PriceData> {
    return this.isReady$.pipe(
      filter((isReady) => isReady),
      switchMap(() => this._getPrice(currency, source))
    );
  }

  public getOraclePrice(): Observable<PriceDataWithTimestamp[]> {
    return this.oracleFeed$;
  }

  public subscribeOracleFeed(provider: string): Observable<PriceDataWithTimestamp[]> {
    return this._subscribeOracleFeed(provider);
  }

  private checkIfKarura(name: string) {
    return /karura/i.test(name);
  }

  private getTokenListByChain(isKarura: boolean) {
    const karuraCurrencyIndex = 100;
    const tokenSymbolType = this.api.registry.createType('TokenSymbol' as any) as TokenSymbol;

    return tokenSymbolType.defKeys.filter((_value, index) => {
      const indexes = tokenSymbolType.defIndexes;

      if (isKarura) {
        return indexes[index] >= karuraCurrencyIndex;
      }

      return indexes[index] < karuraCurrencyIndex;
    });
  }

  private _init = memoize(
    (): Observable<boolean> => {
      return combineLatest([this.api.rpc.system.chain(), this.api.rpc.system.properties<ChainProperties>()]).pipe(
        switchMap(([chainName, properties]) => {
          const isKarura = this.checkIfKarura(chainName.toString());
          const tokenDecimals = properties.tokenDecimals.unwrapOrDefault();
          const tokenSymbol = properties.tokenSymbol.unwrapOrDefault();
          const tokenList = this.getTokenListByChain(isKarura);

          const defaultTokenDecimal = tokenDecimals?.[0].toNumber() || 18;

          try {
            tokenSymbol.forEach((item, index) => {
              const key = item.toString();
              const currencyId = forcedToTokenSymbolCurrencyId(this.api, key);
              const decimal = tokenDecimals?.[index].toNumber() || defaultTokenDecimal;

              if (tokenList.find((i) => i === key)) {
                this.decimalMap.set(key, tokenDecimals?.[index].toNumber() || defaultTokenDecimal);
                this.currencyIdMap.set(key, currencyId);
                this.tokenMap.set(key, Token.fromCurrencyId(currencyId, decimal));
              }
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

  private _getPrice = memoize(
    (currency: MaybeCurrency, source?: 'dex' | 'oracle'): Observable<PriceData> => {
      const currencyName = forcedToCurrencyIdName(currency);

      if (currencyName === 'AUSD' || currencyName === 'KUSD') {
        const usd = this.tokenMap.get('AUSD') || this.tokenMap.get('KUSD') || new Token('USD', { decimal: 18 });

        return of({
          token: usd,
          price: new FixedPointNumber(1, usd.decimal)
        });
      }

      if (source === 'dex') {
        return this.getPriceFromDex(currency);
      }

      if (source === 'oracle' ? true : ORACLE_FEEDS_TOKEN.includes(currencyName)) {
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

      return this.getPriceFromDex(currency);
    }
  );

  private subscrineInnerOracleFeed() {
    this._subscribeOracleFeed().subscribe({
      next: (result) => {
        this.oracleFeed$.next(result);
      }
    });
  }

  private _subscribeOracleFeed = memoize((oracleProvider = 'Aggregated') => {
    return eventsFilterRx(this.api, [{ section: 'oracle', method: 'NewFeedData' }], true).pipe(
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

  private getPriceFromDex = memoize(
    (currency: MaybeCurrency): Observable<PriceData> => {
      const target = this.tokenMap.get(forcedToCurrencyIdName(currency));
      const usd = this.tokenMap.get('AUSD') || this.tokenMap.get('KUSD');

      if (!target || !usd)
        return of({
          token: Token.fromTokenName(forcedToCurrencyIdName(currency)),
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

  private _queryBalance = memoize(
    (account: MaybeAccount, currency: MaybeCurrency): Observable<TokenBalance> => {
      const currencyId = forcedToCurrencyId(this.api, currency);

      return this.isReady$.pipe(
        takeWhile((isReady) => isReady),
        switchMap(() => {
          /* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access */
          return ((this.api.derive as any).currencies.balance(account, currencyId) as Observable<Balance>).pipe(
            map((balance) => {
              let token: Token | undefined;

              if (currencyId?.isDexShare) {
                const key1 = currencyId.asDexShare[0].toString();
                const key2 = currencyId.asDexShare[1].toString();

                token = Token.fromCurrencyId(currencyId, [
                  this.decimalMap.get(key1) || 18,
                  this.decimalMap.get(key2) || 18
                ]);
              } else if (currencyId?.isToken) {
                const key = currencyId.asToken.toString();

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
