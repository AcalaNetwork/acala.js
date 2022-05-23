import { AnyApi, Token } from '@acala-network/sdk-core';
import { BehaviorSubject, combineLatest, filter, firstValueFrom, map, Observable, switchMap } from 'rxjs';
import { BaseSDK } from '../types';
import { Wallet } from '../wallet';
import { NoSwapProvider } from './errors';
import { TradingGraph } from './trading-graph';
import { AggregateDexConfigs, AggregateDexSwapParams, BaseSwap, SwapParams, TradingPath } from './types';

export class AggregateDex implements BaseSDK {
  private api: AnyApi;
  private wallet: Wallet;
  private providers: BaseSwap[];
  private tradingGraph: TradingGraph;
  private status: BehaviorSubject<boolean>;
  private tokens$: BehaviorSubject<Token[]>;
  private configs: {
    aggregateLimit: number;
  };

  constructor(configs: AggregateDexConfigs) {
    const { api, wallet, providers } = configs;
    this.api = api;
    this.wallet = wallet;
    this.providers = providers;
    this.tradingGraph = new TradingGraph();
    this.status = new BehaviorSubject<boolean>(false);
    this.tokens$ = new BehaviorSubject<Token[]>([]);
    this.configs = this.getConfigs();

    this.init().subscribe({
      next: () => {
        this.status.next(true);
      }
    });
  }

  private getConfigs() {
    return {
      aggregateLimit: this.api.consts.dex.tradingPathLimit.toNumber()
    };
  }

  private init() {
    return this.wallet.isReady$.pipe(
      switchMap(() => {
        return combineLatest(this.providers.map((i) => i.tradingPairs$)).pipe(
          map((tradingPairs) => {
            const sources = this.providers.map((i) => i.source);

            tradingPairs.forEach((value, i) => this.tradingGraph.registerTradingPairs(sources[i], value));
            this.tradingGraph.genGraph();
            this.tokens$.next(this.tradingGraph.tradableTokens);
          })
        );
      })
    );
  }

  public get isReady$(): Observable<boolean> {
    return this.status.pipe(filter((i) => !!i));
  }

  public get isReady(): Promise<boolean> {
    return firstValueFrom(this.isReady$);
  }

  public get tradableTokens$(): Observable<Token[]> {
    return this.tokens$.pipe(filter((i) => !!i.length));
  }

  public getTradableTokens(): Promise<Token[]> {
    return firstValueFrom(this.tradableTokens$);
  }

  private subscribeSwap(path: TradingPath) {
    const [source, tokenPath] = path[0];

    const provider = this.providers.find((i) => i.source === source);

    if (!provider) throw new NoSwapProvider(source);
  }

  private subscribeBestSwapResult(paths: TradingPath[]) {}

  public swap(params: AggregateDexSwapParams) {
    const { path, source, type, input, acceptiveSlippage } = params;

    let useablePaths = this.tradingGraph.getTradingPaths({
      start: path[0],
      end: path[1],
      aggreagetLimit: this.configs.aggregateLimit
    });

    if (source !== 'aggregate') {
      // remove include other source path when source is not aggregate
      useablePaths = useablePaths.filter((i) => {
        return !i.find((node) => node.source !== source);
      });
    }
  }
}
