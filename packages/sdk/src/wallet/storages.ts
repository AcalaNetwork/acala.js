import { AnyApi } from '@acala-network/sdk-core';
import { Storage } from '../utils/storage/index.js';
import { FrameSystemAccountInfo } from '@polkadot/types/lookup';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const createStorages = (api: AnyApi) => {
  return {
    nativeBalance: (address: string) =>
      Storage.create<FrameSystemAccountInfo>({
        api: api,
        path: 'query.system.account',
        params: [address]
      })
  };
};
