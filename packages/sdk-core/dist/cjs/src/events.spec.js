"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _events = require("./events");
describe('event', ()=>{
    test('filter events should work', ()=>{
        const eventsFilterConfig = [
            {
                section: 'section1',
                method: 'method1'
            },
            {
                section: 'section2',
                method: 'method2'
            }
        ];
        const result1 = (0, _events.eventsFilter)(eventsFilterConfig)({
            event: {
                section: 'section1',
                method: 'method1'
            }
        });
        const result2 = (0, _events.eventsFilter)(eventsFilterConfig)({
            event: {
                section: 'section2',
                method: 'method2'
            }
        });
        const result3 = (0, _events.eventsFilter)(eventsFilterConfig)({
            event: {
                section: 'section3',
                method: 'method3'
            }
        });
        const result4 = (0, _events.eventsFilter)(eventsFilterConfig)({
            event: {
                section: 'section1',
                method: 'method2'
            }
        });
        expect(result1).toEqual(true);
        expect(result2).toEqual(true);
        expect(result3).toEqual(false);
        expect(result4).toEqual(false);
    });
    test('filter events wildcard should work', ()=>{
        const eventsFilterConfig1 = [
            {
                section: '*',
                method: 'method1'
            }
        ];
        const eventsFilterConfig2 = [
            {
                section: 'section1',
                method: '*'
            }
        ];
        const result1 = (0, _events.eventsFilter)(eventsFilterConfig1)({
            event: {
                section: 'section3',
                method: 'method1'
            }
        });
        const result2 = (0, _events.eventsFilter)(eventsFilterConfig1)({
            event: {
                section: 'section2',
                method: 'method2'
            }
        });
        const result3 = (0, _events.eventsFilter)(eventsFilterConfig2)({
            event: {
                section: 'section1',
                method: 'a'
            }
        });
        const result4 = (0, _events.eventsFilter)(eventsFilterConfig2)({
            event: {
                section: 'section1',
                method: 'b'
            }
        });
        const result5 = (0, _events.eventsFilter)(eventsFilterConfig2)({
            event: {
                section: 'section2',
                method: 'b'
            }
        });
        expect(result1).toEqual(true);
        expect(result2).toEqual(false);
        expect(result3).toEqual(true);
        expect(result4).toEqual(true);
        expect(result5).toEqual(false);
    });
});
