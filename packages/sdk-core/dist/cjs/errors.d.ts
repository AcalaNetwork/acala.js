import { MaybeCurrency } from './types';
export declare class MethodNotFound extends Error {
    readonly section: string;
    readonly method: string;
    constructor(section: string, method: string);
}
export declare class ConvertToCurrencyIdFailed extends Error {
    constructor(origin: MaybeCurrency);
}
export declare class ConvertToCurrencyNameFailed extends Error {
    constructor(origin: MaybeCurrency);
}
export declare class NotDexShareName extends Error {
    constructor(origin: string);
}
export declare class NotStableAssetPoolName extends Error {
    constructor(origin: string);
}
export declare class NotForeignAssetName extends Error {
    constructor(origin: string);
}
export declare class NotLiquidCrowdloanName extends Error {
    constructor(origin: string);
}
export declare class NotERC20TokenName extends Error {
    constructor(origin: string);
}
