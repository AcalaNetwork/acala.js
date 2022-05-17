import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { assert } from '@polkadot/util';
import { FixedPointNumber, forceToCurrencyId, MaybeCurrency, Token } from '@acala-network/sdk-core';
import { Position } from '@acala-network/types/interfaces';
import { DerivedLoanType } from '@acala-network/api-derive';
import { ApiRx } from '@polkadot/api';
import { memoize } from 'lodash';
import { AcalaPrimitivesCurrencyCurrencyId, ModuleLoansPosition } from '@acala-network/types/interfaces/types-lookup';
import { Wallet } from '@acala-network/sdk';
import { PriceProviderType } from '@acala-network/sdk/wallet/price-provider/types';

export interface LoanParams {
  debitExchangeRate: FixedPointNumber;
  liquidationRatio: FixedPointNumber;
  requiredCollateralRatio: FixedPointNumber;
  interestRatePerSec: FixedPointNumber;
}

export interface LoanPosition extends LoanParams {
  collateral: FixedPointNumber;
  debit: FixedPointNumber;
  debitAmount: FixedPointNumber;
  collateralAmount: FixedPointNumber;
  collateralRatio: FixedPointNumber;
  requiredCollateral: FixedPointNumber;
  stableFeeAPR: FixedPointNumber;
  liquidationPrice: FixedPointNumber;
  liquidationRatio: FixedPointNumber;
  canGenerate: FixedPointNumber;
  canPayBack: FixedPointNumber;
  canWithdraw: FixedPointNumber;
  maxGenerate: FixedPointNumber;
  minCollateral: FixedPointNumber;
}

const YEAR_SECONDS = 365 * 24 * 60 * 60; // second of one year

export class LoanRx {
  private api: ApiRx;
  private readonly currency: AcalaPrimitivesCurrencyCurrencyId;
  private collateralToken: Token;
  private stableCoinToken: Token;
  private readonly address: string;
  private wallet: Wallet;
  private loanPosition$: Observable<Position>;
  private readonly loanParams$: Observable<LoanParams>;

  constructor(api: ApiRx, currency: MaybeCurrency, address: string, wallet: Wallet) {
    const collateralToken = wallet.__getToken(currency);
    const stableCoinToken = wallet.__getToken(api.consts.cdpEngine.getStableCurrencyId);

    assert(collateralToken && stableCoinToken, `init the loan sdk failed, can't find useable token in currency chain`);

    this.api = api;
    this.currency = forceToCurrencyId(api, currency);
    this.address = address;
    this.collateralToken = collateralToken;
    this.stableCoinToken = stableCoinToken;
    this.wallet = wallet;

    this.loanPosition$ = this.getLoanPosition();
    this.loanParams$ = this.getLoanParams();
  }

  get position(): Observable<LoanPosition> {
    return this.getPositionWithChanged(FixedPointNumber.ZERO, FixedPointNumber.ZERO);
  }

  get params(): Observable<LoanParams> {
    return this.loanParams$;
  }

  public updatePosition(
    debitAmountChange: FixedPointNumber,
    collateralChange: FixedPointNumber
  ): Observable<LoanPosition> {
    return this.getPositionWithChanged(debitAmountChange, collateralChange);
  }

