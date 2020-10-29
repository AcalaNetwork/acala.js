import { EraIndex, Balance } from '@polkadot/types/interfaces';
import { ExchangeRate, CurrencyId, BlockNumber, Params } from '@acala-network/types/interfaces';

export interface DerivedStakingPoolConstants {
  defaultExchangeRate: ExchangeRate;
  stakingCurrency: CurrencyId;
  liquidCurrency: CurrencyId;
  eraLength: BlockNumber;
  bondingDuration: EraIndex;
}

export interface DerivedStakingPool extends DerivedStakingPoolConstants {
  currentEra: EraIndex;
  nextEraUnbond: [Balance, Balance];
  totalClaimedUnbonded: Balance;
  totalBonded: Balance;
  unbondingToFree: Balance;
  freeUnbonded: Balance;
  liquidTokenIssuance: Balance;
  stakingPoolParams: Params;
}
