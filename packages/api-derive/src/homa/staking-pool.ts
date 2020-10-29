import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiInterfaceRx } from '@polkadot/api/types';
import { EraIndex } from '@polkadot/types/interfaces';
import { memo } from '@polkadot/api-derive/util';

import { Balance, Params } from '@acala-network/types/interfaces';

import { DerivedStakingPool, DerivedStakingPoolConstants } from '../types/staking-pool';

function getConstants (api: ApiInterfaceRx): DerivedStakingPoolConstants {
  return {
    defaultExchangeRate: api.consts.stakingPool.defaultExchangeRate,
    bondingDuration: api.consts.polkadotBridge.bondingDuration,
    eraLength: api.consts.polkadotBridge.eraLength,
    stakingCurrency: api.consts.stakingPool.stakingCurrencyId,
    liquidCurrency: api.consts.stakingPool.liquidCurrencyId
  };
}

/**
 * @name stakingPool
 * @description get staking pool information
 */
export function stakingPool (instanceId: string, api: ApiInterfaceRx): () => Observable<DerivedStakingPool> {
  return memo(instanceId, () => {
    const constants = getConstants(api);

    return combineLatest([
      api.query.stakingPool.currentEra(),
      api.query.stakingPool.nextEraUnbond(),
      api.query.stakingPool.totalClaimedUnbonded(),
      api.query.stakingPool.totalBonded(),
      api.query.stakingPool.unbondingToFree(),
      api.query.stakingPool.freeUnbonded(),
      api.query.stakingPool.stakingPoolParams(),
      api.query.tokens.totalIssuance(constants.liquidCurrency)
    ]).pipe(
      map((result) => {
        const [
          currentEra,
          nextEraUnbond,
          totalClaimedUnbonded,
          totalBonded,
          unbondingToFree,
          freeUnbonded,
          stakingPoolParams,
          liquidTokenIssuance
        ] = result;

        return {
          currentEra: currentEra as EraIndex,
          nextEraUnbond: nextEraUnbond as unknown as [Balance, Balance],
          totalClaimedUnbonded: totalClaimedUnbonded as Balance,
          totalBonded: totalBonded as Balance,
          unbondingToFree: unbondingToFree as Balance,
          freeUnbonded: freeUnbonded as Balance,
          stakingPoolParams: stakingPoolParams as Params,
          liquidTokenIssuance: liquidTokenIssuance as Balance,
          ...constants
        };
      })
    );
  });
}
