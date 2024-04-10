import { Token } from './token.js';
export declare class TokenSet {
    private _list;
    constructor();
    values(): Token[];
    add(target: Token): void;
    delete(target: Token): void;
    clear(): void;
}
