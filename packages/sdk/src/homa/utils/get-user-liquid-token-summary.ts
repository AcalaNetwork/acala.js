import { FixedPointNumber } from '@acala-network/sdk-core';
import { HomaEnvironment, RedeemRequest, Unbonding, UserLiquidityTokenSummary } from '../types.js';
import { getEstimateRedeemResult } from './get-estimate-redeem-result.js';

export function getUserLiquidTokenSummary(
  env: HomaEnvironment,
  currentRelayEra: number,
  unbondings: Unbonding[],
  redeemRequest: RedeemRequest
): UserLiquidityTokenSummary {
  let [claimable, totalUnbonding] = [FixedPointNumber.ZERO, FixedPointNumber.ZERO];

  unbondings.forEach(({ era: expiredEra, amount: unbonded }) => {
    if (expiredEra <= currentRelayEra) {
      claimable = claimable.add(unbonded);
    } else {
      totalUnbonding = totalUnbonding.add(unbonded);
    }
  });

  if (!redeemRequest.amount.isZero()) {
    totalUnbonding = totalUnbonding.add(
      getEstimateRedeemResult(env, redeemRequest.amount, redeemRequest.fastRedeem).receive
    );
  }

  return {
    totalUnbonding,
    claimable,
    currentRelayEra,
    // exclude claimable record
    unbondings: unbondings.filter((item) => item.era > currentRelayEra),
    redeemRequest
  };
}
