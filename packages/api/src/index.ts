import { derive as ormlDerives } from '@open-web3/orml-api-derive';
import { derive as acalaDerives } from '@acala-network/api-derive';
import {
  rpc as acalaRpc,
  types as acalaTypes,
  typesAlias as acalaTypesAlias,
  typesBundle as acalaTypesBundle,
  signedExtensions as acalaSignedExtensions,
  lookupTypes as acalaLookupTypes
} from '@acala-network/types';
import { ApiOptions } from '@polkadot/api/types';
import { RegistryTypes } from '@polkadot/types/types';
import { runtime as acalaRuntime } from './runtime';

export const defaultOptions: ApiOptions = {
  types: acalaTypes,
  rpc: acalaRpc
};

export const options = ({
  types = {},
  rpc = {},
  typesAlias = {},
  typesBundle = {},
  runtime = {},
  signedExtensions,
  ...otherOptions
}: ApiOptions = {}): ApiOptions => ({
  types: {
    ...acalaTypes,
    ...(acalaLookupTypes as unknown as RegistryTypes), // TODO: RegistryTypes's own issue?
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
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  derives: {
    ...acalaDerives,
    ...ormlDerives
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
      },
      karura: {
        ...acalaTypesBundle?.spec?.karura,
        ...typesBundle?.spec?.mandala
      }
    }
  },
  signedExtensions: {
    ...acalaSignedExtensions,
    ...signedExtensions
  },
  runtime: {
    ...acalaRuntime,
    ...runtime
  },
  ...otherOptions
});
