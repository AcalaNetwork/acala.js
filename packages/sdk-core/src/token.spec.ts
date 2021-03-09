import { Token, sortTokens } from './token';

describe('token', () => {
  const t1 = new Token({ name: 'Token1', symbol: 'T1', chain: 'acala', decimal: 18 });

  test('token constructor should work', () => {
    expect(t1.name).toEqual('Token1');
    expect(t1.symbol).toEqual('T1');
    expect(t1.chain).toEqual('acala');
    expect(t1.decimal).toEqual(18);
  });

  test('clone tokens should work', () => {
    const t2 = t1.clone();

    expect(t2.name).toEqual('Token1');
    expect(t2.symbol).toEqual('T1');
    expect(t2.chain).toEqual('acala');
    expect(t2.decimal).toEqual(18);
  });

  test('fromCurrencyId set default token decimal should work', () => {
    const mockACA = { asToken: { toString: () => 'ACA' }, isToken: true };
    const mockAUSD = { asToken: { toString: () => 'AUSD' }, isToken: true };
    const mockDOT = { asToken: { toString: () => 'DOT' }, isToken: true };

    expect(Token.fromCurrencyId(mockACA as any).decimal).toEqual(13);
    expect(Token.fromCurrencyId(mockAUSD as any).decimal).toEqual(12);
    expect(Token.fromCurrencyId(mockDOT as any).decimal).toEqual(10);
  });

  test('toChainData should work', () => {
    expect(t1.toChainData()).toEqual({ Token: 'T1' });
  });

  test('isEqual should work', () => {
    const t2 = t1.clone();
    const t3 = new Token({ name: 'T3', symbol: 'T3', chain: 'acala' });

    expect(t1.isEqual(t2)).toEqual(true);
    expect(t1.isEqual(t3)).toEqual(false);
  });

  test('toString should work', () => {
    expect(t1.toString()).toEqual('Token1');
  });

  test('sort tokens should work', () => {
    const aca = new Token({ name: 'ACA', symbol: 'ACA', chain: 'acala', decimal: 18 });
    const xbtc = new Token({ name: 'XBTC', symbol: 'XBTC', chain: 'acala', decimal: 16 });
    const renbtc = new Token({ name: 'RENBTC', symbol: 'renBTC', chain: 'acala', decimal: 16 });

    expect(sortTokens(aca, xbtc)).toEqual([aca, xbtc]);
    expect(sortTokens(xbtc, aca)).toEqual([aca, xbtc]);
    expect(sortTokens(xbtc, renbtc, aca)).toEqual([aca, xbtc, renbtc]);
  });
});
