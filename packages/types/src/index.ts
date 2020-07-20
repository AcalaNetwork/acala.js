import './interfaces/augment-api-consts';
import './interfaces/augment-api-query';
import './interfaces/augment-api-tx';
import './interfaces/augment-api';
import './interfaces/augment-types';

import { RegistryTypes, OverrideModuleType } from '@polkadot/types/types';
import polkadotJSONRpc from '@polkadot/types/interfaces/jsonrpc';
import * as ormlDefinations from '@open-web3/orml-types/interfaces/definitions';

import * as acalaDefinations from './interfaces/definitions';
import jsonrpc from './interfaces/jsonrpc';

export * from './interfaces/augment-api-mobx';

// FIXME: currently we cannot override this in runtime definations because the code generation script cannot handle overrides
// This will make it behave correctly in runtime, but wrong types in TS defination.
const additionalOverride = {
  types: {
    Keys: 'SessionKeys2'
  }
};

export const allDefinitions = {
  ...ormlDefinations,
  ...acalaDefinations,
  additionalOverride
};

export const allJSONRpc = {
  ...polkadotJSONRpc,
  ...jsonrpc
};

export const types: RegistryTypes = Object.values(allDefinitions)
  .map(({ types }) => types)
  .reduce((all, types) => Object.assign(all, types), {} as RegistryTypes);

export const typesAlias: Record<string, OverrideModuleType> = Object.values(allDefinitions)
  .reduce((all, def) => Object.assign(all, (def as any).typesAlias), {});

export const typeChain = {
  'Acala Mandala TC3': {
    Weight: 'u32'
  }
};
