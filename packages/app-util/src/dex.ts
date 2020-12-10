import { Fixed18 } from './fixed-18';

interface Pool {
  other: Fixed18;
  base: Fixed18;
}

const ONE = Fixed18.fromNatural(1);

/**
 * @name calcSwapTargetAmount
 * @description calculate how many target token can be received
 * Equation: received = (1 - slippage) * (1 - fee) * (targetPool - (supplyPool * targetPool) / (supplyPool + supply))
 * @param {number} supply - supply token amount in swap-target process
 * @param {number} supplyPool - token amount in the supply pool (base tokens pool)
 * @param {number} targetPool - token amount in the target pool (other token pool)
 * @param {Fixed18} feeRate - swap fee rate
 * @param {Fixed18} [slippage=0] - swap slippage
 * @returns {number} return target token amount which can be received
 */
export function calcSwapTargetAmount(
  supply: number,
  supplyPool: number,
  targetPool: number,
  feeRate: Fixed18,
  slippage = Fixed18.ZERO
): number {
  const newTargetPool = Fixed18.fromRational(supplyPool, supplyPool + supply)
    .mul(Fixed18.fromNatural(targetPool))
    .toNumber(0, 3);

  // if new target pool is too small, return target as 0
  if (newTargetPool <= 0) return 0;

  const receivedAmount = targetPool - newTargetPool;
  let fee = feeRate.mul(Fixed18.fromNatural(receivedAmount)).toNumber(0, 3);

  // if fee is too small, ignore fee
  fee = fee <= 0 ? 0 : fee;
  return ONE.sub(slippage)
    .mul(Fixed18.fromNatural(receivedAmount - fee))
    .toNumber(0, 3);
}

/**
 * @name calcSwapSupplyAmount
 * @description calculate how many supply token need
 * Equation: received = (1 - slippage) * targetPool * supplyPool / (targetPool - target / (1 - feeRate)) - supplyPool
 * @param {number} target - target token amount in swap-supply process
 * @param {number} supplyPool - token amount in the supply pool (base tokens pool)
 * @param {number} targetPool - token amount in the target pool (other token pool)
 * @param {Fixed18} feeRate - swap fee rate
 * @param {Fixed18} [slippage=0] - swap slippage
 * @returns {number} return target token amount which can be received
 */
export function calcSwapSupplyAmount(
  target: number,
  supplyPool: number,
  targetPool: number,
  feeRate: Fixed18,
  slippage = Fixed18.ZERO
): number {
  if (target === 0) return 0;

  // handle slippage
  target = Fixed18.fromNatural(target).div(ONE.sub(slippage)).toNumber(0, 3);
  // new_target_pool = target_pool - target_amount / (1 - GetExchangeFee)
  const rate = ONE.div(ONE.sub(feeRate)).decimalPlaces(18, 3);
  const newTargetPool = targetPool - rate.mul(Fixed18.fromNatural(target)).toNumber(0, 3);
  const result =
    Fixed18.fromRational(supplyPool, newTargetPool)
      .add(Fixed18.fromParts(1))
      .mul(Fixed18.fromNatural(targetPool))
      .toNumber(0, 3) - supplyPool;

  return result < 0 ? 0 : result;
}

/**
 * @name calaTargetInOtherToBase
 * @description calculate how many base tokens will be received in other-to-base process
 * @param {Fixed18} supply - supply token amount
 * @param {Fixed18} pool.other - token amount in the other pool
 * @param {Fixed18} pool.base - token amount in the base pool
 * @param {Fixed18} feeRate - swap fee rate
 * @param {Fixed18} [slippage=0] - swap slippage
 * @returns {Fixed} return amount of received base tokens in other-to-base process
 */
export function calcTargetInOtherToBase(
  supply: Fixed18,
  pool: Pool,
  feeRate: Fixed18,
  slippage = Fixed18.ZERO
): Fixed18 {
  const result = calcSwapTargetAmount(
    supply.innerToNumber(),
    pool.other.innerToNumber(),
    pool.base.innerToNumber(),
    feeRate,
    slippage
  );
  return Fixed18.fromParts(result);
}

/**
 * @name calaSupplyInOtherToBase
 * @description calculate how many other tokens need in other-to-base process
 * @param {Fixed18} supply - supply token amount
 * @param {Fixed18} pool.other - token amount in the other pool
 * @param {Fixed18} pool.base - token amount in the base pool
 * @param {Fixed18} feeRate - swap fee rate
 * @param {Fixed18} [slippage=0] - swap slippage
 * @returns {Fixed} return amount of required base tokens in other-to-base process
 */
