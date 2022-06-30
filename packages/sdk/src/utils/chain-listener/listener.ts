import { AnyApi, eventsFilter } from '@acala-network/sdk-core';
import { ApiPromise, ApiRx } from '@polkadot/api';
import { BehaviorSubject, combineLatest, Observable, Subscription, from } from 'rxjs';
import { map, switchMap, filter } from 'rxjs/operators';
import { ChainListenerConfigs, EventFilterConfigs, ListenerBlock } from './type';

export class ChainListener {
  private api: AnyApi;
  public readonly block$: BehaviorSubject<ListenerBlock | undefined>;
  private subscriptions: Subscription[];
  private static instances: Record<string, ChainListener>;

  constructor({ api }: ChainListenerConfigs) {
    this.api = api;
    this.block$ = new BehaviorSubject<ListenerBlock | undefined>(undefined);

    this.subscriptions = [
      this.subscribeBlock().subscribe({
        next: (data) => this.block$.next(data)
      })
    ];

    if (!ChainListener.instances) {
      ChainListener.instances = {};
    }
  }

  static create({ api, instanceKey }: ChainListenerConfigs): ChainListener {
    if (this.instances?.[instanceKey]) return this.instances[instanceKey];

    const instance = new ChainListener({ api, instanceKey });

    this.instances[instanceKey] = instance;

    return instance;
  }

  private subscribeBlockRx(): Observable<ListenerBlock> {
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

  private subscribeBlockPromise(): Observable<ListenerBlock> {
    const api = this.api as ApiPromise;

    return new Observable((subscriber) => {
      return (() => {
        api.rpc.chain.subscribeNewHeads(async (header) => {
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

  public filterByEvents(configs: EventFilterConfigs) {
    return this.subscribe().pipe(
      map((data) => {
        const filter = eventsFilter(configs.events);

        const extrinsics = data.extrinsics.filter((item) => {
          return item.events.reduce((acc, cur) => {
            return acc || filter(cur);
          }, false);
        });

        const events = data.events.filter((item) => {
          return filter(item);
        });

        return { ...data, extrinsics, events };
      })
    );
  }

  public subscribe(): Observable<ListenerBlock> {
    return this.block$.pipe(filter((item) => !!item)) as any as Observable<ListenerBlock>;
  }
}
