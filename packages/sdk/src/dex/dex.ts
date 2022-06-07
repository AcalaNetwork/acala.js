import { AnyApi, FixedPointNumber, Token } from '@acala-network/sdk-core';
import { BehaviorSubject, combineLatest, filter, firstValueFrom, map, Observable, of, switchMap } from 'rxjs';
import { BaseSDK } from '../types';
import { Wallet } from '../wallet';
import { NoTradingPathError } from './errors';
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

  private swapWithCompositePathInExactIntput(
    input: FixedPointNumber,
    path: CompositeTradingPath
  ): Observable<AggregateDexSwapResult> {
    const [first] = path;
    const tracker: Record<number, SwapResult> = {};

    const fn = (count: number, max: number, params: SwapResult): Observable<SwapResult> => {
      tracker[count - 1] = params;

      if (count >= max) {
        return of(params);
      }

      const current = path[count];
      const provider = this.getProvider(current[0]);

      return provider
        .swap({
          source: current[0],
          mode: 'EXACT_INPUT',
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
        mode: 'EXACT_INPUT',
        input,
        acceptiveSlippage: 0,
        path: path[1]
      });
    };

    return createFirstTrading(first).pipe(
      switchMap((result) => {
        return fn(1, path.length, result);
      }),
      map((result) => {
        return {
          ...result,
          input: {
            token: first[1][0],
            amount: input
          },
          path,
          exchangeFee: FixedPointNumber.ZERO,
          exchangeFeeRate: FixedPointNumber.ZERO,
          priceImpact: FixedPointNumber.ZERO,
          naturalPriceImpact: FixedPointNumber.ZERO,
          midPrice: FixedPointNumber.ZERO
        };
      }),
      map((result) => {
        return {
          result,
          tracker: Object.values(tracker)
        };
      })
    );
  }

  private swapWithCompositePathInExactOutput(
    input: FixedPointNumber,
    path: CompositeTradingPath
  ): Observable<AggregateDexSwapResult> {
    const len = path.length;
    const last = path[len - 1];
    const tracker: Record<number, SwapResult> = {};

    const fn = (count: number, min: number, params: SwapResult): Observable<SwapResult> => {
      tracker[count + 1] = params;

      if (count < min) {
        return of(params);
      }

      const current = path[count];
      const provider = this.getProvider(current[0]);

      return provider
        .swap({
          source: current[0],
          mode: 'EXACT_OUTPUT',
          input: params.input.amount,
          acceptiveSlippage: 0,
          path: current[1]
        })
        .pipe(
          switchMap((result) => {
            return fn(count - 1, min, result);
          })
        );
    };

    const createLastTrading = () => {
      const provider = this.getProvider(last[0]);

      return provider.swap({
        source: last[0],
        mode: 'EXACT_OUTPUT',
        input,
        acceptiveSlippage: 0,
        path: last[1]
      });
    };

    return createLastTrading().pipe(
      switchMap((result) => {
        return fn(len - 2, 0, result);
      }),
      map((result) => {
        const lastPath = last[1];

        return {
          ...result,
          output: {
            token: lastPath[lastPath.length - 1],
            amount: input
          },
          path,
          exchangeFee: FixedPointNumber.ZERO,
          exchangeFeeRate: FixedPointNumber.ZERO,
          priceImpact: FixedPointNumber.ZERO,
          naturalPriceImpact: FixedPointNumber.ZERO,
          midPrice: FixedPointNumber.ZERO
        };
      }),
      map((result) => {
        return {
          result,
          tracker: Object.values(tracker)
        };
      })
    );
  }

  private swapWithCompositePath(
    mode: TradeMode,
    input: FixedPointNumber,
    path: CompositeTradingPath
  ): Observable<AggregateDexSwapResult> {
    if (mode === 'EXACT_OUTPUT') return this.swapWithCompositePathInExactOutput(input, path);

    return this.swapWithCompositePathInExactIntput(input, path);
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

    return of(useablePaths).pipe(
      switchMap((paths) => {
        if (!paths.length) {
          throw new NoTradingPathError();
        }

        return combineLatest(paths.map((path) => this.swapWithCompositePath(mode, input, path)));
      })
    );
  }

  private convertCompositeTradingPathToTxParams(list: SwapResult[]) {
    return list.map((item) => {
      const source = item.source;
      const provider = this.getProvider(source as DexSource);

      return provider.getAggregateTradingPath(item);
    });
  }

  public getTradingTx(result: AggregateDexSwapResult) {
    const { path, output, input, acceptiveSlippage } = result.result;

    const slippage = new FixedPointNumber(1 - (acceptiveSlippage || 0));

    // only contains acala dex
    if (path.length === 1 && path[0][0] === 'acala') {
      const provider = this.getProvider('acala');

      return provider.getTradingTx(result.tracker[0]);
    }

    // only contains nuts dex
    if (path.length === 1 && path[0][0] === 'nuts') {
      const provider = this.getProvider('nuts');

      return provider.getTradingTx(result.tracker[0]);
    }

    // create aggregate tx
    return this.api.tx.aggregatedDex.swapWithExactSupply(
      this.convertCompositeTradingPathToTxParams(result.tracker),
      input.amount.toChainData(),
      output.amount.mul(slippage).toChainData()
    );
  }
}
