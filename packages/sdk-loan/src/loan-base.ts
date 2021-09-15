import { FixedPointNumber as FN, MaybeAccount, MaybeCurrency, ObOrPromiseResult } from '@acala-network/sdk-core';
import { WalletBase } from '@acala-network/sdk-wallet/wallet-base';
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
  public abstract debitToStableCoin(amount: FN): ObOrPromiseResult<T, FN>;

  /**
   * @name stableCoinToDebit
   * @description help function to convert stable coin amount to debit amount
   */
  public abstract stableCoinToDebit(amount: FN): ObOrPromiseResult<T, FN>;
}

export abstract class LoanBase<T extends ApiPromise | ApiRx> {
  protected api: T;
  protected wallet: WalletBase<T>;

  constructor(api: T, wallet: WalletBase<T>) {
    this.api = api;
    this.wallet = wallet;
  }

  public getCanGenerate(
    collateralAmount: FN,
    currentDebitAmount: FN,
    requiredCollateralRatio: FN,
    stableCoinPrice: FN,
    slippage = FN.ZERO
  ): FN {
    const result = collateralAmount
      .div(requiredCollateralRatio)
      .minus(currentDebitAmount)
      .div(stableCoinPrice)
      .minus(slippage);

    if (result.isLessThan(FN.ZERO) || !result.isFinaite()) return FN.ZERO;

    return result;
  }

  public getRequiredCollateral(debitAmount: FN, requiredCollateralRatio: FN, price: FN): FN {
    const result = debitAmount.times(requiredCollateralRatio).div(price);

    if (result.isLessThan(FN.ZERO) || !result.isFinaite()) {
      return FN.ZERO;
    }

    return result;
  }

  public getLiquidationPrice(collateral: FN, debitAmount: FN, liquidationRatio: FN): FN {
    const result = debitAmount.times(liquidationRatio).div(collateral);

    if (result.isLessThan(FN.ZERO) || result.isEqualTo(FN.ZERO) || !result.isFinaite()) {
      return new FN(NaN);
    }

    return result;
  }

  /**
   * @name queryPosition
   * @description query target loan detail
   */
  public abstract queryPosition(account: MaybeAccount, type: MaybeCurrency): ObOrPromiseResult<T, LoanPosition>;
  public abstract queryAdjustPosition(
    account: MaybeAccount,
    type: MaybeCurrency,
    debitAmountChange: FN,
    collateralChange: FN
  ): ObOrPromiseResult<T, LoanPosition>;

  /**
   * @name getParams
   * @description query the target loan params
   */
  public abstract getParams(type: MaybeCurrency): ObOrPromiseResult<T, LoanParams>;

  /**
   * @name debitToStableCoin
   * @description help function to convert debit amount to stable coin amount
   */
  public abstract debitToStableCoin(type: MaybeCurrency, amount: FN): ObOrPromiseResult<T, FN>;

  /**
   * @name stableCoinToDebit
   * @description help function to convert stable coin amount to debit amount
   */
  public abstract stableCoinToDebit(type: MaybeCurrency, amount: FN): ObOrPromiseResult<T, FN>;
}
