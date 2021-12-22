import { AnyApi, Token } from '@acala-network/sdk-core';
import { AcalaStakingLedge } from '@acala-network/types/interfaces';
import { StorageKey, U16, Option } from '@polkadot/types';
import { Balance } from '@polkadot/types/interfaces';
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
      })
  };
};
