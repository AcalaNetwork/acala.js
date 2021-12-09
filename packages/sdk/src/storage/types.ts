import { ApiPromise, ApiRx } from '@polkadot/api';

interface TriggleEvent {
  method: string;
  section: string;
}

export interface StorageConfigs {
  api: ApiPromise | ApiRx;
  path: string;
  params: any[];
  at?: number;
  triggleEvents?: TriggleEvent[];
}
