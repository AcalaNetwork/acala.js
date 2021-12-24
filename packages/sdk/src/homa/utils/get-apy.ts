import { FixedPointNumber } from '@acala-network/sdk-core';
import { ChainType } from '../../types';

const ESTIMATE_ERA_COUNT: Partial<{ [k in ChainType]: number }> = {
  [ChainType.ACALA]: 10000,
  [ChainType.KARURA]: 10000
};

export function getAPY(rewardRate: FixedPointNumber, chain?: ChainType): number {
  if (!chain) return 0;

  const eraCountOneYear = ESTIMATE_ERA_COUNT[chain] || 0;

  return Math.pow(rewardRate.toNumber() + 1, eraCountOneYear) - 1;
}
