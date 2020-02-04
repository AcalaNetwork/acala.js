import definitions from '@polkadot/types/interfaces/runtime/definitions';

export default {
  types: {
    ...definitions.types,
    AuctionId: 'u32',
    AuctionIdOf: 'AuctionId',
    CurrencyId: {
      _enum: ['ACA', 'AUSD', 'DOT', 'XBTC']
    },
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
    },
    CollateralAuctionItem: {
      owner: 'AccountId',
      currencyId: 'CurrencyId',
      amount: 'Balance',
      target: 'Balance',
      startTime: 'BlockNumber'
    },
    DebitAuctionItem: {
      amount: 'Balance',
      fix: 'Balance',
      startTime: 'BlockNumber'
    },
    SurplusAuctionItem: {
      amount: 'Balance',
      startTime: 'BlockNumber'
    }
  }
};
