import { FixedPointNumber } from '@acala-network/sdk-core';
import { createStorages } from './storages.js';
import { map } from 'rxjs/operators';
import { combineLatest, firstValueFrom } from 'rxjs';
import { memoize } from '@polkadot/util';
import { PriceProviderType } from '@acala-network/sdk/wallet/price-provider/types.js';
import { LoanCalculator } from './loan-calculator.js';
const YEAR_SECONDS = 365 * 24 * 60 * 60; // second of one year
export class Loan {
    api;
    wallet;
    storages;
    priceProviderType;
    constructor({ api, wallet, priceProviderType }) {
        this.api = api;
        this.wallet = wallet;
        this.storages = createStorages(this.api);
        this.priceProviderType = priceProviderType || PriceProviderType.ORACLE;
    }
    get isReady$() {
        return this.wallet.isReady$;
    }
    get isReady() {
        return this.wallet.isReady;
    }
    subscribeLoanTypes = memoize(() => {
        return this.storages.allCollateralParams().observable.pipe(map((items) => {
            return items.map(([key, rawValue]) => {
                const value = rawValue.unwrapOrDefault();
                const { stableToken } = this.wallet.getPresetTokens();
                const interestRatePerSec = FixedPointNumber.fromInner(value.interestRatePerSec.toString());
                return {
                    collateral: this.wallet.getToken(key.args[0]),
                    liquidationRatio: FixedPointNumber.fromInner(value.liquidationRatio.toString()),
                    liquidationPenalty: FixedPointNumber.fromInner(value.liquidationPenalty.toString()),
                    requiredCollateralRatio: FixedPointNumber.fromInner(value.requiredCollateralRatio.toString()),
                    interestRatePerSec,
                    maximumTotalDebitValue: FixedPointNumber.fromInner(value.maximumTotalDebitValue.toString(), stableToken.decimals),
                    stableFeeAPR: Math.pow(interestRatePerSec.toNumber() + 1, YEAR_SECONDS) - 1,
                    minimumDebitValue: FixedPointNumber.fromInner(this.api.consts.cdpEngine.minimumDebitValue.toString(), stableToken.decimals)
                };
            });
        }));
    });
    /** subscribe all loan types  */
    get loanTypes$() {
        return this.subscribeLoanTypes();
    }
    /** get all loan types */
    async getLoanTypes() {
        return firstValueFrom(this.loanTypes$);
    }
    /** subscribe `token` loan type */
    subscribeLoanType(token) {
        return this.loanTypes$.pipe(map((types) => types.find((i) => i.collateral.isEqual(token))));
    }
    /** subscribe `token` exchange rate */
    subscribeExchangeRate = memoize((token) => {
        return this.storages
            .exchangeRate(token)
            .observable.pipe(map((result) => (result.isSome ? FixedPointNumber.fromInner(result.toString()) : FixedPointNumber.ZERO)));
    });
    /** get `token` exchange rate */
    async getRexchangeRate(token) {
        return firstValueFrom(this.subscribeExchangeRate(token));
    }
    /** subscribe global loan position */
    subscribeGloablLoan = memoize((token) => {
        return combineLatest({
            loanType: this.subscribeLoanType(token),
            exchangeRate: this.subscribeExchangeRate(token),
            globalPosition: this.storages.globalPositions(token).observable
        }).pipe(map(({ loanType, exchangeRate, globalPosition }) => {
            if (!loanType)
                throw new Error();
            const { stableToken } = this.wallet.getPresetTokens();
            const debitAmount = FixedPointNumber.fromInner(globalPosition.debit.toString(), stableToken.decimals);
            const collateralAmount = FixedPointNumber.fromInner(globalPosition.collateral.toString(), loanType.collateral.decimals);
            return {
                type: loanType,
                debitAmount,
                debitValue: debitAmount.mul(exchangeRate),
                collateralAmount
            };
        }));
    });
    /** get global loan */
    async getGlobalLoan(token) {
        return firstValueFrom(this.subscribeGloablLoan(token));
    }
    subscribePrice(token) {
        return this.wallet.subscribePrice(token, this.priceProviderType);
    }
    getLoanCalculator(token, collateralAmount, debitAmount) {
        return new LoanCalculator({
            globalLoan$: this.subscribeGloablLoan(token),
            price$: this.subscribePrice(token),
            exchangeRate$: this.subscribeExchangeRate(token),
            collateralAmount,
            debitAmount
        });
    }
    subscribeUserLoan = memoize((address, token) => {
        return combineLatest({
            loanType: this.subscribeLoanType(token),
            exchangeRate: this.subscribeExchangeRate(token),
            position: this.storages.positions(token, address).observable
        }).pipe(map(({ loanType, exchangeRate, position }) => {
            if (!loanType)
                throw new Error();
            const { stableToken } = this.wallet.getPresetTokens();
            const debitAmount = FixedPointNumber.fromInner(position.debit.toString(), stableToken.decimals);
            const collateralAmount = FixedPointNumber.fromInner(position.collateral.toString(), loanType.collateral.decimals);
            return {
                address,
                type: loanType,
                debitAmount,
                debitValue: debitAmount.mul(exchangeRate),
                collateralAmount
            };
        }));
    });
    getUserLoanCalculator(address, token) {
        return new LoanCalculator({
            globalLoan$: this.subscribeGloablLoan(token),
            price$: this.subscribePrice(token),
            exchangeRate$: this.subscribeExchangeRate(token),
            loan$: this.subscribeUserLoan(address, token)
        });
    }
    getGloablLoanCalculator(token) {
        return new LoanCalculator({
            globalLoan$: this.subscribeGloablLoan(token),
            price$: this.subscribePrice(token),
            exchangeRate$: this.subscribeExchangeRate(token),
            loan$: this.subscribeGloablLoan(token)
        });
    }
}
