import { ApiPromise, ApiRx } from '@polkadot/api';
import { ApiTypes, QueryableStorageEntry } from '@polkadot/api/types';
import { EventFilterConfigs } from '../chain-listener/index.js';
export interface StorageConfig {
    api: ApiPromise | ApiRx;
    path?: string;
    query?: QueryableStorageEntry<ApiTypes, any>;
    params: any[];
    at?: number;
    events?: EventFilterConfigs;
}
