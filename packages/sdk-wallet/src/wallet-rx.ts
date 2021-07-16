import { ApiRx } from '@polkadot/api';

import { map, shareReplay, switchMap, take } from '@polkadot/x-rxjs/operators';
import { memoize, bnMax } from '@polkadot/util';
import { BehaviorSubject, combineLatest, Observable, of } from '@polkadot/x-rxjs';
import { Vec } from '@polkadot/types';
import { TimestampedValue, VestingScheduleOf, OrmlAccountData } from '@open-web3/orml-types/interfaces';
import { eventsFilterRx, FixedPointNumber, getSubscribeOrAtQuery, Token, TokenBalance } from '@acala-network/sdk-core';
import { Balance, CurrencyId, OracleKey } from '@acala-network/types/interfaces';
import {
  forceToCurrencyId,
  forceToCurrencyIdName,
  getLPCurrenciesFormName,
  isDexShare
} from '@acala-network/sdk-core/converter';
import { MaybeAccount, MaybeCurrency } from '@acala-network/sdk-core/types';
import { PriceData, PriceDataWithTimestamp, NativeAllBalance, BalanceData } from './types';
import type { ITuple } from '@polkadot/types/types';
import type { Option } from '@polkadot/types';
import { WalletBase } from './wallet-base';
import { AccountData, BlockHash } from '@polkadot/types/interfaces';
import { BelowExistentialDeposit } from './errors';

const ORACLE_FEEDS_TOKEN = ['DOT', 'XBTC', 'RENBTC', 'POLKABTC'];

const queryFN = getSubscribeOrAtQuery;
export class WalletRx extends WalletBase<ApiRx> {
  private readonly oracleFeed$: BehaviorSubject<PriceDataWithTimestamp[]>;

  constructor(api: ApiRx) {
    super(api);

    this.oracleFeed$ = new BehaviorSubject<PriceDataWithTimestamp[]>([]);

    // subscribe oracle feed
    this.subscribeInnerOracleFeed();
  }

