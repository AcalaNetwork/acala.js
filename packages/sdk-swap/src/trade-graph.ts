import { Token, TokenPair } from '@acala-network/sdk-core';

export class TradeGraph {
  private adj: Map<Token, Token[]>;

  constructor (data: TokenPair[]) {
    this.adj = new Map();

    for (const item of data) {
      const [token1, token2] = item.getPair();

      this.adj.set(token1, this.adj.get(token1) ? [...this.adj.get(token1) || [], token2] : [token2]);
      this.adj.set(token2, this.adj.get(token2) ? [...this.adj.get(token2) || [], token1] : [token1]);
    }
  }

  public getAdj (token: Token): Token[] | undefined {
    return this.adj.get(token);
  }

  public getPathes (start: Token, end: Token): Token[][] {
    const result: Token[][] = [];
    const path: Token[] = [start];
    const searchList: Token[][] = [(this.adj.get(start) || []).slice()];

    while (path.length > 0) {
      const searchListHead = searchList.pop() || [];

      if (searchListHead.length > 0) {
        /* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */
        const firstNode = searchListHead.shift()!;

        path.push(firstNode);
        searchList.push(searchListHead);

        let nextSearchPathItem = (this.adj.get(firstNode) || []).slice();

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
