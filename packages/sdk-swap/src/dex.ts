import { AnyApi, FixedPointNumber, Token } from '@acala-network/sdk-core';
import {
  BehaviorSubject,
  catchError,
  combineLatest,
  filter,
  firstValueFrom,
  map,
  Observable,
  of,
  switchMap
} from 'rxjs';
import { Wallet, BaseSDK } from '@acala-network/sdk';
import { NoTradingPathError } from './errors.js';
import { TradingGraph } from './trading-graph.js';
import {
  AggregateDexConfigs,
  AggregateDexSwapParams,
  BaseSwap,
  DexSource,
  TradeMode,
  CompositeTradingPath,
  SwapResult,
  AggregateDexSwapResult,
  SwapSource,
  OverwriteCallParams
} from './types.js';

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
    this.configs = this.getConfigs(configs);

    this.init().subscribe({
      next: () => {
        this.status.next(true);
      }
    });
  }

  private getConfigs(configs: AggregateDexConfigs) {
    return {
      aggregateLimit:
        configs.overwrite?.aggregateLimit ||
        (this.api.consts.aggregatedDex.swapPathLimit.toNumber() as unknown as number)
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

  public getTradingPaths(start: Token, end: Token, source?: DexSource): CompositeTradingPath[] {
    return this.tradingGraph
      .getTradingPaths({
        start,
        end,
        aggreagetLimit: this.configs.aggregateLimit
      })
      .filter((path) => {
        // check all path is validate
        return path.reduce((acc, item) => {
          const provider = this.getProvider(item[0]);

          if (!provider) return false;

          return acc && provider.filterPath(item);
        }, true as boolean);
      })
      .filter((path) => {
        if (source) {
          return path.length === 1 && path[0][0] === source;
        }

        return path;
      });
  }

  public getProvider(source: DexSource): BaseSwap {
    // never failed
    return this.providers.find((i) => i.source === source) as BaseSwap;
  }

  private swapWithCompositePathInExactIntput(
    input: FixedPointNumber,
    path: CompositeTradingPath,
    acceptiveSlippage = 0
  ): Observable<AggregateDexSwapResult> {
    const [first] = path;
    const tracker: Record<number, SwapResult> = {};

    const fn = (count: number, max: number, params: SwapResult): Observable<SwapResult> => {
      tracker[count - 1] = { ...params };

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
          acceptiveSlippage,
          path: current[1]
        })
        .pipe(
          switchMap((result) => {
            return fn(count + 1, max, result);
          })
        );
    };

    const createFirstTrading = () => {
      const path = first;
      const provider = this.getProvider(path[0]);

      return provider.swap({
        source: path[0],
        mode: 'EXACT_INPUT',
        input,
        acceptiveSlippage,
        path: path[1]
      });
    };

    return createFirstTrading().pipe(
      switchMap((result) => {
        return fn(1, path.length, result);
      }),
      map((result) => {
        return {
          ...result,
          source: 'aggregate' as SwapSource,
          input: {
            token: first[1][0],
            amount: input
          },
          path,
          // for aggregate result doesn't support those
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
      }),
      catchError((e) => {
        return of({
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          error: e,
          result: undefined as any as SwapResult,
          tracker: []
        });
      })
    );
  }

  private swapWithCompositePathInExactOutput(
    input: FixedPointNumber,
    path: CompositeTradingPath,
    acceptiveSlippage = 0
  ): Observable<AggregateDexSwapResult> {
    const len = path.length;
    const last = path[len - 1];
    const tracker: Record<number, SwapResult> = {};

    const fn = (count: number, min: number, params: SwapResult): Observable<SwapResult> => {
      tracker[count + 1] = { ...params };

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
          acceptiveSlippage,
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
        acceptiveSlippage,
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
          source: 'aggregate' as SwapSource,
          output: {
            token: lastPath[lastPath.length - 1],
            amount: input
          },
          path,
          // for aggregate result doesn't support those
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
      }),
      catchError((e) => {
        return of({
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          error: e,
          result: undefined as any as SwapResult,
          tracker: []
        });
      })
    );
  }

  private swapWithCompositePath(
    mode: TradeMode,
    input: FixedPointNumber,
    path: CompositeTradingPath,
    acceptiveSlippage?: number
  ): Observable<AggregateDexSwapResult> {
    if (mode === 'EXACT_OUTPUT') return this.swapWithCompositePathInExactOutput(input, path, acceptiveSlippage);

    return this.swapWithCompositePathInExactIntput(input, path, acceptiveSlippage);
  }

  private getBestSwapResult(mode: TradeMode, resultList: AggregateDexSwapResult[]) {
    const successedList = resultList.filter((item) => !!item.result);

    if (successedList.length === 0) throw resultList[0].error;

    if (mode === 'EXACT_INPUT') {
      const result = successedList.slice(1).reduce((acc, cur) => {
        return acc.result.output.amount.gt(cur.result.output.amount) ? acc : cur;
      }, successedList[0]);

      result.result.call = this.getTradingTx(result);

      return result;
    }

    // exact output
    const result = successedList.slice(1).reduce((acc, cur) => {
      return acc.result.input.amount.lt(cur.result.input.amount) ? acc : cur;
    }, successedList[0]);

    result.result.call = this.getTradingTx(result);

    return result;
  }

  public swap(params: AggregateDexSwapParams) {
    const { mode } = params;

    return this.swapWithAllTradeablePath(params).pipe(map((results) => this.getBestSwapResult(mode, results)));
  }

  public swapWithAllTradeablePath(params: AggregateDexSwapParams) {
    const { path, source, mode, input, acceptiveSlippage } = params;
    let useablePaths = this.getTradingPaths(path[0], path[1]);

    if (source !== 'aggregate') {
      // remove include other source path when source is not aggregate
      useablePaths = useablePaths.filter((path) => {
        return path.reduce((acc, item) => {
          return acc && source === item[0];
        }, true as boolean);
      });
    }

    return of(useablePaths).pipe(
      switchMap((paths) => {
        if (!paths.length) {
          throw new NoTradingPathError();
        }

        return combineLatest(paths.map((path) => this.swapWithCompositePath(mode, input, path, acceptiveSlippage)));
      })
    );
  }

  private convertCompositeTradingPathToTxParams(list: SwapResult[]) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return list.map((item) => {
      const source = item.source;
      const provider = this.getProvider(source as DexSource);

      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return provider.getAggregateTradingPath(item);
    });
  }

  public getTradingTx(result: AggregateDexSwapResult, overwrite?: OverwriteCallParams) {
    const { path, output, input, acceptiveSlippage, mode } = result.result;

    // only contains acala dex
    if (path.length === 1 && path[0][0] === 'acala') {
      const provider = this.getProvider('acala');

      return provider.getTradingTx(result.tracker[0], overwrite);
    }

    // only contains nuts dex
    if (path.length === 1 && path[0][0] === 'nuts') {
      const provider = this.getProvider('nuts');

      return provider.getTradingTx(result.tracker[0], overwrite);
    }

    if (mode === 'EXACT_OUTPUT') {
      const slippage = new FixedPointNumber(1 + (acceptiveSlippage || 0));

      // create aggregate tx
      return this.api.tx.aggregatedDex.swapWithExactSupply(
        this.convertCompositeTradingPathToTxParams(result.tracker),
        overwrite?.input ? overwrite.input.toChainData() : input.amount.mul(slippage).toChainData(),
        overwrite?.output ? overwrite.output.toChainData() : output.amount.toChainData()
      );
    }

    const slippage = new FixedPointNumber(1 - (acceptiveSlippage || 0));

    // create aggregate tx
    return this.api.tx.aggregatedDex.swapWithExactSupply(
      this.convertCompositeTradingPathToTxParams(result.tracker),
      overwrite?.input ? overwrite.input.toChainData() : input.amount.toChainData(),
      overwrite?.output ? overwrite.output.toChainData() : output.amount.mul(slippage).toChainData()
    );
  }
}
