import { EraIndex } from '@polkadot/types/interfaces';
import { ExchangeRate, CurrencyId, BlockNumber, Params, Ledger, Balance } from '@acala-network/types/interfaces';

export interface DerivedStakingPoolConstants {
  defaultExchangeRate: ExchangeRate;
  stakingCurrency: CurrencyId;
  liquidCurrency: CurrencyId;
  eraLength: BlockNumber;
  bondingDuration: EraIndex;
}

export interface DerivedStakingPool extends DerivedStakingPoolConstants {
  currentEra: EraIndex;
  ledger: Ledger;
  params: Params;
  liquidIssuance: Balance;
}
