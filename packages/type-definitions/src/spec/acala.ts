import type { OverrideVersionedType } from '@polkadot/types/types';

const sharedTypes = {
  CompactAssignments: 'CompactAssignmentsWith16',
  DispatchErrorModule: 'DispatchErrorModuleU8',
  RawSolution: 'RawSolutionWith16',
  Keys: 'SessionKeys1',
  Weight: 'WeightV1'
};

const xcmV0 = {
  MultiLocation: 'MultiLocationV0',
  MultiAsset: 'MultiAssetV0',
  Xcm: 'XcmV0',
  XcmOrder: 'XcmOrderV0',
  XcmError: 'XcmErrorV0',
  Response: 'ResponseV0'
};

const xcmV1 = {
  MultiLocation: 'MultiLocationV1',
  MultiAsset: 'MultiAssetV1',
  Xcm: 'XcmV1',
  XcmOrder: 'XcmOrderV1',
  XcmError: 'XcmErrorV1',
  Response: 'ResponseV1'
};

const addressV0 = {
  Address: 'LookupSource',
  LookupSource: 'IndicesLookupSource'
};

const addressV1 = {
  Address: 'GenericMultiAddress',
  LookupSource: 'GenericMultiAddress'
};

const currencyV0 = {
  CurrencyId: {
    _enum: {
      Token: 'TokenSymbol',
      DEXShare: '(TokenSymbol, TokenSymbol)',
      ERC20: 'EvmAddress'
    }
  }
};

const poolIdV0 = {
  PoolId: {
    _enum: {
      Loans: 'CurrencyId',
      DexIncentive: 'CurrencyId',
      DexSaving: 'CurrencyId',
      Homa: 'Null'
    }
  }
};

const poolIdV1 = {
  PoolId: {
    _enum: {
      LoansIncentive: 'CurrencyId',
      DexIncentive: 'CurrencyId',
      HomaIncentive: 'Null',
      DexSaving: 'CurrencyId',
      HomaValidatorAllowance: 'AccountId'
    }
  },
  // for orml-reward types
  PoolInfo: {
    totalShares: 'Compact<Share>',
    totalRewards: 'Compact<Balance>',
    totalWithdrawnRewards: 'Compact<Balance>'
  }
};

const versioned: OverrideVersionedType[] = [
  {
    minmax: [600, 699],
    types: {
      ...sharedTypes,
      ...xcmV0,
      ...poolIdV0,
      ...addressV0,
      TokenSymbol: {
        _enum: ['ACA', 'AUSD', 'DOT', 'XBTC', 'LDOT', 'RENBTC']
      }
    }
  },
  {
    minmax: [700, 719],
    types: {
      ...sharedTypes,
      ...xcmV0,
      ...poolIdV0,
      ...addressV1,
      TokenSymbol: {
        _enum: ['ACA', 'AUSD', 'DOT', 'XBTC', 'LDOT', 'RENBTC']
      }
    }
  },
  {
    minmax: [720, 722],
    types: {
      ...sharedTypes,
      ...addressV1,
      ...xcmV0,
      ...poolIdV0,
      ...currencyV0,
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
      }
    }
  },
  {
    minmax: [723, 729],
    types: {
      ...sharedTypes,
      ...addressV1,
      ...xcmV0,
      ...poolIdV1,
      ...currencyV0,
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
      }
    }
  },
  {
    minmax: [730, 1007],
    types: {
      ...sharedTypes,
      ...addressV1,
      ...xcmV0,
      ...poolIdV1,
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
      ...sharedTypes,
      ...addressV1,
      ...xcmV0,
      ...poolIdV1,
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
  },
  {
    minmax: [1008, 1009],
    types: {
      ...sharedTypes,
      ...addressV1,
      ...xcmV0,
      ...poolIdV1
    }
  },
  {
    minmax: [1010, 1013],
    types: {
      ...sharedTypes,
      ...addressV1,
      ...xcmV0
    }
  },
  {
    minmax: [1014, 1018],
    types: {
      ...sharedTypes,
      ...addressV1,
      ...xcmV1
    }
  },
  {
    minmax: [1019, undefined],
    types: {
      ...addressV1
    }
  }
];

export default versioned;
