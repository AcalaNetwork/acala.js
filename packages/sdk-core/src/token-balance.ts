import { FixedPointNumber } from './fixed-point-number';
import { Token } from './token';

export class TokenBalance {
  private _token: Token;
  private _balance: FixedPointNumber;

  constructor(token: Token, balance?: FixedPointNumber) {
    this._token = token;

    if (balance) {
      this._balance = balance;
      this._balance.setPrecision(token.decimal);
    } else {
      this._balance = new FixedPointNumber(0, token.decimal);
    }
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
