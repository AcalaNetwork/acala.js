/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { DerivedLoanType } from '@acala-network/api-derive';
import { MaybeAccount, MaybeCurrency, FixedPointNumber as FN, Token } from '@acala-network/sdk-core';
import { WalletPromise } from '@acala-network/sdk-wallet';
import { Position } from '@acala-network/types/interfaces';
import { ApiPromise } from '@polkadot/api';
import { YEAR_SECONDS } from '.';
import { LoanBase, PositionBase } from './loan-base';
import { LoanPosition, LoanParams } from './types';

export class LoanPromise extends LoanBase<ApiPromise> {
  private stableCoinToken: Token;
  constructor(api: ApiPromise, wallet: WalletPromise) {
    super(api, wallet);
    this.stableCoinToken = this.wallet.getToken(this.api.consts.cdpEngine.getStableCurrencyId);
  }

  public queryPosition = async (account: MaybeAccount, type: MaybeCurrency): Promise<LoanPosition> => {
    return this.queryAdjustPosition(account, type, FN.ZERO, FN.ZERO);
  };

  public queryAdjustPosition = async (
    account: MaybeAccount,
    type: MaybeCurrency,
    debitAmountChange: FN,
    collateralChange: FN
  ): Promise<LoanPosition> => {
    const result = await this.api.query.loans.positions(type, account);
    const params = await this.getParams(type);
    const price = await this.wallet.queryPrice(type);

    const { collateral, debit } = result as Position;

    const debitAmount = FN.fromInner(debit.toString(), this.stableCoinToken.decimal);
    const debitValue = debitAmount.times(params.debitExchangeRate).plus(debitAmountChange);

    const collateralAmount = FN.fromInner(collateral.toString(), this.stableCoinToken.decimal);
    const collateralValue = collateralAmount.times(price.price).plus(collateralChange);

    const maxGenerate = this.getCanGenerate(
      collateralValue,
      debitValue,
      params.requiredCollateralRatio,
      FN.ONE,
      FN.ZERO
    );
    const requiredCollateral = this.getRequiredCollateral(debitAmount, params.requiredCollateralRatio, price.price);

    return {
      type,
      owner: account,
      params,
      position: {
        debitAmount: debitAmount,
        debitValue: debitValue,
        collateralAmount: collateralAmount,
        collateralValue: collateralValue,
        collateralRatio: collateralValue.div(debitValue)
      },
      maxGenerate,
      maxWithdrawn: collateralAmount.minus(requiredCollateral).min(FN.ZERO),
      maxPayback: debitValue,
      liquidationPrice: this.getLiquidationPrice(collateralAmount, debitAmount, params.liquidationRatio)
    };
  };

  public getParams = async (type: MaybeCurrency): Promise<LoanParams> => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const result: DerivedLoanType = await (this.api.derive as any).loan.loadType(type);
    const allPerSec = new FN(result.interestRatePerSec.toString()).plus(
      new FN(result.globalInterestRatePerSec.toString())
    );
    return {
      debitExchangeRate: new FN(result.debitExchangeRate.toString()),
      interestRatePerSec: new FN(result.interestRatePerSec.toString()),
      liquidationRatio: new FN(result.liquidationRatio.toString()),
      requiredCollateralRatio: new FN(result.requiredCollateralRatio.toString()),
      stableFeeAPR: new FN(Math.pow(Number(allPerSec.plus(FN.ONE).toString()), YEAR_SECONDS) - 1)
    };
  };

  public debitToStableCoin = async (type: MaybeCurrency, amount: FN): Promise<FN> => {
    const { debitExchangeRate } = await this.getParams(type);
    return amount.times(FN.fromInner(debitExchangeRate.toString(), this.stableCoinToken.decimal));
  };

  public stableCoinToDebit = async (type: MaybeCurrency, amount: FN): Promise<FN> => {
    const { debitExchangeRate } = await this.getParams(type);
    return amount.div(FN.fromInner(debitExchangeRate.toString(), this.stableCoinToken.decimal));
  };
}

export class PositionPromise extends PositionBase<ApiPromise> {
  constructor(api: ApiPromise, account: MaybeAccount, type: MaybeCurrency, loan: LoanPromise) {
    super(api, account, type, loan);
  }

  public queryPosition = async (): Promise<LoanPosition> => {
    return this.loan.queryPosition(this.account, this.type);
  };

  public adjustPosition = async (debtAdjustment: FN, collateralAdjustment: FN): Promise<LoanPosition> => {
    return this.loan.queryAdjustPosition(this.account, this.type, debtAdjustment, collateralAdjustment);
  };

  public getParams = async (): Promise<LoanParams> => {
    return this.loan.getParams(this.type);
  };

  public debitToStableCoin = async (amount: FN): Promise<FN> => {
    return this.loan.debitToStableCoin(this.type, amount);
  };

  public stableCoinToDebit = async (amount: FN): Promise<FN> => {
    return this.loan.stableCoinToDebit(this.type, amount);
  };
}
