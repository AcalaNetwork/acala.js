export default {
  rpc: {},
  types: {
    CollateralAuctionItem: {
      refundRecipient: 'AccountId',
      currencyId: 'CurrencyId',
      initial_amount: 'Compact<Balance>',
      amount: 'Compact<Balance>',
      target: 'Compact<Balance>',
      startTime: 'BlockNumber'
    },
    DebitAuctionItem: {
      initial_amount: 'Compact<Balance>',
      amount: 'Compact<Balance>',
      fix: 'Compact<Balance>',
      startTime: 'BlockNumber'
    },
    SurplusAuctionItem: {
      amount: 'Compact<Balance>',
      startTime: 'BlockNumber'
    }
  }
};
