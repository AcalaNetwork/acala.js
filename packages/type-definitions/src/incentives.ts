export default {
  rpc: {},
  types: {
    PoolId: {
      _enum: {
        LoansIncentive: 'CurrencyId',
        DexIncentive: 'CurrencyId',
        HomaIncentive: 'Null',
        DexSaving: 'CurrencyId',
        HomaValidatorAllowance: 'AccountId'
      }
    }
  }
};
