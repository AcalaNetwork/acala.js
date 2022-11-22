import { AnyApi } from '@acala-network/sdk-core';
import { StorageKey, Option, u32 } from '@polkadot/types';
import { Storage } from '../utils/storage';
import {
  ModuleAuctionManagerCollateralAuctionItem,
  OrmlTraitsAuctionAuctionInfo
} from '@polkadot/types/lookup';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const createAuctionStorages = (api: AnyApi) => {
  return {
    collateralAuctions: (id: number | string) =>
      Storage.create<Option<ModuleAuctionManagerCollateralAuctionItem>>({
        api: api,
        path: 'query.auctionManager.collateralAuctions',
        params: [id]
      }),
    auction: (id: number | string) =>
      Storage.create<Option<OrmlTraitsAuctionAuctionInfo>>({
        api: api,
        path: 'query.auction.auctions',
        params: [id]
      })
  };
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const createAuctionManagerStorages = (api: AnyApi) => {
  return {
    auctions: () =>
      Storage.create<StorageKey<u32[]>[]>({
        api: api,
        path: 'query.auctionManager.collateralAuctions.keys',
        params: [],
        events: [{ method: 'NewCollateralAuction', section: 'auctionManager' }]
      })
  };
};
