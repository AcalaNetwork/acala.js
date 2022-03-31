import { AnyApi } from '@acala-network/sdk-core';
import { BaseCrossChainAdapter } from '../base-chain-adapter';
import { chains } from '../configs/chains';

interface KusamaAdapterConfigs {
  api: AnyApi;
}

export class KusamaAdapter extends BaseCrossChainAdapter {
  constructor(configs: KusamaAdapter) {
    super(configs.api, chains.kusama, [{ to: chains.karura, token: 'KSM' }]);
  }
}
