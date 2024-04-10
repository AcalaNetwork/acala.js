import { AnyApi, Token } from '@acala-network/sdk-core';
import { AcalaStakingLedge, AccountId, Rate } from '@acala-network/types/interfaces/index';
import { StorageKey, U16, Option, Bool, u32, u128 } from '@polkadot/types';
import { ITuple } from '@polkadot/types/types';
import { Balance, EraIndex } from '@polkadot/types/interfaces';
export declare const createStorages: (api: AnyApi) => {
    issuance: (token: Token) => import("@acala-network/sdk/utils/storage/storage.js").SubStorage<Balance>;
    totalStakingBonded: () => import("@acala-network/sdk/utils/storage/storage.js").SubStorage<u128>;
    stakingLedgers: () => import("@acala-network/sdk/utils/storage/storage.js").SubStorage<[StorageKey<[U16]>, Option<AcalaStakingLedge>][]>;
    toBondPool: () => import("@acala-network/sdk/utils/storage/storage.js").SubStorage<u128>;
    totalVoidLiquid: () => import("@acala-network/sdk/utils/storage/storage.js").SubStorage<Balance>;
    estimatedRewardRatePerEra: () => import("@acala-network/sdk/utils/storage/storage.js").SubStorage<Balance>;
    fastMatchFeeRate: () => import("@acala-network/sdk/utils/storage/storage.js").SubStorage<Balance>;
    softBondedCapPerSubAccount: () => import("@acala-network/sdk/utils/storage/storage.js").SubStorage<Balance>;
    redeemRequests: (address: string) => import("@acala-network/sdk/utils/storage/storage.js").SubStorage<Option<ITuple<[Balance, Bool]>>>;
    relayChainCurrentEra: () => import("@acala-network/sdk/utils/storage/storage.js").SubStorage<EraIndex>;
    unbondings: (address: string) => import("@acala-network/sdk/utils/storage/storage.js").SubStorage<[StorageKey<[AccountId, EraIndex]>, Balance][]>;
    commissionRate: () => import("@acala-network/sdk/utils/storage/storage.js").SubStorage<Rate>;
    eraFrequency: () => import("@acala-network/sdk/utils/storage/storage.js").SubStorage<u32>;
};
