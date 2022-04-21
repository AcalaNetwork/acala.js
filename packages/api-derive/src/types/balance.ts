import { Balance } from '@acala-network/types/interfaces';
import { AcalaPrimitivesCurrencyCurrencyId } from '@acala-network/types/interfaces/types-lookup';

export interface DerivedBalance {
  currency: AcalaPrimitivesCurrencyCurrencyId;
  balance: Balance;
}

export type DerivedAllBalances = DerivedBalance[];
