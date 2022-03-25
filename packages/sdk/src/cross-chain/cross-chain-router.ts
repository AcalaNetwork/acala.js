import { forceToCurrencyName, Token } from '@acala-network/sdk-core';
import { Wallet } from '../wallet';
import { Chain, CrossChainRouter } from './types';
import { RegisteredChain } from './configs/chains';
import { isChainEqual } from './utils/is-chain-equal';
import { isEmpty, overEvery, overSome, uniqWith } from 'lodash';

interface StrictRouter extends CrossChainRouter {
  token: Token;
}

interface RouterFilter {
  from?: Chain | RegisteredChain;
  to?: Chain | RegisteredChain;
  token?: Token | string;
}

export class CrossChainRouterManager {
  private wallet: Wallet;
  private routers: StrictRouter[];

  constructor(wallet: Wallet) {
    this.wallet = wallet;
    this.routers = [];
  }

  public async addRouter(router: CrossChainRouter): Promise<void> {
    const token = await this.wallet.getToken(router.token);

    this.routers.push({ ...router, token });
  }

  public async addRouters(routers: CrossChainRouter[]): Promise<void> {
    await Promise.all(routers.map((i) => this.addRouter(i)));
  }

  public getRouters(params?: RouterFilter): StrictRouter[] {
    // return all router configs when params is empty
    if (!params || isEmpty(params)) return this.routers;

    const compares = overEvery(
      Object.entries(params)
        .map(([k, v]): undefined | ((i: StrictRouter) => boolean) => {
          switch (k) {
            case 'from':
              return (i: StrictRouter) => isChainEqual(i.from, v);
            case 'to':
              return (i: StrictRouter) => isChainEqual(i.to, v);
            case 'token': {
              const token = this.wallet.__getToken(v);

              return (i: StrictRouter) => !!(token && i.token.isEqual(token));
            }
          }

          return undefined;
        })
        .filter((i) => !!i) as ((i: StrictRouter) => boolean)[]
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

  public getAvailableTokens(params: Required<Pick<RouterFilter, 'from' | 'to'>>): Token[] {
    return uniqWith(
      this.getRouters(params).map((i) => i.token),
      (i, j) => forceToCurrencyName(i) === forceToCurrencyName(j)
    );
  }
}
