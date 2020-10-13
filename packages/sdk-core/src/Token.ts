import { convertToFixed18 } from "packages/app-util/src";
import { FixedPointNumber } from "./fixed-point-number";

export type CHAIN = 'acala' | 'kurara' | 'polkadot' | 'kusama';

export interface TokenConfig {
  chain: CHAIN; // which chain the token is in
  name: string; // The name of the token
  symbol?: string; // short name of the token
  precision: number; // the precision of the token
  amount?: number; // the amount of the token
}

// common tokens config in acala network and polkadot
const presetTokensConfig: Record<CHAIN, Record<string, TokenConfig>> = {
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
  },
  polkadot: {
    DOT: {
      chain: 'polkadot',
      name: 'DOT',
      symbol: 'DOT',
      precision: 10
    }
  },
  kurara: {},
  kusama: {
    KSM: {
      chain: 'kusama',
      name: 'KSM',
      symbol: 'KSM',
      precision: 12
    }
  }
};

export class Token {
  readonly __chain!: CHAIN;
  // keep all properties about token readonly
  readonly name!: string;
  readonly symbol!: string;
  readonly precision!: number;
  public amount!: FixedPointNumber;

  constructor (config: TokenConfig) {
    this.name = config.name;
    this.symbol = config.symbol || config.name;
    this.precision = config.precision;
    this.__chain = config.chain;
    this.amount = new FixedPointNumber(config.amount || 0, this.precision);
  }

  /**
   * @name isEqual
   * @description check if `token` equal current
   */
  isEqual (token: Token): boolean {
    return this.__chain === token.__chain && this.name === token.name;
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

export function getToken (name: string, chain: CHAIN = 'acala'): Token | undefined {
  return PRESET_TOKENS[chain] ? PRESET_TOKENS[chain][name] : undefined;
}
