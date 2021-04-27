import { Token, TokenPair } from '@acala-network/sdk-core';
import { TradeGraph } from './trade-graph';

describe('trade graph', () => {
  const aca = new Token('ACA');
  const ausd = new Token('AUSD');
  const dot = new Token('DOT');
  const xbtc = new Token('XBTC');
  const renbtc = new Token('RENBTC');

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

    const _dot = new Token('DOT');

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
