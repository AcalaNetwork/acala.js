import BigNumber from 'bignumber.js';
import { Codec } from '@polkadot/types/types';

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

type NumLike = number | string;

/**
 * @class Fixed18
 * @description fixed point mathematical operation support with 18 decimals
 */
export class Fixed18 {
  private inner: BigNumber;

  /**
   * @constant
   * @description precision to 18 decimals
   */
  static PRECISION = 10 ** 18;

  /**
   * @constant
   * @description zero
   */
  static ZERO = Fixed18.fromNatural(0);

  /**
   * @description constructor of Fixed18
   * @param {(number | string | BigNumber)} origin - the origin number
   */
  constructor(origin: NumLike | BigNumber) {
    if (origin instanceof BigNumber) {
      this.inner = origin;
    } else {
      this.inner = new BigNumber(origin || 0);
    }
    return this;
  }

  /**
   * @name getInner
   * @description get the inner BigNumber value
   */
  public getInner(): BigNumber {
    return this.inner;
  }

  /**
   * @name toString
   * @description format real number(division by precision) to string
   * @param {number} [dp=6] - decimal places deafult is 6
   * @param {number} [rm=3] - round modle, default is ROUND_FLOOR
   */
  public toString(dp = 6, rm: ROUND_MODE = 3): string {
    let result = this.inner.div(Fixed18.PRECISION);
    result = result.decimalPlaces(dp, rm);
    return result.toString();
  }

  /**
   * @name toFixed
   * @description format real number string(division by precision) to string
   * @param {number} [dp=6] - decimal places deafult is 6
   * @param {number} [rm=3] - round modle, default is ROUND_FLOOR
   */
  public toFixed(dp = 6, rm: ROUND_MODE = 3): string {
    let result = this.inner.div(Fixed18.PRECISION);
    result = result.decimalPlaces(dp, rm);
    return result.toFixed();
  }

  /**
   * @name innerToString
   * @description format inner BigNumber value to string
   * @param {number} [dp=0] - decimal places deafult is 0
   * @param {number} [rm=3] - round modle, default is ROUND_FLOOR
   */
  public innerToString(dp = 0, rm: ROUND_MODE = 3): string {
    // return 0 if the value is Infinity, -Infinity and NaN
    if (!this.isFinity()) {
      return '0';
    }
    return this.inner.decimalPlaces(dp, rm).toFixed();
  }

  /**
   * @name innerToNumber
   * @description format inner BigNumber value to string
   * @param {number} [dp=0] - decimal places deafult is 0
   * @param {number} [rm=3] - round modle, default is ROUND_FLOOR
   */
  public innerToNumber(dp = 0, rm: ROUND_MODE = 3): number {
    // return 0 if the value is Infinity, -Infinity and NaN
    if (!this.isFinity()) {
      return 0;
    }
    return this.inner.decimalPlaces(dp, rm).toNumber();
  }

  /**
   * @name toNumber
   * @description format real number(division by precision) to number
   * @param {number} [dp=6] - decimal places deafult is 6
   * @param {number} [rm=3] - round modle, default is ROUND_FLOOR
   */
  public toNumber(dp = 6, rm: ROUND_MODE = 3): number {
    let result = this.inner.div(Fixed18.PRECISION);
    result = result.decimalPlaces(dp, rm);
    return result.toNumber();
  }

  /**
   * @name deciminalPlaces
   * @description returns a Fixed18 whose value is the value of this Fixed18 rounded by rounding mode roundingMode to a maximum of decimalPlaces decimal places.
   * @param {number} [dp=18] - decimal places
   * @param {number} [rm=3] - round modle, default is ROUND_FLOOR
   */
  public decimalPlaces(dp = 18, rm: ROUND_MODE = 3): Fixed18 {
    return Fixed18.fromNatural(this.toNumber(dp, rm));
  }

  /**
   * @name fromNatural
   * @description get Fixed18 from real number, will multiply by precision
   * @param {(string | number)} target - target number
   */
  static fromNatural(target: NumLike): Fixed18 {
    return new Fixed18(new BigNumber(target).times(Fixed18.PRECISION));
  }

