export type CROSS_CHAIN_ENV = 'kusama' | 'polkadot';

export interface Chain {
  readonly name: string;
  // set id to -1 if the chain is para chain
  readonly paraChainId: number;
  // use parachain cross-chain call if the chain is parachain
  readonly isParaChain: boolean;
}

export interface CrossChainTokenConfig {
  // cross chain token
  readonly token: string;
  // from chain config
  readonly fromChain: Chain;
  // destiantion chain
  readonly toChain: Chain;
  // the weight for cross-chain tx
  readonly destWeight: number;
  // distiantion fee which charged by destiantion chain
  readonly destFee: number;
  // the existential deposit configed by destiantion chain
  readonly destEd: number;
}

export interface CrossChainSelectorParams {
  from?: Chain;
  to?: Chain;
  token?: string;
}

export interface CrossChainSelected extends CrossChainSelectorParams {
  // all available options determined by selected properties
  fromChains: Chain[];
  toChains: Chain[];
  tokens: string[];
}
