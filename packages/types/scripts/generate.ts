/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */
import { Metadata } from '@polkadot/metadata';
import { TypeRegistry } from '@polkadot/types/create';
import { generateInterfaceTypes } from '@polkadot/typegen/generate/interfaceRegistry';
import { generateTsDef } from '@polkadot/typegen/generate/tsDef';
import {
  generateDefaultConsts,
  generateDefaultQuery,
  generateDefaultTx,
  generateDefaultRpc
} from '@polkadot/typegen/generate';
import { registerDefinitions } from '@polkadot/typegen/util';
import generateMobx from '@open-web3/api-mobx/scripts/mobx';
import metaHex from '../src/metadata/static-latest';

import * as defaultDefinations from '@polkadot/types/interfaces/definitions';

import * as ormlDefinations from '@open-web3/orml-types/interfaces/definitions';

import * as acalaDefinations from '../src/interfaces/definitions';

// Only keep our own modules to avoid confllicts with the one provided by polkadot.js
// TODO: make an issue on polkadot.js
function filterModules(names: string[], defs: any): string {
  const registry = new TypeRegistry();
  registerDefinitions(registry, defs);
  const metadata = new Metadata(registry, metaHex);

  // hack https://github.com/polkadot-js/api/issues/2687#issuecomment-705342442
  metadata.asLatest.toJSON();

  const filtered = metadata.toJSON() as any;

  filtered.metadata.v12.modules = filtered.metadata.v12.modules.filter(({ name }: any) => names.includes(name));

  return new Metadata(registry, filtered).toHex();
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { runtime, ...substrateDefinations } = defaultDefinations;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { runtime: _runtime, ...ormlModulesDefinations } = ormlDefinations;

const definations = {
  '@polkadot/types/interfaces': substrateDefinations,
  '@open-web3/orml-types/interfaces': ormlModulesDefinations,
  '@acala-network/types/interfaces': acalaDefinations
} as any;

const metadata = filterModules(
  [
    'Accounts',
    'AirDrop',
    'Auction',
    'AuctionManager',
    'CdpEngine',
    'CdpTreasury',
    'Currencies',
    'Dex',
    'EmergencyShutdown',
    'Evm',
    'Homa',
    'HomaValidatorListModule',
    'HomaTreasury',
    'Honzon',
    'Loans',
    'NomineesElection',
    'Oracle',
    'PolkadotBridge',
    'Prices',
    'ScheduleUpdate',
    'StakingPool',
    'Tokens',
    'XTokens'
    // 'Vesting' Conflicts with pallet-vesting https://github.com/polkadot-js/api/issues/2338
  ],
  definations
);

generateTsDef(definations, 'packages/types/src/interfaces', '@acala-network/types/interfaces');
generateInterfaceTypes(definations, 'packages/types/src/interfaces/augment-types.ts');
generateDefaultConsts('packages/types/src/interfaces/augment-api-consts.ts', metadata, definations);

generateDefaultTx('packages/types/src/interfaces/augment-api-tx.ts', metadata, definations);
generateDefaultQuery('packages/types/src/interfaces/augment-api-query.ts', metadata, definations);
generateDefaultRpc('packages/types/src/interfaces/augment-api-rpc.ts', definations);
generateMobx('packages/types/src/interfaces/augment-api-mobx.ts', metaHex, definations);
