/* eslint-disable */

/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */
import path from 'path';
import fs from 'fs';
import { generateTsDef } from '@polkadot/typegen/generate/tsDef';
import { generateInterfaceTypes } from '@polkadot/typegen/generate/interfaceRegistry'
import { assertDir, writeFile, HEADER } from '@polkadot/typegen/util';
import { generateDefaultCalls, generateDefaultConsts, generateDefaultErrors, generateDefaultEvents, generateDefaultQuery, generateDefaultRpc, generateDefaultTx } from '@polkadot/typegen/generate';

import * as substractDefinations from '@polkadot/types/interfaces/definitions';
import * as ormlDefinations from '@open-web3/orml-types/interfaces/definitions';

import * as acalaDefinations from '../src/interfaces/definitions';
import metadata from '../src/metadata/static-latest';
import { generateDefaultLookup } from './generate/lookup';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// const { runtime, ...substrateDefinations } = defaultDefinations;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { runtime: _runtime, ...ormlModulesDefinations } = ormlDefinations;


// delete ormlModulesDefinations.__esModule

export function main () {
  // generate
  console.log('------ start -------');

  const registryPath = assertDir(path.join(process.cwd(), 'packages/types/src/registry'));
  const argumentPath = assertDir(path.join(process.cwd(), 'packages/types/src/argument'));
  const lookupPath = assertDir(path.join(process.cwd(), 'packages/types/src/lookup'));
  const inputPath = assertDir(path.join(process.cwd(), 'packages/types/src/interfaces'));
  const pkg = '@acala-network/types/interfaces';

  // @ts-ignore
  delete ormlModulesDefinations.__esModule;

  const userDefs: Record<string, any> = {
    ...acalaDefinations
  };

  const userKeys = Object.keys(userDefs);
  const filteredBase = Object
    .entries(substractDefinations as Record<string, unknown>)
    .filter(([key]) => {
      if (userKeys.includes(key)) {
        console.warn(`Override found for ${key} in user types, ignoring in @polkadot/types`);

        return false;
      }

      return true;
    })
    .reduce((defs: Record<string, any>, [key, value]) => {
      defs[key] = value;

      return defs;
    }, {});

    const allDefs: Record<string, any> = {
      '@polkadot/types/interfaces': filteredBase,
      // The order of the keys will affect the generated file.
      [pkg]: userDefs,
      '@open-web3/orml-types/interfaces': ormlModulesDefinations,
    }

  const customLookupDefinitions = {
    rpc: {},
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-var-requires
    types: require('../src/lookup/acala.ts').default
  };

  generateTsDef(allDefs, inputPath, pkg);
  generateInterfaceTypes(allDefs, path.join(registryPath, 'interfaces.ts'));
  generateDefaultLookup(lookupPath, metadata);
  generateDefaultConsts(path.join(argumentPath, 'api-consts.ts'), metadata, allDefs, false, customLookupDefinitions);
  generateDefaultErrors(path.join(argumentPath, 'api-errors.ts'), metadata, allDefs, false);
  generateDefaultEvents(path.join(argumentPath, 'api-events.ts'), metadata, allDefs, false, customLookupDefinitions);
  generateDefaultQuery(path.join(argumentPath, 'api-query.ts'), metadata, allDefs, false, customLookupDefinitions);

  // TODO: should check why import an unused type
  writeFile(path.join(argumentPath, 'api-query.ts'), () => {
    const content = fs.readFileSync(path.join(argumentPath, 'api-query.ts'), { encoding: 'utf-8' });
    return content.replace('OrmlUtilitiesOrderedSet,', '')
  });

  generateDefaultRpc(path.join(argumentPath, 'api-rpc.ts'), allDefs);
  generateDefaultTx(path.join(argumentPath, 'api-tx.ts'), metadata, allDefs, false, customLookupDefinitions);

  generateDefaultCalls(path.join(argumentPath, 'api-runtime.ts'), metadata, allDefs, false, customLookupDefinitions);
  writeFile(path.join(argumentPath, 'api.ts'), (): string =>
  [
    HEADER('chain'),
    ...[
      ...['consts', 'errors', 'events', 'query', 'tx', 'rpc', 'runtime']
        .filter((key) => !!key)
        .map((key) => `./api-${key}`)
    ].map((path) => `import '${path}';\n`)
  ].join('')
);
}

main();
