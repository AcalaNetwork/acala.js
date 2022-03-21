import { Wallet } from '../wallet';

export interface ResolveLinks {
  subscan: string;
}

export interface HistoryRecord {
  message: string;
  data: Record<string, any>;
  extrinsicHash?: string;
  blokcNumber?: number;
  resolveLinks: ResolveLinks;
}

export interface HistoryConfigs {
  wallet: Wallet;
  fetchEndpoints: {
    transfer: string;
  };
  poolInterval: number;
}

export interface HistoryFetcherConfig {
  endpoint: string;
  wallet: Wallet;
  poolInterval: number;
}

export type BaseFetchParams = Record<string, any>;
