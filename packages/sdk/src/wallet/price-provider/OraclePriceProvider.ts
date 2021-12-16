import { Observable, BehaviorSubject, lastValueFrom, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { PriceProvider } from './types';
import { TimestampedValue } from '@open-web3/orml-types/interfaces';
import { AnyApi, FixedPointNumber as FN, forceToCurrencyName } from '@acala-network/sdk-core';
import { OracleKey } from '@acala-network/types/interfaces';
import { Storage } from '../../storage';

export class OraclePriceProvider implements PriceProvider {
  private api: AnyApi;
  private oracleProvider: string;
  private subject: BehaviorSubject<Record<string, FN>>;
  private processSubscriber: Subscription;

  constructor(api: AnyApi, oracleProvider = 'Aggregated') {
    this.api = api;
    this.oracleProvider = oracleProvider;
    this.subject = new BehaviorSubject({});

    this.processSubscriber = this.process();
  }

  public unsub(): void {
    this.processSubscriber.unsubscribe();
  }

  private process = () => {
    const storage$ = Storage.create<[[OracleKey, TimestampedValue]]>({
      api: this.api,
      path: 'rpc.oracle.getAllValues',
      params: [this.oracleProvider],
      triggleEvents: [{ section: '*', method: 'NewFeedData' }]
    }).observable;

    return storage$.subscribe({
      next: (result) => {
        const formated = Object.fromEntries(
          result.map((item) => {
            const currency = forceToCurrencyName(item[0]);
            const price = FN.fromInner(
              // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
              (item[1]?.value as any)?.value.toString() || '0'
            );
            return [currency, price];
          })
        );
        this.subject.next(formated);
      }
    });
  };

  subscribe(currency: string): Observable<FN> {
    return this.subject.pipe(map((data) => data[currency]));
  }

  async query(currency: string): Promise<FN> {
    return lastValueFrom(this.subscribe(currency));
  }
}
