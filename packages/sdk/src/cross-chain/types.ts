import { FixedPointNumber, Token } from '@acala-network/sdk-core';
import { ApiTypes, SubmittableExtrinsic } from '@polkadot/api/types';
import { Observable } from 'rxjs';
import { BalanceData } from '../wallet/type';
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
  token: Token | string;
}

export interface CrossChainTransferParams {
  to: Chain;
  token: Token;
  address: string;
}

export interface CrossChainTransferEnv {
  token: Token;
  minInput: FixedPointNumber;
  maxInput: FixedPointNumber;
}

export interface CrossChainAdapter<T extends ApiTypes> {
  readonly chain: Chain;
  readonly routers: Omit<CrossChainRouter, 'from'>[];
  // subscribeEnv: (params: CrossChainTransferParams) => Observable<CrossChainTransferEnv>;
  // createTx: (token: Token, dest: Chain, amount: FixedPointNumber) => SubmittableExtrinsic<T>;
  // subscribeBalance: (token: Token) => Observable<BalanceData>;
}
