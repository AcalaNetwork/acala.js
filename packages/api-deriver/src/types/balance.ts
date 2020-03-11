import { Codec } from "@polkadot/types/types";

export interface DerivedBalance {
    asset: string;
    balance: Codec;
}

export interface DerivedAccountBalances {
    account: string;
    balances: DerivedBalance[];
}