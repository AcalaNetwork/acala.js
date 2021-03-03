export default {
  rpc: {},
  types: {
    Amount: 'i128',
    AmountOf: 'Amount',
    AuctionId: 'u32',
    AuctionIdOf: 'AuctionId',
    Share: 'u128',
    TokenSymbol: {
      _enum: {
        ACA: 0,
        AUSD: 1,
        DOT: 2,
        LDOT: 3,
        XBTC: 4,
        RENBTC: 5,
        POLKABTC: 6,
        PLM: 7,
        PHA: 8,
        HDT: 9,

        KAR: 128,
        KUSD: 129,
        KSM: 130,
        LKSM: 131,
        // Reserve for XBTC = 132
        // Reserve for RENBTC = 133
        // Reserve for POLKABTC = 134
        SDN: 135
        // Reserve for PHA = 136
      }
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
