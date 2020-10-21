import { getPresetToken, TokenPair } from '@acala-network/sdk-core';
import { TradeGraph } from './trade-graph';

describe('trade graph', () => {
  const aca = getPresetToken('ACA');
  const ausd = getPresetToken('AUSD');
  const dot = getPresetToken('DOT');
  const xbtc = getPresetToken('XBTC');
  const renbtc = getPresetToken('RENBTC');

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

    const _dot = getPresetToken('DOT');

    const dot2renbtc = tradeGraph.getPathes(_dot, renbtc);

    expect(dot2renbtc[0]).toEqual([dot, aca, renbtc]);
    expect(dot2renbtc[1]).toEqual([dot, renbtc]);
    expect(dot2renbtc[2]).toEqual([dot, ausd, aca, renbtc]);

    const aca2ausd = tradeGraph.getPathes(aca, ausd);

    expect(aca2ausd[0]).toEqual([aca, ausd]);
    expect(aca2ausd[1]).toEqual([aca, dot, ausd]);
    expect(aca2ausd[2]).toEqual([aca, renbtc, dot, ausd]);
  });
});
