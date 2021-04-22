import { ApiInterfaceRx } from '@polkadot/api/types';
import { map } from '@polkadot/x-rxjs/operators';
import primitivesConfig from '@acala-network/type-definitions/primitives';
import { Observable } from '@polkadot/x-rxjs';

import { CurrencyId, Balance } from '@acala-network/types/interfaces';
import { memo } from '@polkadot/api-derive/util';

import { DerivedDexPool } from '../types/dex';

const TOKEN_SORT: Record<string, number> = primitivesConfig.types.TokenSymbol._enum;

function sortTokens(token1: CurrencyId, token2: CurrencyId): CurrencyId[] {
  const result = [token1, token2];

  return result.sort((a, b) => TOKEN_SORT[a.asToken.toString()] - TOKEN_SORT[b.asToken.toString()]);
}

/**
 * @name pool
 * @description get liquidity pool of the target currency id
 * @param {CurrencyId} currency target currency id
 */
export function pool(
  instanceId: string,
  api: ApiInterfaceRx
): (token1: CurrencyId, token2: CurrencyId) => Observable<DerivedDexPool> {
  return memo(instanceId, (token1: CurrencyId, token2: CurrencyId) => {
    const params = sortTokens(token1, token2);

    return api.query.dex.liquidityPool<[Balance, Balance]>(params).pipe(
      map((result) => {
        const [token1Amount, token2Amount] = result;

        if (token1.eq(params[0]) && token2.eq(params[1])) {
          return [token1Amount, token2Amount];
        }

        return [token2Amount, token1Amount];
      })
    );
  });
}
