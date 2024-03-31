"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "TokenSet", {
    enumerable: true,
    get: function() {
        return TokenSet;
    }
});
function _define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
class TokenSet {
    values() {
        return this._list;
    }
    add(target) {
        const isExist = !!this._list.find((item)=>item.isEqual(target));
        if (!isExist) {
            this._list.push(target);
        }
    }
    delete(target) {
        const index = this._list.findIndex((item)=>item.isEqual(target));
        if (index !== -1) {
            this._list.splice(index, 1);
        }
    }
    clear() {
        this._list = [];
    }
    constructor(){
        _define_property(this, "_list", void 0);
        this._list = [];
    }
}
