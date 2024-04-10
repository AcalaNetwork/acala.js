import { HistoryConfigs } from './types.js';
import { Transfers } from './fetchers/transfers.js';
import { Swaps } from './fetchers/swap.js';
import { Earns } from './fetchers/earn.js';
import { Loans } from './fetchers/loan.js';
import { Homas } from './fetchers/homa.js';
export declare class History {
    readonly configs: HistoryConfigs;
    readonly transfer: Transfers;
    readonly swap: Swaps;
    readonly earn: Earns;
    readonly loan: Loans;
    readonly homa: Homas;
    constructor(configs: HistoryConfigs);
}
