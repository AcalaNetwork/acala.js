import { AnyApi } from '@acala-network/sdk-core';
import { StorageKey, u32, Vec, Option, u128, BTreeMap } from '@polkadot/types';
import { Balance } from '@acala-network/types/interfaces/runtime/types';
import { AcalaPrimitivesCurrencyCurrencyId, ModuleSupportIncentivesPoolId, OrmlRewardsPoolInfo, PalletSchedulerScheduled } from '@polkadot/types/lookup';
export declare const createStorages: (api: AnyApi) => {
    scheduler: () => import("@acala-network/sdk/utils/storage/storage.js").SubStorage<[StorageKey<[u32]>, Vec<Option<PalletSchedulerScheduled>>][]>;
    incentiveRewardAmounts: () => import("@acala-network/sdk/utils/storage/storage.js").SubStorage<[StorageKey<[ModuleSupportIncentivesPoolId, AcalaPrimitivesCurrencyCurrencyId]>, Balance][]>;
    poolInfos: () => import("@acala-network/sdk/utils/storage/storage.js").SubStorage<[StorageKey<[ModuleSupportIncentivesPoolId]>, OrmlRewardsPoolInfo][]>;
    claimRewardDeductionRates: () => import("@acala-network/sdk/utils/storage/storage.js").SubStorage<[StorageKey<[ModuleSupportIncentivesPoolId]>, u128][]>;
    userSharesAndWithdrawnRewards: (id: ModuleSupportIncentivesPoolId, address: string) => import("@acala-network/sdk/utils/storage/storage.js").SubStorage<[u128, BTreeMap<AcalaPrimitivesCurrencyCurrencyId, Balance>]>;
    pendingRewards: (id: ModuleSupportIncentivesPoolId, address: string) => import("@acala-network/sdk/utils/storage/storage.js").SubStorage<BTreeMap<AcalaPrimitivesCurrencyCurrencyId, Balance>>;
};
