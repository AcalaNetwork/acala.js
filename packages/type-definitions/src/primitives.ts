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
        // 20 - 39: External tokens (e.g. bridged)
        RENBTC: 20,
        CASH: 21,
        // 40 - 127: Polkadot parachain tokens

        // 128 - 147: Karura & Kusama native tokens
        KAR: 128,
        KUSD: 129,
        KSM: 130,
        LKSM: 131,
        // 148 - 167: External tokens (e.g. bridged)
        // 149: Reserved for renBTC
        // 150: Reserved for CASH
        // 168 - 255: Kusama parachain tokens
        BNC: 168
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
      _enum: ['Root', 'Treasury', 'HonzonTreasury', 'HomaTreasury', 'TreasuryReserve']
    },
    AcalaDataProviderId: {
      _enum: ['Aggregated', 'Acala', 'Band']
    },
    TradingPair: '(CurrencyId,  CurrencyId)',
    OrmlCurrencyId: 'CurrencyId'
  },
  typesAlias: {
    rewards: {
      OrmlCurrencyId: 'CurrencyId'
    },
    oracle: {
      DataProviderId: 'AcalaDataProviderId'
    }
  }
};
