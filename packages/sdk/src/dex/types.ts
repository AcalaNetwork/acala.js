import { AnyApi, FixedPointNumber, Token } from '@acala-network/sdk-core';
import { Observable } from 'rxjs';
import { Wallet } from '../wallet';

export type DexSource = 'acala' | 'nuts';

/**
 * define the trading path for dex swap
 * eg: the struct below define (AUSD -> DOT)(acala) -> (DOT -> LDOT)(nuts) -> (LDOT -> lcDOT)(acala)
 * [
 *    ["acala", ["AUSD", "DOT"]],
 *    ["nuts", ["DOT", "LDOT"]],
 *    ["acala", ["LDOT", "lcDOT://13"]]
 * ]
 */
export type TradingPath = [DexSource, Token[]][];

/**
 * define the trading pair struct, tokens in trading pair should sorted
 */
export type TradingPair = [Token, Token];

// the way of trade
export type TradeType = 'EXACT_INPUT' | 'EXACT_OUTPUT';

// the swap of trade
export type SwapSource = 'acala' | 'nuts' | 'aggregate';

export interface SwapResult {
  source: SwapSource;
  type: TradeType;
  path: TradingPath;
  // actual input token and amount, no matter which trade type is
  input: {
    token: Token;
    amount: FixedPointNumber;
  };
  // actual output token and amount, no matter which trade type is
  output: {
    token: Token;
    amount: FixedPointNumber;
  };
  // get average price through trading
  midPrice: FixedPointNumber;
  // get price impact
  priceImpact: FixedPointNumber;
  // get price impact which subtract exchange fee
  naturalPriceImpact: FixedPointNumber;
  // exchange fee
  exchangeFee: FixedPointNumber;
  // exchange fee rate
  exchangeFeeRate: FixedPointNumber;
}

export interface SwapParams {
  source: SwapSource;
  type: TradeType;
  // input amount
  input: FixedPointNumber;
  // acceptive slippage
  acceptiveSlippage?: number;
}

export interface SwapParamsWithExactPath extends SwapParams {
  path: Token[];
}

export interface AggregateDexSwapParams extends SwapParams {
  path: [Token, Token];
}

export interface BaseSwap {
  get source(): DexSource;
  get tradingPairs$(): Observable<TradingPair[]>;
  swap(params: SwapParamsWithExactPath): Observable<SwapResult>;
}

export interface AggregateDexConfigs {
  api: AnyApi;
  wallet: Wallet;
  providers: BaseSwap[];
}
