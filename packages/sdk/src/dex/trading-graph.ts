import { Token } from '@acala-network/sdk-core';
import { DexSource, TradingPair } from './types';

interface TradeNode {
  source: DexSource;
  token: Token;
}

export class TradingGraph {
  private tradingPairs: {
    [k in DexSource]?: TradingPair[];
  };

  public readonly graph: Map<string, TradeNode[]>;

  constructor() {
    this.tradingPairs = {};
    this.graph = new Map<string, TradeNode[]>();
  }

  public registerTradingPairs(source: DexSource, tradingPairs: TradingPair[]) {
    this.tradingPairs[source] = tradingPairs;
  }

  public genGraph() {
    const allSources = Object.keys(this.tradingPairs) as DexSource[];

    for (const data of Object.entries(this.tradingPairs)) {
      const [source, tradingPairs] = data as unknown as [DexSource, TradingPair[]];

      for (const pairs of tradingPairs) {
        const [token0, token1] = pairs;

        const key0 = `${source}-${token0.name}`;
        const key1 = `${source}-${token1.name}`;

        // create token0-token1 edge
        if (this.graph.has(key0)) {
          this.graph.get(key0)?.push({ source, token: token1 });
        } else {
          this.graph.set(key0, [
            { source, token: token0 },
            { source, token: token1 }
          ]);
        }

        // create token1-token0 edge
        if (this.graph.has(key1)) {
          this.graph.get(key1)?.push({ source, token: token0 });
        } else {
          this.graph.set(key1, [
            { source, token: token1 },
            { source, token: token0 }
          ]);
        }
      }

      // connect different dex source
      for (const [, [node]] of this.graph) {
        const { source, token } = node;

        for (const i of allSources) {
          if (i === source) continue;

          const key = `${i}-${token.name}`;

          if (this.graph.get(key)) {
            this.graph.get(key)?.push({ source, token });
          }
        }
      }
    }
  }

  private getNodeKey(node: TradeNode) {
    return `${node.source}-${node.token.name}`;
  }

  private isInPath(tracking: TradeNode[], node: TradeNode) {
    return tracking.find((i) => {
      return this.getNodeKey(i) === this.getNodeKey(node);
    });
  }

  private dfs(paths: TradeNode[][], tracking: TradeNode[], start: string, target: Token) {
    const nodes = this.graph.get(start);

    if (!nodes) return;

    const [current, ...connected] = nodes;

    tracking.push(current);

    if (current.token.name === target.name && !this.isInPath(tracking, current)) {
      paths.push([...tracking]);

      return;
    }

    for (const n of connected) {
      if (this.isInPath(tracking, n)) continue;

      this.dfs(paths, [...tracking], this.getNodeKey(n), target);
    }

    return tracking;
  }

  public searchPaths(start: Token, end: Token) {
    const paths: TradeNode[][] = [];

    const allSources = Object.keys(this.tradingPairs) as DexSource[];

    for (const source of allSources) {
      this.dfs(paths, [], this.getNodeKey({ source, token: start }), end);
    }

    return paths;
  }

  public getTradingPaths(configs: { start: Token; end: Token; acalaLimit: number; aggreagetLimit: number }) {
    const { start, end } = configs;

    return this.searchPaths(start, end);
  }

  public static printPaths(data: TradeNode[][]) {
    let temp = '';

    for (const values of data) {
      temp += `${values.map((i) => `(${i.source}, ${i.token.name})`).join(' -> ')}`;
      temp += '\r\n';
    }

    return temp;
  }

  public toString() {
    let temp = '';

    for (const [key, values] of this.graph) {
      temp += `${key}: ${values.map((i) => `(${i.source}, ${i.token.name})`).join(' -> ')}`;
      temp += '\r\n';
    }

    return temp;
  }

  public get tradableTokens() {
    const list: Map<string, Token> = new Map<string, Token>();

    Object.values(this.tradingPairs).forEach((pairs) => {
      pairs.forEach(([token0, token1]) => {
        list.set(token0.name, token0);
        list.set(token1.name, token1);
      });
    });

    return Array.from(list.values());
  }
}
