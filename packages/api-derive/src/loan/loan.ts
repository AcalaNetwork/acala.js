import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiInterfaceRx } from '@polkadot/api/types';

import { CurrencyId, AccountId, Position } from '@acala-network/types/interfaces';

import { memo } from '../utils/memo';
import { DerivedUserLoan } from '../types/loan';
import { getCollateralCurrencyIds } from '../helps/currency';

/**
 * @name loan
 * @description get user loan information includes debit value and collateral value
 * @param {(AccountId | string)} account
 * @param {(CurrencyId | string)} currency
 */
export function loan (
  api: ApiInterfaceRx
): (account: AccountId | string, currency: CurrencyId | string) => Observable<DerivedUserLoan> {
  return memo((account: AccountId | string, currency: CurrencyId | string) =>
    api.query.loans.positions<Position>(currency, account).pipe(
      map((result) => {
        const { debit, collateral } = result;

        return { account, currency, debit, collateral };
      })
    )
  );
}

/**
 * @name allLoans
 * @description get all user loans information includes debit value and collateral value
 * @param {(AccountId | string)} account
 */
export function allLoans (
  api: ApiInterfaceRx
): (account: AccountId | string) => Observable<DerivedUserLoan[]> {
  return memo((account: AccountId | string) => {
    const collateralCurrencyIds = getCollateralCurrencyIds(api);
    const loanQuery = loan(api);

    return combineLatest(collateralCurrencyIds.map((currency) => loanQuery(account, currency)));
  });
}
