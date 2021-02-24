import { ApiInterfaceRx } from '@polkadot/api/types';
import { memo } from '@polkadot/api-derive/util';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CurrencyId } from '@acala-network/types/interfaces';
import { Vec } from '@polkadot/types';

function getNativeCurrencyId(api: ApiInterfaceRx): Observable<CurrencyId> {
  return api.rpc.system.properties().pipe(
    switchMap((properties) => {
      const nativeTokenSymbol = properties.tokenSymbol.unwrapOrDefault()[0].toString();

      return of(api.registry.createType('CurrencyId', api.registry.createType('TokenSymbol', nativeTokenSymbol)));
    })
  );
}

/**
 * @name nativeCurrencyId
 * @returns native currencyId
 */
export function nativeCurrencyId(instanceId: string, api: ApiInterfaceRx): () => Observable<CurrencyId> {
  return memo(instanceId, () => {
    return getNativeCurrencyId(api);
  });
}

/**
 * @name stableCurrencyId
 * @returns stable currencyId
 */
export function stableCurrencyId(instanceId: string, api: ApiInterfaceRx): () => Observable<CurrencyId> {
  return memo(instanceId, () => {
    return of(api.consts.cdpEngine.getStableCurrencyId);
  });
}

/**
 * @name liquidCurrencyId
 * @returns liquid currencyId in staking pool
 */
export function liquidCurrencyId(instanceId: string, api: ApiInterfaceRx): () => Observable<CurrencyId> {
  return memo(instanceId, () => {
    return of(api.consts.stakingPool.stakingCurrencyId);
  });
}

/**
 * @name stakingCurrencyId
 * @returns staking currencyId in staking pool
 */
export function stakingCurrencyId(instanceId: string, api: ApiInterfaceRx): () => Observable<CurrencyId> {
  return memo(instanceId, () => {
    return of(api.consts.stakingPool.liquidCurrencyId);
  });
}

function getAllNonNativeCurrencyIds(api: ApiInterfaceRx): Vec<CurrencyId> {
  return (api.consts.transactionPayment.allNonNativeCurrencyIds as unknown) as Vec<CurrencyId>;
}

/**
 * @name allNonNativeCurrencyIds
 * @returns all nonnative currencyIds
 */
export function allNonNativeCurrencyIds(instanceId: string, api: ApiInterfaceRx): () => Observable<Vec<CurrencyId>> {
  return memo(instanceId, () => {
    return of(getAllNonNativeCurrencyIds(api));
  });
}

/**
 * @name allCurrencyIds
 * @returns all currencyIds includes stable curerncyId and all nonnative currencyIds
 */
export function allCurrencyIds(instanceId: string, api: ApiInterfaceRx): () => Observable<CurrencyId[]> {
  return memo(instanceId, () => {
    return getNativeCurrencyId(api).pipe(
      switchMap((nativeCurrencyId) => {
        return of([nativeCurrencyId, ...getAllNonNativeCurrencyIds(api).slice()]);
      })
    );
  });
}

/**
 * @name collateralCurrencyIds
 * @returns allowed collateral currencyIds in cdpEngine
 */
export function collateralCurrencyIds(instanceId: string, api: ApiInterfaceRx): () => Observable<Vec<CurrencyId>> {
  return memo(instanceId, () => {
    return of(api.consts.cdpEngine.collateralCurrencyIds);
  });
}
