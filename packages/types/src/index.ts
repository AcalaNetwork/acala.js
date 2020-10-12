import _typesBundle from '@acala-network/type-definitions/types-known/typesBundle';
import * as ormlDefinations from '@open-web3/orml-types/interfaces/definitions';
import polkadotJSONRpc from '@polkadot/types/interfaces/jsonrpc';
import { OverrideBundleType, OverrideModuleType, RegistryTypes } from '@polkadot/types/types';

import './interfaces/augment-api';
import './interfaces/augment-api-consts';
import './interfaces/augment-api-query';
import './interfaces/augment-api-tx';
import './interfaces/augment-types';
import * as acalaDefinations from './interfaces/definitions';
import jsonrpc from './interfaces/jsonrpc';

export * from './interfaces/augment-api-mobx';

// FIXME: currently we cannot override this in runtime definations because the code generation script cannot handle overrides
// This will make it behave correctly in runtime, but wrong types in TS defination.
const additionalOverride = {
  types: {
    Keys: 'SessionKeys2',
    PalletsOrigin: {
      _enum: {
        System: 'SystemOrigin',
        Timestamp: 'Null',
        RandomnessCollectiveFlip: 'Null',
        Balances: 'Null',
        Accounts: 'Null',
        Currencies: 'Null',
        Tokens: 'Null',
        Vesting: 'Null',
        AcalaTreasury: 'Null',
        Utility: 'Null',
        Multisig: 'Null',
        Recovery: 'Null',
        Proxy: 'Null',
        Scheduler: 'Null',
        Indices: 'Null',
        GraduallyUpdate: 'Null',
        Authorship: 'Null',
        Babe: 'Null',
        Grandpa: 'Null',
        Staking: 'Null',
        Session: 'Null',
        Historical: 'Null',
        GeneralCouncil: 'CollectiveOrigin',
        GeneralCouncilMembership: 'Null',
        HonzonCouncil: 'CollectiveOrigin',
        HonzonCouncilMembership: 'Null',
        HomaCouncil: 'CollectiveOrigin',
        HomaCouncilMembership: 'Null',
        TechnicalCommittee: 'CollectiveOrigin',
        TechnicalCommitteeMembership: 'Null',
        Authority: 'DelayedOrigin',
        ElectionsPhragmen: 'Null',
        AcalaOracle: 'Null',
        BandOracle: 'Null',
        OperatorMembershipAcala: 'Null',
        OperatorMembershipBand: 'Null',
        Auction: 'Null',
        Rewards: 'Null',
        OrmlNFT: 'Null',
        Prices: 'Null',
        Dex: 'Null',
        AuctionManager: 'Null',
        Loans: 'Null',
        Honzon: 'Null',
        CdpTreasury: 'Null',
        CdpEngine: 'Null',
        EmergencyShutdown: 'Null',
        Homa: 'Null',
        NomineesElection: 'Null',
        StakingPool: 'Null',
        PolkadotBridge: 'Null',
        Incentives: 'Null',
        AirDrop: 'Null',
        NFT: 'Null',
        RenVmBridge: 'Null',
        Contracts: 'Null',
        EVM: 'Null',
        Sudo: 'Null',
        TransactionPayment: 'Null'
      }
    }
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

export const typesAlias: Record<string, OverrideModuleType> = Object.values(allDefinitions).reduce(
  (all, def) => Object.assign(all, (def as any).typesAlias),
  {}
);

export const typesBundle = _typesBundle as OverrideBundleType;
