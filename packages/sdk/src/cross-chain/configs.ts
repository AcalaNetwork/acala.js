import { AnyApi } from '@acala-network/sdk-core';
import { Balance } from '@polkadot/types/interfaces';
import { Storage } from '../utils/storage';
import { Chain, CrossChainTokenConfig } from './types';

type AvailableChainType = 'acala' | 'polkadot' | 'karura' | 'kusama' | 'khala' | 'bifrost' | 'hydrate';

export const AvailableChain: Record<AvailableChainType, Chain> = {
  acala: {
    name: 'acala',
    paraChainId: 2000,
    isParaChain: false
  },
  polkadot: {
    name: 'polkadot',
    paraChainId: -1,
    isParaChain: true
  },
  karura: {
    name: 'karura',
    paraChainId: 2000,
    isParaChain: false
  },
  kusama: {
    name: 'kusama',
    paraChainId: -1,
    isParaChain: true
  },
  khala: {
    name: 'khala',
    paraChainId: 2004,
    isParaChain: false
  },
  bifrost: {
    name: 'bifrost',
    paraChainId: 2001,
    isParaChain: true
  },
  hydrate: {
    name: 'hydrate',
    paraChainId: 82406,
    isParaChain: false
  }
};

export const karuraCrossChainTokenConfigs: CrossChainTokenConfig[] = [
  // kusama -> karura
  {
    token: 'KSM',
    fromChain: AvailableChain.kusama,
    toChain: AvailableChain.karura,
    destEd: 100_000_000,
    destFee: 64_000_000,
    destWeight: 3 * 1_000_000_000
  },
  // karura -> kusama
  {
    token: 'KSM',
    fromChain: AvailableChain.karura,
    toChain: AvailableChain.kusama,
    destEd: 33_333_333,
    destFee: 79_999_999,
    destWeight: 5 * 1_000_000_000
  },
  // karura -> bifrost
  {
    token: 'KSM',
    fromChain: AvailableChain.karura,
    toChain: AvailableChain.bifrost,
    destEd: 100_000_000,
    destFee: 64_000_000,
    destWeight: 5 * 1_000_000_000
  },
  {
    token: 'KAR',
    fromChain: AvailableChain.karura,
    toChain: AvailableChain.bifrost,
    destEd: 100_000_000,
    destFee: 6_400_000_000,
    destWeight: 5 * 1_000_000_000
  },
  {
    token: 'KUSD',
    fromChain: AvailableChain.karura,
    toChain: AvailableChain.bifrost,
    destEd: 100_000_000,
    destFee: 25_600_000_000,
    destWeight: 5 * 1_000_000_000
  },
  {
    token: 'BNC',
    fromChain: AvailableChain.karura,
    toChain: AvailableChain.bifrost,
    destEd: 10_000_000_000,
    destFee: 5_120_000_000,
    destWeight: 5 * 1_000_000_000
  },
  {
    token: 'VSKSM',
    fromChain: AvailableChain.karura,
    toChain: AvailableChain.bifrost,
    destEd: 10_000_000,
    destFee: 64_000_000,
    destWeight: 5 * 1_000_000_000
  }
];

export const acalaCrossChainTokenConfigs: CrossChainTokenConfig[] = [
  // kusama -> karura
  {
    token: 'DOT',
    fromChain: AvailableChain.kusama,
    toChain: AvailableChain.karura,
    destEd: 100_000_000,
    destFee: 64_000_000,
    destWeight: 3 * 1_000_000_000
  },
  // karura -> kusama
  {
    token: 'DOT',
    fromChain: AvailableChain.karura,
    toChain: AvailableChain.kusama,
    destEd: 33_333_333,
    destFee: 79_999_999,
    destWeight: 3 * 1_000_000_000
  }
];
