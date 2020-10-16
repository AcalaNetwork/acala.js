export default {
  rpc: {},
  types: {
    TokenSymbol: {
      _enum: ['ACA', 'AUSD', 'DOT', 'XBTC', 'LDOT', 'RENBTC']
    },
    CurrencyId: {
      _enum: {
        Token: 'TokenSymbol',
        DEXShare: '(TokenSymbol, TokenSymbol)'
      }
    },
    AirDropCurrencyId: {
      _enum: ['KAR', 'ACA']
    },
    DataProviderId: {
      _enum: ['Aggregated', 'Acala', 'Band']
    },
    TradingPair: '(CurrencyId,  CurrencyId)'
  }
};
