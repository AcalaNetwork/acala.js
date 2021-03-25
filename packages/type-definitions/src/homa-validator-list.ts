export default {
  rpc: {},
  types: {
    RelaychainAccountId: 'AccountId',
    SlashInfo: {
      validator: 'RelaychainAccountId',
      relaychainTokenAmount: 'Balance'
    },
    ValidatorBacking: {
      totalInsurance: 'Balance',
      isFrozen: 'Boolean'
    }
  }
};
