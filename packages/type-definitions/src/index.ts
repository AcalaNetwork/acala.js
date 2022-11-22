/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { OverrideVersionedType } from '@polkadot/types/types';
import { rpc as ormlRpc, types as ormlTypes, typesAlias as ormlAlias } from '@open-web3/orml-type-definitions';
import { jsonrpcFromDefs, typesAliasFromDefs, typesFromDefs } from '@open-web3/orml-type-definitions/utils';
import accounts from './accounts';
import auctionManager from './auctionManager';
import cdpEngine from './cdpEngine';
import dex from './dex';
import evm from './evm';
import homa from './homa';
import collatorSelection from './collatorSelection';
import homaValidatorList from './homaValidatorList';
import incentives from './incentives';
import loans from './loans';
import nft from './nft';
import nomineesElection from './nomineesElection';
import primitives from './primitives';

// ecosystem
import renvmBridge from './renvmBridge';

import runtime from './runtime';
import { signedExtensions as acalaSignedExtensions } from './signedExtensions';
import stableAsset from './stableAsset';
import stakingPool from './stakingPool';
import support from './support';

import acalaVersioned from './spec/acala';
import mandalaVersioned from './spec/mandala';
import karuraVersioned from './spec/karura';

// FIXME: currently we cannot override this in runtime definations because the code generation script cannot handle overrides
// This will make it behave correctly in runtime, but wrong types in TS defination.
const additionalOverride = {
  Keys: 'SessionKeys1'
};

const acalaDefs = {
  primitives,
  accounts,
  auctionManager,
  cdpEngine,
  collatorSelection,
  dex,
  evm,
  homa,
  homaValidatorList,
  incentives,
  loans,
  nft,
  nomineesElection,
  runtime,
  stakingPool,
  support,

  // ecosystem
  renvmBridge,
  stableAsset
};

export const types = {
  ...ormlTypes,
  ...typesFromDefs(acalaDefs),
  ...additionalOverride
};

export const rpc = jsonrpcFromDefs(acalaDefs, { ...ormlRpc });
export const typesAlias = typesAliasFromDefs(acalaDefs, { ...ormlAlias });

function getBundle(versioned: OverrideVersionedType[]) {
  return {
    rpc,
    instances: {
      council: ['generalCouncil']
    },
    types: [...versioned].map((version) => {
      return {
        minmax: version.minmax,
        types: {
          ...types,
          ...version.types
        }
      };
    }),
    alias: typesAlias
  };
}

export const typesBundle = {
  spec: {
    acala: getBundle(acalaVersioned),
    mandala: getBundle(mandalaVersioned),
    karura: getBundle(karuraVersioned)
  }
};

// Type overrides have priority issues
export const typesBundleForPolkadot = {
  spec: {
    acala: getBundle(acalaVersioned),
    mandala: getBundle(mandalaVersioned),
    karura: getBundle(karuraVersioned)
  }
};

export const signedExtensions = acalaSignedExtensions;
