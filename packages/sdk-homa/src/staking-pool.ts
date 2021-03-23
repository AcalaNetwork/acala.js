import { FixedPointNumber } from '@acala-network/sdk-core/fixed-point-number';
import { getFee } from './help';

interface StakingPoolLedgerData {
  bonded: FixedPointNumber;
  unbondingToFree: FixedPointNumber;
  freePool: FixedPointNumber;
  toUnbondNextEra: [FixedPointNumber, FixedPointNumber];
}

interface StakingPoolParams {
  targetMaxFreeUnbondedRatio: FixedPointNumber;
  targetMinFreeUnbondedRatio: FixedPointNumber;
  targetUnbondingToFreeRatio: FixedPointNumber;
  baseFeeRate: FixedPointNumber;
}

interface StakingPoolConfig {
  params: StakingPoolParams;
  ledger: StakingPoolLedgerData;

  defaultExchangeRate: FixedPointNumber;
  liquidTotalIssuance: FixedPointNumber;
  bondingDuration: number;

  currentEra: number;
  decimal: number;
}

class StakingPoolLedger implements StakingPoolLedgerData {
  public bonded: FixedPointNumber;
  public unbondingToFree: FixedPointNumber;
  public freePool: FixedPointNumber;
  public toUnbondNextEra: [FixedPointNumber, FixedPointNumber];

  constructor(data: StakingPoolLedgerData) {
    this.bonded = data.bonded.clone();
    this.unbondingToFree = data.unbondingToFree.clone();
    this.freePool = data.freePool.clone();
    this.toUnbondNextEra = [data.toUnbondNextEra[0].clone(), data.toUnbondNextEra[1].clone()];

    this.bonded.forceSetPrecision(18);
    this.unbondingToFree.forceSetPrecision(18);
    this.freePool.forceSetPrecision(18);
    this.toUnbondNextEra[0].forceSetPrecision(18);
    this.toUnbondNextEra[1].forceSetPrecision(18);
  }

  public get total() {
    const { bonded, unbondingToFree, freePool } = this;

    return bonded.plus(unbondingToFree).plus(freePool);
  }

  public get totalBelongToLiquidHolders() {
    const { toUnbondNextEra } = this;
    const claimedToUnbond = toUnbondNextEra[1];

    return this.total.minus(claimedToUnbond);
  }

  public get bondedBelongToLiquidHolders() {
    const { bonded, toUnbondNextEra } = this;
    const claimedToUnbond = toUnbondNextEra[1];

    return bonded.minus(claimedToUnbond);
  }

  public get freePoolRatio() {
    return FixedPointNumber.fromRational(this.freePool, this.totalBelongToLiquidHolders);
  }

  public get unbondingToFreeRatio() {
    return FixedPointNumber.fromRational(this.unbondingToFree, this.totalBelongToLiquidHolders);
  }
}

export class StakingPool {
  public params: StakingPoolParams;
  private ledger: StakingPoolLedger;
  private decimal: number;

  public defaultExchangeRate!: FixedPointNumber;
  public liquidTotalIssuance!: FixedPointNumber;
  public bondingDuration!: number;
  public currentEra!: number;

  constructor(config: StakingPoolConfig) {
    this.params = config.params;
    this.defaultExchangeRate = config.defaultExchangeRate;
    this.liquidTotalIssuance = config.liquidTotalIssuance.clone();
    this.bondingDuration = config.bondingDuration;
    this.currentEra = config.currentEra;

    this.liquidTotalIssuance.forceSetPrecision(18);
    this.decimal = config.decimal;

    this.ledger = new StakingPoolLedger(config.ledger);
  }

  public get total(): FixedPointNumber {
    const result = this.ledger.total.clone();

    result.forceSetPrecision(this.decimal);

    return result;
  }

  public get freePool(): FixedPointNumber {
    const result = this.ledger.freePool.clone();

    result.forceSetPrecision(this.decimal);

    return result;
  }

  public get totalBelongToLiquidHolders(): FixedPointNumber {
    const result = this.ledger.totalBelongToLiquidHolders.clone();

    result.forceSetPrecision(this.decimal);

    return result;
  }

  public get bondedBelongToLiquidHolders(): FixedPointNumber {
    const result = this.ledger.bondedBelongToLiquidHolders.clone();

    result.forceSetPrecision(this.decimal);

    return result;
  }

  public get unbondingToFree(): FixedPointNumber {
    const result = this.ledger.unbondingToFree.clone();

    result.forceSetPrecision(this.decimal);

    return result;
  }

  /**
   * @name getLiquidAmountInMint
   * @description get the amount of liquid currency with mint
   */
  public getLiquidAmountInMint(amount: FixedPointNumber): FixedPointNumber {
    if (amount.isZero()) return FixedPointNumber.ZERO;

    const _amount = amount.clone();

    _amount.forceSetPrecision(18);

    const result = this.liquidExchangeRate().reciprocal().times(amount);

    result.forceSetPrecision(amount.getPrecision());

    return result;
  }

