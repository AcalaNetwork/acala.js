import { AnyApi, Token } from '@acala-network/sdk-core';
import { StorageKey, U128 } from '@polkadot/types';
import { AcalaPrimitivesTradingPair, ModuleDexTradingPairStatus, OrmlTokensAccountData } from '@polkadot/types/lookup';
import { ITuple } from '@polkadot/types/types';
import { Balance } from '@acala-network/types/interfaces/runtime/types';
export declare const createStorages: (api: AnyApi) => {
    liquidityPool: (dexShareToken: Token) => import("@acala-network/sdk/utils/storage/storage.js").SubStorage<ITuple<[U128, U128]>>;
    initialShareExchangeRates: (dexShareToken: Token) => import("@acala-network/sdk/utils/storage/storage.js").SubStorage<unknown>;
    provisioningPool: (address: string, dexShareToken: Token) => import("@acala-network/sdk/utils/storage/storage.js").SubStorage<unknown>;
    tradingPairs: () => import("@acala-network/sdk/utils/storage/storage.js").SubStorage<[StorageKey<[AcalaPrimitivesTradingPair]>, ModuleDexTradingPairStatus][]>;
    issuance: (token: Token) => import("@acala-network/sdk/utils/storage/storage.js").SubStorage<Balance>;
    balance: (address: string, token: Token) => import("@acala-network/sdk/utils/storage/storage.js").SubStorage<OrmlTokensAccountData>;
};
