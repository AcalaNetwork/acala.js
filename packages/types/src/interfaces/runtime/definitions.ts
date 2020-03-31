import definitions from '@polkadot/types/interfaces/runtime/definitions';

export default {
  types: {
    ...definitions.types,
    AuctionId: 'u32',
    AuctionIdOf: 'AuctionId',
    CurrencyIdOf: 'CurrencyId',
    Amount: 'i128',
    AmountOf: 'Amount',
    DebitAmount: 'Amount',
    DebitAmountOf: 'DebitAmount',
    DebitBalance: 'Balance',
    DebitBalanceOf: 'Balance',
    AuctionIdLinkedItem: {
      prev: 'Option<AuctionId>',
      next: 'Option<AuctionId>'
    },
    ExchangeRate: 'FixedU128',
    OracleKey: 'CurrencyId',
    OracleValue: 'Price',
    Rate: 'FixedU128',
    Ratio: 'FixedU128',
    Share: 'u128',
    AuctionItem: {
      owner: 'AccountId',
      currencyId: 'CurrencyId',
      amount: 'Balance',
      target: 'Balance',
      startTime: 'BlockNumber'
    }
  }
};
