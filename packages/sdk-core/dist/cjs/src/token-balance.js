"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "TokenBalance", {
    enumerable: true,
    get: function() {
        return TokenBalance;
    }
});
const _fixedpointnumber = require("./fixed-point-number");
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
class TokenBalance {
    get token() {
        return this._token;
    }
    get balance() {
        return this._balance;
    }
    clone() {
        return new TokenBalance(this._token.clone(), this._balance.clone());
    }
    constructor(token, balance){
        _define_property(this, "_token", void 0);
        _define_property(this, "_balance", void 0);
        this._token = token;
        this._balance = balance || _fixedpointnumber.FixedPointNumber.ZERO;
    }
}
