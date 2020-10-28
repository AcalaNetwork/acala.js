import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ApiInterfaceRx } from '@polkadot/api/types';
import { Option } from '@polkadot/types';

import { AccountId, ClassId, TokenInfoOf, CID, ClassInfoOf } from '@acala-network/types/interfaces';

import { memo } from '@polkadot/api-derive/util';

type OptionTokenInfo = Option<TokenInfoOf>;
type OptionClassInfo = Option<ClassInfoOf>;

interface ClassInfo {
  cid: CID;
  data: OptionClassInfo;
}

const cachedNFTs: Record<string, OptionTokenInfo[]> = {};
let cachedClasses: ClassInfo[] = [];

function queryNFTs (api: ApiInterfaceRx, cid: ClassId): Observable<OptionTokenInfo[]> {
  return api.query.ormlNft.tokens.entries(cid).pipe(
    map((entries): OptionTokenInfo[] => {
      return entries.map((item) => {
        return item[1] as OptionTokenInfo;
      });
    })
  );
}

function queryClasses (api: ApiInterfaceRx): Observable<ClassInfo[]> {
  return api.query.ormlNft.classes.entries().pipe(
    map((entries): ClassInfo[] => {
      return entries.map((item) => {
        const cid = api.registry.createType('CID', item[0]);

        return {
          cid,
          data: item[1] as OptionClassInfo
        };
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
export function queryTokensByAccount (instanceId: string, api: ApiInterfaceRx): (account: AccountId | string, cid: ClassId, useCache?: boolean) => Observable<OptionTokenInfo[]> {
  return memo(instanceId, (account: AccountId | string, cid: ClassId, useCache = true): Observable<OptionTokenInfo[]> => {
    return (useCache && cachedNFTs[cid.toString()] ? of(cachedNFTs[cid.toString()]) : queryNFTs(api, cid)).pipe(
      tap((result) => {
        cachedNFTs[cid.toString()] = result;
      }),
      map((item) => item.filter((info) => {
        return info.unwrap().owner.toString() === account.toString();
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
export function queryTokensByCID (instanceId: string, api: ApiInterfaceRx): (cid: ClassId, useCache?: boolean) => Observable<OptionTokenInfo[]> {
  return memo(instanceId, (cid: ClassId, useCache = false): Observable<OptionTokenInfo[]> => {
    return (useCache && cachedNFTs[cid.toString()] ? of(cachedNFTs[cid.toString()]) : queryNFTs(api, cid)).pipe(
      tap((result) => {
        cachedNFTs[cid.toString()] = result;
      })
    );
  });
}

export function queryAllClasses (instanceId: string, api: ApiInterfaceRx): (useCache?: boolean) => Observable<ClassInfo[]> {
  return memo(instanceId, (useCache = false): Observable<ClassInfo[]> => {
    return (useCache ? of(cachedClasses) : queryClasses(api)).pipe(
      tap((result) => {
        cachedClasses = result;
      })
    );
  });
}
