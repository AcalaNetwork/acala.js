export default {
  types: {
    AuctionId: 'u32',
    AuctionIdOf: 'AuctionId',
    CurrencyId: 'u8',
    CurrencyIdOf: 'CurrencyId',
    Amount: 'i128',
    AmountOf: 'Amount',
    DebitAmount: 'Amount',
    DebitAmountOf: 'DebitAmount',
    DebitBalanceOf: 'Balance',
    AuctionInfo: {
      bid: 'Option<(AccountId, Balance)>',
      start: 'BlockNumber',
      end: 'Option<BlockNumber>'
    },
    AuctionIdLinkedItem: {
      prev: 'Option<AuctionId>',
      next: 'Option<AuctionId>'
    },
    FixedU128: 'u128',
    ExchangeRate: 'FixedU128',
    Price: 'FixedU128',
    OracleKey: 'CurrencyId',
    OracleValue: 'Price',
    Rate: 'FixedU128',
    Ratio: 'FixedU128',
    TimestampedValue: {
      value: 'OracleValue',
      timestamp: 'Moment'
    },
    TimestampedValueOf: 'TimestampedValue',
    AuctionItem: {
      owner: 'AccountId',
      currencyId: 'CurrencyId',
      amount: 'Balance',
      target: 'Balance',
      startTime: 'BlockNumber'
    }
  }
};
