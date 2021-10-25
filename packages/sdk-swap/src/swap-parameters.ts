import { Token, FixedPointNumber, TokenBalance } from '@acala-network/sdk-core';

import { SwapResult, SwapTradeMode } from './types';

export class SwapParameters implements SwapResult {
  public mode: SwapTradeMode;
  public midPrice: FixedPointNumber;
  public priceImpact: FixedPointNumber;
  public naturalPriceImpact: FixedPointNumber;
  public path: Token[];
  public input: TokenBalance;
  public output: TokenBalance;
  public exchangeFee: FixedPointNumber;
  public exchangeRate: FixedPointNumber;

  constructor(mode: SwapTradeMode, config: SwapResult) {
    this.mode = mode;
    this.midPrice = config.midPrice;
    this.priceImpact = config.priceImpact;
    this.naturalPriceImpact = config.naturalPriceImpact;
    this.path = config.path;
    this.input = config.input;
    this.output = config.output;
    this.exchangeFee = config.exchangeFee;
    this.exchangeRate = config.exchangeRate;
  }

  public toChainData(): [{ Token: string }[], string, string] {
    switch (this.mode) {
      case 'EXACT_INPUT': {
        return [
          this.path.map((item) => item.toChainData()) as { Token: string }[],
          this.input.balance.toChainData(),
          this.output.balance.toChainData()
        ];
      }
      case 'EXACT_OUTPUT': {
        return [
          this.path.map((item) => item.toChainData()) as { Token: string }[],
          this.output.balance.toChainData(),
          this.input.balance.toChainData()
        ];
      }
    }
  }
}
