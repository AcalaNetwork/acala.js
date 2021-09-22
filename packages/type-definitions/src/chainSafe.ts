export const chainBridge = {
  rpc: {},
  types: {
    DepositNonce: 'u64',
    ResourceId: '[u8; 32]',
    ChainBridgeChainId: 'u8'
  },
  typesAlias: {
    chainBridge: {
      ChainId: 'ChainBridgeChainId'
    }
  }
};

export const chainSafeTransfer = {
  rpc: {},
  types: {}
};
