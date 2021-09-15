import { FixedPointNumber as FN, MaybeAccount, MaybeCurrency, ObOrPromiseResult } from '@acala-network/sdk-core';
import { ApiPromise, ApiRx } from '@polkadot/api';
import { LoanParams, LoanPosition } from './types';

export abstract class PositionBase<T extends ApiPromise | ApiRx> {
  protected api: T;
  protected account: MaybeAccount;
  protected type: MaybeCurrency;
  protected loan: LoanBase<T>;

  constructor(api: T, account: MaybeAccount, type: MaybeCurrency, loan: LoanBase<T>) {
    this.api = api;
    this.account = account;
    this.type = type;
    this.loan = loan;
  }

  /**
   * @name queryPosition
   * @description query the current position
   */
  public abstract queryPosition(): ObOrPromiseResult<T, LoanPosition>;

  /**
   * @name adjustPosition
   * @description query the loan position after adjustment
   */
  public abstract adjustPosition(debtAdjustment: FN, collateralAdjustment: FN): ObOrPromiseResult<T, LoanPosition>;

  /**
   * @name getParams
   * @description query the target loan params
   */
  public abstract getParams(): ObOrPromiseResult<T, LoanParams>;

  /**
   * @name debitToStableCoin
   * @description help function to convert debit amount to stable coin amount
   */
  public abstract debitToStableCoin(): ObOrPromiseResult<T, FN>;

  /**
   * @name stableCoinToDebit
   * @description help function to convert stable coin amount to debit amount
   */
  public abstract stableCoinToDebit(): ObOrPromiseResult<T, FN>;
}

export abstract class LoanBase<T extends ApiPromise | ApiRx> {
  protected api: T;

  constructor(api: T) {
    this.api = api;
  }

  /**
   * @name queryPosition
   * @description query target loan detail
   */
  public abstract queryPosition(account: MaybeAccount, type: MaybeCurrency): ObOrPromiseResult<T, LoanPosition>;

  /**
   * @name getParams
   * @description query the target loan params
   */
  public abstract getParams(type: MaybeCurrency): ObOrPromiseResult<T, LoanParams>;

  /**
   * @name debitToStableCoin
   * @description help function to convert debit amount to stable coin amount
   */
  public abstract debitToStableCoin(type: MaybeCurrency): ObOrPromiseResult<T, FN>;

  /**
   * @name stableCoinToDebit
   * @description help function to convert stable coin amount to debit amount
   */
  public abstract stableCoinToDebit(type: MaybeCurrency): ObOrPromiseResult<T, FN>;
}
