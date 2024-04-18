import { WormholeRouter } from '../types.js';

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
