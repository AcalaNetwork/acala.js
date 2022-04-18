import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { BaseSDK } from '..';
import { BaseCrossChainAdapter } from './base-chain-adapter';
import { RegisteredChain } from './configs/chains';
import { CrossChainRouterManager } from './cross-chain-router';
import { NoCrossChainAdapterFound } from './errors';
import { Chain, CrossChainSDKConfigs } from './types';

export class CrossChain implements BaseSDK {
  readonly router: CrossChainRouterManager;
  readonly adapters: BaseCrossChainAdapter[];

  public consts!: {
    runtimeChain: string;
  };

  public isReady$: BehaviorSubject<boolean>;

  constructor({ adapters }: CrossChainSDKConfigs) {
    this.isReady$ = new BehaviorSubject<boolean>(false);
    this.adapters = adapters;
    this.router = new CrossChainRouterManager({ adapters: adapters });
    this.init();
  }

  public init(): void {
    this.adapters.forEach((i) => this.router.addRouters(i.getRouters()));
    this.adapters.forEach((i) => i.injectFindAdapter(this.findAdapter));
    this.isReady$.next(true);
  }

  public get isReady(): Promise<boolean> {
    return firstValueFrom(this.isReady$.asObservable().pipe((i) => i));
  }

  public findAdapter = (chain: RegisteredChain | Chain): BaseCrossChainAdapter => {
    const result = this.router.findAdapterByName(chain);

    if (!result) throw new NoCrossChainAdapterFound(JSON.stringify(chain));

    return result;
  };
}

export * from './adapters';
