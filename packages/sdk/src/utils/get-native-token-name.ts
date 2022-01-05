import { AnyApi } from '@acala-network/sdk-core';

export function getNativeTokenName(api: AnyApi): string {
  return api.registry.chainTokens[0].toString();
}
