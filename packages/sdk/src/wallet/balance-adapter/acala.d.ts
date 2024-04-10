import { AnyApi, FixedPointNumber, Token } from '@acala-network/sdk-core';
import { EvmRpcProvider } from '@acala-network/eth-providers';
import { BalanceData } from '../types.js';
import { AcalaExpandBalanceAdapter } from './types.js';
import { Observable } from 'rxjs';
interface AcalaAdapterConfigs {
    api: AnyApi;
    evmProvider?: EvmRpcProvider;
}
export declare class AcalaBalanceAdapter implements AcalaExpandBalanceAdapter {
    private storages;
    private nativeCurrency;
    private evmProvider;
    private erc20Adapter;
    private api;
    constructor({ api, evmProvider }: AcalaAdapterConfigs);
    private transformNative;
    private transformNonNative;
    subscribeBalance(token: Token, address: string): Observable<BalanceData>;
    getED(token: Token): FixedPointNumber;
    subscribeIssuance(token: Token): Observable<FixedPointNumber>;
}
export {};
