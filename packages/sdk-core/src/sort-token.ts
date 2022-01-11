import {
  isDexShareName,
  isForeignAssetName,
  isStableAssetName,
  isBasicToken,
  getStableAssetPoolIdFromName,
  getForeignAssetIdFromName,
  unzipDexShareName,
  getCurrencyTypeByName,
  isLiquidCroadloanName,
  getLiquidCroadloanIdFromName
} from '.';
import primitivesConfig from '@acala-network/type-definitions/primitives';
import { TokenType } from './types';

const TOKEN_TYPE_WEIGHTS = {
  [TokenType.BASIC]: 9,
  [TokenType.DEX_SHARE]: 8,
  [TokenType.ERC20]: 7,
  [TokenType.STABLE_ASSET_POOL_TOKEN]: 6,
  [TokenType.LIQUID_CROADLOAN]: 5,
  [TokenType.FOREIGN_ASSET]: 4
};

export function getTokenTypeWeight(name: string): number {
  return 1000 * (TOKEN_TYPE_WEIGHTS[getCurrencyTypeByName(name)] || 0);
}

const TOKEN_SORT: Record<string, number> = primitivesConfig.types.TokenSymbol._enum;

export function sortTokenByName(a: string, b: string): number {
  const weightA = getTokenTypeWeight(a);
  const weightB = getTokenTypeWeight(b);

  if (weightA !== weightB) {
    return weightB - weightA;
  }

  if (isBasicToken(a) && isBasicToken(b)) {
    return TOKEN_SORT[a] - TOKEN_SORT[b];
  }

  if (isStableAssetName(a) && isStableAssetName(b)) {
    return getStableAssetPoolIdFromName(a) - getStableAssetPoolIdFromName(b);
  }

  if (isForeignAssetName(a) && isForeignAssetName(b)) {
    return getForeignAssetIdFromName(a) - getForeignAssetIdFromName(b);
  }

  if (isLiquidCroadloanName(a) && isLiquidCroadloanName(b)) {
    return getLiquidCroadloanIdFromName(a) - getLiquidCroadloanIdFromName(b);
  }

  if (isDexShareName(a) && isDexShareName(b)) {
    const [a0, a1] = unzipDexShareName(a);
    const [b0, b1] = unzipDexShareName(b);

    const [result0, result1] = [sortTokenByName(a0, a1), sortTokenByName(b0, b1)];

    if (a0 === b0) return result1;

    return result0;
  }

  return 0;
}
