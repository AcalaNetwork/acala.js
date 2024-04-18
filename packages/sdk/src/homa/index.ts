import { AnyApi, FixedPointNumber, Token } from '@acala-network/sdk-core';
import { memoize } from '@polkadot/util';
import { u16 } from '@polkadot/types';
import { BehaviorSubject, combineLatest, firstValueFrom, map, Observable, shareReplay, switchMap } from 'rxjs';
import { filter } from 'rxjs/operators';
import { BaseSDK } from '../types.js';
import { getChainType } from '../utils/get-chain-type.js';
import { createStorages } from './storages.js';
import {
  EstimateMintResult,
  EstimateRedeemResult,
  HomaConvertor,
  HomaEnvironment,
  RedeemRequest,
  StakingLedger,
  Unbonding,
  UserLiquidityTokenSummary
} from './types.js';
import { convertLiquidToStaking, convertStakingToLiquid, getExchangeRate } from './utils/exchange-rate.js';
import { getAPY } from './utils/get-apy.js';
import { getEstimateMintResult } from './utils/get-estimate-mint-result.js';
import { getEstimateRedeemResult } from './utils/get-estimate-redeem-result.js';
import { transformStakingLedger } from './utils/transform-staking-ledger.js';
import { getUserLiquidTokenSummary } from './utils/get-user-liquid-token-summary.js';
import { ApiTypes, SubmittableExtrinsic } from '@polkadot/api/types';
import { ISubmittableResult } from '@polkadot/types/types';
import { RequiredAddressInFastReddem } from './errors.js';
import { Wallet } from '../wallet/index.js';

export class Homa<T extends ApiTypes = 'promise'> implements BaseSDK {
  private api: AnyApi;
  private storages: ReturnType<typeof createStorages>;
  private wallet: Wallet;
  public consts!: {
    liquidToken: Token;
    stakingToken: Token;
    defaultExchangeRate: FixedPointNumber;
    chain: string;
    activeSubAccountsIndexList: number[];
    mintThreshold: FixedPointNumber;
    redeemThreshold: FixedPointNumber;
  };

  public isReady$: BehaviorSubject<boolean>;

  constructor(api: AnyApi, wallet: Wallet) {
    this.api = api;

    this.isReady$ = new BehaviorSubject<boolean>(false);
    this.storages = createStorages(this.api);
    this.wallet = wallet;
    this.init();
  }

  private init() {
    this.initConsts();
  }

  private initConsts() {
    const liquidToken = this.wallet.getToken(this.api.consts.homa.liquidCurrencyId);
    const stakingToken = this.wallet.getToken(this.api.consts.homa.stakingCurrencyId);

    this.consts = {
      liquidToken,
      stakingToken,
      chain: this.api.runtimeChain.toString(),
      defaultExchangeRate: FixedPointNumber.fromInner(this.api.consts.homa.defaultExchangeRate.toString()),
      activeSubAccountsIndexList: (this.api.consts.homa.activeSubAccountsIndexList as unknown as u16[]).map((item) =>
        item.toNumber()
      ),
      mintThreshold: FixedPointNumber.fromInner(this.api.consts.homa.mintThreshold.toString(), stakingToken.decimals),
      redeemThreshold: FixedPointNumber.fromInner(
        this.api.consts.homa.redeemThreshold.toString(),
        stakingToken.decimals
      )
    };

    // set isReady to true after consts intizialized
    this.isReady$.next(true);
  }

  public get isReady(): Promise<boolean> {
    return firstValueFrom(this.isReady$.asObservable().pipe(filter((i) => i)));
  }

  private getTotalStakingBonded$ = memoize(() => {
    const { stakingToken } = this.consts;

    return this.storages.totalStakingBonded().observable.pipe(
      map((data) => FixedPointNumber.fromInner(data.toString(), stakingToken.decimals)),
      shareReplay(1)
    );
  });

  public get totalStakingBonded$() {
    return this.getTotalStakingBonded$();
  }

  private getToBondPool$ = memoize((): Observable<FixedPointNumber> => {
    const { stakingToken } = this.consts;

    return this.storages.toBondPool().observable.pipe(
      map((data) => FixedPointNumber.fromInner(data.toString(), stakingToken.decimals)),
      shareReplay(1)
    );
  });

  public get toBondPool$() {
    return this.getToBondPool$();
  }

  private getTotalVoidLiquid$ = memoize((): Observable<FixedPointNumber> => {
    return this.storages.totalVoidLiquid().observable.pipe(
      map((data) => FixedPointNumber.fromInner(data.toString(), this.consts.liquidToken.decimals)),
      shareReplay(1)
    );
  });

  public get totalVoidLiquid$() {
    return this.getTotalVoidLiquid$();
  }

