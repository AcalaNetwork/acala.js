import BigNumber from 'bignumber.js';

type NumLike = number | string;
export type ROUND_MODE = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export class FixedU128 {
  public inner: BigNumber;

  static PRECISION = 10 ** 18;

  static ZERO = FixedU128.fromNatural(0);

  constructor (origin: NumLike | BigNumber) {
    if (origin instanceof BigNumber) {
      this.inner = origin;
    } else {
      this.inner = new BigNumber(origin);
    }
    return this;
  }

  public toString (dp?: number, rm?: ROUND_MODE): string {
    let result = this.inner.div(FixedU128.PRECISION);
    if (dp && rm) {
      result = result.decimalPlaces(dp, rm);
    }
    return result.toString();
  }

  public innerToString (): string {
    if (this.inner.isNaN()) {
      return FixedU128.ZERO.inner.toFixed();
    }
    return this.inner.toFixed().split('.')[0];
  }

  public toNumber (dp?: number, rm?: ROUND_MODE): number {
    let result = this.inner.div(FixedU128.PRECISION);
    if (dp && rm) {
      result = result.decimalPlaces(dp, rm);
    }
    return result.toNumber();
  }

  static fromNatural (n: NumLike): FixedU128 {
    return new FixedU128(new BigNumber(n).times(FixedU128.PRECISION));
  }

  static fromParts (parts: NumLike): FixedU128 {
    return new FixedU128(parts);
  }

  static fromRational (n: NumLike, d: NumLike): FixedU128 {
    const _n = new BigNumber(n);
    const _d = new BigNumber(d);

    return new FixedU128(_n.times(FixedU128.PRECISION).div(_d));
  }

  public add (n: FixedU128): FixedU128 {
    return new FixedU128(this.inner.plus(n.inner));
  }

  public sub (n: FixedU128): FixedU128 {
    return new FixedU128(this.inner.minus(n.inner));
  }

  public mul (n: FixedU128): FixedU128 {
    return new FixedU128(this.inner.times(n.inner).div(FixedU128.PRECISION));
  }

  public div (n: FixedU128): FixedU128 {
    return new FixedU128(this.inner.div(n.inner).times(FixedU128.PRECISION));
  }

  public decimalPlaces (dp: number, rm: ROUND_MODE): FixedU128 {
    return new FixedU128(this.inner.decimalPlaces(dp, rm));
  }

  public isLessThan (n: FixedU128): boolean {
    return this.inner.isLessThan(n.inner);
  }

  public isGreaterThan (n: FixedU128): boolean {
    return this.inner.isGreaterThan(n.inner);
  }

  public isEqualTo (n: FixedU128): boolean {
    return this.inner.isEqualTo(n.inner);
  }

  public negated (): FixedU128 {
    return new FixedU128(this.inner.negated());
  }

  public isZero (): boolean {
    return this.inner ? this.inner.isZero() : false;
  }

  public isNaN (): boolean {
    return this.inner ? this.inner.isNaN() : true;
  }
}
