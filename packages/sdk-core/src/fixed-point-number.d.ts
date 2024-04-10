import { BigNumber } from 'bignumber.js';
/**
 * @constant
 * @type {(0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8)}
 * @description
 * | Value | Property | Description |
 * | 0     | ROUND_UP | Rounds away from zero |
 * | 1     | ROUND_DOWN | Rounds towards zero |
 * | 2     | ROUND_CEIL | Rounds towards Infinity |
 * | 3     | ROUND_FLOOR | Rounds towards -Infinity |
 * | 4     | ROUND_HALF_UP | Rounds towards nearest neighbour, If equidistant, rounds away form zero |
 * | 5     | ROUND_HALF_DOWN | Rounds towards nearest neighbour, If equidistant, rounds towards zero |
 * | 6     | ROUND_HALF_EVEN | Rounds towards nearest neighbour, If equidistant, rounds towards even zero |
 * | 7     | ROUND_HALF_CEIL | Rounds towards nearest neighbour, If equidistant, rounds towards Infinity |
 * | 8     | ROUND_HALF_FLOOR | Rounds towards nearest neighbour, If equidistant, rounds towards -Infinity |
 */
export type ROUND_MODE = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
export declare class FixedPointNumber {
    private precision;
    private inner;
    constructor(origin: number | string, precision?: number);
    static setGlobalPrecision(precision?: number): void;
    /**
     * @name fromRational
     * @description constructor form inner
     */
    static fromRational(numerator: number | string | FixedPointNumber, denominator: number | string | FixedPointNumber, precision?: number): FixedPointNumber;
    /**
     * @name fromInner
     * @description constructor form inner
     */
    static fromInner(origin: number | string, precision?: number): FixedPointNumber;
    /**
     * @name _fromBN
     * @description constructor from BN
     */
    static _fromBN(origin: BigNumber, precision?: number): FixedPointNumber;
    _setInner(origin: BigNumber): void;
    _getInner(): BigNumber;
    private setMode;
    /**
     * @name toNumber
     */
    toNumber(dp?: number, rm?: ROUND_MODE): number;
    /**
     * @name toStirng
     */
    toString(dp?: number, rm?: ROUND_MODE): string;
    /**
     * @name toChainData
     */
    toChainData(): string;
    /**
     * @name trunc
     */
    trunc(): FixedPointNumber;
    /**
     * @name frac
     */
    frac(): FixedPointNumber;
    private alignPrecision;
    /**
     * @name setPrecision
     * @description change the precision and modify the inner
     */
    setPrecision(precision: number): void;
    /**
     * @name forceSetPrecision
     * @description force change the precision
     */
    forceSetPrecision(precision: number): void;
    /**
     * @name getPrecision
     * @description get the precision
     */
    getPrecision(): number;
    /**
     * @name abs
     * @description return a FixedPointNumber whose inner value is the absolute value
     */
    abs(): FixedPointNumber;
    /**
     * @name plus
     * @description return a FixedPointNumber whose value is origin value plus right value
     */
    plus(right: FixedPointNumber): FixedPointNumber;
    /**
     * @name minus
     * @description return a FixedPointNumber whose value is origin value minus right value
     */
    minus(right: FixedPointNumber): FixedPointNumber;
    /**
     * @name times
     * @description return a FixedPointNumber whose value is origin value times right value
     */
    times(right: FixedPointNumber): FixedPointNumber;
    /**
     * @name div
     * @description return a FixedPointNumber whose value is origin value div right value
     */
    div(right: FixedPointNumber): FixedPointNumber;
    /**
     * @name reciprocal
     */
    reciprocal(): FixedPointNumber;
    /**
     * @name isGreaterThan
     */
    isGreaterThan: (right: FixedPointNumber) => boolean;
    /**
     * @name isGreaterThanOrEqualTo
     */
    isGreaterThanOrEqualTo: (right: FixedPointNumber) => boolean;
    /**
     * @name isLessThan
     */
    isLessThan: (right: FixedPointNumber) => boolean;
    /**
     * @name isLessOrEqualTo
     */
    isLessOrEqualTo: (right: FixedPointNumber) => boolean;
    /**
     * @name isEqualTo
     */
    isEqualTo: (right: FixedPointNumber) => boolean;
    /**
     * @name isZero
     */
    isZero: () => boolean;
    /**
     * @name isNaN
     */
    isNaN: () => boolean;
    /**
     * @name isFinaite
     */
    isFinaite: () => boolean;
    /**
     * @name isNegative
     */
    isNegative: () => boolean;
    /**
     * @name isPositive
     */
    isPositive: () => boolean;
    /**
     * @name clone
     */
    clone(): FixedPointNumber;
    /**
     * @name min
     */
    min(...targets: FixedPointNumber[]): FixedPointNumber;
    /**
     * @name max
     */
    max(...targets: FixedPointNumber[]): FixedPointNumber;
    add: (right: FixedPointNumber) => FixedPointNumber;
    sub: (right: FixedPointNumber) => FixedPointNumber;
    mul: (right: FixedPointNumber) => FixedPointNumber;
    lt: (right: FixedPointNumber) => boolean;
    gt: (right: FixedPointNumber) => boolean;
    lte: (right: FixedPointNumber) => boolean;
    gte: (right: FixedPointNumber) => boolean;
    eq: (right: FixedPointNumber) => boolean;
    static ZERO: FixedPointNumber;
    static ONE: FixedPointNumber;
    static TWO: FixedPointNumber;
    static THREE: FixedPointNumber;
    static FOUR: FixedPointNumber;
    static FIVE: FixedPointNumber;
    static SIX: FixedPointNumber;
    static TEN: FixedPointNumber;
}
