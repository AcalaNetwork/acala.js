import { Storage } from '@acala-network/sdk/utils/storage/index';
import { AnyApi, Token } from '@acala-network/sdk-core';
import {
  AcalaPrimitivesPosition,
  ModuleCdpEngineRiskManagementParams,
  AcalaPrimitivesCurrencyCurrencyId
} from '@polkadot/types/lookup';
import { StorageKey, Option, u128 } from '@polkadot/types';

export const createStorages = (api: AnyApi) => {
  return {
    positions: (token: Token, address: string) => {
      return Storage.create<AcalaPrimitivesPosition>({
        api: api,
        path: 'query.loans.positions',
        params: [token.toChainData(), address]
      });
    },
    allCollateralParams: () => {
      return Storage.create<
        [StorageKey<[AcalaPrimitivesCurrencyCurrencyId]>, Option<ModuleCdpEngineRiskManagementParams>][]
      >({
        api: api,
        path: 'query.cdpEngine.collateralParams.entries',
        params: []
      });
    },
    globalPositions: (token: Token) => {
      return Storage.create<AcalaPrimitivesPosition>({
        api: api,
        path: 'query.loans.totalPositions',
        params: [token.toChainData()]
      });
    },
    exchangeRate: (token: Token) => {
      return Storage.create<Option<u128>>({
        api: api,
        path: 'query.cdpEngine.debitExchangeRate',
        params: [token.toChainData()]
      });
    }
  };
};
