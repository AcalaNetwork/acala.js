import ormlRPC from '@orml/jsonrpc';
import { types as acalaTypes } from '@acala-network/types';
import { ApiOptions } from '@polkadot/api/types';

// FIXME: use a concrete type once polkadotjs fixes inconsistency.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const acalaRpc: any = { oracle: Object.values(ormlRPC.oracle.methods) };

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
