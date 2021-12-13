import { assert } from '@polkadot/util';
import { Storage } from './storage';

type Fetcher = <V extends any, T extends Storage<V>>(params?: { toString: () => string }[]) => T;

type Configs<T extends string> = { [P in T]: Fetcher };

export class StorageManager<K extends string, C extends Configs<K>> {
  private configs: C;
  private storages: Record<string, Storage>;

  constructor(configs: C) {
    this.configs = configs;
    this.storages = {};
  }

  public get = (key: K, params?: Parameters<Fetcher>): ReturnType<C[K]>['observable'] => {
    let id = key as any as string;

    if (params) {
      id = id + '-' + params.map((item) => item?.toString()).join('-');
    }

    if (!this.storages[id] && this.configs[key] && id) {
      const fn = this.configs[key] as any as Fetcher;

      assert(fn, 'no storage fetcher found');

      this.storages[id] = fn?.(params as any);
    }

    return this.storages[id].observable;
  };
}
