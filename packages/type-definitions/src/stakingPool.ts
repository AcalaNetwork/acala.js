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
    SubAccountStatus: {
      bonded: 'Balance',
      available: 'Balance',
      unbonding: 'Vec<(EraIndex,Balance)>',
      mockRewardRate: 'Rate'
    },
    Params: {
      targetMaxFreeUnbondedRatio: 'Ratio',
      targetMinFreeUnbondedRatio: 'Ratio',
      targetUnbondingToFreeRatio: 'Ratio',
      unbondingToFreeAdjustment: 'Ratio',
      baseFeeRate: 'Rate'
    },
    ChangeRate: {
      _enum: {
        NoChange: 'Null',
        NewValue: 'Rate'
      }
    },
    ChangeRatio: {
      _enum: {
        NoChange: 'Null',
        NewValue: 'Ratio'
      }
    },
    BalanceInfo: {
      amount: 'Balance'
    },
    PolkadotAccountId: 'AccountId',
    PolkadotAccountIdOf: 'PolkadotAccountId'
  }
};
