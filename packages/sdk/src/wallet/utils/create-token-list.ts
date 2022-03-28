import {
  createForeignAssetName,
  Token,
  TokenType,
  FixedPointNumber as FN,
  forceToCurrencyName,
  createStableAssetName,
  createERC20Name
} from '@acala-network/sdk-core';
import { TradingPair, TradingPairStatus } from '@acala-network/types/interfaces';
import { Option, StorageKey, u16 } from '@polkadot/types';
import {
  ModuleAssetRegistryModuleAssetIds,
  ModuleAssetRegistryModuleAssetMetadata,
  XcmV1MultiLocation
} from '@polkadot/types/lookup';
import { hexToString } from '@polkadot/util';
import { TokenRecord } from '../type';

function extractLocation(key: number, data: [StorageKey<[u16]>, Option<XcmV1MultiLocation>][]) {
  const location = data.find((item) => item[0].args[0].toNumber() === key)?.[1]?.unwrapOrDefault();

  if (!location) return;

  const paraChainId = location.interior.isX1
    ? location.interior.asX1.asParachain.toNumber()
    : location.interior.isX3
    ? location.interior.asX3.find((item) => item.isParachain)?.asParachain.toNumber()
    : location.interior.isX2
    ? location.interior.asX2.find((item) => item.isParachain)?.asParachain.toNumber()
    : undefined;

  const generalIndex = location.interior.isX3
    ? location.interior.asX3.find((item) => item.isGeneralIndex)?.asGeneralIndex.toNumber()
    : undefined;

  const palletInstance = location.interior.isX3
    ? location.interior.asX3.find((item) => item.isPalletInstance)?.asPalletInstance.toNumber()
    : undefined;

  return {
    paraChainId,
    generalIndex,
    palletInstance
  };
}

export function createTokenList(
  basicTokens: TokenRecord,
  tradingPairs: [StorageKey<[TradingPair]>, TradingPairStatus][],
  assetMetadata: [StorageKey<[ModuleAssetRegistryModuleAssetIds]>, Option<ModuleAssetRegistryModuleAssetMetadata>][],
  foreignAssetLocations: [StorageKey<[u16]>, Option<XcmV1MultiLocation>][]
): TokenRecord {
  // tokens list temp
  let temp: TokenRecord = { ...basicTokens };

  const erc20Tokens = Object.fromEntries(
    assetMetadata
      .filter((item) => {
        return item[0].args[0].isErc20;
      })
      .map((item) => {
        const key = item[0].args[0].asErc20.toString();
        const value = item[1].unwrapOrDefault();
        const name = createERC20Name(key);
        const decimals = value.decimals.toNumber();

        return [
          name,
          Token.create(name, {
            type: TokenType.ERC20,
            display: hexToString(value.name.toHex()),
            symbol: hexToString(value.symbol.toHex()),
            decimals,
            ed: FN.fromInner(value.minimalBalance.toString(), decimals)
          })
        ];
      })
  );

  const stableCoinTokens = Object.fromEntries(
    assetMetadata
      .filter((item) => {
        return item[0].args[0].isStableAssetId;
      })
      .map((item) => {
        const key = item[0].args[0].asStableAssetId.toNumber();
        const value = item[1].unwrapOrDefault();
        const name = createStableAssetName(key);
        const decimals = value.decimals.toNumber();

        return [
          name,
          Token.create(name, {
            type: TokenType.STABLE_ASSET_POOL_TOKEN,
            display: hexToString(value.name.toHex()),
            symbol: hexToString(value.symbol.toHex()),
            decimals,
            ed: FN.fromInner(value.minimalBalance.toString(), decimals)
          })
        ];
      })
  );

  const foreignTokens = Object.fromEntries(
    assetMetadata
      .filter((item) => {
        return item[0].args[0].isForeignAssetId;
      })
      .map((item) => {
        const key = item[0].args[0].asForeignAssetId.toNumber();
        const value = item[1].unwrapOrDefault();
        const name = createForeignAssetName(key);
        const decimals = value.decimals.toNumber();

        return [
          name,
          Token.create(name, {
            type: TokenType.FOREIGN_ASSET,
            display: hexToString(value.name.toHex()),
            symbol: hexToString(value.symbol.toHex()),
            decimals,
            ed: FN.fromInner(value.minimalBalance.toString(), decimals),
            // TODO: should support other locations
            locations: extractLocation(key, foreignAssetLocations)
          })
        ];
      })
  );

  // insert foreign tokens to temp
  temp = { ...temp, ...foreignTokens, ...stableCoinTokens, ...erc20Tokens };

  // handle dex share at latest
  const dexShareTokens = Object.fromEntries(
    tradingPairs
      .filter((item) => [item[1].isEnabled])
      .map((item) => {
        const pair = item[0].args[0];
        const token1Name = forceToCurrencyName(pair[0]);
        const token2Name = forceToCurrencyName(pair[1]);
        const token1 = temp[token1Name];
        const token2 = temp[token2Name];

        const token = Token.fromTokens(token1, token2, {
          display: `LP: ${token1.display}-${token2.display}`
        });

        return [token.name, token];
      })
  );

  // insert dex share tokens to temp
  temp = { ...temp, ...dexShareTokens };

  return temp;
}
