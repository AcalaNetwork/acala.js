import { AnyApi, FixedPointNumber, Token } from '@acala-network/sdk-core';
import { memoize } from '@polkadot/util';
import { curry } from 'lodash/fp';
import { BehaviorSubject, combineLatest, map, Observable, shareReplay } from 'rxjs';
import { TokenProvider } from '../base-provider';
import { BaseSDK } from '../types';
import { getChainType } from '../utils/get-chain-type';
import { createStorages } from './storages';
import { EstimateMintResult, HomaConvertor, HomaEnvironment, StakingLedger, Unbonding } from './types';
import { convertLiquidToStaking, convertStakingToLiquid, getExchangeRate } from './utils/exchange-rate';
import { getAPY } from './utils/get-apy';
import { getClaimableAmount } from './utils/get-claimable-amount';
import { getEstimateMintResult } from './utils/get-estimate-mint-result';
import { getEstimateRedeemResult } from './utils/get-estimate-redeem-result';
import { transformStakingLedger } from './utils/transform-staking-ledger';

export class Homa implements BaseSDK {
  private api: AnyApi;
  private isReady$: BehaviorSubject<boolean>;
  private storages: ReturnType<typeof createStorages>;
  private tokenProvider: TokenProvider;
  private consts!: {
    liquidToken: Token;
    stakingToken: Token;
    defaultExchangeRate: FixedPointNumber;
    chain: string;
  };

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
        defaultExchangeRate: FixedPointNumber.fromInner(this.api.consts.homa.defaultExchangeRate.toString())
      };

      // set isReady to true when consts intizialized
      this.isReady$.next(true);
    });
  }

  private toBondPool$ = memoize((): Observable<FixedPointNumber> => {
    return this.storages.toBondPool().observable.pipe(
      map((data) => FixedPointNumber.fromInner(data.toString(), this.consts.stakingToken.decimals)),
      shareReplay(1)
    );
  });

  private totalVoidLiquid$ = memoize((): Observable<FixedPointNumber> => {
    return this.storages.toBondPool().observable.pipe(
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
      map((data) => FixedPointNumber.fromInner(data.toString(), 6)),
      shareReplay(1)
    );
  });

  private commissionRate$ = memoize((): Observable<FixedPointNumber> => {
    return this.storages.commissionRate().observable.pipe(
      map((data) => FixedPointNumber.fromInner(data.toString(), 6)),
      shareReplay(1)
    );
  });

  private mintThreshold$ = memoize((): Observable<FixedPointNumber> => {
    return this.storages.mintThreshold().observable.pipe(
      map((data) => FixedPointNumber.fromInner(data.toString(), this.consts.stakingToken.decimals)),
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

  private estimatedRewardRatePerEra$ = memoize((): Observable<FixedPointNumber> => {
    return this.storages.estimatedRewardRatePerEra().observable.pipe(
      map((data) => FixedPointNumber.fromInner(data.toString(), 6)),
      shareReplay(1)
    );
  });

  private redeemRequest$ = memoize((address: string): Observable<[FixedPointNumber, boolean]> => {
    return this.storages.redeemRequests(address).observable.pipe(
      map(
        (data) =>
          [FixedPointNumber.fromInner(data[0].toString(), this.consts.liquidToken.decimals), data[1].isTrue] as [
            FixedPointNumber,
            boolean
          ]
      ),
      shareReplay(1)
    );
  });

  private relayChainCurrentEra$ = memoize((): Observable<number> => {
    return this.storages.relayChainCurrentEra().observable.pipe(map((data) => data.toNumber()));
  });

  private unbondings$ = memoize((address: string): Observable<Unbonding[]> => {
    return this.storages.unbondings(address).observable.pipe(
      map((data) => {
        return data.map((item) => {
          return {
            era: item[0].toNumber(),
            amount: FixedPointNumber.fromInner(item[1].toString(), this.consts.stakingToken.decimals)
          };
        });
      })
    );
  });

  private env$ = memoize((): Observable<HomaEnvironment> => {
    return combineLatest({
      stakingLedgers: this.stakingLedgers$(),
      toBondPool: this.toBondPool$(),
      totalLiquidity: this.totalLiquidity$(),
      estimatedRewardRatePerEra: this.estimatedRewardRatePerEra$(),
      fastMatchFeeRate: this.fastMatchFeeRate$(),
      commissionRate: this.commissionRate$(),
      mintThreshold: this.mintThreshold$(),
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
          mintThreshold,
          softBondedCapPerSubAccount
        }) => {
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
            apy: getAPY(estimatedRewardRatePerEra, getChainType(this.consts.chain)),
            fastMatchFeeRate,
            commissionRate,
            mintThreshold,
            stakingSoftCap: softBondedCapPerSubAccount.mul(new FixedPointNumber(stakingLedgers.length))
          };
        }
      ),
      shareReplay(1)
    );
  });

  public get isReady(): Observable<boolean> {
    return this.isReady$.asObservable();
  }

  /**
   * @name subscribeConvertor
   * @description return convertLiquidToStaking and convertStakingToLiquid
   */
  public subscribeConvertor = memoize((): Observable<HomaConvertor> => {
    return this.env$().pipe(
      map((env) => ({
        convertLiquidToStaking: curry(convertLiquidToStaking)(env.exchangeRate),
        convertStakingToLiquid: curry(convertStakingToLiquid)(env.exchangeRate)
      }))
    );
  });

  /**
   * @name subscribeClaimableAmount
   * @description subscribe claimable staking amount
   */
  public subscribeClaimableAmount = memoize((address: string): Observable<FixedPointNumber> => {
    return combineLatest({
      currentRelayEra: this.relayChainCurrentEra$(),
      unbondings: this.unbondings$(address)
    }).pipe(map(({ currentRelayEra, unbondings }) => getClaimableAmount(unbondings, currentRelayEra)));
  });

  /**
   * @name subscribleEstimateMintResult
   * @description subscrible estimate mint result
   */
  public subscribeEstimateMintResult = memoize((amount: FixedPointNumber): Observable<EstimateMintResult> => {
    return this.env$().pipe(map((env) => getEstimateMintResult(amount, env)));
  });

  public subscribeRedeemEstimateResult = memoize((amount: FixedPointNumber, isFastRedeem: boolean) => {
    return this.env$().pipe(map((env) => getEstimateRedeemResult(env, amount, isFastRedeem)));
  });

  public subscribeUserRedeemRequest = memoize((address: string) => {
    return this.redeemRequest$(address);
  });
}
