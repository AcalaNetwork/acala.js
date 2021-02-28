import { Token, sortTokens } from './token';
import { FixedPointNumber } from './fixed-point-number';

describe('token', () => {
  const t1 = new Token({ name: 'T1', symbol: 'Token1', chain: 'acala', amount: 1, precision: 18 });
  const t2 = new Token({ name: 'T2', symbol: 'Token1', chain: 'acala', amount: 1, precision: 16 });

  test('token constructor', () => {
    expect(t1.name).toEqual('T1');
    expect(t1.symbol).toEqual('Token1');
    expect(t1.chain).toEqual('acala');
    expect(t1.amount.toNumber()).toEqual(1);
    expect(t1.precision).toEqual(18);
  });

  test('token amount', () => {
    t1.amount = t1.amount.plus(new FixedPointNumber(1, 18));
    expect(t1.amount.toNumber()).toEqual(2);

    t1.amount = t1.amount.plus(t2.amount);
    expect(t1.amount.toNumber()).toEqual(3);
  });
});

describe('sort tokens', () => {
  const aca = new Token({ name: 'ACA', symbol: 'ACA', chain: 'acala', amount: 1, precision: 18 });
  const xbtc = new Token({ name: 'XBTC', symbol: 'XBTC', chain: 'acala', amount: 1, precision: 16 });
  const renbtc = new Token({ name: 'RENBTC', symbol: 'renBTC', chain: 'acala', amount: 1, precision: 16 });

  expect(sortTokens(aca, xbtc)).toEqual([aca, xbtc]);
  expect(sortTokens(xbtc, aca)).toEqual([aca, xbtc]);
  expect(sortTokens(xbtc, renbtc, aca)).toEqual([aca, xbtc, renbtc]);
});
