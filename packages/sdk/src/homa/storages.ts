import { AnyApi, Token } from '@acala-network/sdk-core';
import { Storage } from '../utils/storage';

export const createStorages = (api: AnyApi) => {
  return {
    liquidTokenIssuance: (token: Token) =>
      Storage.create({
        api,
        path: 'query.tokens.totalIssuance',
        params: [token.toChainData()]
      })
  };
};
