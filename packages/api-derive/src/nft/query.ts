import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ApiInterfaceRx } from '@polkadot/api/types';

import { AccountId, ClassId, TokenInfoOf } from '@acala-network/types/interfaces';

import { memo } from '@polkadot/api-derive/util';

const cachedNFTs: Record<string, TokenInfoOf[]> = {};

function queryNFTs (api: ApiInterfaceRx, cid: ClassId): Observable<TokenInfoOf[]> {
  return api.query.ormlNft.tokens.entries(cid).pipe(
    map((entries): TokenInfoOf[] => {
      return entries.map((item) => {
        return item[1] as TokenInfoOf;
      });
    })
  );
}

/**
 * @name queryTokensByAccount
 * @description get `account` nfts at `cid`
 * @param {(AccountId | string)} account
 * @param {CID} cid
 */
export function queryTokensByAccount (instanceId: string, api: ApiInterfaceRx): (account: AccountId | string, cid: ClassId, useCache?: boolean) => Observable<TokenInfoOf[]> {
  return memo(instanceId, (account: AccountId | string, cid: ClassId, useCache = true): Observable<TokenInfoOf[]> => {
    return (useCache && cachedNFTs[cid.toString()] ? of(cachedNFTs[cid.toString()]) : queryNFTs(api, cid)).pipe(
      tap((result) => {
        cachedNFTs[cid.toString()] = result;
      }),
      map((item) => item.filter((info) => {
        return info.owner.toString() === account.toString();
      }))
    );
  });
}

/**
 * @name queryTokensByCID
 * @description get all nfts at `cid`
 * @param {(AccountId | string)} account
 * @param {CID} cid
 */
export function queryTokensByCID (instanceId: string, api: ApiInterfaceRx): (cid: ClassId, useCache?: boolean) => Observable<TokenInfoOf[]> {
  return memo(instanceId, (cid: ClassId, useCache = true): Observable<TokenInfoOf[]> => {
    return (useCache && cachedNFTs[cid.toString()] ? of(cachedNFTs[cid.toString()]) : queryNFTs(api, cid)).pipe(
      tap((result) => {
        cachedNFTs[cid.toString()] = result;
      })
    );
  });
}
