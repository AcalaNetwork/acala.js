import { EraIndex, Balance } from '@polkadot/types/interfaces';
import { StakingBalance, Ratio, Rate, ExchangeRate, CurrencyId } from '@acala-network/types/interfaces';

export interface DerivedStakingPool {
  currentEra: EraIndex;
  nextEraUnbond: [StakingBalance, StakingBalance];
  totalClaimedUnbonded: StakingBalance;
  totalBonded: StakingBalance;
  unbondingToFree: StakingBalance;
  freeUnbonded: StakingBalance;
  liquidTokenIssuance: Balance;
  maxBondRatio: Ratio;
  minBondRatio: Ratio;
  maxClaimFee: Rate;
  defaultExchangeRate: ExchangeRate;
  stakingCurrency: CurrencyId;
  liquidCurrency: CurrencyId;
}
