import BigNumber from 'bignumber.js';

// generate function from BN class
function genFnFromBigNumber<T extends keyof BigNumber, U extends boolean> (fn: T, noRight: U):
BigNumber[typeof fn] extends (...params: any) => any ?
  (typeof noRight) extends true ?
    (() => ReturnType<BigNumber[typeof fn] >) : ((right: FixedPointNumber) => ReturnType<BigNumber[typeof fn]>)
  : () => any {
  if (noRight) {
    return function (): number {
      /* eslint-disable-next-line @typescript-eslint/ban-ts-ignore */
      // @ts-ignore
      return this.inner[fn]();
    } as any;
  }

  return function (right: FixedPointNumber) {
    /* eslint-disable-next-line @typescript-eslint/ban-ts-ignore */
    // @ts-ignore
    this.alignPrecision(right);

    /* eslint-disable-next-line @typescript-eslint/ban-ts-ignore */
    // @ts-ignore
    return this.inner[fn](right._getInner());
  } as any;
}

const BN = BigNumber.clone();

export class FixedPointNumber {
  private precision!: number;
  private inner: BigNumber;

  constructor (origin: number | string, precision = 18) {
    if (typeof origin !== 'number' && typeof origin !== 'string') throw new Error('FixedPointNumber constructor should use number or string');

    this.precision = precision;
    this.inner = new BN(origin).shiftedBy(this.precision);
  }

  /**
   * @name fromRational
   * @description constructor form inner
   */
  public static fromRational (numerator: number | string | FixedPointNumber, denominator: number | string | FixedPointNumber, precision = 18): FixedPointNumber {
    const _numerator = (numerator instanceof FixedPointNumber) ? numerator._getInner() : new BN(numerator);
    const _denominator = (denominator instanceof FixedPointNumber) ? denominator._getInner() : new BN(denominator);
    const inner = _numerator.times(10 ** precision).div(_denominator);
    const temp = new FixedPointNumber(0, precision);

    temp._setInner(inner);

    return temp;
  }

  /**
   * @name fromInner
   * @description constructor form inner
   */
  public static fromInner (origin: number | string, precision = 18): FixedPointNumber {
    const inner = new BN(origin);
    const temp = new FixedPointNumber(0, precision);

    temp._setInner(inner);

    return temp;
  }

  /**
   * @name _fromBN
   * @description constructor from BN
   */
  public static _fromBN (origin: BigNumber, precision = 18): FixedPointNumber {
    const temp = new FixedPointNumber(0, precision);

    temp._setInner(origin);

    return temp;
  }

  // set inner directly
  public _setInner (origin: BigNumber): void {
    this.inner = origin;
  }

  // get inner
  public _getInner (): BigNumber {
    return this.inner;
  }

  private setMode (dp = 0, rm = 3): void {
    BN.config({
      DECIMAL_PLACES: dp,
      ROUNDING_MODE: rm as any,
      EXPONENTIAL_AT: [-100, 100]
    });
  }

  /**
   * @name toNumber
   */
  public toNumber (dp = 8, rm = 3): number {
    this.setMode();
    return this.inner.shiftedBy(-this.precision).dp(dp, rm as any).toNumber();
  }

  /**
   * @name toStirng
   */
  public toString (dp = 0, rm = 3): string {
    this.setMode(dp, rm);

    return this.inner.shiftedBy(-this.precision).toString();
  }

  /**
   * @name toChainData
   */
  public toChainData (): string {
    return this.inner.toFixed(0, 3);
  }

  /**
   * @name trunc
   */
  public trunc (): FixedPointNumber {
    this.setMode();

    const DIV = 10 ** this.precision;
    const inner = this._getInner().abs().div(DIV).dp(0, 3).times(DIV);

    if (this.isNegative()) {
      return FixedPointNumber._fromBN(inner.negated());
    } else {
      return FixedPointNumber._fromBN(inner);
    }
  }

  /**
   * @name frac
   */
  public frac (): FixedPointNumber {
    const integer = this.trunc();

    const fractional = this.minus(integer);

    if (integer.isZero()) {
      return fractional;
    } else {
      return fractional.abs();
    }
  }

  // set b's precision to this.precision
  private alignPrecision (b: FixedPointNumber): void {
    if (this.precision !== b.precision) {
      b.setPrecision(this.precision);
    }
  }

