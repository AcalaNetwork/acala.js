import { ApiInterfaceRx } from '@polkadot/api/types';
import { Vec } from '@polkadot/types';
import { CurrencyId } from '@acala-network/types/interfaces';

/**
 * @name getCurrencyIds
 * @description get currency id list.
 */
export function getCurrencyIds (api: ApiInterfaceRx): string[] {
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  return api.registry.createType('CurrencyId' as any).defKeys;
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
