import { WormholeRouter } from '../types';
import { AcalaAUSD, KaruraAUSD } from './tokens';

export const DEFAULT_ROUTERS: WormholeRouter[] = [
  {
    from: 'acala',
    to: 'karura',
    token: AcalaAUSD
  },
  {
    from: 'karura',
    to: 'acala',
    token: KaruraAUSD
  }
];
