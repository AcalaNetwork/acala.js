import { AnyApi, FixedPointNumber } from '@acala-network/sdk-core';
import { ModuleAuctionManagerCollateralAuctionItem } from '@acala-network/types/interfaces/types-lookup';
import { Balance } from '@polkadot/types/interfaces';
import { BehaviorSubject, combineLatest, filter, map, Observable, Subscription } from 'rxjs';
import { ChainListener, ListenerBlock } from '../utils/chain-listener';
import { Wallet } from '../wallet';
import { createAuctionStorages } from './storages';
import { AuctionBid, AuctionConfigs, AuctionStage, AuctionStatus, CollateralAuction } from './types';

export class Auction {
  private api: AnyApi;
  private wallet: Wallet;
  private storages: ReturnType<typeof createAuctionStorages>;
  private inner: CollateralAuction;
  private chainListner: ChainListener;
  public readonly id: string;
  public readonly configs: {
    minimumIncrementSize: FixedPointNumber;
    auctionDurationSoftCap: bigint;
  };

  private detail$: BehaviorSubject<CollateralAuction>;
  private subscriptions: Subscription[];

  constructor({ id, api, wallet, data }: AuctionConfigs) {
    this.api = api;
    this.id = id;
    this.wallet = wallet;
    this.storages = createAuctionStorages(this.api);
    this.chainListner = ChainListener.create({ api, instanceKey: this.wallet.consts.runtimeChain.toString() });
    this.configs = {
      auctionDurationSoftCap: this.api.consts.auctionManager.auctionDurationSoftCap.toBigInt(),
      minimumIncrementSize: FixedPointNumber.fromInner(
        this.api.consts.auctionManager.minimumIncrementSize.toString(),
        18
      )
    };
    this.inner = data;
    this.detail$ = new BehaviorSubject<CollateralAuction>(this.inner);

    this.subscriptions = [
      this.subscribeData().subscribe({
        next: (data) => this.detail$.next(data),
        error: (e) => {
          console.error(e);

          throw e;
        }
      })
    ];
  }

  public get data$() {
    return this.detail$.pipe(filter((i) => !!i));
  }

  public unscribe() {
    this.subscriptions.forEach((item) => item.unsubscribe());
    this.detail$.unsubscribe();
  }

  private getMinimumBidAmount(
    stage: AuctionStage,
    startBlock: bigint,
    currentBlock: bigint,
    target: FixedPointNumber,
    last?: FixedPointNumber
  ) {
    const { minimumIncrementSize, auctionDurationSoftCap } = this.configs;

    let incrementSize = minimumIncrementSize;

    if (currentBlock >= startBlock + auctionDurationSoftCap) {
      // double the minimum increment size when reach soft cap
      incrementSize = minimumIncrementSize.mul(FixedPointNumber.TWO);
    }

    const lastBid = last || FixedPointNumber.ZERO;

    if (stage === 'REVERSE' && lastBid.isZero()) {
      return target;
    }

    return target.max(lastBid).mul(incrementSize).add(lastBid);
  }

  public getActualReceiveByBidAmount(amount: FixedPointNumber) {
    const { target, initialAmount, stage } = this.inner;

    if (stage === 'NORMAL') {
      return initialAmount;
    }

    if (stage === 'REVERSE') {
      return initialAmount.mul(amount.div(target.amount));
    }

    return FixedPointNumber.ZERO;
  }

  public getActualBidAmountByReceive(amount: FixedPointNumber) {
    const { target, initialAmount, stage } = this.inner;

    if (stage === 'NORMAL') {
      return target.amount;
    }

    if (stage === 'REVERSE') {
      return initialAmount.div(amount).mul(target.amount);
    }

    return FixedPointNumber.ZERO;
  }

  private getCurrentStatusFormBlock(block: ListenerBlock): AuctionStatus | undefined {
    const cancelEvent = block.events.find((item) => {
      return (
        item.event.section.toString() === 'auctionManager' &&
        item.event.method.toString() === 'CancelAuction' &&
        item.event.data[0].toString() === this.inner.id
      );
    });
    const abortEvent = block.events.find((item) => {
      return (
        item.event.section.toString() === 'auctionManager' &&
        item.event.method.toString() === 'CollateralAuctionAborted' &&
        item.event.data[0].toString() === this.inner.id
      );
    });
    const detailEvent = block.events.find((item) => {
      return (
        item.event.section.toString() === 'auctionManager' &&
        item.event.method.toString() === 'CollateralAuctionAborted' &&
        item.event.data[0].toString() === this.inner.id
      );
    });
    const dexTakeEvent = block.events.find((item) => {
      return (
        item.event.section.toString() === 'auctionManager' &&
        item.event.method.toString() === 'DEXTakeCollateralAuction' &&
        item.event.data[0].toString() === this.inner.id
      );
    });

    if (cancelEvent) {
      return 'CANCELL';
    }

    if (abortEvent) {
      return 'ABORT';
    }

    if (detailEvent) {
      return 'DEALT';
    }

    if (dexTakeEvent) {
      return 'DEX_TAKE';
    }

    return undefined;
  }

