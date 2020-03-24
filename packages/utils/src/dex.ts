import { FixedU128 } from './fixed-u128';

interface Pool {
  other: FixedU128;
  base: FixedU128;
}

/**
 * @name calcReceive
 * @description calculate how many target token can be received when use the supply token.
 * Equation: received = (1 - slippage) * (1 - fee) * (targetPool - (supplyPool * targetPool) / (supplyPool + supply))
 * @param {FixedU128} supply - supply token quantity
 * @param {FixedU128} supplyPool - supply token quantity in the pool
 * @param {FixedU128} targetPool - target token quantity in the pool
 * @param {FixedU128} fee - swap fee
 * @param {FixedU128} [slippage=0] - swap slippage
 * @returns {FixedU128} return target token quantity which can be received
 */
export function calcReceive (
  supply: FixedU128,
  supplyPool: FixedU128,
  targetPool: FixedU128,
  fee: FixedU128,
  slippage = FixedU128.ZERO
): FixedU128 {
  const newTargetPool = supplyPool.mul(targetPool).div(supplyPool.add(supply));
  const receivedQuantity = targetPool.sub(newTargetPool);
  const receivedRatio = FixedU128.fromNatural(1).sub(slippage).mul(FixedU128.fromNatural(1).sub(fee));
  return receivedQuantity.mul(receivedRatio);
}

/**
 * @name calcSupply
 * @description calculate how many supply token required for the target token.
 * Equation: supply = supplyPool - (supplyPool * targetPool) / (targetPool - (target / (1 - fee) / (1 - slippage)))
 * @param {FixedU128} target - target token quantity
 * @param {FixedU128} supplyPool - supply token quantity in the pool
 * @param {FixedU128} targetPool - target token quantity in the pool
 * @param {FixedU128} fee - swap fee
 * @param {FixedU128} [slippage=0] - swap slippage
 * @returns {FixedU128} target token quantity can be received
 */
export function calcSupply (
  target: FixedU128,
  supplyPool: FixedU128,
  targetPool: FixedU128,
  fee: FixedU128,
  slippage = FixedU128.ZERO
): FixedU128 {
  const receivedRatio = FixedU128.fromNatural(1).sub(slippage).mul(FixedU128.fromNatural(1).sub(fee));
  const realyTargetQuantity = target.div(receivedRatio);
  const newSupplyPool = supplyPool.mul(targetPool).div(targetPool.sub(realyTargetQuantity));
  return newSupplyPool.sub(supplyPool);
}

/**
 * @name calcReceivedOtherToOther
 * @description calculate how many target token can be received by another pool.other token.
 * Equation: target = (1 - slippage) * calcReceivedOtherByBase(calcReceivedBaseByOther(target, targetPool, fee), receivePool, fee)
 * Note: This method will calculate fee twice
 * @param {FixedU128} target  - target token quantity
 * @param {FixedU128} targetPool.target - target token quantity in target pool
 * @param {FixedU128} targetPool.base - base token quantity in target pool
 * @param {FixedU128} receivePool.target - target token quantity in receive pool
 * @param {FixedU128} receivePool.base - base token quantity in receive pool
 * @param {FixedU128} fee - swap fee
 * @param {FixedU128} [slippage=0] - swap slippage
 * @returns {FixedU128} target token quantity which can be received in the receive pool
 */
export function calcReceivedOtherToOther (
  target: FixedU128,
  targetPool: Pool,
  receivePool: Pool,
  fee: FixedU128,
  slippage = FixedU128.ZERO
): FixedU128 {
  // don't calculate slippage in calcOtherToBase swap
  const receivedBaseQuantityInOtherPool = calcReceive(target, targetPool.other, targetPool.base, fee);
  // don't calculate slippage in calcBaseToOther swap
  const receivedOtherQuantityInReceivePool = calcReceive(receivedBaseQuantityInOtherPool, receivePool.base, receivePool.other, fee);
  // calculate slippage
  return receivedOtherQuantityInReceivePool.mul(FixedU128.fromNatural(1).sub(slippage));
}

/**
 * @name calcRequiredOtherToOther
 * @description calculate how many other pool.other token required for target token.
 * Equation: target = (1 - slippage) * calcRequiredOtherForBase(calcRequreidBaseForOther(target, targetPool, fee), receivePool, fee)
 * Note: This method will calculate fee twice
 * @param {FixedU128} target  - target token quantity
 * @param {FixedU128} targetPool.target - target token quantity in target pool
 * @param {FixedU128} targetPool.base - base token quantity in target pool
 * @param {FixedU128} receivePool.target - target token quantity in receive pool
 * @param {FixedU128} receivePool.base - base token quantity in receive pool
 * @param {FixedU128} fee - swap fee
 * @param {FixedU128} [slippage=0] - swap slippage
 * @returns {FixedU128} target token quantity which can be received in the receive pool
 */
export function calcRequiredOtherToOther (
  target: FixedU128,
  targetPool: Pool,
  receivePool: Pool,
  fee: FixedU128,
  slippage = FixedU128.ZERO
): FixedU128 {
  // don't calculate slippage in calcOtherToBase swap
  const requiredBaseQuantityInPool = calcSupply(target, targetPool.other, targetPool.base, fee);
  // don't calculate slippage in calcBaseToOther swap
  const requiredOtherQuantityInReceivePool = calcSupply(requiredBaseQuantityInPool, receivePool.base, receivePool.other, fee);
  // calculate slippage
  return requiredOtherQuantityInReceivePool.mul(FixedU128.fromNatural(1).sub(slippage));
}
