import { ApiRx } from '@polkadot/api';
import { Vec } from '@polkadot/types';
import { EventRecord } from '@polkadot/types/interfaces';
import { from, Observable } from '@polkadot/x-rxjs';
import { startWith, filter, switchMap, shareReplay } from '@polkadot/x-rxjs/operators';

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
  return (event: EventRecord): boolean => {
    return data.reduce((acc, cur) => {
      return acc || (cur.method === event.event.method && cur.section === event.event.section);
    }, false as boolean);
  };
};

export const mockEventRecord = (section?: string, method?: string): Vec<EventRecord> => {
  return ([{ event: { section, method } }] as any) as Vec<EventRecord>;
};

export const eventsFilterRx = (
  api: ApiRx,
  configs: { section: string; method: string }[],
  immediately: boolean
): Observable<EventRecord> => {
  return api.query.system.events().pipe(
    startWith(immediately ? mockEventRecord(configs?.[0].section, configs?.[0].method) : undefined),
    switchMap((events) => from(events || [])),
    filter(eventsFilter(configs)),
    shareReplay(1)
  );
};
