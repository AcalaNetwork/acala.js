import { Storage } from '@acala-network/sdk/utils/storage';
import { AnyApi, Token } from '@acala-network/sdk-core';
import { memoize } from '@polkadot/util';
import {
  ModuleLoansPosition,
  ModuleCdpEngineRiskManagementParams,
  AcalaPrimitivesCurrencyCurrencyId
} from '@acala-network/types/interfaces/types-lookup';
import { StorageKey } from '@polkadot/types';

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
      return Storage.create<[StorageKey<[AcalaPrimitivesCurrencyCurrencyId]>, ModuleCdpEngineRiskManagementParams][]>({
        api: api,
        path: 'query.cdpEngine.collateralParams.entries',
        params: []
      });
    })
  };
};
