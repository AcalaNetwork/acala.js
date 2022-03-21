import { ChainType } from '../types';

export interface HistoryRecord {
  message: string;
  data: Record<string, string>;
  extrinsicHash?: string;
  blokcNumber?: number;
  resolveLinks: {
    subscan: string;
  };
}

export interface History {
  chain: ChainType;
  history: HistoryRecord[];
}

export interface HistoryConfigs {
  fetchEndpoints: {
    transfer: string;
  };
  poolInterval: number;
}

export type HistoryType = 'transfer' | 'swap' | 'honzon' | 'homa' | 'incentive';

export interface HistoryFetcher {
  fetch: (...args: any[]) => Promise<any>;
  transform: (data: any[]) => HistoryRecord[];
}