  // query price info
  public queryPrice = memoize(
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
        }),
        shareReplay(1)
      );
    }
  );

  public queryPriceFromOracle = memoize((token: MaybeCurrency, at?: number) => {
    return of(at).pipe(
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
      }),
      shareReplay(1)
    );
  });

  public queryLiquidPriceFromStakingPool = memoize((at?: number) => {
    const liquidCurrencyId = this.api.consts.stakingPool.liquidCurrencyId;
    const stakingCurrencyId = this.api.consts.stakingPool.stakingCurrencyId;

    const liquidToken = this.getToken(liquidCurrencyId);
    const stakingToken = this.getToken(stakingCurrencyId);

    return this.getBlockHash(at).pipe(
      switchMap((hash) => {
        return combineLatest([
          this.queryPriceFromOracle(stakingToken, at),
          queryFN(this.api.query.stakingPool.stakingPoolLedger, hash)(),
          this.queryIssuance(liquidToken, at)
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
      }),
      shareReplay(1)
    );
  });

  public queryDexPool = memoize((token1: MaybeCurrency, token2: MaybeCurrency, at?: number) => {
    const token1CurrencyId = forceToCurrencyId(this.api, token1);
    const token2CurrencyId = forceToCurrencyId(this.api, token2);
    const _token1 = Token.fromCurrencyId(token1CurrencyId);
    const _token2 = Token.fromCurrencyId(token2CurrencyId);
    const [sorted1, sorted2] = Token.sort(_token1, _token2);

    return this.getBlockHash(at).pipe(
      switchMap((hash) => {
        return queryFN(
          this.api.query.dex.liquidityPool,
          hash
        )<ITuple<[Balance, Balance]>>([sorted1.toChainData(), sorted2.toChainData()]).pipe(
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
      }),
      shareReplay(1)
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

  public subscribeOracleFeed = memoize((oracleProvider = 'Aggregated') => {
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
      }),
      shareReplay(1)
    );
  });

  public queryIssuance = memoize((currency: MaybeCurrency, at?: number) => {
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

    return this.getBlockHash(at).pipe(
      switchMap((hash) => {
        if (currencyName === this.nativeToken) {
          return queryFN(this.api.query.balances.totalIssuance, hash)(currencyId);
        }

        return queryFN(this.api.query.tokens.totalIssuance, hash)(currencyId);
      }),
      map((data) =>
        !data ? new FixedPointNumber(0, token.decimal) : FixedPointNumber.fromInner(data.toString(), token.decimal)
      ),
      shareReplay(1)
    );
  });

  public queryBalance = memoize(
    (account: MaybeAccount, currency: MaybeCurrency, at?: number): Observable<BalanceData> => {
      const tokenName = forceToCurrencyIdName(currency);
      const currencyId = forceToCurrencyId(this.api, currency);
      const isNativeToken = tokenName === this.nativeToken;

      return this.getBlockHash(at).pipe(
        switchMap((hash) => {
          if (isNativeToken) {
            return queryFN(this.api.query.system.account, hash)(account).pipe(map((data) => data.data));
          }

          return (queryFN(this.api.query.tokens.accounts, hash)(account, currencyId).pipe(
            map((data) => data)
          ) as unknown) as Observable<OrmlAccountData>;
        }),
        map((data) => {
          const token = this.getToken(currencyId);

          let freeBalance = FixedPointNumber.ZERO;
          let lockedBalance = FixedPointNumber.ZERO;
          let reservedBalance = FixedPointNumber.ZERO;
          let availableBalance = FixedPointNumber.ZERO;

          if (isNativeToken) {
            data = data as AccountData;

            freeBalance = FixedPointNumber.fromInner(data.free.toString(), token.decimal);
            lockedBalance = FixedPointNumber.fromInner(data.miscFrozen.toString(), token.decimal).max(
              FixedPointNumber.fromInner(data.feeFrozen.toString(), token.decimal)
            );
            reservedBalance = FixedPointNumber.fromInner(data.reserved.toString(), token.decimal);
          } else {
            data = data as OrmlAccountData;

            freeBalance = FixedPointNumber.fromInner(data.free.toString(), token.decimal);
            lockedBalance = FixedPointNumber.fromInner(data.frozen.toString(), token.decimal);
            reservedBalance = FixedPointNumber.fromInner(data.reserved.toString(), token.decimal);
          }

          availableBalance = freeBalance.sub(lockedBalance).sub(reservedBalance).max(FixedPointNumber.ZERO);

          return {
            token,
            freeBalance,
            lockedBalance,
            reservedBalance,
            availableBalance
          };
        }),
        shareReplay(1)
      );
    }
  );

  public queryNativeBalances = memoize(
    (account: MaybeAccount, at?: number): Observable<NativeAllBalance> => {
      const token = this.getNativeToken();

      return this.getBlockHash(at).pipe(
        switchMap((hash) => {
          return combineLatest([
            queryFN(this.api.query.system.account, hash)(account),
            queryFN(this.api.query.balances.locks, hash)(account),
            queryFN(this.api.query.vesting.vestingSchedules, hash)<Vec<VestingScheduleOf>>(account)
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

  private getBlockHash = memoize((at?: number | string) => {
    if (at && typeof at === 'string') return of((at as unknown) as BlockHash);

    if (!at) return of(('' as unknown) as BlockHash);

    return this.api.rpc.chain.getBlockHash(at);
  });

  public checkTransfer(
    account: MaybeAccount,
    currency: MaybeCurrency,
    amount: FixedPointNumber,
    direction: 'from' | 'to' = 'to'
  ): Observable<boolean> {
    const transferConfig = this.getTransferConfig(currency);

    return this.queryBalance(account, currency).pipe(
      map((balance) => {
        if (direction === 'to') {
          if (balance.freeBalance.add(amount).lt(transferConfig.existentialDeposit || FixedPointNumber.ZERO)) {
            throw new BelowExistentialDeposit(account, currency);
          }
        }

        if (direction === 'from') {
          if (balance.freeBalance.minus(amount).lt(transferConfig.existentialDeposit || FixedPointNumber.ZERO)) {
            throw new BelowExistentialDeposit(account, currency);
          }
        }

        return true;
      }),
      take(1)
    );
  }

  public queryPrices(currencies: MaybeCurrency[]): Observable<PriceData[]> {
    return combineLatest(currencies.map((item) => this.queryPrice(item)));
  }

  public queryOraclePrice(): Observable<PriceDataWithTimestamp[]> {
    return this.oracleFeed$;
  }

  private subscribeInnerOracleFeed() {
    this.subscribeOracleFeed().subscribe({
      next: (result) => {
        this.oracleFeed$.next(result);
      }
    });
  }
}
