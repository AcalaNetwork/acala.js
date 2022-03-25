import { Chain } from '../types';
import { getChainIcon } from '../utils/get-chain-icon';

export const data = {
  acala: {
    name: 'Acala',
    icon: getChainIcon('acala'),
    paraChainId: 2000,
    isParaChain: false
  },
  karura: {
    name: 'Karura',
    icon: getChainIcon('karura'),
    paraChainId: 2000,
    isParaChain: false
  },
  kusama: {
    name: 'Kusama',
    icon: getChainIcon('kusama'),
    paraChainId: -1,
    isParaChain: true
  },
  polkadot: {
    name: 'Polkadot',
    icon: getChainIcon('polkadot'),
    paraChainId: -1,
    isParaChain: true
  },
  statemine: {
    name: 'Statemine',
    icon: getChainIcon('statemine'),
    paraChainId: 2001,
    isParaChain: false
  },
  quartz: {
    name: 'Quartz',
    icon: getChainIcon('quartz'),
    paraChainId: 2095,
    isParaChain: false
  },
  bifrost: {
    name: 'Bifrost',
    icon: getChainIcon('bifrost'),
    paraChainId: 2001,
    isParaChain: false
  },
  laminar: {
    name: 'Laminar',
    icon: getChainIcon('laminar'),
    paraChainId: 777,
    isParaChain: false
  },
  hydra: {
    name: 'Hydra',
    icon: getChainIcon('hydra'),
    paraChainId: 82406,
    isParaChain: false
  },
  phala: {
    name: 'Phala',
    icon: getChainIcon('phala'),
    paraChainId: 1,
    isParaChain: false
  },
  plasm: {
    name: 'Plasm',
    icon: getChainIcon('plasm'),
    paraChainId: 5000,
    isParaChain: false
  },
  polkabtc: {
    name: 'PolkaBTC',
    icon: getChainIcon('polkabtc'),
    paraChainId: 21,
    isParaChain: false
  },
  khala: {
    name: 'Khala',
    icon: getChainIcon('khala'),
    paraChainId: 2004,
    isParaChain: false
  },
  kintsugi: {
    name: 'Kintsugi',
    icon: getChainIcon('kintsugi'),
    paraChainId: 2092,
    isParaChain: false
  }
};

export type RegisteredChain = keyof typeof data;

export const chains = data as Record<RegisteredChain, Chain>;
