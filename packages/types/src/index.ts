import { assertSingletonPackage } from '@polkadot/util';
import { RegistryTypes } from '@polkadot/types/types';
import * as ormlDefinations from '@orml/types/interfaces/definitions';

import * as acalaDefinations from './interfaces/definitions';

export { InterfaceRegistry } from './interfaceRegistry';

assertSingletonPackage('@acala-network/types');

export const allDefinitions = {
  ...ormlDefinations,
  ...acalaDefinations
};

export const types: RegistryTypes = Object.values(allDefinitions).map(({ types }) => types).reduce((all, types) => Object.assign(all, types), {});
