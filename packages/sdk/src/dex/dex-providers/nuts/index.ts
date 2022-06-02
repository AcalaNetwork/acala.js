import { ApiRx } from '@polkadot/api';
import { AnyApi, FixedPointNumber, forceToCurrencyName, Token } from '@acala-network/sdk-core';
import { Wallet } from '@acala-network/sdk/wallet';
import { StableAssetRx, PoolInfo, StableSwapResult } from '@nuts-finance/sdk-stable-asset';
import { BaseSwap, DexSource, SwapParamsWithExactPath, SwapResult, TradingPair, TradingPathItem } from '../../types';
import { NutsDexDontSupportExactOutput, NutsDexOnlySupportApiRx } from './errors';
import { Observable, combineLatest, BehaviorSubject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { NoTradingPathError } from '../../errors';

interface NutsDexConfigs {
  api: AnyApi;
  wallet: Wallet;
}

export class NutsDex implements BaseSwap {
  private api: AnyApi;
  private wallet: Wallet;
  private stableAsset: StableAssetRx;
  public readonly tradingPairs$: Observable<TradingPair[]>;
  private availablePools$: BehaviorSubject<PoolInfo[]>;

  constructor({ api, wallet }: NutsDexConfigs) {
    this.api = api;
    this.wallet = wallet;

    if (api.type === 'promise') {
      throw new NutsDexOnlySupportApiRx();
    }

    this.stableAsset = new StableAssetRx(this.api as ApiRx);
    this.tradingPairs$ = this.initTradingPairs$();
    this.availablePools$ = new BehaviorSubject<PoolInfo[]>([]);
  }

  private initTradingPairs$() {
    return this.stableAsset.getAvailablePools().pipe(
      map((data) => {
        this.availablePools$.next(data);
        const tradingPairs: TradingPair[] = [];

        data.forEach((item) => {
          const assets = item.assets;

          for (let i = 0; i < assets.length; i++) {
            for (let j = i + 1; j < assets.length; j++) {
              tradingPairs.push([this.wallet.__getToken(assets[i]), this.wallet.__getToken(assets[j])] as TradingPair);
            }
          }
        });

        return tradingPairs;
      })
    );
  }

  public get source(): DexSource {
    return 'nuts';
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public filterPath(_path: TradingPathItem): boolean {
    return true;
  }

  private subscribePoolInfo(token0: Token, token1: Token) {
    return this.availablePools$.pipe(
      map((data) => {
        const pool = data.find((item) => {
          const assets = item.assets.map((i) => forceToCurrencyName(i));

          return assets.indexOf(token0.name) !== -1 && assets.indexOf(token1.name) !== -1;
        });

        if (!pool) throw new NoTradingPathError();

        const assets = pool.assets.map((i) => forceToCurrencyName(i));

        return {
          poolId: Number(pool.poolAsset.asStableAssetPoolToken.toString()),
          token0Index: assets.indexOf(token0.name),
          token1Index: assets.indexOf(token1.name)
        };
      })
    );
  }

  private mapStableSwapResultToSwapResult(params: SwapParamsWithExactPath, result: StableSwapResult): SwapResult {
    const { type } = params;
    return {
      source: this.source,
      type: type,
      path: [[this.source, params.path]] as [DexSource, Token[]][],
      input: {
        token: result.inputToken,
        amount: result.inputAmount
      },
      output: {
        token: result.outputToken,
        amount: result.outputAmount
      },
      midPrice: FixedPointNumber.ZERO,
      priceImpact: FixedPointNumber.ZERO,
      naturalPriceImpact: FixedPointNumber.ZERO,
      exchangeFee: result.feeAmount,
      exchangeFeeRate: result.feeAmount.div(result.inputAmount),
      acceptiveSlippage: params.acceptiveSlippage
    };
  }

  public swap(params: SwapParamsWithExactPath): Observable<SwapResult> {
    const { input, path, type, acceptiveSlippage } = params;
    const [token0, token1] = path;

    if (type === 'EXACT_OUTPUT') {
      throw new NutsDexDontSupportExactOutput();
    }

    return combineLatest({
      homaEnv: this.wallet.homa.subscribeEnv(),
      pool: this.subscribePoolInfo(token0, token1)
    }).pipe(
      switchMap(({ homaEnv, pool }) => {
        const exchnageRate = homaEnv.exchangeRate;
        const { poolId, token0Index, token1Index } = pool;

        return this.stableAsset
          .getSwapAmount(poolId, token0Index, token1Index, token0, token1, input, acceptiveSlippage || 0, exchnageRate)
          .pipe(map((result) => this.mapStableSwapResultToSwapResult(params, result)));
      })
    );
  }
}

export * from './errors';
