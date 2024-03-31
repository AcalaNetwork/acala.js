"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "TokenPair", {
    enumerable: true,
    get: function() {
        return TokenPair;
    }
});
const _token = require("@acala-network/sdk-core/token");
const _util = require("@polkadot/util");
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
class TokenPair {
    static fromCurrencyId(currency) {
        (0, _util.assert)(currency.isDexShare, 'TokenPair.fromCurrencyId should receive CurrencyId which is DexShare');
        const [currency1, currency2] = currency.asDexShare;
        return new TokenPair(_token.Token.fromCurrencyId(currency1), _token.Token.fromCurrencyId(currency2));
    }
    static fromCurrencies(currency1, currency2) {
        return new TokenPair(_token.Token.fromCurrencyId(currency1), _token.Token.fromCurrencyId(currency2));
    }
    static fromTrandingPair(tradingPair) {
        const [currency1, currency2] = tradingPair;
        return TokenPair.fromCurrencies(currency1, currency2);
    }
    getOrigin() {
        return this.origin;
    }
    getPair() {
        return [
            this.token1,
            this.token2
        ];
    }
    isEqual(pair, compare) {
        return pair.token1.isEqual(this.token1, compare) && pair.token2.isEqual(this.token2, compare);
    }
    toChainData() {
        return [
            this.token1.toChainData(),
            this.token2.toChainData()
        ];
    }
    toTradingPair(api) {
        return api.registry.createType('AcalaPrimitivesTradingPair', this.toChainData());
    }
    constructor(token1, token2){
        _define_property(this, "token1", void 0);
        _define_property(this, "token2", void 0);
        _define_property(this, "origin", void 0);
        (0, _util.assert)(!token1.isEqual(token2), "can't create token pair by equal tokens.");
        const [_token1, _token2] = _token.Token.sort(token1, token2);
        this.token1 = _token1;
        this.token2 = _token2;
        this.origin = [
            token1,
            token2
        ];
    }
}
