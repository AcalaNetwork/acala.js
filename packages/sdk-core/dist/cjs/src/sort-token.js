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
    getTokenTypeWeight: function() {
        return getTokenTypeWeight;
    },
    sortTokenByName: function() {
        return sortTokenByName;
    }
});
const _primitives = /*#__PURE__*/ _interop_require_default(require("@acala-network/type-definitions/primitives"));
const _converter = require("./converter");
const _types = require("./types");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const TOKEN_TYPE_WEIGHTS = {
    [_types.TokenType.BASIC]: 9,
    [_types.TokenType.DEX_SHARE]: 8,
    [_types.TokenType.ERC20]: 7,
    [_types.TokenType.STABLE_ASSET_POOL_TOKEN]: 6,
    [_types.TokenType.LIQUID_CROWDLOAN]: 5,
    [_types.TokenType.FOREIGN_ASSET]: 4
};
function getTokenTypeWeight(name) {
    return 1000 * (TOKEN_TYPE_WEIGHTS[(0, _converter.getCurrencyTypeByName)(name)] || 0);
}
const TOKEN_SORT = _primitives.default.types.TokenSymbol._enum;
function sortTokenByName(a, b) {
    const weightA = getTokenTypeWeight(a);
    const weightB = getTokenTypeWeight(b);
    if (weightA !== weightB) {
        return weightB - weightA;
    }
    if ((0, _converter.isBasicToken)(a) && (0, _converter.isBasicToken)(b)) {
        return TOKEN_SORT[a] - TOKEN_SORT[b];
    }
    if ((0, _converter.isStableAssetName)(a) && (0, _converter.isStableAssetName)(b)) {
        return (0, _converter.getStableAssetPoolIdFromName)(a) - (0, _converter.getStableAssetPoolIdFromName)(b);
    }
    if ((0, _converter.isForeignAssetName)(a) && (0, _converter.isForeignAssetName)(b)) {
        return (0, _converter.getForeignAssetIdFromName)(a) - (0, _converter.getForeignAssetIdFromName)(b);
    }
    if ((0, _converter.isLiquidCrowdloanName)(a) && (0, _converter.isLiquidCrowdloanName)(b)) {
        return (0, _converter.getLiquidCrowdloanIdFromName)(a) - (0, _converter.getLiquidCrowdloanIdFromName)(b);
    }
    if ((0, _converter.isDexShareName)(a) && (0, _converter.isDexShareName)(b)) {
        const [a0, a1] = (0, _converter.unzipDexShareName)(a);
        const [b0, b1] = (0, _converter.unzipDexShareName)(b);
        const [result0, result1] = [
            sortTokenByName(a0, a1),
            sortTokenByName(b0, b1)
        ];
        if (a0 === b0) return result1;
        return result0;
    }
    return 0;
}
