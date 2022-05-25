import { AnyApi } from '@acala-network/sdk-core';
import { BehaviorSubject, combineLatest, firstValueFrom, Observable } from 'rxjs';
import { BaseSDK } from '../types';
import { Wallet } from '../wallet';
import { AuctionManagerConfigs } from './types';
import { filter, switchMap } from 'rxjs/operators';
import { createAuctionManagerStorages } from './storages';
import { Auction } from './auction';

export class AuctionManager implements BaseSDK {
  private wallet: Wallet;
  private api: AnyApi;
  private storages: ReturnType<typeof createAuctionManagerStorages>;
  private status: BehaviorSubject<boolean>;
  private auctions: Map<string, Auction>;

  constructor({ api, wallet }: AuctionManagerConfigs) {
    this.api = api;
    this.wallet = wallet;
    this.storages = createAuctionManagerStorages(this.api);
    this.status = new BehaviorSubject<boolean>(false);
    this.auctions = new Map<string, Auction>();

    this.init();
  }

  private init() {
    this.wallet.isReady$.subscribe(() => this.status.next(true));
  }

  public get isReady$(): Observable<boolean> {
    return this.status.pipe(filter((i) => i));
  }

  public get isReady(): Promise<boolean> {
    return firstValueFrom(this.isReady$);
  }

  private subscribeAuction(id: string) {
    if (this.auctions.has(id)) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return this.auctions.get(id)!.data$;
    }

    const auction = new Auction({ id, api: this.api, wallet: this.wallet });

    this.auctions.set(id, auction);

    return auction.data$;
  }

  public subscribeAuctions = () => {
    return this.storages.auctions().observable.pipe(
      switchMap((auctions) => {
        const auctionKeys = auctions.map((i) => i.args[0].toString());

        return combineLatest(Object.fromEntries(auctionKeys.map((i) => [i, this.subscribeAuction(i)])));
      })
    );
  };
}
