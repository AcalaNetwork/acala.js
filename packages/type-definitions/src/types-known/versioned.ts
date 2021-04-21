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
    minmax: [720, 729] as any,
    types: {
      Address: 'GenericMultiAddress',
      LookupSource: 'GenericMultiAddress',
      TokenSymbol: {
        _enum: {
          ACA: 0,
          AUSD: 1,
          DOT: 2,
          LDOT: 3,
          XBTC: 4,
          RENBTC: 5,
          POLKABTC: 6,
          PLM: 7,
          PHA: 8,
          HDT: 9,
          BCG: 11,

          KAR: 128,
          KUSD: 129,
          KSM: 130,
          LKSM: 131,
          // Reserve for XBTC = 132
          // Reserve for RENBTC = 133
          // Reserve for POLKABTC = 134
          SDN: 135,
          // Reserve for PHA = 136
          KILT: 138
          // Reserve for BCG = 139
        }
      },
      CurrencyId: {
        _enum: {
          Token: 'TokenSymbol',
          DEXShare: '(TokenSymbol, TokenSymbol)',
          ERC20: 'EvmAddress'
        }
      }
    }
  },
  {
    minmax: [720, undefined] as any,
    types: {
      Address: 'GenericMultiAddress',
      LookupSource: 'GenericMultiAddress'
    }
  },
  {
    minmax: [600, 722] as any,
    types: {
      PoolId: {
        _enum: {
          Loans: 'CurrencyId',
          DexIncentive: 'CurrencyId',
          DexSaving: 'CurrencyId',
          Homa: 'Null'
        }
      }
    }
  }
];

export default typesBundleTypes;
