import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { CurrencyId, Balance, AccountId, DebitBalance } from '@acala-network/types/interfaces';
import { ApiInterfaceRx } from '@polkadot/api/types';
import { memo } from '../utils/memo';
import { DerivedUserLoan } from '../types/loan';
import { getCollateralCurrencyIds } from '../helps/token';

/**
 * @name loan
 * @description get user loan information includes debit value and collateral value
 * @param {(AccountId | string)} account
 * @param {(CurrencyId | string)} token
 */
export function loan (
  api: ApiInterfaceRx
): (account: AccountId | string, token: CurrencyId | string) => Observable<DerivedUserLoan> {
  return memo((account: AccountId | string, token: CurrencyId | string) =>
    combineLatest([
      /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
      api.query.loans.debits<DebitBalance>(token, account),
      api.query.loans.collaterals<Balance>(account, token)
    ]).pipe(
      map((result) => {
        const [debits, collaterals] = result;
        return { account, token, debits: debits, collaterals };
      })
    )
  );
}

/**
 * @name allLoans
 * @description get all user loans information includes debit value and collateral value
 * @param {(AccountId | string)} account
 * @param {(CurrencyId | string)} token
 */
export function allLoans (
  api: ApiInterfaceRx
): (account: AccountId | string, token: CurrencyId | string) => Observable<DerivedUserLoan[]> {
  return memo((account: AccountId | string) => {
    const currencyIds = getCollateralCurrencyIds(api);
    const loanQuery = loan(api);
    return combineLatest(currencyIds.map((currencyId) => loanQuery(account, currencyId)));
  });
}
