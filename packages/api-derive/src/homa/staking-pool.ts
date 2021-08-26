import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EraIndex } from '@polkadot/types/interfaces';

import { ApiInterfaceRx } from '@polkadot/api/types';
import { memo } from '@polkadot/api-derive/util';

import { DerivedStakingPool, DerivedStakingPoolConstants } from '../types/staking-pool';
import { CurrencyId, ExchangeRate } from '@acala-network/types/interfaces';
import { BlockNumber } from '@open-web3/orml-types/interfaces';

function getConstants(api: ApiInterfaceRx): DerivedStakingPoolConstants {
  return {
    defaultExchangeRate: api.consts.stakingPool.defaultExchangeRate as ExchangeRate,
    bondingDuration: api.consts.polkadotBridge.bondingDuration as EraIndex,
    eraLength: api.consts.polkadotBridge.eraLength as BlockNumber,
    stakingCurrency: api.consts.stakingPool.stakingCurrencyId as CurrencyId,
    liquidCurrency: api.consts.stakingPool.liquidCurrencyId as CurrencyId
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
        } as unknown as DerivedStakingPool;
      })
    );
  });
}
