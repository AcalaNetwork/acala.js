import { FixedPointNumber } from '@acala-network/sdk-core';
import { PoolPositions } from '../types';
import { TokenProvider } from '../../base-provider';
import { combineLatest, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

export const getPoolTVL = (positions: PoolPositions, tokenProvider: TokenProvider): Observable<FixedPointNumber> => {
  if (!tokenProvider.subscribePrice) return of(FixedPointNumber.ZERO);

  const [token0, token1] = positions.info.pair;
  const [amount0, amount1] = positions.amounts;

  return combineLatest({
    price0: tokenProvider.subscribePrice(token0),
    price1: tokenProvider.subscribePrice(token1)
  }).pipe(
    map(({ price0, price1 }) => {
      if (price0.isPositive() && price1.isPositive()) {
        return amount0.times(price0).add(amount1.times(price1));
      }

      if (price0.isPositive() && price1.isZero()) {
        return amount0.times(price0).times(new FixedPointNumber(2));
      }

      if (price1.isPositive() && price0.isZero()) {
        return amount1.times(price1).times(new FixedPointNumber(2));
      }

      return FixedPointNumber.ZERO;
    })
  );
};
