import { AnyApi } from '@acala-network/sdk-core';
import { Storage } from '@acala-network/sdk/utils/storage';
import { AcalaPrimitivesCurrencyCurrencyId } from '@polkadot/types/lookup';
import { Option, Vec, StorageKey } from '@polkadot/types';

export function createStorages(api: AnyApi) {
  return {
    globalFeeSwapPathes: () => {
      return Storage.create<
        [StorageKey<[AcalaPrimitivesCurrencyCurrencyId]>, Option<Vec<AcalaPrimitivesCurrencyCurrencyId>>][]
      >({
        api: api,
        path: 'query.transactionPayment.globalFeeSwapPath.entries',
        params: []
      });
    }
  };
}

export type Storages = ReturnType<typeof createStorages>;
