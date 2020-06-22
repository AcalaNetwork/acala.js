import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiInterfaceRx } from '@polkadot/api/types';
import { Codec } from '@polkadot/types/types';

import { CurrencyId, Rate, ExchangeRate, Balance } from '@acala-network/types/interfaces';

import { memo } from '../utils/memo';
import { DerivedLoanConstants, DerivedLoanType, DerivedLoanOverView, CollateralParams } from '../types/loan';
import { getCollateralCurrencyIds } from '../helps/token';

/**
 * @name loanConstants
 * @description get constants in loan module
 */
function loanConstants (api: ApiInterfaceRx): DerivedLoanConstants {
  return {
    minimumDebitValue: api.consts.cdpEngine.minimumDebitValue as Balance,
    defaultDebitExchangeRate: api.consts.cdpEngine.defaultDebitExchangeRate as Rate,
    defaultLiquidationRatio: api.consts.cdpEngine.defaultLiquidationRatio as ExchangeRate,
    defaultLiquidationPenalty: api.consts.cdpEngine.defaultLiquidationPenalty as Rate,
    expectedBlockTime: api.consts.babe.expectedBlockTime
  };
}

/**
 * @name loanType
 * @description get loan type
 * @param {(CurrencyId | string)} token
 */
export function loanType (api: ApiInterfaceRx): (token: CurrencyId | string) => Observable<DerivedLoanType> {
  return memo((token: CurrencyId | string) => {
    return combineLatest([
      api.query.cdpEngine.globalStabilityFee<Rate>(),
      api.query.cdpEngine.debitExchangeRate<Rate>(token),
      api.query.cdpEngine.collateralParams<CollateralParams>(token)
    ]).pipe(
      map((result) => {
        const constants = loanConstants(api);
        const [globalStabilityFee, debitExchangeRate, collateralParams] = result;
        return {
          token,
          debitExchangeRate: (debitExchangeRate as Codec).isEmpty ? constants.defaultDebitExchangeRate : debitExchangeRate,
          liquidationPenalty: collateralParams.liquidationPenalty.isEmpty ? constants.defaultLiquidationPenalty : collateralParams.liquidationPenalty,
          liquidationRatio: collateralParams.liquidationRatio.isEmpty ? constants.defaultLiquidationRatio : collateralParams.liquidationRatio,
          requiredCollateralRatio: collateralParams.requiredCollateralRatio,
          stabilityFee: collateralParams.stabilityFee,
          globalStabilityFee: globalStabilityFee,
          maximumTotalDebitValue: collateralParams.maximumTotalDebitValue,
          minimumDebitValue: constants.minimumDebitValue,
          expectedBlockTime: constants.expectedBlockTime
        };
      })
    );
  });
}

/**
 * @name allLoanTypes
 * @description  get loan types of all kinds of collateral
 */
export function allLoanTypes (api: ApiInterfaceRx): () => Observable<DerivedLoanType[]> {
  return memo(() => {
    const currencyIds = getCollateralCurrencyIds(api);
    const loanTypeQuery = loanType(api);
    return combineLatest(currencyIds.map((currencyId) => loanTypeQuery(currencyId)));
  });
}

/**
 * @name loanOverview
 * @description get loan overview includes total debit, total collateral
 * @param {(CurrencyId | string)} token
 * @param {(CurrencyId | string)} token
 */
export function loanOverview (api: ApiInterfaceRx): (token: CurrencyId | string) => Observable<DerivedLoanOverView> {
  return memo((token: CurrencyId | string) => combineLatest([
    api.query.loans.totalDebits<Balance>(token),
    api.query.loans.totalCollaterals<Balance>(token)
  ]).pipe(
    map((result) => {
      const [totalDebit, totalCollateral] = result;
      return { token, totalDebit, totalCollateral };
    })
  ));
}

/**
 * @name allLoanOverview
 * @description get loan overviews of all kinds of collatearl
 */
export function allLoanOverviews (api: ApiInterfaceRx): () => Observable<DerivedLoanOverView[]> {
  return memo(() => {
    const currencyIds = getCollateralCurrencyIds(api);
    const loanOverViewQuery = loanOverview(api);
    return combineLatest(currencyIds.map((currencyId) => loanOverViewQuery(currencyId)));
  });
}
