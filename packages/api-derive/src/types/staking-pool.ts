import { EraIndex, Balance } from '@polkadot/types/interfaces';
import { StakingBalance, Ratio, Rate, ExchangeRate, CurrencyId, BlockNumber } from '@acala-network/types/interfaces';

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
  nextEraUnbond: [StakingBalance, StakingBalance];
  totalClaimedUnbonded: StakingBalance;
  totalBonded: StakingBalance;
  unbondingToFree: StakingBalance;
  freeUnbonded: StakingBalance;
  liquidTokenIssuance: Balance;
}
