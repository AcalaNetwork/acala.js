import { AnyApi } from '@acala-network/sdk-core';
import { Wallet } from '@acala-network/sdk/wallet';
import { AcalaPrimitivesTradingPair, ModuleDexTradingPairStatus } from '@acala-network/types/interfaces/types-lookup';
import { StorageKey } from '@polkadot/types';
import { map, Observable } from 'rxjs';
import { Storage } from '../../../utils/storage';
import { BaseSwap, DexSource, TradingPair } from '../../types';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const createStorages = (api: AnyApi) => {
  return {
    tradingPairs: () =>
      Storage.create<[StorageKey<[AcalaPrimitivesTradingPair]>, ModuleDexTradingPairStatus][]>({
        api: api,
        path: 'query.dex.tradingPairStatuses.entries',
        params: [],
        triggleEvents: [
          { method: 'EnableTradingPair', section: 'dex' },
          { method: 'ProvisioningToEnabled', section: 'dex' },
          { method: 'DisableTradingPair', section: 'dex' }
        ]
      })
  };
};

interface AcalaDexConfigs {
  api: AnyApi;
  wallet: Wallet;
}

export class AcalaDex implements BaseSwap {
  private api: AnyApi;
  private wallet: Wallet;
  private storages: ReturnType<typeof createStorages>;
  public readonly tradingPairs$: Observable<TradingPair[]>;

  constructor({ api, wallet }: AcalaDexConfigs) {
    this.api = api;
    this.wallet = wallet;
    this.storages = createStorages(api);

    this.tradingPairs$ = this.initTradingPairs$();
  }

  private initTradingPairs$() {
    const storage = this.storages.tradingPairs();

    return storage.observable.pipe(
      map((data) => {
        return data
          .filter(([, value]) => value.isEnabled)
          .map(([key]) => {
            return [this.wallet.__getToken(key.args[0][0]), this.wallet.__getToken(key.args[0][1])] as TradingPair;
          });
      })
    );
  }

  public get source(): DexSource {
    return 'acala';
  }
}
