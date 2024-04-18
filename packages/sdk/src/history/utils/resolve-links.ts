import { ResolveLinks } from '../types.js';
import { ChainType } from '../../types.js';

const ACALA_SUB_SCAN = 'https://acala.subscan.io';
const KARURA_SUB_SCAN = 'https://karura.subscan.io';

export function resolveLinks(chain: ChainType, extrinsicHash?: string, blockNumber?: number | string): ResolveLinks {
  if (chain !== ChainType.ACALA && chain !== ChainType.KARURA) {
    return {
      subscan: ''
    };
  }

  const subscanURL = chain === ChainType.ACALA ? ACALA_SUB_SCAN : KARURA_SUB_SCAN;

  if (extrinsicHash) {
    return {
      subscan: `${subscanURL}/extrinsic/${extrinsicHash}`
    };
  }

  if (blockNumber) {
    return {
      subscan: `${subscanURL}/block/${blockNumber}`
    };
  }

  return {
    subscan: ''
  };
}
