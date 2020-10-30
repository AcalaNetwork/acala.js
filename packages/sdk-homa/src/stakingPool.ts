import { FixedPointNumber } from '@acala-network/sdk-core/fixed-point-number';
import { getFee } from './help';

interface StakingPoolConfig {
  stakingPoolParams: StakingPoolParams;
  defaultExchangeRate: FixedPointNumber;
  liquidTotalIssuance: FixedPointNumber;

  unbondNextEra: FixedPointNumber;

  currentEra: number;
  bondingDuration: number;

  totalBonded: FixedPointNumber; // bonded
  unbondingToFree: FixedPointNumber; // unbonding
  freeUnbonded: FixedPointNumber; // free
}

interface StakingPoolParams {
  targetMaxFreeUnbondedRatio: FixedPointNumber;
  targetMinFreeUnbondedRatio: FixedPointNumber;
  targetUnbondingToFreeRatio: FixedPointNumber;
  baseFeeRate: FixedPointNumber;
}

type StakingPoolConfigKeys = keyof StakingPoolConfig;

export class StakingPool {
  private stakingPoolParams!: StakingPoolParams;
  private defaultExchangeRate!: FixedPointNumber;
  private liquidTotalIssuance!: FixedPointNumber;

  private unbondNextEra!: FixedPointNumber;

  private currentEra!: number;
  private bondingDuration!: number;

  private totalBonded!: FixedPointNumber; // bonded
  private unbondingToFree!: FixedPointNumber; // unbonding
  private freeUnbonded!: FixedPointNumber; // free

  constructor (config: StakingPoolConfig) {
    this.setParameters(config);
  }

  public setParameters (config: Partial<StakingPoolConfig>): void {
    (Object.keys(config) as unknown as StakingPoolConfigKeys[]).map((item) => {
      (this as any)[item] = config[item] as unknown as FixedPointNumber;
    });
  }

  /**
   * @name getLiquidAmountInMint
   * @description get the amount of liquid currency with mint
   */
  public getLiquidAmountInMint (amount: FixedPointNumber): FixedPointNumber {
    if (amount.isZero()) return FixedPointNumber.ZERO;

    return this.liquidExchangeRate()
      .reciprocal()
      .times(amount);
  }

  /**
   * @name getStakingAmountInRedeemByUnbond
   * @description get the staking currency amount with redeem by unbond
   */
  public getStakingAmountInRedeemByUnbond (amount: FixedPointNumber): { atEra: number; amount: FixedPointNumber } {
    const liquidExchangeRate = this.liquidExchangeRate();
    const communalBondedStakingAmount = this.getCommunalBonded();

    // will redeem all if communal bonded staking amount is not enough
    const stakingAmountToUnbond = liquidExchangeRate
      .times(amount)
      .min(communalBondedStakingAmount);

    if (!stakingAmountToUnbond.isZero() && !communalBondedStakingAmount.isZero()) {
      return {
        atEra: this.currentEra + 1 + this.bondingDuration,
        amount: stakingAmountToUnbond
      };
    }

    return {
      atEra: this.currentEra,
      amount: FixedPointNumber.ZERO
    };
  }

  /**
   * @name getStakingAmountInRedeemByFeeUnbonded
   * @description get staking amount with redeem by free unbonded
   */
  public getStakingAmountInRedeemByFreeUnbonded (amount: FixedPointNumber): {
    demand: FixedPointNumber;
    fee: FixedPointNumber;
    received: FixedPointNumber;
  } {
    const liquidExchangeRate = this.liquidExchangeRate();

    let redeemLiquidAmount = amount;
    let demandStakingAmount = liquidExchangeRate.times(redeemLiquidAmount);

    const stakingPoolParams = this.stakingPoolParams;

    // get available free unbonded amount in free unbonded pool
    const availableFreeUnbonded = this.freeUnbonded
      .minus(
        stakingPoolParams.targetMinFreeUnbondedRatio
          .times(this.getTotalCommunalBalance())
      )
      .max(FixedPointNumber.ZERO);

    if (!demandStakingAmount.isZero() && !availableFreeUnbonded.isZero()) {
      if (demandStakingAmount.isGreaterThan(availableFreeUnbonded)) {
        const ratio = FixedPointNumber.fromRational(
          availableFreeUnbonded,
          demandStakingAmount
        );

        redeemLiquidAmount = ratio.times(redeemLiquidAmount);
        demandStakingAmount = availableFreeUnbonded;
      }

      const currentFreeUnbondedRatio = this.getFreeUnbondedRatio();
      const remainAvailablePercent = currentFreeUnbondedRatio
        .minus(stakingPoolParams.targetMinFreeUnbondedRatio)
        .div(
          stakingPoolParams.targetMaxFreeUnbondedRatio
            .max(currentFreeUnbondedRatio)
            .minus(stakingPoolParams.targetMinFreeUnbondedRatio)
        );
      const feeInStaking = getFee(
        remainAvailablePercent,
        availableFreeUnbonded,
        demandStakingAmount,
        stakingPoolParams.baseFeeRate
      ) || FixedPointNumber.ZERO;

      const receivedStakingAmount = demandStakingAmount.minus(feeInStaking);

      return {
        demand: demandStakingAmount,
        fee: feeInStaking,
        received: receivedStakingAmount
      };
    }

    return {
      demand: FixedPointNumber.ZERO,
      fee: FixedPointNumber.ZERO,
      received: FixedPointNumber.ZERO
    };
  }