  /**
   * @name getStakingAmountInRedeemByUnbond
   * @description get the staking currency amount with redeem by unbond
   */
  public getStakingAmountInRedeemByUnbond(amount: FixedPointNumber): { atEra: number; amount: FixedPointNumber } {
    const precision = amount.getPrecision();

    amount = amount.clone();
    amount.forceSetPrecision(18);

    if (amount.isZero()) return { atEra: this.currentEra, amount: FixedPointNumber.ZERO };

    const liquidExchangeRate = this.liquidExchangeRate();
    let stakingAmountToUnbond = liquidExchangeRate.times(amount);
    const communalBondedStakingAmount = this.ledger.bondedBelongToLiquidHolders;

    if (!stakingAmountToUnbond.isZero() && !communalBondedStakingAmount.isZero()) {
      if (stakingAmountToUnbond.isGreaterThan(communalBondedStakingAmount)) {
        stakingAmountToUnbond = communalBondedStakingAmount;
      }

      stakingAmountToUnbond.forceSetPrecision(precision);

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
   * @name getStakingAmountInRedeemByFreeUnbonded
   * @description get staking amount with redeem by free unbonded
   */
  public getStakingAmountInRedeemByFreeUnbonded(
    amount: FixedPointNumber
  ): {
    demand: FixedPointNumber;
    fee: FixedPointNumber;
    received: FixedPointNumber;
  } {
    const precision = amount.getPrecision();

    amount = amount.clone();

    amount.forceSetPrecision(18);

    if (amount.isZero()) {
      return {
        demand: FixedPointNumber.ZERO,
        fee: FixedPointNumber.ZERO,
        received: FixedPointNumber.ZERO
      };
    }

    const liquidExchangeRate = this.liquidExchangeRate();

    const liquidAmountToBurn = amount;
    let demandStakingAmount = liquidExchangeRate.times(liquidAmountToBurn);

    const stakingPoolParams = this.params;

    // get available free unbonded amount in free unbonded pool
    const availableFreePool = this.ledger.freePool
      .minus(stakingPoolParams.targetMinFreeUnbondedRatio.times(this.ledger.totalBelongToLiquidHolders))
      .max(FixedPointNumber.ZERO);

    if (!demandStakingAmount.isZero() && !availableFreePool.isZero()) {
      if (demandStakingAmount.isGreaterThan(availableFreePool)) {
        demandStakingAmount = availableFreePool;
      }

      const currentFreePoolRatio = this.ledger.freePoolRatio;
      const remainAvailablePercent = currentFreePoolRatio
        .minus(stakingPoolParams.targetMinFreeUnbondedRatio)
        .div(
          stakingPoolParams.targetMaxFreeUnbondedRatio
            .max(currentFreePoolRatio)
            .minus(stakingPoolParams.targetMinFreeUnbondedRatio)
        );
      const feeInStaking =
        getFee(remainAvailablePercent, availableFreePool, demandStakingAmount, stakingPoolParams.baseFeeRate) ||
        FixedPointNumber.ZERO;

      const receivedStakingAmount = demandStakingAmount.minus(feeInStaking);

      feeInStaking.forceSetPrecision(precision);
      receivedStakingAmount.forceSetPrecision(precision);

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

  public getStakingAmountInClaimUnbonding(
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
    const precision = amount.getPrecision();

    amount = amount.clone();

    amount.forceSetPrecision(18);
    unbondingState.unbonding.forceSetPrecision(18);
    unbondingState.claimedUnbonding.forceSetPrecision(18);
    unbondingState.initialClaimedUnbonding.forceSetPrecision(18);

    if (amount.isZero()) {
      return {
        received: FixedPointNumber.ZERO,
        fee: FixedPointNumber.ZERO,
        demand: FixedPointNumber.ZERO,
        atEra: targetEra
      };
    }

    const currentEra = this.currentEra;
    const bondingDuration = this.bondingDuration;

    if (!(targetEra > currentEra && targetEra <= currentEra + bondingDuration)) {
      throw new Error('invalid era');
    }

    const liquidExchangeRate = this.liquidExchangeRate();
    const stakingPoolParams = this.params;

    const liquidAmountToBurn = amount;
    let demandStakingAmount = liquidExchangeRate.times(liquidAmountToBurn);
    const { unbonding, claimedUnbonding, initialClaimedUnbonding } = unbondingState;

    const initialUnclaimed = unbonding.minus(initialClaimedUnbonding);
    const unclaimed = unbonding.minus(claimedUnbonding);
    const availableUnclaimedUnbonding = unclaimed.minus(
      stakingPoolParams.targetMinFreeUnbondedRatio.times(initialUnclaimed)
    );

    if (!demandStakingAmount.isZero() && !availableUnclaimedUnbonding.isZero()) {
      if (demandStakingAmount.isGreaterThan(availableUnclaimedUnbonding)) {
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

      const feeInStaking =
        getFee(
          remainAvailablePercent,
          availableUnclaimedUnbonding,
          demandStakingAmount,
          stakingPoolParams.baseFeeRate
        ) || FixedPointNumber.ZERO;

      const claimedStakingAmount = demandStakingAmount.minus(feeInStaking);

      feeInStaking.forceSetPrecision(precision);
      demandStakingAmount.forceSetPrecision(precision);
      claimedStakingAmount.forceSetPrecision(precision);

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

  // formula: liquid = (total communal staking / total supply) * staking
  public liquidExchangeRate(): FixedPointNumber {
    const totalCommunalStakingAmount = this.ledger.totalBelongToLiquidHolders;

    if (totalCommunalStakingAmount.isZero() || this.liquidTotalIssuance.isZero()) {
      return this.defaultExchangeRate;
    }

    const result = FixedPointNumber.fromRational(totalCommunalStakingAmount, this.liquidTotalIssuance);

    if (result.isEqualTo(this.defaultExchangeRate)) {
      return this.defaultExchangeRate;
    }

    return result;
  }
}
