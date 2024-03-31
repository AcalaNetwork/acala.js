import { FixedPointNumber } from './fixed-point-number';
import { Token } from './token';
export declare class TokenBalance {
    private _token;
    private _balance;
    constructor(token: Token, balance?: FixedPointNumber);
    get token(): Token;
    get balance(): FixedPointNumber;
    clone(): TokenBalance;
}