  public getStakingAmountInClaimUnbonding (
    amount: FixedPointNumber,
    targetEra: number,
    unbondingState: {
      unbonding: FixedPointNumber;
      claimedUnbonding: FixedPointNumber;
      initialClaimedUnbonding: FixedPointNumber;
    }
  ): {
      atEra: number;
      demand: FixedPointNumber;
      received: FixedPointNumber;
      fee: FixedPointNumber;
    } {
    const currentEra = this.currentEra;
    const bondingDuration = this.bondingDuration;

    if (!(targetEra > currentEra && (targetEra <= currentEra + bondingDuration))) {
      throw new Error('invalide era');
    }

    const liquidExchangeRate = this.liquidExchangeRate();
    const stakingPoolParams = this.stakingPoolParams;

    let redeemLiquidAmount = amount;
    let demandStakingAmount = liquidExchangeRate.times(redeemLiquidAmount);
    const {
      unbonding,
      claimedUnbonding,
      initialClaimedUnbonding
    } = unbondingState;

    const initialUnclaimed = unbonding.minus(initialClaimedUnbonding);
    const unclaimed = unbonding.minus(claimedUnbonding);
    const availableUnclaimedUnbonding = unclaimed
      .minus(
        stakingPoolParams.targetMinFreeUnbondedRatio.times(initialUnclaimed)
      );

    if (!demandStakingAmount.isZero() && !availableUnclaimedUnbonding.isZero()) {
      if (demandStakingAmount.isGreaterThan(availableUnclaimedUnbonding)) {
        const ratio = FixedPointNumber.fromRational(
          availableUnclaimedUnbonding,
          demandStakingAmount
        );

        redeemLiquidAmount = ratio.times(redeemLiquidAmount);
        demandStakingAmount = availableUnclaimedUnbonding;
      }

      const currentUnclaimedRatio = FixedPointNumber.fromRational(unclaimed, initialUnclaimed);
      const remainAvailablePercent = currentUnclaimedRatio
        .minus(stakingPoolParams.targetMinFreeUnbondedRatio)
        .div(
          stakingPoolParams.targetMaxFreeUnbondedRatio
            .max(currentUnclaimedRatio)
            .minus(stakingPoolParams.targetMinFreeUnbondedRatio)
        );

      const feeInStaking = getFee(
        remainAvailablePercent,
        availableUnclaimedUnbonding,
        demandStakingAmount,
        stakingPoolParams.baseFeeRate
      ) || FixedPointNumber.ZERO;

      const claimedStakingAmount = demandStakingAmount.minus(feeInStaking);

      return {
        received: claimedStakingAmount,
        fee: feeInStaking,
        demand: demandStakingAmount,
        atEra: targetEra
      };
    }

    return {
      received: FixedPointNumber.ZERO,
      fee: FixedPointNumber.ZERO,
      demand: FixedPointNumber.ZERO,
      atEra: targetEra
    };
  }

  // how much bonded DOT is belone to LDOT holders
  public getCommunalBonded (): FixedPointNumber {
    return this.totalBonded.minus(this.unbondNextEra).max(FixedPointNumber.ZERO);
  }

  // get bonded DOT(include bonded, unbonded, unbonding) relong to LDOT
  public getTotalCommunalBalance (): FixedPointNumber {
    return this.getCommunalBonded()
      .plus(this.freeUnbonded)
      .plus(this.unbondingToFree);
  }

  // ratio of free pool and total communal
  public getFreeUnbondedRatio (): FixedPointNumber {
    return FixedPointNumber
      .fromRational(this.freeUnbonded, this.getTotalCommunalBalance())
      .max(FixedPointNumber.ZERO);
  }

  // ratio of unbonding to free and total communal
  public getUnbondingToFreeRatio (): FixedPointNumber {
    return FixedPointNumber
      .fromRational(this.unbondingToFree, this.getTotalCommunalBalance())
      .max(FixedPointNumber.ZERO);
  }

  // ratio of bonded and total communal
  public getBondedRatio (): FixedPointNumber {
    return FixedPointNumber
      .fromRational(this.getCommunalBonded(), this.getTotalCommunalBalance())
      .max(FixedPointNumber.ZERO);
  }

  // formula: liquid = (total communal staking / total supply) * staking
  public liquidExchangeRate (): FixedPointNumber {
    const totalCommunalStakingAmount = this.getTotalCommunalBalance();

    if (totalCommunalStakingAmount.isZero()) {
      return this.defaultExchangeRate;
    }

    const result = FixedPointNumber.fromRational(
      totalCommunalStakingAmount,
      this.liquidTotalIssuance
    );

    return result.isFinaite() ? result : this.defaultExchangeRate;
  }
}