  /**
   * get the position information of the loan
   */
  private getPositionWithChanged = memoize(
    (debitAmountChange: FixedPointNumber, collateralChange: FixedPointNumber): Observable<LoanPosition> => {
      return combineLatest({
        params: this.loanParams$,
        position: this.loanPosition$,
        price: this.wallet.subscribePrice(this.currency, PriceProviderType.ORACLE),
        token: this.wallet.subscribeToken(this.currency)
      }).pipe(
        map(({ params, position, price, token }) => {
          const { debit, collateral } = position;
          const { debitExchangeRate, requiredCollateralRatio, interestRatePerSec, liquidationRatio } = params;
          // trade debit decimal with stable coin decimal
          const _debit = FixedPointNumber.fromInner(debit.toString(), this.stableCoinToken.decimals);

          // apply change to collateral and debit
          const _collateral = FixedPointNumber.fromInner(collateral.toString(), this.collateralToken.decimals).plus(
            collateralChange
          );
          const debitAmount = _debit.times(debitExchangeRate).plus(debitAmountChange);
          const collateralAmount = _collateral.times(price);

          const requiredCollateral = this.getRequiredCollateral(debitAmount, requiredCollateralRatio, price);

          const canGenerate = this.getCanGenerate(
            collateralAmount,
            debitAmount,
            requiredCollateralRatio,
            FixedPointNumber.ONE,
            FixedPointNumber.ZERO
          );

          const maxGenerate = this.getMaxGenerate(collateralAmount, requiredCollateralRatio);
          const minCollateral = debitAmount.isZero() ? token.ed.mul(new FixedPointNumber(100)) : FixedPointNumber.ZERO;

          return {
            collateral: _collateral,
            debit: _debit,
            debitAmount: debitAmount,
            collateralAmount: collateralAmount,
            collateralRatio: collateralAmount.div(debitAmount),
            requiredCollateral,
            stableFeeAPR: this.getStableFeeAPR(interestRatePerSec),
            liquidationPrice: this.getLiquidationPrice(_collateral, debitAmount, liquidationRatio),
            canGenerate,
            canPayBack: debitAmount,
            canWithdraw: _collateral.minus(requiredCollateral).min(FixedPointNumber.ZERO),
            maxGenerate,
            minCollateral,
            ...params
          };
        })
      );
    }
  );

  private getMaxGenerate(collateralAmount: FixedPointNumber, requiredCollateralRatio: FixedPointNumber) {
    return collateralAmount.div(requiredCollateralRatio);
  }

  private getRequiredCollateral(
    debitAmount: FixedPointNumber,
    requiredCollateralRatio: FixedPointNumber,
    price: FixedPointNumber
  ): FixedPointNumber {
    const result = debitAmount.times(requiredCollateralRatio).div(price);

    if (result.isLessThan(FixedPointNumber.ZERO) || !result.isFinaite()) {
      return FixedPointNumber.ZERO;
    }

    return result;
  }

  private getStableFeeAPR(interestRate: FixedPointNumber): FixedPointNumber {
    return new FixedPointNumber(Math.pow(Number(interestRate.plus(FixedPointNumber.ONE).toString()), YEAR_SECONDS) - 1);
  }

  private getLiquidationPrice(
    collateral: FixedPointNumber,
    debitAmount: FixedPointNumber,
    liquidationRatio: FixedPointNumber
  ): FixedPointNumber {
    const result = debitAmount.times(liquidationRatio).div(collateral);

    if (result.isLessThan(FixedPointNumber.ZERO) || result.isEqualTo(FixedPointNumber.ZERO) || !result.isFinaite()) {
      return new FixedPointNumber(NaN);
    }

    return result;
  }

  private getLoanPosition() {
    return this.api.query.loans.positions(this.currency, this.address) as Observable<ModuleLoansPosition>;
  }

  private getCanGenerate(
    collateralAmount: FixedPointNumber,
    currentDebitAmount: FixedPointNumber,
    requiredCollateralRatio: FixedPointNumber,
    stableCoinPrice: FixedPointNumber,
    slippage = FixedPointNumber.ZERO
  ): FixedPointNumber {
    const result = collateralAmount
      .div(requiredCollateralRatio)
      .minus(currentDebitAmount)
      .div(stableCoinPrice)
      .minus(slippage);

    if (result.isLessThan(FixedPointNumber.ZERO) || !result.isFinaite()) return FixedPointNumber.ZERO;

    return result;
  }

  private getLoanParams() {
    /* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access */
    return ((this.api.derive as any).loan.loanType(this.currency) as Observable<DerivedLoanType>).pipe(
      map((params: DerivedLoanType): LoanParams => {
        return {
          debitExchangeRate: FixedPointNumber.fromInner(params.debitExchangeRate.toString()),
          liquidationRatio: FixedPointNumber.fromInner(params.liquidationRatio.toString()),
          requiredCollateralRatio: FixedPointNumber.fromInner(params.requiredCollateralRatio.toString()),
          interestRatePerSec: FixedPointNumber.fromInner(params.interestRatePerSec.toString())
        };
      })
    );
  }
}
