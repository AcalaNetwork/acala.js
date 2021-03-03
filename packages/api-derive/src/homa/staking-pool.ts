import { combineLatest, Observable } from '@polkadot/x-rxjs';
import { map } from '@polkadot/x-rxjs/operators';

import { ApiInterfaceRx } from '@polkadot/api/types';
import { memo } from '@polkadot/api-derive/util';

import { DerivedStakingPool, DerivedStakingPoolConstants } from '../types/staking-pool';

function getConstants(api: ApiInterfaceRx): DerivedStakingPoolConstants {
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
export function stakingPool(instanceId: string, api: ApiInterfaceRx): () => Observable<DerivedStakingPool> {
  return memo(instanceId, () => {
    const constants = getConstants(api);

    return combineLatest([
      api.query.stakingPool.currentEra(),
      api.query.stakingPool.stakingPoolLedger(),
      api.query.stakingPool.stakingPoolParams(),
      api.query.tokens.totalIssuance(constants.liquidCurrency)
    ]).pipe(
      map((result) => {
        const [currentEra, ledger, params, liquidIssuance] = result;

        return {
          currentEra,
          ledger,
          params,
          liquidIssuance,
          ...constants
        };
      })
    );
  });
}
