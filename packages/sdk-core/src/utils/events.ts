import { Vec } from '@polkadot/types';
import { EventRecord } from '@polkadot/types/interfaces';

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

export const eventFilter = (section: string, method: string) => {
  return (event: EventRecord): boolean => {
    const _section = event?.event?.section;
    const _method = event?.event?.method;

    return _section === section && _method === method;
  };
};

export const mockEventRecord = (section?: string, method?: string): Vec<EventRecord> => {
  return ([{ event: { event: { section, method } } }] as any) as Vec<EventRecord>;
};
