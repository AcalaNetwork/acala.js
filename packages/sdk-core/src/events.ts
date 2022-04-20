import { ApiPromise, ApiRx } from '@polkadot/api';
import { Vec } from '@polkadot/types';
import { EventRecord } from '@polkadot/types/interfaces';
import { FrameSystemEventRecord } from '@polkadot/types/lookup';
import { from, Observable } from 'rxjs';
import { startWith, filter, switchMap, shareReplay } from 'rxjs/operators';

export const eventMethodsFilter = (methods: string[]) => {
  return (event: EventRecord): boolean => {
    const method = event?.event?.method;

    return !!methods.find((item) => item === method);
  };
};

export const eventSectionsFilter = (sections: string[]) => {
  return (event: EventRecord): boolean => {
    const section = event?.event?.section;

    return !!sections.find((item) => item === section);
  };
};

export const eventsFilter = (data: { section: string; method: string }[]) => {
  return (event: FrameSystemEventRecord): boolean => {
    return data.reduce((acc, cur) => {
      // eslint-disable-next-line prettier/prettier
      const isSectionMatch = cur.section === '*' ? true : cur.section.toUpperCase() === event?.event?.section.toUpperCase();

      // eslint-disable-next-line prettier/prettier
      const isMethodMatch = cur.method === '*' ? true : cur.method.toUpperCase() === event?.event?.method.toUpperCase();

      return acc || (isSectionMatch && isMethodMatch);
    }, false as boolean);
  };
};

export const mockEventRecord = (section?: string, method?: string): Vec<EventRecord> => {
  return [{ event: { section, method } }] as any as Vec<EventRecord>;
};

export const eventsFilterRx = (
  api: ApiRx,
  configs: { section: string; method: string }[],
  immediately: boolean
): Observable<FrameSystemEventRecord> => {
  const events$ = api.rpc.chain.subscribeNewHeads().pipe(switchMap(() => api.query.system.events()));

  return events$.pipe(
    startWith(immediately ? mockEventRecord(configs[0].section, configs[0].method) : []),
    switchMap((events) => from(events)),
    filter(eventsFilter(configs)),
    shareReplay(1)
  );
};

export const eventsFilterCallback = (
  api: ApiPromise,
  configs: { section: string; method: string }[],
  immediately: boolean,
  callback: () => void
): void => {
  if (immediately) callback();

  api.rpc.chain.subscribeNewHeads(async () => {
    const events = await api.query.system.events();

    const filterdEvents = events.filter(eventsFilter(configs));

    if (filterdEvents.length !== 0) {
      callback();
    }
  });
};