  private getTotalLiquidity$ = memoize((): Observable<FixedPointNumber> => {
    return combineLatest({
      totalVoidLiquid: this.totalVoidLiquid$,
      totalIssuance: this.storages.issuance(this.consts.liquidToken).observable
    }).pipe(
      map(({ totalVoidLiquid, totalIssuance }) =>
        FixedPointNumber.fromInner(totalIssuance.toString(), this.consts.liquidToken.decimals).add(totalVoidLiquid)
      ),
      shareReplay(1)
    );
  });

  public get totalLiquidity$() {
    return this.getTotalLiquidity$();
  }

  private getFastMatchFeeRate$ = memoize((): Observable<FixedPointNumber> => {
    return this.storages.fastMatchFeeRate().observable.pipe(
      map((data) => FixedPointNumber.fromInner(data.toString())),
      shareReplay(1)
    );
  });

  public get fastMatchFeeRate$() {
    return this.getFastMatchFeeRate$();
  }

  private getCommissionRate$ = memoize((): Observable<FixedPointNumber> => {
    return this.storages.commissionRate().observable.pipe(
      map((data) => FixedPointNumber.fromInner(data.toString())),
      shareReplay(1)
    );
  });

  public get commissionRate$() {
    return this.getCommissionRate$();
  }

  private getSoftBondedCapPerSubAccount$ = memoize((): Observable<FixedPointNumber> => {
    return this.storages.softBondedCapPerSubAccount().observable.pipe(
      map((data) => FixedPointNumber.fromInner(data.toString(), this.consts.stakingToken.decimals)),
      shareReplay(1)
    );
  });

  public get softBondedCapPerSubAccount$() {
    return this.getSoftBondedCapPerSubAccount$();
  }

  private getStakingLedgers$ = memoize((): Observable<StakingLedger[]> => {
    return this.storages.stakingLedgers().observable.pipe(
      map((data) => transformStakingLedger(data, this.consts.stakingToken)),
      shareReplay(1)
    );
  });

  public get stakingLedgers$() {
    return this.getStakingLedgers$();
  }

  private getEraFrequency$ = memoize((): Observable<number> => {
    return this.storages.eraFrequency().observable.pipe(
      map((data) => data.toNumber()),
      shareReplay(1)
    );
  });

  public get eraFrequency$() {
    return this.getEraFrequency$();
  }

  private getEstimatedRewardRatePerEra$ = memoize((): Observable<FixedPointNumber> => {
    return this.storages.estimatedRewardRatePerEra().observable.pipe(
      map((data) => FixedPointNumber.fromInner(data.toString())),
      shareReplay(1)
    );
  });

  public get estimatedRewardRatePerEra$() {
    return this.getEstimatedRewardRatePerEra$();
  }

  public getRedeemRequest$ = memoize((address: string): Observable<[FixedPointNumber, boolean]> => {
    return this.storages.redeemRequests(address).observable.pipe(
      map(
        (data) =>
          [
            FixedPointNumber.fromInner(data.unwrapOrDefault()?.[0].toString(), this.consts.liquidToken.decimals),
            data.unwrapOrDefault()?.[1].isTrue
          ] as [FixedPointNumber, boolean]
      ),
      shareReplay(1)
    );
  });

  public readonly relayChainCurrentEra$ = memoize((): Observable<number> => {
    return this.storages.relayChainCurrentEra().observable.pipe(map((data) => data.toNumber()));
  });

  public readonly getUnbondings$ = memoize((address: string): Observable<Unbonding[]> => {
    return this.storages.unbondings(address).observable.pipe(
      map((data) => {
        return data
          .map((item) => {
            const era = item[0].args[1].toNumber();

            return {
              era,
              amount: FixedPointNumber.fromInner(item[1].toString(), this.consts.stakingToken.decimals)
            };
          })
          .sort((a, b) => a.era - b.era);
      }),
      shareReplay(1)
    );
  });

  private getEnv$ = memoize((): Observable<HomaEnvironment> => {
    return this.isReady$.pipe(
      filter((i) => i),
      switchMap(() => {
        return combineLatest({
          totalStakingBonded: this.totalStakingBonded$,
          toBondPool: this.toBondPool$,
          totalLiquidity: this.totalLiquidity$,
          estimatedRewardRatePerEra: this.estimatedRewardRatePerEra$,
          fastMatchFeeRate: this.fastMatchFeeRate$,
          commissionRate: this.commissionRate$,
          eraFrequency: this.eraFrequency$,
          softBondedCapPerSubAccount: this.softBondedCapPerSubAccount$
        }).pipe(
          map(
            ({
              totalStakingBonded,
              toBondPool,
              totalLiquidity,
              estimatedRewardRatePerEra,
              fastMatchFeeRate,
              commissionRate,
              eraFrequency,
              softBondedCapPerSubAccount
            }) => {
              const { mintThreshold, redeemThreshold } = this.consts;
              const totalStaking: FixedPointNumber = toBondPool.add(totalStakingBonded);

              return {
                totalStaking: totalStaking,
                totalLiquidity,
                exchangeRate: getExchangeRate(totalStaking, totalLiquidity),
                toBondPool,
                estimatedRewardRatePerEra,
                apy: getAPY(
                  estimatedRewardRatePerEra.toNumber(),
                  commissionRate.toNumber(),
                  eraFrequency,
                  getChainType(this.consts.chain)
                ),
                fastMatchFeeRate,
                commissionRate,
                eraFrequency,
                mintThreshold,
                redeemThreshold,
                stakingSoftCap: softBondedCapPerSubAccount.mul(
                  new FixedPointNumber(this.consts.activeSubAccountsIndexList.length)
                )
              };
            }
          ),
          shareReplay(1)
        );
      })
    );
  });

