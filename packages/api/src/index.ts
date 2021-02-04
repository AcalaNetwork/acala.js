import { derive as ormlDerives } from '@open-web3/orml-api-derive';
import { derive as acalaDerives } from '@acala-network/api-derive';
import {
  rpc as acalaRpc,
  types as acalaTypes,
  typesAlias as acalaTypesAlias,
  typesBundle as acalaTypesBundle,
  signedExtensions as acalaSignedExtensions
} from '@acala-network/types';
import { ApiOptions } from '@polkadot/api/types';

export const defaultOptions: ApiOptions = {
  types: acalaTypes,
  rpc: acalaRpc
};

export const options = ({
  types = {},
  rpc = {},
  typesAlias = {},
  typesBundle = {},
  signedExtensions,
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
        ...acalaTypesBundle?.spec?.acala,
        ...typesBundle?.spec?.acala
      },
      mandala: {
        ...acalaTypesBundle?.spec?.mandala,
        ...typesBundle?.spec?.mandala
      }
    }
  },
  signedExtensions: {
    ...acalaSignedExtensions,
    ...signedExtensions
  },
  ...otherOptions
});
