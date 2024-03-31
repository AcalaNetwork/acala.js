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
    getPromiseOrAtQuery: function() {
        return getPromiseOrAtQuery;
    },
    getSubscribeOrAtQuery: function() {
        return getSubscribeOrAtQuery;
    }
});
const getSubscribeOrAtQuery = (query, at)=>{
    return (...params)=>{
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        if (at) query.at(at, ...params);
        return query(...params);
    };
};
const getPromiseOrAtQuery = (query, at)=>{
    return (...params)=>{
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        if (at) query.at(at, ...params);
        return query(...params);
    };
};