  /**
   * @name fromParts
   * @description get Fixed18 from real number, will not multiply by precision
   * @param {(string | number)} parts - parts number
   */
  static fromParts(parts: NumLike): Fixed18 {
    return new Fixed18(parts);
  }

  /**
   * @name formRational
   * @param {(string | number)} n - numerator
   * @param {(string | number)} d - denominator
   */
  static fromRational(n: NumLike, d: NumLike): Fixed18 {
    const _n = new BigNumber(n);
    const _d = new BigNumber(d);
    return new Fixed18(_n.times(Fixed18.PRECISION).div(_d).decimalPlaces(0, 3));
  }

  /**
   * @name add
   * @description fixed-point addition operator
   * @param {Fixed18} target - target number
   */
  public add(target: Fixed18): Fixed18 {
    return new Fixed18(this.inner.plus(target.inner).decimalPlaces(0, 3));
  }

  /**
   * @name sub
   * @description fixed-point subtraction operator
   * @param {Fixed18} target - target number
   */
  public sub(target: Fixed18): Fixed18 {
    return new Fixed18(this.inner.minus(target.inner).decimalPlaces(0, 3));
  }

  /**
   * @name mul
   * @description fixed-point multiplication operator
   * @param {Fixed18} target - target number
   */
  public mul(target: Fixed18): Fixed18 {
    const inner = this.inner.times(target.inner).div(Fixed18.PRECISION).decimalPlaces(0, 3);
    return new Fixed18(inner);
  }

  /**
   * @name div
   * @description fixed-point divided operator
   * @param {Fixed18} target - target number
   */
  public div(target: Fixed18): Fixed18 {
    const inner = this.inner.div(target.inner).times(Fixed18.PRECISION).decimalPlaces(0, 3);
    return new Fixed18(inner);
  }

  /**
   * @name isLessThan
   * @description return true if the value is less than the target value
   * @param {Fixed18} target  - target number
   */
  public isLessThan(target: Fixed18): boolean {
    return this.inner.isLessThan(target.inner);
  }

  /**
   * @name isGreaterThan
   * @description return true if the value is greater than the target value
   * @param {Fixed18} target - target number
   */
  public isGreaterThan(target: Fixed18): boolean {
    return this.inner.isGreaterThan(target.inner);
  }

  /**
   * @name isEqualTo
   * @description return true if the values are equal
   * @param {Fixed18} target - target number
   */
  public isEqualTo(target: Fixed18): boolean {
    return this.inner.isEqualTo(target.inner);
  }

  /**
   * @name max
   * @description return the max value
   * @param {...Fixed18} target - target numbers
   */
  public max(...targets: Fixed18[]): Fixed18 {
    return new Fixed18(BigNumber.max.apply(null, [this.inner, ...targets.map((i) => i.inner)]));
  }

  /**
   * @name min
   * @description return the min value
   * @param {...Fixed18} target - target numbers
   */
  public min(...targets: Fixed18[]): Fixed18 {
    return new Fixed18(BigNumber.min.apply(null, [this.inner, ...targets.map((i) => i.inner)]));
  }

  /**
   * @name nagated
   * @description return the nageted value
   */
  public negated(): Fixed18 {
    return new Fixed18(this.inner.negated());
  }

  /**
   * @name isZero
   * @description return true if the value of inner is 0
   */
  public isZero(): boolean {
    return this.inner.isZero();
  }

  /**
   * @name isNaN
   * @description return true if the value of inner is NaN
   */
  public isNaN(): boolean {
    return this.inner.isNaN();
  }

  /**
   * @name isFinity
   * @description return true if the value of inner is finity, only return false when the value is NaN, -Infinity or Infinity.
   */
  public isFinity(): boolean {
    return this.inner.isFinite();
  }
}

// force to Fixed18
export function convertToFixed18(data: Codec | number | Fixed18): Fixed18 {
  if (data instanceof Fixed18) {
    return data;
  } else if (typeof data === 'number') {
    return Fixed18.fromNatural(data);
  }

  if ('toString' in data) {
    return Fixed18.fromParts(data.toString()); // for Codec
  }

  return Fixed18.ZERO;
}
