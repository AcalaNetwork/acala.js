import { Observable, combineLatest } from "rxjs";
import { switchMap, map } from "rxjs/operators";
import { DerivedLoan, DerivedLoanType } from "../types/loan";
import { Codec } from "@polkadot/types/types";
import { ApiRx } from "@polkadot/api";
import { Vec } from "@polkadot/types";
import { loanType } from "./loan-type";
import { QueryOption } from "../types/query";
import { queryWrapper } from "../utils/queryWrapper";

export function loan(
  api: ApiRx,
  account: string,
  asset: string,
  option?: QueryOption
): Observable<DerivedLoan> {
  return loanType(api, asset, option).pipe(
    switchMap((type: DerivedLoanType) => {
      return combineLatest([
        queryWrapper(api.query.loans.collaterals, [account, asset], option),
        queryWrapper<Observable<Vec<Codec>>>(api.query.loans.debits, [asset, account], option),
      ]).pipe(
        map((result) => {
          const [collateral, debit] = result;
          return { asset, account, type, collateral, debit: debit[0] };
        })
      );
    })
  );
}
