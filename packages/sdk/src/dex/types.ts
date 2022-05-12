import { AnyApi, Token } from '@acala-network/sdk-core';
import { Observable } from 'rxjs';
import { Wallet } from '../wallet';

export type DexSource = 'acala' | 'nuts';

/**
 * define the trading path for dex swap
 * eg: the struct below define (AUSD -> DOT)(acala) -> (DOT -> LDOT)(nuts) -> (LDOT -> lcDOT)(acala)
 * [
 *    ["acala", "AUSD", "DOT"],
 *    ["nuts", "DOT", "LDOT"],
 *    ["acala", "LDOT", "lcDOT://13"]
 * ]
 */
export type TradingPath = [DexSource, Token[]][];

/**
 * define the trading pair struct, tokens in trading pair should sorted
 */
export type TradingPair = [Token, Token];

export interface BaseSwap {
  get source(): DexSource;
  get tradingPairs$(): Observable<TradingPair[]>;
}

export interface AggregateDexConfigs {
  api: AnyApi;
  wallet: Wallet;
  providers: BaseSwap[];
}

export type TradeType = 'EXACT_INPUT' | 'EXACT_OUTPUT';

export type SwapType = 'acala' | 'nuts' | 'aggregate';

export interface SwapParams {
  type: SwapType;
  tradeType: TradeType;
  input: Token;
  output: Token;
  slippage?: number;
}
