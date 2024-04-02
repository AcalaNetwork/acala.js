// FIXME: need remove this disable config

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { FixedPointNumber, Token } from '@acala-network/sdk-core';
import { AcalaStakingLedge } from '@acala-network/types/interfaces/index';
import { StorageKey, u16, Option } from '@polkadot/types';
import { StakingLedger } from '../types.js';

export function transformStakingLedger(
  data: [StorageKey<[u16]>, Option<AcalaStakingLedge>][],
  stakingToken: Token
): StakingLedger[] {
  return data.map((item) => {
    const key = item[0];
    const ledge = item[1].unwrapOrDefault();

    return {
      index: key.args[0].toNumber(),
      bonded: FixedPointNumber.fromInner(ledge.bonded.unwrap().toString(), stakingToken.decimals),
      unlocking: ledge.unlocking.map((item) => {
        return {
          value: FixedPointNumber.fromInner(item.value.unwrap().toString(), stakingToken.decimals),
          era: item.era.unwrap().toNumber()
        };
      })
    };
  });
}
