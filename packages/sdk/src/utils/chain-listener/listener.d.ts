import { Observable, ReplaySubject } from 'rxjs';
import { ChainListenerConfigs, EventFilterConfigs, BlockDetails } from './types.js';
export declare class ChainListener {
    private api;
    readonly block$: ReplaySubject<BlockDetails>;
    private subscriptions;
    private static instances;
    constructor({ api }: ChainListenerConfigs);
    static create({ api, key }: ChainListenerConfigs): ChainListener;
    private subscribeBlockRx;
    private subscribeBlockPromise;
    private subscribeBlock;
    unsubscribe(): void;
    subscribeByEvents(configs: EventFilterConfigs): Observable<{
        extrinsics: import("./types.js").Extrinsic[];
        events: import("@polkadot/types/lookup").FrameSystemEventRecord[];
        block: import("@polkadot/types/interfaces").SignedBlock;
        timestamp: Date;
    }>;
}
