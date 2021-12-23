import { AnyApi, Token } from '@acala-network/sdk-core';
import { AcalaStakingLedge } from '@acala-network/types/interfaces';
import { StorageKey, U16, Option, Bool } from '@polkadot/types';
import { Balance, EraIndex } from '@polkadot/types/interfaces';
import { Storage } from '../utils/storage';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const createStorages = (api: AnyApi) => {
  return {
    liquidTokenIssuance: (token: Token) =>
      Storage.create<Balance>({
        api,
        path: 'query.tokens.totalIssuance',
        params: [token.toChainData()]
      }),
    stakingLedgers: () =>
      Storage.create<[StorageKey<[U16]>, Option<AcalaStakingLedge>][]>({
        api,
        path: 'query.homa.stakingLedgers.entries',
        params: []
      }),
    toBondPool: () =>
      Storage.create<Balance>({
        api,
        path: 'query.homa.toBondPool',
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
    softBondedCapPerSubAccount: () =>
      Storage.create<Balance>({
        api,
        path: 'query.homa.softBondedCapPerSubAccount',
        params: []
      }),
    redeemRequests: (address: string) =>
      Storage.create<[Balance, Bool]>({
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
      Storage.create<[EraIndex, Balance][]>({
        api,
        path: 'query.homa.unbondings',
        params: [address]
      })
  };
};
