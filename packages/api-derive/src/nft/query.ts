import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ApiInterfaceRx } from '@polkadot/api/types';
import { Option } from '@polkadot/types';

import { AccountId, ClassId, TokenInfoOf, CID, ClassInfoOf, TokenId } from '@acala-network/types/interfaces';

import { memo } from '@polkadot/api-derive/util';

type OptionTokenInfo = Option<TokenInfoOf>;
type OptionClassInfo = Option<ClassInfoOf>;

interface ClassInfo {
  cid: CID;
  data: OptionClassInfo;
}

interface TokenInfo {
  tokenId: TokenId;
  data: OptionTokenInfo;
}

const cachedNFTs: Record<string, TokenInfo[]> = {};
let cachedClasses: ClassInfo[] = [];

function queryNFTs(api: ApiInterfaceRx, cid: ClassId): Observable<TokenInfo[]> {
  return api.query.ormlNft.tokens.entries(cid).pipe(
    map((entries): TokenInfo[] => {
      return entries.map((item) => {
        const tokenId = api.registry.createType('TokenId', item[0].args[0]);

        return {
          tokenId,
          data: item[1] as OptionTokenInfo
        };
      });
    })
  );
}

function queryClasses(api: ApiInterfaceRx): Observable<ClassInfo[]> {
  return api.query.ormlNft.classes.entries().pipe(
    map((entries): ClassInfo[] => {
      return entries.map((item) => {
        const cid = api.registry.createType('CID', item[0].args[0]);

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
export function queryTokensByAccount(
  instanceId: string,
  api: ApiInterfaceRx
): (account: AccountId | string, cid: ClassId, useCache?: boolean) => Observable<TokenInfo[]> {
  return memo(
    instanceId,
    (account: AccountId | string, cid: ClassId, useCache = true): Observable<TokenInfo[]> => {
      return (useCache && cachedNFTs[cid.toString()] ? of(cachedNFTs[cid.toString()]) : queryNFTs(api, cid)).pipe(
        tap((result) => {
          cachedNFTs[cid.toString()] = result;
        }),
        map((item) =>
          item.filter((info) => {
            return info.data.unwrap().owner.toString() === account.toString();
          })
        )
      );
    }
  );
}

/**
 * @name queryTokensByCID
 * @description get all nfts at `cid`
 * @param {(AccountId | string)} account
 * @param {CID} cid
 */
export function queryTokensByCID(
  instanceId: string,
  api: ApiInterfaceRx
): (cid: ClassId, useCache?: boolean) => Observable<TokenInfo[]> {
  return memo(
    instanceId,
    (cid: ClassId, useCache = false): Observable<TokenInfo[]> => {
      return (useCache && cachedNFTs[cid.toString()] ? of(cachedNFTs[cid.toString()]) : queryNFTs(api, cid)).pipe(
        tap((result) => {
          cachedNFTs[cid.toString()] = result;
        })
      );
    }
  );
}

export function queryAllClasses(
  instanceId: string,
  api: ApiInterfaceRx
): (useCache?: boolean) => Observable<ClassInfo[]> {
  return memo(
    instanceId,
    (useCache = false): Observable<ClassInfo[]> => {
      return (useCache ? of(cachedClasses) : queryClasses(api)).pipe(
        tap((result) => {
          cachedClasses = result;
        })
      );
    }
  );
}
