export default {
  rpc: {
    call: {
      description: 'eth call',
      params: [
        {
          name: 'data',
          type: 'CallRequest'
        },
        {
          name: 'at',
          type: 'BlockHash',
          isHistoric: true,
          isOptional: true
        }
      ],
      type: 'Raw'
    },
    estimateGas: {
      description: 'eth estimateGas',
      params: [
        {
          name: 'data',
          type: 'CallRequest'
        },
        {
          name: 'at',
          type: 'BlockHash',
          isHistoric: true,
          isOptional: true
        }
      ],
      type: 'u128'
    }
  },
  typesAlias: {
    evm: {
      AccountInfo: 'EvmAccountInfo',
      ContractInfo: 'EvmContractInfo'
    }
  },
  types: {
    EvmAccountInfo: {
      nonce: 'Index',
      contractInfo: 'Option<EvmContractInfo>',
      developerDeposit: 'Option<Balance>'
    },
    CodeInfo: {
      codeSize: 'u32',
      refCount: 'u32'
    },
    EvmContractInfo: {
      codeHash: 'H256',
      maintainer: 'H160',
      deployed: 'bool'
    },
    EvmAddress: 'H160',
    CallRequest: {
      from: 'Option<H160>',
      to: 'Option<H160>',
      gasLimit: 'Option<u32>',
      storageLimit: 'Option<u32>',
      value: 'Option<U128>',
      data: 'Option<Bytes>'
    }
  }
};
