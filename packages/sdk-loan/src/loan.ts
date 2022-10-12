import { BaseSDK, Wallet } from '@acala-network/sdk';
import { AnyApi, FixedPointNumber } from '@acala-network/sdk-core';
import { createStorages } from './storages';
import { LoanSDKParams, LoanTypes } from './types';
import { map } from 'rxjs/operators';
import { firstValueFrom, Observable } from 'rxjs';
import { memoize } from '@polkadot/util';

const YEAR_SECONDS = 365 * 24 * 60 * 60; // second of one year

export class Loan implements BaseSDK {
  private api: AnyApi;
  private wallet: Wallet;
  private storages: ReturnType<typeof createStorages>;

  constructor({ api, wallet }: LoanSDKParams) {
    this.api = api;
    this.wallet = wallet;
    this.storages = createStorages(this.api);
  }

  get isReady$() {
    return this.wallet.isReady$;
  }

  get isReady(): Promise<boolean> {
    return this.wallet.isReady;
  }

  private subscribeLoanTypes = memoize(() => {
    return this.storages.allCollateralParams().observable.pipe(
      map((items) => {
        return items.map(([key, value]) => {
          const interestRatePerSec = new FixedPointNumber(value.interestRatePerSec.toString());
          return {
            collateral: this.wallet.__getToken(key.args[0]),
            liquidationRatio: new FixedPointNumber(value.liquidationRatio.toString()),
            requiredCollateralRatio: new FixedPointNumber(value.requiredCollateralRatio.toString()),
            interestRatePerSec,
            maximumTotalDebitValue: new FixedPointNumber(value.maximumTotalDebitValue.toString()),
            stableFeeAPR: Math.pow(Number(interestRatePerSec.plus(FixedPointNumber.ONE).toString()), YEAR_SECONDS) - 1
          };
        });
      })
    );
  });

  get loanTypes$(): Observable<LoanTypes> {
    return this.subscribeLoanTypes();
  }

  async getLoanTypes(): Promise<LoanTypes> {
    return firstValueFrom(this.loanTypes$);
  }
}
