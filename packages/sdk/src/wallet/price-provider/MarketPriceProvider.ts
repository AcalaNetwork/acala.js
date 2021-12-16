import { Observable, BehaviorSubject, timer, switchMap, from, lastValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';
import fetch from 'axios';
import { PriceProvider } from './types';
import { FixedPointNumber as FN, forceToCurrencyName, MaybeCurrency } from '@acala-network/sdk-core';

const PRICE_API = 'https://api.polkawallet.io/price-server/';

export class MarketPriceProvider implements PriceProvider {
  private interval: number;
  private trackedCurrencies: string[];
  private subject: BehaviorSubject<Record<string, FN>>;

  constructor(init?: string[], interval = 60 * 1000) {
    this.interval = interval;
    this.trackedCurrencies = init?.slice() || [];
    this.subject = new BehaviorSubject({});

    this.run();
  }

  private run = () => {
    timer(0, this.interval)
      .pipe(
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

    // if doesn't track this token, fetch it immediately
    if (this.trackedCurrencies.findIndex((i) => i === name) === -1) {
      this.trackedCurrencies.push(name);
      from(this.updatePrice(name))
        .subscribe({
          next: (data) => this.subject.next({ ...this.subject.value, [name]: data })
        })
        .unsubscribe();
    }

    return this.subject.pipe(map((data) => data[name]));
  }

  async query(currency: MaybeCurrency): Promise<FN> {
    return lastValueFrom(this.subscribe(currency));
  }
}
