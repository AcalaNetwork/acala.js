import type { OverrideVersionedType } from '@polkadot/types/types';

const versioned: OverrideVersionedType[] = [
  {
    minmax: [600, 699],
    types: {
      Address: 'LookupSource',
      LookupSource: 'IndicesLookupSource',
      TokenSymbol: {
        _enum: ['ACA', 'AUSD', 'DOT', 'XBTC', 'LDOT', 'RENBTC']
      }
    }
  },
  {
    minmax: [700, 719],
    types: {
      Address: 'GenericMultiAddress',
      LookupSource: 'GenericMultiAddress',
      TokenSymbol: {
        _enum: ['ACA', 'AUSD', 'DOT', 'XBTC', 'LDOT', 'RENBTC']
      }
    }
  },
  {
    minmax: [719, 729],
    types: {
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
          SDN: 135,
          KILT: 138
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
    minmax: [720, undefined],
    types: {
      Address: 'GenericMultiAddress',
      LookupSource: 'GenericMultiAddress'
    }
  },
  {
    minmax: [600, 722],
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

export default versioned;