  public get env$() {
    return this.getEnv$();
  }

  public async getEnv(): Promise<HomaEnvironment> {
    return firstValueFrom(this.env$);
  }

  /**
   * @name convertor$
   * @description return convertLiquidToStaking and convertStakingToLiquid
   */
  private getConvertor$ = memoize((): Observable<HomaConvertor> => {
    return this.env$.pipe(
      map((env) => ({
        convertLiquidToStaking: (data: FixedPointNumber) => convertLiquidToStaking(env.exchangeRate, data),
        convertStakingToLiquid: (data: FixedPointNumber) => convertStakingToLiquid(env.exchangeRate, data)
      }))
    );
  });

  public get convertor$() {
    return this.getConvertor$();
  }

  public async getConvertor(): Promise<HomaConvertor> {
    return firstValueFrom(this.convertor$);
  }

  /**
   * @name subscribleEstimateMintResult
   * @description subscrible estimate mint result
   */
  public subscribeEstimateMintResult = memoize((amount: FixedPointNumber): Observable<EstimateMintResult> => {
    return this.env$.pipe(map((env) => getEstimateMintResult(amount, env)));
  });

  public async getEstimateMintResult(amount: FixedPointNumber): Promise<EstimateMintResult> {
    return firstValueFrom(this.subscribeEstimateMintResult(amount));
  }

  public createMintCall = memoize((amount: FixedPointNumber): SubmittableExtrinsic<T, ISubmittableResult> => {
    return this.api.tx.homa.mint(amount.toChainData()) as SubmittableExtrinsic<T, ISubmittableResult>;
  });

  public subscribeEstimateRedeemResult = memoize((amount: FixedPointNumber, isFastRedeem: boolean) => {
    return this.env$.pipe(map((env) => getEstimateRedeemResult(env, amount, isFastRedeem)));
  });

  public async getEstimateRedeemResult(amount: FixedPointNumber, isFastReddem: boolean): Promise<EstimateRedeemResult> {
    return firstValueFrom(this.subscribeEstimateRedeemResult(amount, isFastReddem));
  }

  public createRedeemCall = memoize(
    (amount: FixedPointNumber, isFastMatch: boolean, address?: string): SubmittableExtrinsic<T, ISubmittableResult> => {
      if (isFastMatch) {
        if (!address) throw new RequiredAddressInFastReddem();

        return this.api.tx.utility.batchAll([
          this.api.tx.homa.requestRedeem(amount.toChainData(), true),
          this.api.tx.homa.fastMatchRedeemsCompletely([address])
        ]) as SubmittableExtrinsic<T, ISubmittableResult>;
      }

      return this.api.tx.homa.requestRedeem(amount.toChainData(), false) as SubmittableExtrinsic<T, ISubmittableResult>;
    }
  );

  public subscribeUserRedeemRequest = memoize((address: string): Observable<RedeemRequest> => {
    return combineLatest({
      env: this.env$,
      request: this.getRedeemRequest$(address)
    }).pipe(
      map((data) => {
        return {
          fastRedeem: data.request[1],
          amount: data.request[0]
        };
      })
    );
  });

  public async getUserRedeemRequest(address: string): Promise<RedeemRequest> {
    return firstValueFrom(this.subscribeUserRedeemRequest(address));
  }

  public subscribeUserLiquidTokenSummary = memoize((address: string) => {
    return combineLatest({
      env: this.env$,
      currentEra: this.relayChainCurrentEra$(),
      redeemRequest: this.subscribeUserRedeemRequest(address),
      unbondings: this.getUnbondings$(address)
    }).pipe(
      map(({ env, currentEra, redeemRequest, unbondings }) => {
        return getUserLiquidTokenSummary(env, currentEra, unbondings, redeemRequest);
      })
    );
  });

  public async getUserLiquidTokenSummary(address: string): Promise<UserLiquidityTokenSummary> {
    return firstValueFrom(this.subscribeUserLiquidTokenSummary(address));
  }
}
