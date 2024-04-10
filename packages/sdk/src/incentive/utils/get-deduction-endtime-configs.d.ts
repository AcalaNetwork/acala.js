import { StorageKey, u32, Vec, Option } from '@polkadot/types';
import { PalletSchedulerScheduled } from '@polkadot/types/lookup';
import { AnyApi } from '@acala-network/sdk-core';
export declare function getDeductionEndtimeConfigs(api: AnyApi, data: [StorageKey<[u32]>, Vec<Option<PalletSchedulerScheduled>>][]): Record<string, number>;
