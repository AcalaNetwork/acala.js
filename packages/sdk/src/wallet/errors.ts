export class NotSupportETHAddress extends Error {
  constructor(address: string) {
    super();

    this.message = `not support eth address ${address}`;
    this.name = 'NotSupportETHAddress';
  }
}

export class NotSupportEVM extends Error {
  constructor() {
    super();

    this.message = 'not support evm balance query, please init the sdk with wsProvider';
    this.name = 'NotSupportEVM';
  }
}

export class CurrencyNotFound extends Error {
  constructor(name: string) {
    super();

    this.message = `can't find ${name} currency in current network`;
    this.name = 'CurrencyNotFound';
  }
}

export class TradingPairNotFound extends Error {
  constructor(name: string) {
    super();

    this.message = `can't find ${name} trading pair in current network`;
    this.name = 'TradingPairNotFound';
  }
}
