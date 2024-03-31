"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "TokenType", {
    enumerable: true,
    get: function() {
        return TokenType;
    }
});
var TokenType;
(function(TokenType) {
    TokenType[TokenType["BASIC"] = 0] = "BASIC";
    TokenType[TokenType["DEX_SHARE"] = 1] = "DEX_SHARE";
    TokenType[TokenType["ERC20"] = 2] = "ERC20";
    TokenType[TokenType["STABLE_ASSET_POOL_TOKEN"] = 3] = "STABLE_ASSET_POOL_TOKEN";
    TokenType[TokenType["LIQUID_CROWDLOAN"] = 4] = "LIQUID_CROWDLOAN";
    TokenType[TokenType["FOREIGN_ASSET"] = 5] = "FOREIGN_ASSET";
})(TokenType || (TokenType = {}));
