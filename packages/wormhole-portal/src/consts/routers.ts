import { WormholeRouter } from '../types';

export const DEFAULT_ROUTERS: WormholeRouter[] = [
  {
    from: 'acala',
    to: 'karura',
    token: 'aUSD'
  },
  {
    from: 'karura',
    to: 'acala',
    token: 'aUSD'
  }
];
