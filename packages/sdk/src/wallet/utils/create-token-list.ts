import {
  createForeignAssetName,
  Token,
  TokenType,
  FixedPointNumber as FN,
  forceToCurrencyName
} from '@acala-network/sdk-core';
import { TradingPair, TradingPairStatus } from '@acala-network/types/interfaces';
import { Option, StorageKey } from '@polkadot/types';
import { ModuleAssetRegistryModuleAssetIds, ModuleAssetRegistryModuleAssetMetadata } from '@polkadot/types/lookup';
import { hexToString } from '@polkadot/util';
import { TokenRecord } from '../type';

export function createTokenList(
  basicTokens: TokenRecord,
  tradingPairs: [StorageKey<[TradingPair]>, TradingPairStatus][],
  assetMetadata: [StorageKey<[ModuleAssetRegistryModuleAssetIds]>, Option<ModuleAssetRegistryModuleAssetMetadata>][]
): TokenRecord {
  // tokens list temp
  let temp: TokenRecord = { ...basicTokens };

  // TODO: need support stable coin assets & erc20
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
            symbol: hexToString(value.symbol.toHex()),
            display: hexToString(value.name.toHex()),
            decimals,
            ed: FN.fromInner(value.minimalBalance.toString(), decimals)
          })
        ];
      })
  );

  // insert foreign tokens to temp
  temp = { ...temp, ...foreignTokens };

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

        const token = Token.fromTokens(token1, token2);

        return [token.name, token];
      })
  );

  // insert dex share tokens to temp
  temp = { ...temp, ...dexShareTokens };

  return temp;
}
