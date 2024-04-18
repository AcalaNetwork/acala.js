import { FixedPointNumber } from '@acala-network/sdk-core';
import { BehaviorSubject, combineLatest, firstValueFrom, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { GlobalLoan, LoanStatus, LoanType, UserLoan } from './types.js';

interface LoanCalculatorParams {
  price$: Observable<FixedPointNumber>;
  globalLoan$: Observable<GlobalLoan>;
  exchangeRate$: Observable<FixedPointNumber>;
  loan$?: Observable<UserLoan> | Observable<GlobalLoan>;
  collateralAmount?: FixedPointNumber;
  debitAmount?: FixedPointNumber;
}

export class LoanCalculator {
  public readonly params: LoanCalculatorParams;
  public readonly collateralAmount$: BehaviorSubject<FixedPointNumber>;
  public readonly debitAmount$: BehaviorSubject<FixedPointNumber>;
  public loanType!: LoanType;
  public exchangeRate: FixedPointNumber = FixedPointNumber.ZERO;

  constructor(params: LoanCalculatorParams) {
    this.params = params;
    this.collateralAmount$ = new BehaviorSubject(params.collateralAmount || FixedPointNumber.ZERO);
    this.debitAmount$ = new BehaviorSubject(params.debitAmount || FixedPointNumber.ZERO);

    if (params.loan$) {
      this.subscribeFromLoan(params.loan$);
    }

    // subscribe exchange rate change
    this.params.exchangeRate$.subscribe({
      next: (rate) => {
        this.exchangeRate = rate;
      }
    });
    this.params.globalLoan$.subscribe({
      next: ({ type }) => {
        this.loanType = type;
      }
    });
  }

  private subscribeFromLoan(loan$: Observable<UserLoan> | Observable<GlobalLoan>) {
    loan$.subscribe({
      next: (data) => {
        this.updateCollateralAmount(data.collateralAmount);
        this.updateDebitAmount(data.debitAmount);
      }
    });
  }

  public updateCollateralAmount(amount: FixedPointNumber) {
    this.collateralAmount$.next(amount);
  }

  public updateDebitAmount(amount: FixedPointNumber) {
    this.debitAmount$.next(amount);
  }

  public updateDebitValue(value: FixedPointNumber) {
    return this.updateDebitAmount(value.div(this.exchangeRate));
  }

  get isReady$() {
    return this.params.globalLoan$.pipe(
      map(({ type }) => !!type),
      filter((i) => !!i)
    );
  }

  public async isReady() {
    return firstValueFrom(this.isReady$);
  }

  get price$() {
    return this.params.price$;
  }

  // subscribe collateal value
  get collateralValue$() {
    const { price$ } = this.params;

    return combineLatest({
      price: price$,
      collateralAmount: this.collateralAmount$
    }).pipe(map(({ price, collateralAmount }) => collateralAmount.mul(price)));
  }

  // subscirbe debit value
  get debitValue$() {
    return combineLatest({
      exchangeRate: this.params.exchangeRate$,
      debitAmount: this.debitAmount$
    }).pipe(map(({ exchangeRate, debitAmount }) => debitAmount.mul(exchangeRate)));
  }

  // subscribe collateral ratio
  get collateralRatio$() {
    return combineLatest({
      collateral: this.collateralValue$,
      debit: this.debitValue$
    }).pipe(map(({ collateral, debit }) => collateral.div(debit)));
  }

  get minimumCollateralRatio$() {
    return combineLatest({
      collateral: this.collateralValue$,
      type: this.loanType$
    }).pipe(map(({ collateral, type }) => collateral.div(type.minimumDebitValue)));
  }

  get loanType$() {
    return this.params.globalLoan$.pipe(map((i) => i.type));
  }

  // subscribe liquidation price
  get priceAtLiquidationRatio$() {
    return combineLatest({
      loanType: this.loanType$,
      collateral: this.collateralAmount$,
      debit: this.debitValue$
    }).pipe(
      map(({ loanType, collateral, debit }) => {
        const { liquidationRatio } = loanType;

        if (debit.isZero()) return new FixedPointNumber(Number.NEGATIVE_INFINITY);

        if (collateral.isZero()) return new FixedPointNumber(NaN);

        return debit.times(liquidationRatio).div(collateral);
      })
    );
  }

  // susbcribe required price
  get priceAtRequiredRatio$() {
    return combineLatest({
      loanType: this.loanType$,
      collateral: this.collateralAmount$,
      debit: this.debitValue$
    }).pipe(
      map(({ collateral, debit, loanType }) => {
        const { requiredCollateralRatio } = loanType;

        if (debit.isZero()) return new FixedPointNumber(Number.NEGATIVE_INFINITY);

        if (collateral.isZero()) return new FixedPointNumber(NaN);

        return debit.times(requiredCollateralRatio).div(collateral);
      })
    );
  }

  get maxGenerateDebitValue$() {
    return combineLatest({
      globalLoan: this.params.globalLoan$,
      collateralValue: this.collateralValue$
    }).pipe(
      map(({ globalLoan, collateralValue }) => {
        const { debitValue: globalDebitValue, type } = globalLoan;

        const remainedGap = type.maximumTotalDebitValue.sub(globalDebitValue);

        const maxGenerate = remainedGap.min(collateralValue.div(type.requiredCollateralRatio));

        if (maxGenerate.isLessOrEqualTo(FixedPointNumber.ZERO) || !maxGenerate.isFinaite())
          return new FixedPointNumber(0, type.collateral.decimals);

        return maxGenerate;
      })
    );
  }

  // subscribe max debit value
  get maxRemainGenerateDebitValue$() {
    return combineLatest({
      type: this.loanType$,
      maxDebitValut: this.maxGenerateDebitValue$,
      debitValue: this.debitValue$
    }).pipe(
      map(({ maxDebitValut, debitValue, type }) => {
        if (!maxDebitValut.isFinaite() || maxDebitValut.isZero())
          return new FixedPointNumber(0, type.collateral.decimals);

        const maxGenerate = maxDebitValut.minus(debitValue);

        if (maxGenerate.isLessOrEqualTo(FixedPointNumber.ZERO) || !maxGenerate.isFinaite())
          return new FixedPointNumber(0, type.collateral.decimals);

        return maxGenerate;
      })
    );
  }

  // subscribe minimum debit value
  get minDebitValue$() {
    return this.params.globalLoan$.pipe(map((i) => i.type.minimumDebitValue));
  }

  // subscirbe required collateral amount by debit value
  get requiredCollateralAmount$() {
    return combineLatest({
      type: this.loanType$,
      price: this.price$,
      debitValue: this.debitValue$,
      minimumCollateral: this.minimumCollateralAmount$
    }).pipe(
      map(({ debitValue, price, type, minimumCollateral }) => {
        if (price.isZero() || debitValue.isLessOrEqualTo(FixedPointNumber.ZERO))
          return new FixedPointNumber(0, type.collateral.decimals);

        return debitValue.times(type.requiredCollateralRatio).div(price).max(minimumCollateral);
      })
    );
  }

  get canWithdrawCollateralAmount$() {
    return combineLatest({
      type: this.loanType$,
      collateral: this.collateralAmount$,
      requiredCollateral: this.requiredCollateralAmount$
    }).pipe(
      map(({ collateral, requiredCollateral, type }) => {
        const canWithdraw = collateral.minus(requiredCollateral);

        if (canWithdraw.isLessOrEqualTo(FixedPointNumber.ZERO))
          return new FixedPointNumber(0, type.collateral.decimals);

        return canWithdraw;
      })
    );
  }

  // subscirbe minimum collateal amount
  get minimumCollateralAmount$() {
    const { globalLoan$ } = this.params;

    // the minumum collateral should larger than ed * 100;
    return globalLoan$.pipe(map((i) => i.type.collateral.ed.mul(new FixedPointNumber(100))));
  }

  get status$(): Observable<LoanStatus> {
    return combineLatest({
      globalLoan: this.params.globalLoan$,
      ratio: this.collateralRatio$
    }).pipe(
      map(({ ratio, globalLoan }) => {
        const { type } = globalLoan;
        const STEP = new FixedPointNumber(0.1);

        if (ratio.isZero() || ratio.isNaN()) return LoanStatus.SAFE;

        // when current ratio is greater than (required ratio + 10%), the loan status is safe;
        if (ratio.isGreaterThanOrEqualTo(type.requiredCollateralRatio.plus(STEP))) {
          return LoanStatus.SAFE;
        }

        // if current ratio is less than (required ratio + 10%) and greater than (liqudation ratio + 10%), the loan status is waring
        if (
          ratio.lt(type.requiredCollateralRatio.plus(STEP)) &&
          ratio.isGreaterThanOrEqualTo(type.liquidationRatio.plus(STEP))
        ) {
          return LoanStatus.WARNING;
        }

        // if current ratio is less than (liquidation ratio + 10%), the loan status is danger;
        return LoanStatus.DANGEROUS;
      })
    );
  }
}
