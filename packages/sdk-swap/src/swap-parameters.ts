import { Token, FixedPointNumber, TokenBalance } from '@acala-network/sdk-core';

import { SwapTradeMode } from './help';

interface Config {
  input: TokenBalance;
  output: TokenBalance;
  path: Token[];
  priceImpact: FixedPointNumber;
  midPrice: FixedPointNumber;
  mode: SwapTradeMode;
}

export class SwapParameters {
  public input: TokenBalance;
  public output: TokenBalance;
  public path: Token[];
  public priceImpact: FixedPointNumber;
  public midPrice: FixedPointNumber;
  public mode: SwapTradeMode;

  constructor(config: Config) {
    this.input = config.input;
    this.output = config.output;
    this.path = config.path;
    this.priceImpact = config.priceImpact;
    this.midPrice = config.midPrice;
    this.mode = config.mode;
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
