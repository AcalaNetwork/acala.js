export default {
  rpc: {},
  types: {
    CID: 'Vec<u8>',
    ClassId: 'u64',
    TokenId: 'u64',
    ClassInfoOf: {
      metadata: 'CID',
      totalIssuance: 'TokenId',
      owner: 'AccountId',
      data: 'ClassData'
    },
    TokenInfoOf: {
      metadata: 'CID',
      owner: 'AccountId',
      data: 'TokenData'
    },
    ClassData: {
      deposit: 'Balance',
      properties: 'Properties'
    },
    TokenData: {
      deposit: 'Balance'
    },
    Properties: {
      _set: {
        _bitLength: 8,
        Transferable: 0b00000001,
        Burnable: 0b00000010
      }
    }
  }
};
