const typesBundle = {
  spec: {
    acala: {
      types: [
        {
          minmax: [0, 499] as any,
          types: {
            Weight: 'u32',
            CurrencyId: {
              _enum: ['ACA', 'AUSD', 'DOT', 'XBTC', 'LDOT', 'RENBTC']
            }
          }
        },
        {
          minmax: [500, 599] as any,
          types: {
            CurrencyId: {
              _enum: ['ACA', 'AUSD', 'DOT', 'XBTC', 'LDOT', 'RENBTC']
            }
          }
        }
      ]
    }
  }
};

export default typesBundle;
