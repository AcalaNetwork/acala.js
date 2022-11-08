import { AnyApi, FixedPointNumber, Token } from '@acala-network/sdk-core';
import { Wallet } from '@acala-network/sdk';
import { SubmittableExtrinsic } from '@polkadot/api/types';
import { Observable } from 'rxjs';

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
export type TradingPathItem = [DexSource, Token[]];
export type CompositeTradingPath = TradingPathItem[];

/**
 * define the trading pair struct, tokens in trading pair should sorted
 */
export type TradingPair = [Token, Token];

// the way of trade
export type TradeMode = 'EXACT_INPUT' | 'EXACT_OUTPUT';

// the swap of trade
export type SwapSource = DexSource | 'aggregate';

export interface SwapResult {
  source: SwapSource;
  mode: TradeMode;
  path: CompositeTradingPath;
  // actual input token and amount, no matter which trade mode is
  input: {
    token: Token;
    amount: FixedPointNumber;
  };
  // actual output token and amount, no matter which trade mode is
  output: {
    token: Token;
    amount: FixedPointNumber;
  };
  midPrice: FixedPointNumber;
  // get price impact
  priceImpact: FixedPointNumber;
  // get price impact which subtract exchange fee
  naturalPriceImpact: FixedPointNumber;
  exchangeFee: FixedPointNumber;
  exchangeFeeRate: FixedPointNumber;
  acceptiveSlippage?: number;
  call?: SubmittableExtrinsic<'rxjs'> | SubmittableExtrinsic<'promise'>;
  callParams?: any[];
}

export interface SwapParams {
  source: SwapSource;
  mode: TradeMode;
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
  filterPath(path: TradingPathItem): boolean;
  swap(params: SwapParamsWithExactPath): Observable<SwapResult>;
  getAggregateTradingPath(result: SwapResult): any;
  getTradingTx(
    result: SwapResult,
    overwrite?: OverwriteCallParams
  ): SubmittableExtrinsic<'promise'> | SubmittableExtrinsic<'rxjs'>;
}

export interface AggregateDexConfigs {
  api: AnyApi;
  wallet: Wallet;
  providers: BaseSwap[];
  overwrite?: {
    aggregateLimit: number;
  };
}

export interface AggregateDexSwapResult {
  error?: Error;
  result: SwapResult;
  tracker: SwapResult[];
}

export interface OverwriteCallParams {
  input?: FixedPointNumber;
  output?: FixedPointNumber;
}
