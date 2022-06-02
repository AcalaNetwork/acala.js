import { AnyApi, FixedPointNumber, Token } from '@acala-network/sdk-core';
import { BehaviorSubject, combineLatest, filter, firstValueFrom, map, Observable, of, switchMap } from 'rxjs';
import { BaseSDK } from '../types';
import { Wallet } from '../wallet';
import { TradingGraph } from './trading-graph';
import {
  AggregateDexConfigs,
  AggregateDexSwapParams,
  BaseSwap,
  DexSource,
  TradeType,
  CompositeTradingPath,
  SwapResult,
  TradingPathItem
} from './types';

export class AggregateDex implements BaseSDK {
  private api: AnyApi;
  readonly wallet: Wallet;
  private providers: BaseSwap[];
  public readonly tradingGraph: TradingGraph;
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
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      aggregateLimit: (this.api.consts.dex.tradingPathLimit as any).toNumber()
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

  public getTradingPaths(start: Token, end: Token): CompositeTradingPath[] {
    return this.tradingGraph
      .getTradingPaths({
        start,
        end,
        aggreagetLimit: this.configs.aggregateLimit
      })
      .filter((path) => {
        // check all path is validate
        return path.reduce((acc, item) => {
          const [source] = item;
          const provider = this.providers.find((i) => i.source === source);

          if (!provider) return false;

          return acc && provider.filterPath(item);
        }, true as boolean);
      });
  }

  private findProvider(source: DexSource): BaseSwap {
    // never failed
    return this.providers.find((i) => i.source === source) as BaseSwap;
  }

  private swapWithCompositePath(type: TradeType, input: FixedPointNumber, path: CompositeTradingPath) {
    const [first] = path;

    const fn = (count: number, max: number, params: SwapResult): Observable<SwapResult> => {
      if (count >= max) {
        return of(params);
      }

      const current = path[count];
      const provider = this.findProvider(current[0]);

      return provider
        .swap({
          source: current[0],
          type,
          input: params.output.amount,
          acceptiveSlippage: 0,
          path: current[1]
        })
        .pipe(
          switchMap((result) => {
            return fn(count + 1, max, result);
          }),
          map((result) => {
            return {
              ...result,
              input: {
                token: first[1][0],
                amount: input
              },
              path
            };
          })
        );
    };

    const createFirstTrading = (path: TradingPathItem) => {
      const provider = this.findProvider(path[0]);

      return provider.swap({
        source: path[0],
        type: type,
        input,
        acceptiveSlippage: 0,
        path: path[1]
      });
    };

    return createFirstTrading(first).pipe(
      switchMap((result) => {
        return fn(1, path.length, result);
      })
    );
  }

  private getBestSwapResult(type: TradeType, resultList: SwapResult[]) {
    if (type === 'EXACT_INPUT') {
      return resultList.slice(1).reduce((acc, cur) => {
        return acc.output.amount.gt(cur.output.amount) ? acc : cur;
      }, resultList[0]);
    }

    // exact output
    return resultList.slice(1).reduce((acc, cur) => {
      return acc.input.amount.lt(cur.input.amount) ? acc : cur;
    }, resultList[0]);
  }

  public swap(params: AggregateDexSwapParams) {
    const { type } = params;

    return this.swapWithAllTradeablePath(params).pipe(map((results) => this.getBestSwapResult(type, results)));
  }

  public swapWithAllTradeablePath(params: AggregateDexSwapParams) {
    const { path, source, type, input } = params;
    let useablePaths = this.getTradingPaths(path[0], path[1]);

    if (source !== 'aggregate') {
      // remove include other source path when source is not aggregate
      useablePaths = useablePaths.filter((path) => {
        return path.reduce((acc, item) => {
          return acc && source !== item[0];
        }, true as boolean);
      });
    }

    return combineLatest(useablePaths.map((path) => this.swapWithCompositePath(type, input, path)));
  }
}
