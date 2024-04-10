import { AnyApi } from '@acala-network/sdk-core';
import { StorageKey, Option, u32 } from '@polkadot/types';
import { ModuleAuctionManagerCollateralAuctionItem, OrmlTraitsAuctionAuctionInfo } from '@polkadot/types/lookup';
export declare const createAuctionStorages: (api: AnyApi) => {
    collateralAuctions: (id: number | string) => import("@acala-network/sdk/utils/storage/storage.js").SubStorage<Option<ModuleAuctionManagerCollateralAuctionItem>>;
    auction: (id: number | string) => import("@acala-network/sdk/utils/storage/storage.js").SubStorage<Option<OrmlTraitsAuctionAuctionInfo>>;
};
export declare const createAuctionManagerStorages: (api: AnyApi) => {
    auctions: () => import("@acala-network/sdk/utils/storage/storage.js").SubStorage<StorageKey<u32[]>[]>;
};
