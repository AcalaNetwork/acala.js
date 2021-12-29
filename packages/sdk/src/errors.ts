export class MethodNotFound extends Error {
  readonly section: string;
  readonly method: string;

  constructor(section: string, method: string) {
    super();

    this.section = section;
    this.method = method;

    this.message = `can't find ${section}.${method} in api`;
    this.name = 'MethodNotFound';
  }
}

export class CurrencyNotFound extends Error {
  constructor(name: string) {
    super();

    this.message = `can't find ${name} currency in current network`;
    this.name = 'CurrencyNotFound';
  }
}

export class SDKNotReady extends Error {
  constructor(name: string) {
    super();

    this.message = `SDK ${name} is not ready`;
    this.name = 'SDKNotReady';
  }
}

export class TradingPairNotFound extends Error {
  constructor(name: string) {
    super();

    this.message = `can't find ${name} trading pair in current network`;
    this.name = 'TradingPairNotFound';
  }
}
