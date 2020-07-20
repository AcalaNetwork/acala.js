export default {
  rpc: {},
  types: {
    RedeemStrategy: {
      _enum: {
        Immediately: 'Null',
        Target: 'EraIndex',
        WaitForUnbonding: 'Null'
      }
    }
  }
};
