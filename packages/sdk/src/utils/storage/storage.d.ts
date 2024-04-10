import LRUCache from 'lru-cache';
import { Observable } from 'rxjs';
import { StorageConfig } from './types.js';
/**
 * a tool to create same query interfaces for apiPromise and apiRx
 */
export declare class SubStorage<T = unknown> {
    readonly configs: StorageConfig;
    private subject;
    private chainListener;
    constructor(configs: StorageConfig);
    private subscribe;
    private getQuery;
    private triggerByEvents;
    private queryData;
    private subscribeWithPromiseApi;
    private subscribeWithRxApi;
    get observable(): Observable<T>;
    query(): Promise<T>;
    complated(): void;
}
export declare class Storage {
    static subStorages: LRUCache<string, SubStorage<any>>;
    static create<T = unknown>(configs: StorageConfig): SubStorage<T>;
}
