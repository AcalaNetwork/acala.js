interface Token {
  symbol: string;
  display: string;
  decimal: number;
}

type PresetTokens = Record<string, Record<string, Token>>;

export default {
  kusama: {
    KSM: {
      symbol: 'KSM',
      display: 'KSM',
      decimal: 12
    }
  },
  polkadot: {
    DOT: {
      symbol: 'DOT',
      display: 'DOT',
      decimal: 10
    }
  },
  karura: {
    KAR: {
      symbol: 'KAR',
      display: 'KAR',
      decimal: 12
    },
    KSM: {
      symbol: 'KSM',
      display: 'KAR',
      decimal: 12
    },
    LKSM: {
      symbol: 'LKSM',
      display: 'Liquid KSM',
      decimal: 12
    },
    KUSD: {
      symbol: 'KUSD',
      display: 'KUSD',
      decimal: 12
    }
  }
} as PresetTokens;
