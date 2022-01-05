import { FixedPointNumber } from '@acala-network/sdk-core';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PoolDetail } from '../../liquidity/types';

/**
 * @name subscribeDexShareTokenPrice
 * @description subscirbe dexShare token price
 */
export function subscribeDexShareTokenPrice(
  token0Price: Observable<FixedPointNumber>,
  token1Price: Observable<FixedPointNumber>,
  pool: Observable<PoolDetail>
): Observable<FixedPointNumber> {
  return combineLatest({
    token0Price,
    token1Price,
    pool
  }).pipe(
    map(({ token0Price, token1Price, pool }) => {
      const total = pool.amounts[0].mul(token0Price).add(pool.amounts[1].mul(token1Price));

      return total.div(pool.share);
    })
  );
}
