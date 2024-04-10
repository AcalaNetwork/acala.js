import { FixedPointNumber } from './fixed-point-number.js';
import { Token } from './token.js';
export declare class TokenBalance {
    private _token;
    private _balance;
    constructor(token: Token, balance?: FixedPointNumber);
    get token(): Token;
    get balance(): FixedPointNumber;
    clone(): TokenBalance;
}
