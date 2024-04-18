import { EvmRpcProvider, computeDefaultEvmAddress } from '@acala-network/eth-providers';
import { FixedPointNumber, getERC20TokenAddressFromName, Token } from '@acala-network/sdk-core';
// eslint-disable-next-line camelcase
import { Erc20__factory } from '../../abis/types/factories/Erc20__factory.js';
import { isAddress } from '@ethersproject/address';
import { from, Observable, Subject } from 'rxjs';
import { filter, finalize, shareReplay } from 'rxjs/operators';
import { BalanceData } from '../types.js';
import { AnyFunction } from '@polkadot/types/types';
import { NotERC20TokenName } from '@acala-network/sdk-core/errors.js';

export class ERC20Adapter {
  private provider: EvmRpcProvider;
  private caches: Record<string, Observable<BalanceData>>;

  constructor(provider: EvmRpcProvider) {
    this.provider = provider;
    this.caches = {};
  }

  private getERC20Contract(address: string) {
    if (!isAddress(address)) throw new Error('is not erc20 address');

    // eslint-disable-next-line camelcase
    return Erc20__factory.connect(address, this.provider);
  }

  private async getEVMAddress(address: string) {
    if (address.startsWith('0x') && isAddress(address)) return address;

    if (!this.provider._api) throw new Error(`can't get api from evm providier`);

    const evmAddress = await this.provider._api.query.evmAccounts.evmAddresses(address);

    return evmAddress.isEmpty ? computeDefaultEvmAddress(address) : evmAddress.toString();
  }

  subscribeBalance(token: Token, address: string) {
    if (!token.isERC20) throw new NotERC20TokenName(token.name);

    const cacheKey = `${token.name}-${address}`;

    // hit caches
    if (this.caches?.[cacheKey]) return this.caches[cacheKey];

    const tokenAddress = getERC20TokenAddressFromName(token.name);
    const contract = this.getERC20Contract(tokenAddress);
    const balance$ = new Subject<BalanceData>();

    this.caches[cacheKey] = balance$.pipe(shareReplay(1));

    const run = async () => {
      await this.provider.isReady();

      const evmAddress = await this.getEVMAddress(address);
      const balance = await contract.balanceOf(evmAddress);

      const formated = FixedPointNumber.fromInner(balance.toString(), token.decimals);
      const fromAddressFilter = contract.filters.Transfer(evmAddress, null);
      const toAddressFilter = contract.filters.Transfer(null, evmAddress);

      balance$.next({
        free: formated.clone(),
        locked: new FixedPointNumber(0, token.decimals),
        reserved: new FixedPointNumber(0, token.decimals),
        available: formated.clone()
      });

      const updateBalance = async () => {
        const balance = await contract.balanceOf(evmAddress);
        const formated = FixedPointNumber.fromInner(balance.toString(), token.decimals);

        balance$.next({
          free: formated.clone(),
          locked: new FixedPointNumber(0, token.decimals),
          reserved: new FixedPointNumber(0, token.decimals),
          available: formated.clone()
        });
      };

      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      const fromListener = this.provider.addEventListener('logs', updateBalance, fromAddressFilter);
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      const toListener = this.provider.addEventListener('logs', updateBalance, toAddressFilter);

      return () => {
        this.provider.removeEventListener(fromListener);
        this.provider.removeEventListener(toListener);
      };
    };

    let unsubscriber: AnyFunction | undefined;

    void run().then((unsub) => (unsubscriber = unsub));

    return this.caches[cacheKey].pipe(
      finalize(() => {
        unsubscriber && unsubscriber();
      }),
      filter((i) => !!i)
    );
  }

  public subscribeIssuance(token: Token) {
    const tokenAddress = getERC20TokenAddressFromName(token.name);
    const contract = this.getERC20Contract(tokenAddress);

    const run = async () => {
      const issuance = await contract.totalSupply();
      const formated = FixedPointNumber.fromInner(issuance.toString(), token.decimals);

      return formated;
    };

    return from(run());
  }
}
