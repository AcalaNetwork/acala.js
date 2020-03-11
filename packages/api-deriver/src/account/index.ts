import { ApiRx } from "@polkadot/api";
import { Observable, of, combineLatest } from "rxjs";
import { DerivedBalance, DerivedAccountBalances } from "../types/balance";
import { mergeMap, map } from "rxjs/operators";
import { QueryOption } from "../types/query";
import { queryWrapper } from "../utils/queryWrapper";
import { AccountInfo } from '@polkadot/types/interfaces';

// query asset balance of account
export function balance(api: ApiRx, asset: string, account: string, option?: QueryOption): Observable<DerivedBalance> {
    return of(asset).pipe(
        mergeMap((asset: string) => {
            if (asset.toLowerCase() === 'aca') {
                return queryWrapper<Observable<AccountInfo>>(api.query.system.account, [account], option).pipe(
                    map((balance) => {
                        return { asset, balance: balance.data.free};
                    })
                );
            }
            return queryWrapper(api.query.tokens.balance, [asset, account], option).pipe(
                map((balance) => {
                    return { asset, balance };
                })
            );
        }),
    )
}

// query all asset balance of account
export function accountBalances(api: ApiRx, account: string, option?: QueryOption): Observable<DerivedAccountBalances> {
    const currencyId = api.createType('CurrencyId');
    const currencyIds = currencyId.defKeys.map(id => id);
    return combineLatest(currencyIds.map( (asset: string) => {
        return balance(api, asset, account, option);
    })).pipe(
        map(result => ({
            account,
            balances: result
        }))
    );
}