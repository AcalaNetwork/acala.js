import {
  AnyApi,
  createDexShareName,
  FixedPointNumber,
  forceToCurrencyName,
  Token,
  unzipDexShareName
} from '@acala-network/sdk-core';
import { Wallet } from '@acala-network/sdk/wallet';
import { AcalaPrimitivesTradingPair, ModuleDexTradingPairStatus } from '@acala-network/types/interfaces/types-lookup';
import { SubmittableExtrinsic } from '@polkadot/api/types';
import { StorageKey } from '@polkadot/types';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Storage } from '../../../utils/storage';
import { AmountTooSmall, InsufficientLiquidityError, ParamsNotAcceptableForDexProvider } from '../../errors';
import {
  BaseSwap,
  DexSource,
  SwapParamsWithExactPath,
  SwapResult,
  TradeMode,
  TradingPair,
  CompositeTradingPath,
  TradingPathItem,
  OverwriteCallParams
} from '../../types';
import { ExchangeFee, ExpandPath, ExpandPathWithPositions, MidResult } from './types';
import { calculateExchangeFeeRate, getSupplyAmount, getTargetAmount } from './utils/calculate-helper';

const MINIMUM_AMOUNT = 1;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const createStorages = (api: AnyApi) => {
  return {
    tradingPairs: () =>
      Storage.create<[StorageKey<[AcalaPrimitivesTradingPair]>, ModuleDexTradingPairStatus][]>({
        api: api,
        path: 'query.dex.tradingPairStatuses.entries',
        params: [],
        triggleEvents: [
          { method: 'EnableTradingPair', section: 'dex' },
          { method: 'ProvisioningToEnabled', section: 'dex' },
          { method: 'DisableTradingPair', section: 'dex' }
        ]
      })
  };
};

interface AcalaDexConfigs {
  api: AnyApi;
  wallet: Wallet;
}

export class AcalaDex implements BaseSwap {
  private api: AnyApi;
  private wallet: Wallet;
  private storages: ReturnType<typeof createStorages>;
  private exchangeFee: ExchangeFee;
  public readonly tradingPairs$: Observable<TradingPair[]>;
  readonly configs: {
    tradingPathLimit: number;
  };

  constructor({ api, wallet }: AcalaDexConfigs) {
    this.api = api;
    this.wallet = wallet;
    this.storages = createStorages(api);
    this.exchangeFee = this.getExchangeFee();

    this.tradingPairs$ = this.initTradingPairs$();
    this.configs = {
      tradingPathLimit: Number(this.api.consts.dex.tradingPathLimit.toString())
    };
  }

  private getExchangeFee(): ExchangeFee {
    const fee = this.api.consts.dex.getExchangeFee;

    return {
      denominator: new FixedPointNumber(fee[1].toString()),
      numerator: new FixedPointNumber(fee[0].toString())
    };
  }

  private initTradingPairs$() {
    const storage = this.storages.tradingPairs();

    return storage.observable.pipe(
      map((data) => {
        return data
          .filter(([, value]) => value.isEnabled)
          .map(([key]) => {
            return [this.wallet.__getToken(key.args[0][0]), this.wallet.__getToken(key.args[0][1])] as TradingPair;
          });
      })
    );
  }

  public get source(): DexSource {
    return 'acala';
  }

  public swap(params: SwapParamsWithExactPath): Observable<SwapResult> {
    const { input, path, mode, acceptiveSlippage } = params;

    const expandPath = this.getExpandPath(path);

    // remove decimals
    const inputAmount = FixedPointNumber.fromInner(input.toChainData());

    return this.subscribeExpandPathWithPositions(expandPath).pipe(
      map((expandPath) => {
        const midResult =
          mode === 'EXACT_INPUT'
            ? this.swapWithExactInput(inputAmount, expandPath)
            : this.swapWithExactOutput(inputAmount, expandPath);

        const compositeTradingPath = [[this.source, path]] as [DexSource, Token[]][];

        return this.getSwapResult(compositeTradingPath, mode, midResult, acceptiveSlippage);
      })
    );
  }

