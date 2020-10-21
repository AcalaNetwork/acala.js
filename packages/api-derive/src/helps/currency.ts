import { ApiInterfaceRx } from '@polkadot/api/types';
import { Vec } from '@polkadot/types';
import { CurrencyId } from '@acala-network/types/interfaces';

/**
 * @name getCurrencyIds
 * @description get currency id list.
 */
export function getCurrencyIds (api: ApiInterfaceRx): CurrencyId[] {
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  const keys = api.registry.createType('TokenSymbol' as any).defKeys as string[];

  return keys.map((item) => api.registry.createType('CurrencyId', { token: item }));
}

/**
 * @name getCollateralCurrencyIds
 * @description get collateral currency id list.
 */
export function getCollateralCurrencyIds (api: ApiInterfaceRx): Vec<CurrencyId> {
  return api.consts.cdpEngine.collateralCurrencyIds as Vec<CurrencyId>;
}

/**
 * @name getStableCurrencyId
 * @description get stable coin id.
 */
export function getStableCurrencyId (api: ApiInterfaceRx): CurrencyId {
  return api.consts.cdpTreasury.getStableCurrencyId as CurrencyId;
}

/**
 * @name getNativeCurreencyId
 * @description get native currency id.
 */
export function getNativeCurrencyId (api: ApiInterfaceRx): CurrencyId {
  return api.consts.currencies.nativeCurrencyId as CurrencyId;
}
