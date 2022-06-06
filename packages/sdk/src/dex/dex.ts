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
  TradeMode,
  CompositeTradingPath,
  SwapResult,
  TradingPathItem,
  AggregateDexSwapResult
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

  private getProvider(source: DexSource): BaseSwap {
    // never failed
    return this.providers.find((i) => i.source === source) as BaseSwap;
  }

  private swapWithCompositePath(
    mode: TradeMode,
    input: FixedPointNumber,
    path: CompositeTradingPath
  ): Observable<AggregateDexSwapResult> {
    const [first] = path;
    const mid: SwapResult[] = [];

    const fn = (count: number, max: number, params: SwapResult): Observable<SwapResult> => {
      if (count >= max) {
        return of(params);
      }

      const current = path[count];
      const provider = this.getProvider(current[0]);

      return provider
        .swap({
          source: current[0],
          mode,
          input: params.output.amount,
          acceptiveSlippage: 0,
          path: current[1]
        })
        .pipe(
          switchMap((result) => {
            return fn(count + 1, max, result);
          })
        );
    };

    const createFirstTrading = (path: TradingPathItem) => {
      const provider = this.getProvider(path[0]);

      return provider.swap({
        source: path[0],
        mode,
        input,
        acceptiveSlippage: 0,
        path: path[1]
      });
    };

    return createFirstTrading(first).pipe(
      switchMap((result) => {
        mid.push(result);
        return fn(1, path.length, result);
      }),
      map((result) => {
        mid.push(result);
        return {
          ...result,
          input: {
            token: first[1][0],
            amount: input
          },
          path
        };
      }),
      map((result) => {
        return {
          result,
          mid
        };
      })
    );
  }

  private getBestSwapResult(mode: TradeMode, resultList: AggregateDexSwapResult[]) {
    if (mode === 'EXACT_INPUT') {
      return resultList.slice(1).reduce((acc, cur) => {
        return acc.result.output.amount.gt(cur.result.output.amount) ? acc : cur;
      }, resultList[0]);
    }

    // exact output
    return resultList.slice(1).reduce((acc, cur) => {
      return acc.result.input.amount.lt(cur.result.input.amount) ? acc : cur;
    }, resultList[0]);
  }

  public swap(params: AggregateDexSwapParams) {
    const { mode } = params;

    return this.swapWithAllTradeablePath(params).pipe(map((results) => this.getBestSwapResult(mode, results)));
  }

  public swapWithAllTradeablePath(params: AggregateDexSwapParams) {
    const { path, source, mode, input } = params;
    let useablePaths = this.getTradingPaths(path[0], path[1]);

    if (source !== 'aggregate') {
      // remove include other source path when source is not aggregate
      useablePaths = useablePaths.filter((path) => {
        return path.reduce((acc, item) => {
          return acc && source !== item[0];
        }, true as boolean);
      });
    }

    return combineLatest(useablePaths.map((path) => this.swapWithCompositePath(mode, input, path)));
  }

  private convertCompositeTradingPathToTxPawrams(list: SwapResult[]) {
    return list.map((item) => {
      const source = item.source;
      const provider = this.getProvider(source as DexSource);

      return provider.getAggregateTradingPath(item);
    });
  }

  public getTradingTx(result: AggregateDexSwapResult) {
    const { path, output, input, acceptiveSlippage } = result.result;

    const slippage = new FixedPointNumber(1 - (acceptiveSlippage || 0));

    if (path.length === 1 && path[0][0] === 'acala') {
      const provider = this.getProvider('acala');

      return provider.getTradingTx(result.mid[0]);
    }

    if (path.length === 1 && path[0][0] === 'nuts') {
      const provider = this.getProvider('nuts');

      return provider.getTradingTx(result.mid[0]);
    }

    // get aggregate tx
    return this.api.tx.aggregatedDex.swapWithExactSupply(
      this.convertCompositeTradingPathToTxPawrams(result.mid),
      input.amount.toChainData(),
      output.amount.mul(slippage).toChainData()
    );
  }
}
