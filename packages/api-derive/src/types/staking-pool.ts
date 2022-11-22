import { EraIndex } from '@polkadot/types/interfaces';
import { ExchangeRate, BlockNumber, Params, Ledger, Balance } from '@acala-network/types/interfaces';
import { AcalaPrimitivesCurrencyCurrencyId } from '@polkadot/types/lookup';

export interface DerivedStakingPoolConstants {
  defaultExchangeRate: ExchangeRate;
  stakingCurrency: AcalaPrimitivesCurrencyCurrencyId;
  liquidCurrency: AcalaPrimitivesCurrencyCurrencyId;
  eraLength: BlockNumber;
  bondingDuration: EraIndex;
}

export interface DerivedStakingPool extends DerivedStakingPoolConstants {
  currentEra: EraIndex;
  ledger: Ledger;
  params: Params;
  liquidIssuance: Balance;
}
