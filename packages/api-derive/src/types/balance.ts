import { Balance, CurrencyId } from '@acala-network/types/interfaces';

export interface DerivedBalance {
  currency: CurrencyId | string;
  balance: Balance;
}

export type DerivedAllBalances = DerivedBalance[];
