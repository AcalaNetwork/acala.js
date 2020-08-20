// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

import { Compact, Struct } from '@polkadot/types/codec';
import { CurrencyId } from '@acala-network/types/interfaces/primitives';
import { AccountId, Balance, BlockNumber } from '@acala-network/types/interfaces/runtime';

/** @name CollateralAuctionItem */
export interface CollateralAuctionItem extends Struct {
  readonly refundRecipient: AccountId;
  readonly currencyId: CurrencyId;
  readonly initialAmount: Compact<Balance>;
  readonly amount: Compact<Balance>;
  readonly target: Compact<Balance>;
  readonly startTime: BlockNumber;
}

/** @name DebitAuctionItem */
export interface DebitAuctionItem extends Struct {
  readonly initialAmount: Compact<Balance>;
  readonly amount: Compact<Balance>;
  readonly fix: Compact<Balance>;
  readonly startTime: BlockNumber;
}

/** @name SurplusAuctionItem */
export interface SurplusAuctionItem extends Struct {
  readonly amount: Compact<Balance>;
  readonly startTime: BlockNumber;
}

export type PHANTOM_AUCTIONMANAGER = 'auctionManager';
