import { Token, TokenPair } from '@acala-network/sdk-core';
import { TradeGraph } from './trade-graph';

describe('trade graph', () => {
  const aca = new Token({ name: 'ACA', symbol: 'ACA', chain: 'acala', amount: 1, precision: 18 });
  const ausd = new Token({ name: 'AUSD', symbol: 'AUSD', chain: 'acala', amount: 1, precision: 16 });
  const dot = new Token({ name: 'DOT', symbol: 'DOT', chain: 'acala', amount: 1, precision: 16 });
  const xbtc = new Token({ name: 'XBTC', symbol: 'XBTC', chain: 'acala', amount: 1, precision: 16 });
  const renbtc = new Token({ name: 'RENBTC', symbol: 'RENBTC', chain: 'acala', amount: 1, precision: 16 });

  test('create trade graph', () => {
    const tradeGraph = new TradeGraph([
      new TokenPair(aca, ausd),
      new TokenPair(aca, dot),
      new TokenPair(aca, xbtc),
      new TokenPair(aca, renbtc),
      new TokenPair(dot, renbtc)
    ]);

    expect(tradeGraph.getAdj(aca)).toEqual([ausd, dot, xbtc, renbtc]);
    expect(tradeGraph.getAdj(ausd)).toEqual([aca]);
    expect(tradeGraph.getAdj(renbtc)).toEqual([aca, dot]);
  });

  test('get path should be work', () => {
    const tradeGraph = new TradeGraph([
      new TokenPair(aca, ausd),
      new TokenPair(aca, dot),
      new TokenPair(aca, xbtc),
      new TokenPair(aca, renbtc),
      new TokenPair(dot, renbtc),
      new TokenPair(dot, ausd)
    ]);

    const _dot = new Token({ name: 'DOT', symbol: 'DOT', chain: 'acala', amount: 1, precision: 16 });

    const dot2renbtc = tradeGraph.getPathes(_dot, renbtc);

    expect(dot2renbtc[0]).toEqual([_dot, aca, renbtc]);
    expect(dot2renbtc[1]).toEqual([_dot, renbtc]);
    expect(dot2renbtc[2]).toEqual([_dot, ausd, aca, renbtc]);

    const aca2ausd = tradeGraph.getPathes(aca, ausd);

    expect(aca2ausd[0]).toEqual([aca, ausd]);
    expect(aca2ausd[1]).toEqual([aca, dot, ausd]);
    expect(aca2ausd[2]).toEqual([aca, renbtc, dot, ausd]);
  });
});
