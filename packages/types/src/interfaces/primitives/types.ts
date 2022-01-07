// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

import type { EvmAddress } from '@acala-network/types/interfaces/evm';
import type { Balance } from '@acala-network/types/interfaces/runtime';
import type { Bytes, Enum, Struct, i128, u32, u8 } from '@polkadot/types-codec';
import type { ITuple } from '@polkadot/types-codec/types';
import { AcalaPrimitivesCurrencyCurrencyId } from '@polkadot/types/lookup'

/** @name AcalaAssetMetadata */
export interface AcalaAssetMetadata extends Struct {
  readonly name: Bytes;
  readonly symbol: Bytes;
  readonly decimals: u8;
  readonly minimalBalance: Balance;
}

/** @name AcalaDataProviderId */
export interface AcalaDataProviderId extends Enum {
  readonly isAggregated: boolean;
  readonly isAcala: boolean;
  readonly isBand: boolean;
  readonly type: 'Aggregated' | 'Acala' | 'Band';
}

/** @name AirDropCurrencyId */
export interface AirDropCurrencyId extends Enum {
  readonly isKar: boolean;
  readonly isAca: boolean;
  readonly type: 'Kar' | 'Aca';
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
  readonly isTreasury: boolean;
  readonly isHonzonTreasury: boolean;
  readonly isHomaTreasury: boolean;
  readonly isTreasuryReserve: boolean;
  readonly type: 'Root' | 'Treasury' | 'HonzonTreasury' | 'HomaTreasury' | 'TreasuryReserve';
}

/** @name ChainBridgeChainId */
export interface ChainBridgeChainId extends u8 {}

export type CurrencyId = AcalaPrimitivesCurrencyCurrencyId;

/** @name CurrencyIdOf */
export interface CurrencyIdOf extends CurrencyId {}

/** @name DexShare */
export interface DexShare extends Enum {
  readonly isToken: boolean;
  readonly asToken: TokenSymbol;
  readonly isErc20: boolean;
  readonly asErc20: EvmAddress;
  readonly type: 'Token' | 'Erc20';
}

/** @name OrmlCurrencyId */
export interface OrmlCurrencyId extends CurrencyId {}

/** @name TokenSymbol */
export interface TokenSymbol extends Enum {
  readonly isAca: boolean;
  readonly isAusd: boolean;
  readonly isDot: boolean;
  readonly isLdot: boolean;
  readonly isRenbtc: boolean;
  readonly isCash: boolean;
  readonly isKar: boolean;
  readonly isKusd: boolean;
  readonly isKsm: boolean;
  readonly isLksm: boolean;
  readonly isBnc: boolean;
  readonly isVsksm: boolean;
  readonly type: 'Aca' | 'Ausd' | 'Dot' | 'Ldot' | 'Renbtc' | 'Cash' | 'Kar' | 'Kusd' | 'Ksm' | 'Lksm' | 'Bnc' | 'Vsksm';
}

/** @name TradingPair */
export interface TradingPair extends ITuple<[CurrencyId, CurrencyId]> {}

export type PHANTOM_PRIMITIVES = 'primitives';
