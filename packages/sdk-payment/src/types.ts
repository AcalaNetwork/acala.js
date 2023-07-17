import { Wallet } from "@acala-network/sdk";
import { AnyApi } from "@acala-network/sdk-core";
import { AggregateDex } from "@acala-network/sdk-swap";

export interface PaymentConfig {
  wallet: Wallet;
  dex: AggregateDex;
  api: AnyApi;
}