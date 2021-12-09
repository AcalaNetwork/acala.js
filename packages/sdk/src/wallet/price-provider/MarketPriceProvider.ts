import { Observable, BehaviorSubject, timer, switchMap, from, combineLatest, lastValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';
import fetch from 'axios';
import { has } from 'lodash';
import { PriceProvider } from './types';
import { FixedPointNumber as FN } from '@acala-network/sdk-core';

const PRICE_API = 'https://api.polkawallet.io/price-server';

export class MarketPriceProvider implements PriceProvider {
  private interval: number;
  private trackedCurrencies: string[];
  private subject: BehaviorSubject<Record<string, FN>>;

  constructor(init?: string[], interval = 60) {
    this.interval = interval;
    this.trackedCurrencies = init?.slice() || [];
    this.subject = new BehaviorSubject({});

    this.run();
  }

  private run = () => {
    timer(0, this.interval).pipe(
      switchMap(() => combineLatest(this.trackedCurrencies.map((item) => this.updatePrice(item))))
    );
  };

  private updatePrice = (currency: string) => {
    return from(
      (async () => {
        const result = await fetch.get(`${PRICE_API}?token=${currency}&from=market`);

        let price;

        if (result.status === 200) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          price = new FN((result?.data?.data?.price?.[0] as string) || 0);
        }

        // update subject's value
        price && this.subject.next({ ...this.subject.value, currency: price });
      })()
    );
  };

  subscribe(currency: string): Observable<FN> {
    if (!has(this.trackedCurrencies, currency)) {
      this.trackedCurrencies.push(currency);
      this.updatePrice(currency).subscribe().unsubscribe();
    }

    return this.subject.pipe(map((data) => data[currency]));
  }

  async query(currency: string): Promise<FN> {
    return lastValueFrom(this.subscribe(currency));
  }
}
