import { FixedPointNumber as FN, getERC20TokenAddressFromName, Token } from '@acala-network/sdk-core';
import { WsProvider } from '@polkadot/api';
import { AccountInfo } from '@polkadot/types/interfaces/system';
import { Provider as BodhiProvider } from '@acala-network/bodhi';

import { OrmlAccountData } from '@open-web3/orml-types/interfaces';
import { Contract, utils } from 'ethers';
import { map } from 'rxjs/operators';
import { createStorages } from '../storages';
import { BalanceData } from '../type';
import { BalanceAdapter } from './types';
import { from, Observable } from 'rxjs';
import { NotSupportETHAddress, NotSupportEVMBalance } from '../errors';

const ERC20_ABI = [
  // Read-Only Functions
  'function balanceOf(address owner) view returns (uint256)',
  'function decimals() view returns (uint8)',
  'function symbol() view returns (string)',

  // Authenticated Functions
  'function transfer(address to, uint amount) returns (bool)',

  // Events
  'event Transfer(address indexed from, address indexed to, uint amount)'
];

interface AcalaAdapterConfigs {
  nativeCurrency: string;
  storages: ReturnType<typeof createStorages>;
  wsProvider?: WsProvider;
}

export class AcalaBalanceAdapter implements BalanceAdapter {
  private storages: ReturnType<typeof createStorages>;
  private nativeCurrency: string;
  private wsProvider!: WsProvider;
  private ethProvider!: BodhiProvider;

  constructor({ storages, wsProvider, nativeCurrency }: AcalaAdapterConfigs) {
    this.storages = storages;
    this.nativeCurrency = nativeCurrency;

    if (wsProvider) {
      this.wsProvider = wsProvider;
      this.ethProvider = new BodhiProvider({
        provider: this.wsProvider
      });
    }
  }

  private handleNative = (data: AccountInfo, token: Token) => {
    const free = FN.fromInner(data.data.free.toString(), token.decimals);
    const locked = FN.fromInner(data.data.miscFrozen.toString(), token.decimals).max(
      FN.fromInner(data.data.feeFrozen.toString(), token.decimals)
    );
    const reserved = FN.fromInner(data.data.reserved.toString(), token.decimals);
    const available = free.sub(locked).max(FN.ZERO);

    return { available, free, locked, reserved };
  };

  private handleNonNative = (data: OrmlAccountData, token: Token) => {
    const free = FN.fromInner(data.free.toString(), token.decimals);
    const locked = FN.fromInner(data.frozen.toString(), token.decimals);
    const reserved = FN.fromInner(data.reserved.toString(), token.decimals);
    const available = free.sub(locked).max(FN.ZERO);

    return { available, free, locked, reserved };
  };

  private queryERC20Balance = async (token: Token, address: string): Promise<BalanceData> => {
    let ethAddress = address;

    if (!utils.isAddress(address)) {
      const evmAddress = await this.storages.evmAddress(address).query();

      if (evmAddress.isEmpty || evmAddress.isNone) {
        return {
          free: FN.ZERO,
          locked: FN.ZERO,
          reserved: FN.ZERO,
          available: FN.ZERO
        };
      }
      ethAddress = evmAddress.unwrap().toHex();
    }

    const tokenAddress = getERC20TokenAddressFromName(token.name);
    const tokenContract = new Contract(tokenAddress, ERC20_ABI, this.ethProvider);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const balance = await tokenContract.balanceOf(ethAddress);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const available = FN.fromInner(balance.toString(), token.decimals);

    return {
      free: available,
      locked: FN.ZERO,
      reserved: FN.ZERO,
      available
    };
  };

  public subscribeBalance(token: Token, address: string): Observable<BalanceData> {
    const { nativeCurrency } = this;
    const isNativeToken = nativeCurrency === token.name;

    if (!token.isERC20 && utils.isAddress(address)) {
      throw new NotSupportETHAddress(address);
    }

    if (token.isERC20 && !this.ethProvider) {
      throw new NotSupportEVMBalance();
    }

    if (token.isERC20) {
      return from(this.queryERC20Balance(token, address));
    }

    if (isNativeToken) {
      const storage = this.storages.nativeBalance(address);

      return storage.observable.pipe(map((data) => this.handleNative(data, token)));
    }

    // nonNative token
    const storage = this.storages.nonNativeBalance(token, address);

    return storage.observable.pipe(map((data) => this.handleNonNative(data, token)));
  }
}
