import { FixedPointNumber, Token } from '@acala-network/sdk-core';

interface LiquidityPoolState {
  token0: Token;
  token1: Token;
  pool0: FixedPointNumber;
  pool1: FixedPointNumber;
}

interface AddLiquidityParams {
  tokenA: Token;
  tokenB: Token;
  maxAmountA: FixedPointNumber;
  maxAmountB: FixedPointNumber;
  totalShare: FixedPointNumber;
}

/**
 * The Helper for liquidity to ex
 */
export class LiquidityPoolHelper {
  readonly token0: Token;
  readonly token1: Token;
  readonly pool0!: FixedPointNumber;
  readonly pool1!: FixedPointNumber;

  constructor(state: LiquidityPoolState) {
    const [token0, token1] = Token.sort(state.token0, state.token1) as [Token, Token];
    const [amount0, amount1] = state.token0.isEqual(token0) ? [state.pool0, state.pool1] : [state.pool1, state.pool0];

    this.token0 = token0;
    this.token1 = token1;
    this.pool0 = amount0;
    this.pool1 = amount1;
  }

  public estimateAddLiquidity(params: AddLiquidityParams): {
    incrementA: FixedPointNumber;
    incrementB: FixedPointNumber;
    incrementShare: FixedPointNumber;
  } {
    const { totalShare, maxAmountA, maxAmountB, tokenA } = params;

    // sort input by ordered tokens
    const [maxAmount0, maxAmount1] = this.token0.isEqual(tokenA) ? [maxAmountA, maxAmountB] : [maxAmountB, maxAmountA];

    totalShare.forceSetPrecision(18);
    maxAmount0.forceSetPrecision(18);
    maxAmount1.forceSetPrecision(18);

    let pool0Increment = FixedPointNumber.ZERO;
    let pool1Increment = FixedPointNumber.ZERO;
    let incrementShare = FixedPointNumber.ZERO;

    if (totalShare.isZero()) {
      const exchangeRate0 = FixedPointNumber.ONE;
      const exchagneRate1 = FixedPointNumber.fromRational(maxAmount0, maxAmount1);

      const sharesFromToken0 = exchangeRate0.mul(maxAmount0);
      const sharesFromToken1 = exchagneRate1.mul(maxAmount1);

      const initialShares = sharesFromToken0.add(sharesFromToken1);

      pool0Increment = maxAmount0;
      pool1Increment = maxAmount1;
      incrementShare = initialShares;
    } else {
      const exchangeRate01 = FixedPointNumber.fromRational(this.pool1, this.pool0);
      const inputExchangeRate01 = FixedPointNumber.fromRational(maxAmount1, maxAmount0);

      if (inputExchangeRate01.lte(exchangeRate01)) {
        const exchangeRate10 = FixedPointNumber.fromRational(this.pool0, this.pool1);
        const amount0 = exchangeRate10.mul(maxAmount1);
        const _incrementShare = FixedPointNumber.fromRational(amount0, this.pool0).mul(totalShare);

        pool0Increment = amount0;
        pool1Increment = maxAmount1;
        incrementShare = _incrementShare;
      } else {
        const amount1 = exchangeRate01.mul(maxAmount0);
        const _incrementShare = FixedPointNumber.fromRational(amount1, this.pool1).mul(totalShare);

        pool0Increment = maxAmount0;
        pool1Increment = amount1;
        incrementShare = _incrementShare;
      }
    }

    pool0Increment.forceSetPrecision(this.token0.decimal);
    pool1Increment.forceSetPrecision(this.token1.decimal);
    incrementShare.forceSetPrecision(this.token0.decimal);

    return {
      incrementA: this.token0.isEqual(tokenA) ? pool0Increment : pool1Increment,
      incrementB: this.token0.isEqual(tokenA) ? pool1Increment : pool0Increment,
      incrementShare
    };
  }
}
