import { AnyApi, eventsFilter } from '@acala-network/sdk-core';
import { ApiPromise, ApiRx } from '@polkadot/api';
import { combineLatest, Observable, Subscription, from, ReplaySubject } from 'rxjs';
import { map, switchMap, filter } from 'rxjs/operators';
import { ChainListenerConfigs, EventFilterConfigs, BlockDetails } from './types.js';

export class ChainListener {
  private api: AnyApi;
  public readonly block$: ReplaySubject<BlockDetails>;
  private subscriptions: Subscription[];
  private static instances: Record<string, ChainListener> = {};

  constructor({ api }: ChainListenerConfigs) {
    this.api = api;
    this.block$ = new ReplaySubject<BlockDetails>(1);

    this.subscriptions = [
      this.subscribeBlock().subscribe({
        next: (data) => this.block$.next(data)
      })
    ];
  }

  static create({ api, key }: ChainListenerConfigs): ChainListener {
    const instanceKey = key || api.runtimeChain.toString();

    if (this.instances?.[instanceKey]) return this.instances[instanceKey];

    const instance = new ChainListener({ api });

    this.instances[instanceKey] = instance;

    return instance;
  }

  private subscribeBlockRx(): Observable<BlockDetails> {
    const api = this.api as ApiRx;

    return api.rpc.chain.subscribeNewHeads().pipe(
      switchMap((header) => {
        const hash = header.hash.toString();

        return from(api.at(hash)).pipe(
          switchMap((apiAt) => {
            return combineLatest({
              block: api.rpc.chain.getBlock(hash),
              events: apiAt.query.system.events()
            });
          })
        );
      }),
      map(({ block, events }) => {
        const extrinsics = block.block.extrinsics.map((item, i) => {
          const ownedEvents = events.slice().filter((item) => {
            if (item.phase.isInitialization && i === 0) return true;

            return item.phase.isApplyExtrinsic && item.phase.asApplyExtrinsic.eq(i);
          });

          return {
            raw: item,
            events: ownedEvents
          };
        });

        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
        const timestamp = new Date(Number(extrinsics[0].raw.args[0].toString()));

        return { block, extrinsics, events: [...events], timestamp };
      })
    );
  }

  private subscribeBlockPromise(): Observable<BlockDetails> {
    const api = this.api as ApiPromise;

    return new Observable((subscriber) => {
      return (() => {
        void api.rpc.chain.subscribeNewHeads(async (header) => {
          const hash = header.hash.toString();
          const block = await api.rpc.chain.getBlock(hash);
          const apiAt = await api.at(hash);
          const events = await apiAt.query.system.events();

          const extrinsics = block.block.extrinsics.map((item, i) => {
            const ownedEvents = events.slice().filter((item) => {
              if (item.phase.isInitialization && i === 0) return true;

              return item.phase.isApplyExtrinsic && item.phase.asApplyExtrinsic.eq(i);
            });

            return {
              raw: item,
              events: ownedEvents
            };
          });

          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
          const timestamp = new Date(Number(extrinsics[0].raw.args[0].toString()));

          subscriber.next({ block, extrinsics, events: [...events], timestamp });
        });
      })();
    });
  }

  private subscribeBlock() {
    if (this.api.type === 'promise') return this.subscribeBlockPromise();

    return this.subscribeBlockRx();
  }

  public unsubscribe() {
    this.subscriptions.forEach((item) => item.unsubscribe());
  }

  public subscribeByEvents(configs: EventFilterConfigs) {
    return this.block$.pipe(
      map((data) => {
        const filter = eventsFilter(configs);

        const extrinsics = data.extrinsics.filter((item) => {
          return item.events.reduce((acc, cur) => {
            return acc || filter(cur);
          }, false);
        });

        const events = data.events.filter((item) => {
          return filter(item);
        });

        return { ...data, extrinsics, events };
      }),
      filter((data) => {
        return data.events.length !== 0;
      })
    );
  }
}
