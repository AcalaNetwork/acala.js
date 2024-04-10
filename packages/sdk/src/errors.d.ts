import { Token } from '@acala-network/sdk-core';
export declare class MethodNotFound extends Error {
    readonly section: string;
    readonly method: string;
    constructor(section: string, method: string);
}
export declare class SDKNotReady extends Error {
    constructor(name: string);
}
export declare class BelowExistentialDeposit extends Error {
    constructor(address: string, token: Token);
}
