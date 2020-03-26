import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { CurrencyId, Balance, AccountId } from '@acala-network/types/interfaces/runtime';
import { ApiInterfaceRx } from '@polkadot/api/types';
import { memo } from '../utils/memo';
import { DerivedUserLoan } from '../types/loan';

/**
 * @name userLoan
 * @description get user loan information includes debit value and collateral value
 * @param {(AccountId | string)} account
 * @param {(CurrencyId | string)} token
 */
export function userLoan (
  api: ApiInterfaceRx
): (account: AccountId | string, token: CurrencyId | string) => Observable<DerivedUserLoan> {
  return memo((account: AccountId | string, token: CurrencyId | string) =>
    combineLatest([
      api.query.loans.debits<Balance>(token, account),
      api.query.loans.collaterals<Balance>(account, token)
    ]).pipe(
      map((result) => {
        const [debits, collaterals] = result;
        return { account, token, debits, collaterals };
      })
    )
  );
}