  private getExpandPath(path: Token[]): ExpandPath {
    const max = path.length;

    return path.reduce((acc, cur, i) => {
      if (i > max - 2) return acc;

      const output = path[i + 1] as Token;
      const sortedTokenNames = Token.sort(cur, output).map((i) => i.name) as [string, string];
      const dexShareToken = this.wallet.__getToken(createDexShareName(...sortedTokenNames));

      return [
        ...acc,
        {
          dexShareToken,
          input: cur,
          output: output
        }
      ];
    }, [] as ExpandPath);
  }

  private subscribeExpandPathWithPositions(path: ExpandPath): Observable<ExpandPathWithPositions> {
    return combineLatest(path.map((i) => this.wallet.liquidity.subscribePoolPositions(i.dexShareToken))).pipe(
      map((positions) => {
        return path.map((item, i) => {
          const { input, dexShareToken } = item;
          const inputName = forceToCurrencyName(input);
          const poolTokenNames = unzipDexShareName(forceToCurrencyName(dexShareToken));

          const originPosition = positions[i].amounts;

          // sort position
          let position =
            poolTokenNames[0] === inputName
              ? originPosition
              : ([originPosition[1], originPosition[0]] as [FixedPointNumber, FixedPointNumber]);

          // clear position decimals
          position = position.map((item) => {
            return FixedPointNumber.fromInner(item.toChainData());
          }) as [FixedPointNumber, FixedPointNumber];

          return {
            ...item,
            position
          };
        });
      })
    );
  }

  private getMidPrice(path: ExpandPathWithPositions) {
    const prices: FixedPointNumber[] = [];

    for (let i = 0; i < path.length; i++) {
      const { position } = path[i];
      const [balance1, balance2] = position;

      prices.push(balance2.div(balance1));
    }

    return prices.slice(1).reduce((acc, cur) => {
      return acc.times(cur);
    }, prices[0]);
  }

  private getPriceImpact(
    midPrice: FixedPointNumber,
    inputAmount: FixedPointNumber,
    outputAmount: FixedPointNumber
  ): FixedPointNumber {
    const temp = midPrice.times(inputAmount);

    return temp.minus(outputAmount).div(temp);
  }

  private getSwapResult(
    path: CompositeTradingPath,
    mode: TradeMode,
    data: MidResult,
    acceptiveSlippage = 0
  ): SwapResult {
    return {
      source: this.source,
      mode,
      path: path,
      acceptiveSlippage,
      ...data
    };
  }

  private swapWithExactInput(inputAmount: FixedPointNumber, path: ExpandPathWithPositions): MidResult {
    const result = {
      input: {
        token: path[0].input,
        amount: inputAmount
      },
      output: {
        token: path[path.length - 1].output,
        amount: FixedPointNumber.ZERO
      }
    };

    for (let i = 0; i < path.length; i++) {
      const { position, dexShareToken } = path[i];
      const [supply, target] = position;

      if (supply.isZero() || target.isZero()) throw new InsufficientLiquidityError(dexShareToken);

      const outputAmount = getTargetAmount(
        supply,
        target,
        i === 0 ? result.input.amount : result.output.amount,
        this.exchangeFee
      );

      if (inputAmount._getInner().toNumber() < MINIMUM_AMOUNT) throw new AmountTooSmall();

      if (outputAmount._getInner().toNumber() < MINIMUM_AMOUNT) throw new AmountTooSmall();

      if (outputAmount.isZero()) throw new InsufficientLiquidityError(dexShareToken);

      result.output.amount = outputAmount;
    }

    const midPrice = this.getMidPrice(path);
    const priceImpact = this.getPriceImpact(midPrice, result.input.amount, result.output.amount);
    const fee = this.getFee(path, result.input.amount);
    const naturalPriceImpact = priceImpact.sub(fee.exchangeFeeRate).max(FixedPointNumber.ZERO);
    // reset input & output amounts pricision
    result.input.amount = FixedPointNumber._fromBN(result.input.amount._getInner(), result.input.token.decimals);
    result.output.amount = FixedPointNumber._fromBN(result.output.amount._getInner(), result.output.token.decimals);

    return {
      ...result,
      midPrice,
      priceImpact,
      naturalPriceImpact,
      ...fee
    };
  }

