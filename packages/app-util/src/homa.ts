import { Fixed18 } from './fixed-18';

/**
 * @name getCommunalBonedBalance
 * @description bonded token balance which is blone to the liqiud token holders
 */
export const getCommunalBondedBalance = (totalBonded: Fixed18, nextEraClaimedUnboned: Fixed18): Fixed18 => {
  return totalBonded.sub(nextEraClaimedUnboned);
};
/**
 * @name getTotalCommunalBalance
 * @description boned token balance (includ boned, unboned, unbonding)
 */
export const getTotalCommunalBalance = (
  communalBonded: Fixed18,
  freeUnbonded: Fixed18,
  unbondingToFree: Fixed18
): Fixed18 => {
  return communalBonded.add(freeUnbonded).add(unbondingToFree);
};

/**
 * @name getCommunalBonedRatio
 * @param {Fixed18} communalBonded - bonded token balance which is blone to the liqiud token holders
 * @param {Fixed18} totalCommunal - boned token balance (includ boned, unboned, unbonding)
 */
export const getCommunalBondedRatio = (communalBonded: Fixed18, totalCommunal: Fixed18): Fixed18 => {
  return communalBonded.div(totalCommunal);
};

/**
 * @name calcLiquidExchangeRate
 * @description calculate liquid exhchange rate
 * @param {Fixed18} liquidTokenAmount - liquid token issuance
 * @param {Fixed18} stakingTokenAmount - staking token amount, same to the result of getTotalCommunalBalance
 * @param {Fixed18} defaultExchangeRate - default exchange rate
 */
export const calcLiquidExchangeRate = (
  liquidTokenAmount: Fixed18,
  stakingTokenAmount: Fixed18,
  defaultExchangeRate: Fixed18
): Fixed18 => {
  if (liquidTokenAmount.isZero() || stakingTokenAmount.isZero()) {
    return defaultExchangeRate;
  }
  return stakingTokenAmount.div(liquidTokenAmount);
};
