import { ApiRx } from '@polkadot/api';

import { filter, map, shareReplay, switchMap, takeWhile } from '@polkadot/x-rxjs/operators';
import { assert, memoize, bnMax } from '@polkadot/util';
import { BehaviorSubject, combineLatest, Observable, of } from '@polkadot/x-rxjs';
import { ChainProperties } from '@polkadot/types/interfaces';
import { Vec } from '@polkadot/types';
import { TimestampedValue, VestingScheduleOf } from '@open-web3/orml-types/interfaces';
import { eventsFilterRx, FixedPointNumber, Token, TokenBalance } from '@acala-network/sdk-core';
import { Balance, CurrencyId, OracleKey } from '@acala-network/types/interfaces';
import {
  forceToCurrencyId,
  forceToCurrencyIdName,
  forceToTokenSymbolCurrencyId,
  getLPCurrenciesFormName,
  isDexShare
} from '@acala-network/sdk-core/converter';
import { MaybeAccount, MaybeCurrency } from '@acala-network/sdk-core/types';
import { PriceData, PriceDataWithTimestamp, NativeAllBalance } from './types';
import type { ITuple } from '@polkadot/types/types';
import type { Option } from '@polkadot/types';
import { WalletBase } from './wallet-base';

const ORACLE_FEEDS_TOKEN = ['DOT', 'XBTC', 'RENBTC', 'POLKABTC'];

export class WalletRx extends WalletBase<ApiRx> {
  private decimalMap: Map<string, number>;
  private currencyIdMap: Map<string, CurrencyId>;
  private tokenMap: Map<string, Token>;
  private readonly oracleFeed$: BehaviorSubject<PriceDataWithTimestamp[]>;
  private readonly isReady$: BehaviorSubject<boolean>;
  private nativeToken!: string;

  constructor(api: ApiRx) {
    super(api);

    this.decimalMap = new Map<string, number>([]);
    this.currencyIdMap = new Map<string, CurrencyId>([]);
    this.tokenMap = new Map<string, Token>([]);
    this.isReady$ = new BehaviorSubject<boolean>(false);
    this.oracleFeed$ = new BehaviorSubject<PriceDataWithTimestamp[]>([]);

    // auto init and subscribe oracle feed
    this._init().subscribe(() => {
      this.subscribeInnerOracleFeed();
    });
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
  private _queryPrice = memoize(
    (currency: MaybeCurrency, at?: number): Observable<PriceData> => {
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

        return of({
          token: usd,
          price: new FixedPointNumber(1, usd.decimal)
        });
      }

      // get price of ORACLE_FEEDS_TOKEN
      if (ORACLE_FEEDS_TOKEN.includes(currencyName)) {
        return this.queryPriceFromOracle(currency, at);
      }

      // get price from dex default
      return this.queryPriceFromDex(currency, at);
    }
  );

