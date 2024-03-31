import { BlockHash } from '@polkadot/types/interfaces';
import { Observable } from '@polkadot/types/types';
export declare const getSubscribeOrAtQuery: <T extends (...arg: any[]) => Observable<any> = any>(query: T, at?: string | BlockHash) => T;
export declare const getPromiseOrAtQuery: <T extends (...arg: any[]) => Promise<any> = any>(query: T, at?: string | BlockHash) => T;
