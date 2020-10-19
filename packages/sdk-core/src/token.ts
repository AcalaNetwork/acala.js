import { FixedPointNumber } from './fixed-point-number';
import { CHAIN } from './type';

export interface TokenConfig {
  chain?: CHAIN; // which chain the token is in
  name: string; // The name of the token
  symbol?: string; // short name of the token
  precision: number; // the precision of the token
  amount?: number; // the amount of the token
}

type PresetToken = 'ACA' | 'AUSD' | 'DOT' | 'XBTC' | 'LDOT' | 'RENBTC' | 'KSM';

// common tokens config in acala network and polkadot
const presetTokensConfig: Record<CHAIN, Record<PresetToken, TokenConfig>> = {
  acala: {
    ACA: {
      chain: 'acala',
      name: 'ACA',
      symbol: 'ACA',
      precision: 18
    },
    AUSD: {
      chain: 'acala',
      name: 'AUSD',
      symbol: 'aUSD',
      precision: 18
    },
    DOT: {
      chain: 'acala',
      name: 'DOT',
      symbol: 'DOT',
      precision: 18
    },
    RENBTC: {
      chain: 'acala',
      name: 'RENBTC',
      symbol: 'renBTC',
      precision: 18
    },
    LDOT: {
      chain: 'acala',
      name: 'LDOT',
      symbol: 'LDOT',
      precision: 18
    },
    XBTC: {
      chain: 'acala',
      name: 'XBTC',
      symbol: 'XBTC',
      precision: 18
    }
  } as Record<PresetToken, TokenConfig>,
  polkadot: {
    DOT: {
      chain: 'polkadot',
      name: 'DOT',
      symbol: 'DOT',
      precision: 10
    }
  } as Record<PresetToken, TokenConfig>,
  kurara: {} as Record<PresetToken, TokenConfig>,
  kusama: {
    KSM: {
      chain: 'kusama',
      name: 'KSM',
      symbol: 'KSM',
      precision: 12
    }
  } as Record<PresetToken, TokenConfig>
};

export const TokenAmount = FixedPointNumber;

export class Token {
  readonly chain!: CHAIN;
  // keep all properties about token readonly
  readonly name!: string;
  readonly symbol!: string;
  readonly precision!: number;
  public amount!: FixedPointNumber;

  constructor (config: TokenConfig) {
    this.name = config.name;
    this.symbol = config.symbol || config.name;
    this.precision = config.precision;
    this.chain = config.chain || 'acala';

    if (config.amount) {
      this.amount = new TokenAmount(config.amount || 0, this.precision);
    }
  }

  /**
   * @name isEqual
   * @description check if `token` equal current
   */
  isEqual (token: Token): boolean {
    return this.chain === token.chain && this.name === token.name;
  }

  toString (): string {
    return `${this.name} ${this.amount.toNumber()}`;
  }
}

function convert (config: Record<CHAIN, Record<string, TokenConfig>>): Record<CHAIN, Record<string, Token>> {
  return Object.keys(config).reduce((prev, chain) => {
    prev[chain as CHAIN] = Object.keys(config[chain as CHAIN]).reduce((prev, name) => {
      prev[name] = new Token(config[chain as CHAIN][name]);

      return prev;
    }, {} as Record<string, Token>);

    return prev;
  }, {} as Record<CHAIN, Record<string, Token>>);
}

export const PRESET_TOKENS = convert(presetTokensConfig);

export function getPresetToken (name: PresetToken, chain: CHAIN = 'acala'): Token {
  return PRESET_TOKENS[chain][name];
}

const TOKEN_SORT: Record<string, number> = {
  ACA: 0,
  AUSD: 1,
  DOT: 2,
  XBTC: 3,
  LDOT: 4,
  RENBTC: 5
};

export function sortTokens (token1: Token, token2: Token, ...other: Token[]): Token[] {
  const result = [token1, token2, ...other];

  return result.sort((a, b) => TOKEN_SORT[a.name] - TOKEN_SORT[b.name]);
}
