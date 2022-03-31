import { Chain, CrossChainRouter } from './types';
import { chains, RegisteredChain } from './configs/chains';
import { isChainEqual } from './utils/is-chain-equal';
import { isEmpty, overEvery, uniqWith } from 'lodash';

interface RouterFilter {
  from?: Chain | RegisteredChain;
  to?: Chain | RegisteredChain;
  token?: string;
}

export class CrossChainRouterManager {
  private routers: CrossChainRouter[];

  constructor() {
    this.routers = [];
  }

  public async addRouter(router: CrossChainRouter): Promise<void> {
    const { token } = router;
    const from = typeof router.from === 'string' ? chains[router.from] : router.from;
    const to = typeof router.to === 'string' ? chains[router.to] : router.to;

    this.routers.push({ from, to, token });
  }

  public async addRouters(routers: CrossChainRouter[]): Promise<void> {
    await Promise.all(routers.map((i) => this.addRouter(i)));
  }

  public getRouters(params?: RouterFilter): CrossChainRouter[] {
    // return all router configs when params is empty
    if (!params || isEmpty(params)) return this.routers;

    const compares = overEvery(
      Object.entries(params)
        .map(([k, v]): undefined | ((i: CrossChainRouter) => boolean) => {
          switch (k) {
            case 'from':
              return (i: CrossChainRouter) => isChainEqual(i.from, v);
            case 'to':
              return (i: CrossChainRouter) => isChainEqual(i.to, v);
            case 'token': {
              return (i: CrossChainRouter) => i.token === v;
            }
          }

          return undefined;
        })
        .filter((i) => !!i) as ((i: CrossChainRouter) => boolean)[]
    );

    return this.routers.filter((i) => compares(i));
  }

  public getDestiantionsChains(params: Required<Pick<RouterFilter, 'from'>>): Chain[] {
    return uniqWith(
      this.getRouters(params).map((i) => i.to),
      (i, j) => isChainEqual(i, j)
    );
  }

  public getFromChains(params: Required<Pick<RouterFilter, 'to'>>): Chain[] {
    return uniqWith(
      this.getRouters(params).map((i) => i.from),
      (i, j) => isChainEqual(i, j)
    );
  }

  public getAvailableTokens(params: Required<Pick<RouterFilter, 'from' | 'to'>>): string[] {
    return uniqWith(
      this.getRouters(params).map((i) => i.token),
      (i, j) => i === j
    );
  }
}
