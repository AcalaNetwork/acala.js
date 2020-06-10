import acalaJsonRpc from '@acala-network/types/interfaces/jsonrpc';
import { derive as ormlDerives } from '@open-web3/orml-api-derive';
import { derive as acalaDerives } from '@acala-network/api-derive';
import { types as acalaTypes, typeChain as acalaTypeChain } from '@acala-network/types';
import { ApiOptions } from '@polkadot/api/types';

const acalaRpc = acalaJsonRpc;

export const defaultOptions: ApiOptions = {
  types: acalaTypes,
  rpc: acalaRpc
};

export const options = ({ types = {}, rpc = {}, typesChain = {}, ...otherOptions }: ApiOptions = {}): ApiOptions => ({
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
    },
    tokens: {
      AccountData: 'OrmlAccountData',
      BalanceLock: 'OrmlBalanceLock'
    }
  },
  derives: {
    ...ormlDerives,
    ...acalaDerives
  },
  typesChain: {
    ...typesChain,
    ...acalaTypeChain
  },
  ...otherOptions
});
