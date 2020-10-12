import acalaJsonRpc from '@acala-network/types/interfaces/jsonrpc';
import { derive as ormlDerives } from '@open-web3/orml-api-derive';
import { derive as acalaDerives } from '@acala-network/api-derive';
import {
  types as acalaTypes,
  typesAlias as acalaTypesAlias,
  typesBundle as acalaTypesBundle
} from '@acala-network/types';
import { ApiOptions } from '@polkadot/api/types';

const acalaRpc = acalaJsonRpc;

export const defaultOptions: ApiOptions = {
  types: acalaTypes,
  rpc: acalaRpc
};

export const options = ({
  types = {},
  rpc = {},
  typesAlias = {},
  typesBundle = {},
  ...otherOptions
}: ApiOptions = {}): ApiOptions => ({
  types: {
    ...acalaTypes,
    ...types
  },
  rpc: {
    ...acalaRpc,
    ...rpc
  },
  typesAlias: {
    ...acalaTypesAlias,
    ...typesAlias
  },
  derives: {
    ...ormlDerives,
    ...acalaDerives
  },
  typesBundle: {
    ...typesBundle,
    spec: {
      ...typesBundle.spec,
      acala: {
        ...typesBundle?.spec?.acala,
        ...acalaTypesBundle?.spec?.acala
      }
    }
  },
  ...otherOptions
});
