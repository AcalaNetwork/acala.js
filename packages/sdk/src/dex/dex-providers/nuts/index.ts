import { ApiRx } from '@polkadot/api';
import { AnyApi } from '@acala-network/sdk-core';
import { Wallet } from '@acala-network/sdk/wallet';
import { StableAssetRx } from '@nuts-finance/sdk-stable-asset';
import { BaseSwap, DexSource, SwapParamsWithExactPath, SwapResult, TradingPair, TradingPathItem } from '../../types';
import { NutsDexOnlySupportApiRx } from './errors';
import { Observable, of } from 'rxjs';

interface NutsDexConfigs {
  api: AnyApi;
  wallet: Wallet;
}

export class NutsDex implements BaseSwap {
  private api: AnyApi;
  private wallet: Wallet;
  private stableAsset: StableAssetRx;
  public readonly tradingPairs$: Observable<TradingPair[]>;

  constructor({ api, wallet }: NutsDexConfigs) {
    this.api = api;
    this.wallet = wallet;

    if (api.type === 'promise') {
      throw new NutsDexOnlySupportApiRx();
    }

    this.stableAsset = new StableAssetRx(this.api as ApiRx);
    this.tradingPairs$ = this.initTradingPairs$();
  }

  private initTradingPairs$() {
    const tradingPairs: TradingPair[] = [];
    this.stableAsset.availablePools.forEach((item) => {
      const assets = item.assets;

      for (let i = 0; i < assets.length; i++) {
        for (let j = i; j < assets.length; j++) {
          tradingPairs.push([this.wallet.__getToken(assets[i]), this.wallet.__getToken(assets[j])] as TradingPair);
        }
      }
    });

    return of(tradingPairs);
  }

  public get source(): DexSource {
    return 'nuts';
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public filterPath(_path: TradingPathItem): boolean {
    return true;
  }

  public swap(params: SwapParamsWithExactPath): Observable<SwapResult> {
    return of(null as any);
  }
}

export * from './errors';
