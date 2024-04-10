/**
 * wallet sdk support to query info about token list, token balance, token price and token value
 */
import { FixedPointNumber as FN, AnyApi, Token, MaybeCurrency, TokenType } from '@acala-network/sdk-core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TokenRecord, WalletConsts, BalanceData, PresetTokens, WalletConfigs, PriceProviders } from './types.js';
import { Homa } from '../homa/index.js';
import { Liquidity } from '../liquidity/index.js';
import { PriceProviderType } from './price-provider/types.js';
import { BaseSDK } from '../types.js';
import { DIDWeb3Name } from './web3name/did.js';
import { Vesting } from './vesting/index.js';
export declare class Wallet implements BaseSDK {
    private api;
    private storages;
    private configs;
    private balanceAdapter;
    private tokenProvider;
    priceProviders: PriceProviders;
    liquidity: Liquidity;
    homa: Homa;
    web3Name: DIDWeb3Name;
    isReady$: BehaviorSubject<boolean>;
    consts: WalletConsts;
    vesting: Vesting;
    constructor(api: AnyApi, configs?: WalletConfigs);
    get isReady(): Promise<boolean>;
    private init;
    private initConsts;
    /**
     *  @name subscribeTokens
     *  @param type
     *  @description subscirbe the token list, can filter by type
     */
    subscribeTokens: import("@polkadot/util/types").Memoized<(type?: TokenType | TokenType[]) => Observable<TokenRecord>>;
    getTokens(type?: TokenType | TokenType[]): Promise<TokenRecord>;
    /**
     *  @name subscribeToken
     *  @description subscirbe the token info
     */
    subscribeToken: import("@polkadot/util/types").Memoized<(target: MaybeCurrency) => Observable<Token>>;
    /**
     * @name __getToken
     * @deprecated change to `getToke`
     */
    __getToken(target: MaybeCurrency): Token;
    getToken(target: MaybeCurrency): Token;
    /**
     * @name subscribeBalance
     * @description subscribe `address` `token` balance information
     * @param token
     * @param address
     */
    subscribeBalance: import("@polkadot/util/types").Memoized<(symbol: MaybeCurrency, address: string) => Observable<BalanceData>>;
    getBalance(token: MaybeCurrency, address: string): Promise<BalanceData>;
    /**
     * @name subscribeIssuance
     * @description subscribe `token` issuance amount
     * @param token
     */
    subscribeIssuance: import("@polkadot/util/types").Memoized<(symbol: MaybeCurrency) => Observable<FN>>;
    getIssuance(token: MaybeCurrency): Promise<FN>;
    /**
     * @name subscribeSuggestInput
     * @description subscirbe the suggest input amount for `account` `token`
     * @params token: Token
     * @params account: string
     */
    subscribeSuggestInput: import("@polkadot/util/types").Memoized<(symbol: MaybeCurrency, address: string, isAllowDeath: boolean, fee: {
        currency: MaybeCurrency;
        amount: FN;
    }) => Observable<FN>>;
    getSuggestInput(token: MaybeCurrency, address: string, isAllowDeath: boolean, fee: {
        currency: MaybeCurrency;
        amount: FN;
    }): Promise<FN>;
    getPresetTokens(ignoreCheck?: boolean): PresetTokens;
    /**
     * @name subscribePrice
     * @description subscirbe the price of `token`
     */
    subscribePrice: import("@polkadot/util/types").Memoized<(symbol: MaybeCurrency, type?: any) => Observable<FN>>;
    getPrice(token: MaybeCurrency, type?: PriceProviderType): Promise<FN>;
    checkTransfer(address: string, currency: MaybeCurrency, amount: FN, direction?: 'from' | 'to'): Promise<boolean>;
}
