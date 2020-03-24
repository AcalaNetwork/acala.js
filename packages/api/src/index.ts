import acalaJsonRpc from '@acala-network/types/interfaces/jsonrpc';
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
  ...otherOptions
});
