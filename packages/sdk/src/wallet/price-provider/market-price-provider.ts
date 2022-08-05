import { Observable, BehaviorSubject, timer, switchMap, from, lastValueFrom, combineLatest, of } from 'rxjs';
import { map, debounceTime, filter } from 'rxjs/operators';
import fetch from 'axios';
import { PriceProvider } from './types';
import { FixedPointNumber, FixedPointNumber as FN, Token } from '@acala-network/sdk-core';

const PRICE_API = 'https://api.polkawallet.io/price-server';
const BACKUP_PRICE_API = 'https://pricesrv.aca-api.network';

export class MarketPriceProvider implements PriceProvider {
  private interval: number;
  private trackedCurrencies: string[];
  private subject: BehaviorSubject<Record<string, FN>>;
  private forceUpdate: BehaviorSubject<number>;

  constructor(init?: string[], interval = 60 * 1000) {
    this.interval = interval;
    this.trackedCurrencies = init?.slice() || [];
    this.subject = new BehaviorSubject({});
    this.forceUpdate = new BehaviorSubject(0);

    this.run();
  }

  private run = () => {
    combineLatest({
      timer: timer(0, this.interval),
      force: this.forceUpdate
    })
      .pipe(
        debounceTime(500),
        switchMap(() =>
          from(
            (async () => {
              const groupedCurrencies = [];
              const maxGroupSize = 10;

              for (let i = 0; i < this.trackedCurrencies.length; i += maxGroupSize) {
                groupedCurrencies.push(this.trackedCurrencies.slice(i, i + maxGroupSize));
              }

              const data = await Promise.all(groupedCurrencies.map(this.batchQueryPrice));
              const flatData = data.flat();

              return Object.fromEntries(this.trackedCurrencies.map((name, i) => [name, flatData[i]]));
            })()
          )
        )
      )
      .subscribe({
        next: (data) => this.subject.next(data)
      });
  };

  private batchQueryPrice = async (currencies: string[]): Promise<FN[]> => {
    let result = await fetch.get(`${PRICE_API}?token=${currencies.join(',')}&from=market`).catch((e) => {
      // doesn't throw error when try first endpoint
      console.error(e);

      return undefined;
    });

    if (result?.status === 200) {
      return (
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        result?.data?.data?.price?.map((elem: number) => {
          return new FN(elem || 0);
        }) || Array(currencies.length).fill(FN.ZERO)
      );
    }

    // try get price from backup price
    result = await fetch.get(`${BACKUP_PRICE_API}?token=${currencies.join(',')}&from=market`);

    if (result?.status === 200) {
      return (
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        result?.data?.data?.price?.map((elem: number) => {
          return new FN(elem || 0);
        }) || Array(currencies.length).fill(FN.ZERO)
      );
    }

    return Array(currencies.length).fill(FN.ZERO);
  };

  subscribe(currency: Token): Observable<FN> {
    const name = currency.symbol;

    // set KUSD, AUSD market price to 1 for calculate in system
    if (name === 'KUSD' || name === 'AUSD' || name === '3USD' || name === 'waUSD') {
      return of(new FixedPointNumber(1, 12));
    }

    // use KSM price as taiKSM price
    if (name === 'taiKSM') {
      return this.subscribe(new Token('KSM'));
    }

    // use DOT price as tDOT price
    if (name === 'tDOT') {
      return this.subscribe(new Token('DOT'));
    }

    // if doesn't track this token, fetch it immediately
    if (this.trackedCurrencies.findIndex((i) => i === name) === -1) {
      this.trackedCurrencies.push(name);
      this.forceUpdate.next(this.forceUpdate.value + 1);
    }

    return this.subject.pipe(
      filter((data) => data[name] !== undefined),
      map((data) => data[name])
    );
  }

  async query(currency: Token): Promise<FN> {
    return lastValueFrom(this.subscribe(currency));
  }
}
