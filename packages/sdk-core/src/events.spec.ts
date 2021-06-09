import { EventRecord } from '@polkadot/types/interfaces';
import { eventsFilter } from './events';

describe('event', () => {
  test('filter events should work', () => {
    const eventsFilterConfig = [
      { section: 'section1', method: 'method1' },
      { section: 'section2', method: 'method2' }
    ];

    const result1 = eventsFilter(eventsFilterConfig)({
      event: { section: 'section1', method: 'method1' }
    } as EventRecord);

    const result2 = eventsFilter(eventsFilterConfig)({
      event: { section: 'section2', method: 'method2' }
    } as EventRecord);

    const result3 = eventsFilter(eventsFilterConfig)({
      event: { section: 'section3', method: 'method3' }
    } as EventRecord);

    const result4 = eventsFilter(eventsFilterConfig)({
      event: { section: 'section1', method: 'method2' }
    } as EventRecord);

    expect(result1).toEqual(true);
    expect(result2).toEqual(true);
    expect(result3).toEqual(false);
    expect(result4).toEqual(false);
  });

  test('filter events wildcard should work', () => {
    const eventsFilterConfig1 = [{ section: '*', method: 'method1' }];
    const eventsFilterConfig2 = [{ section: 'section1', method: '*' }];

    const result1 = eventsFilter(eventsFilterConfig1)({
      event: { section: 'section3', method: 'method1' }
    } as EventRecord);

    const result2 = eventsFilter(eventsFilterConfig1)({
      event: { section: 'section2', method: 'method2' }
    } as EventRecord);

    const result3 = eventsFilter(eventsFilterConfig2)({
      event: { section: 'section1', method: 'a' }
    } as EventRecord);

    const result4 = eventsFilter(eventsFilterConfig2)({
      event: { section: 'section1', method: 'b' }
    } as EventRecord);

    const result5 = eventsFilter(eventsFilterConfig2)({
      event: { section: 'section2', method: 'b' }
    } as EventRecord);

    expect(result1).toEqual(true);
    expect(result2).toEqual(false);

    expect(result3).toEqual(true);
    expect(result4).toEqual(true);
    expect(result5).toEqual(false);
  });
});
