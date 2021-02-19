function buildTokenSymbol() {
  const config: Record<string, string> = {
    0: 'ACA',
    1: 'AUSD',
    2: 'DOT',
    3: 'LDOT',
    4: 'XBTC',
    5: 'RENBTC',
    6: 'POLKABTC',
    7: 'PLM',
    8: 'PHA',

    128: 'KAR',
    129: 'KUSD',
    130: 'KSM',
    131: 'LKSM',
    // Reserve for XBTC = 132
    // Reserve for RENBTC = 133
    // Reserve for POLKABTC = 134
    135: 'SDN'
    // Reserve for PHA = 136
  };

  const maxTokenSymbol = Math.max(...Object.keys(config).map((i) => parseInt(i)));

  return new Array(maxTokenSymbol + 1).fill(undefined).map((_value, index) => {
    return config[index + ''] || 'Null';
  });
}

export default {
  rpc: {},
  types: {
    Amount: 'i128',
    AmountOf: 'Amount',
    AuctionId: 'u32',
    AuctionIdOf: 'AuctionId',
    Share: 'u128',
    TokenSymbol: {
      _enum: buildTokenSymbol()
    },
    CurrencyId: {
      _enum: {
        Token: 'TokenSymbol',
        DEXShare: '(TokenSymbol, TokenSymbol)',
        ERC20: 'EvmAddress'
      }
    },
    CurrencyIdOf: 'CurrencyId',
    AirDropCurrencyId: {
      _enum: ['KAR', 'ACA']
    },
    AuthoritysOriginId: {
      _enum: ['Root', 'AcalaTreasury', 'HonzonTreasury', 'HomaTreasury', 'DSWF']
    },
    DataProviderId: {
      _enum: ['Aggregated', 'Acala', 'Band']
    },
    TradingPair: '(CurrencyId,  CurrencyId)',
    NFTBalance: 'u128'
  }
};
