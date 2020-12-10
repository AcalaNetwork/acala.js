import { FixedPointNumber } from './fixed-point-number';

describe('fixed point number constructor should worker', () => {
  test('toString & toNumber', () => {
    const a = FixedPointNumber.fromInner('123456789123456789123456789');
    const b = FixedPointNumber.fromInner('123456789123456781123456789');

    expect(a.toString()).toEqual('123456789.123456789123456789');
    expect(a.toNumber()).toEqual(123456789.12345678);
    expect(b.toNumber()).toEqual(123456789.12345678);
  });
  test('construct from number', () => {
    const a = new FixedPointNumber(1);
    const b = new FixedPointNumber(1, 2);
    const c = FixedPointNumber.fromInner(1e18, 18);

    expect(a._getInner().toString()).toEqual('1000000000000000000');
    expect(a.toString()).toEqual('1');
    expect(b._getInner().toString()).toEqual('100');
    expect(b.toString()).toEqual('1');
    expect(c.toNumber()).toEqual(1);
    expect(c._getInner().toNumber() + 1).toEqual(1e18 + 1);
    expect(FixedPointNumber.fromInner(c._getInner().toNumber() + 1).toNumber(18)).toEqual(1 + 1e-18);
  });

  test('construct from inner', () => {
    const a = FixedPointNumber.fromInner(1000000, 6);

    expect(a.toNumber()).toEqual(1);
  });

  test('no scientific natation', () => {
    const a = new FixedPointNumber(1, 99);
    const b = new FixedPointNumber(1e-99, 1);

    expect(a._getInner().toString()).toEqual(
      '1000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000'
    );
    expect(b._getInner().toString()).toEqual(
      '0.00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001'
    );
  });

  test('setPrecision', () => {
    const a = new FixedPointNumber(1000000, 6);
    const b = new FixedPointNumber(1000000, 6);

    b.setPrecision(12);

    expect(a.isEqualTo(b)).toEqual(true);
  });
});

describe('fixed point number calculation should worker', () => {
  test('get the absolute value', () => {
    const a = new FixedPointNumber(-1);
    const b = new FixedPointNumber(1);

    expect(a.abs().toNumber()).toEqual(1);
    expect(b.abs().toNumber()).toEqual(1);
  });

  test('plus', () => {
    const a = new FixedPointNumber(100);
    const b = new FixedPointNumber(100);

    const c = new FixedPointNumber(100, 18);
    const d = new FixedPointNumber(100, 16);

    const e = FixedPointNumber.fromInner(100, 2);
    const f = FixedPointNumber.fromInner(100, 4);

    expect(a.plus(b).toNumber()).toEqual(200);
    expect(c.plus(d).toNumber()).toEqual(200);

    expect(e.plus(f).toNumber()).toEqual(1.01);
  });

  test('minus', () => {
    const a = new FixedPointNumber(200);
    const b = new FixedPointNumber(100);

    const c = new FixedPointNumber(200, 18);
    const d = new FixedPointNumber(100, 16);

    const e = FixedPointNumber.fromInner(100, 2);
    const f = FixedPointNumber.fromInner(100, 4);

    expect(a.minus(b).toNumber()).toEqual(100);
    expect(c.minus(d).toNumber()).toEqual(100);

    expect(e.minus(f).toNumber()).toEqual(0.99);
  });

  test('times', () => {
    const a = new FixedPointNumber(100);
    const b = new FixedPointNumber(100);

    const c = new FixedPointNumber(100, 18);
    const d = new FixedPointNumber(100, 16);

    const e = FixedPointNumber.fromInner(100, 2);
    const f = FixedPointNumber.fromInner(100, 4);

    expect(a.times(b).toNumber()).toEqual(10000);
    expect(c.times(d).toNumber()).toEqual(10000);

    expect(e.times(f).toNumber()).toEqual(0.01);
  });

  test('div', () => {
    const a = new FixedPointNumber(200);
    const b = new FixedPointNumber(100);

    const c = new FixedPointNumber(200, 18);
    const d = new FixedPointNumber(100, 16);

    const e = FixedPointNumber.fromInner(100, 2);
    const f = FixedPointNumber.fromInner(100, 4);

    const n = new FixedPointNumber(100, 2);
    const m = new FixedPointNumber(3, 2);

    expect(a.div(b).toNumber()).toEqual(2);
    expect(c.div(d).toNumber()).toEqual(2);

    expect(e.div(f).toNumber()).toEqual(100);

    expect(n.div(m).toNumber(2)).toEqual(33.33);
  });
});

