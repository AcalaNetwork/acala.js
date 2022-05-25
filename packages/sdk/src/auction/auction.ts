import { AnyApi, FixedPointNumber } from '@acala-network/sdk-core';
import { BehaviorSubject, combineLatest, filter, map, Observable } from 'rxjs';
import { Wallet } from '../wallet';
import { createAuctionStorages } from './storages';
import { AuctionConfigs, AuctionData } from './types';

export class Auction {
  private id: string;
  private api: AnyApi;
  private wallet: Wallet;
  private storages: ReturnType<typeof createAuctionStorages>;
  private configs: {
    minimumIncrementSize: FixedPointNumber;
    auctionDurationSoftCap: bigint;
  };

  private detail$: BehaviorSubject<AuctionData | undefined>;

  constructor({ id, api, wallet }: AuctionConfigs) {
    this.api = api;
    this.id = id;
    this.wallet = wallet;
    this.storages = createAuctionStorages(this.api);
    this.configs = {
      auctionDurationSoftCap: this.api.consts.auctionManager.auctionDurationSoftCap.toBigInt(),
      minimumIncrementSize: FixedPointNumber.fromInner(
        this.api.consts.auctionManager.minimumIncrementSize.toString(),
        18
      )
    };
    this.detail$ = new BehaviorSubject<AuctionData | undefined>(undefined);

    this.subscribeData().subscribe({
      next: (data) => this.detail$.next(data),
      error: (e) => {
        console.error(e);

        throw e;
      }
    });
  }

  public get data$() {
    return this.detail$.pipe(filter((i) => !!i));
  }

  private getMinimumBidAmount(
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

    return target.max(last || FixedPointNumber.ZERO).mul(FixedPointNumber.ONE.add(incrementSize));
  }

  private subscribeData(): Observable<AuctionData> {
    return combineLatest({
      newHeader: this.api.rpc.chain.subscribeNewHeads(),
      auctionDetails: this.storages.collateralAuctions(this.id).observable,
      auctionBidDetails: this.storages.auction(this.id).observable
    }).pipe(
      map(({ newHeader, auctionDetails, auctionBidDetails }) => {
        const details = auctionDetails.unwrap();
        const bid = auctionBidDetails.unwrap();
        const collateral = this.wallet.__getToken(details.currencyId);
        const stableToken = this.wallet.getPresetTokens().stableToken;
        const startBlock = details.startTime.toBigInt();
        const currentBlock = newHeader.number.toBigInt();
        const bidDetails = bid.bid.unwrapOrDefault();
        const target = FixedPointNumber.fromInner(details.target.toString(), stableToken.decimals);
        const currentBidAccount = bidDetails[0] ? bidDetails[0].toString() : undefined;
        const currentBidAmount = bidDetails[1]
          ? FixedPointNumber.fromInner(bidDetails[1].toString(), stableToken.decimals)
          : undefined;

        return {
          refundRecipient: details.refundRecipient.toString(),
          collateral: collateral,
          initialAmount: FixedPointNumber.fromInner(details.initialAmount.toString(), collateral.decimals),
          amount: FixedPointNumber.fromInner(details.amount.toString(), collateral.decimals),
          target: target,
          startBlock: bid.start.toBigInt(),
          endBlock: bid.end.unwrapOrDefault()?.toBigInt(),
          currentBidAmount: currentBidAmount,
          currentBidAccount: currentBidAccount,
          minimumBidAmount: this.getMinimumBidAmount(startBlock, currentBlock, target, currentBidAmount)
        };
      })
    );
  }
}
