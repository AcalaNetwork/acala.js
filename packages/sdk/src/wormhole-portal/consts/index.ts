import { ChainId } from '@certusone/wormhole-sdk';
import { SUPPORT_CHAINS } from './chains';

export { ChainId };

export { SUPPORT_CHAINS } from './chains';

export type SupportChain = keyof typeof SUPPORT_CHAINS;
