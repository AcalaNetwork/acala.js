import { computeDefaultEvmAddress } from '@acala-network/eth-providers';
import { AnyApi, FixedPointNumber, getERC20TokenAddressFromName, Token } from '@acala-network/sdk-core';
import { BaseProvider } from '@ethersproject/providers';
// eslint-disable-next-line camelcase
import { Erc20__factory } from '../../abis/types/factories/Erc20__factory';
import { isAddress } from '@ethersproject/address';
import { from, Observable, Subject } from 'rxjs';
import { filter, finalize, shareReplay } from 'rxjs/operators';
import { BalanceData } from '../types';
import { AnyFunction } from '@polkadot/types/types';
import { AccountId32 } from '@acala-network/types/interfaces/runtime';
import { NotERC20TokenName } from '@acala-network/sdk-core/errors';
import { Storage } from '@acala-network/sdk/utils/storage';

const createStorages = (api: AnyApi) => {
  return {
    evmAddress: (address: string) => {
    return Storage.create<AccountId32>({
      api: api,
      query: api.query.evmAccounts.evmAddresses,
      params: [address]
    });
  }
}
}

export class ERC20Adapter {
  private api: AnyApi;
  private provider: BaseProvider;
  private caches: Record<string, Observable<BalanceData>>;
  private storage: ReturnType<typeof createStorages>;

  constructor(api: AnyApi, provider: BaseProvider) {
    this.api = api;
    this.provider = provider;
    this.caches = {};
    this.storage = createStorages(this.api);
  }

  private getERC20Contract(address: string) {
    if (!isAddress(address)) throw new Error('is not erc20 address');

    // eslint-disable-next-line camelcase
    return Erc20__factory.connect(address, this.provider);
  }

  private async getEVMAddress(address: string) {
    if (address.startsWith('0x') && isAddress(address)) return address;

    if (!this.api) throw new Error(`can't get api from evm providier`);

    const evmAddress = await  this.storage.evmAddress(address).query();

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

      contract.on(fromAddressFilter, updateBalance);
      contract.on(toAddressFilter, updateBalance);

      return () => {
        contract.off(fromAddressFilter, updateBalance);
        contract.off(toAddressFilter, updateBalance);
      };
    };

    let unsubscriber: AnyFunction | undefined;

    run().then((unsub) => (unsubscriber = unsub));

    return this.caches[cacheKey].pipe(
      finalize(() => {
        unsubscriber && unsubscriber();
      }),
      filter((i) => !!i)
    ) as Observable<BalanceData>;
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
