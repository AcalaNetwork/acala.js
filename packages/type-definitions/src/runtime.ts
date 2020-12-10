export default {
  rpc: {},
  types: {
    AuctionId: 'u32',
    AuctionIdOf: 'AuctionId',
    CurrencyIdOf: 'CurrencyId',
    Amount: 'i128',
    AmountOf: 'Amount',
    DebitAmount: 'Amount',
    DebitAmountOf: 'DebitAmount',
    DebitBalance: 'Balance',
    DebitBalanceOf: 'Balance',
    OracleKey: 'CurrencyId',
    OracleValue: 'Price',
    Share: 'u128',
    DestAddress: '[u8; 20]',
    AsOriginId: {
      _enum: ['Root', 'AcalaTreasury', 'HonzonTreasury', 'HomaTreasury', 'DSWF']
    }
  }
};
