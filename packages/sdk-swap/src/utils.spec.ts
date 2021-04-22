import { getSupplyAmount, getTargetAmount } from './utils';
import { FixedPointNumber } from '@acala-network/sdk-core';

describe('test getSupplyAmount, getTargetAmount', () => {
  const fee = {
    numerator: FixedPointNumber.fromInner(1, 0),
    denominator: FixedPointNumber.fromInner(100, 0)
  };

  test('getSupplyAmount should work', () => {
    expect(
      getSupplyAmount(
        FixedPointNumber.fromInner(10000, 0),
        FixedPointNumber.fromInner(0, 0),
        FixedPointNumber.fromInner(0, 0),
        fee
      ).toNumber()
    ).toEqual(0);

    expect(
      getSupplyAmount(
        FixedPointNumber.fromInner(0, 0),
        FixedPointNumber.fromInner(20000, 0),
        FixedPointNumber.fromInner(0, 0),
        fee
      ).toNumber()
    ).toEqual(0);

    expect(
      getSupplyAmount(
        FixedPointNumber.fromInner(10000, 0),
        FixedPointNumber.fromInner(20000, 0),
        FixedPointNumber.fromInner(0, 0),
        fee
      ).toNumber()
    ).toEqual(0);

    expect(
      getSupplyAmount(
        FixedPointNumber.fromInner(10000, 0),
        FixedPointNumber.fromInner(1, 0),
        FixedPointNumber.fromInner(1, 0),
        fee
      ).toNumber()
    ).toEqual(0);

    expect(
      getSupplyAmount(
        FixedPointNumber.fromInner(10000, 0),
        FixedPointNumber.fromInner(20000, 0),
        FixedPointNumber.fromInner(9949, 0),
        fee
      ).toNumber()
    ).toEqual(9999);

    expect(
      getTargetAmount(
        FixedPointNumber.fromInner(10000, 0),
        FixedPointNumber.fromInner(20000, 0),
        FixedPointNumber.fromInner(9999, 0),
        fee
      ).toNumber()
    ).toEqual(9949);

    expect(
      getSupplyAmount(
        FixedPointNumber.fromInner(10000, 0),
        FixedPointNumber.fromInner(20000, 0),
        FixedPointNumber.fromInner(1801, 0),
        fee
      ).toNumber()
    ).toEqual(1000);

    expect(
      getTargetAmount(
        FixedPointNumber.fromInner(10000, 0),
        FixedPointNumber.fromInner(20000, 0),
        FixedPointNumber.fromInner(1000, 0),
        fee
      ).toNumber()
    ).toEqual(1801);
  });
});
