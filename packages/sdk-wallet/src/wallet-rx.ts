import { ApiRx } from '@polkadot/api';

import { map, shareReplay, switchMap, take } from 'rxjs/operators';
import { memoize, bnMax, hexToString } from '@polkadot/util';
import { BehaviorSubject, combineLatest, Observable, of } from 'rxjs';
import { Vec } from '@polkadot/types';
import { TimestampedValue, VestingScheduleOf, OrmlAccountData } from '@open-web3/orml-types/interfaces';
import {
  createForeignAssetName,
  eventsFilterRx,
  FixedPointNumber as FN,
  getSubscribeOrAtQuery,
  isDexShareName,
  isForeignAssetName,
  Token,
  TokenBalance
} from '@acala-network/sdk-core';
import { AcalaAssetMetadata, Balance, CurrencyId, OracleKey } from '@acala-network/types/interfaces';
import { forceToCurrencyId, forceToCurrencyName, unzipDexShareName } from '@acala-network/sdk-core/converter';
import { MaybeAccount, MaybeCurrency } from '@acala-network/sdk-core/types';
import { PriceData, PriceDataWithTimestamp, NativeAllBalance, BalanceData } from './types';
import type { ISubmittableResult, ITuple } from '@polkadot/types/types';
import type { Option } from '@polkadot/types';
import { WalletBase } from './wallet-base';
import { AccountData, AccountInfo, BalanceLock, BlockHash } from '@polkadot/types/interfaces';
import { BelowExistentialDeposit } from './errors';
import { ORACLE_FEEDS_TOKEN } from './config';
import { SubmittableExtrinsic } from '@polkadot/api/types';
import { getMaxAvailableBalance } from './utils/get-max-available-balance';
import { Homa } from '@acala-network/sdk';

const queryFN = getSubscribeOrAtQuery;
export class WalletRx extends WalletBase<ApiRx> {
  private readonly oracleFeed$: BehaviorSubject<PriceDataWithTimestamp[]>;
  public readonly assetMetadatas$: BehaviorSubject<Map<string, Token>>;

  constructor(api: ApiRx) {
    super(api);

    this.oracleFeed$ = new BehaviorSubject<PriceDataWithTimestamp[]>([]);
    this.assetMetadatas$ = new BehaviorSubject<Map<string, Token>>(new Map());

    // subscribe oracle feed
    this.subscribeInnerOracleFeed();
    this.subscribeAssetMetadata();
  }

  private subscribeAssetMetadata() {
    if (!this.api.query?.assetsRegistry?.assetMetadatas) return;

    this.api.query.assetRegistry.assetMetadatas.entries().subscribe((data) => {
      const result = data.map((item) => {
        const isForeignAssetId = item[0]?.args[0].isForeignAssetId;
        const data = (item[1] as Option<AcalaAssetMetadata>).unwrapOrDefault();
        let name = '';
        let decimals = 12;

        if (isForeignAssetId) {
          const id = item[0]?.args[0].asForeignAssetId.toNumber();

          name = createForeignAssetName(id);
          decimals = data.decimals.toNumber();
        }

        const token = Token.fromCurrencyName(name, {
          decimals,
          symbol: hexToString(data.symbol.toHex()),
          ed: FN.fromInner(data.minimalBalance.toString(), decimals)
        });

        return [name, token] as const;
      });

      this.assetMetadatas$.next(new Map(result));
    });
  }

  public getToken(currency: MaybeCurrency): Token {
    const currencyName = forceToCurrencyName(currency);

    // FIXME: this should cause undefined error, pls. await wallet init
    if (isForeignAssetName(currencyName)) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return this.assetMetadatas$.value.get(currencyName)!;
    }

