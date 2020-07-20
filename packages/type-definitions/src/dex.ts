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
    BalanceWrapper: {
      amount: 'Balance'
    },
    BalanceRequest: {
      amount: 'Balance'
    }
  }
};
