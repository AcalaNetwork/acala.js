import { ApiInterfaceRx } from '@polkadot/api/types';
import { Vec } from '@polkadot/types';
import { CurrencyId } from '@acala-network/types/interfaces/runtime';

/**
 * @name currencyIds
 * @description get currency id list.
 */
export function getCurrencyIds (api: ApiInterfaceRx): string[] {
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  return api.registry.createType('CurrencyId' as any).defKeys;
}

/**
 * @name collateralCurrencyIds
 * @description get collateral currency id list.
 */
export function getCollateralCurrencyIds (api: ApiInterfaceRx): Vec<CurrencyId> {
  return api.consts.cdpEngine.collateralCurrencyIds as Vec<CurrencyId>;
}

/**
 * @name stableCoinId
 * @description get stable coin id.
 */
export function getStableCoinId (api: ApiInterfaceRx): CurrencyId {
  return api.consts.cdpTreasury.getStableCurrencyId as CurrencyId;
}

/**
 * @name nativeCurreencyId
 * @description get native currency id.
 */
export function getNativeCurrencyId (api: ApiInterfaceRx): CurrencyId {
  return api.consts.currencies.nativeCurrencyId as CurrencyId;
}
