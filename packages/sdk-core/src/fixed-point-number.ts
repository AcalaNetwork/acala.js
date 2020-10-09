import BigNumber from 'bignumber.js';

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

BN.config({
  DECIMAL_PLACES: 0,
  EXPONENTIAL_AT: [-100, 100]
});

export class FixedPointNumber {
  private precision!: number;
  private inner: BigNumber;

  constructor (origin: number | string, precision = 18) {
    if (typeof origin !== 'number' && typeof origin !== 'string') throw new Error('FixedPointNumber constructor should use number or string');

    this.precision = precision;
    this.inner = new BN(origin).shiftedBy(this.precision);
  }

  // construct from inner
  public static fromInner (origin: number | string, precision = 18): FixedPointNumber {
    const inner = new BN(origin);
    const temp = new FixedPointNumber(0, precision);

    temp._setInner(inner);

    return temp;
  }

  // construct from BN
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

  public toNumber (): number {
    return this.inner.shiftedBy(-this.precision).toNumber();
  }

  public toString (): string {
    return this.inner.shiftedBy(-this.precision).toString();
  }

  // set b's precision equal to precision
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

    return FixedPointNumber._fromBN(this.inner.plus(right.inner), this.precision);
  }

  /**
   * @name minus
   * @description return a FixedPointNumber whose value is origin value minus right value
   */
  public minus (right: FixedPointNumber): FixedPointNumber {
    this.alignPrecision(right);

    return FixedPointNumber._fromBN(this.inner.minus(right.inner), this.precision);
  }

  /**
   * @name times
   * @description return a FixedPointNumber whose value is origin value times right value
   */
  public times (right: FixedPointNumber): FixedPointNumber {
    this.alignPrecision(right);

    return FixedPointNumber._fromBN(this.inner.times(right.inner).shiftedBy(-this.precision), this.precision);
  }

  /**
   * @name div
   * @description return a FixedPointNumber whose value is origin value div right value
   */
  public div (right: FixedPointNumber): FixedPointNumber {
    this.alignPrecision(right);

    return FixedPointNumber._fromBN(this.inner.div(right.inner).shiftedBy(this.precision), this.precision);
  }

  public isGreaterThan = genFnFromBigNumber('isGreaterThan', false).bind(this);

  public isGreaterThanOrEqualTo = genFnFromBigNumber('isGreaterThanOrEqualTo', false).bind(this);

  public isLessThan = genFnFromBigNumber('isLessThan', false).bind(this);

  public isLessOrEqualTo = genFnFromBigNumber('isLessThanOrEqualTo', false).bind(this);

  public isEqualTo = genFnFromBigNumber('isEqualTo', false).bind(this);

  public isZero = genFnFromBigNumber('isZero', true).bind(this);

  public isNaN = genFnFromBigNumber('isNaN', true).bind(this);

  public isNegative = genFnFromBigNumber('isNegative', true).bind(this);

  public isPositive = genFnFromBigNumber('isPositive', true).bind(this);
}
