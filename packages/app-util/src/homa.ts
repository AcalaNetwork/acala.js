import { Codec } from '@polkadot/types/types';

import { Fixed18, convertToFixed18 } from './fixed-18';

/**
 * @name calcCommunalBonded
 * @description bonded token balance belong to the liqiud token holders
 */
export const calcCommunalBonded = (totalBonded: Fixed18, nextEraClaimedUnbonded: Fixed18): Fixed18 => {
  return totalBonded.sub(nextEraClaimedUnbonded);
};

/**
 * @name calcCommunalTotal
 * @description total bonded token balance (includ bonded, free(unbonded), unbonding)
 */
export const calcCommunalTotal = (
  communalBonded: Fixed18,
  communalFree: Fixed18,
  unbondingToFree: Fixed18
): Fixed18 => {
  return communalBonded.add(communalFree).add(unbondingToFree);
};

/**
 * @name calcCommunalBondedRatio
 * @param {Fixed18} communalBonded - bonded token balance belone to the liqiud token holders
 * @param {Fixed18} commuanlTotal - total Bonded token balance (includ Bonded, free(Unbonded), unbonding)
 */
export const calcCommunalBondedRatio = (communalBonded: Fixed18, commuanlTotal: Fixed18): Fixed18 => {
  return communalBonded.div(commuanlTotal);
};

/**
 * @name calcLiquidExchangeRate
 * @description calculate liquid exhchange rate
 * @param {Fixed18} liquidTokenIssuance - liquid token issuance
 * @param {Fixed18} commuanlTotal - total brnded token balance (includ bonded, free(unbonded), unbonding)
 * @param {Fixed18} defaultExchangeRate - default exchange rate
 */
export const calcLiquidExchangeRate = (
  liquidTokenIssuance: Fixed18,
  commuanlTotal: Fixed18,
  defaultExchangeRate: Fixed18
): Fixed18 => {
  if (liquidTokenIssuance.isZero() || commuanlTotal.isZero()) {
    return defaultExchangeRate;
  }
  return commuanlTotal.div(liquidTokenIssuance);
};

/**
 * @name calcClaimFeeRatio
 * @description calculate claim fee ratio
 * @param {Fixed18} maxClaimFee - max claim fee
 * @param {number} targetEra - target era
 * @param {number} bondingDuration - bonding duration era
 */
export const calcClaimFeeRatio = (
  targetEra: number,
  currentEra: number,
  maxClaimFee: Fixed18,
  bondingDuration: number
): Fixed18 => {
  const claimPeriodPercent = Fixed18.fromRational(Math.max(targetEra - currentEra, 0), bondingDuration + 1);
  return Fixed18.fromNatural(1).sub(claimPeriodPercent).mul(maxClaimFee);
};

/**
 * @name calcClaimFee
 * @description calculate claim fee
 * @param {Fixed18} amount - claim amount
 * @param {Fixed18} maxClaimFee - max claim fee
 * @param {number} targetEra - target era
 * @param {number} bondingDuration - bonding duration era
 */
export const calcClaimFee = (
  amount: Fixed18,
  targetEra: number,
  currentEra: number,
  maxClaimFee: Fixed18,
  bondingDuration: number
): Fixed18 => {
  return amount.mul(calcClaimFeeRatio(targetEra, currentEra, maxClaimFee, bondingDuration));
};

interface StakingPoolParams {
  totalBonded: Fixed18 | Codec;
  communalFree: Fixed18 | Codec;
  unbondingToFree: Fixed18 | Codec;
  nextEraClaimedUnbonded: Fixed18 | Codec;
  liquidTokenIssuance: Fixed18 | Codec;
  defaultExchangeRate: Fixed18 | Codec;
  maxClaimFee: Fixed18 | Codec;
  bondingDuration: number | Codec;
  currentEra: number | Codec;
}

const convertToNumber = (data: number | Codec): number => {
  if (typeof data === 'number') {
    return data;
  }
  return Number(data.toString());
};
/**
 * @class StakingPoolHelper
 * @classdesc support more structured api, include staking pool properties and derived properties
 */
export class StakingPoolHelper {
  public totalBonded: Fixed18; // total Bonded token amount in the staking pool
  public communalFree: Fixed18; // communal free token amount in the staking pool
  public unbondingToFree: Fixed18; // unbonding to free token amount in the staking pool
  public nextEraClaimedUnbonded: Fixed18; // claimed Unbonded token amount at next era
  public liquidTokenIssuance: Fixed18;
  public defaultExchangeRate: Fixed18;
  public maxClaimFee: Fixed18;
  public bondingDuration: number;
  public currentEra: number;

  constructor(params: StakingPoolParams) {
    this.totalBonded = convertToFixed18(params.totalBonded);
    this.communalFree = convertToFixed18(params.communalFree);
    this.unbondingToFree = convertToFixed18(params.unbondingToFree);
    this.nextEraClaimedUnbonded = convertToFixed18(params.nextEraClaimedUnbonded);
    this.liquidTokenIssuance = convertToFixed18(params.liquidTokenIssuance);
    this.defaultExchangeRate = convertToFixed18(params.defaultExchangeRate);
    this.maxClaimFee = convertToFixed18(params.maxClaimFee);
    this.bondingDuration = convertToNumber(params.bondingDuration);
    this.currentEra = convertToNumber(params.currentEra);
  }

  get communalBonded(): Fixed18 {
    return calcCommunalBonded(this.totalBonded, this.nextEraClaimedUnbonded);
  }

  get communalTotal(): Fixed18 {
    return calcCommunalTotal(this.communalBonded, this.communalFree, this.unbondingToFree);
  }

  get communalBondedRatio(): Fixed18 {
    return calcCommunalBondedRatio(this.communalBonded, this.communalTotal);
  }

  get liquidExchangeRate(): Fixed18 {
    return calcLiquidExchangeRate(this.liquidTokenIssuance, this.communalTotal, this.defaultExchangeRate);
  }

  public convertToLiquid(amount: Fixed18): Fixed18 {
    return Fixed18.fromNatural(1).div(this.liquidExchangeRate).mul(amount);
  }

  public claimFeeRatio(era: number): Fixed18 {
    return calcClaimFeeRatio(era, this.currentEra, this.maxClaimFee, this.bondingDuration);
  }

  public claimFee(amount: Fixed18, era: number): Fixed18 {
    return calcClaimFee(amount, era, this.currentEra, this.maxClaimFee, this.bondingDuration);
  }
}
