const typesBundleTypes = [
  {
    minmax: [0, 499] as any,
    types: {
      Weight: 'u32',
      RefCount: 'RefCountTo259',
      CurrencyId: {
        _enum: ['ACA', 'AUSD', 'DOT', 'XBTC', 'LDOT', 'RENBTC']
      }
    }
  },
  {
    minmax: [500, 599] as any,
    types: {
      RefCount: 'RefCountTo259',
      CurrencyId: {
        _enum: ['ACA', 'AUSD', 'DOT', 'XBTC', 'LDOT', 'RENBTC']
      }
    }
  },
  {
    minmax: [600, undefined] as any,
    types: {}
  }
];

export default typesBundleTypes;
