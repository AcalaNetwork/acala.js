/* eslint-disable */
// @ts-nocheck

/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */
import { Metadata } from '@polkadot/types';
import { TypeRegistry } from '@polkadot/types/create';
import { generateInterfaceTypes } from '@polkadot/typegen/generate/interfaceRegistry';
import { generateTsDef } from '@polkadot/typegen/generate/tsDef';
import { generateDefaultLookup } from '@polkadot/typegen/generate/lookup';
import {
  generateDefaultConsts,
  generateDefaultQuery,
  generateDefaultTx,
  generateDefaultRpc
} from '@polkadot/typegen/generate';
import { registerDefinitions } from '@polkadot/typegen/util';
// import generateMobx from '@open-web3/api-mobx/scripts/mobx';
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

  // console.log(filtered.metadata.v13.modules.map(x => x.name))

  filtered.metadata.v13.modules = filtered.metadata.v13.modules.filter(({ name }: any) => names.includes(name));

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
    'AcalaOracle',
    'Auction',
    'AuctionManager',
    'Authority',
    'CdpEngine',
    'CdpTreasury',
    'CollatorSelection',
    'Currencies',
    'Dex',
    'EmergencyShutdown',
    'EVM',
    'EvmAccounts',
    'EVMBridge',
    'EvmManager',
    'FinancialCouncil',
    'FinancialCouncilMembership',
    'GeneralCouncil',
    'GeneralCouncilMembership',
    'HomaCouncil',
    'HomaCouncilMembership',
    'HomaLite',
    'Honzon',
    'Incentives',
    'Loans',
    'NFT',
    'OperatorMembershipAcala',
    'OrmlNFT',
    'OrmlXcm',
    'Prices',
    'Rewards',
    'SessionManager',
    'Tokens',
    'TransactionPause',
    'UnknownTokens',
    'XTokens',
    // 'Vesting' Conflicts with pallet-vesting https://github.com/polkadot-js/api/issues/2338
  ],
  definations
);

generateTsDef(definations, 'packages/types/src/interfaces', '@acala-network/types/interfaces');
generateInterfaceTypes(definations, 'packages/types/src/interfaces/augment-types.ts');
generateDefaultConsts('packages/types/src/interfaces/augment-api-consts.ts', metadata, definations);
// generateDefaultLookup('packages/types/src/argument/loopup', metadata);

// TODO: figure out why this failed
// generateDefaultTx('packages/types/src/interfaces/augment-api-tx.ts', metadata, definations);
generateDefaultQuery('packages/types/src/interfaces/augment-api-query.ts', metadata, definations);
generateDefaultRpc('packages/types/src/interfaces/augment-api-rpc.ts', definations);
// generateMobx('packages/types/src/interfaces/augment-api-mobx.ts', metaHex, definations);
