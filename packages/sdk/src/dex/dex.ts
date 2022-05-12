import { AnyApi, Token } from '@acala-network/sdk-core';
import { BehaviorSubject, combineLatest, filter, firstValueFrom, map, Observable, switchMap } from 'rxjs';
import { BaseSDK } from '../types';
import { Wallet } from '../wallet';
import { TradingGraph } from './trading-graph';
import { AggregateDexConfigs, BaseSwap } from './types';

export class AggregateDex implements BaseSDK {
  private api: AnyApi;
  private wallet: Wallet;
  private providers: BaseSwap[];
  private tradingGraph: TradingGraph;
  private status: BehaviorSubject<boolean>;
  private tokens$: BehaviorSubject<Token[]>;

  constructor(configs: AggregateDexConfigs) {
    const { api, wallet, providers } = configs;
    this.api = api;
    this.wallet = wallet;
    this.providers = providers;
    this.tradingGraph = new TradingGraph();
    this.status = new BehaviorSubject<boolean>(false);
    this.tokens$ = new BehaviorSubject<Token[]>([]);

    this.init().subscribe({
      next: () => {
        this.status.next(true);
      }
    });
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

  public swap () {

  }
}
