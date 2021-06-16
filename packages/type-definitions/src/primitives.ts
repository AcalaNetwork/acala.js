export default {
  rpc: {},
  types: {
    Amount: 'i128',
    AmountOf: 'Amount',
    AuctionId: 'u32',
    AuctionIdOf: 'AuctionId',
    TokenSymbol: {
      _enum: {
        ACA: 0,
        AUSD: 1,
        DOT: 2,
        LDOT: 3,
        RENBTC: 4,

        KAR: 128,
        KUSD: 129,
        KSM: 130,
        LKSM: 131
        // Reserve for XBTC = 132
      }
    },
    DexShare: {
      _enum: {
        Token: 'TokenSymbol',
        Erc20: 'EvmAddress'
      }
    },
    CurrencyId: {
      _enum: {
        Token: 'TokenSymbol',
        DEXShare: '(DexShare, DexShare)',
        ERC20: 'EvmAddress',
        ChainSafe: '[u8; 32]'
      }
    },
    CurrencyIdOf: 'CurrencyId',
    AirDropCurrencyId: {
      _enum: ['KAR', 'ACA']
    },
    AuthoritysOriginId: {
      _enum: ['Root', 'AcalaTreasury', 'HonzonTreasury', 'HomaTreasury', 'DSWF']
    },
    AcalaDataProviderId: {
      _enum: ['Aggregated', 'Acala', 'Band']
    },
    TradingPair: '(CurrencyId,  CurrencyId)',
  },
  typesAlias: {
    oracle: {
      DataProviderId: 'AcalaDataProviderId'
    }
  }
};
