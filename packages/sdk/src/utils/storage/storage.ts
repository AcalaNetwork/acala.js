import { eventsFilterCallback, eventsFilterRx } from '@acala-network/sdk-core';
import { ApiPromise, ApiRx } from '@polkadot/api';
import { BehaviorSubject, Observable, Subject, Subscription, firstValueFrom } from 'rxjs';
import { switchMap, filter } from 'rxjs/operators';
import { NoQueryPath } from './error';
import { StorageConfigs } from './types';

export class Storage<T = unknown> {
  private configs: StorageConfigs;
  private subject: Subject<T>;
  private subscriber!: Subscription;

  constructor(configs: StorageConfigs) {
    this.configs = configs;
    this.subject = new BehaviorSubject<T>(undefined as unknown as T);
    this.doSubscriber();
  }

  static create<T = unknown>(configs: StorageConfigs): Storage<T> {
    return new Storage<T>(configs);
  }

  private doSubscriber() {
    this.subscriber = this.process().subscribe({
      next: (data) => {
        this.subject.next(data);
      }
    });
  }

  private process() {
    const { api } = this.configs;

    if (api.type === 'promise') {
      return this.processWithApiPromise();
    } else {
      return this.processWithApiRx();
    }
  }

  private getQueryFN(api: ApiRx | ApiPromise, path: string, at?: string): any {
    const arr = path.split('.');
    const start = at ? api.at(at) : api;

    return arr.reduce((acc, pathItem) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      return (acc as any)[pathItem];
    }, start);
  }

  private processWithApiRx(): Observable<T> {
    const { path, params, at, triggleEvents } = this.configs;
    const api = this.configs.api as ApiRx;

    const inner = (atHash?: string) => {
      const func = this.getQueryFN(api, path, atHash) as (...params: any[]) => Observable<T>;

      if (func) {
        return func(...params);
      }

      throw new NoQueryPath(path);
    };

    if (at) {
      return api.rpc.chain.getBlockHash(at).pipe(switchMap((hash) => inner(hash.toString())));
    }

    if (triggleEvents) {
      return eventsFilterRx(api, triggleEvents, true).pipe(switchMap(() => inner()));
    }

    return inner();
  }

  private processWithApiPromise(): Observable<T> {
    const { path, params, at, triggleEvents } = this.configs;
    const api = this.configs.api as ApiPromise;

    return new Observable((subscriber) => {
      (async () => {
        const atHash = at ? await api.rpc.chain.getBlockHash(at) : '';

        const func = this.getQueryFN(api, path, atHash.toString()) as (...params: any[]) => void;

        params.push((result: T) => subscriber.next(result));

        if (triggleEvents) {
          eventsFilterCallback(api, triggleEvents, true, () => {
            func(...params);
          });
        } else {
          func(...params);
        }
      })();
    });
  }

  public unsub(): void {
    this.subscriber.unsubscribe();
  }

  get observable(): Observable<T> {
    return this.subject.asObservable().pipe(filter((i) => !!i));
  }

  public async query(): Promise<T> {
    return firstValueFrom(this.observable);
  }
}
