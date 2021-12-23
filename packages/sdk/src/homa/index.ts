// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { AnyApi, FixedPointNumber, Token } from '@acala-network/sdk-core';
import { memoize } from 'lodash';
import { BehaviorSubject, combineLatest, map, Observable, shareReplay } from 'rxjs';
import { SDKNotReady } from '..';
import { TokenProvider } from '../base-provider';
import { BaseSDK } from '../types';
import { getChainType } from '../utils/get-chain-type';
import { createStorages } from './storages';
import { EstimateMintResult, HomaEnvironment, StakingLedger } from './types';
import { getExchangeRate } from './utils/exchange-rate';
import { getAPY } from './utils/get-apy';
import { getEstimateMintResult } from './utils/get-estimate-mint-result';
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
        chain: this.api.runtimeChain.toString()
      };
    });
  }

  private checkIsReady(): boolean {
    if (!this.isReady$.value) throw new SDKNotReady('homa');

    return true;
  }

  private toBondPool$ = memoize((): Observable<FixedPointNumber> => {
    return this.storages.toBondPool().observable.pipe(
      map((data) => FixedPointNumber.fromInner(data.toString(), this.consts.stakingToken.decimals)),
      shareReplay(1)
    );
  });

  private totalLiquidity$ = memoize((): Observable<FixedPointNumber> => {
    return this.storages.liquidTokenIssuance().observable.pipe(
      map((data) => FixedPointNumber.fromInner(data.toString(), this.consts.liquidToken.decimals)),
      shareReplay(1)
    );
  });

  private fastMatchFeeRate$ = memoize((): Observable<FixedPointNumber> => {
    return this.storages.fastMatchFeeRate().observable.pipe(
      map((data) => FixedPointNumber.fromInner(data.toString())),
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

  private estimateRewardRatePerEra$ = memoize((): Observable<FixedPointNumber> => {
    return this.storages.estimatedRewardRatePerEra().observable.pipe(
      map((data) => FixedPointNumber.fromInner(data.toString(), 6)),
      shareReplay(1)
    );
  });

  private redeemRequest$ = memoize((address: string): Observable<[FixedPointNumber, boolean]> => {
    return this.storages.redeemRequests(address).observable.pipe(
      map((data) => [FixedPointNumber.fromInner(data[0].toString(), this.consts.liquidToken.decimals), data[1].isTrue]),
      shareReplay(1)
    );
  });

  private relayChainCurrentEra$ = memoize((): Observable<number> => {
    return this.storages.relayChainCurrentEra().observable.pipe(map((data) => data.toNumber()));
  });

  private unbondings$ = memoize((address: string): Observable<[number, FixedPointNumber][]> => {
    return this.storages.unbondings(address).observable.pipe(
      map((data) => {
        return data.map((item) => {
          return [
            item[0].toNumber(),
            FixedPointNumber.fromInner(item[1].toString(), this.consts.stakingToken.decimals)
          ];
        });
      })
    );
  });

  private env$ = memoize((): Observable<HomaEnvironment> => {
    return combineLatest({
      stakingLedgers: this.stakingLedgers$(),
      toBondPool: this.toBondPool$(),
      totalLiquidity: this.totalLiquidity$(),
      estimateRewardRatePerEra: this.estimateRewardRatePerEra$(),
      fastMatchFeeRate: this.fastMatchFeeRate$(),
      mintThreshold: this.mintThreshold$(),
      softBondedCapPerSubAccount: this.softBondedCapPerSubAccount$()
    }).pipe(
      map(
        ({
          toBondPool,
          stakingLedgers,
          totalLiquidity,
          estimateRewardRatePerEra,
          fastMatchFeeRate,
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
            estimateRewardRatePerEra,
            apy: getAPY(estimateRewardRatePerEra, getChainType(this.consts.chain)),
            fastMatchFeeRate,
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
   * @name subscribeClaimableAmount
   * @description subscribe claimable staking amount
   */
  public subscribeClaimableAmount = memoize((address: string): Observable<FixedPointNumber> => {
    return combineLatest({
      currentRelayEra: this.relayChainCurrentEra$(),
      unbondings: this.unbondings$(address)
    }).pipe(
      map(({ currentRelayEra, unbondings }) => {
        let available = FixedPointNumber.ZERO;

        unbondings.forEach(([expiredEra, unbonded]) => {
          if (expiredEra <= currentRelayEra) {
            available = available.add(unbonded);
          }
        });

        return available;
      })
    );
  });

  /**
   * @name subscribleEstimateMintResult
   * @description subscrible estimate mint result
   */
  public subscribeEstimateMintResult = memoize((amount: FixedPointNumber): Observable<EstimateMintResult> => {
    return this.env$().pipe(
      map((env) => {
        const receive = getEstimateMintResult(
          amount,
          env.mintThreshold,
          env.totalStaking,
          env.stakingSoftCap,
          env.exchangeRate,
          env.estimatedRewardRatePerEra
        );

        return {
          pay: amount,
          receive,
          env
        };
      })
    );
  });

  // public subscribeRedeemEstimateResult = memoize((amount: FixedPointNumber) => {
  //   return this.env$().pipe(map((env) => {}));
  // });
}
