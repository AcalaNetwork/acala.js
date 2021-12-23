import { FixedPointNumber } from '@acala-network/sdk-core';
import { Unbonding } from '../types';

export function getClaimableAmount(unbondings: Unbonding[], currentRelayEra: number): FixedPointNumber {
  let available = FixedPointNumber.ZERO;

  unbondings.forEach(({ era: expiredEra, amount: unbonded }) => {
    if (expiredEra <= currentRelayEra) {
      available = available.add(unbonded);
    }
  });

  return available;
}
