import { Observable, BehaviorSubject, timer, switchMap, from, lastValueFrom, combineLatest, of } from 'rxjs';
import { map, debounceTime } from 'rxjs/operators';
import fetch from 'axios';
import { PriceProvider } from './types';
import { FixedPointNumber, FixedPointNumber as FN, forceToCurrencyName, MaybeCurrency } from '@acala-network/sdk-core';

const PRICE_API = 'https://api.polkawallet.io/price-server/';

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
              const data = await Promise.all(this.trackedCurrencies.map(this.updatePrice));

              return Object.fromEntries(this.trackedCurrencies.map((name, i) => [name, data[i]]));
            })()
          )
        )
      )
      .subscribe({
        next: (data) => this.subject.next(data)
      });
  };

  private updatePrice = async (currency: string) => {
    const result = await fetch.get(`${PRICE_API}?token=${currency}&from=market`);

    if (result.status === 200) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      return new FN((result?.data?.data?.price?.[0] as string) || 0);
    }

    return FN.ZERO;
  };

  subscribe(currency: MaybeCurrency): Observable<FN> {
    const name = forceToCurrencyName(currency);

    // just set AUSD/KUSD price to 1
    if (name === 'AUSD' || name === 'KUSD') {
      return of(new FixedPointNumber(1, 12));
    }

    // if doesn't track this token, fetch it immediately
    if (this.trackedCurrencies.findIndex((i) => i === name) === -1) {
      this.trackedCurrencies.push(name);
      this.forceUpdate.next(this.forceUpdate.value + 1);
    }

    return this.subject.pipe(map((data) => data[name]));
  }

  async query(currency: MaybeCurrency): Promise<FN> {
    return lastValueFrom(this.subscribe(currency));
  }
}
