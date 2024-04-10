export declare class NotSupportETHAddress extends Error {
    constructor(address: string);
}
export declare class NotSupportEVMBalance extends Error {
    constructor();
}
export declare class CurrencyNotFound extends Error {
    constructor(name: string);
}
export declare class TradingPairNotFound extends Error {
    constructor(name: string);
}
