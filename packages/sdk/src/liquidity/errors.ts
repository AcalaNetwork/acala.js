export class IncentivePoolNotFound extends Error {
  constructor(name: string) {
    super();

    this.message = `can't find ${name} incentive pool in current network`;
    this.name = 'IncentivePoolNotFond';
  }
}

export class TradingPairNotFound extends Error {
  constructor(name: string) {
    super();

    this.message = `can't find ${name} trading pair in current network`;
    this.name = 'TradingPairNotFound';
  }
}
