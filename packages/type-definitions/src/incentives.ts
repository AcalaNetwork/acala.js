export default {
  rpc: {},
  types: {
    PoolId: {
      _enum: {
        Loans: 'CurrencyId',
        DexIncentive: 'CurrencyId',
        DexSaving: 'CurrencyId',
        Homa: 'Null'
      }
    }
  }
};
