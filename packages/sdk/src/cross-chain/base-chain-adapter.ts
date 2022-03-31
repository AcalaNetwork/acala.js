import { Chain, CrossChainRouter, CrossChainTransferParams } from './types';
import { RegisteredChain } from './configs/chains';
import { isChainEqual } from './utils/is-chain-equal';
import { NoCrossChainAdapterFound } from './errors';
import { AnyApi, FixedPointNumber } from '@acala-network/sdk-core';
import { Observable } from 'rxjs';
import { ApiTypes, SubmittableExtrinsic } from '@polkadot/api/types';

export abstract class BaseCrossChainAdapter {
  protected adapters!: BaseCrossChainAdapter[];
  protected routers: Omit<CrossChainRouter, 'from'>[];
  protected api!: AnyApi;
  readonly chain: Chain;

  constructor(api: AnyApi, chain: Chain, routers: Omit<CrossChainRouter, 'from'>[]) {
    this.api = api;
    this.chain = chain;
    this.routers = routers;
  }

  public injectAdapters(adapters: BaseCrossChainAdapter[]): void {
    this.adapters = adapters;
  }

  public getAdapterByName(target: Chain | RegisteredChain): BaseCrossChainAdapter {
    const adapter = this.adapters.find((i) => isChainEqual(i.chain, target));

    if (!adapter) throw new NoCrossChainAdapterFound(typeof target === 'string' ? target : target.name);

    return adapter;
  }

  public getRouters(): CrossChainRouter[] {
    return this.routers.map((i) => ({ ...i, from: this.chain }));
  }

  public abstract subscribeMinInput(token: string): Observable<FixedPointNumber>;
  public abstract subscribeMaxInput(token: string, address: string): Observable<FixedPointNumber>;
  public abstract createTx(
    params: CrossChainTransferParams
  ): SubmittableExtrinsic<'promise'> | SubmittableExtrinsic<'rxjs'>;
}
