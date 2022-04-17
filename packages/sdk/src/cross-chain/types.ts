import { FixedPointNumber } from '@acala-network/sdk-core';
import { TokenBalance } from '../types';
import { BaseCrossChainAdapter } from './base-chain-adapter';
import { RegisteredChain } from './configs/chains';

export type CROSS_CHAIN_ENV = 'kusama' | 'polkadot';

export interface Chain {
  readonly id: RegisteredChain;
  readonly display: string;
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
  amount: FixedPointNumber;
  to: RegisteredChain;
  token: string;
  address: string;
}

export interface CrossChainInputConfigs {
  minInput: FixedPointNumber;
  maxInput: FixedPointNumber;
  destCrossChainFee: TokenBalance;
  ss58Prefix: number;
  tokenDecimals: number;
}

export interface CrossChainSDKConfigs {
  adapters: BaseCrossChainAdapter[];
}
