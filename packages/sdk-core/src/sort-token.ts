import {
  isDexShareName,
  isForeignAssetName,
  isStableAssetName,
  isBasicToken,
  getStableAssetPoolIdFromName,
  getForeignAssetIdFromName,
  unzipDexShareName
} from '.';
import primitivesConfig from '@acala-network/type-definitions/primitives';

const TOKEN_TYPE_WEIGHTS = {
  tokenSymbol: 9,
  dexShare: 8,
  erc20: 7,
  stableAssetPool: 6,
  liquidCroadloan: 5,
  foreignAsset: 4
};

export function getTokenTypeWeight(name: string): number {
  let weight = 0;

  if (isBasicToken(name)) {
    weight = TOKEN_TYPE_WEIGHTS.tokenSymbol;
  }

  if (isDexShareName(name)) {
    weight = TOKEN_TYPE_WEIGHTS.dexShare;
  }

  if (isStableAssetName(name)) {
    weight = TOKEN_TYPE_WEIGHTS.stableAssetPool;
  }

  if (isForeignAssetName(name)) {
    weight = TOKEN_TYPE_WEIGHTS.foreignAsset;
  }

  return 1000 * weight;
}
const TOKEN_SORT: Record<string, number> = primitivesConfig.types.TokenSymbol._enum;

export function sortTokenByName(a: string, b: string): number {
  let weightA = 0;
  let weightB = 0;

  weightA += getTokenTypeWeight(a);
  weightB += getTokenTypeWeight(b);

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

  if (isDexShareName(a) && isDexShareName(b)) {
    const [a0, a1] = unzipDexShareName(a);
    const [b0, b1] = unzipDexShareName(b);

    const [result0, result1] = [sortTokenByName(a0, a1), sortTokenByName(b0, b1)];

    if (a0 === b1) return result1;

    return result0;
  }

  return 0;
}
