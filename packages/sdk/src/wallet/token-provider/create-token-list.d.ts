import { Option, StorageKey, u16 } from '@polkadot/types';
import { AcalaPrimitivesTradingPair, ModuleDexTradingPairStatus, AcalaPrimitivesCurrencyAssetIds, AcalaPrimitivesCurrencyAssetMetadata, StagingXcmV3MultiLocation } from '@polkadot/types/lookup';
import { TokenRecord } from '../types.js';
interface Configs {
    kusd2ausd: boolean;
    insertLCDOT: boolean;
}
export declare function createTokenList(tradingPairs: [StorageKey<[AcalaPrimitivesTradingPair]>, ModuleDexTradingPairStatus][], assetMetadata: [StorageKey<[AcalaPrimitivesCurrencyAssetIds]>, Option<AcalaPrimitivesCurrencyAssetMetadata>][], foreignAssetLocations: [StorageKey<[u16]>, Option<StagingXcmV3MultiLocation>][], configs: Configs): TokenRecord;
export {};
