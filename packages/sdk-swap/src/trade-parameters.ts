import { Token, FixedPointNumber } from '@acala-network/sdk-core';

import { SwapTradeMode } from './help';

interface Config {
  input: Token;
  output: Token;
  path: Token[];
  priceImpact: FixedPointNumber;
  midPrice: FixedPointNumber;
}

export class TradeParameters {
  public input: Token;
  public output: Token;
  public path: Token[];
  public priceImpact: FixedPointNumber;
  public midPrice: FixedPointNumber;

  constructor(config: Config) {
    this.input = config.input;
    this.output = config.output;
    this.path = config.path;
    this.priceImpact = config.priceImpact;
    this.midPrice = config.midPrice;
  }

  public toChainData(mode: SwapTradeMode): [{ Token: string }[], string, string] {
    switch (mode) {
      case 'EXACT_INPUT': {
        return [
          this.path.map((item) => item.toChainData()) as { Token: string }[],
          this.input.amount.toChainData(),
          this.output.amount.toChainData()
        ];
      }
      case 'EXACT_OUTPUT': {
        return [
          this.path.map((item) => item.toChainData()) as { Token: string }[],
          this.output.amount.toChainData(),
          this.input.amount.toChainData()
        ];
      }
    }
  }
}
