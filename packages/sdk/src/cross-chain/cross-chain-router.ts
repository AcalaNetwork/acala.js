import { Chain, CrossChainRouter } from './types';
import { chains, RegisteredChain } from './configs/chains';
import { isChainEqual } from './utils/is-chain-equal';
import { isEmpty, overEvery, uniqWith } from 'lodash';
import { BaseCrossChainAdapter } from './base-chain-adapter';

interface RouterFilter {
  from?: Chain | RegisteredChain;
  to?: Chain | RegisteredChain;
  token?: string;
}

interface CrossChainRouterManagerConfigs {
  adapters: BaseCrossChainAdapter[];
}

export class CrossChainRouterManager {
  private routers: CrossChainRouter[];
  private adapters: BaseCrossChainAdapter[];

  constructor(configs?: CrossChainRouterManagerConfigs) {
    this.routers = [];
    this.adapters = configs?.adapters || [];
  }

  public findAdapterByName(chain: RegisteredChain | Chain): BaseCrossChainAdapter | undefined {
    return this.adapters.find((i) => isChainEqual(chain, i.chain));
  }

  public async addRouter(router: CrossChainRouter, checkAdapter = true): Promise<void> {
    const { token } = router;
    const from = typeof router.from === 'string' ? chains[router.from] : router.from;
    const to = typeof router.to === 'string' ? chains[router.to] : router.to;

    // push routers if from & to adapters are both set
    if (!checkAdapter || (this.findAdapterByName(from) && this.findAdapterByName(to) && checkAdapter)) {
      this.routers.push({ from, to, token });
    }
  }

  public async addRouters(routers: CrossChainRouter[], checkAdapter = true): Promise<void> {
    await Promise.all(routers.map((i) => this.addRouter(i, checkAdapter)));
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

  public getDestiantionsChains(params: Omit<RouterFilter, 'to'>): Chain[] {
    if (isEmpty(params)) return [];

    return uniqWith(
      this.getRouters(params).map((i) => i.to),
      (i, j) => isChainEqual(i, j)
    );
  }

  public getFromChains(params: Omit<RouterFilter, 'from'>): Chain[] {
    if (isEmpty(params)) return [];

    return uniqWith(
      this.getRouters(params).map((i) => i.from),
      (i, j) => isChainEqual(i, j)
    );
  }

  public getAvailableTokens(params: Omit<RouterFilter, 'token'>): string[] {
    if (isEmpty(params)) return [];

    return uniqWith(
      this.getRouters(params).map((i) => i.token),
      (i, j) => i === j
    );
  }
}
