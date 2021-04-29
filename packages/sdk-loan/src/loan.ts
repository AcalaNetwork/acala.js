import { Observable, combineLatest } from '@polkadot/x-rxjs';
import { map } from '@polkadot/x-rxjs/operators';
import { assert } from '@polkadot/util';
import { FixedPointNumber, focusToCurrencyId, MaybeCurrency, Token } from '@acala-network/sdk-core';
import { CurrencyId, Position } from '@acala-network/types/interfaces';
import { DerivedLoanType } from '@acala-network/api-derive';
import { ApiRx } from '@polkadot/api';
import { WalletRx } from '@acala-network/sdk-wallet';
import { memoize } from 'lodash';

export interface LoanParams {
  debitExchangeRate: FixedPointNumber;
  expectedBlockTime: number;
  globalStableFee: FixedPointNumber;
  liquidationRatio: FixedPointNumber;
  requiredCollateralRatio: FixedPointNumber;
  stableFee: FixedPointNumber;
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
  maxGenerate: FixedPointNumber;
}

const YEAR = 365 * 24 * 60 * 60; // second of one year

export class LoanRx {
  private api: ApiRx;
  private currency: CurrencyId;
  private collateralToken: Token;
  private stableCoinToken: Token;
  private address: string;
  private wallet: WalletRx;
  private loanPosition$: Observable<Position>;
  private loanParams$: Observable<LoanParams>;

  constructor(api: ApiRx, currency: MaybeCurrency, address: string, wallet: WalletRx) {
    const collateralToken = wallet.getToken(currency);
    const stableCoinToken = wallet.getToken(api.consts.cdpEngine.getStableCurrencyId);

    assert(collateralToken && stableCoinToken, `init the loan sdk failed, can't find useable token in currency chain`);
    assert(wallet.isReady, 'the wallet sdk should be ready');

    this.api = api;
    this.currency = focusToCurrencyId(api, currency);
    this.address = address;
    this.collateralToken = collateralToken;
    this.stableCoinToken = stableCoinToken;
    this.wallet = wallet;

    this.loanPosition$ = this.getLoanPosition();
    this.loanParams$ = this.getLoanParams();
  }

  get position(): Observable<LoanPosition> {
    return this.updatePosition(FixedPointNumber.ZERO, FixedPointNumber.ZERO);
  }

  get params(): Observable<LoanParams> {
    return this.loanParams$;
  }

  public updatePosition(
    debitAmountChange: FixedPointNumber,
    collateralChange: FixedPointNumber
  ): Observable<LoanPosition> {
    return this._updatePosition(debitAmountChange, collateralChange);
  }

  private _updatePosition = memoize(
    (debitAmountChange: FixedPointNumber, collateralChange: FixedPointNumber): Observable<LoanPosition> => {
      return combineLatest([this.loanParams$, this.loanPosition$, this.wallet.getPrice(this.currency)]).pipe(
        map(([params, position, price]) => {
          const { debit, collateral } = position;
          const {
            debitExchangeRate,
            requiredCollateralRatio,
            stableFee,
            expectedBlockTime,
            liquidationRatio,
            globalStableFee
          } = params;

          const _debit = FixedPointNumber.fromInner(debit.toString(), this.stableCoinToken.decimal);

          // apply change to collateral and debit
          const _collateral = FixedPointNumber.fromInner(collateral.toString(), this.collateralToken.decimal).plus(
            collateralChange
          );
          const debitAmount = _debit.times(debitExchangeRate).plus(debitAmountChange);
          const collateralAmount = _collateral.times(price.price);
          const requiredCollateral = this.getRequiredCollateral(debitAmount, requiredCollateralRatio, price.price);
          const canGenerate = this.getCanGenerate(
            collateralAmount,
            debitAmount,
            requiredCollateralRatio,
            FixedPointNumber.ONE,
            FixedPointNumber.ZERO
          );
          const maxGenerate = this.getMaxGenerate(collateralAmount, requiredCollateralRatio);

          return {
            collateral: _collateral,
            debit: _debit,
            debitAmount: debitAmount,
            collateralAmount: collateralAmount,
            collateralRatio: collateralAmount.div(debitAmount),
            requiredCollateral,
            stableFeeAPR: this.getStableFeeAPR(stableFee.plus(globalStableFee), expectedBlockTime),
            liquidationPrice: this.getLiquidationPrice(_collateral, debitAmount, liquidationRatio),
            canGenerate,
            canPayBack: debitAmount,
            maxGenerate,
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

  private getStableFeeAPR(stableFee: FixedPointNumber, blockTime: number): FixedPointNumber {
    return new FixedPointNumber((1 + stableFee.toNumber(18, 3)) ** ((YEAR / blockTime) * 1000) - 1);
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
    return this.api.query.loans.positions(this.currency, this.address);
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

    if (result.isLessThan(FixedPointNumber.ZERO) || !result.isFinaite()) {
      return FixedPointNumber.ZERO;
    }

    return result;
  }

  private getLoanParams() {
    /* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access */
    return ((this.api.derive as any).loan.loanType(this.currency) as Observable<DerivedLoanType>).pipe(
      map(
        (params: DerivedLoanType): LoanParams => {
          return {
            debitExchangeRate: FixedPointNumber.fromInner(params.debitExchangeRate.toString()),
            expectedBlockTime:
              typeof params.expectedBlockTime === 'number'
                ? params.expectedBlockTime
                : params.expectedBlockTime?.toNumber(),
            globalStableFee: FixedPointNumber.fromInner(params.globalStabilityFee.toString()),
            liquidationRatio: FixedPointNumber.fromInner(params.liquidationRatio.toString()),
            requiredCollateralRatio: FixedPointNumber.fromInner(params.requiredCollateralRatio.toString()),
            stableFee: FixedPointNumber.fromInner(params.stabilityFee.toString())
          };
        }
      )
    );
  }
}
