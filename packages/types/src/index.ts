import {
  typesBundle as acalaTypesBundle,
  types as acalaTypes,
  typesAlias as acalaTypeAlias,
  rpc as acalaRpc,
  signedExtensions as acalaSignedExtensions
} from '@acala-network/type-definitions';
import {
  OverrideBundleType,
  OverrideModuleType,
  RegistryTypes,
  DefinitionRpc,
  DefinitionRpcSub
} from '@polkadot/types/types';

export * as lookupType from './interfaces/lookup';

import './interfaces/augment-api';

// export * from './interfaces/augment-api-mobx';

export const types: RegistryTypes = acalaTypes;

export const rpc: Record<string, Record<string, DefinitionRpc | DefinitionRpcSub>> = acalaRpc;

export const typesAlias: Record<string, OverrideModuleType> = acalaTypeAlias;

export const typesBundle = acalaTypesBundle as unknown as OverrideBundleType;

export const signedExtensions = acalaSignedExtensions;
