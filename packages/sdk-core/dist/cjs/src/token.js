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
    STABLE_ASSET_POOLS: function() {
        return STABLE_ASSET_POOLS;
    },
    Token: function() {
        return Token;
    }
});
const _util = require("@polkadot/util");
const _types = require("./types");
const _converter = require("./converter");
const _sorttoken = require("./sort-token");
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
const STABLE_ASSET_POOLS = {
    // Mandala
    'Acala Mandala TC7': [
        {
            poolId: 0,
            name: 'tKSM',
            decimals: 12,
            assets: [
                'KSM',
                'LKSM'
            ]
        },
        {
            poolId: 1,
            name: '3USD',
            decimals: 12,
            assets: [
                'AUSD',
                'erc20://0x5f8e26facc23fa4cbd87b8d9dbbd33d5047abde1',
                'fa://0'
            ]
        },
        {
            poolId: 2,
            name: 'tDOT',
            decimals: 10,
            assets: [
                'DOT',
                'LDOT'
            ]
        }
    ],
    // Karura
    Karura: [
        {
            poolId: 0,
            name: 'tKSM',
            decimals: 12,
            assets: [
                'KSM',
                'LKSM'
            ]
        },
        {
            poolId: 1,
            name: '3USD',
            decimals: 12,
            assets: [
                'KUSD',
                'erc20://0x1f3a10587a20114ea25ba1b388ee2dd4a337ce27',
                'fa://7'
            ]
        }
    ],
    Acala: [
        {
            poolId: 0,
            name: 'tDOT',
            decimals: 10,
            assets: [
                'DOT',
                'LDOT'
            ]
        }
    ],
    // Mandala testnet
    'Mandala Dev': [
        {
            poolId: 0,
            name: 'tKSM',
            decimals: 12,
            assets: [
                'KSM',
                'LKSM'
            ]
        }
    ],
    // Karura testnet
    'Acala Karura Dev': [
        {
            poolId: 0,
            name: 'tKSM',
            decimals: 12,
            assets: [
                'KSM',
                'LKSM'
            ]
        }
    ]
};
class Token {
    get isTokenSymbol() {
        return this.type === _types.TokenType.BASIC;
    }
    get isDexShare() {
        return this.type === _types.TokenType.DEX_SHARE;
    }
    get isERC20() {
        return this.type === _types.TokenType.ERC20;
    }
    get isStableAssetPoolToken() {
        return this.type === _types.TokenType.STABLE_ASSET_POOL_TOKEN;
    }
    get isLiquidCrowdloan() {
        return this.type === _types.TokenType.LIQUID_CROWDLOAN;
    }
    get isForeignAsset() {
        return this.type === _types.TokenType.FOREIGN_ASSET;
    }
    get decimal() {
        console.warn('decimal is deprecated, please use decimals');
        return this.decimals;
    }
    static create(name, configs) {
        return new Token(name, configs);
    }
    /**
   * @name fromCurrencyName
   * @description create token from curreync name
   */ static fromCurrencyName(name, configs) {
        const type = (0, _converter.getCurrencyTypeByName)(name);
        return new Token(name, {
            ...configs,
            type
        });
    }
    /**
   * @name fromCurrencyId
   * @description create token from currency id
   */ static fromCurrencyId(currency, configs) {
        return this.fromCurrencyName((0, _converter.forceToCurrencyName)(currency), configs);
    }
    static fromTokenSymbol(token, configs) {
        return this.fromCurrencyName(token.toString(), configs);
    }
    /* create DexShareToken by Token array */ static fromTokens(token1, token2, configs) {
        const [_token1, _token2] = this.sort(token1, token2);
        // set token1 decimals as decimals;
        const decimals = _token1.decimals;
        const ed = _token1.ed;
        return new Token((0, _converter.createDexShareName)(_token1.name, _token2.name), {
            decimals,
            type: _types.TokenType.DEX_SHARE,
            ed,
            ...configs
        });
    }
    /* create DexShareToken form CombinedCurrencyId array */ static fromCurrencies(currency1, currency2, decimals) {
        const decimals1 = Array.isArray(decimals) ? decimals[0] : decimals;
        const decimals2 = Array.isArray(decimals) ? decimals[1] : decimals;
        const token1 = Token.fromCurrencyId(currency1, {
            decimals: decimals1
        });
        const token2 = Token.fromCurrencyId(currency2, {
            decimals: decimals2
        });
        return Token.fromTokens(token1, token2);
    }
    /* create DexShareToken from TokenSymbol array */ static fromTokenSymbols(currency1, currency2, decimals) {
        const decimals1 = Array.isArray(decimals) ? decimals[0] : decimals;
        const decimals2 = Array.isArray(decimals) ? decimals[1] : decimals;
        const token1 = Token.fromTokenSymbol(currency1, {
            decimals: decimals1
        });
        const token2 = Token.fromTokenSymbol(currency2, {
            decimals: decimals2
        });
        return Token.fromTokens(token1, token2);
    }
    /** Create StableAssetPoolToken by stable asset pool ID. Chain must be provided/ */ static fromStableAssetPool(chain, poolId, configs) {
        return new Token((0, _converter.createStableAssetName)(poolId), {
            decimals: STABLE_ASSET_POOLS[chain][poolId].decimals,
            type: _types.TokenType.STABLE_ASSET_POOL_TOKEN,
            ...configs
        });
    }
    static sortTokenNames(...names) {
        const result = [
            ...names
        ];
        return result.sort((a, b)=>{
            return (0, _sorttoken.sortTokenByName)(a, b);
        });
    }
    static sortCurrencies(...currencies) {
        const result = [
            ...currencies
        ];
        const nameMap = Object.fromEntries(result.map((item)=>[
                (0, _converter.forceToCurrencyName)(item),
                item
            ]));
        return Object.keys(nameMap).sort((a, b)=>(0, _sorttoken.sortTokenByName)(a, b)).map((name)=>nameMap[name]);
    }
    static sort(...tokens) {
        const result = [
            ...tokens
        ];
        const nameMap = Object.fromEntries(result.map((item)=>[
                item.name,
                item
            ]));
        return Object.keys(nameMap).sort((a, b)=>(0, _sorttoken.sortTokenByName)(a, b)).map((name)=>nameMap[name]);
    }
    toCurrencyId(api) {
        try {
            return api.registry.createType('AcalaPrimitivesCurrencyCurrencyId', this.toChainData());
        } catch (e) {
            throw new Error(`can't convert ${this.toChainData()} to Currency Id. ${e}`);
        }
    }
    toTradingPair(api) {
        (0, _util.assert)(this.isDexShare, 'the currency is not a dex share');
        try {
            return api.registry.createType('AcalaPrimitivesTradingPair', [
                ...(0, _converter.unzipDexShareName)(this.name).map((i)=>(0, _converter.getCurrencyObject)(i))
            ]);
        } catch (e) {
            throw new Error(`can't convert ${this.toChainData()} to Trading Pair`);
        }
    }
    toDexShare(api) {
        try {
            (0, _util.assert)(this.isDexShare, 'the token is not a dexShare');
            return api.registry.createType('AcalaPrimitivesCurrencyDexShare', this.toChainData());
        } catch (e) {
            throw new Error(`can't convert ${this.toChainData()} to DexShare`);
        }
    }
    toTokenSymbol(api) {
        try {
            (0, _util.assert)(this.isTokenSymbol, 'the currency is not a token symbol');
            return api.registry.createType('AcalaPrimitivesCurrencyTokenSymbol', this.name);
        } catch (e) {
            throw new Error(`can't convert ${this.toChainData()} to Token Symbol`);
        }
    }
    clone() {
        return new Token(this.name, {
            ...this
        });
    }
    isEqual(target, compare) {
        if (compare) {
            return compare(this, target);
        }
        return this.name === target.name;
    }
    toChainData() {
        return (0, _converter.getCurrencyObject)(this.name);
    }
    toString() {
        return this.name;
    }
    constructor(name, configs){
        _define_property(this, "name", void 0);
        _define_property(this, "display", void 0);
        _define_property(this, "fullname", void 0);
        _define_property(this, "symbol", void 0);
        _define_property(this, "decimals", void 0);
        _define_property(this, "ed", void 0);
        _define_property(this, "chain", void 0);
        _define_property(this, "type", void 0);
        _define_property(this, "pair", void 0);
        _define_property(this, "locations", void 0);
        // basic token informations
        this.name = name;
        this.type = configs?.type || _types.TokenType.BASIC;
        this.display = configs?.display || configs?.symbol || name;
        this.fullname = configs?.fullname || this.display;
        this.symbol = configs?.symbol || name;
        this.decimals = configs?.decimals || configs?.decimal || 18;
        this.ed = configs?.ed || _fixedpointnumber.FixedPointNumber.ZERO;
        this.chain = configs?.chain;
        // foreign asset locations
        this.locations = configs?.locations;
    }
}
