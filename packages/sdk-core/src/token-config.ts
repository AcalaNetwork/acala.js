import { CHAIN } from './type';

interface TokenConfigData {
  chain: CHAIN;
  name: string;
  symbol: string;
  decimal: number;
}

const config: TokenConfigData[] = [
  {
    chain: 'acala',
    name: 'ACA',
    symbol: 'ACA',
    decimal: 13
  },
  {
    chain: 'acala',
    name: 'aUSD',
    symbol: 'AUSD',
    decimal: 12
  },
  {
    chain: 'polka',
    name: 'DOT',
    symbol: 'DOT',
    decimal: 10
  },
  {
    chain: 'acala',
    name: 'LDOT',
    symbol: 'LDOT',
    decimal: 10
  },
  {
    chain: 'unknown',
    name: 'XBTC',
    symbol: 'XBTC',
    decimal: 8
  },
  {
    chain: 'acala',
    name: 'renBTC',
    symbol: 'RENBTC',
    decimal: 8
  },
  {
    chain: 'polkabtc',
    name: 'polkaBTC',
    symbol: 'POLKABTC',
    decimal: 8
  },
  {
    chain: 'unknown',
    name: 'PLM',
    symbol: 'PLM',
    decimal: 8
  },
  {
    chain: 'phala',
    name: 'PHA',
    symbol: 'PHA',
    decimal: 8
  },
  {
    chain: 'karura',
    name: 'KAR',
    symbol: 'KAR',
    decimal: 12
  },
  {
    chain: 'karura',
    name: 'kSUD',
    symbol: 'KUSD',
    decimal: 12
  },
  {
    chain: 'kusama',
    name: 'KSM',
    symbol: 'KSM',
    decimal: 12
  },
  {
    chain: 'karura',
    name: 'LKSM',
    symbol: 'LKSM',
    decimal: 12
  },
  {
    chain: 'unknown',
    name: 'SDN',
    symbol: 'SDN',
    decimal: 18
  }
];

class TokenConfig {
  readonly _config: TokenConfigData[];

  constructor(_config: TokenConfigData[] = config) {
    this._config = _config;
  }

  public getDecimal(token: string): number {
    const config = this.getConfig(token);

    if (!config) {
      console.warn(`can't find default decimal for ${token}, treat 18 as decimal`);

      return 18;
    }

    return config.decimal;
  }

  public getName(token: string): string {
    const config = this.getConfig(token);

    if (!config) {
      console.warn(`can't find default name for ${token}, treat ${token} as name`);

      return token;
    }

    return config.name;
  }

  public getChain(token: string): CHAIN {
    const config = this.getConfig(token);

    if (!config) {
      console.warn(`can't find default chain for ${token}, treat ${token} as unknown`);

      return 'unknown';
    }

    return config.chain;
  }

  private getConfig(token: string) {
    return this._config.find((item) => item.symbol === token);
  }
}

export const tokenConfig = new TokenConfig();
