import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { BaseSDK } from '..';
import { BaseCrossChainAdapter } from './base-chain-adapter';
import { CrossChainRouterManager } from './cross-chain-router';
import { CrossChainSDKConfigs } from './types';

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
    this.router = new CrossChainRouterManager();
    this.init();
  }

  public init(): void {
    this.adapters.forEach((i) => {
      i.injectAdapters(this.adapters);

      this.router.addRouters(i.getRouters());
    });

    this.isReady$.next(true);
  }

  public get isReady(): Promise<boolean> {
    return firstValueFrom(this.isReady$.asObservable().pipe((i) => i));
  }
}
