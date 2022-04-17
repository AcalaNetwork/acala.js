import { Chain } from '../types';
import { getChainIcon } from '../utils/get-chain-icon';

export const data = {
  acala: {
    id: 'acala',
    display: 'Acala',
    icon: getChainIcon('acala'),
    paraChainId: 2000,
    isParaChain: false
  },
  karura: {
    id: 'karura',
    display: 'Karura',
    icon: getChainIcon('karura'),
    paraChainId: 2000,
    isParaChain: false
  },
  kusama: {
    id: 'kusama',
    display: 'Kusama',
    icon: getChainIcon('kusama'),
    paraChainId: -1,
    isParaChain: true
  },
  polkadot: {
    id: 'polkadot',
    display: 'Polkadot',
    icon: getChainIcon('polkadot'),
    paraChainId: -1,
    isParaChain: true
  },
  statemine: {
    id: 'statemine',
    display: 'Statemine',
    icon: getChainIcon('statemine'),
    paraChainId: 2001,
    isParaChain: false
  },
  quartz: {
    id: 'quartz',
    display: 'Quartz',
    icon: getChainIcon('quartz'),
    paraChainId: 2095,
    isParaChain: false
  },
  bifrost: {
    id: 'bifrost',
    display: 'Bifrost',
    icon: getChainIcon('bifrost'),
    paraChainId: 2001,
    isParaChain: false
  },
  laminar: {
    id: 'laminar',
    display: 'Laminar',
    icon: getChainIcon('laminar'),
    paraChainId: 777,
    isParaChain: false
  },
  hydra: {
    id: 'hydra',
    display: 'Hydra',
    icon: getChainIcon('hydra'),
    paraChainId: 82406,
    isParaChain: false
  },
  phala: {
    id: 'phala',
    display: 'Phala',
    icon: getChainIcon('phala'),
    paraChainId: 1,
    isParaChain: false
  },
  plasm: {
    id: 'plasm',
    display: 'Plasm',
    icon: getChainIcon('plasm'),
    paraChainId: 5000,
    isParaChain: false
  },
  polkabtc: {
    id: 'polkabtc',
    display: 'PolkaBTC',
    icon: getChainIcon('polkabtc'),
    paraChainId: 21,
    isParaChain: false
  },
  khala: {
    id: 'khala',
    display: 'Khala',
    icon: getChainIcon('khala'),
    paraChainId: 2004,
    isParaChain: false
  },
  kintsugi: {
    id: 'kintsugi',
    display: 'Kintsugi',
    icon: getChainIcon('kintsugi'),
    paraChainId: 2092,
    isParaChain: false
  }
};

export type RegisteredChain = keyof typeof data;

export const chains = data as Record<RegisteredChain, Chain>;
