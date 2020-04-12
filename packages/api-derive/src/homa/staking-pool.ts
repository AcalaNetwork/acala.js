import { ApiInterfaceRx } from '@polkadot/api/types';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
// FIXEM: type wraning 'CurrencyId' is defined but never used
/* eslint-disable @typescript-eslint/no-unused-vars */
import { StakingBalance, Ratio, ExchangeRate, Rate, CurrencyId, Balance } from '@acala-network/types/interfaces';
import { EraIndex } from '@polkadot/types/interfaces';

import { DerivedStakingPool } from '../types/staking-pool';
import { memo } from '../utils/memo';

type DerivedConsts = Pick<DerivedStakingPool, 'maxBondRatio' | 'minBondRatio' | 'maxClaimFee' | 'defaultExchangeRate' | 'stakingCurrency' | 'liquidCurrency'>;

function getConstants (api: ApiInterfaceRx): DerivedConsts {
  const CurrencyId = api.registry.get('CurrencyId');
  // FIXME: will use api.consts after chain is ready
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  const LDOT = new (CurrencyId as any)(api.registry, 'ldot') as CurrencyId;
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  const DOT = new (CurrencyId as any)(api.registry, 'dot') as CurrencyId;
  return {
    maxBondRatio: api.consts.stakingPool.maxBondRatio as Ratio,
    minBondRatio: api.consts.stakingPool.minBondRatio as Ratio,
    maxClaimFee: api.consts.stakingPool.maxClaimFee as Rate,
    defaultExchangeRate: api.consts.stakingPool.defaultExchangeRate as ExchangeRate,
    stakingCurrency: DOT,
    liquidCurrency: LDOT
  };
}

/**
 * @name stakingPool
 * @description get staking pool information
 */
export function stakingPool (api: ApiInterfaceRx): () => Observable<DerivedStakingPool> {
  return memo(() => {
    const constants = getConstants(api);

    return combineLatest([
      api.query.stakingPool.currentEra(),
      api.query.stakingPool.nextEraUnbond(),
      api.query.stakingPool.totalClaimedUnbonded(),
      api.query.stakingPool.totalBonded(),
      api.query.stakingPool.unbondingToFree(),
      api.query.stakingPool.freeUnbonded(),
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
          liquidTokenIssuance
        ] = result;

        return {
          currentEra: currentEra as EraIndex,
          nextEraUnbond: nextEraUnbond as unknown as [StakingBalance, StakingBalance],
          totalClaimedUnbonded: totalClaimedUnbonded as StakingBalance,
          totalBonded: totalBonded as StakingBalance,
          unbondingToFree: unbondingToFree as StakingBalance,
          freeUnbonded: freeUnbonded as StakingBalance,
          liquidTokenIssuance: liquidTokenIssuance as Balance,
          ...constants
        };
      })
    );
  });
}
