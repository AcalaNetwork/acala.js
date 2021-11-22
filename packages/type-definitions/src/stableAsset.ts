export default {
  rpc: {},
  types: {
    PoolTokenIndex: 'u32',
    AssetId: 'CurrencyId',
    StableAssetPoolInfo: {
      poolAsset: 'CurrencyId',
      assets: 'Vec<CurrencyId>',
      precisions: 'Vec<AtLeast64BitUnsigned>',
      mintFee: 'AtLeast64BitUnsigned',
      swapFee: 'AtLeast64BitUnsigned',
      redeemFee: 'AtLeast64BitUnsigned',
      totalSupply: 'Balance',
      a: 'AtLeast64BitUnsigned',
      aBlock: 'BlockNumber',
      futureA: 'AtLeast64BitUnsigned',
      futureABlock: 'BlockNumber',
      balances: 'Vec<Balance>',
      feeRecipient: 'AccountId',
      accountId: 'AccountId',
      palletId: 'AccountId'
    }
  }
};
