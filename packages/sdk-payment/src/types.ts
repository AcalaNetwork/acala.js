import { Wallet } from "@acala-network/sdk";
import { AnyApi, Token } from "@acala-network/sdk-core";
import { AggregateDex } from "@acala-network/sdk-swap";
import { SubmittableExtrinsic } from "@polkadot/api/types";

export interface PaymentConfig {
  wallet: Wallet;
  dex: AggregateDex;
  api: AnyApi;
}

/**
 * @name PaymentMethod
 * @description
 * The method of payment
 * 1. use nativeToken
 * 2. use defaultFeeToken
 * 3. by gloablSwapPath
 * 4. by swap
 */
export enum PaymentMethodTypes {
  NATIVE_TOKEN = 'native_token',
  DEFAULT_FEE_TOKEN = 'default_fee_token',
  GLOBAL_SWAP_PATH = 'global_swap_path',
  SWAP= 'swap'
}

export interface PaymentMethod {
  type: PaymentMethodTypes;
  path: Token[];
}

export type Tx= SubmittableExtrinsic<'promise'> | SubmittableExtrinsic<'rxjs'>;
