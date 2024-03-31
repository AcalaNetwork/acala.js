import { Token } from './token';
export declare class TokenSet {
    private _list;
    constructor();
    values(): Token[];
    add(target: Token): void;
    delete(target: Token): void;
    clear(): void;
}
