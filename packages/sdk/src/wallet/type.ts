import { FixedPointNumber as FN, Token } from '@acala-network/sdk-core';
import { PriceProviderType } from './price-provider/types';
import { ChainType } from '../types';

export type TokenRecord = Record<string, Token>;

export interface WalletConsts {
  readonly runtimeChain: string;
  readonly nativeCurrency: string;
}

export interface BalanceData {
  token: Token;
  free: FN;
  locked: FN;
  reserved: FN;
  available: FN;
}

export interface TransferConfig {
  ed: FN;
}

export interface PresetTokens {
  nativeToken: Token;
  stableToken?: Token;
  liquidToken?: Token;
  stakingToken?: Token;
}

export type TokenPriceFetchSource = {
  [c in ChainType]: {
    [t in string]: PriceProviderType;
  };
};
