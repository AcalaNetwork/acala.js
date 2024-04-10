import { FixedPointNumber, Token } from '@acala-network/sdk-core';
export interface VestingDetail {
    token: Token;
    total: FixedPointNumber;
    planToClaim: FixedPointNumber;
    prePeriod: FixedPointNumber;
    parachainBlock: bigint;
    startBlock: bigint;
    endBlock: bigint;
    period: bigint;
    periodCount: bigint;
}
export interface VestingData {
    token: Token;
    total: FixedPointNumber;
    claimed: FixedPointNumber;
    remaining: FixedPointNumber;
    available: FixedPointNumber;
    details: VestingDetail[];
}