  private createDexTakeBidRecord(block: ListenerBlock): AuctionBid | undefined {
    const event = block.events.find((item) => {
      return (
        item.event.section.toString() === 'auctionManager' &&
        item.event.method.toString() === 'DEXTakeCollateralAuction' &&
        item.event.data[0].toString() === this.inner.id
      );
    });

    if (!event) return;

    const oldVersion = event.event.data.length === 4;
    const eventData = event.event.data;
    const amount = oldVersion ? (eventData[2] as Balance).toBigInt() : (eventData[3] as Balance).toBigInt();
    const targetStableAmount = oldVersion ? (eventData[3] as Balance).toBigInt() : (eventData[4] as Balance).toBigInt();
    const stableToken = this.wallet.getPresetTokens().stableToken;
    const collateral = this.inner.collateral;
    const stableTokenAmount = FixedPointNumber.fromInner(targetStableAmount.toString(), stableToken.decimals);
    const collateralAmount = FixedPointNumber.fromInner(amount.toString(), collateral.decimals);

    return {
      type: 'DEX_TAKE',
      bid: {
        token: stableToken,
        amount: stableTokenAmount
      },
      lotSize: {
        token: collateral,
        amount: collateralAmount
      },
      bidPrice: collateralAmount.div(stableTokenAmount),
      timestamp: block.timestamp,
      bidder: '',
      tx: ''
    };
  }

  private createBidRecord(block: ListenerBlock, collateralAmount: FixedPointNumber): AuctionBid | undefined {
    const event = block.events.find((item) => {
      return (
        item.event.section.toString() === 'auction' &&
        item.event.method.toString() === 'Bid' &&
        item.event.data[0].toString() === this.inner.id
      );
    });

    if (!event) return;

    const eventData = event.event.data;
    const bidder = eventData[1].toString();
    const amount = (eventData[2] as Balance).toBigInt();
    const stableToken = this.wallet.getPresetTokens().stableToken;
    const stableTokenAmount = FixedPointNumber.fromInner(amount.toString(), stableToken.decimals);
    const collateral = this.inner.collateral;
    const tx = event.phase.isApplyExtrinsic ? block.extrinsics[event.phase.asApplyExtrinsic.toNumber()] : undefined;

    return {
      type: 'DENT',
      bid: {
        token: stableToken,
        amount: stableTokenAmount
      },
      lotSize: {
        token: collateral,
        amount: collateralAmount
      },
      bidPrice: collateralAmount.div(stableTokenAmount),
      timestamp: block.timestamp,
      bidder: bidder,
      tx: tx ? tx.raw.hash.toString() : ''
    };
  }

  private subscribeData(): Observable<CollateralAuction> {
    return combineLatest({
      block: this.chainListner.subscribe(),
      auctionDetails: this.storages.collateralAuctions(this.id).observable,
      auctionBidDetails: this.storages.auction(this.id).observable
    }).pipe(
      map(({ block, auctionDetails, auctionBidDetails }) => {
        // listen collateral data from chain
        let data = { ...this.inner };

        if (auctionDetails && auctionDetails.isSome) {
          const details = auctionDetails.unwrap() as ModuleAuctionManagerCollateralAuctionItem;
          const collateral = this.wallet.__getToken(details.currencyId);
          const stableToken = this.wallet.getPresetTokens().stableToken;
          const startBlock = details.startTime.toBigInt();
          const currentBlock = block.block.block.header.number.toBigInt();
          const amount = FixedPointNumber.fromInner(details.amount.toString(), collateral.decimals);
          const bid = auctionBidDetails?.unwrap();
          const endBlock = BigInt(bid.end.toString());
          const bidDetails = bid.bid.unwrapOrDefault();
          const currentBidAccount = bidDetails[0] ? bidDetails[0].toString() : undefined;
          const currentBidAmount = bidDetails[1]
            ? FixedPointNumber.fromInner(bidDetails[1].toString(), stableToken.decimals)
            : undefined;
          const target = FixedPointNumber.fromInner(details.target.toString(), stableToken.decimals);

          data = {
            ...data,
            amount,
            winner: currentBidAccount,
            endBlock,
            minimumBidAmount: this.getMinimumBidAmount(data.stage, startBlock, currentBlock, target, currentBidAmount)
          };
        }

        // NOTE: handle bid event first when one block containes bid event and dex take event
        // FIXME: the code maybe wrong in reverse stage
        // insert bid event
        const bidRecord = this.createBidRecord(block, data.amount);

        if (bidRecord && !data.bids.find((item) => item.tx === bidRecord.tx)) {
          data.bids = [bidRecord, ...data.bids];
        }

        // update current auction status in no delay
        const status = this.getCurrentStatusFormBlock(block);

        if (status) {
          data.status = status;
        }

        // insert dex take event
        if (status === 'DEX_TAKE') {
          const bidRecord = this.createDexTakeBidRecord(block);
          if (bidRecord) {
            data.bids = [bidRecord, ...data.bids];
            // clear winner beacuse no winner but dex
            data.winner = '';
          }
        }

        this.inner = data;

        return data;
      })
    );
  }
}
