import { Token, TokenPair } from '@acala-network/sdk-core';
import { set } from 'lodash';

export class TradeGraph {
  private adj: Record<string, Token[]>;

  constructor (data: TokenPair[]) {
    this.adj = {};

    for (const item of data) {
      const [token1, token2] = item.getPair();

      set(this.adj, token1.name, [...(this.adj[token1.name] || []), token2]);
      set(this.adj, token2.name, [...(this.adj[token2.name] || []), token1]);
    }
  }

  public getAdj (token: Token): Token[] | undefined {
    return this.adj[token.toString()];
  }

  public getPathes (start: Token, end: Token): Token[][] {
    const result: Token[][] = [];
    const path: Token[] = [start];
    const searchList: Token[][] = [(this.adj[start.name] || []).slice()];

    while (path.length > 0) {
      const searchListHead = searchList.pop() || [];

      if (searchListHead.length > 0) {
        /* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */
        const firstNode = searchListHead.shift()!;

        path.push(firstNode);
        searchList.push(searchListHead);

        let nextSearchPathItem = (this.adj[firstNode.name] || []).slice();

        if (nextSearchPathItem.length > 0) {
          nextSearchPathItem = nextSearchPathItem.filter((m) => {
            return !path.find((n) => n.isEqual(m));
          });

          searchList.push(nextSearchPathItem);
        }
      } else {
        path.pop();
      }

      if (path.length > 0 && path[path.length - 1].isEqual(end)) {
        result.push([...path]);

        path.pop();
        searchList.pop();
      }
    }

    return result;
  }
}
