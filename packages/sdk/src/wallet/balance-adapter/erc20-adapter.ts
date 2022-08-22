import { EvmRpcProvider } from '@acala-network/eth-providers';
import { FixedPointNumber, getERC20TokenAddressFromName, Token } from '@acala-network/sdk-core';
// eslint-disable-next-line camelcase
import { ERC20__factory } from '@certusone/wormhole-sdk';
import { isAddress } from '@ethersproject/address';
import { from, Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { BalanceData } from '../type';

export class ERC20Adapter {
  constructor(private provider: EvmRpcProvider) {}

  private getERC20Contract(address: string) {
    if (!isAddress(address)) throw new Error('is not erc20 address');

    // eslint-disable-next-line camelcase
    return ERC20__factory.connect(address, this.provider);
  }

  private getEVMAddress(address: string) {
    if (address.startsWith('0x') && isAddress(address)) return address;

    return this.provider.getEvmAddress(address);
  }

  subscribeBalance(token: Token, address: string) {
    const tokenAddress = getERC20TokenAddressFromName(token.name);
    const contract = this.getERC20Contract(tokenAddress);
    const balance$ = new Subject<BalanceData | undefined>();

    const run = async () => {
      const evmAddress = await this.getEVMAddress(address);
      const balance = await contract.balanceOf(evmAddress);

      const formated = FixedPointNumber.fromInner(balance.toString(), token.decimals);
      const fromAddress = contract.filters.Transfer(address, null);
      const toAddress = contract.filters.Transfer(null, address);

      balance$.next({
        free: formated.clone(),
        locked: new FixedPointNumber(0, token.decimals),
        reserved: new FixedPointNumber(0, token.decimals),
        available: formated.clone()
      });

      this.provider.addEventListener(
        'NEW_LOGS',
        async () => {
          const balance = await contract.balanceOf(evmAddress);
          const formated = FixedPointNumber.fromInner(balance.toString(), token.decimals);

          balance$.next({
            free: formated.clone(),
            locked: new FixedPointNumber(0, token.decimals),
            reserved: new FixedPointNumber(0, token.decimals),
            available: formated.clone()
          });
        },
        fromAddress
      );
      this.provider.addEventListener(
        'NEW_LOGS',
        async () => {
          const balance = await contract.balanceOf(evmAddress);
          const formated = FixedPointNumber.fromInner(balance.toString(), token.decimals);

          balance$.next({
            free: formated.clone(),
            locked: new FixedPointNumber(0, token.decimals),
            reserved: new FixedPointNumber(0, token.decimals),
            available: formated.clone()
          });
        },
        toAddress
      );
    };

    run();

    return balance$.asObservable().pipe(filter((i) => !!i)) as Observable<BalanceData>;
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
