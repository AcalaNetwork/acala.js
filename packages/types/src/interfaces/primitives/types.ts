// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

import type { Enum, i128, u128, u32 } from '@polkadot/types';
import type { ITuple } from '@polkadot/types/types';
import type { EvmAddress } from '@acala-network/types/interfaces/evm';
import type { LockIdentifier } from '@acala-network/types/interfaces/runtime';

/** @name AirDropCurrencyId */
export interface AirDropCurrencyId extends Enum {
  readonly isKar: boolean;
  readonly isAca: boolean;
}

/** @name Amount */
export interface Amount extends i128 {}

/** @name AmountOf */
export interface AmountOf extends Amount {}

/** @name AuctionId */
export interface AuctionId extends u32 {}

/** @name AuctionIdOf */
export interface AuctionIdOf extends AuctionId {}

/** @name AuthoritysOriginId */
export interface AuthoritysOriginId extends Enum {
  readonly isRoot: boolean;
  readonly isAcalaTreasury: boolean;
  readonly isHonzonTreasury: boolean;
  readonly isHomaTreasury: boolean;
  readonly isDswf: boolean;
}

/** @name CurrencyId */
export interface CurrencyId extends Enum {
  readonly isToken: boolean;
  readonly asToken: TokenSymbol;
  readonly isDexShare: boolean;
  readonly asDexShare: ITuple<[DexShare, DexShare]>;
  readonly isErc20: boolean;
  readonly asErc20: EvmAddress;
}

/** @name CurrencyIdOf */
export interface CurrencyIdOf extends CurrencyId {}

/** @name DataProviderId */
export interface DataProviderId extends Enum {
  readonly isAggregated: boolean;
  readonly isAcala: boolean;
  readonly isBand: boolean;
}

/** @name DexShare */
export interface DexShare extends Enum {
  readonly isToken: boolean;
  readonly asToken: TokenSymbol;
  readonly isErc20: boolean;
  readonly asErc20: EvmAddress;
}

/** @name NFTBalance */
export interface NFTBalance extends u128 {}

/** @name PalletId */
export interface PalletId extends LockIdentifier {}

/** @name Share */
export interface Share extends u128 {}

/** @name TokenSymbol */
export interface TokenSymbol extends Enum {
  readonly isAca: boolean;
  readonly isAusd: boolean;
  readonly isDot: boolean;
  readonly isLdot: boolean;
  readonly isRenbtc: boolean;
  readonly isKar: boolean;
  readonly isKusd: boolean;
  readonly isKsm: boolean;
  readonly isLksm: boolean;
}

/** @name TradingPair */
export interface TradingPair extends ITuple<[CurrencyId, CurrencyId]> {}

export type PHANTOM_PRIMITIVES = 'primitives';
