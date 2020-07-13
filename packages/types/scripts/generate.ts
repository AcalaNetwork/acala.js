/* eslint-disable @typescript-eslint/no-explicit-any */

import { Metadata } from '@polkadot/types';
import { TypeRegistry } from '@polkadot/types/create';
import { generateInterfaceTypes } from '@polkadot/typegen/generate/interfaceRegistry';
import { generateTsDef } from '@polkadot/typegen/generate/tsDef';
import generateConst from '@polkadot/typegen/generate/consts';
import generateQuery from '@polkadot/typegen/generate/query';
import generateTx from '@polkadot/typegen/generate/tx';
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

  const filtered = metadata.toJSON() as any;

  filtered.metadata.V11.modules = filtered.metadata.V11.modules.filter(({ name }: any) => names.includes(name));

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
    'Homa',
    'HomaTreasury',
    'Honzon',
    'Loans',
    'NomineesElection',
    'Oracle',
    'PolkadotBridge',
    'Prices',
    'ScheduleUpdate',
    'StakingPool',
    'Tokens'
    // 'Vesting' Conflicts with pallet-vesting https://github.com/polkadot-js/api/issues/2338
  ],
  definations
);

generateTsDef(definations, 'packages/types/src/interfaces', '@acala-network/types/interfaces');
generateInterfaceTypes(definations, 'packages/types/src/interfaces/augment-types.ts');
generateConst('packages/types/src/interfaces/augment-api-consts.ts', metadata, definations);

generateTx('packages/types/src/interfaces/augment-api-tx.ts', metadata, definations);
generateQuery('packages/types/src/interfaces/augment-api-query.ts', metadata, definations);

generateMobx('packages/types/src/interfaces/augment-api-mobx.ts', metaHex, definations);
