import { MaybeAccount, forceToCurrencyName, MaybeCurrency } from '@acala-network/sdk-core';

export class NotSupportToken extends Error {
  constructor() {
    super();

    this.name = 'NotSupportToken';
    this.message = 'token is not useable';
  }
}

export class BelowExistentialDeposit extends Error {
  constructor(account: MaybeAccount, currency: MaybeCurrency) {
    super();

    this.name = 'BelowExistentialDeposit';
    this.message = `The ${forceToCurrencyName(currency)} balance may below the existential deposit after this action`;
  }
}