describe('fixed point number compare should worker', () => {
  test('isZero', () => {
    const a = new FixedPointNumber(0);
    const b = new FixedPointNumber(1);

    expect(a.isZero()).toEqual(true);
    expect(b.isZero()).toEqual(false);
  });

  test('isNaN', () => {
    const a = new FixedPointNumber(NaN);
    const b = new FixedPointNumber(0);
    const c = new FixedPointNumber(0);
    const d = new FixedPointNumber(1);

    expect(a.isNaN()).toEqual(true);
    expect(b.div(c).isNaN()).toEqual(true);
    expect(d.isNaN()).toEqual(false);
  });

  test('isNegative', () => {
    const a = new FixedPointNumber(NaN);
    const b = new FixedPointNumber(1);
    const c = new FixedPointNumber(-1);

    expect(a.isNegative()).toEqual(false);
    expect(b.isNegative()).toEqual(false);
    expect(c.isNegative()).toEqual(true);
  });

  test('isPositive', () => {
    const a = new FixedPointNumber(NaN);
    const b = new FixedPointNumber(1);
    const c = new FixedPointNumber(-1);

    expect(a.isPositive()).toEqual(false);
    expect(b.isPositive()).toEqual(true);
    expect(c.isPositive()).toEqual(false);
  });

  test('isGreaterThan', () => {
    const a = new FixedPointNumber(2);
    const b = new FixedPointNumber(1);
    const c = new FixedPointNumber(-1);

    expect(a.isGreaterThan(b)).toEqual(true);
    expect(a.isGreaterThan(c)).toEqual(true);
    expect(b.isGreaterThan(a)).toEqual(false);
    expect(c.isGreaterThan(a)).toEqual(false);
  });

  test('isGreaterOrEqualThan', () => {
    const a = new FixedPointNumber(2);
    const b = new FixedPointNumber(1);
    const c = new FixedPointNumber(2);

    expect(a.isGreaterThanOrEqualTo(b)).toEqual(true);
    expect(a.isGreaterThanOrEqualTo(c)).toEqual(true);
  });

  test('isLessThan', () => {
    const a = new FixedPointNumber(2);
    const b = new FixedPointNumber(10);

    expect(a.isLessThan(b)).toEqual(true);
    expect(b.isLessThan(a)).toEqual(false);
  });

  test('isLessThan', () => {
    const a = new FixedPointNumber(2);
    const b = new FixedPointNumber(10);
    const c = new FixedPointNumber(2);

    expect(b.isLessOrEqualTo(a)).toEqual(false);
    expect(a.isLessOrEqualTo(b)).toEqual(true);
    expect(a.isLessOrEqualTo(c)).toEqual(true);
  });

  test('isEqualTo', () => {
    const a = new FixedPointNumber(2, 2);
    const b = new FixedPointNumber(2, 3);

    expect(a.isEqualTo(b)).toEqual(true);
  });

  test('min max', () => {
    const a = new FixedPointNumber(2, 2);
    const b = new FixedPointNumber(2, 3);
    const c = new FixedPointNumber(2, 18);
    const d = new FixedPointNumber(4, 3);

    expect(a.max(b).toString()).toEqual(b.toString());
    expect(a.min(b).toString()).toEqual(b.toString());
    expect(a.max(c).toString()).toEqual(c.toString());
    expect(a.min(c).toString()).toEqual(c.toString());
    expect(a.max(d).toString()).toEqual(d.toString());
    expect(a.min(d).toString()).toEqual(a.toString());
  });

  test('trunc frac', () => {
    const a = FixedPointNumber.fromRational(5, 2);
    const a1 = a.trunc();
    const a2 = a.frac();

    expect(a1.plus(a2).toString()).toEqual(a.toString());

    const b = FixedPointNumber.fromRational(5, 2).frac().times(FixedPointNumber.TEN);

    expect(b.toString()).toEqual(FixedPointNumber.FIVE.toString());

    const c = FixedPointNumber.fromRational(-5, 2);
    const c1 = c.trunc();
    const c2 = c.frac();

    console.log(c1.toString(), c2.toString());

    expect(c1.minus(c2).toString()).toEqual(c.toString());
    expect(c2.times(FixedPointNumber.TEN).toString()).toEqual(FixedPointNumber.FIVE.toString());

    const d = FixedPointNumber.fromRational(-1, 2).frac().times(FixedPointNumber.TEN);
    expect(d.toString()).toEqual(FixedPointNumber.ZERO.minus(FixedPointNumber.FIVE).toString());
  });
});
