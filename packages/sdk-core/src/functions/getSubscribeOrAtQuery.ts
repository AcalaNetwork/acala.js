import { BlockHash } from '@polkadot/types/interfaces';
import { Observable } from '@polkadot/types/types';

export const getSubscribeOrAtQuery = <T extends (...arg: any[]) => Observable<any> = any>(
  query: T,
  at?: string | BlockHash
): T => {
  return ((...params: Parameters<T>) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (at) (query as unknown as any).at(at, ...params);

    return query(...params);
  }) as any as T;
};

export const getPromiseOrAtQuery = <T extends (...arg: any[]) => Promise<any> = any>(
  query: T,
  at?: string | BlockHash
): T => {
  return ((...params: Parameters<T>) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (at) (query as unknown as any).at(at, ...params);

    return query(...params);
  }) as any as T;
};
