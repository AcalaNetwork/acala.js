import { RegistryTypes } from '@polkadot/types/types';
import * as ormlDefinations from '@open-web3/orml-types/interfaces/definitions';

import * as acalaDefinations from './interfaces/definitions';

import * as InterfaceRegistry from './interfaceRegistry';
export { InterfaceRegistry };

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

export const types: RegistryTypes = Object.values(allDefinitions).map(({ types }) => types).reduce((all, types) => Object.assign(all, types), {});
