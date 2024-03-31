"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    eventMethodsFilter: function() {
        return eventMethodsFilter;
    },
    eventSectionsFilter: function() {
        return eventSectionsFilter;
    },
    eventsFilter: function() {
        return eventsFilter;
    },
    eventsFilterCallback: function() {
        return eventsFilterCallback;
    },
    eventsFilterRx: function() {
        return eventsFilterRx;
    },
    mockEventRecord: function() {
        return mockEventRecord;
    }
});
const _rxjs = require("rxjs");
const _operators = require("rxjs/operators");
const eventMethodsFilter = (methods)=>{
    return (event)=>{
        const method = event?.event?.method;
        return !!methods.find((item)=>item === method);
    };
};
const eventSectionsFilter = (sections)=>{
    return (event)=>{
        const section = event?.event?.section;
        return !!sections.find((item)=>item === section);
    };
};
const eventsFilter = (data)=>{
    return (event)=>{
        return data.reduce((acc, cur)=>{
            // eslint-disable-next-line prettier/prettier
            const isSectionMatch = cur.section === '*' ? true : cur.section.toUpperCase() === event?.event?.section.toUpperCase();
            // eslint-disable-next-line prettier/prettier
            const isMethodMatch = cur.method === '*' ? true : cur.method.toUpperCase() === event?.event?.method.toUpperCase();
            return acc || isSectionMatch && isMethodMatch;
        }, false);
    };
};
const mockEventRecord = (section, method)=>{
    return [
        {
            event: {
                section,
                method
            }
        }
    ];
};
const eventsFilterRx = (api, configs, immediately)=>{
    const events$ = api.rpc.chain.subscribeNewHeads().pipe((0, _operators.switchMap)(()=>api.query.system.events()));
    return events$.pipe((0, _operators.startWith)(immediately ? mockEventRecord(configs[0].section, configs[0].method) : []), (0, _operators.switchMap)((events)=>(0, _rxjs.from)(events)), (0, _operators.filter)(eventsFilter(configs)), (0, _operators.shareReplay)(1));
};
const eventsFilterCallback = (api, configs, immediately, callback)=>{
    if (immediately) callback();
    api.rpc.chain.subscribeNewHeads(async ()=>{
        const events = await api.query.system.events();
        const filterdEvents = events.filter(eventsFilter(configs));
        if (filterdEvents.length !== 0) {
            callback();
        }
    });
};
