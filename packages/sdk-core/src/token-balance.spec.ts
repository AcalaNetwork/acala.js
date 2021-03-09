import { FixedPointNumber } from './fixed-point-number';
import { Token } from './token';
import { TokenBalance } from './token-balance';

describe('token balance', () => {
  const t1 = new Token({ name: 'T1', symbol: 'T1', chain: 'acala', decimal: 8 });
  const t2 = new Token({ name: 'T2', symbol: 'T2', chain: 'acala', decimal: 14 });

  test('token balance constructor should work', () => {
    const t1Balance = new TokenBalance(t1, FixedPointNumber.ONE);
    const t2Balnace = new TokenBalance(t2);

    expect(t1Balance.balance.toChainData()).toEqual('100000000');
    expect(t1Balance.balance.toString()).toEqual('1');
    expect(t1Balance.balance.toNumber()).toEqual(1);
    expect(t2Balnace.balance.toString()).toEqual('0');
  });

  test('token balance with different decimal should work', () => {
    const t1Balnace = new TokenBalance(t1, FixedPointNumber.ONE);
    const t2Balnace = new TokenBalance(t2, FixedPointNumber.ONE);
    const t1Price = new FixedPointNumber(1.18);
    const t1Value = t1Balnace.balance.times(t1Price);

    expect(t1Value.toString()).toEqual('1.18');
    expect(t2Balnace.balance.isEqualTo(t1Balnace.balance)).toEqual(true);
  });

  test('token balance calculation should work', () => {
    const t1Balnace = new TokenBalance(t1, FixedPointNumber.ONE);
    const t2Balnace = new TokenBalance(t1, FixedPointNumber.ONE);
    const t1Price = new FixedPointNumber(1.18);
    const t1Value = t1Balnace.balance.times(t1Price);
    const t1ExchangeRate = new FixedPointNumber(0.1);
    const t2ExchangeRate = new FixedPointNumber(0.2);

    expect(t1Balnace.balance.times(t1ExchangeRate).toString()).toEqual('0.1');
    expect(t2Balnace.balance.times(t2ExchangeRate).toString()).toEqual('0.2');

    expect(t1Value.toString()).toEqual('1.18');
    expect(t2Balnace.balance.isEqualTo(t1Balnace.balance)).toEqual(true);
  });
});
