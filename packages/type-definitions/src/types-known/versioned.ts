/* eslint-disable @typescript-eslint/no-unsafe-assignment */
const typesBundleTypes = [
  {
    minmax: [600, 699] as any,
    types: {
      Address: 'LookupSource',
      LookupSource: 'IndicesLookupSource'
    }
  },
  {
    minmax: [700, undefined] as any,
    types: {
      Address: 'GenericMultiAddress',
      LookupSource: 'GenericMultiAddress'
    }
  }
];

export default typesBundleTypes;
