import { FixedPointNumber } from '@acala-network/sdk-core';
import { ChainType } from '../types';
import { getChainType } from '../utils/get-chain-type';

interface TokenConfig {
  readonly decimals: number;
  readonly symbol: string;
  readonly display: string;
  readonly ed: FixedPointNumber;
}

type TokenMap = Readonly<Record<string, TokenConfig>>;

interface TokenListConfig {
  readonly [ChainType.ACALA]: TokenMap;
  readonly [ChainType.MANDALA]: TokenMap;
  readonly [ChainType.KARURA]: TokenMap;
}

function createTokenConfig(symbol: string, display: string, decimals: number, ed: FixedPointNumber) {
  return {
    decimals,
    symbol,
    display,
    ed
  };
}

const DEFAULT_TOKEN_LIST: TokenListConfig = {
  [ChainType.ACALA]: {
    ACA: createTokenConfig('ACA', 'ACA', 12, new FixedPointNumber(0.1, 12)),
    AUSD: createTokenConfig('AUSD', 'aUSD', 12, new FixedPointNumber(0.1, 12)),
    DOT: createTokenConfig('DOT', 'DOT', 10, new FixedPointNumber(0.01, 12)),
    LDOT: createTokenConfig('LDOT', 'LDOT', 10, new FixedPointNumber(0.05, 12))
  },
  [ChainType.KARURA]: {
    KAR: createTokenConfig('KAR', 'KAR', 12, new FixedPointNumber(0.1, 12)),
    KUSD: createTokenConfig('KUSD', 'kUSD', 12, new FixedPointNumber(0.01, 12)),
    KSM: createTokenConfig('KSM', 'KSM', 12, new FixedPointNumber(10 * 0.00001, 12)),
    LKSM: createTokenConfig('LKSM', 'LKSM', 12, new FixedPointNumber(50 * 0.00001, 12)),
    BNC: createTokenConfig('BNC', 'BNC', 12, new FixedPointNumber(800 * 0.00001, 12)),
    VSKSM: createTokenConfig('VSKSM', 'vsKSM', 12, new FixedPointNumber(10 * 0.00001, 12)),
    PHA: createTokenConfig('PHA', 'PHA', 12, new FixedPointNumber(4000 * 0.00001, 12))
  },
  [ChainType.MANDALA]: {
    ACA: createTokenConfig('ACA', 'ACA', 12, new FixedPointNumber(0.1, 12)),
    AUSD: createTokenConfig('AUSD', 'aUSD', 12, new FixedPointNumber(0.1, 12)),
    DOT: createTokenConfig('DOT', 'DOT', 10, new FixedPointNumber(0.01, 12)),
    LDOT: createTokenConfig('LDOT', 'LDOT', 10, new FixedPointNumber(0.05, 12)),
    KAR: createTokenConfig('KAR', 'KAR', 12, new FixedPointNumber(0.1, 12)),
    KUSD: createTokenConfig('KUSD', 'kUSD', 12, new FixedPointNumber(0.01, 12)),
    KSM: createTokenConfig('KSM', 'KSM', 12, new FixedPointNumber(10 * 0.00001, 12)),
    LKSM: createTokenConfig('LKSM', 'LKSM', 12, new FixedPointNumber(50 * 0.00001, 12)),
    BNC: createTokenConfig('BNC', 'BNC', 12, new FixedPointNumber(800 * 0.00001, 12)),
    VSKSM: createTokenConfig('VSKSM', 'vsKSM', 12, new FixedPointNumber(10 * 0.00001, 12)),
    PHA: createTokenConfig('PHA', 'PHA', 12, new FixedPointNumber(4000 * 0.00001, 12))
  }
};

class TokenList {
  public getToken(name: string, chain: string) {
    const chainType = getChainType(chain);

    // unsopport chain
    if (!chainType) return;

    const data = DEFAULT_TOKEN_LIST?.[chainType]?.[name];

    return data;
  }
}

export default new TokenList();
