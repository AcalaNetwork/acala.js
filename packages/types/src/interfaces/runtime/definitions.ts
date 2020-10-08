import definitions from '@polkadot/types/interfaces/runtime/definitions';
import { Definitions } from '@polkadot/types/types';
import runtime from '@acala-network/type-definitions/runtime';

export default {
  rpc: {},
  types: {
    ...definitions.types,
    ...runtime.types,
    DestAddress: '[u8; 20]',
    AsOriginId: {
      _enum: ['Root', 'AcalaTreasury', 'HonzonTreasury', 'HomaTreasury', 'DSWF']
    },
    //@TODO https://github.com/polkadot-js/api/issues/2691
    PalletsOrigin: 'Bytes'
  }
} as Definitions;
