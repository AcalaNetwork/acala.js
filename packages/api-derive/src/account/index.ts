import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { AccountInfo, Balance, AccountId } from '@polkadot/types/interfaces';
import { ApiInterfaceRx } from '@polkadot/api/types';
import { memo } from '../utils/memo';
import { DerivedAllBalances } from '../types/balance';
import { getNativeCurrencyId, getCurrencyIds } from '../common/token';

/**
 * @name balancs
 * @param {( AccountId | string )} address
 */
export function balance (api: ApiInterfaceRx): (token: string, account: AccountId | string) => Observable<Balance> {
  return memo((token: string, account: AccountId | string) => {
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    const currencyId = api.registry.createType('CurrencyId' as any, token);
    const nativeCurrencyId = getNativeCurrencyId(api);
    if (currencyId.eq(nativeCurrencyId)) {
      return api.query.system.account<AccountInfo>(account).pipe(map((result) => result.data.free));
    }
    return api.query.tokens.balance<Balance>(token, account);
  });
}

/**
 * @name balances
 * @param {( AccountId | string )} address
 */
export function balances (api: ApiInterfaceRx): (account: AccountId | string) => Observable<DerivedAllBalances> {
  return memo((account: AccountId | string) => {
    const queryBalance = balance(api);
    const currencyList = getCurrencyIds(api);
    return combineLatest(currencyList.map((token) => queryBalance(token, account))).pipe(
      map((result) =>
        currencyList.map((token, index) => ({
          token,
          balance: result[index]
        }))
      )
    );
  });
}
