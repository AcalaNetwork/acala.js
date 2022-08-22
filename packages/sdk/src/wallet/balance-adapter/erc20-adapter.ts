import { EvmRpcProvider } from '@acala-network/eth-providers';
import { FixedPointNumber, getERC20TokenAddressFromName, Token } from '@acala-network/sdk-core';
// eslint-disable-next-line camelcase
import { Erc20__factory } from '../../abis/types/factories/Erc20__factory';
import { isAddress } from '@ethersproject/address';
import { from, Observable, Subject } from 'rxjs';
import { filter, finalize } from 'rxjs/operators';
import { BalanceData } from '../type';
import { AnyFunction } from '@polkadot/types/types';
import { NotERC20TokenName } from '@acala-network/sdk-core/errors';

export class ERC20Adapter {
  constructor(private provider: EvmRpcProvider) {}

  private getERC20Contract(address: string) {
    if (!isAddress(address)) throw new Error('is not erc20 address');

    // eslint-disable-next-line camelcase
    return Erc20__factory.connect(address, this.provider);
  }

  private getEVMAddress(address: string) {
    if (address.startsWith('0x') && isAddress(address)) return address;

    return this.provider.getEvmAddress(address);
  }

  subscribeBalance(token: Token, address: string) {
    if (!token.isERC20) throw new NotERC20TokenName(token.name);

    const tokenAddress = getERC20TokenAddressFromName(token.name);
    const contract = this.getERC20Contract(tokenAddress);
    const balance$ = new Subject<BalanceData | undefined>();

    const run = async () => {
      const evmAddress = await this.getEVMAddress(address);
      const balance = await contract.balanceOf(evmAddress);

      const formated = FixedPointNumber.fromInner(balance.toString(), token.decimals);
      const fromAddress = contract.filters.Transfer(evmAddress, null);
      const toAddress = contract.filters.Transfer(null, evmAddress);

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

      const fromListener = this.provider.addEventListener('NEW_LOGS', updateBalance, fromAddress);
      const toListener = this.provider.addEventListener('NEW_LOGS', updateBalance, toAddress);

      return () => {
        this.provider.removeEventListener(fromListener);
        this.provider.removeEventListener(toListener);
      };
    };

    let unsubscriber: AnyFunction | undefined;

    run().then((unsub) => (unsubscriber = unsub));

    return balance$.asObservable().pipe(
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
      const issuance = await contract.totalSupply;
      const formated = FixedPointNumber.fromInner(issuance.toString(), token.decimals);

      return formated;
    };

    return from(run());
  }
}
