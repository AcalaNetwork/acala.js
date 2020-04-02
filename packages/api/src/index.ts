import acalaJsonRpc from '@acala-network/types/interfaces/jsonrpc';
import { derive as ormlDerives } from '@orml/api-derive';
import { derive as acalaDerives } from '@acala-network/api-derive';
import { types as acalaTypes } from '@acala-network/types';
import { ApiOptions } from '@polkadot/api/types';

const acalaRpc = acalaJsonRpc;

export const defaultOptions: ApiOptions = {
  types: acalaTypes,
  rpc: acalaRpc
};

export const options = ({ types = {}, rpc = {}, ...otherOptions }: ApiOptions): ApiOptions => ({
  types: {
    ...acalaTypes,
    ...types
  },
  rpc: {
    ...acalaRpc,
    ...rpc
  },
  typesAlias: {
    homaCouncli: {
      UnlockChunk: 'HomaUnlockChunk'
    }
  },
  derives: {
    ...ormlDerives,
    ...acalaDerives
  },
  ...otherOptions
});
