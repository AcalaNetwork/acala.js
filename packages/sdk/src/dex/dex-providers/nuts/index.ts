import { ApiRx } from '@polkadot/api';
import { AnyApi, FixedPointNumber, forceToCurrencyName, Token } from '@acala-network/sdk-core';
import { Wallet } from '@acala-network/sdk/wallet';
import { StableAssetRx, PoolInfo, SwapInResult, SwapOutResult } from '@nuts-finance/sdk-stable-asset';
import { BaseSwap, DexSource, SwapParamsWithExactPath, SwapResult, TradingPair, TradingPathItem } from '../../types';
import { NutsDexOnlySupportApiRx } from './errors';
import { Observable, combineLatest, BehaviorSubject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AmountTooSmall, NoTradingPathError, ParamsNotAcceptableForDexProvider } from '../../errors';
import { SubmittableExtrinsic } from '@polkadot/api/types';
import { ISubmittableResult } from '@polkadot/types/types';

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
    return this.stableAsset.subscribeAllPools().pipe(
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

  public filterPath(path: TradingPathItem): boolean {
    return path[1].length === 2;
  }

  private getPoolInfo(data: PoolInfo[], token0: Token, token1: Token) {
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
  }

  private subscribePoolInfo(token0: Token, token1: Token) {
    return this.availablePools$.pipe(map((data) => this.getPoolInfo(data, token0, token1)));
  }

  private mapStableSwapResultToSwapResult(
    params: SwapParamsWithExactPath,
    result: SwapInResult | SwapOutResult
  ): SwapResult {
    const { mode } = params;

    if (
      result.inputToken.symbol === 'AUSD' ||
      result.inputToken.symbol === 'KUSD' ||
      result.inputToken.symbol === 'USDT' ||
      result.inputToken.symbol === 'USDC' ||
      result.outputToken.symbol === 'AUSD' ||
      result.outputToken.symbol === 'KUSD' ||
      result.outputToken.symbol === 'USDT' ||
      result.outputToken.symbol === 'USDC'
    ) {
      if (Number(result.inputAmount.toNumber()) <= 0.001) throw new AmountTooSmall();
      if (Number(result.outputAmount.toNumber()) <= 0.001) throw new AmountTooSmall();
    }

    return {
      source: this.source,
      mode,
      path: [[this.source, params.path]] as [DexSource, Token[]][],
      input: {
        token: result.inputToken,
        amount: result.inputAmount
      },
      output: {
        token: result.outputToken,
        amount: result.outputAmount
      },
      // no midPrice in nuts pool
      midPrice: FixedPointNumber.ZERO,
      // no priceImpact in nuts pool
      priceImpact: FixedPointNumber.ZERO,
      // no naturalPriceImpact in nuts pool
      naturalPriceImpact: FixedPointNumber.ZERO,
      exchangeFee: result.feeAmount,
      exchangeFeeRate: result.feeAmount.div(result.outputAmount),
      acceptiveSlippage: params.acceptiveSlippage,
      callParams: result.toChainData(),
      call: this.api.tx.stableAsset.swap(...result.toChainData())
    };
  }

  public swap(params: SwapParamsWithExactPath): Observable<SwapResult> {
    const { input, path, mode, acceptiveSlippage } = params;
    const [token0, token1] = path;

    return combineLatest({
      homaEnv: this.wallet.homa.subscribeEnv(),
      pool: this.subscribePoolInfo(token0, token1)
    }).pipe(
      switchMap(({ homaEnv, pool }) => {
        const exchangeRate = homaEnv.exchangeRate;
        const { poolId, token0Index, token1Index } = pool;

        if (mode === 'EXACT_OUTPUT') {
          return this.stableAsset
            .getSwapInAmount(poolId, token0Index, token1Index, input, acceptiveSlippage || 0, exchangeRate)
            .pipe(map((result) => this.mapStableSwapResultToSwapResult(params, result)));
        }

        return this.stableAsset
          .getSwapOutAmount(poolId, token0Index, token1Index, input, acceptiveSlippage || 0, exchangeRate)
          .pipe(map((result) => this.mapStableSwapResultToSwapResult(params, result)));
      })
    );
  }

  public getAggregateTradingPath(result: SwapResult) {
    return { Taiga: [result.callParams?.[0], result.callParams?.[1], result.callParams?.[2]] };
  }

  public getTradingTx(
    result: SwapResult
  ): SubmittableExtrinsic<'promise', ISubmittableResult> | SubmittableExtrinsic<'rxjs', ISubmittableResult> {
    const { path } = result;
    const [source] = path[0];

    if (source !== this.source) throw new ParamsNotAcceptableForDexProvider(this.source);

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return result.call!;
  }
}

export * from './errors';
