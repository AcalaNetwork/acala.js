import { BaseProvider, TXReceipt } from '@acala-network/eth-providers';

export async function getTxReceiptWithRetry(
  provider: BaseProvider,
  hash: string,
  retryTimeout = 1000,
  retryAttempts = 200
) {
  let attempts = 0;
  let result: TXReceipt | null = null;

  while (!result) {
    attempts++;
    await new Promise((resolve) => setTimeout(resolve, retryTimeout));
    try {
      result = await provider.getReceiptByHash(hash);
    } catch (e) {
      if (retryAttempts !== undefined && attempts > retryAttempts) {
        throw e;
      }
    }
  }

  return result;
}
