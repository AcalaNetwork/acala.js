// import { AnyApi, Token } from '@acala-network/sdk-core';
// import { TradingPair, TradingPairStatus } from '@acala-network/types/interfaces';
// import { Observable, of } from 'rxjs';
// import { Wallet } from '..';
// import { StorageManager } from '../storage';
// import { LiquidityDetail, LiquidityPoolStatus, PoolType, UserLiquidity } from './types';

// export class Liquidity {
//   private api: AnyApi;
//   private storages: StorageManager;
//   private wallet: Wallet;

//   constructor(api: AnyApi, wallet: Wallet) {
//     this.api = api;
//     this.wallet = wallet;
//     this.storages = new StorageManager({});
//   }

//   get initStorages () {
//     return {

//     }
//   }

//   /**
//    * @name subscribeTokens
//    * @description get all pool
//    */
//   public subscribePoolTypes (status: LiquidityPoolStatus = LiquidityPoolStatus.enable): Observable<PoolType> {

//   }

//   /**
//    * @name subscribePool
//    * @description get pool information of `token`
//    */
//   public subscribePool(token: Token): Observable<LiquidityDetail> {

//   }

//   public subscribeAllPools (): Observable<LiquidityDetail[]> {}
//  /**
//   * @name subscribeUserPool
//   * @description get `address` pool of `token`
//   */
//  public subscribeUserPool (token: Token, address: string): Observable<UserLiquidity> {
//  }

//  /**
//   * @name subscribeAllUserPool
//   * @description get all user pool information
//   */
//  public subscribeAllUserPool (address: string): Observable<UserLiquidity[]> {

//  }
// }
