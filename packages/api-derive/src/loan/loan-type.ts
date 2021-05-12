import { Observable, combineLatest } from '@polkadot/x-rxjs';
import { map } from '@polkadot/x-rxjs/operators';

import { ApiInterfaceRx } from '@polkadot/api/types';
import { memo } from '@polkadot/api-derive/util';

import { CurrencyId, Rate, ExchangeRate, Balance, Position, Ratio } from '@acala-network/types/interfaces';

import { DerivedLoanConstants, DerivedLoanType, DerivedLoanOverView, CollateralParams } from '../types/loan';
import { getAllCollateralCurrencyIds } from '../utils';

/**
 * @name loanConstants
 * @description get constants in loan module
 */
function loanConstants(api: ApiInterfaceRx): DerivedLoanConstants {
  return {
    minimumDebitValue: api.consts.cdpEngine.minimumDebitValue as Balance,
    defaultDebitExchangeRate: api.consts.cdpEngine.defaultDebitExchangeRate as ExchangeRate,
    defaultLiquidationRatio: api.consts.cdpEngine.defaultLiquidationRatio as Ratio,
    defaultLiquidationPenalty: api.consts.cdpEngine.defaultLiquidationPenalty as Rate,
  };
}

/**
 * @name loanType
 * @description get loan type
 * @param {(CurrencyId | string)} currency
 */
export function loanType(
  instanceId: string,
  api: ApiInterfaceRx
): (currncy: CurrencyId | string) => Observable<DerivedLoanType> {
  return memo(instanceId, (currency: CurrencyId | string) => {
    return combineLatest([
      api.query.cdpEngine.globalInterestRatePerSec<Rate>(),
      api.query.cdpEngine.debitExchangeRate<Rate>(currency),
      api.query.cdpEngine.collateralParams<CollateralParams>(currency)
    ]).pipe(
      map((result) => {
        const constants = loanConstants(api);
        const [globalInterestRatePerSec, debitExchangeRate, collateralParams] = result;

        return {
          currency,
          debitExchangeRate: debitExchangeRate.isEmpty ? constants.defaultDebitExchangeRate : debitExchangeRate,
          liquidationPenalty: collateralParams.liquidationPenalty.isEmpty
            ? constants.defaultLiquidationPenalty
            : collateralParams.liquidationPenalty,
          liquidationRatio: collateralParams.liquidationRatio.isEmpty
            ? constants.defaultLiquidationRatio
            : collateralParams.liquidationRatio,
          requiredCollateralRatio: collateralParams.requiredCollateralRatio,
          interestRatePerSec: collateralParams.interestRatePerSec,
          globalInterestRatePerSec: globalInterestRatePerSec,
          maximumTotalDebitValue: collateralParams.maximumTotalDebitValue,
          minimumDebitValue: constants.minimumDebitValue
        };
      })
    );
  });
}

/**
 * @name allLoanTypes
 * @description  get loan types of all kinds of collateral
 */
export function allLoanTypes(instanceId: string, api: ApiInterfaceRx): () => Observable<DerivedLoanType[]> {
  return memo(instanceId, () => {
    const collateralCurrencyIds = getAllCollateralCurrencyIds(api);
    const loanTypeQuery = loanType(instanceId, api);

    return combineLatest(collateralCurrencyIds.map((currencyId) => loanTypeQuery(currencyId)));
  });
}

/**
 * @name loanOverview
 * @description get loan overview includes total debit, total collateral
 * @param {(CurrencyId | string)} currency
 */
export function loanOverview(
  instanceId: string,
  api: ApiInterfaceRx
): (currency: CurrencyId) => Observable<DerivedLoanOverView> {
  return memo(instanceId, (currency: CurrencyId) =>
    api.query.loans.totalPositions<Position>(currency).pipe(
      map((result) => {
        const { collateral, debit } = result;

        return { currency, totalDebit: debit, totalCollateral: collateral };
      })
    )
  );
}

/**
 * @name allLoanOverview
 * @description get loan overviews of all kinds of collatearl
 */
export function allLoanOverviews(instanceId: string, api: ApiInterfaceRx): () => Observable<DerivedLoanOverView[]> {
  return memo(instanceId, () => {
    const collateralCurrencyIds = getAllCollateralCurrencyIds(api);
    const loanOverViewQuery = loanOverview(instanceId, api);

    return combineLatest(collateralCurrencyIds.map((currencyId) => loanOverViewQuery(currencyId)));
  });
}
