export default {
  rpc: {},
  types: {
    CollateralAuctionItem: {
      refundRecipient: 'AccountId',
      currencyId: 'CurrencyId',
      amount: 'Compact<Balance>',
      target: 'Compact<Balance>',
      startTime: 'BlockNumber'
    },
    DebitAuctionItem: {
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
