import { AnyApi, forceToCurrencyName, Token } from '@acala-network/sdk-core';
import { Storage } from '../utils/storage';
import { StorageKey, U128 } from '@polkadot/types';
import { OrmlAccountData } from '@open-web3/orml-types/interfaces';
import { AcalaPrimitivesTradingPair, ModuleDexTradingPairStatus } from '@polkadot/types/lookup';
import { getNativeTokenName } from '../utils/get-native-token-name';
import { ITuple } from '@polkadot/types/types';
import { Balance } from '@acala-network/types/interfaces';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const createStorages = (api: AnyApi) => {
  return {
    liquidityPool: (dexShareToken: Token) => {
      return Storage.create<ITuple<[U128, U128]>>({
        api: api,
        path: 'query.dex.liquidityPool',
        params: [dexShareToken.toTradingPair(api)]
      });
    },
    initialShareExchangeRates: (dexShareToken: Token) => {
      return Storage.create({
        api: api,
        path: 'query.dex.initialShareExchangeRates',
        params: [dexShareToken.toTradingPair(api)]
      });
    },
    provisioningPool: (address: string, dexShareToken: Token) => {
      return Storage.create({
        api: api,
        path: 'query.dex.provisioningPool',
        params: [address, dexShareToken.toTradingPair(api)]
      });
    },
    tradingPairs: () => {
      return Storage.create<[StorageKey<[AcalaPrimitivesTradingPair]>, ModuleDexTradingPairStatus][]>({
        api: api,
        path: 'query.dex.tradingPairStatuses.entries',
        params: []
      });
    },
    issuance: (token: Token) => {
      const nativeTokenName = getNativeTokenName(api);
      const isNativeToken = nativeTokenName === forceToCurrencyName(token);

      return Storage.create<Balance>({
        api: api,
        path: isNativeToken ? 'query.balances.totalIssuance' : 'query.tokens.totalIssuance',
        params: isNativeToken ? [] : [token.toChainData()]
      });
    },
    balance: (address: string, token: Token) => {
      return Storage.create<OrmlAccountData>({
        api: api,
        path: 'query.tokens.accounts',
        params: [address, token.toChainData()]
      });
    }
  };
};
