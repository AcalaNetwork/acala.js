import { AnyApi, Token, forceToCurrencyName } from '@acala-network/sdk-core';
import { TradingPair, TradingPairStatus } from '@acala-network/types/interfaces';
import { StorageKey, Option, u16 } from '@polkadot/types';
import { AccountInfo, Balance, H160 } from '@polkadot/types/interfaces';
import { OrmlAccountData } from '@open-web3/orml-types/interfaces';
import { Storage } from '../utils/storage';
import {
  ModuleAssetRegistryModuleAssetIds,
  ModuleAssetRegistryModuleAssetMetadata,
  XcmV1MultiLocation
} from '@acala-network/types/interfaces/types-lookup';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const createStorages = (api: AnyApi) => {
  return {
    foreignAssetLocations: () =>
      Storage.create<[StorageKey<[u16]>, Option<XcmV1MultiLocation>][]>({
        api: api,
        path: 'query.assetRegistry.foreignAssetLocations.entries',
        params: []
      }),
    assetMetadatas: () =>
      Storage.create<
        [StorageKey<[ModuleAssetRegistryModuleAssetIds]>, Option<ModuleAssetRegistryModuleAssetMetadata>][]
      >({
        api: api,
        path: 'query.assetRegistry.assetMetadatas.entries',
        params: []
      }),
    tradingPairs: () =>
      Storage.create<[StorageKey<[TradingPair]>, TradingPairStatus][]>({
        api: api,
        path: 'query.dex.tradingPairStatuses.entries',
        params: []
      }),
    nativeBalance: (address: string) =>
      Storage.create<AccountInfo>({
        api: api,
        path: 'query.system.account',
        params: [address]
      }),
    nonNativeBalance: (token: Token, address: string) =>
      Storage.create<OrmlAccountData>({
        api: api,
        path: 'query.tokens.accounts',
        params: [address, token.toChainData()]
      }),
    issuance: (token: Token) => {
      const nativeTokenName = api.registry.chainTokens[0];

      const isNativeToken = forceToCurrencyName(nativeTokenName) === forceToCurrencyName(token);

      return Storage.create<Balance>({
        api: api,
        path: isNativeToken ? 'query.balances.totalIssuance' : 'query.tokens.totalIssuance',
        params: isNativeToken ? [] : [token.toChainData()]
      });
    },
    evmAddress: (address: string) =>
      Storage.create<Option<H160>>({
        api: api,
        path: 'query.evmAccounts.evmAddresses',
        params: [address]
      })
  };
};
