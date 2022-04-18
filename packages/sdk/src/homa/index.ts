import { AnyApi, FixedPointNumber, Token } from '@acala-network/sdk-core';
import { memoize } from '@polkadot/util';
import { u16 } from '@polkadot/types';
import { BehaviorSubject, combineLatest, firstValueFrom, map, Observable, shareReplay, switchMap } from 'rxjs';
import { filter } from 'rxjs/operators';
import { TokenProvider } from '../base-provider';
import { BaseSDK } from '../types';
import { getChainType } from '../utils/get-chain-type';
import { createStorages } from './storages';
import {
  EstimateMintResult,
  EstimateRedeemResult,
  HomaConvertor,
  HomaEnvironment,
  RedeemRequest,
  StakingLedger,
  Unbonding,
  UserLiquidityTokenSummary
} from './types';
import { convertLiquidToStaking, convertStakingToLiquid, getExchangeRate } from './utils/exchange-rate';
import { getAPY } from './utils/get-apy';
import { getEstimateMintResult } from './utils/get-estimate-mint-result';
import { getEstimateRedeemResult } from './utils/get-estimate-redeem-result';
import { transformStakingLedger } from './utils/transform-staking-ledger';
import { getUserLiquidTokenSummary } from './utils/get-user-liquid-token-summary';
import { ApiTypes, SubmittableExtrinsic } from '@polkadot/api/types';
import { ISubmittableResult } from '@polkadot/types/types';
import { RequiredAddressInFastReddem } from './errors';

export class Homa<T extends ApiTypes = 'promise'> implements BaseSDK {
  private api: AnyApi;
  private storages: ReturnType<typeof createStorages>;
  private tokenProvider: TokenProvider;
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

  constructor(api: AnyApi, tokenProvider: TokenProvider) {
    this.api = api;

    this.isReady$ = new BehaviorSubject<boolean>(false);
    this.storages = createStorages(this.api);
    this.tokenProvider = tokenProvider;
    this.init();
  }

  private init() {
    this.initConsts();
  }

  private initConsts() {
    combineLatest({
      liquidToken: this.tokenProvider.subscribeToken(this.api.consts.homa.liquidCurrencyId),
      stakingToken: this.tokenProvider.subscribeToken(this.api.consts.homa.stakingCurrencyId)
    }).subscribe((data) => {
      this.consts = {
        ...data,
        chain: this.api.runtimeChain.toString(),
        defaultExchangeRate: FixedPointNumber.fromInner(this.api.consts.homa.defaultExchangeRate.toString()),
        activeSubAccountsIndexList: (this.api.consts.homa.activeSubAccountsIndexList as unknown as u16[]).map((item) =>
          item.toNumber()
        ),
        mintThreshold: FixedPointNumber.fromInner(
          this.api.consts.homa.mintThreshold.toString(),
          data.stakingToken.decimals
        ),
        redeemThreshold: FixedPointNumber.fromInner(
          this.api.consts.homa.redeemThreshold.toString(),
          data.stakingToken.decimals
        )
      };

      // set isReady to true when consts intizialized
      this.isReady$.next(true);
    });
  }

  public get isReady(): Promise<boolean> {
    return firstValueFrom(this.isReady$.asObservable().pipe(filter((i) => i)));
  }

  private toBondPool$ = memoize((): Observable<FixedPointNumber> => {
    return this.storages.toBondPool().observable.pipe(
      map((data) => FixedPointNumber.fromInner(data.toString(), this.consts.stakingToken.decimals)),
      shareReplay(1)
    );
  });

  private totalVoidLiquid$ = memoize((): Observable<FixedPointNumber> => {
    return this.storages.totalVoidLiquid().observable.pipe(
      map((data) => FixedPointNumber.fromInner(data.toString(), this.consts.liquidToken.decimals)),
      shareReplay(1)
    );
  });

  private totalLiquidity$ = memoize((): Observable<FixedPointNumber> => {
    return combineLatest({
      totalVoidLiquid: this.totalVoidLiquid$(),
      totalIssuance: this.storages.issuance(this.consts.liquidToken).observable
    }).pipe(
      map(({ totalVoidLiquid, totalIssuance }) =>
        FixedPointNumber.fromInner(totalIssuance.toString(), this.consts.liquidToken.decimals).add(totalVoidLiquid)
      ),
      shareReplay(1)
    );
  });

  private fastMatchFeeRate$ = memoize((): Observable<FixedPointNumber> => {
    return this.storages.fastMatchFeeRate().observable.pipe(
      map((data) => FixedPointNumber.fromInner(data.toString())),
      shareReplay(1)
    );
  });

  private commissionRate$ = memoize((): Observable<FixedPointNumber> => {
    return this.storages.commissionRate().observable.pipe(
      map((data) => FixedPointNumber.fromInner(data.toString())),
      shareReplay(1)
    );
  });

  private softBondedCapPerSubAccount$ = memoize((): Observable<FixedPointNumber> => {
    return this.storages.softBondedCapPerSubAccount().observable.pipe(
      map((data) => FixedPointNumber.fromInner(data.toString(), this.consts.stakingToken.decimals)),
      shareReplay(1)
    );
  });

  private stakingLedgers$ = memoize((): Observable<StakingLedger[]> => {
    return this.storages.stakingLedgers().observable.pipe(
      map((data) => transformStakingLedger(data, this.consts.stakingToken)),
      shareReplay(1)
    );
  });

