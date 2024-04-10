import { AnyApi, FixedPointNumber, MaybeCurrency, Token } from '@acala-network/sdk-core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BaseSDK } from '../types.js';
import { Wallet } from '../wallet/index.js';
import { PoolDetail, LiquidityPoolStatus, PoolInfo, UserLiquidity, EstimateAddLiquidityResult, EstimateRemoveLiquidityResult, PoolSizeOfShare, PoolPositions } from './types.js';
export declare class Liquidity implements BaseSDK {
    private api;
    private storages;
    private wallet;
    readonly consts: {
        runtimeChain: string;
    };
    isReady$: BehaviorSubject<boolean>;
    constructor(api: AnyApi, wallet: Wallet);
    get isReady(): Promise<boolean>;
    /**
     * @name subscribePoolListByStatus
     * @description get pool list which filtered by status
     */
    subscribePoolListByStatus: import("@polkadot/util/types").Memoized<(status?: LiquidityPoolStatus) => Observable<PoolInfo[]>>;
    getPoolListByStatus(status?: LiquidityPoolStatus): Promise<PoolInfo[]>;
    /**
     * @name subscribePoolInfo
     * @description get pool infomation of `token`
     */
    subscribePoolInfo: import("@polkadot/util/types").Memoized<(token: MaybeCurrency) => Observable<PoolInfo>>;
    getPoolInfo(token: MaybeCurrency): Promise<PoolInfo>;
    subscribePoolPositions: import("@polkadot/util/types").Memoized<(token: MaybeCurrency) => Observable<PoolPositions>>;
    getPoolPositions(token: MaybeCurrency): Promise<PoolPositions>;
    /**
     * @name subscribePoolDetails
     * @description get pool detail of `token`
     */
    subscribePoolDetails: import("@polkadot/util/types").Memoized<(token: MaybeCurrency) => Observable<PoolDetail>>;
    getPoolDetail(token: MaybeCurrency): Promise<PoolDetail>;
    /**
     * @name subscribeAllEnabledPoolDetails
     * @description get all enable pool information
     */
    subscribeAllEnabledPoolDetails(): Observable<Record<string, PoolDetail>>;
    /**
     * @name getAllEnabledPoolDetails
     * @description get all enable pool information
     */
    getAllEnabledPoolDetails(): Promise<Record<string, PoolDetail>>;
    /**
     * @name subscribeUserLiquidityDetails
     * @description get `user` `token` pool information
     */
    subscribeUserLiquidityDetails: import("@polkadot/util/types").Memoized<(address: string, token: MaybeCurrency) => Observable<UserLiquidity>>;
    getUserLiquidityDetails(address: string, token: MaybeCurrency): Promise<UserLiquidity>;
    /**
     * @name subscribeAllUserLiquidityDetails
     * @description subscribe all `user` pools information
     */
    subscribeAllUserLiquidityDetails: import("@polkadot/util/types").Memoized<(address: string) => Observable<Record<string, UserLiquidity>>>;
    getAllUserLiquidityDetails(address: string): Promise<Record<string, UserLiquidity>>;
    /**
     * @name subscribeEstimateAddLiquidityResult
     * @description estimate add liquidity result
     */
    subscribeEstimateAddLiquidityResult: import("@polkadot/util/types").Memoized<(tokenA: Token, tokenB: Token, inputA: FixedPointNumber, inputB: FixedPointNumber, slippage?: number) => Observable<EstimateAddLiquidityResult>>;
    getEstimateAddLiquidityResult(tokenA: Token, tokenB: Token, inputA: FixedPointNumber, inputB: FixedPointNumber, slippage?: number): Promise<EstimateAddLiquidityResult>;
    /**
     * @name subscribeEstimateRemoveLiquidity
     * @description subscribe estimate remove liquidity result
     */
    subscribeEstimateRemoveLiquidityResult: import("@polkadot/util/types").Memoized<(dexShareToken: Token, removeShare: FixedPointNumber, slippage?: number) => Observable<EstimateRemoveLiquidityResult>>;
    getEstimateRemoveLiquidityResult(dexShareToken: Token, removeShare: FixedPointNumber, slippage?: number): Promise<EstimateRemoveLiquidityResult>;
    /**
     * @name subscribePoolSizeOfShares
     * @description subscribe `dexShareToken` pool size of `shares`
     */
    susbscribePoolPositionOfShares: import("@polkadot/util/types").Memoized<(dexShareToken: Token, share: FixedPointNumber) => Observable<{
        share: FixedPointNumber;
        ratio: FixedPointNumber;
        amounts: [FixedPointNumber, FixedPointNumber];
        poolDetail: PoolDetail;
    }>>;
    getPoolPositionOfShares(dexShareToken: Token, share: FixedPointNumber): Promise<PoolSizeOfShare>;
    subscribeIsPoolEnabled(token0: string | Token, token1?: Token): Observable<boolean>;
    getIsPoolEnabled(token0: string | Token, token1?: Token): Promise<boolean>;
    private subscribeBaseTokenPrice;
    subscribeDexPrice: import("@polkadot/util/types").Memoized<(token: Token) => Observable<FixedPointNumber>>;
    getDexPrice: (token: Token) => Promise<FixedPointNumber>;
}
