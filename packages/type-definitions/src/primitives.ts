export default {
  rpc: {},
  types: {
    CurrencyId: {
      _enum: ['ACA', 'AUSD', 'DOT', 'XBTC', 'LDOT', 'RENBTC']
    },
    AirDropCurrencyId: {
      _enum: ['KAR', 'ACA']
    },
    DataProviderId: {
      _enum: ['Aggregated', 'Acala', 'Band']
    }
  }
};
