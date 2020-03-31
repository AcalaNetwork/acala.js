export default {
  types: {
    RedeemStrategy: {
      _enum: {
        Immedately: 'u8',
        Target: 'EraIndex',
        WaitForUnbonding: 'u8'
      }
    }
  }
};
