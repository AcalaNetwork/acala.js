/* the output amount is larger than the liquidity pool */
export class InsufficientLiquidityError extends Error {
  constructor() {
    super();

    this.name = 'InsufficientLiquidity';
    this.message = 'Insufficient Liquidity';
  }
}

/* the output amount is larger than the liquidity pool */
export class NoLiquidityPoolError extends Error {
  constructor() {
    super();

    this.name = 'NoLiquidityPool';
    this.message = 'No Liquidity Pool';
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

/* no trading path found for the swap */
export class NoTradingPathError extends Error {
  constructor() {
    super();

    this.name = 'NoTradingPath';
    this.message = 'No Trading Path';
  }
}
