import { FixedPointNumber, Token } from '@acala-network/sdk-core';
import { BaseCrossChainAdapter } from './base-chain-adapter';
import { RegisteredChain } from './configs/chains';

export type CROSS_CHAIN_ENV = 'kusama' | 'polkadot';

export interface Chain {
  readonly name: RegisteredChain;
  // chain icon resource path
  readonly icon: string;
  // set id to -1 if the chain is para chain
  readonly paraChainId: number;
  // use parachain cross-chain call if the chain is parachain
  readonly isParaChain: boolean;
}

export interface CrossChainRouter {
  from: Chain;
  to: Chain;
  token: string;
}

export interface CrossChainTransferParams {
  amount: number;
  to: RegisteredChain;
  token: string;
  address: string;
}

export interface CrossChainTransferEnv {
  minInput: FixedPointNumber;
  maxInput: FixedPointNumber;
}

export interface CrossChainSDKConfigs {
  adapters: BaseCrossChainAdapter[];
}
