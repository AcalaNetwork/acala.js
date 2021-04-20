/* the output amount is larger than the liquidity pool */
export class InsufficientLiquidityPoolError extends Error {
  constructor() {
    super();

    this.name = 'InsufficientLiquidityPool';
  }
}

/* the output amount is larger than the liquidity pool */
export class NoLiquidityPoolError extends Error {
  constructor() {
    super();

    this.name = 'NoLiquidity';
  }
}
