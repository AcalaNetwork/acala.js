import { forceToCurrencyName } from '@acala-network/sdk-core';
import { CrossChainSelectorParams } from './types';

export class InvalidCrossChainSelectorParams extends Error {
  constructor(params: CrossChainSelectorParams) {
    super();

    this.message = `Invalid CrossChain Selector Params, ${params?.from?.name ?? ''}, ${params?.to?.name ?? ''}, ${
      params.token ? forceToCurrencyName(params.token) : ''
    }`;
    this.name = 'InvalidCrossChainSelectorParams';
  }
}
