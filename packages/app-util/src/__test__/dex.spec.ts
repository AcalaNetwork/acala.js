import * as dex from '../dex';
import { Fixed18 } from '../fixed-18';

describe('calcault target amount', () => {
  const fee = Fixed18.fromRational(1, 100);
  test('swap target amount should work', () => {
    const supplyPool = 10000;
    const targetPool = 10000;
    const supply = 10000;
    const received = 4950;
    expect(dex.calcSwapTargetAmount(supply, supplyPool, targetPool, fee)).toEqual(received);
  });

  test('should return 0 when target pool is 1', () => {
    const supplyPool = 10000;
    const targetPool = 1;
    const supply = 10000;
    const received = 0;
    expect(dex.calcSwapTargetAmount(supply, supplyPool, targetPool, fee)).toEqual(received);
  });

  test('should return 0 when supply pool is too big', () => {
    const supplyPool = 100;
    const targetPool = 100;
    const supply = 9901;
    const received = 0;
    expect(dex.calcSwapTargetAmount(supply, supplyPool, targetPool, fee)).toEqual(received);
  });

  test('should no fees when target amount is too small', () => {
    const supplyPool = 100;
    const targetPool = 100;
    const supply = 9900;
    const received = 99;
    expect(dex.calcSwapTargetAmount(supply, supplyPool, targetPool, fee)).toEqual(received);
  });
});

describe('calcult supply amount', () => {
  const fee = Fixed18.fromRational(1, 100);

  test('swap supply amount should work', () => {
    const supplyPool = 10000;
    const targetPool = 10000;
    const target = 4950;
    const received = 10000;
    expect(dex.calcSwapSupplyAmount(target, supplyPool, targetPool, fee)).toEqual(received);
  });

  test('should return 0 when target amount is 0', () => {
    const supplyPool = 10000;
    const targetPool = 10000;
    const target = 0;
    const received = 0;
    expect(dex.calcSwapSupplyAmount(target, supplyPool, targetPool, fee)).toEqual(received);
  });

  test('should return 0 when target amount is too big', () => {
    const supplyPool = 10000;
    const targetPool = 10000;
    const target = 10000;
    const received = 0;
    expect(dex.calcSwapSupplyAmount(target, supplyPool, targetPool, fee)).toEqual(received);
  });
});
