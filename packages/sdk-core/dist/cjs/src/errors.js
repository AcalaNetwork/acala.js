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
    ConvertToCurrencyIdFailed: function() {
        return ConvertToCurrencyIdFailed;
    },
    ConvertToCurrencyNameFailed: function() {
        return ConvertToCurrencyNameFailed;
    },
    MethodNotFound: function() {
        return MethodNotFound;
    },
    NotDexShareName: function() {
        return NotDexShareName;
    },
    NotERC20TokenName: function() {
        return NotERC20TokenName;
    },
    NotForeignAssetName: function() {
        return NotForeignAssetName;
    },
    NotLiquidCrowdloanName: function() {
        return NotLiquidCrowdloanName;
    },
    NotStableAssetPoolName: function() {
        return NotStableAssetPoolName;
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
class MethodNotFound extends Error {
    constructor(section, method){
        super();
        _define_property(this, "section", void 0);
        _define_property(this, "method", void 0);
        this.section = section;
        this.method = method;
        this.message = `can't find ${section}.${method} in api`;
        this.name = 'MethodNotFound';
    }
}
class ConvertToCurrencyIdFailed extends Error {
    constructor(origin){
        super();
        this.name = 'convertToCurrencyIdFailed';
        this.message = `convert to currency id failed ${origin.toString()}`;
    }
}
class ConvertToCurrencyNameFailed extends Error {
    constructor(origin){
        super();
        this.name = 'convertToCurrencyNameFailed';
        this.message = `convert to currency name failed ${origin.toString()}`;
    }
}
class NotDexShareName extends Error {
    constructor(origin){
        super();
        this.name = 'notDexShare';
        this.message = `${origin} is not dex share name`;
    }
}
class NotStableAssetPoolName extends Error {
    constructor(origin){
        super();
        this.name = 'notStableAssetPoolId';
        this.message = `${origin} is not stable asset pool name`;
    }
}
class NotForeignAssetName extends Error {
    constructor(origin){
        super();
        this.name = 'notForeignAssetName';
        this.message = `${origin} is not foreign asset name`;
    }
}
class NotLiquidCrowdloanName extends Error {
    constructor(origin){
        super();
        this.name = 'notLiquidCrowdloan';
        this.message = `${origin} is not liquid crowdloan asset name`;
    }
}
class NotERC20TokenName extends Error {
    constructor(origin){
        super();
        this.name = 'notERC20Token';
        this.message = `${origin} is not erc20 token name`;
    }
}