    return super.getToken(currencyName);
  }

  // query price info
  public queryPrice = memoize((currency: MaybeCurrency, at?: number): Observable<PriceData> => {
    const tokenName = forceToCurrencyName(currency);
    const liquidCurrencyId = this.api.consts?.homa?.liquidCurrencyId || this.api.consts?.homaLite?.liquidCurrencyId;

    // get liquid currency price from staking pool exchange rate
    if (liquidCurrencyId && forceToCurrencyName(currency) === forceToCurrencyName(liquidCurrencyId)) {
      return this.isHomaEnable() ? this.queryLiquidPriceFromHoma(at) : this.queryLiquidPriceFromHomaLite(at);
    }

    // get dex share price
    if (isDexShareName(tokenName)) {
      return this.queryDexSharePriceFormDex(currency, at);
    }

    // get stable coin price
    if (tokenName === 'AUSD' || tokenName === 'KUSD') {
      const usd = this.tokenMap.get('AUSD') || this.tokenMap.get('KUSD') || new Token('USD', { decimals: 12 });

      return of({
        token: usd,
        price: new FN(1, usd.decimals)
      });
    }

    // get price of ORACLE_FEEDS_TOKEN
    if (ORACLE_FEEDS_TOKEN.includes(tokenName)) {
      return this.queryPriceFromOracle(currency, at);
    }

    // get price from dex default
    return this.queryPriceFromDex(currency, at);
  });

  public queryDexSharePriceFormDex = memoize((currency: MaybeCurrency, at?: number): Observable<PriceData> => {
    const [key1, key2] = unzipDexShareName(forceToCurrencyName(currency));
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
          price: price.clone()
        };
      }),
      shareReplay(1)
    );
  });

  public queryPriceFromOracle = memoize((token: MaybeCurrency, at?: number) => {
    return of(at).pipe(
      switchMap(() => {
        if (!at) {
          const tokenName = forceToCurrencyName(token);

          return this.oracleFeed$.pipe(
            map((data): PriceData => {
              const maybe = data.find((item) => item.token.name === tokenName);

              return {
                token: maybe?.token || this.getToken(tokenName),
                price: (maybe?.price || FN.ZERO).clone()
              };
            })
          ) as Observable<PriceData>;
        }

        return this.api.rpc.chain.getBlockHash(at).pipe(
          switchMap((hash) => {
            const currencyId = forceToCurrencyId(this.api, token);

            return this.api.query.acalaOracle.values.at<Option<TimestampedValue>>(hash, currencyId).pipe(
              map((data) => {
                const token = this.getToken(currencyId);
                const price = data.unwrapOrDefault().value;

                return price.isEmpty ? { token, price: new FN(0) } : { token, price: FN.fromInner(price.toString()) };
              })
            );
          })
        );
      }),
      shareReplay(1)
    );
  });

  // check the homa module is enable
  private isHomaEnable(): boolean {
    const homaExist = !!this.api.consts.homa;
    const homaLiteExist = !!this.api.consts.homaLite;

    if (homaLiteExist) return false;

    return homaExist;
  }

  public queryLiquidPriceFromHomaLite = memoize((at?: number) => {
    // FIXME: need remove homaLite
    const liquidCurrencyId = this.api.consts.homaLite?.liquidCurrencyId;
    const stakingCurrencyId = this.api.consts.homaLite?.stakingCurrencyId;

    const liquidToken = this.getToken(liquidCurrencyId);
    const stakingToken = this.getToken(stakingCurrencyId);

    return this.getBlockHash(at).pipe(
      switchMap((hash) => {
        return combineLatest([
          this.queryPriceFromOracle(stakingToken, at),
          queryFN<() => Observable<Balance>>(this.api.query.homaLite.totalStakingCurrency, hash)(),
          this.queryIssuance(liquidToken, at)
        ]);
      }),
      map(([stakingTokenPrice, stakingBalance, liquidIssuance]) => {
        const bonded = FN.fromInner(stakingBalance.toString(), stakingToken.decimals);
        const ratio = liquidIssuance.isZero() ? FN.ZERO : bonded.div(liquidIssuance);

        return {
          token: liquidToken,
          price: stakingTokenPrice.price.times(ratio)
        };
      }),
      shareReplay(1)
    );
  });

  public subscribeToken = memoize((token: MaybeCurrency) => {
    return of(this.getToken(token));
  });

  public queryLiquidPriceFromHoma = memoize((at?: number) => {
    // FIXME: need remove homaLite
    const liquidCurrencyId = this.api.consts.homa?.liquidCurrencyId;
    const stakingCurrencyId = this.api.consts.homa?.stakingCurrencyId;

    const liquidToken = this.getToken(liquidCurrencyId);
    const stakingToken = this.getToken(stakingCurrencyId);

    return this.getBlockHash(at).pipe(
      switchMap(() => {
        return combineLatest({
          stakingTokenPrice: this.queryPriceFromOracle(stakingToken, at),
          env: new Homa(this.api, this).subscribeEnv()
        });
      }),
      map(({ stakingTokenPrice, env }) => {
        return {
          token: liquidToken,
          price: stakingTokenPrice.price.times(env.exchangeRate)
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

            const fixedPoint1 = FN.fromInner(balance1.toString(), this.getToken(sorted1).decimals);
            const fixedPoint2 = FN.fromInner(balance2.toString(), this.getToken(sorted2).decimals);

            if (forceToCurrencyName(sorted1) === forceToCurrencyName(token1)) {
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

  public queryPriceFromDex = memoize((currency: MaybeCurrency, at?: number): Observable<PriceData> => {
    const target = this.tokenMap.get(forceToCurrencyName(currency));
    const usd = this.tokenMap.get('AUSD') || this.tokenMap.get('KUSD');

    if (!target || !usd)
      return of({
        token: new Token(forceToCurrencyName(currency)),
        price: FN.ZERO
      });

    return this.queryDexPool(target, usd, at).pipe(
      map((result) => {
        if (result[0].isZero() || result[1].isZero()) return { token: target, price: FN.ZERO };

        return {
          token: target,
          price: result[1].div(result[0])
        };
      }),
      shareReplay(1)
    );
  });

  public subscribeOracleFeed = memoize((oracleProvider = 'Aggregated') => {
    return eventsFilterRx(this.api, [{ section: '*', method: 'NewFeedData' }], true).pipe(
      switchMap(() => {
        /* eslint-disable-next-line */
        return (this.api.rpc as any).oracle.getAllValues(oracleProvider) as Observable<[[OracleKey, TimestampedValue]]>;
      }),
      map((result) => {
        return result.map((item) => {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          const token = this.tokenMap.get(item[0].asToken.toString())!;
          const price = FN.fromInner(
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
    let tokenName: string;
    let token: Token;

    try {
      currencyId = forceToCurrencyId(this.api, currency);
      tokenName = forceToCurrencyName(currency);
      token = this.getToken(currency);
    } catch (e) {
      return of(FN.ZERO);
    }

    return this.getBlockHash(at).pipe(
      switchMap((hash) => {
        if (tokenName === this.nativeToken) {
          return queryFN(this.api.query.balances.totalIssuance, hash)(currencyId);
        }

        return queryFN(this.api.query.tokens.totalIssuance, hash)(currencyId);
      }),
      map((data) => (!data ? new FN(0, token.decimals) : FN.fromInner(data.toString(), token.decimals))),
      shareReplay(1)
    );
  });

  public queryBalance = memoize(
    (account: MaybeAccount, currency: MaybeCurrency, at?: number): Observable<BalanceData> => {
      const tokenName = forceToCurrencyName(currency);
      const currencyId = forceToCurrencyId(this.api, currency);
      const isNativeToken = tokenName === this.nativeToken;

      return this.getBlockHash(at).pipe(
        switchMap((hash) => {
          if (isNativeToken) {
            return queryFN<(account: any) => Observable<AccountInfo>>(
              this.api.query.system.account,
              hash
            )(account).pipe(map((data) => data.data));
          }

          return queryFN(this.api.query.tokens.accounts, hash)(account, currencyId).pipe(
            map((data) => data)
          ) as unknown as Observable<OrmlAccountData>;
        }),
        map((data) => {
          const token = this.getToken(currencyId);

          let freeBalance = FN.ZERO;
          let lockedBalance = FN.ZERO;
          let reservedBalance = FN.ZERO;
          let availableBalance = FN.ZERO;

          if (isNativeToken) {
            data = data as AccountData;

            freeBalance = FN.fromInner(data.free.toString(), token.decimals);
            lockedBalance = FN.fromInner(data.miscFrozen.toString(), token.decimals).max(
              FN.fromInner(data.feeFrozen.toString(), token.decimals)
            );
            reservedBalance = FN.fromInner(data.reserved.toString(), token.decimals);
          } else {
            data = data as OrmlAccountData;

            freeBalance = FN.fromInner(data.free.toString(), token.decimals);
            lockedBalance = FN.fromInner(data.frozen.toString(), token.decimals);
            reservedBalance = FN.fromInner(data.reserved.toString(), token.decimals);
          }

          availableBalance = freeBalance.sub(lockedBalance).max(FN.ZERO);

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

  public queryNativeBalances = memoize((account: MaybeAccount, at?: number): Observable<NativeAllBalance> => {
    const token = this.getNativeToken();

    return this.getBlockHash(at).pipe(
      switchMap((hash) => {
        return combineLatest([
          queryFN(this.api.query.system.account, hash)<AccountInfo>(account),
          queryFN(this.api.query.balances.locks, hash)<Vec<BalanceLock>>(account),
          queryFN(this.api.query.vesting.vestingSchedules, hash)<Vec<VestingScheduleOf>>(account)
        ]);
      }),
      map(([accountInfo, locks, vestingSchedules]) => {
        const freeBalance = accountInfo.data.free;
        const lockedBalance = bnMax(accountInfo.data.miscFrozen, accountInfo.data.feeFrozen);
        const availableBalance = freeBalance.toBn().sub(lockedBalance);

        const vesting = locks.length ? locks.find((item) => item.id.eq('ormlvest')) : null;
        const vestingBalance = vesting?.amount;
        const isVesting = !!(vestingBalance && !vestingBalance.toBn().isZero());
        const vestingSchedule = vestingSchedules.length ? vestingSchedules[0] : null;
        const vestingPerPeriod = vestingSchedule?.perPeriod;
        const vestingPeriod = vestingSchedule?.period;
        const vestingStart = vestingSchedule?.start;
        const vestingPeriodCount = vestingSchedule?.periodCount;

        return {
          freeBalance: new TokenBalance(token, FN.fromInner(freeBalance.toString(), token?.decimals)),
          lockedBalance: new TokenBalance(token, FN.fromInner(lockedBalance.toString(), token?.decimals)),
          availableBalance: new TokenBalance(token, FN.fromInner(availableBalance.toString(), token?.decimals)),
          vestingBalance: new TokenBalance(token, FN.fromInner(vestingBalance?.toString() || '0', token?.decimals)),
          isVesting,
          vestingPerPeriod: new TokenBalance(token, FN.fromInner(vestingPerPeriod?.toString() || '0', token?.decimals)),
          vestingEndBlock: this.api.registry.createType(
            'BlockNumber',
            vestingStart && vestingPeriod && vestingPeriodCount
              ? vestingStart.toBn().add(vestingPeriod.toBn().mul(vestingPeriodCount))
              : 0
          ),
          vestingPeriod: vestingPeriod || this.api.registry.createType('BlockNumber', 0)
        };
      }),
      shareReplay(1)
    );
  });

  private getBlockHash = memoize((at?: number | string) => {
    if (at && typeof at === 'string') return of(at as unknown as BlockHash);

    if (!at) return of('' as unknown as BlockHash);

    return this.api.rpc.chain.getBlockHash(at);
  });

  public checkTransfer(
    account: MaybeAccount,
    currency: MaybeCurrency,
    amount: FN,
    direction: 'from' | 'to' = 'to'
  ): Observable<boolean> {
    const transferConfig = this.getTransferConfig(currency);
    const tokenName = forceToCurrencyName(currency);

    const isNativeToken = tokenName === this.nativeToken;

    return this.queryBalance(account, currency).pipe(
      switchMap((balance) => {
        // always check ED if the direction is `to`
        if (direction === 'to') {
          return of({ balance, needCheck: true });
        }

        // handle direction is `from`
        return (this.api.query.system.account(account) as Observable<AccountInfo>).pipe(
          map((accountInfo) => {
            if (isNativeToken) {
              return { balance: balance, needCheck: !(accountInfo.consumers.toBigInt() === BigInt(0)) };
            }

            return {
              balance: balance,
              needCheck: !(
                accountInfo.providers.toBigInt() > BigInt(0) || accountInfo.consumers.toBigInt() === BigInt(0)
              )
            };
          })
        );
      }),
      map(({ balance, needCheck }: { balance: BalanceData; needCheck: boolean }) => {
        if (!needCheck) return true;

        if (direction === 'to' && balance.freeBalance.add(amount).lt(transferConfig.existentialDeposit || FN.ZERO)) {
          throw new BelowExistentialDeposit(account, currency);
        }

        if (
          direction === 'from' &&
          balance.freeBalance.minus(amount).lt(transferConfig.existentialDeposit || FN.ZERO)
        ) {
          throw new BelowExistentialDeposit(account, currency);
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

  public getMaxInputBalance(
    call: SubmittableExtrinsic<'rxjs', ISubmittableResult>,
    currency: MaybeCurrency,
    account: MaybeAccount,
    isAllowDeath: boolean,
    feeFactor = 1
  ): Observable<FN> {
    return call.paymentInfo(account.toString()).pipe(
      switchMap((paymentInfo) => {
        return combineLatest([
          of(paymentInfo),
          this.api.query.system.account(account.toString()) as Observable<AccountInfo>,
          this.api.query.tokens.accounts(
            account.toString(),
            forceToCurrencyId(this.api, currency)
          ) as unknown as Observable<OrmlAccountData>
        ]);
      }),
      map(([paymentInfo, accountInfo, currencyInfo]) => {
        const nativeToken = this.getToken(this.nativeToken);
        const targetToken = this.getToken(currency);
        const isNativeToken = this.isNativeToken(currency);
        const providers = accountInfo.providers.toNumber();
        const consumers = accountInfo.consumers.toNumber();
        const nativeFreeBalance = FN.fromInner(accountInfo.data.free.toString(), nativeToken.decimals);
        // native locked balance = max(accountInfo.data.miscFrozen, accountInfo.data.feeFrozen)
        const nativeLockedBalance = FN.fromInner(accountInfo.data.miscFrozen.toString(), nativeToken.decimals).max(
          FN.fromInner(accountInfo.data.feeFrozen.toString(), nativeToken.decimals)
        );
        const targetFreeBalance = FN.fromInner(currencyInfo.free.toString(), targetToken.decimals);
        const targetLockedBalance = FN.fromInner(currencyInfo.frozen.toString(), targetToken.decimals);
        const ed = this.getTransferConfig(currency).existentialDeposit;
        const fee = FN.fromInner(paymentInfo.partialFee.toString(), nativeToken.decimals).mul(new FN(feeFactor));

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
      })
    );
  }
}