  /**
   * @name setPrecision
   * @description change the precision and modify the inner
   */
  public setPrecision (precision: number): void {
    const oldPrecision = this.precision;

    this.precision = precision;

    // formula: new inner = old inner / old precision * new precision
    this._setInner(this.inner.shiftedBy(this.precision - oldPrecision));
  }

  /**
   * @name getPrecision
   * @description get the precision
   */
  public getPrecision (): number {
    return this.precision;
  }

  /**
   * @name abs
   * @description return a FixedPointNumber whose inner value is the absolute value
   */
  public abs (): FixedPointNumber {
    return FixedPointNumber._fromBN(this.inner.abs(), this.precision);
  }

  /**
   * @name plus
   * @description return a FixedPointNumber whose value is origin value plus right value
   */
  public plus (right: FixedPointNumber): FixedPointNumber {
    this.alignPrecision(right);
    this.setMode();

    return FixedPointNumber._fromBN(this.inner.plus(right.inner), this.precision);
  }

  /**
   * @name minus
   * @description return a FixedPointNumber whose value is origin value minus right value
   */
  public minus (right: FixedPointNumber): FixedPointNumber {
    this.alignPrecision(right);
    this.setMode();

    return FixedPointNumber._fromBN(this.inner.minus(right.inner), this.precision);
  }

  /**
   * @name times
   * @description return a FixedPointNumber whose value is origin value times right value
   */
  public times (right: FixedPointNumber): FixedPointNumber {
    this.alignPrecision(right);
    this.setMode();

    return FixedPointNumber._fromBN(this.inner.times(right.inner).shiftedBy(-this.precision), this.precision);
  }

  /**
   * @name div
   * @description return a FixedPointNumber whose value is origin value div right value
   */
  public div (right: FixedPointNumber): FixedPointNumber {
    this.alignPrecision(right);
    this.setMode();

    return FixedPointNumber._fromBN(
      this.inner.shiftedBy(this.precision).div(right.inner), this.precision
    );
  }

  /**
   * @name reciprocal
   */
  public reciprocal (): FixedPointNumber {
    return FixedPointNumber.ONE.div(this);
  }

  /**
   * @name isGreaterThan
   */
  public isGreaterThan = genFnFromBigNumber('isGreaterThan', false).bind(this);

  /**
   * @name isGreaterThanOrEqualTo
   */
  public isGreaterThanOrEqualTo = genFnFromBigNumber('isGreaterThanOrEqualTo', false).bind(this);

  /**
   * @name isLessThan
   */
  public isLessThan = genFnFromBigNumber('isLessThan', false).bind(this);

  /**
   * @name isLessOrEqualTo
   */
  public isLessOrEqualTo = genFnFromBigNumber('isLessThanOrEqualTo', false).bind(this);

  /**
   * @name isEqualTo
   */
  public isEqualTo = genFnFromBigNumber('isEqualTo', false).bind(this);

  /**
   * @name isZero
   */
  public isZero = genFnFromBigNumber('isZero', true).bind(this);

  /**
   * @name isNaN
   */
  public isNaN = genFnFromBigNumber('isNaN', true).bind(this);

  /**
   * @name isFinaite
   */
  public isFinaite = genFnFromBigNumber('isFinite', true).bind(this);

  /**
   * @name isNegative
   */
  public isNegative = genFnFromBigNumber('isNegative', true).bind(this);

  /**
   * @name isPositive
   */
  public isPositive = genFnFromBigNumber('isPositive', true).bind(this);

  /**
   * @name min
   */
  public min (...targets: FixedPointNumber[]): FixedPointNumber {
    targets.forEach(item => this.alignPrecision(item));

    return FixedPointNumber._fromBN(
      BigNumber.min.apply(null, [this.inner, ...targets.map((i) => i._getInner())]),
      this.precision
    );
  }

  /**
   * @name max
   */
  public max (...targets: FixedPointNumber[]): FixedPointNumber {
    targets.forEach(item => this.alignPrecision(item));

    return FixedPointNumber._fromBN(
      BigNumber.max.apply(null, [this.inner, ...targets.map((i) => i._getInner())]),
      this.precision
    );
  }

  static ZERO = new FixedPointNumber(0);
  static ONE = new FixedPointNumber(1);
  static TWO = new FixedPointNumber(2);
  static THREE = new FixedPointNumber(3);
  static FOUR = new FixedPointNumber(3);
  static FIVE = new FixedPointNumber(5);
  static SIX = new FixedPointNumber(6);
  static TEN = new FixedPointNumber(10);
}
