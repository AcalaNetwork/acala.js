import type { OverrideVersionedType } from '@polkadot/types/types';

const typesBundleTypes: OverrideVersionedType[] = [
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
    minmax: [720, undefined],
    types: {
      Address: 'GenericMultiAddress',
      LookupSource: 'GenericMultiAddress',
      AssetInstance: 'AssetInstanceV0',
      MultiAsset: 'MultiAssetV0',
      Xcm: 'XcmV0',
      XcmOrder: 'XcmOrderV0'
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
    minmax: [730, 1007],
    types: {
      TokenSymbol: {
        _enum: {
          ACA: 0,
          AUSD: 1,
          DOT: 2,
          LDOT: 3,
          RENBTC: 4,

          KAR: 128,
          KUSD: 129,
          KSM: 130,
          LKSM: 131,
          // Reserve for XBTC = 132

          CASH: 140
        }
      }
    }
  },
  {
    minmax: [1008, 1008],
    types: {
      TokenSymbol: {
        _enum: {
          ACA: 0,
          AUSD: 1,
          DOT: 2,
          LDOT: 3,
          RENBTC: 20,
          CASH: 21,
          KAR: 128,
          KUSD: 129,
          KSM: 130,
          LKSM: 131
        }
      }
    }
  }
];

export default typesBundleTypes;
