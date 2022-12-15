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
    estimateResources: {
      description: 'eth estimateResources',
      params: [
        {
          name: 'from',
          type: 'H160'
        },
        {
          name: 'unsignedExtrinsic',
          type: 'Bytes'
        },
        {
          name: 'at',
          type: 'BlockHash',
          isHistoric: true,
          isOptional: true
        }
      ],
      type: 'EstimateResourcesResponse'
    }
  },
  typesAlias: {
    evm: {
      AccountInfo: 'EvmAccountInfo',
      ContractInfo: 'EvmContractInfo'
    }
  },
  types: {
    Erc20Info: {
      address: 'EvmAddress',
      name: 'Vec<u8>',
      symbol: 'Vec<u8>',
      decimals: 'u8'
    },
    EstimateResourcesResponse: {
      /// Used gas
      gas: 'u256',
      /// Used storage
      storage: 'i32',
      /// Adjusted weight fee
      weightFee: 'u256'
    },
    EvmAccountInfo: {
      nonce: 'Index',
      contractInfo: 'Option<EvmContractInfo>'
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
    },
    CallInfo: {
      exit_reason: 'EvmCoreErrorExitReason',
      value: 'Vec<u8>',
      used_gas: 'U256',
      used_storage: 'i32',
      logs: 'Vec<EthereumLog>'
    },
    CreateInfo: {
      exit_reason: 'EvmCoreErrorExitReason',
      value: 'H160',
      used_gas: 'U256',
      used_storage: 'i32',
      logs: 'Vec<EthereumLog>'
    },
    /**
     * Lookup171: ethereum::log::Log
     **/
    EthereumLog: {
      address: 'H160',
      topics: 'Vec<H256>',
      data: 'Bytes'
    },
    /**
     * Lookup174: evm_core::error::ExitReason
     **/
    EvmCoreErrorExitReason: {
      _enum: {
        Succeed: 'EvmCoreErrorExitSucceed',
        Error: 'EvmCoreErrorExitError',
        Revert: 'EvmCoreErrorExitRevert',
        Fatal: 'EvmCoreErrorExitFatal'
      }
    },
    /**
     * Lookup175: evm_core::error::ExitSucceed
     **/
    EvmCoreErrorExitSucceed: {
      _enum: ['Stopped', 'Returned', 'Suicided']
    },
    /**
     * Lookup176: evm_core::error::ExitError
     **/
    EvmCoreErrorExitError: {
      _enum: {
        StackUnderflow: 'Null',
        StackOverflow: 'Null',
        InvalidJump: 'Null',
        InvalidRange: 'Null',
        DesignatedInvalid: 'Null',
        CallTooDeep: 'Null',
        CreateCollision: 'Null',
        CreateContractLimit: 'Null',
        OutOfOffset: 'Null',
        OutOfGas: 'Null',
        OutOfFund: 'Null',
        PCUnderflow: 'Null',
        CreateEmpty: 'Null',
        Other: 'Text',
        InvalidCode: 'Null'
      }
    },
    /**
     * Lookup179: evm_core::error::ExitRevert
     **/
    EvmCoreErrorExitRevert: {
      _enum: ['Reverted']
    },
    /**
     * Lookup180: evm_core::error::ExitFatal
     **/
    EvmCoreErrorExitFatal: {
      _enum: {
        NotSupported: 'Null',
        UnhandledInterrupt: 'Null',
        CallErrorAsFatal: 'EvmCoreErrorExitError',
        Other: 'Text'
      }
    }
  }
};
