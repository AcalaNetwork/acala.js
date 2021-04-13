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
      isFrozen: 'bool'
    },
    Guarantee: {
      total: 'Balance',
      bonded: 'Balance',
      unbonding: 'Option<(Balance, BlockNumber)>'
    }
  }
};
