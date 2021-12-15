import { CurrencyId, TokenSymbol } from '@acala-network/types/interfaces';
import { isArray } from 'lodash';
import { TokenType } from '.';
import {
  ConvertToCurrencyIdFailed,
  ConvertToCurrencyNameFailed,
  NotDexShareName,
  NotStableAssetPoolName
} from './errors';
import { Token } from './token';
import { AnyApi, CurrencyObject, MaybeCurrency } from './types';

/**
 *  we set a name with a prefix to all types of tokens for easy passing and use.
 *  e.g.
 *  { DexShare: [{ Token: KAR }, { Token: KSM }] } is lp://KAR/KSM
 *  { stableAsset: 0 } is sa://0
 *  { foreignAsset: 0 } is fa://0
 *  { ERC20: '0x100000000' } is erc20://0x10000
 *  we can also combine these name for complex types
 *  e.g.
 *  lp://${encode(lp://KAR/KSM)}/${encode(sa://0)} is { DexShare: [ { DexShare: [{ Token: 'KAR' }, { Token: 'KSM}] }, { stableAsset: 0 } ] }
 */

// for dex share
export function createDexShareName(name1: string, name2: string): string {
  return `lp://${encodeURIComponent(name1)}/${encodeURIComponent(name2)}`;
}

export function isDexShareName(name: string): boolean {
  return name.startsWith('lp://');
}
/**
 * @name unzipDexShareName
 * @description unzip dex share name to two token name, e.g. lp://KAR/KSM -> [KAR, KSM];
 */
export function unzipDexShareName(name: string): [string, string] {
  if (!isDexShareName(name)) throw new NotDexShareName(name);

  const reg = /^lp:\/\/([^/]*)?\/([^/]*)$/;

  const result = reg.exec(name);

  if (!result) throw new NotDexShareName(name);

  return [decodeURIComponent(result[1]), decodeURIComponent(result[2])] as [string, string];
}

// for stable asset
export function createStableAssetName(id: number): string {
  return `sa://${id}`;
}

export function isStableAssetName(name: string): boolean {
  return name.startsWith('sa://');
}

export function getStableAssetPoolIdFromName(name: string): number {
  if (!isStableAssetName(name)) throw new NotStableAssetPoolName(name);

  return parseInt(name.replace('sa://', ''));
}

// for foreign asset
export function createForeignAssetName(id: number): string {
  return `fa://${id}`;
}

export function isForeignAssetName(name: string): boolean {
  return name.startsWith('fa://');
}

export function getForeignAssetIdFromName(name: string): number {
  if (!isForeignAssetName(name)) throw new NotStableAssetPoolName(name);

  return parseInt(name.replace('fa://', ''));
}

export function getCurrencyTypeByName(name: string): TokenType {
  if (isStableAssetName(name)) return TokenType.STABLE_ASSET_POOL_TOKEN;

  if (isDexShareName(name)) return TokenType.DEX_SHARE;

  if (isForeignAssetName(name)) return TokenType.FOREIGN_ASSET;

  if (isDexShareName(name)) return TokenType.DEX_SHARE;

  // FIXME: doesn't handle ERC20 and other types
  return TokenType.BASIC;
}

export function getBasicCurrencyObject(name: string): CurrencyObject {
  return { Token: name };
}

export function getStableAssetCurrencyObject(name: string): CurrencyObject {
  return { StableAssetPoolToken: getStableAssetPoolIdFromName(name) };
}

export function getForeignAssetCurrencyObject(name: string): CurrencyObject {
  return { ForeignAsset: getForeignAssetIdFromName(name) };
}

export function getDexShareCurrencyObject(name: string): CurrencyObject {
  const inner = (name: string): CurrencyObject => {
    if (isDexShareName(name)) {
      const [name1, name2] = unzipDexShareName(name);

      return { DexShare: [inner(name1), inner(name2)] };
    }

    if (isForeignAssetName(name)) {
      return getForeignAssetCurrencyObject(name);
    }

    if (isStableAssetName(name)) {
      return getStableAssetCurrencyObject(name);
    }

    // FIXME: not handle ERC20 and LiquidCroadloan token
    return getBasicCurrencyObject(name);
  };

  return inner(name);
}

export function getCurrencyObject(name: string): CurrencyObject {
  if (isDexShareName(name)) return getDexShareCurrencyObject(name);

  if (isForeignAssetName(name)) return getForeignAssetCurrencyObject(name);

  if (isStableAssetName(name)) return getStableAssetCurrencyObject(name);

  // FIXME: not handle ERC20 and LiquidCroadloan token
  return getBasicCurrencyObject(name);
}

/**
 * we also support some functions with `force` prefix to convert string/number to some specific type
 */

/**
 * @name forceToCurrencyName
 * @description convert `maybeCurrency` to currency name
 */
export function forceToCurrencyName(target: MaybeCurrency): string {
  try {
    if (typeof target === 'string') return target;

    if (Array.isArray(target)) return createDexShareName(target[0], target[1]);

    if (target instanceof Token) return target.toString();

    if ((target as CurrencyId).isToken) return (target as CurrencyId).asToken.toString();

    if ((target as CurrencyId).isDexShare) {
      return createDexShareName(
        forceToCurrencyName((target as CurrencyId).asDexShare[0] as CurrencyId),
        forceToCurrencyName((target as CurrencyId).asDexShare[1] as CurrencyId)
      );
    }

    // FIXME: should handle erc20
    if ((target as CurrencyId).isErc20) return (target as CurrencyId).asErc20.toString();

    if ((target as CurrencyId).isStableAssetPoolToken)
      return createStableAssetName((target as CurrencyId).asStableAssetPoolToken.toNumber());

    if ((target as CurrencyId).isForeignAsset)
      return createForeignAssetName((target as CurrencyId).asForeignAsset.toNumber());

    return target.toString();
  } catch (e) {
    throw new ConvertToCurrencyNameFailed(target);
  }
}

export function forceToCurrencyId(api: AnyApi, target: MaybeCurrency): CurrencyId {
  try {
    const name = forceToCurrencyName(target);

    return api.createType('AcalaPrimitivesCurrencyCurrencyId', getCurrencyObject(name)) as unknown as CurrencyId;
  } catch (e) {
    throw new ConvertToCurrencyIdFailed(origin);
  }
}

export const forceToTokenSymbolCurrencyId = (
  api: AnyApi,
  target: string | Token | CurrencyId | TokenSymbol
): CurrencyId => {
  const name = target.toString();

  return forceToCurrencyId(api, name);
};

export const forceToDexShareCurrencyId = (api: AnyApi, target: [string, string] | CurrencyId): CurrencyId => {
  let name = '';

  if (isArray(target)) {
    name = createDexShareName(target[0], target[1]);
  } else {
    name = forceToCurrencyName(target);
  }

  return forceToCurrencyId(api, name);
};

export const forceToStableAssetCurrencyId = (api: AnyApi, target: number | CurrencyId): CurrencyId => {
  let name = '';

  if (typeof target === 'number') {
    name = createStableAssetName(target);
  } else {
    name = forceToCurrencyName(target);
  }

  return forceToCurrencyId(api, name);
};

export const forceToForeignAssetCurrencyId = (api: AnyApi, target: number | CurrencyId): CurrencyId => {
  let name = '';

  if (typeof target === 'number') {
    name = createForeignAssetName(target);
  } else {
    name = forceToCurrencyName(target);
  }

  return forceToCurrencyId(api, name);
};
