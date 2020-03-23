import BigNumber from 'bignumber.js';

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
 * @class FixedU128
 * @description 18 decimals mathematical operation support
 */
export class FixedU128 {
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
  static ZERO = FixedU128.fromNatural(0);

  /**
   * @description constructor of FixedU128
   * @param {(number | string | BigNumber)} origin - the origin number
   */
  constructor (origin: NumLike | BigNumber) {
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
  public getInner (): BigNumber {
    return this.inner;
  }

  /**
   * @name toString
   * @description format real number(division by precision) to string
   * @param {number} [dp=5] - decimal places deafult is 5
   * @param {number} [rm=3] - round modle, default is ROUND_FLOOR
   */
  public toString (dp: number = 5, rm: ROUND_MODE = 3): string {
    let result = this.inner.div(FixedU128.PRECISION);
    result = result.decimalPlaces(dp, rm);
    return result.toString();
  }

  /**
   * @name innerToString
   * @description format inner BigNumber value to string
   */
  public innerToString (): string {
    if (this.isNaN()) {
      return FixedU128.ZERO.innerToString();
    }
    return this.inner.toFixed(0);
  }

  /**
   * @name toNumber
   * @description format real number(division by precision) to number
   * @param {number} [dp=5] - decimal places deafult is 5
   * @param {number} [rm=3] - round modle, default is ROUND_FLOOR
   */
  public toNumber (dp: number = 5, rm: ROUND_MODE = 3): number {
    let result = this.inner.div(FixedU128.PRECISION);
    result = result.decimalPlaces(dp, rm);
    return result.toNumber();
  }

  /**
   * @name fromNatural
   * @description get FixedU128 from real number, will multiply by precision
   * @param {(string | number)} target - target number
   */
  static fromNatural (target: NumLike): FixedU128 {
    return new FixedU128(new BigNumber(target).times(FixedU128.PRECISION));
  }

  /**
   * @name fromParts
   * @description get FixedU128 from real number, will not multiply by precision
   * @param {(string | number)} parts - parts number
   */
  static fromParts (parts: NumLike): FixedU128 {
    return new FixedU128(parts);
  }

  /**
   * @name formRational
   * @param {(string | number)} n - numerator
   * @param {(string | number)} d - denominator
   */
  static fromRational (n: NumLike, d: NumLike): FixedU128 {
    const _n = new BigNumber(n);
    const _d = new BigNumber(d);
    return new FixedU128(_n.times(FixedU128.PRECISION).div(_d));
  }

  /**
   * @name add
   * @description fixed-point addition operator
   * @param {FixedU128} target - target number
   */
  public add (target: FixedU128): FixedU128 {
    return new FixedU128(this.inner.plus(target.inner));
  }

  /**
   * @name sub
   * @description fixed-point subtraction operator
   * @param {FixedU128} target - target number
   */
  public sub (target: FixedU128): FixedU128 {
    return new FixedU128(this.inner.minus(target.inner));
  }

  /**
   * @name mul
   * @description fixed-point multiplication operator
   * @param {FixedU128} target - target number
   */
  public mul (target: FixedU128): FixedU128 {
    return new FixedU128(this.inner.times(target.inner).div(FixedU128.PRECISION));
  }

  /**
   * @name div
   * @description fixed-point divided operator
   * @param {FixedU128} target - target number
   */
  public div (target: FixedU128): FixedU128 {
    return new FixedU128(this.inner.div(target.inner).times(FixedU128.PRECISION));
  }

  /**
   * @name decimalPlaces
   * @description get rounded value by Decimal Places and round modle
   * @param {number} [dp=5] - decimal places deafult is 5
   * @param {number} [rm=3] - round modle, default is ROUND_FLOOR
   */
  public decimalPlaces (dp: number = 5, rm: ROUND_MODE = 3): FixedU128 {
    return new FixedU128(this.inner.decimalPlaces(dp, rm));
  }

  /**
   * @name isLessThan
   * @description return true if the value is less than the target value
   * @param {FixedU128} target  - target number
   */
  public isLessThan (target: FixedU128): boolean {
    return this.inner.isLessThan(target.inner);
  }

  /**
   * @name isGreaterThan
   * @description return true if the value is greater than the target value
   * @param {FixedU128} target - target number 
   */
  public isGreaterThan (target: FixedU128): boolean {
    return this.inner.isGreaterThan(target.inner);
  }

  /**
   * @name isEqualTo
   * @description return true if the values are equal
   * @param {FixedU128} target - target number
   */
  public isEqualTo (target: FixedU128): boolean {
    return this.inner.isEqualTo(target.inner);
  }

  /**
   * @name max
   * @description return the max value
   * @param {...FixedU128} target - target numbers
   */
  public max (...targets: FixedU128[]): FixedU128 {
    return new FixedU128(BigNumber.max.apply(null, [this.inner, ...targets.map(i => i.inner)]));
  }

  /**
   * @name min
   * @description return the min value
   * @param {...FixedU128} target - target numbers
   */
  public min (...targets: FixedU128[]): FixedU128 {
    return new FixedU128(BigNumber.min.apply(null, [this.inner, ...targets.map(i => i.inner)]));
  }

  /**
   * @name nagated
   * @description return the nageted value
   */
  public negated (): FixedU128 {
    return new FixedU128(this.inner.negated());
  }

  /**
   * @name isZero
   * @description return true if the value of inner is 0
   */
  public isZero (): boolean {
    return this.inner ? this.inner.isZero() : false;
  }

  /**
   * @name isNaN
   * @description return true if the value of inner is NaN
   */
  public isNaN (): boolean {
    return this.inner ? this.inner.isNaN() : true;
  }

  /**
   * @name isFinity
   * @description return true if the value of inner is finity, only return false when the value is NaN, -Infinity or Infinity.
   */
  public isFinity(): boolean {
    return this.inner ? this.inner.isFinite() : false;
  }
}
