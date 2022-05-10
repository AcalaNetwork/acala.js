import { AnyApi } from '@acala-network/sdk-core';
import { AccountInfo } from '@polkadot/types/interfaces';
import { Storage } from '../utils/storage';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const createStorages = (api: AnyApi) => {
  return {
    nativeBalance: (address: string) =>
      Storage.create<AccountInfo>({
        api: api,
        path: 'query.system.account',
        params: [address]
      })
  };
};
