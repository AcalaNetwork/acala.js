import { AnyApi } from '@acala-network/sdk-core';
import { FrameSystemAccountInfo } from '@polkadot/types/lookup';
export declare const createStorages: (api: AnyApi) => {
    nativeBalance: (address: string) => import("@acala-network/sdk/utils/storage/storage.js").SubStorage<FrameSystemAccountInfo>;
};
