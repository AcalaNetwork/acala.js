import { RegistryTypes } from '@polkadot/types/types';
import * as ormlDefinations from '@orml/types/interfaces/definitions';

import * as acalaDefinations from './interfaces/definitions';

export { InterfaceRegistry } from './interfaceRegistry';

export const allDefinitions = {
  ...ormlDefinations,
  ...acalaDefinations
};

export const types: RegistryTypes = Object.values(allDefinitions).map(({ types }) => types).reduce((all, types) => Object.assign(all, types), {});
