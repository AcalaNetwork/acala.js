import { forceToCurrencyName, MaybeCurrency } from '@acala-network/sdk-core';

/* the output amount is larger than the liquidity pool */
export class InsufficientLiquidityError extends Error {
  constructor(dexShareToken: MaybeCurrency) {
    super();

    this.name = 'InsufficientLiquidity';
    this.message = `Insufficient ${forceToCurrencyName(dexShareToken)} Liquidity`;
  }
}

/* the input or output is too small */
export class AmountTooSmall extends Error {
  constructor() {
    super();

    this.name = 'AmountTooSmall';
    this.message = 'Amount Too Samll';
  }
}

/* no trading path found from the swap */
export class NoTradingPathError extends Error {
  constructor() {
    super();

    this.name = 'NoTradingPath';
    this.message = 'No Trading Path';
  }
}

/* no swap provider found */
export class NoSwapProvider extends Error {
  constructor(name: string) {
    super();

    this.name = 'NoSwapProvider';
    this.message = `no ${name} swap provider`;
  }
}

export class ParamsNotAcceptableForDexProvider extends Error {
  constructor(name: string) {
    super();

    this.name = 'ParamsNotAcceptableForDexProvider';
    this.message = `params not acceptable for ${name} dex provider`;
  }
}
