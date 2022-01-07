import { AnyApi, FixedPointNumber, forceToCurrencyName, MaybeCurrency, Token } from '@acala-network/sdk-core';
import { SubmittableExtrinsic } from '@polkadot/api-base/types';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { BaseSDK, ChainType } from '..';
import { getChainType } from '../utils/get-chain-type';
import { acalaCrossChainTokenConfigs, karuraCrossChainTokenConfigs } from './configs';
import { CrossChainSelector } from './cross-chain-configs';
import { InvalidCrossChainSelectorParams } from './errors';
import { Chain, CrossChainTokenConfig } from './types';
import { createTx } from './utils/create-tx';

interface AvailableTransfersQueryConfig {
  from?: string | Chain;
  dest?: string | Chain;
  token?: MaybeCurrency;
}

export class CrossChain implements BaseSDK {
  private api: AnyApi;
  private configs!: CrossChainTokenConfig[];

  public consts!: {
    runtimeChain: string;
  };

  public isReady$: BehaviorSubject<boolean>;

  constructor(api: AnyApi) {
    this.api = api;
    this.isReady$ = new BehaviorSubject<boolean>(false);
    this.init();
  }

  public init(): void {
    this.consts = {
      runtimeChain: this.api.runtimeChain.toString()
    };

    this.configs =
      getChainType(this.consts.runtimeChain) === ChainType.KARURA
        ? karuraCrossChainTokenConfigs
        : acalaCrossChainTokenConfigs;

    this.isReady$.next(true);
  }

  get selector(): CrossChainSelector {
    return new CrossChainSelector(this.configs);
  }

  public get isReady(): Promise<boolean> {
    return firstValueFrom(this.isReady$.asObservable().pipe((i) => i));
  }

  public createCrossChainTransfer(
    fromChainApi: AnyApi,
    fromChain: Chain,
    toChain: Chain,
    amount: FixedPointNumber,
    token: MaybeCurrency,
    address: string
  ): [SubmittableExtrinsic<'promise'> | SubmittableExtrinsic<'rxjs'>, CrossChainTokenConfig, AnyApi] {
    const config = this.configs.find(
      (item) =>
        item.fromChain.name === fromChain.name &&
        item.toChain.name === toChain.name &&
        item.token === forceToCurrencyName(token)
    );

    if (!config)
      throw new InvalidCrossChainSelectorParams({ from: fromChain, to: toChain, token: forceToCurrencyName(token) });

    return [createTx(fromChain, toChain, amount, token, address), config, fromChainApi] as const;
  }
}
