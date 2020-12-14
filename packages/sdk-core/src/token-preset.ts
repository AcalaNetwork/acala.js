// preset token type
export type PresetToken = 'ACA' | 'AUSD' | 'DOT' | 'XBTC' | 'LDOT' | 'RENBTC' | 'KSM';

// common tokens config in acala network and polkadot
export const presetTokensConfig: Record<CHAIN, Record<PresetToken, TokenConfig>> = {
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