  private swapWithExactOutput(outputAmount: FixedPointNumber, path: ExpandPathWithPositions): MidResult {
    // temp result data
    const result = {
      input: {
        token: path[0].input,
        amount: FixedPointNumber.ZERO
      },
      output: {
        token: path[path.length - 1].output,
        amount: outputAmount
      }
    };

    for (let i = path.length - 1; i >= 0; i--) {
      const { position, dexShareToken } = path[i];
      const [supply, target] = position;

      if (supply.isZero() || target.isZero()) throw new InsufficientLiquidityError(dexShareToken);

      const inputAmount = getSupplyAmount(
        supply,
        target,
        i === path.length - 1 ? result.output.amount : result.input.amount,
        this.exchangeFee
      );

      if (outputAmount._getInner().toNumber() < MINIMUM_AMOUNT) throw new AmountTooSmall();

      if (inputAmount._getInner().toNumber() < MINIMUM_AMOUNT) throw new AmountTooSmall();

      if (inputAmount.isZero()) throw new InsufficientLiquidityError(dexShareToken);

      result.input.amount = inputAmount;
    }

    const midPrice = this.getMidPrice(path);
    const priceImpact = this.getPriceImpact(midPrice, result.input.amount, result.output.amount);
    const fee = this.getFee(path, result.input.amount);
    const naturalPriceImpact = priceImpact.sub(fee.exchangeFeeRate).max(FixedPointNumber.ZERO);
    // reset input & output amounts pricision
    result.input.amount = FixedPointNumber._fromBN(result.input.amount._getInner(), result.input.token.decimals);
    result.output.amount = FixedPointNumber._fromBN(result.output.amount._getInner(), result.output.token.decimals);

    return {
      ...result,
      midPrice,
      priceImpact,
      naturalPriceImpact,
      ...fee
    };
  }

  private getFee(
    path: ExpandPath,
    input: FixedPointNumber
  ): { exchangeFee: FixedPointNumber; exchangeFeeRate: FixedPointNumber } {
    const feeRate = calculateExchangeFeeRate(path, this.exchangeFee.numerator.div(this.exchangeFee.denominator));

    const fee = input.times(feeRate);

    fee.forceSetPrecision(path[0].input.decimals);

    return {
      exchangeFee: fee,
      exchangeFeeRate: feeRate
    };
  }

  public filterPath(path: TradingPathItem) {
    if (path[0] !== this.source) return false;

    return path[1].length <= this.configs.tradingPathLimit;
  }

  public getAggregateTradingPath(result: SwapResult) {
    return { Dex: result.path[0][1].map((i) => i.toChainData()) };
  }

  public getTradingTx(
    result: SwapResult,
    overwrite?: OverwriteCallParams
  ): SubmittableExtrinsic<'promise'> | SubmittableExtrinsic<'rxjs'> {
    const { path, mode, output, input, acceptiveSlippage } = result;
    const [source, tradePath] = path[0];

    if (source !== this.source) throw new ParamsNotAcceptableForDexProvider(this.source);

    if (mode === 'EXACT_OUTPUT') {
      const slippage = new FixedPointNumber(1 + (acceptiveSlippage || 0));

      return this.api.tx.dex.swapWithExactTarget(
        tradePath.map((i) => i.toChainData()),
        overwrite?.output ? overwrite.output.toChainData() : output.amount.toChainData(),
        overwrite?.input ? overwrite.input.toChainData() : input.amount.mul(slippage).toChainData()
      );
    }

    const slippage = new FixedPointNumber(1 - (acceptiveSlippage || 0));

    return this.api.tx.dex.swapWithExactSupply(
      tradePath.map((i) => i.toChainData()),
      overwrite?.input ? overwrite.input.toChainData() : input.amount.toChainData(),
      overwrite?.output ? overwrite.output.toChainData() : output.amount.mul(slippage).toChainData()
    );
  }
}
