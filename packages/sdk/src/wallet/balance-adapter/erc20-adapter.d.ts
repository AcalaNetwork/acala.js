import { EvmRpcProvider } from '@acala-network/eth-providers';
import { FixedPointNumber, Token } from '@acala-network/sdk-core';
import { Observable } from 'rxjs';
import { BalanceData } from '../types.js';
export declare class ERC20Adapter {
    private provider;
    private caches;
    constructor(provider: EvmRpcProvider);
    private getERC20Contract;
    private getEVMAddress;
    subscribeBalance(token: Token, address: string): Observable<BalanceData>;
    subscribeIssuance(token: Token): Observable<FixedPointNumber>;
}
