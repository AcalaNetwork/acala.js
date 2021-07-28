export default {
  rpc: {},
  types: {
    CID: 'Vec<u8>',
    Attributes: 'BTreeMap<Vec<u8>, Vec<u8>>',
    TokenInfoOf: {
      metadata: 'CID',
      owner: 'AccountId',
      data: 'TokenData'
    },
    Properties: {
      _set: {
        _bitLength: 8,
        Transferable: 0b00000001,
        Burnable: 0b00000010,
        Mintable: 0b00000100,
        ClassPropertiesMutable: 0b00001000
      }
    },
    ClassData: {
      deposit: 'Balance',
      properties: 'Properties',
      attributes: 'Attributes'
    },
    TokenData: {
      deposit: 'Balance',
      attributes: 'Attributes'
    },
    TokenId: 'u64',
    TokenIdOf: 'TokenId',
    NFTClassId: 'u32',
    ClassIdOf: 'ClassId',
    NFTBalance: 'u128',
    NFTBalanceOf: 'NFTBalance',
    ClassInfoOf: {
      metadata: 'CID',
      totalIssuance: 'TokenId',
      owner: 'AccountId',
      data: 'ClassData'
    }
  },
  typesAligns: {
    nft: {
      ClassId: 'NFTClassId',
      BalanceOf: 'NFTBalanceOf'
    }
  }
};
