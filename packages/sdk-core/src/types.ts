import { CurrencyId } from '@acala-network/types/interfaces';
import { ApiPromise, ApiRx } from '@polkadot/api';
import { AccountId } from '@polkadot/types/interfaces';
import { AcalaPrimitivesCurrencyCurrencyId } from '@polkadot/types/lookup';
import { Codec, Observable } from '@polkadot/types/types';
import { Token } from './token';

export type AnyApi = ApiPromise | ApiRx;

export type ObOrPromiseResult<T extends AnyApi, R extends unknown> = T extends ApiRx ? Observable<R> : Promise<R>;

export type MaybeCurrency = number | string | CurrencyId | Token | Codec | [string, string];

export type MaybeAccount = string | AccountId | Codec;

export enum TokenType {
  'BASIC',
  'DEX_SHARE',
  'ERC20',
  'STABLE_ASSET_POOL_TOKEN',
  'LIQUID_CROWDLOAN',
  'FOREIGN_ASSET'
}

/**
 * CurrencyObject is an object which can as parameters in api.createType('CurrencyId', ...).
 * we can simple pass CurrencyObject to any call as CurrencyId type
 */
export type CurrencyObject =
  | { Token: string }
  | { DexShare: [CurrencyObject, CurrencyObject] }
  | { Erc20: string }
  | { StableAssetPoolToken: number }
  | { ForeignAsset: number }
  // FIXME: need remove if all chain released
  | { LiquidCroadloan: number }
  | { LiquidCrowdloan: number };

export type CombinedCurrencyId = CurrencyId | AcalaPrimitivesCurrencyCurrencyId;
