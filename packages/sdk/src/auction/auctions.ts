import { AnyApi } from '@acala-network/sdk-core';
import { BehaviorSubject, firstValueFrom, from, Observable } from 'rxjs';
import { BaseSDK } from '../types';
import { Wallet } from '../wallet';
import { AuctionListQueryParams, AuctionManagerConfigs } from './types';
import { filter, map } from 'rxjs/operators';
import { convertApiResult, fetchAuctionList } from './api';
import { Auction } from './auction';

export class Auctions implements BaseSDK {
  private wallet: Wallet;
  /* eslint-disable-next-line */
  // @ts-ignore
  private api: AnyApi;
  private status: BehaviorSubject<boolean>;
  private graphql: {
    endpoint: string;
  };

  constructor({ api, wallet, graphql }: AuctionManagerConfigs) {
    this.api = api;
    this.wallet = wallet;
    this.graphql = graphql;

    this.status = new BehaviorSubject<boolean>(false);

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

  public subscribeList(params: AuctionListQueryParams) {
    return from(fetchAuctionList(this.graphql.endpoint, params)).pipe(
      map((result) => {
        const data = convertApiResult(result, this.wallet, params);

        return {
          ...data,
          list: data.list.map(
            (item) =>
              new Auction({
                id: item.id,
                api: this.api,
                wallet: this.wallet,
                data: item
              })
          )
        };
      })
    );
  }
}
