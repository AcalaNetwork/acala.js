import { Observable, of, combineLatest } from "rxjs";
import { map, switchMap } from "rxjs/operators";
import { DerivedLoanConstants, DerivedLoanType, DerivedLoanOverView } from "../types/loan";
import { Codec } from "@polkadot/types/types";
import { QueryOption } from "../types/query";
import { queryWrapper } from "../utils/queryWrapper";
import { ApiRx } from "@polkadot/api";
import { Vec } from "@polkadot/types";

// get cdp engine constants
export function lonaConstants(
  api: ApiRx,
): Observable<DerivedLoanConstants> {
  return of([
    api.consts.cdpEngine.minimumDebitValue,
    api.consts.cdpEngine.globalStabilityFee,
    api.consts.cdpEngine.defaultDebitExchangeRate,
    api.consts.cdpEngine.defaultLiquidationRatio,
    api.consts.babe.expectedBlockTime,
  ]).pipe(
    map((result: Codec[]) => {
      const [
        minimumDebitValue,
        globalStabilityFee,
        defaultDebitExchangeRate,
        defaultLiquidationRatio,
        expectedBlockTime
      ] = result;
      return {
        minimumDebitValue,
        globalStabilityFee,
        defaultDebitExchangeRate,
        defaultLiquidationRatio,
        expectedBlockTime
      };
    })
  ) as Observable<DerivedLoanConstants>;
}

// get collateral ids
export function loanCollateralCurrencyIds(api: ApiRx): Observable<Vec<Codec>> {
  return of(api.consts.cdpEngine.collateralCurrencyIds as Vec<Codec>);
}

// get loan type
export function loanType(
  api: ApiRx,
  asset: string,
  option?: QueryOption
): Observable<DerivedLoanType> {
  return lonaConstants(api).pipe(
    switchMap((constants: DerivedLoanConstants) =>
      combineLatest([
        queryWrapper(api.query.cdpEngine.debitExchangeRate, [asset], option),
        queryWrapper(api.query.cdpEngine.liquidationPenalty, [asset], option),
        queryWrapper(api.query.cdpEngine.liquidationRatio, [asset], option),
        queryWrapper(api.query.cdpEngine.maximumTotalDebitValue, [asset], option),
        queryWrapper(api.query.cdpEngine.requiredCollateralRatio, [asset], option),
        queryWrapper(api.query.cdpEngine.stabilityFee, [asset], option)
      ]).pipe(
        map(result => {
          const [
            debitExchangeRate,
            liquidationPenalty,
            liquidationRatio,
            maximumTotalDebitValue,
            requiredCollateralRatio,
            stabilityFee
          ] = result;
          return {
            asset,
            debitExchangeRate: debitExchangeRate.isEmpty
              ? constants.defaultDebitExchangeRate
              : debitExchangeRate,
            liquidationPenalty: liquidationPenalty,
            liquidationRatio: liquidationRatio.isEmpty ? constants.defaultLiquidationRatio : liquidationRatio,
            requiredCollateralRatio: requiredCollateralRatio,
            stabilityFee: stabilityFee,
            globalStabilityFee: constants.globalStabilityFee,
            maximumTotalDebitValue: maximumTotalDebitValue,
            minimumDebitValue: constants.minimumDebitValue,
            expectedBlockTime: constants.expectedBlockTime,
          };
        })
      )
    )
  )
}

// get all loan types
export function allLoanTypes(api: ApiRx, options?: QueryOption): Observable<DerivedLoanType[]> {
  return loanCollateralCurrencyIds(api).pipe(
    switchMap((currencyIds: Vec<Codec>) => {
      return combineLatest(currencyIds.map((currencyId => {
        return loanType(api, currencyId.toString(), options);
      })));
    })
  )
}

// get loan overview include total debits and total collaterals
export function loanOverview(api: ApiRx, asset: string, options?: QueryOption): Observable<DerivedLoanOverView> {
  return combineLatest([
    queryWrapper(api.query.loans.totalDebits, [asset], options),
    queryWrapper(api.query.loans.totalCollaterals, [asset], options),
    loanType(api, asset, options),
  ]).pipe(
    map((result) => {
      const [totalDebit, totalCollateral, type] = result;
      return { asset, totalDebit, totalCollateral, type };
    })
  )
}

// get all loans overview
export function allLoansOverview(api: ApiRx, options?: QueryOption): Observable<DerivedLoanOverView[]> {
  return loanCollateralCurrencyIds(api).pipe(
    switchMap((currencyIds: Vec<Codec>) => {
      return combineLatest(
        currencyIds.map(currency => loanOverview(api, currency.toString(), options))
      );
    })
  )
}