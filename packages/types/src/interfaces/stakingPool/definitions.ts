export default {
  rpc: {
    getAvailableUnbonded: {
      description: 'Get Available Unbonded',
      params: [
        {
          name: 'account',
          type: 'AccountId'
        }
      ],
      type: 'BalanceInfo'
    },
    getLiquidStakingExchangeRate: {
      description: 'get liquid staking exchange rate',
      params: [],
      type: 'ExchangeRate'
    }
  },
  types: {
    BalanceInfo: {
      amount: 'Balance'
    },
    StakingBalance: 'Balance',
    LiquidBalance: 'Balance',
    StakingBalanceOf: 'StakingBalance',
    LiquidBalanceOf: 'LiquidBalance',
    PolkadotAccountId: 'AccountId',
    PolkadotAccountIdOf: 'PolkadotAccountId'
  }
};
