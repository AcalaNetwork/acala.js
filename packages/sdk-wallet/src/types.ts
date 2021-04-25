import { Token, DexShare } from '@acala-network/sdk-core';
import { AnyApi, ObOrPromiseResult } from '@acala-network/sdk-core/type';
import { CurrencyId } from '@acala-network/types/interfaces';
import { AccountId, MultiAddress } from '@polkadot/types/interfaces';

export interface SendOptions {
  address: string | AccountId | MultiAddress;
  amount?: number;
  rowAmount?: number | string;
  currency: CurrencyId | Token | DexShare;
}

export interface Sender<T extends AnyApi> {
  check: () => ObOrPromiseResult<T, boolean>;
  send: () => ObOrPromiseResult<T, boolean>;
  checkAndSend: () => ObOrPromiseResult<T, boolean>;
}
