import { Observable, combineLatest } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ApiInterfaceRx } from '@polkadot/api/types';

import { AccountId, Position } from '@acala-network/types/interfaces';
import { memo } from '@polkadot/api-derive/util';

import { DerivedUserLoan } from '../types/loan';
import { getAllCollateralCurrencyIds } from '../utils';
import { AcalaPrimitivesCurrencyCurrencyId } from '@polkadot/types/lookup';

/**
 * @name loan
 * @description get user loan information includes debit value and collateral value
 * @param {(AccountId | string)} account
 * @param {(AcalaPrimitivesCurrencyCurrencyId | string)} currency
 */
export function loan(
  instanceId: string,
  api: ApiInterfaceRx
): (account: AccountId | string, currency: AcalaPrimitivesCurrencyCurrencyId) => Observable<DerivedUserLoan> {
  return memo(instanceId, (account: AccountId | string, currency: AcalaPrimitivesCurrencyCurrencyId) =>
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
export function allLoans(
  instanceId: string,
  api: ApiInterfaceRx
): (account: AccountId | string) => Observable<DerivedUserLoan[]> {
  return memo(instanceId, (account: AccountId | string) => {
    const loanQuery = loan(instanceId, api);

    return getAllCollateralCurrencyIds(api).pipe(
      switchMap((collateralCurrencyIds) => {
        return combineLatest(collateralCurrencyIds.map((currency) => loanQuery(account, currency)));
      })
    );
  });
}
