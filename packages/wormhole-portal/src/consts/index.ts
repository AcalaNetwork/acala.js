import { ChainId } from '@certusone/wormhole-sdk';
import { SUPPORT_CHAINS } from './chains.js';


export { SUPPORT_CHAINS } from './chains.js';

export type { ChainId };

export type SupportChain = keyof typeof SUPPORT_CHAINS;
