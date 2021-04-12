export default {
  rpc: {},
  types: {
    PoolId: {
      _enum: {
        LoansIncentive: 'CurrencyId',
        DexIncentive: 'CurrencyId',
        DexSaving: 'CurrencyId',
        HomaIncentive: 'Null',
        HomaValidatorAllowance: 'AccountId'
      }
    }
  }
};
