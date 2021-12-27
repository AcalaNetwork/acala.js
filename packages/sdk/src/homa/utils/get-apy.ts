import { FixedPointNumber } from '@acala-network/sdk-core';
import { ChainType } from '../../types';

const ESTIMATE_BLOCK_TIME: Partial<{ [k in ChainType]: number }> = {
  [ChainType.ACALA]: 6 * 1000,
  [ChainType.KARURA]: 6 * 1000
};

const YEAR = 365 * 24 * 60 * 60;

export function getAPY(rewardRate: FixedPointNumber, eraFrequency: number, chain?: ChainType): number {
  if (!chain) return 0;

  if (!ESTIMATE_BLOCK_TIME[chain]) return 0;

  const eraCountOneYear = Math.floor(YEAR / (ESTIMATE_BLOCK_TIME[chain] || 0) / eraFrequency);

  return Math.pow(rewardRate.toNumber() + 1, eraCountOneYear) - 1;
}
