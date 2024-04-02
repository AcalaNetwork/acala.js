import {
  createForeignAssetName,
  Token,
  TokenType,
  FixedPointNumber as FN,
  forceToCurrencyName,
  createStableAssetName,
  createERC20Name,
  createLiquidCrowdloanName
} from '@acala-network/sdk-core';
import { Option, StorageKey, u16 } from '@polkadot/types';
import {
  AcalaPrimitivesTradingPair,
  ModuleDexTradingPairStatus,
  AcalaPrimitivesCurrencyAssetIds,
  AcalaPrimitivesCurrencyAssetMetadata,
  XcmV3MultiLocation
} from '@polkadot/types/lookup';
import { hexToString } from '@polkadot/util';
import { TokenRecord } from '../types.js';

function extractLocation(key: number, data: [StorageKey<[u16]>, Option<XcmV3MultiLocation>][]) {
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

interface Configs {
  kusd2ausd: boolean;
  insertLCDOT: boolean;
}

export function createTokenList(
  tradingPairs: [StorageKey<[AcalaPrimitivesTradingPair]>, ModuleDexTradingPairStatus][],
  assetMetadata: [StorageKey<[AcalaPrimitivesCurrencyAssetIds]>, Option<AcalaPrimitivesCurrencyAssetMetadata>][],
  foreignAssetLocations: [StorageKey<[u16]>, Option<XcmV3MultiLocation>][],
  configs: Configs
): TokenRecord {
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
            fullname: hexToString(value.name.toHex()),
            display: hexToString(value.symbol.toHex()),
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
            fullname: hexToString(value.name.toHex()),
            display: hexToString(value.symbol.toHex()),
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
            fullname: hexToString(value.name.toHex()),
            symbol: hexToString(value.symbol.toHex()),
            display: hexToString(value.symbol.toHex()),
            decimals,
            ed: FN.fromInner(value.minimalBalance.toString(), decimals),
            // TODO: should support other locations
            locations: extractLocation(key, foreignAssetLocations)
          })
        ] as const;
      })
      .filter((i) => {
        return i[1].symbol !== 'WETH' && i[1].symbol !== 'WBTC';
      })
  );

  const nativeTokens = Object.fromEntries(
    assetMetadata
      .filter((item) => item[0].args[0].isNativeAssetId)
      .map((item) => {
        const value = item[1].unwrapOrDefault();
        const name = forceToCurrencyName(item[0].args[0].asNativeAssetId);
        const decimals = value.decimals.toNumber();
        const display = name === 'KUSD' && configs.kusd2ausd ? 'aUSD' : hexToString(value.symbol.toHex());

        return [
          name,
          Token.create(name, {
            type: TokenType.BASIC,
            fullname: hexToString(value.name.toHex()),
            display: display,
            symbol: hexToString(value.symbol.toHex()),
            decimals,
            ed: FN.fromInner(value.minimalBalance.toString(), decimals)
          })
        ];
      })
  );

  // insert foreign tokens to temp
  let temp = { ...nativeTokens, ...foreignTokens, ...stableCoinTokens, ...erc20Tokens };

  // inert lcdot to temp
  if (configs.insertLCDOT && temp.DOT) {
    const name = createLiquidCrowdloanName(13);

    temp[name] = Token.create(name, {
      type: TokenType.LIQUID_CROWDLOAN,
      display: 'lcDOT',
      symbol: 'lcDOT',
      fullname: 'Liquid Crowdloan DOT(13)',
      decimals: temp.DOT.decimals,
      ed: temp.DOT.ed
    });
  }

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
          display: `LP ${token1.display}-${token2.display}`
        });

        return [token.name, token];
      })
  );

  // insert dex share tokens to temp
  temp = { ...temp, ...dexShareTokens };

  return temp;
}
