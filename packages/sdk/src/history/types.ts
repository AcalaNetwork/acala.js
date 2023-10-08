import { Wallet } from '../wallet';

export interface ResolveLinks {
  subscan: string;
}

export interface HistoryRecord {
  message: string;
  data: Record<string, any>;
  extrinsicHash?: string;
  blockNumber?: string;
  timestamp?: string;
  resolveLinks: ResolveLinks;
  method: string;
}

export interface HistoryConfigs {
  wallet: Wallet;
  fetchEndpoints: {
    transfer: string;
    swap: string;
    earn: string;
    loan: string;
    homa: string;
    staking?: string;
  };
  poolInterval: number;
}

export interface HistoryFetcherConfig {
  endpoint: string;
  wallet: Wallet;
  poolInterval: number;
}

export type BaseFetchParams = Record<string, any>;
