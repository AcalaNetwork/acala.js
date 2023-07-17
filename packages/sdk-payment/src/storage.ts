import { AnyApi } from "@acala-network/sdk-core";
import { Storage } from "@acala-network/sdk/utils/storage";

export function createStorages (api: AnyApi) {
  return {
    globalFeeSwapPathes: () => {
      return Storage.create({
        api: api,
        path: 'query.transactionPayment.globalFeeSwapPath.entries',
        params: []
      })
    }
  }
}

export type Storages = ReturnType<typeof createStorages>;