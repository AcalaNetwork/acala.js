import { CONTRACTS } from '@certusone/wormhole-sdk';
import { WormholeToken } from '../types';

export const AcalaAUSD: WormholeToken = {
  symbol: 'aUSD',
  chain: 'acala',
  decimals: 12,
  address: '0x0000000000000000000100000000000000000001',
  bridgeAddress: CONTRACTS.MAINNET.acala.token_bridge
};

export const KaruraWAUSD: WormholeToken = {
  symbol: 'waUSD',
  chain: 'karura',
  decimals: 12,
  address: '0xe20683ad1ed8bbeed7e1ae74be10f19d8045b530',
  bridgeAddress: CONTRACTS.MAINNET.karura.token_bridge
};

export const KaruraAUSD: WormholeToken = {
  symbol: 'aUSD',
  chain: 'karura',
  decimals: 12,
  address: '0x0000000000000000000100000000000000000081',
  bridgeAddress: CONTRACTS.MAINNET.karura.token_bridge
};

export const DEFAULT_TOKENS = [AcalaAUSD, KaruraWAUSD, KaruraAUSD];
