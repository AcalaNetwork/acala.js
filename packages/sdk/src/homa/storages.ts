import { AnyApi, Token } from '@acala-network/sdk-core';
import { AcalaStakingLedge, AccountId, Rate } from '@acala-network/types/interfaces';
import { StorageKey, U16, Option, Bool } from '@polkadot/types';
import { ITuple } from '@polkadot/types/types';
import { Balance, EraIndex } from '@polkadot/types/interfaces';
import { memoize } from '@polkadot/util';
import { Storage } from '../utils/storage';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const createStorages = (api: AnyApi) => {
  return {
    issuance: memoize((token: Token) =>
      Storage.create<Balance>({
        api,
        path: 'query.tokens.totalIssuance',
        params: [token.toChainData()]
      })
    ),
    stakingLedgers: memoize(() =>
      Storage.create<[StorageKey<[U16]>, Option<AcalaStakingLedge>][]>({
        api,
        path: 'query.homa.stakingLedgers.entries',
        params: []
      })
    ),
    toBondPool: memoize(() =>
      Storage.create<Balance>({
        api,
        path: 'query.homa.toBondPool',
        params: []
      })
    ),
    totalVoidLiquid: memoize(() =>
      Storage.create<Balance>({
        api,
        path: 'query.homa.totalVoidLiquid',
        params: []
      })
    ),
    estimatedRewardRatePerEra: memoize(() =>
      Storage.create<Balance>({
        api,
        path: 'query.homa.estimatedRewardRatePerEra',
        params: []
      })
    ),
    fastMatchFeeRate: memoize(() =>
      Storage.create<Balance>({
        api,
        path: 'query.homa.fastMatchFeeRate',
        params: []
      })
    ),
    mintThreshold: memoize(() =>
      Storage.create<Balance>({
        api,
        path: 'query.homa.mintThreshold',
        params: []
      })
    ),
    redeemThreshold: memoize(() =>
      Storage.create<Balance>({
        api,
        path: 'query.homa.redeemThreshold',
        params: []
      })
    ),
    softBondedCapPerSubAccount: memoize(() =>
      Storage.create<Balance>({
        api,
        path: 'query.homa.softBondedCapPerSubAccount',
        params: []
      })
    ),
    redeemRequests: memoize((address: string) =>
      Storage.create<Option<ITuple<[Balance, Bool]>>>({
        api,
        path: 'query.homa.redeemRequests',
        params: [address]
      })
    ),
    relayChainCurrentEra: memoize(() =>
      Storage.create<EraIndex>({
        api,
        path: 'query.homa.relayChainCurrentEra',
        params: []
      })
    ),
    unbondings: memoize((address: string) =>
      Storage.create<[StorageKey<[AccountId, EraIndex]>, Balance][]>({
        api,
        path: 'query.homa.unbondings.entries',
        params: [address],
        triggleEvents: [{ section: 'homa', method: 'RequestedRedeem' }]
      })
    ),
    commissionRate: memoize(() =>
      Storage.create<Rate>({
        api,
        path: 'query.homa.commissionRate',
        params: []
      })
    )
  };
};
