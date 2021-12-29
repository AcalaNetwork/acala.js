import { AnyApi, Token } from '@acala-network/sdk-core';
import { AcalaStakingLedge, AccountId, Rate } from '@acala-network/types/interfaces';
import { StorageKey, U16, Option, Bool, u32 } from '@polkadot/types';
import { ITuple } from '@polkadot/types/types';
import { Balance, EraIndex } from '@polkadot/types/interfaces';
import { Storage } from '../utils/storage';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const createStorages = (api: AnyApi) => {
  return {
    issuance: (token: Token) =>
      Storage.create<Balance>({
        api,
        path: 'query.tokens.totalIssuance',
        params: [token.toChainData()]
      }),
    stakingLedgers: () =>
      Storage.create<[StorageKey<[U16]>, Option<AcalaStakingLedge>][]>({
        api,
        path: 'query.homa.stakingLedgers.entries',
        params: [],
        triggleEvents: [
          { section: 'homa', method: 'LedgerBondedReset' },
          { section: 'homa', method: 'LedgerUnlockingReset' },
          { section: 'homa', method: 'CurrentEraBumped' },
          { section: 'homa', method: 'CurrentEraReset' }
        ]
      }),
    toBondPool: () =>
      Storage.create<Balance>({
        api,
        path: 'query.homa.toBondPool',
        params: []
      }),
    totalVoidLiquid: () =>
      Storage.create<Balance>({
        api,
        path: 'query.homa.totalVoidLiquid',
        params: []
      }),
    estimatedRewardRatePerEra: () =>
      Storage.create<Balance>({
        api,
        path: 'query.homa.estimatedRewardRatePerEra',
        params: []
      }),
    fastMatchFeeRate: () =>
      Storage.create<Balance>({
        api,
        path: 'query.homa.fastMatchFeeRate',
        params: []
      }),
    mintThreshold: () =>
      Storage.create<Balance>({
        api,
        path: 'query.homa.mintThreshold',
        params: []
      }),
    redeemThreshold: () =>
      Storage.create<Balance>({
        api,
        path: 'query.homa.redeemThreshold',
        params: []
      }),
    softBondedCapPerSubAccount: () =>
      Storage.create<Balance>({
        api,
        path: 'query.homa.softBondedCapPerSubAccount',
        params: []
      }),
    redeemRequests: (address: string) =>
      Storage.create<Option<ITuple<[Balance, Bool]>>>({
        api,
        path: 'query.homa.redeemRequests',
        params: [address]
      }),
    relayChainCurrentEra: () =>
      Storage.create<EraIndex>({
        api,
        path: 'query.homa.relayChainCurrentEra',
        params: []
      }),
    unbondings: (address: string) =>
      Storage.create<[StorageKey<[AccountId, EraIndex]>, Balance][]>({
        api,
        path: 'query.homa.unbondings.entries',
        params: [address],
        triggleEvents: [
          { section: 'homa', method: 'CurrentEraReset' },
          { section: 'homa', method: 'CurrentEraBumped' },
          { section: 'homa', method: 'RequestedRedeem' },
          { section: 'homa', method: 'RedeemedByUnbond' },
          { section: 'homa', method: 'RedeemedByFastMatch' },
          { section: 'homa', method: 'RedeemRequestCancelled' },
          { section: 'homa', method: 'WithdrawRedemption' }
        ]
      }),
    commissionRate: () =>
      Storage.create<Rate>({
        api,
        path: 'query.homa.commissionRate',
        params: []
      }),
    eraFrequency: () =>
      Storage.create<u32>({
        api,
        path: 'query.homa.bumpEraFrequency',
        params: []
      })
  };
};
