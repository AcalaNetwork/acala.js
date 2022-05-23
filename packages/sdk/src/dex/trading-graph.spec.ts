import { Token } from '@acala-network/sdk-core';
import { TradingGraph } from './trading-graph';
import { TradingPair } from './types';

describe('trading graph', () => {
  test('generate graph should be ok', () => {
    const token0 = new Token('0');
    const token1 = new Token('1');
    const token2 = new Token('2');
    const token3 = new Token('3');
    const pair1: TradingPair = [token0, token1];
    const pair2: TradingPair = [token1, token2];
    const pair3: TradingPair = [token0, token3];

    const tradingGraph = new TradingGraph();

    tradingGraph.registerTradingPairs('acala', [pair1, pair2]);
    tradingGraph.registerTradingPairs('nuts', [pair3]);

    tradingGraph.genGraph();

    console.log(tradingGraph.toString());

    expect(tradingGraph.graph.size).toBe(5);
    expect(tradingGraph.graph.get('acala-0')?.length).toBe(3);
    expect(tradingGraph.graph.get('acala-1')?.length).toBe(3);
    expect(tradingGraph.graph.get('acala-2')?.length).toBe(2);
    expect(tradingGraph.graph.get('nuts-0')?.length).toBe(3);
    expect(tradingGraph.graph.get('nuts-3')?.length).toBe(2);
  });

  test('search path should be ok', () => {
    const token0 = new Token('0');
    const token1 = new Token('1');
    const token2 = new Token('2');
    const token3 = new Token('3');
    const pair1: TradingPair = [token0, token1];
    const pair2: TradingPair = [token1, token2];
    const pair3: TradingPair = [token0, token3];

    const tradingGraph = new TradingGraph();

    tradingGraph.registerTradingPairs('acala', [pair1, pair2]);
    tradingGraph.registerTradingPairs('nuts', [pair3]);

    tradingGraph.genGraph();

    console.log(TradingGraph.printPaths(tradingGraph.searchPaths(token0, token3)));
    tradingGraph
      .getTradingPaths({
        start: token0,
        end: token3,
        aggreagetLimit: 4
      })
      .forEach((i) => {
        console.log(i[0], i[1]);
      });
  });
});
