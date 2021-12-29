export default {
  rpc: {
    getSupplyAmount: {
      description: 'Get supply amount',
      params: [
        {
          name: 'supplyCurrencyId',
          type: 'CurrencyId'
        },
        {
          name: 'targetCurrencyId',
          type: 'CurrencyId'
        },
        {
          name: 'targetCurrencyAmount',
          type: 'BalanceRequest'
        }
      ],
      type: 'BalanceWrapper'
    },
    getTargetAmount: {
      description: 'Get target amount',
      params: [
        {
          name: 'supplyCurrencyId',
          type: 'CurrencyId'
        },
        {
          name: 'targetCurrencyId',
          type: 'CurrencyId'
        },
        {
          name: 'supplyCurrencyAmount',
          type: 'BalanceRequest'
        }
      ],
      type: 'BalanceWrapper'
    }
  },
  types: {
    TradingPairProvisionParameters: {
      minContribution: '(Balance, Balance)',
      targetProvision: '(Balance, Balance)',
      accumulatedProvision: '(Balance, Balance)',
      notBefore: 'BlockNumber'
    },
    BalanceWrapper: {
      amount: 'Balance'
    },
    BalanceRequest: {
      amount: 'Balance'
    },
    TradingPairStatus: {
      _enum: {
        Disabled: 'Null',
        Provisioning: 'TradingPairProvisionParameters',
        Enabled: 'Null'
      }
    }
  }
};
