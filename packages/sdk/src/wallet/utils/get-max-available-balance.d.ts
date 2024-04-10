import { FixedPointNumber as FN } from '@acala-network/sdk-core';
export declare class MayFailedCausedByFee extends Error {
    constructor();
}
interface Config {
    isDefaultFee: boolean;
    isFeeToken: boolean;
    isAllowDeath: boolean;
    providers: bigint;
    consumers: bigint;
    feeFreeBalance: FN;
    targetFreeBalance: FN;
    targetLockedBalance: FN;
    ed: FN;
    fee: FN;
}
export declare const getMaxAvailableBalance: (config: Config) => FN;
export {};
