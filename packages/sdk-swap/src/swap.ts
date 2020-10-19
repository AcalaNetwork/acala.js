import { ApiRx } from '@polkadot/api';
import { combineLatest } from 'rxjs';
import { assert } from '@polkadot/util';
import { Token, sortTokens } from '@acala-network/sdk-core/token';
import { FixedPointNumber } from '@acala-network/sdk-core/fixed-point-number';
import { SWAP_DEFAULT_TRADE_TOKENS } from './consts';

type SwapTradeMode = 'EXACT_INPUT' | 'EXACT_OUTPUT';

interface SwapTradeConfig {
  input: Token;
  output: Token;
  mode: SwapTradeMode;
  maxTradePathLength: number;
}

export class SwapTrade {
  private api!: ApiRx;
  private input!: Token; // input token and token amount
  private output!: Token; // out token and token amount
  private mode!: SwapTradeMode; // trade mode
  private inputAmount!: FixedPointNumber;
  private outputAmount!: FixedPointNumber;
  private paths!: Token[]; // trade path
  private liquidityProviderFee!: Token; // trade fee for liquidity provider
  private priceImpact!: FixedPointNumber; // trade price impact
  private maxTradePathLength!: number; // the max length for the trade path

  constructor (api: ApiRx, config: SwapTradeConfig) {
    this.api = api;

    this.input = config.input;
    this.output = config.output;
    this.mode = config.mode;
    this.maxTradePathLength = config.maxTradePathLength;
  }

  private getAvailableTokenPair () {
    return [
      ...SWAP_DEFAULT_TRADE_TOKENS.map((token) => [token, this.input]),
      ...SWAP_DEFAULT_TRADE_TOKENS.map((token) => [token, this.output])
    ].map(i => sortTokens(i[0], i[1]));
  }

  getPaths (tokenPairs: [Token, Token][]) {
    this.getAvailableTokenPair().map
  }

  setInputAmount (amount: TokenAmount) {
    // ensure that mode is EXACT_INTPU
    assert(this.mode === 'EXACT_INPUT', 'when the mode is EXACT_OUTPUT, you should use setOutputAmount');

  }

  setOutputAmount (amount: TokenAmount) {
    // ensure that mode is EXACT_INTPU
    assert(this.mode === 'EXACT_OUTPUT', 'when the mode is EXACT_INPUT, you should use setInputAmount');
  }
}