export function calcSupplyInOtherToBase(
  target: Fixed18,
  pool: Pool,
  feeRate: Fixed18,
  slippage = Fixed18.ZERO
): Fixed18 {
  const result = calcSwapSupplyAmount(
    target.innerToNumber(),
    pool.other.innerToNumber(),
    pool.base.innerToNumber(),
    feeRate,
    slippage
  );
  return Fixed18.fromParts(result);
}

/**
 * @name calaTargetInBaseToOther
 * @description calculate how many other tokens will be received in base-to-other process
 * @param {Fixed18} supply - supply token amount
 * @param {Fixed18} pool.other - token amount in the other pool
 * @param {Fixed18} pool.base - token amount in the base pool
 * @param {Fixed18} feeRate - swap fee rate
 * @param {Fixed18} [slippage=0] - swap slippage
 * @returns {Fixed} return amount of received other tokens in base-to-other process
 */
export function calcTargetInBaseToOther(
  supply: Fixed18,
  pool: Pool,
  feeRate: Fixed18,
  slippage = Fixed18.ZERO
): Fixed18 {
  const result = calcSwapTargetAmount(
    supply.innerToNumber(),
    pool.base.innerToNumber(),
    pool.other.innerToNumber(),
    feeRate,
    slippage
  );
  return Fixed18.fromParts(result);
}

/**
 * @name calaSupplyInBaseToOther
 * @description calculate how many base tokens need in other-to-base process
 * @param {Fixed18} target - target token amount
 * @param {Fixed18} pool.other - token amount in the other pool
 * @param {Fixed18} pool.base - token amount in the base pool
 * @param {Fixed18} feeRate - swap fee rate
 * @param {Fixed18} [slippage=0] - swap slippage
 * @returns {Fixed} return amount of required base tokens in base-to-other process
 */
export function calcSupplyInBaseToOther(
  target: Fixed18,
  pool: Pool,
  feeRate: Fixed18,
  slippage = Fixed18.ZERO
): Fixed18 {
  const result = calcSwapSupplyAmount(
    target.innerToNumber(),
    pool.base.innerToNumber(),
    pool.other.innerToNumber(),
    feeRate,
    slippage
  );
  return Fixed18.fromParts(result);
}

/**
 * @name calaTargetInOtherToOther
 * @description calculate how many other tokens will be received in other-to-other process
 * @param {Fixed18} supply - supply token amount
 * @param {Fixed18} pool.other - token amount in the other pool
 * @param {Fixed18} pool.base - token amount in the base pool
 * @param {Fixed18} feeRate - swap fee rate
 * @param {Fixed18} [slippage=0] - swap slippage
 * @returns {Fixed} return amount of received other tokens in base-to-other process
 */
export function calcTargetInOtherToOther(
  supply: Fixed18,
  supplyPool: Pool,
  targetPool: Pool,
  feeRate: Fixed18,
  slippage = Fixed18.ZERO
): Fixed18 {
  // supply currency -> base currency
  const intermediateBaseCurrencyAmount = calcSwapTargetAmount(
    supply.innerToNumber(),
    supplyPool.other.innerToNumber(),
    supplyPool.base.innerToNumber(),
    feeRate
  );
  // base currency -> target currency
  const targetCurrencyAmount = calcSwapTargetAmount(
    intermediateBaseCurrencyAmount,
    targetPool.base.innerToNumber(),
    targetPool.other.innerToNumber(),
    feeRate
  );
  // handle slippage
  return ONE.sub(slippage).mul(Fixed18.fromParts(targetCurrencyAmount));
}

/**
 * @name calaSupplyInOtherToOther
 * @description calculate how many other tokens need in other-to-other process
 * @param {Fixed18} target - supply token amount
 * @param {Fixed18} pool.other - token amount in the other pool
 * @param {Fixed18} pool.base - token amount in the base pool
 * @param {Fixed18} feeRate - swap fee rate
 * @param {Fixed18} [slippage=0] - swap slippage
 * @returns {Fixed} return amount of received other tokens in base-to-other process
 */
export function calcSupplyInOtherToOther(
  target: Fixed18,
  supplyPool: Pool,
  targetPool: Pool,
  feeRate: Fixed18,
  slippage = Fixed18.ZERO
): Fixed18 {
  // handle slippage
  const _target = target.div(ONE.sub(slippage));
  // supply currency -> base currency
  const intermediateBaseCurrencyAmount = calcSwapSupplyAmount(
    _target.innerToNumber(),
    targetPool.base.innerToNumber(),
    targetPool.other.innerToNumber(),
    feeRate
  );
  // base currency -> target currency
  const targetCurrencyAmount = calcSwapSupplyAmount(
    intermediateBaseCurrencyAmount,
    supplyPool.other.innerToNumber(),
    supplyPool.base.innerToNumber(),
    feeRate
  );
  // handle slippage
  return ONE.sub(slippage).mul(Fixed18.fromParts(targetCurrencyAmount));
}
