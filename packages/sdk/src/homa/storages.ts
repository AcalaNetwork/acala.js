import { AnyApi, Token } from '@acala-network/sdk-core';
import { Storage } from '../utils/storage';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const createStorages = (api: AnyApi) => {
  return {
    liquidTokenIssuance: (token: Token) =>
      Storage.create({
        api,
        path: 'query.tokens.totalIssuance',
        params: [token.toChainData()]
      }),
    stakingLedgers: () =>
      Storage.create({
        api,
        path: 'query.homa.stakingLedgers.entries',
        params: []
      }),
    toBondPool: () =>
      Storage.create({
        api,
        path: 'query.homa.toBondPool',
        params: []
      })
  };
};
