import { RegisteredChain } from '../configs/chains';
import { Chain } from '../types';

export function isChainEqual(c1: Chain | RegisteredChain, c2: Chain | RegisteredChain): boolean {
  const c1Name = typeof c1 === 'string' ? c1 : c1.name;
  const c2Name = typeof c2 === 'string' ? c2 : c2.name;

  return c1Name.toLowerCase() === c2Name.toLowerCase();
}
