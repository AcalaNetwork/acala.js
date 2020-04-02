import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { CurrencyId, Rate, Balance } from '@acala-network/types/interfaces';
import { ApiInterfaceRx } from '@polkadot/api/types';
import { memo } from '../utils/memo';
import { DerivedLoanConstants, DerivedLoanType, DerivedLoanOverView } from '../types/loan';
import { getCollateralCurrencyIds } from '../helps/token';
import { Codec } from '@polkadot/types/types';

/**
 * @name loanConstants
 * @description get constants in loan module
 */
function loanConstants (api: ApiInterfaceRx): DerivedLoanConstants {
  return {
    minimumDebitValue: api.consts.cdpEngine.minimumDebitValue as Balance,
    globalStabilityFee: api.consts.cdpEngine.globalStabilityFee as Rate,
    defaultDebitExchangeRate: api.consts.cdpEngine.defaultDebitExchangeRate as Rate,
    defaultLiquidationRatio: api.consts.cdpEngine.defaultLiquidationRatio as Rate,
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
      api.query.cdpEngine.debitExchangeRate<Rate>(token),
      api.query.cdpEngine.liquidationPenalty<Rate>(token),
      api.query.cdpEngine.liquidationRatio<Rate>(token),
      api.query.cdpEngine.maximumTotalDebitValue<Balance>(token),
      api.query.cdpEngine.requiredCollateralRatio<Rate>(token),
      api.query.cdpEngine.stabilityFee<Rate>(token)
    ]).pipe(
      map((result) => {
        const constants = loanConstants(api);
        const [
          debitExchangeRate,
          liquidationPenalty,
          liquidationRatio,
          maximumTotalDebitValue,
          requiredCollateralRatio,
          stabilityFee
        ] = result;
        return {
          token,
          debitExchangeRate: (debitExchangeRate as Codec).isEmpty ? constants.defaultDebitExchangeRate : debitExchangeRate,
          liquidationPenalty: liquidationPenalty,
          liquidationRatio: (liquidationRatio as Codec).isEmpty ? constants.defaultLiquidationRatio : liquidationRatio,
          requiredCollateralRatio: requiredCollateralRatio,
          stabilityFee: stabilityFee,
          globalStabilityFee: constants.globalStabilityFee,
          maximumTotalDebitValue: maximumTotalDebitValue,
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
