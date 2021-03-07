/* eslint-disable @typescript-eslint/no-unsafe-assignment */
const typesBundleTypes = [
  {
    minmax: [600, 699] as any,
    types: {
      Address: 'LookupSource',
      LookupSource: 'IndicesLookupSource',
      TokenSymbol: {
        _enum: ['ACA', 'AUSD', 'DOT', 'XBTC', 'LDOT', 'RENBTC']
      }
    }
  },
  {
    minmax: [700, 719] as any,
    types: {
      Address: 'GenericMultiAddress',
      LookupSource: 'GenericMultiAddress',
      TokenSymbol: {
        _enum: ['ACA', 'AUSD', 'DOT', 'XBTC', 'LDOT', 'RENBTC']
      }
    }
  },
  {
    minmax: [720, undefined] as any,
    types: {
      Address: 'GenericMultiAddress',
      LookupSource: 'GenericMultiAddress'
    }
  }
];

export default typesBundleTypes;
