import {
  AnyApi,
  eventsFilterCallback,
  eventsFilterRx,
  FixedPointNumber,
  FixedPointNumber as FN,
  forceToCurrencyName,
  getERC20TokenAddressFromName,
  Token
} from '@acala-network/sdk-core';
import { ApiPromise, ApiRx, WsProvider } from '@polkadot/api';
import { Provider as BodhiProvider } from '@acala-network/bodhi';
import { ERC20_ABI } from '@acala-network/eth-providers/lib/consts';
import { OrmlAccountData } from '@open-web3/orml-types/interfaces';
import { Contract, utils } from 'ethers';
import { map, switchMap } from 'rxjs/operators';
import { Option } from '@polkadot/types';
import { AccountInfo, H160 } from '@polkadot/types/interfaces';
import { BalanceData } from '../type';
import { BalanceAdapter } from './types';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { NotSupportETHAddress, NotSupportEVMBalance } from '../errors';
import { Storage } from '../../utils/storage';

interface AcalaAdapterConfigs {
  api: AnyApi;
  wsProvider?: WsProvider;
}

const createStorages = (api: AnyApi) => {
  return {
    nativeBalance: (address: string) =>
      Storage.create<AccountInfo>({
        api: api,
        path: 'query.system.account',
        params: [address]
      }),
    nonNativeBalance: (token: Token, address: string) =>
      Storage.create<OrmlAccountData>({
        api: api,
        path: 'query.tokens.accounts',
        params: [address, token.toChainData()]
      }),
    evmAddress: (address: string) =>
      Storage.create<Option<H160>>({
        api: api,
        path: 'query.evmAccounts.evmAddresses',
        params: [address]
      })
  };
};

export class AcalaBalanceAdapter implements BalanceAdapter {
  private storages: ReturnType<typeof createStorages>;
  private nativeCurrency: string;
  private wsProvider!: WsProvider;
  private ethProvider!: BodhiProvider;
  private evmUpdate$!: BehaviorSubject<number>;
  private api: AnyApi;

  constructor({ api, wsProvider }: AcalaAdapterConfigs) {
    this.api = api;
    this.storages = createStorages(api);
    this.nativeCurrency = api.registry.chainTokens[0];

    if (wsProvider) {
      this.wsProvider = wsProvider;
      this.ethProvider = new BodhiProvider({
        provider: this.wsProvider
      });
    }

    this.createEVMEvent$();
  }

  private createEVMEvent$() {
    this.evmUpdate$ = new BehaviorSubject<number>(0);

    const eventFilterConfigs = [
      {
        section: 'evm',
        method: '*'
      }
    ];
    if (this.api.type === 'promise') {
      eventsFilterRx(this.api as ApiRx, eventFilterConfigs, true).subscribe(() =>
        this.evmUpdate$.next(this.evmUpdate$.value + 1)
      );
    }

    if (this.api.type === 'promise') {
      eventsFilterCallback(this.api as ApiPromise, eventFilterConfigs, true, () =>
        this.evmUpdate$.next(this.evmUpdate$.value + 1)
      );
    }
  }

  private transformNative = (data: AccountInfo, token: Token) => {
    const free = FN.fromInner(data.data.free.toString(), token.decimals);
    const locked = FN.fromInner(data.data.miscFrozen.toString(), token.decimals).max(
      FN.fromInner(data.data.feeFrozen.toString(), token.decimals)
    );
    const reserved = FN.fromInner(data.data.reserved.toString(), token.decimals);
    const available = free.sub(locked).max(FN.ZERO);

    return { available, free, locked, reserved };
  };

  private transformNonNative = (data: OrmlAccountData, token: Token) => {
    const free = FN.fromInner(data.free.toString(), token.decimals);
    const locked = FN.fromInner(data.frozen.toString(), token.decimals);
    const reserved = FN.fromInner(data.reserved.toString(), token.decimals);
    const available = free.sub(locked).max(FN.ZERO);

    return { available, free, locked, reserved };
  };

  private queryERC20Balance = async (token: Token, address: string): Promise<BalanceData> => {
    let ethAddress: string = address;

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
      return this.evmUpdate$.pipe(switchMap(() => from(this.queryERC20Balance(token, address))));
    }

    if (isNativeToken) {
      const storage = this.storages.nativeBalance(address);

      return storage.observable.pipe(map((data) => this.transformNative(data, token)));
    }

    // nonNative token
    const storage = this.storages.nonNativeBalance(token, address);

    return storage.observable.pipe(map((data) => this.transformNonNative(data, token)));
  }

  public getED(token: Token): FixedPointNumber {
    return token.ed;
  }
}
