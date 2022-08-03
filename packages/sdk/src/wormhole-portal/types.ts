import { BigNumber } from 'ethers';
import { BaseProvider } from '@acala-network/eth-providers';
import { ChainId, SupportChain } from './consts';

export interface WormholePortalConfigs {
  ethProviders: {
    acala: BaseProvider;
    karura: BaseProvider;
  };
  // overwrite default router configs if need
  routers?: WormholeRouter[];
  // support tokens
  supportTokens?: WormholeToken[];
}

export interface WormholeChain {
  id: ChainId;
  name: string;
}

// please update when add new token
export type SupportToken = 'aUSD' | 'waUSD';

export interface WormholeToken {
  symbol: SupportToken;
  chain: SupportChain;
  address: string;
  decimals: number;
  bridgeAddress: string;
}

export interface WormholeRouter {
  from: SupportChain;
  to: SupportChain;
  token: SupportToken;
}

export interface TransferParams {
  token: SupportToken;
  // from chain
  fromChain: SupportChain;
  // to chain
  toChain: SupportChain;
  // from address
  fromAddress: string;
  // to address
  toAddress: string;
  // transfer amount
  amount: BigNumber;
}

export interface RedeemParams {
  token: SupportToken;
  // from chain
  fromChain: SupportChain;
  // to chain
  toChain: SupportChain;
  // the transaction hash sended token in from chain
  txHash: string;
  // receive address
  toAddress: string;
}

export interface ConvertParams {
  from: SupportToken;
  to: SupportToken;
  address: string;
  amount: 'all' | BigNumber;
}
