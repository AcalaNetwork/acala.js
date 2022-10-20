import { Storage } from '@acala-network/sdk/utils/storage';
import { AnyApi, Token } from '@acala-network/sdk-core';
import { memoize } from '@polkadot/util';
import {
  ModuleLoansPosition,
  ModuleCdpEngineRiskManagementParams,
  AcalaPrimitivesCurrencyCurrencyId
} from '@acala-network/types/interfaces/types-lookup';
import { StorageKey, Option, u128 } from '@polkadot/types';

export const createStorages = (api: AnyApi) => {
  return {
    positions: memoize((token: Token, address: string) => {
      return Storage.create<ModuleLoansPosition>({
        api: api,
        path: 'query.loans.positions',
        params: [token.toChainData(), address]
      });
    }),
    allCollateralParams: memoize(() => {
      return Storage.create<
        [StorageKey<[AcalaPrimitivesCurrencyCurrencyId]>, Option<ModuleCdpEngineRiskManagementParams>][]
      >({
        api: api,
        path: 'query.cdpEngine.collateralParams.entries',
        params: []
      });
    }),
    globalPositions: memoize((token: Token) => {
      return Storage.create<ModuleLoansPosition>({
        api: api,
        path: 'query.loans.totalPositions',
        params: [token.toChainData()]
      });
    }),
    exchangeRate: memoize((token: Token) => {
      return Storage.create<Option<u128>>({
        api: api,
        path: 'query.cdpEngine.debitExchangeRate',
        params: [token.toChainData()]
      });
    })
  };
};
