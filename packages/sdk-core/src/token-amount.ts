import { BasicToken } from "./token";
import { FixedPointNumber } from "./fixed-point-number";

export class TokenAmount<T extends BasicToken> extends FixedPointNumber {
  readonly token: T;

  constructor (token: T, amount = FixedPointNumber.ZERO) {
    const precision = token.precision || amount.getPrecision() || 18;

    super(amount.toString(18), precision);

    this.token = token;
  }

  isEqual <F extends BasicToken>(target: TokenAmount<F>): boolean {
    return this.token.isEqual(target.token)
      && this.toString(18) === target.toString();
  }
}