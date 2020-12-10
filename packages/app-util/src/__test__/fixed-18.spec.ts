import { Fixed18 } from '../fixed-18';
import BigNumber from 'bignumber.js';

describe('fixed 128 constructor', () => {
  test('constructor should work', () => {
    const a = new Fixed18(1);
    const b = new Fixed18('1');
    const c = new Fixed18(new BigNumber(1));
    expect(a).toEqual(b);
    expect(a).toEqual(c);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const d = new Fixed18(); // test for no params
    expect(d).toEqual(Fixed18.ZERO);
  });
  test('from parts should work', () => {
    const a = Fixed18.fromParts(1);
    expect(a.getInner().toNumber()).toEqual(1);
  });
  test('from natural should work', () => {
    const a = Fixed18.fromNatural(1);
    expect(a.getInner().toNumber()).toEqual(1e18);
  });
  test('from rational should work', () => {
    const a = Fixed18.fromRational(10, 2);
    const b = Fixed18.fromRational(100, 20);
    // 0.0000000000000000001 will be 0
    const c = Fixed18.fromRational(1, 10000000000000000000);
    expect(a.toNumber()).toEqual(5);
    expect(a).toEqual(b);
    expect(c).toEqual(Fixed18.ZERO);
  });
});

describe('toFixed should work', () => {
  const a = Fixed18.fromNatural(0.123456789);
  const b = Fixed18.fromNatural(0.00000000001);

  expect(a.toFixed(6)).toEqual('0.123456');
  expect(a.toFixed(9)).toEqual('0.123456789');
  expect(b.toFixed(11)).toEqual('0.00000000001');
  expect(b.toFixed(20)).toEqual('0.00000000001');
  expect(b.toString(11)).toEqual('1e-11');
});

describe('fixed 128 operation', () => {
  const a = Fixed18.fromNatural(10);
  const b = Fixed18.fromNatural(20);
  test('add should work', () => {
    const c = Fixed18.fromNatural(30);
    expect(a.add(b)).toEqual(c);
  });
  test('sub should work', () => {
    const c = Fixed18.fromNatural(-10);
    expect(a.sub(b)).toEqual(c);
  });
  test('mul should work', () => {
    const c = Fixed18.fromNatural(200);
    expect(a.mul(b)).toEqual(c);
  });
  test('div should work', () => {
    const c = Fixed18.fromRational(1, 2);
    expect(a.div(b)).toEqual(c);
  });
  test('div with zero should be Infinity', () => {
    const b = Fixed18.fromNatural(0);
    const c = new Fixed18(Infinity);
    expect(a.div(b)).toEqual(c);
  });
  test('negated should work', () => {
    const c = Fixed18.fromNatural(-10);
    expect(a.negated()).toEqual(c);
  });
});

describe('fixed 128 compare should work', () => {
  const a = Fixed18.fromNatural(10);
  const b = Fixed18.fromNatural(20);
  test('lessThan should work', () => {
    expect(a.isLessThan(b)).toEqual(true);
  });
  test('greaterThan should work', () => {
    expect(a.isGreaterThan(b)).toEqual(false);
  });
  test('isEqual should work', () => {
    const c = Fixed18.fromNatural(10);
    expect(a.isEqualTo(b)).toEqual(false);
    expect(a.isEqualTo(c)).toEqual(true);
  });
  test('max should work', () => {
    expect(a.max(b)).toEqual(b);
    expect(a.min(b)).toEqual(a);
  });
  test('isZero should work', () => {
    const c = Fixed18.ZERO;
    expect(c.isZero()).toEqual(true);
    expect(a.isZero()).toEqual(false);
  });
  test('isInfinite should work', () => {
    const c1 = Fixed18.fromNatural(Infinity);
    const c2 = Fixed18.fromNatural(-Infinity);
    const c3 = Fixed18.fromNatural(NaN);
    expect(c1.isFinity()).toEqual(false);
    expect(c2.isFinity()).toEqual(false);
    expect(c3.isFinity()).toEqual(false);
    expect(a.isFinity()).toEqual(true);
  });
  test('isNaN should work', () => {
    const c = Fixed18.fromNatural(NaN);
    const d = Fixed18.ZERO.div(Fixed18.ZERO);
    expect(a.isNaN()).toEqual(false);
    expect(c.isNaN()).toEqual(true);
    expect(d.isNaN()).toEqual(true);
  });
});

describe('fixed 128 format', () => {
  const a = Fixed18.fromRational(256, 100);
  test('toNumber should work', () => {
    expect(a.toNumber()).toEqual(2.56);
    expect(a.toNumber(1, 2)).toEqual(2.6); // round towards infinity
    expect(a.toNumber(1, 3)).toEqual(2.5); // roound towards -infinity
  });
  test('toString should work', () => {
    expect(a.toString()).toEqual('2.56');
    expect(a.toString(1, 2)).toEqual('2.6'); // round towards infinity
    expect(a.toString(1, 3)).toEqual('2.5'); // round towards -intinity
  });
  test('innerToString should work', () => {
    const b = Fixed18.fromParts(5.5);
    const c1 = Fixed18.fromNatural(NaN);
    const c2 = Fixed18.fromNatural(Infinity);
    expect(a.innerToString()).toEqual('2560000000000000000');
    expect(b.innerToString()).toEqual('5');
    expect(c1.innerToString()).toEqual('0');
    expect(c2.innerToString()).toEqual('0');
  });
});
