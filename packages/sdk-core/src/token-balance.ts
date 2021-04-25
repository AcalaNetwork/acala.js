import { FixedPointNumber } from './fixed-point-number';
import { Token } from './token';

export class TokenBalance {
  private _token: Token;
  private _balance: FixedPointNumber;

  constructor(token: Token, balance?: FixedPointNumber) {
    this._token = token;
    this._balance = balance || FixedPointNumber.ZERO;
  }

  get token(): Token {
    return this._token;
  }

  get balance(): FixedPointNumber {
    return this._balance;
  }

  public clone(): TokenBalance {
    return new TokenBalance(this._token.clone(), this._balance.clone());
  }
}
