import { AnyApi } from '@acala-network/sdk-core';
import { Storage } from '../utils/storage';
import { StorageKey, u32, Vec, Option, u128, BTreeMap } from '@polkadot/types';
import { Balance } from '@acala-network/types/interfaces';
import {
  AcalaPrimitivesCurrencyCurrencyId,
  ModuleIncentivesPoolId,
  OrmlRewardsPoolInfo,
  PalletSchedulerScheduledV3
} from '@acala-network/types/interfaces/types-lookup';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const createStorages = (api: AnyApi) => {
  return {
    scheduler: () => {
      return Storage.create<[StorageKey<[u32]>, Vec<Option<PalletSchedulerScheduledV3>>][]>({
        api: api,
        path: 'query.scheduler.agenda.entries',
        params: []
      });
    },
    dexSavingRewardRates: () => {
      return Storage.create<[StorageKey<[ModuleIncentivesPoolId]>, u128][]>({
        api: api,
        path: 'query.incentives.dexSavingRewardRates.entries',
        params: []
      });
    },
    incentiveRewardAmounts: () => {
      return Storage.create<[StorageKey<[ModuleIncentivesPoolId, AcalaPrimitivesCurrencyCurrencyId]>, Balance][]>({
        api: api,
        path: 'query.incentives.incentiveRewardAmounts.entries',
        params: []
      });
    },
    poolInfos: () => {
      return Storage.create<[StorageKey<[ModuleIncentivesPoolId]>, OrmlRewardsPoolInfo][]>({
        api: api,
        path: 'query.rewards.poolInfos.entries',
        params: []
      });
    },
    claimRewardDeductionRates: () => {
      return Storage.create<[StorageKey<[ModuleIncentivesPoolId]>, u128][]>({
        api: api,
        path: 'query.incentives.claimRewardDeductionRates.entries',
        params: []
      });
    },
    userSharesAndWithdrawnRewards: (id: ModuleIncentivesPoolId, address: string) => {
      return Storage.create<[u128, BTreeMap<AcalaPrimitivesCurrencyCurrencyId, Balance>]>({
        api: api,
        path: 'query.rewards.sharesAndWithdrawnRewards',
        params: [id, address]
      });
    },
    pendingRewards: (id: ModuleIncentivesPoolId, address: string) => {
      return Storage.create<BTreeMap<AcalaPrimitivesCurrencyCurrencyId, Balance>>({
        api: api,
        path: 'query.incentives.pendingMultiRewards',
        params: [id, address]
      });
    }
  };
};
