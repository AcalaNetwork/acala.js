import { EraIndex, Balance } from '@polkadot/types/interfaces';
import { Ratio, Rate, ExchangeRate, CurrencyId, BlockNumber } from '@acala-network/types/interfaces';

export interface DerivedStakingPoolConstants {
  maxBondRatio: Ratio;
  minBondRatio: Ratio;
  maxClaimFee: Rate;
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
}
