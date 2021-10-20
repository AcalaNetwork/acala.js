export default {
  rpc: {},
  types: {
    OracleKey: 'CurrencyId',
    OracleValue: 'Price',
    AsOriginId: 'AuthoritysOriginId',
    ProxyType: {
      _enum: ['Any', 'CancelProxy', 'Governance', 'Auction', 'Swap', 'Loan']
    },
    AtLeast64BitUnsigned: 'u128',
    StableAssetPoolId: 'u32',
    RelayChainBlockNumberOf: 'RelayChainBlockNumber'
  }
};
