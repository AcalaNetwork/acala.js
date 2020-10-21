import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiInterfaceRx } from '@polkadot/api/types';

import { CurrencyId, AccountId, Position } from '@acala-network/types/interfaces';
import { memo } from '@polkadot/api-derive/util';

import { DerivedUserLoan } from '../types/loan';
import { getCollateralCurrencyIds } from '../helps/currency';

/**
 * @name loan
 * @description get user loan information includes debit value and collateral value
 * @param {(AccountId | string)} account
 * @param {(CurrencyId | string)} currency
 */
export function loan (instanceId: string, api: ApiInterfaceRx): (account: AccountId | string, currency: CurrencyId) => Observable<DerivedUserLoan> {
  return memo(instanceId, (account: AccountId | string, currency: CurrencyId) =>
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
export function allLoans (instanceId: string, api: ApiInterfaceRx): (account: AccountId | string) => Observable<DerivedUserLoan[]> {
  return memo(instanceId, (account: AccountId | string) => {
    const collateralCurrencyIds = getCollateralCurrencyIds(api);
    const loanQuery = loan(instanceId, api);

    return combineLatest(collateralCurrencyIds.map((currency) => loanQuery(account, currency)));
  });
}
