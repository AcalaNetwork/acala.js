import { ApiPromise, ApiRx } from '@polkadot/api';
import { ApiDecoration, ApiTypes, QueryableStorageEntry } from '@polkadot/api/types';
import { AnyTuple } from '@polkadot/types/types';
import LRUCache from 'lru-cache';
import { firstValueFrom, isObservable, Observable, ReplaySubject, tap } from 'rxjs';
import { ChainListener } from '../chain-listener/index.js';
import { NoQueryPath, RequiredQueryPathOrQuery } from './error.js';
import { StorageConfig } from './types.js';

/**
 * a tool to create same query interfaces for apiPromise and apiRx
 */
export class SubStorage<T = unknown> {
  readonly configs: StorageConfig;
  private subject: ReplaySubject<T>;
  private chainListener: ChainListener;

  constructor(configs: StorageConfig) {
    this.configs = configs;
    this.subject = new ReplaySubject<T>(1);
    this.chainListener = ChainListener.create({ api: configs.api });

    this.subscribe();
  }

  private subscribe() {
    const { api } = this.configs;

    if (api.type === 'promise') {
      void this.subscribeWithPromiseApi();
    }

    if (api.type === 'rxjs') {
      void this.subscribeWithRxApi();
    }

    this.triggerByEvents();
  }

  private getQuery(
    api: ApiPromise | ApiRx | ApiDecoration<'promise'> | ApiDecoration<'rxjs'>
  ): QueryableStorageEntry<ApiTypes, any> {
    const { path, query } = this.configs;

    if (query) return query;

    if (path) {
      const queryPath = path.split('.');

      return queryPath.reduce((acc, i) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
        const result = (acc as any)[i];
        if (!result) {
          throw new NoQueryPath(path);
        }
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return result;
      }, api) as any as QueryableStorageEntry<ApiTypes, AnyTuple>;
    }

    throw new RequiredQueryPathOrQuery();
  }

  private triggerByEvents() {
    const { events } = this.configs;

    if (events) {
      this.chainListener.subscribeByEvents(events).subscribe({
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        next: () => this.queryData()
      });
    }
  }

  private async queryData() {
    const { api, params } = this.configs;

    const query = this.getQuery(api);

    if (api.type === 'promise') {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const data = (await query(...params)) as unknown as T;

      this.subject.next(data);
    }

    if (api.type === 'rxjs') {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const data = await firstValueFrom(query(...params) as unknown as Observable<T>);

      this.subject.next(data);
    }
  }

  private async subscribeWithPromiseApi() {
    const { at, params } = this.configs;

    let api: ApiPromise | ApiDecoration<'promise'> = this.configs.api as ApiPromise;

    if (at) {
      const blockHash = await (api as ApiPromise).rpc.chain.getBlockHash(at);

      api = await (api as ApiPromise).at(blockHash);
    }

    params.push((result: T) => this.subject.next(result));

    const func = this.getQuery(api);

    if (!func) return;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    void func(...params);
  }

  private async subscribeWithRxApi() {
    const { at, params } = this.configs;

    let api: ApiRx | ApiDecoration<'rxjs'> = this.configs.api as ApiRx;

    if (at) {
      const blockHash = await firstValueFrom((api as ApiRx).rpc.chain.getBlockHash(at));

      api = await (api as ApiRx).at(blockHash);

      const func = this.getQuery(api);

      if (!func) return;

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
      const storage$ = (func as any)(...params);

      if (isObservable(storage$)) {
        (storage$ as unknown as Observable<T>).pipe(tap((result) => this.subject.next(result))).subscribe();
      }
    }

    (api as ApiRx).isReady.subscribe(() => {
      const func = this.getQuery(api);

      if (!func) return;

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
      const storage$ = (func as any).call(api, ...params);

      if (isObservable(storage$)) {
        (storage$ as unknown as Observable<T>).pipe(tap((result) => this.subject.next(result))).subscribe();
      }
    });
  }

  public get observable() {
    return this.subject.asObservable();
  }

  public async query() {
    return firstValueFrom(this.observable);
  }

  public complated() {
    this.subject.complete();
  }
}

function getSubStorageKey(configs: StorageConfig) {
  const { api, path, query, params } = configs;

  if (query) {
    return [
      api.runtimeChain.toString(),
      api.type,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      (query as any).section,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      (query as any).method,
      JSON.stringify(params)
    ].join(',');
  }

  return [
    api.runtimeChain.toString(),
    api.type,
    path,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    JSON.stringify(params)
  ].join('-');
}

export class Storage {
  static subStorages = new LRUCache<string, SubStorage<any>>({ max: 5000 });

  static create<T = unknown>(configs: StorageConfig) {
    const key = getSubStorageKey(configs);

    if (this.subStorages.has(key)) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const cached = this.subStorages.get(key)! as SubStorage<T>;

      if (cached.configs.api.isConnected) return cached;
    }

    const subStorage = new SubStorage<T>(configs);

    this.subStorages.set(key, subStorage);

    return subStorage;
  }
}
