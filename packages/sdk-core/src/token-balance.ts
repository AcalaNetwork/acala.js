import { FixedPointNumber } from './fixed-point-number';
import { BaseToken } from './base-token';
import { Token } from './token';

export class TokenBalance<T extends BaseToken = Token> {
  private _token: T;
  private _balance: FixedPointNumber;

  constructor(token: T, balance?: FixedPointNumber) {
    this._token = token;

    if (balance) {
      balance.setPrecision(token.decimal);
      this._balance = balance;
    } else {
      this._balance = new FixedPointNumber(0, token.decimal);
    }
  }

  get token(): T {
    return this._token;
  }

  get balance(): FixedPointNumber {
    return this._balance;
  }

  public clone(): TokenBalance<T> {
    return new TokenBalance(this._token.clone() as T, this._balance.clone());
  }
}
