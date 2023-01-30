import { AnyApi, FixedPointNumber } from '@acala-network/sdk-core';
import { Storage } from '@acala-network/sdk/utils/storage';
import { Option, Vec } from '@polkadot/types';
import {
  OrmlVestingVestingSchedule,
  PalletBalancesBalanceLock,
  PolkadotPrimitivesV2PersistedValidationData
} from '@polkadot/types/lookup';
import { combineLatest, firstValueFrom, map, Observable } from 'rxjs';
import { TokenProvider } from '../token-provider/type';
import { VestingData } from './types';

export interface VestingConfig {
  api: AnyApi;
  tokenProvider: TokenProvider;
}

export class Vesting {
  private api: AnyApi;
  private tokenProvider: TokenProvider;

  constructor({ api, tokenProvider }: VestingConfig) {
    this.api = api;
    this.tokenProvider = tokenProvider;
  }

  subscribeVestingDetail(address: string): Observable<VestingData> {
    const schedules$ = Storage.create<Vec<OrmlVestingVestingSchedule>>({
      api: this.api,
      path: 'query.vesting.vestingSchedules',
      params: [address]
    }).observable;
    const locks$ = Storage.create<Vec<PalletBalancesBalanceLock>>({
      api: this.api,
      path: 'query.balances.locks',
      params: [address]
    }).observable;
    // get parachain block  api.query.parachainSystem.validationData()
    const parachain$ = Storage.create<Option<PolkadotPrimitivesV2PersistedValidationData>>({
      api: this.api,
      path: 'query.parachainSystem.validationData',
      params: []
    }).observable;

    const token = this.tokenProvider.getNativeToken();

    return combineLatest({
      schedules: schedules$,
      locks: locks$,
      parachain: parachain$
    }).pipe(
      map(({ schedules, locks, parachain }) => {
        const locking = locks?.find((i) => i.id.eq('ormlvest'));
        const schedule = schedules?.[0];
        const parachainBlock = parachain.isSome ? parachain.value.relayParentNumber.toBigInt() : BigInt(0);

        const currentLock = FixedPointNumber.fromInner(locking?.amount.toString() || 0, token.decimals);
        const startBlock = schedule?.start.toBigInt() || BigInt(0);
        const period = schedule?.period.toBigInt() || BigInt(0);
        const prePeriod = FixedPointNumber.fromInner(schedule?.perPeriod.toString() || 0, token.decimals);
        const periodCount = schedule?.periodCount.toBigInt() || BigInt(0);

        const total = prePeriod.mul(new FixedPointNumber(periodCount.toString()));
        const remaining = currentLock;
        const endBlock = startBlock + period * periodCount;
        const claimed = total.minus(remaining).max(FixedPointNumber.ZERO);
        const planToClaim =
          startBlock + period < parachainBlock && period !== BigInt(0)
            ? prePeriod.mul(
                new FixedPointNumber(((parachainBlock - startBlock) / period).toString()).min(
                  new FixedPointNumber(periodCount.toString())
                )
              )
            : FixedPointNumber.ZERO;
        const available = planToClaim.minus(claimed).max(FixedPointNumber.ZERO);

        return {
          token,
          total,
          claimed,
          remaining,
          available,
          prePeriod,
          parachainBlock,
          startBlock,
          endBlock,
          period,
          periodCount
        };
      })
    );
  }

  async getVestingDetail(address: string) {
    return firstValueFrom(this.subscribeVestingDetail(address));
  }
}