  public queryDexSharePriceFormDex = memoize(
    (currency: MaybeCurrency, at?: number): Observable<PriceData> => {
      const [key1, key2] = getLPCurrenciesFormName(forceToCurrencyIdName(currency));
      const dexShareCurrency = forceToCurrencyId(this.api, currency);
      const currency1 = forceToCurrencyId(this.api, key1);
      const currency2 = forceToCurrencyId(this.api, key2);
      const token1 = this.getToken(key1);
      const token2 = this.getToken(key2);
      const dexShareToken = this.getToken(dexShareCurrency);

      return combineLatest([
        this.queryDexPool(currency1, currency2, at),
        this.queryIssuance(dexShareToken, at),
        this.queryPrice(token1, at),
        this.queryPrice(token2, at)
      ]).pipe(
        map(([dex, totalIssuance, price1, price2]) => {
          const currency1Amount = dex[0];
          const currency2Amount = dex[1];

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

  public queryPriceFromOracle = memoize((token: MaybeCurrency, at?: number) => {
    return this.isReady$.pipe(
      takeWhile((isReady) => isReady),
      switchMap(() => {
        if (!at) {
          const currencyName = forceToCurrencyIdName(token);

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

        return this.api.rpc.chain.getBlockHash(at).pipe(
          switchMap((hash) => {
            const currencyId = forceToCurrencyId(this.api, token);

            return this.api.query.acalaOracle.values.at<Option<TimestampedValue>>(hash, currencyId).pipe(
              map((data) => {
                const token = this.getToken(currencyId);
                const price = data.unwrapOrDefault().value;

                return price.isEmpty
                  ? { token, price: new FixedPointNumber(0) }
                  : { token, price: FixedPointNumber.fromInner(price.toString()) };
              })
            );
          })
        );
      })
    );
  });

  public queryLiquidPriceFromStakingPool = memoize((at?: number) => {
    const liquidCurrencyId = this.api.consts.stakingPool.liquidCurrencyId;
    const stakingCurrencyId = this.api.consts.stakingPool.stakingCurrencyId;

    const liquidToken = this.getToken(liquidCurrencyId);
    const stakingToken = this.getToken(stakingCurrencyId);

    return this.isReady$.pipe(
      takeWhile((isReady) => isReady),
      switchMap(() => this.getBlockHash(at)),
      switchMap((hash) => {
        return combineLatest([
          this.queryPriceFromOracle(stakingToken, at),
          this.api.query.stakingPool.stakingPoolLedger.at(hash),
          this._queryIssuance(liquidToken, at)
        ]);
      }),
      map(([stakingTokenPrice, ledger, liquidIssuance]) => {
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
      })
    );
  });

  public queryDexPool = memoize((token1: MaybeCurrency, token2: MaybeCurrency, at?: number) => {
    const token1CurrencyId = forceToCurrencyId(this.api, token1);
    const token2CurrencyId = forceToCurrencyId(this.api, token2);
    const _token1 = Token.fromCurrencyId(token1CurrencyId);
    const _token2 = Token.fromCurrencyId(token2CurrencyId);
    const [sorted1, sorted2] = Token.sort(_token1, _token2);

    return this.isReady$.pipe(
      takeWhile((isReady) => isReady),
      switchMap(() => this.getBlockHash(at)),
      switchMap((hash) => {
        return this.api.query.dex.liquidityPool
          .at<ITuple<[Balance, Balance]>>(hash, [sorted1.toChainData(), sorted2.toChainData()])
          .pipe(
            map((pool: ITuple<[Balance, Balance]>) => {
              const balance1 = pool[0];
              const balance2 = pool[1];

              const fixedPoint1 = FixedPointNumber.fromInner(balance1.toString(), this.getToken(sorted1).decimal);
              const fixedPoint2 = FixedPointNumber.fromInner(balance2.toString(), this.getToken(sorted2).decimal);

              if (forceToCurrencyIdName(sorted1) === forceToCurrencyIdName(token1)) {
                return [fixedPoint1, fixedPoint2];
              } else {
                return [fixedPoint2, fixedPoint1];
              }
            })
          );
      })
    );
  });

  public queryPriceFromDex = memoize(
    (currency: MaybeCurrency, at?: number): Observable<PriceData> => {
      const target = this.tokenMap.get(forceToCurrencyIdName(currency));
      const usd = this.tokenMap.get('AUSD') || this.tokenMap.get('KUSD');

      if (!target || !usd)
        return of({
          token: new Token(forceToCurrencyIdName(currency)),
          price: FixedPointNumber.ZERO
        });

      return this.queryDexPool(target, usd, at).pipe(
        map((result) => {
          if (result[0].isZero() || result[1].isZero()) return { token: target, price: FixedPointNumber.ZERO };

          return {
            token: target,
            price: result[1].div(result[0])
          };
        }),
        shareReplay(1)
      );
    }
  );

  private _subscribeOracleFeed = memoize((oracleProvider = 'Aggregated') => {
    return eventsFilterRx(this.api, [{ section: '*', method: 'NewFeedData' }], true).pipe(
      switchMap(() => {
        /* eslint-disable-next-line */
        return (this.api.rpc as any).oracle.getAllValues(oracleProvider) as Observable<[[OracleKey, TimestampedValue]]>;
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

  private _queryIssuance = memoize((currency: MaybeCurrency, at?: number) => {
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
      switchMap(() => this.getBlockHash(at)),
      switchMap((hash) => {
        if (currencyName === this.nativeToken) {
          return this.api.query.balances.totalIssuance.at(hash, currencyId) as Observable<Balance>;
        }

        return this.api.query.tokens.totalIssuance.at(hash, currencyId) as Observable<Balance>;
      }),
      map((data) =>
        !data ? new FixedPointNumber(0, token.decimal) : FixedPointNumber.fromInner(data.toString(), token.decimal)
      )
    );
  });

  private _queryBalance = memoize(
    (account: MaybeAccount, currency: MaybeCurrency, at?: number): Observable<TokenBalance> => {
      let currencyId: CurrencyId;

      try {
        currencyId = forceToCurrencyId(this.api, currency);
      } catch (e) {
        return of(new TokenBalance(new Token('empty'), FixedPointNumber.ZERO));
      }

      return this.isReady$.pipe(
        takeWhile((isReady) => isReady),
        switchMap(() => this.getBlockHash(at)),
        switchMap((hash) => {
          const currencyName = forceToCurrencyIdName(currencyId);

          if (currencyName === this.nativeToken) {
            return this.api.query.system.account.at(hash, account).pipe(map((data) => data.data.free));
          }
          return this.api.query.tokens.accounts.at(hash, account, currencyId).pipe(map((data) => data.free));
        }),
        map((balance) => {
          const token = this.getToken(currencyId);
          const _balance = FixedPointNumber.fromInner(balance.toString(), token?.decimal);

          assert(token && _balance, `token or balance create failed in query balance`);

          return new TokenBalance(token, _balance);
        }),
        shareReplay(1)
      );
    }
  );

  private _queryNativeBalances = memoize(
    (account: MaybeAccount, at?: number): Observable<NativeAllBalance> => {
      const token = this.getNativeToken();

      return this.isReady$.pipe(
        takeWhile((isReady) => isReady),
        switchMap(() => this.getBlockHash(at)),
        switchMap((hash) => {
          return combineLatest([
            this.api.query.system.account.at(hash, account),
            this.api.query.balances.locks.at(hash, account),
            this.api.query.vesting.vestingSchedules.at<Vec<VestingScheduleOf>>(hash, account)
          ]);
        }),
        map(([accountInfo, locks, vestingSchedules]) => {
          const freeBalance = accountInfo.data.free;
          const lockedBalance = bnMax(accountInfo.data.miscFrozen, accountInfo.data.feeFrozen);
          const availableBalance = freeBalance.sub(lockedBalance);

          const vesting = locks.length ? locks.find((item) => item.id.eq('ormlvest')) : null;
          const vestingBalance = vesting?.amount;
          const isVesting = !!(vestingBalance && !vestingBalance.isZero());
          const vestingSchedule = vestingSchedules.length ? vestingSchedules[0] : null;
          const vestingPerPeriod = vestingSchedule?.perPeriod;
          const vestingPeriod = vestingSchedule?.period;
          const vestingStart = vestingSchedule?.start;
          const vestingPeriodCount = vestingSchedule?.periodCount;

          return {
            freeBalance: new TokenBalance(token, FixedPointNumber.fromInner(freeBalance.toString(), token?.decimal)),
            lockedBalance: new TokenBalance(
              token,
              FixedPointNumber.fromInner(lockedBalance.toString(), token?.decimal)
            ),
            availableBalance: new TokenBalance(
              token,
              FixedPointNumber.fromInner(availableBalance.toString(), token?.decimal)
            ),
            vestingBalance: new TokenBalance(
              token,
              FixedPointNumber.fromInner(vestingBalance?.toString() || '0', token?.decimal)
            ),
            isVesting,
            vestingPerPeriod: new TokenBalance(
              token,
              FixedPointNumber.fromInner(vestingPerPeriod?.toString() || '0', token?.decimal)
            ),
            vestingEndBlock: this.api.registry.createType(
              'BlockNumber',
              vestingStart && vestingPeriod && vestingPeriodCount
                ? vestingStart.add(vestingPeriod.mul(vestingPeriodCount))
                : 0
            ),
            vestingPeriod: vestingPeriod || this.api.registry.createType('Balance', 0)
          };
        }),
        shareReplay(1)
      );
    }
  );

  private getBlockHash(at?: number | string) {
    if (at && typeof at === 'string') return of(at);

    return of(at).pipe(
      switchMap((at) => {
        if (!at) return this.api.rpc.chain.getBlockHash();

        return this.api.rpc.chain.getBlockHash(at);
      })
    );
  }

  public get isReady(): boolean {
    return this.isReady$.getValue();
  }

  public subscribeIsReady(): BehaviorSubject<boolean> {
    return this.isReady$;
  }

  public getAllTokens(): Token[] {
    return Array.from(this.tokenMap.values());
  }

  public getNativeToken(): Token {
    const nativeCurrencyId = this.api.consts.currencies.getNativeCurrencyId;

    return this.getToken(nativeCurrencyId);
  }

  public getToken(currency: MaybeCurrency): Token {
    const currencyName = forceToCurrencyIdName(currency);

    if (isDexShare(currencyName)) {
      const [token1, token2] = getLPCurrenciesFormName(currencyName);

      const decimal1 = this.decimalMap.get(token1) || 18;
      const decimal2 = this.decimalMap.get(token2) || 18;

      return Token.fromCurrencyId(forceToCurrencyId(this.api, currency), [decimal1, decimal2]);
    }

    // FIXME: need handle erc20

    return this.tokenMap.get(currencyName) || new Token('mock');
  }

  public queryNativeBalances(account: MaybeAccount, at?: number): Observable<NativeAllBalance> {
    return this._queryNativeBalances(account, at);
  }

  public queryBalance(account: MaybeAccount, currency: MaybeCurrency, at?: number): Observable<TokenBalance> {
    return this._queryBalance(account, currency, at);
  }

  public queryIssuance(currency: MaybeCurrency, at?: number): Observable<FixedPointNumber> {
    return this._queryIssuance(currency, at);
  }

  public queryPrices(currencies: MaybeCurrency[]): Observable<PriceData[]> {
    return this.isReady$.pipe(
      filter((isReady) => isReady),
      switchMap(() => combineLatest(currencies.map((item) => this._queryPrice(item))))
    );
  }

  public queryPrice(currency: MaybeCurrency, at?: number): Observable<PriceData> {
    return this.isReady$.pipe(
      filter((isReady) => isReady),
      switchMap(() => this._queryPrice(currency, at))
    );
  }

  public queryOraclePrice(): Observable<PriceDataWithTimestamp[]> {
    return this.oracleFeed$;
  }

  public subscribeOracleFeed(provider: string): Observable<PriceDataWithTimestamp[]> {
    return this._subscribeOracleFeed(provider);
  }

  private subscribeInnerOracleFeed() {
    this._subscribeOracleFeed().subscribe({
      next: (result) => {
        this.oracleFeed$.next(result);
      }
    });
  }
}