  private eraFrequency$ = memoize((): Observable<number> => {
    return this.storages.eraFrequency().observable.pipe(
      map((data) => data.toNumber()),
      shareReplay(1)
    );
  });

  private estimatedRewardRatePerEra$ = memoize((): Observable<FixedPointNumber> => {
    return this.storages.estimatedRewardRatePerEra().observable.pipe(
      map((data) => FixedPointNumber.fromInner(data.toString())),
      shareReplay(1)
    );
  });

  private redeemRequest$ = memoize((address: string): Observable<[FixedPointNumber, boolean]> => {
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

  private relayChainCurrentEra$ = memoize((): Observable<number> => {
    return this.storages.relayChainCurrentEra().observable.pipe(map((data) => data.toNumber()));
  });

  private unbondings$ = (address: string): Observable<Unbonding[]> => {
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
      })
    );
  };

  private env$ = memoize((): Observable<HomaEnvironment> => {
    return this.isReady$.pipe(
      filter((i) => i),
      switchMap(() => {
        return combineLatest({
          stakingLedgers: this.stakingLedgers$(),
          toBondPool: this.toBondPool$(),
          totalLiquidity: this.totalLiquidity$(),
          estimatedRewardRatePerEra: this.estimatedRewardRatePerEra$(),
          fastMatchFeeRate: this.fastMatchFeeRate$(),
          commissionRate: this.commissionRate$(),
          eraFrequency: this.eraFrequency$(),
          softBondedCapPerSubAccount: this.softBondedCapPerSubAccount$()
        }).pipe(
          map(
            ({
              toBondPool,
              stakingLedgers,
              totalLiquidity,
              estimatedRewardRatePerEra,
              fastMatchFeeRate,
              commissionRate,
              eraFrequency,
              softBondedCapPerSubAccount
            }) => {
              const { mintThreshold, redeemThreshold } = this.consts;
              const totalInSubAccount = stakingLedgers.reduce((acc, cur) => {
                return acc.add(cur.bonded);
              }, new FixedPointNumber(0, this.consts.stakingToken.decimals));
              const totalStaking = toBondPool.add(totalInSubAccount);

              return {
                totalStaking,
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

  public subscribeEnv = (): Observable<HomaEnvironment> => {
    return this.env$();
  };

  public async getEnv(): Promise<HomaEnvironment> {
    return firstValueFrom(this.subscribeEnv());
  }

  /**
   * @name subscribeConvertor
   * @description return convertLiquidToStaking and convertStakingToLiquid
   */
  public subscribeConvertor = memoize((): Observable<HomaConvertor> => {
    return this.env$().pipe(
      map((env) => ({
        convertLiquidToStaking: (data: FixedPointNumber) => convertLiquidToStaking(env.exchangeRate, data),
        convertStakingToLiquid: (data: FixedPointNumber) => convertStakingToLiquid(env.exchangeRate, data)
      }))
    );
  });

  public async getConvertor(): Promise<HomaConvertor> {
    return firstValueFrom(this.subscribeConvertor());
  }

  /**
   * @name subscribleEstimateMintResult
   * @description subscrible estimate mint result
   */
  public subscribeEstimateMintResult = memoize((amount: FixedPointNumber): Observable<EstimateMintResult> => {
    return this.env$().pipe(map((env) => getEstimateMintResult(amount, env)));
  });

  public async getEstimateMintResult(amount: FixedPointNumber): Promise<EstimateMintResult> {
    return firstValueFrom(this.subscribeEstimateMintResult(amount));
  }

  public createMintCall = memoize((amount: FixedPointNumber): SubmittableExtrinsic<T, ISubmittableResult> => {
    return this.api.tx.homa.mint(amount.toChainData()) as SubmittableExtrinsic<T, ISubmittableResult>;
  });

  public subscribeEstimateRedeemResult = memoize((amount: FixedPointNumber, isFastRedeem: boolean) => {
    return this.env$().pipe(map((env) => getEstimateRedeemResult(env, amount, isFastRedeem)));
  });

  public async getEstimateRedeemResult(amount: FixedPointNumber, isFastReddem: boolean): Promise<EstimateRedeemResult> {
    return firstValueFrom(this.subscribeEstimateRedeemResult(amount, isFastReddem));
  }

  public createRedeemCall = memoize(
    (amount: FixedPointNumber, isFastMatch: boolean, address?: string): SubmittableExtrinsic<T, ISubmittableResult> => {
      if (isFastMatch) {
        if (!address) throw new RequiredAddressInFastReddem();

        return this.api.tx.utility.batch([
          this.api.tx.homa.requestRedeem(amount.toChainData(), true),
          this.api.tx.homa.fastMatchRedeems([address])
        ]) as SubmittableExtrinsic<T, ISubmittableResult>;
      }

      return this.api.tx.homa.requestRedeem(amount.toChainData(), false) as SubmittableExtrinsic<T, ISubmittableResult>;
    }
  );

  public subscribeUserRedeemRequest = memoize((address: string): Observable<RedeemRequest> => {
    return combineLatest({
      env: this.env$(),
      request: this.redeemRequest$(address)
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
      env: this.env$(),
      currentEra: this.relayChainCurrentEra$(),
      redeemRequest: this.subscribeUserRedeemRequest(address),
      unbondings: this.unbondings$(address)
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
