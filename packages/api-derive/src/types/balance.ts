import { Balance, CurrencyId } from '@acala-network/types/interfaces';

export interface DerivedBalance {
  token: CurrencyId | string;
  balance: Balance;
}

export type DerivedAllBalances = DerivedBalance[];
