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
    createDexShareName: function() {
        return createDexShareName;
    },
    createERC20Name: function() {
        return createERC20Name;
    },
    createForeignAssetName: function() {
        return createForeignAssetName;
    },
    createLiquidCrowdloanName: function() {
        return createLiquidCrowdloanName;
    },
    createStableAssetName: function() {
        return createStableAssetName;
    },
    forceToCurrencyId: function() {
        return forceToCurrencyId;
    },
    forceToCurrencyName: function() {
        return forceToCurrencyName;
    },
    forceToDexShareCurrencyId: function() {
        return forceToDexShareCurrencyId;
    },
    forceToERC20CurrencyId: function() {
        return forceToERC20CurrencyId;
    },
    forceToForeignAssetCurrencyId: function() {
        return forceToForeignAssetCurrencyId;
    },
    forceToStableAssetCurrencyId: function() {
        return forceToStableAssetCurrencyId;
    },
    forceToTokenSymbolCurrencyId: function() {
        return forceToTokenSymbolCurrencyId;
    },
    getBasicCurrencyObject: function() {
        return getBasicCurrencyObject;
    },
    getCurrencyObject: function() {
        return getCurrencyObject;
    },
    getCurrencyTypeByName: function() {
        return getCurrencyTypeByName;
    },
    getDexShareCurrencyObject: function() {
        return getDexShareCurrencyObject;
    },
    getERC20Object: function() {
        return getERC20Object;
    },
    getERC20TokenAddressFromName: function() {
        return getERC20TokenAddressFromName;
    },
    getForeignAssetCurrencyObject: function() {
        return getForeignAssetCurrencyObject;
    },
    getForeignAssetIdFromName: function() {
        return getForeignAssetIdFromName;
    },
    getLiquidCrowdloanIdFromName: function() {
        return getLiquidCrowdloanIdFromName;
    },
    getLiquidCrowdloanObject: function() {
        return getLiquidCrowdloanObject;
    },
    getStableAssetCurrencyObject: function() {
        return getStableAssetCurrencyObject;
    },
    getStableAssetPoolIdFromName: function() {
        return getStableAssetPoolIdFromName;
    },
    getStableAssetTokenName: function() {
        return getStableAssetTokenName;
    },
    isBasicToken: function() {
        return isBasicToken;
    },
    isDexShareName: function() {
        return isDexShareName;
    },
    isERC20Name: function() {
        return isERC20Name;
    },
    isForeignAssetName: function() {
        return isForeignAssetName;
    },
    isLiquidCrowdloanName: function() {
        return isLiquidCrowdloanName;
    },
    isStableAssetName: function() {
        return isStableAssetName;
    },
    unzipDexShareName: function() {
        return unzipDexShareName;
    }
});
const _lodash = require("lodash");
const _errors = require("./errors");
const _token = require("./token");
const _types = require("./types");
function isBasicToken(name) {
    return name.search('//') < 0;
}
function createDexShareName(name1, name2) {
    return `lp://${encodeURIComponent(name1)}/${encodeURIComponent(name2)}`;
}
function isDexShareName(name) {
    return name.startsWith('lp://');
}
function unzipDexShareName(name) {
    if (!isDexShareName(name)) throw new _errors.NotDexShareName(name);
    const reg = /^lp:\/\/([^/]*)?\/([^/]*)$/;
    const result = reg.exec(name);
    if (!result) throw new _errors.NotDexShareName(name);
    return [
        decodeURIComponent(result[1]),
        decodeURIComponent(result[2])
    ];
}
function createStableAssetName(id) {
    return `sa://${id}`;
}
function isStableAssetName(name) {
    return name.startsWith('sa://');
}
function getStableAssetTokenName(api, name) {
    const chain = api.runtimeChain.toString();
    const poolId = getStableAssetPoolIdFromName(name);
    return _token.STABLE_ASSET_POOLS[chain][poolId].name;
}
function getStableAssetPoolIdFromName(name) {
    if (!isStableAssetName(name)) throw new _errors.NotStableAssetPoolName(name);
    return parseInt(name.replace('sa://', ''));
}
function createForeignAssetName(id) {
    return `fa://${id}`;
}
function isForeignAssetName(name) {
    return name.startsWith('fa://');
}
function getForeignAssetIdFromName(name) {
    if (!isForeignAssetName(name)) throw new _errors.NotForeignAssetName(name);
    return parseInt(name.replace('fa://', ''));
}
function createLiquidCrowdloanName(id) {
    return `lc://${id}`;
}
function isLiquidCrowdloanName(name) {
    return name.startsWith('lc://');
}
function getLiquidCrowdloanIdFromName(name) {
    if (!isLiquidCrowdloanName(name)) throw new _errors.NotLiquidCrowdloanName(name);
    return parseInt(name.replace('lc://', ''));
}
function createERC20Name(hash) {
    return `erc20://${hash}`;
}
function isERC20Name(name) {
    return name.startsWith('erc20://');
}
function getERC20TokenAddressFromName(name) {
    if (!isERC20Name(name)) throw new _errors.NotERC20TokenName(name);
    return name.replace('erc20://', '');
}
function getCurrencyTypeByName(name) {
    if (isStableAssetName(name)) return _types.TokenType.STABLE_ASSET_POOL_TOKEN;
    if (isDexShareName(name)) return _types.TokenType.DEX_SHARE;
    if (isForeignAssetName(name)) return _types.TokenType.FOREIGN_ASSET;
    if (isDexShareName(name)) return _types.TokenType.DEX_SHARE;
    if (isLiquidCrowdloanName(name)) return _types.TokenType.LIQUID_CROWDLOAN;
    if (isERC20Name(name)) return _types.TokenType.ERC20;
    return _types.TokenType.BASIC;
}
function getBasicCurrencyObject(name) {
    return {
        Token: name
    };
}
function getStableAssetCurrencyObject(name) {
    return {
        StableAssetPoolToken: getStableAssetPoolIdFromName(name)
    };
}
function getForeignAssetCurrencyObject(name) {
    return {
        ForeignAsset: getForeignAssetIdFromName(name)
    };
}
function getLiquidCrowdloanObject(name) {
    return {
        LiquidCrowdloan: getLiquidCrowdloanIdFromName(name)
    };
}
function getERC20Object(name) {
    return {
        Erc20: getERC20TokenAddressFromName(name)
    };
}
function getDexShareCurrencyObject(name) {
    const inner = (name)=>{
        if (isDexShareName(name)) {
            const [name1, name2] = unzipDexShareName(name);
            return {
                DexShare: [
                    inner(name1),
                    inner(name2)
                ]
            };
        }
        if (isForeignAssetName(name)) return getForeignAssetCurrencyObject(name);
        if (isStableAssetName(name)) return getStableAssetCurrencyObject(name);
        if (isLiquidCrowdloanName(name)) return getLiquidCrowdloanObject(name);
        if (isERC20Name(name)) return getERC20Object(name);
        return getBasicCurrencyObject(name);
    };
    return inner(name);
}
function getCurrencyObject(name) {
    if (isDexShareName(name)) return getDexShareCurrencyObject(name);
    if (isForeignAssetName(name)) return getForeignAssetCurrencyObject(name);
    if (isStableAssetName(name)) return getStableAssetCurrencyObject(name);
    if (isLiquidCrowdloanName(name)) return getLiquidCrowdloanObject(name);
    if (isERC20Name(name)) return getERC20Object(name);
    return getBasicCurrencyObject(name);
}
function forceToCurrencyName(target) {
    try {
        if (typeof target === 'string') return target;
        if (Array.isArray(target)) return createDexShareName(target[0], target[1]);
        if (target instanceof _token.Token) return target.toString();
        if (target.isToken) return target.asToken.toString();
        if (target.isDexShare) {
            return createDexShareName(forceToCurrencyName(target.asDexShare[0]), forceToCurrencyName(target.asDexShare[1]));
        }
        if (target.isErc20) return createERC20Name(target.asErc20.toString());
        if (target.isStableAssetPoolToken) return createStableAssetName(target.asStableAssetPoolToken.toNumber());
        if (target.isForeignAsset) return createForeignAssetName(target.asForeignAsset.toNumber());
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        if (target.isLiquidCrowdloan) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            return createLiquidCrowdloanName(target.asLiquidCrowdloan.toNumber());
        }
        return target.toString();
    } catch (e) {
        throw new _errors.ConvertToCurrencyNameFailed(target);
    }
}
function forceToCurrencyId(api, target) {
    try {
        const name = forceToCurrencyName(target);
        return api.registry.createType('AcalaPrimitivesCurrencyCurrencyId', getCurrencyObject(name));
    } catch (e) {
        throw new _errors.ConvertToCurrencyIdFailed(target);
    }
}
const forceToTokenSymbolCurrencyId = (api, target)=>{
    const name = target.toString();
    return forceToCurrencyId(api, name);
};
const forceToDexShareCurrencyId = (api, target)=>{
    let name = '';
    if ((0, _lodash.isArray)(target)) {
        name = createDexShareName(target[0], target[1]);
    } else {
        name = forceToCurrencyName(target);
    }
    return forceToCurrencyId(api, name);
};
const forceToStableAssetCurrencyId = (api, target)=>{
    let name = '';
    if (typeof target === 'number') {
        name = createStableAssetName(target);
    } else {
        name = forceToCurrencyName(target);
    }
    return forceToCurrencyId(api, name);
};
const forceToForeignAssetCurrencyId = (api, target)=>{
    let name = '';
    if (typeof target === 'number') {
        name = createForeignAssetName(target);
    } else {
        name = forceToCurrencyName(target);
    }
    return forceToCurrencyId(api, name);
};
const forceToERC20CurrencyId = (api, target)=>{
    let name = '';
    if (typeof target === 'string') {
        name = createERC20Name(target);
    } else {
        name = forceToCurrencyName(target);
    }
    return forceToCurrencyId(api, name);
};
