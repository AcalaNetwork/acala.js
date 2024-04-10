import { AnyApi, FixedPointNumber, Token } from '@acala-network/sdk-core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BaseSDK } from '../types.js';
import { EstimateMintResult, EstimateRedeemResult, HomaConvertor, HomaEnvironment, RedeemRequest, StakingLedger, Unbonding, UserLiquidityTokenSummary } from './types.js';
import { ApiTypes, SubmittableExtrinsic } from '@polkadot/api/types';
import { ISubmittableResult } from '@polkadot/types/types';
import { Wallet } from '../wallet/index.js';
export declare class Homa<T extends ApiTypes = 'promise'> implements BaseSDK {
    private api;
    private storages;
    private wallet;
    consts: {
        liquidToken: Token;
        stakingToken: Token;
        defaultExchangeRate: FixedPointNumber;
        chain: string;
        activeSubAccountsIndexList: number[];
        mintThreshold: FixedPointNumber;
        redeemThreshold: FixedPointNumber;
    };
    isReady$: BehaviorSubject<boolean>;
    constructor(api: AnyApi, wallet: Wallet);
    private init;
    private initConsts;
    get isReady(): Promise<boolean>;
    private getTotalStakingBonded$;
    get totalStakingBonded$(): Observable<FixedPointNumber>;
    private getToBondPool$;
    get toBondPool$(): Observable<FixedPointNumber>;
    private getTotalVoidLiquid$;
    get totalVoidLiquid$(): Observable<FixedPointNumber>;
    private getTotalLiquidity$;
    get totalLiquidity$(): Observable<FixedPointNumber>;
    private getFastMatchFeeRate$;
    get fastMatchFeeRate$(): Observable<FixedPointNumber>;
    private getCommissionRate$;
    get commissionRate$(): Observable<FixedPointNumber>;
    private getSoftBondedCapPerSubAccount$;
    get softBondedCapPerSubAccount$(): Observable<FixedPointNumber>;
    private getStakingLedgers$;
    get stakingLedgers$(): Observable<StakingLedger[]>;
    private getEraFrequency$;
    get eraFrequency$(): Observable<number>;
    private getEstimatedRewardRatePerEra$;
    get estimatedRewardRatePerEra$(): Observable<FixedPointNumber>;
    getRedeemRequest$: import("@polkadot/util/types").Memoized<(address: string) => Observable<[FixedPointNumber, boolean]>>;
    readonly relayChainCurrentEra$: import("@polkadot/util/types").Memoized<() => Observable<number>>;
    readonly getUnbondings$: import("@polkadot/util/types").Memoized<(address: string) => Observable<Unbonding[]>>;
    private getEnv$;
    get env$(): Observable<HomaEnvironment>;
    getEnv(): Promise<HomaEnvironment>;
    /**
     * @name convertor$
     * @description return convertLiquidToStaking and convertStakingToLiquid
     */
    private getConvertor$;
    get convertor$(): Observable<HomaConvertor>;
    getConvertor(): Promise<HomaConvertor>;
    /**
     * @name subscribleEstimateMintResult
     * @description subscrible estimate mint result
     */
    subscribeEstimateMintResult: import("@polkadot/util/types").Memoized<(amount: FixedPointNumber) => Observable<EstimateMintResult>>;
    getEstimateMintResult(amount: FixedPointNumber): Promise<EstimateMintResult>;
    createMintCall: import("@polkadot/util/types").Memoized<(amount: FixedPointNumber) => SubmittableExtrinsic<T, ISubmittableResult>>;
    subscribeEstimateRedeemResult: import("@polkadot/util/types").Memoized<(amount: FixedPointNumber, isFastRedeem: boolean) => Observable<EstimateRedeemResult>>;
    getEstimateRedeemResult(amount: FixedPointNumber, isFastReddem: boolean): Promise<EstimateRedeemResult>;
    createRedeemCall: import("@polkadot/util/types").Memoized<(amount: FixedPointNumber, isFastMatch: boolean, address?: string) => SubmittableExtrinsic<T, ISubmittableResult>>;
    subscribeUserRedeemRequest: import("@polkadot/util/types").Memoized<(address: string) => Observable<RedeemRequest>>;
    getUserRedeemRequest(address: string): Promise<RedeemRequest>;
    subscribeUserLiquidTokenSummary: import("@polkadot/util/types").Memoized<(address: string) => Observable<UserLiquidityTokenSummary>>;
    getUserLiquidTokenSummary(address: string): Promise<UserLiquidityTokenSummary>;
}
